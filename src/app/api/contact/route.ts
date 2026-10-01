import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  checkRequest,
  readBodyText,
  submitContact,
  warn,
  type Config,
} from "@/lib/contact.ts";

// The contact form posts here. Nothing is stored and nothing that identifies the sender
// is logged: the enquiry becomes one email and is then gone. Anything that is not this
// site's own form posting JSON of a sensible size is turned away before it costs
// anything, and every refusal leaves one line saying which rule it broke.
export const dynamic = "force-dynamic";

/** The rate limiting binding, as wrangler.jsonc names it. */
type RateLimiter = { limit(options: { key: string }): Promise<{ success: boolean }> };

/** What the Worker holds. On a workstation the names come from .dev.vars. */
type WorkerEnv = {
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_RATE_LIMIT?: RateLimiter;
};

function readEnv(): WorkerEnv {
  const env: WorkerEnv = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    CONTACT_TO: process.env.CONTACT_TO,
  };
  try {
    return { ...env, ...(getCloudflareContext().env as unknown as WorkerEnv) };
  } catch {
    // Not running on the Workers runtime; process.env is all there is.
    return env;
  }
}

function readConfig(env: WorkerEnv): Config {
  return {
    resendApiKey: env.RESEND_API_KEY,
    turnstileSecret: env.TURNSTILE_SECRET_KEY,
    to: env.CONTACT_TO,
  };
}

/** Nothing this route says is worth keeping, by anyone, for any length of time. */
function answer(body: unknown, status: number, extra: Record<string, string> = {}) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extra },
  });
}

/** Every method but POST, answered the same way and written down once. */
function refuseMethod(request: Request): Response {
  const refusal = checkRequest(request) ?? { status: 405, reason: "method" };
  return answer({ ok: false, reason: refusal.reason, errors: {} }, refusal.status, {
    Allow: "POST",
  });
}

export const GET = refuseMethod;
export const PUT = refuseMethod;
export const PATCH = refuseMethod;
export const DELETE = refuseMethod;
export const HEAD = refuseMethod;
export const OPTIONS = refuseMethod;

export async function POST(request: Request): Promise<Response> {
  const refusal = checkRequest(request);
  if (refusal) {
    return answer(
      { ok: false, reason: refusal.reason, errors: {} },
      refusal.status,
      refusal.allow === undefined ? {} : { Allow: refusal.allow },
    );
  }

  // Five a minute is far more than anyone writing by hand needs, and it is counted
  // against the visitor's address, which is used as the key and written nowhere.
  const env = readEnv();
  if (env.CONTACT_RATE_LIMIT) {
    const { success } = await env.CONTACT_RATE_LIMIT.limit({
      key: request.headers.get("cf-connecting-ip") ?? "unknown",
    });
    if (!success) {
      warn("refused: too many submissions from one visitor");
      return answer({ ok: false, reason: "busy", errors: {} }, 429);
    }
  }

  const text = await readBodyText(request);
  if (text === null) return answer({ ok: false, reason: "large", errors: {} }, 413);

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    warn("refused a body that will not parse");
    return answer({ ok: false, reason: "invalid", errors: {} }, 400);
  }

  const ip = request.headers.get("cf-connecting-ip") ?? undefined;
  const host = URL.canParse(request.url) ? new URL(request.url).host : undefined;
  const outcome = await submitContact(body, readConfig(env), ip, host);

  if (outcome.ok) return answer({ ok: true }, 200);
  const errors = outcome.reason === "invalid" ? outcome.errors : {};
  return answer({ ok: false, reason: outcome.reason, errors }, outcome.status);
}
