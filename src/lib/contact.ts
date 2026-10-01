// What happens to a contact form submission, without any framework around it, so that
// the rules can be tested with nothing but a mocked fetch. Nothing is stored: the message
// and the address go straight into one email and are then forgotten. A send that fails
// leaves one line in the Worker's log saying why, and that line never carries a field of
// the submission, the token, an address or a key. A submission is refused before it costs
// anything if it is the wrong method, the wrong kind of body, too big, or sent from
// somewhere that is not this site.

export const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
export const RESEND_URL = "https://api.resend.com/emails";
export const FROM = "Vegasoft website <website@vegasoft.co.uk>";

/** The longest each field may be. Anything longer is a mistake or an attack. */
export const limits = { name: 100, email: 200, company: 100, message: 5000 };

/** The most a submission may weigh. The longest the form can send is far below it. */
export const maxBodyBytes = 32 * 1024;

/** How long each of the two services has before the send counts as having failed. */
export const outboundTimeoutMs = 8_000;

export type ContactLanguage = "en" | "tr";

export type Submission = {
  name: string;
  email: string;
  company: string;
  message: string;
  language: ContactLanguage;
  /** The field no person sees. Anything in it means the sender is not a person. */
  honeypot: string;
  /** The token the spam check gives the browser. */
  token: string;
};

export type FieldName = "name" | "email" | "message" | "token";
export type FieldError = "required" | "email" | "long";

export type Outcome =
  | { ok: true }
  | {
      ok: false;
      status: number;
      reason: "invalid";
      errors: Partial<Record<FieldName, FieldError>>;
    }
  | { ok: false; status: number; reason: "spam" | "unconfigured" | "failed" };

/** The names the Worker environment holds. Absent means the site is not configured yet. */
export type Config = {
  resendApiKey?: string;
  turnstileSecret?: string;
  to?: string;
};

/** One line, so a failed send can be read in the Worker's log instead of guessed at. */
export function warn(detail: string) {
  console.warn(`contact: ${detail}`);
}

/** Anything a keyboard cannot put in a one-line field. In an email it would be a header. */
const controlCharacters = /[\u0000-\u001f\u007f]/;

/** The one-line fields. A newline in any of them is an injection attempt, not a name. */
const singleLineFields = ["name", "email", "company"] as const;

/**
 * Whether a submission came from this site: the canonical address, a workstation, or
 * whatever host the request itself arrived at, which covers every preview address
 * without naming one. Another Worker's address is not this one's.
 */
export function isOwnOrigin(origin: string | null, host: string): boolean {
  if (origin === null) return false;
  const own = new Set([
    "https://vegasoft.co.uk",
    "http://localhost:3000",
    "http://localhost:8787",
  ]);
  if (host !== "") own.add(`https://${host}`);
  return own.has(origin);
}

/** The names the spam check may say a token was solved on. */
export function isOwnHost(hostname: string, host?: string): boolean {
  if (hostname === "") return false;
  const own = new Set(["vegasoft.co.uk", "localhost"]);
  if (host) own.add(host.split(":")[0]);
  return own.has(hostname);
}

/** Why a request was turned away before its body was worth reading. */
export type Refusal = { status: number; reason: string; allow?: string };

/**
 * Everything that can be decided from the request line and the headers alone. A body is
 * neither read nor parsed until all of this passes.
 */
export function checkRequest(request: Request): Refusal | null {
  if (request.method !== "POST") {
    warn(`refused the ${request.method} method`);
    return { status: 405, reason: "method", allow: "POST" };
  }
  const type = (request.headers.get("content-type") ?? "")
    .split(";")[0]
    .trim()
    .toLowerCase();
  if (type !== "application/json") {
    warn("refused a body that is not JSON");
    return { status: 415, reason: "type" };
  }
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > maxBodyBytes) {
    warn(`refused a body of ${declared} bytes`);
    return { status: 413, reason: "large" };
  }
  const host = URL.canParse(request.url) ? new URL(request.url).host : "";
  if (!isOwnOrigin(request.headers.get("origin"), host)) {
    warn("refused a submission from another site");
    return { status: 403, reason: "origin" };
  }
  return null;
}

/**
 * Reads the body, counting as it goes and stopping at the limit: a body that declares no
 * length, or lies about it, is held to the same ceiling as one that does. null means it
 * was too big and nothing was kept.
 */
export async function readBodyText(
  request: Request,
  limit = maxBodyBytes,
): Promise<string | null> {
  const body = request.body;
  if (body === null) return "";
  const reader = body.getReader();
  const parts: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      warn(`refused a body of over ${limit} bytes`);
      return null;
    }
    parts.push(value);
  }
  const whole = new Uint8Array(size);
  let at = 0;
  for (const part of parts) {
    whole.set(part, at);
    at += part.byteLength;
  }
  return new TextDecoder().decode(whole);
}

/** Enough of an address to reply to: something, an at sign, a dot in the domain. */
const emailPattern = /^[^\s@]+@[^\s@.]+\.[^\s@]+$/;

