import { getCloudflareContext } from "@opennextjs/cloudflare";
import { submitContact, type Config } from "@/lib/contact.ts";

// The contact form posts here. Nothing is stored and nothing that identifies the sender
// is logged: the enquiry becomes one email and is then gone.
export const dynamic = "force-dynamic";

/** The names the Worker holds. On a workstation they come from .dev.vars. */
function readConfig(): Config {
  let env: Record<string, string | undefined> = {
    ...(process.env as Record<string, string | undefined>),
  };
  try {
    env = { ...env, ...(getCloudflareContext().env as unknown as typeof env) };
  } catch {
    // Not running on the Workers runtime; process.env is all there is.
  }
  return {
    resendApiKey: env.RESEND_API_KEY,
    turnstileSecret: env.TURNSTILE_SECRET_KEY,
    to: env.CONTACT_TO,
  };
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ reason: "invalid", errors: {} }, { status: 400 });
  }

  const ip = request.headers.get("cf-connecting-ip") ?? undefined;
  const outcome = await submitContact(body, readConfig(), ip);

  if (outcome.ok) return Response.json({ ok: true });
  const errors = outcome.reason === "invalid" ? outcome.errors : {};
  return Response.json(
    { ok: false, reason: outcome.reason, errors },
    {
      status: outcome.status,
    },
  );
}
