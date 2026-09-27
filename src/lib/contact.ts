// What happens to a contact form submission, without any framework around it, so that
// the rules can be tested with nothing but a mocked fetch. Nothing is stored: the message
// and the address go straight into one email and are then forgotten. A send that fails
// leaves one line in the Worker's log saying why, and that line never carries a field of
// the submission, the token, an address or a key.

export const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
export const RESEND_URL = "https://api.resend.com/emails";
export const FROM = "Vegasoft website <website@vegasoft.co.uk>";

/** The longest each field may be. Anything longer is a mistake or an attack. */
export const limits = { name: 100, email: 200, company: 100, message: 5000 };

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
function warn(detail: string) {
  console.warn(`contact: ${detail}`);
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
 * with its reasons, so that a wrong key reads as `invalid-input-secret` in the log.
 */
export async function verifyToken(
  token: string,
  secret: string,
  ip?: string,
): Promise<{ human: boolean; status: number; codes: string[] }> {
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  const response = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body });
  if (!response.ok) return { human: false, status: response.status, codes: [] };
  const result = (await response.json()) as {
    success?: boolean;
    "error-codes"?: string[];
  };
  return {
    human: result.success === true,
    status: response.status,
    codes: result["error-codes"] ?? [],
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
): Promise<Outcome> {
  const submission = readSubmission(body);
  if (submission.honeypot !== "") {
    warn("spam (honeypot)");
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

  const check = await verifyToken(submission.token, turnstileSecret, ip);
  if (!check.human) {
    const why =
      check.codes.length > 0 ? check.codes.join(", ") : `answered ${check.status}`;
    warn(`spam check refused (${why})`);
    return { ok: false, status: 403, reason: "spam" };
  }

  const response = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildEmail(submission, to)),
  });
  // The reply carries the message id and the address; neither is logged or kept, so a
  // failure is recorded by its status alone.
  if (!response.ok) {
    warn(`email service answered ${response.status}`);
    return { ok: false, status: 502, reason: "failed" };
  }
  return { ok: true };
}