/** Reads the fields out of whatever was posted, as strings. */
export function readSubmission(body: unknown): Submission {
  const value = (body ?? {}) as Record<string, unknown>;
  const text = (key: string) => (typeof value[key] === "string" ? value[key].trim() : "");
  const language = value.language === "tr" ? "tr" : "en";
  return {
    name: text("name"),
    email: text("email"),
    company: text("company"),
    message: text("message"),
    language,
    honeypot: text("honeypot"),
    token: text("token"),
  };
}

export function validate(submission: Submission): Partial<Record<FieldName, FieldError>> {
  const errors: Partial<Record<FieldName, FieldError>> = {};
  if (submission.name === "") errors.name = "required";
  else if (submission.name.length > limits.name) errors.name = "long";
  if (submission.email === "") errors.email = "required";
  else if (submission.email.length > limits.email || !emailPattern.test(submission.email))
    errors.email = "email";
  if (submission.message === "") errors.message = "required";
  else if (submission.message.length > limits.message) errors.message = "long";
  if (submission.token === "") errors.token = "required";
  return errors;
}

/**
 * Asks Cloudflare whether the token the browser sent is a real one. A refusal comes back
 * with its reasons, so that a wrong key reads as `invalid-input-secret` in the log, and
 * with the host the token was solved on, so that one solved elsewhere cannot be replayed
 * here. It has the same deadline as the send itself.
 */
export async function verifyToken(
  token: string,
  secret: string,
  ip?: string,
): Promise<{ human: boolean; status: number; codes: string[]; hostname: string }> {
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    body,
    signal: AbortSignal.timeout(outboundTimeoutMs),
  });
  if (!response.ok) {
    return { human: false, status: response.status, codes: [], hostname: "" };
  }
  const result = (await response.json()) as {
    success?: boolean;
    "error-codes"?: string[];
    hostname?: string;
  };
  return {
    human: result.success === true,
    status: response.status,
    codes: result["error-codes"] ?? [],
    hostname: result.hostname ?? "",
  };
}

/** The email the enquiry becomes. */
export function buildEmail(submission: Submission, to: string) {
  const lines = [
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    ...(submission.company === "" ? [] : [`Company: ${submission.company}`]),
    `Page: ${submission.language === "tr" ? "Turkish" : "English"}`,
    "",
    submission.message,
  ];
  return {
    from: FROM,
    to,
    reply_to: submission.email,
    subject: `Website enquiry from ${submission.name}${submission.language === "tr" ? " (TR)" : ""}`,
    text: lines.join("\n"),
  };
}

/**
 * Checks the submission, checks the spam token and sends the email. It sends nothing at
 * all unless every check passes and every name the Worker needs is set.
 */
export async function submitContact(
  body: unknown,
  config: Config,
  ip?: string,
  host?: string,
): Promise<Outcome> {
  const submission = readSubmission(body);
  if (submission.honeypot !== "") {
    warn("spam (honeypot)");
    return { ok: false, status: 400, reason: "spam" };
  }

  // A person types none of these. In an email they would start a header of their own.
  const tainted = singleLineFields.filter((field) =>
    controlCharacters.test(submission[field]),
  );
  if (tainted.length > 0) {
    warn(`spam (control characters in ${tainted.join(", ")})`);
    return { ok: false, status: 400, reason: "spam" };
  }

  const errors = validate(submission);
  const invalid = Object.keys(errors);
  if (invalid.length > 0) {
    warn(`invalid (${invalid.join(", ")})`);
    return { ok: false, status: 400, reason: "invalid", errors };
  }

  const { resendApiKey, turnstileSecret, to } = config;
  if (!resendApiKey || !turnstileSecret || !to) {
    const missing = (
      [
        ["RESEND_API_KEY", resendApiKey],
        ["TURNSTILE_SECRET_KEY", turnstileSecret],
        ["CONTACT_TO", to],
      ] as const
    ).flatMap(([name, value]) => (value ? [] : [name]));
    warn(`not configured (${missing.join(", ")} missing)`);
    return { ok: false, status: 503, reason: "unconfigured" };
  }

  let check;
  try {
    check = await verifyToken(submission.token, turnstileSecret, ip);
  } catch {
    warn("spam check did not answer in time");
    return { ok: false, status: 502, reason: "failed" };
  }
  if (!check.human) {
    const why =
      check.codes.length > 0 ? check.codes.join(", ") : `answered ${check.status}`;
    warn(`spam check refused (${why})`);
    return { ok: false, status: 403, reason: "spam" };
  }
  // Cloudflare says which site the token was solved on. One solved somewhere else and
  // replayed here is not ours. The name it gives back is somebody else's, so it is not
  // written to the log.
  if (!isOwnHost(check.hostname, host)) {
    warn("spam check answered for another site");
    return { ok: false, status: 403, reason: "spam" };
  }

  let response: Response;
  try {
    response = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildEmail(submission, to)),
      signal: AbortSignal.timeout(outboundTimeoutMs),
    });
  } catch {
    warn("email service did not answer in time");
    return { ok: false, status: 502, reason: "failed" };
  }
  // The reply carries the message id and the address; neither is logged or kept, so a
  // failure is recorded by its status alone.
  if (!response.ok) {
    warn(`email service answered ${response.status}`);
    return { ok: false, status: 502, reason: "failed" };
  }
  return { ok: true };
}
