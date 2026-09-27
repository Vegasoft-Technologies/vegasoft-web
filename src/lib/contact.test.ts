import assert from "node:assert/strict";
import test, { afterEach, beforeEach } from "node:test";
import {
  FROM,
  RESEND_URL,
  TURNSTILE_VERIFY_URL,
  buildEmail,
  readSubmission,
  submitContact,
  validate,
  type Config,
} from "./contact.ts";

const config: Config = {
  resendApiKey: "test-key",
  turnstileSecret: "test-secret",
  to: "hello@vegasoft.co.uk",
};

const good = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  message: "We copy the same order into three programs, every morning, two people.",
  language: "en",
  honeypot: "",
  token: "turnstile-token",
};

type Call = { url: string; init?: RequestInit };
let calls: Call[] = [];
const realFetch = globalThis.fetch;

type Answers = {
  human?: boolean;
  /** What the spam check gives as its reasons for refusing. */
  codes?: string[];
  sent?: boolean;
  /** What the email API answers, when it is not simply 200 or 422. */
  sendStatus?: number;
};

/** Answers the spam check and the email API, and records every call. */
function mockFetch(options: Answers = {}) {
  const { human = true, codes = [], sent = true, sendStatus } = options;
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const address = typeof url === "string" ? url : url.toString();
    calls.push({ url: address, init });
    if (address === TURNSTILE_VERIFY_URL) {
      return new Response(JSON.stringify({ success: human, "error-codes": codes }), {
        status: 200,
      });
    }
    return new Response(JSON.stringify({ id: "message-id" }), {
      status: sendStatus ?? (sent ? 200 : 422),
    });
  }) as typeof fetch;
}

let warnings: string[] = [];
const realWarn = console.warn;

beforeEach(() => {
  calls = [];
  warnings = [];
  console.warn = (...parts: unknown[]) => {
    warnings.push(parts.map(String).join(" "));
  };
});

afterEach(() => {
  globalThis.fetch = realFetch;
  console.warn = realWarn;
});

test("a valid submission sends one email, with the right addresses and subject", async () => {
  mockFetch();
  const outcome = await submitContact(good, config, "203.0.113.1");
  assert.deepEqual(outcome, { ok: true });

  const [check, send] = calls;
  assert.equal(check.url, TURNSTILE_VERIFY_URL);
  assert.equal(send.url, RESEND_URL);
  assert.equal(calls.filter((call) => call.url === RESEND_URL).length, 1);

  const email = JSON.parse(String(send.init?.body));
  assert.equal(email.from, FROM);
  assert.equal(email.to, "hello@vegasoft.co.uk");
  assert.equal(email.reply_to, "ada@example.com");
  assert.equal(email.subject, "Website enquiry from Ada Lovelace");
  assert.match(email.text, /Ada Lovelace/);
  assert.match(email.text, /three programs/);
  assert.match(String(send.init?.headers && JSON.stringify(send.init.headers)), /Bearer/);
});

test("a submission from the Turkish page is marked in the subject", async () => {
  mockFetch();
  await submitContact({ ...good, language: "tr" }, config);
  const send = calls.find((call) => call.url === RESEND_URL);
  assert.ok(send);
  assert.equal(
    JSON.parse(String(send.init?.body)).subject,
    "Website enquiry from Ada Lovelace (TR)",
  );
});

test("a missing field sends nothing and names the field", async () => {
  for (const field of ["name", "email", "message", "token"] as const) {
    mockFetch();
    calls = [];
    const outcome = await submitContact({ ...good, [field]: "  " }, config);
    assert.equal(outcome.ok, false);
    if (outcome.ok) return;
    assert.equal(outcome.reason, "invalid");
    assert.equal(outcome.errors[field], field === "email" ? "required" : "required");
    assert.equal(calls.length, 0, field);
  }
});

test("an address we could not reply to sends nothing", async () => {
  for (const email of ["ada", "ada@example", "ada @example.com", "@example.com"]) {
    mockFetch();
    calls = [];
    const outcome = await submitContact({ ...good, email }, config);
    assert.equal(outcome.ok, false);
    if (outcome.ok) return;
    assert.equal(outcome.reason, "invalid", email);
    assert.equal(calls.length, 0, email);
  }
});

test("a message longer than the limit sends nothing", async () => {
  mockFetch();
  const outcome = await submitContact({ ...good, message: "x".repeat(5001) }, config);
  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.reason, "invalid");
  assert.equal(outcome.errors.message, "long");
  assert.equal(calls.length, 0);
});

test("a filled honeypot sends nothing", async () => {
  mockFetch();
  const outcome = await submitContact({ ...good, honeypot: "http://spam" }, config);
  assert.deepEqual(outcome, { ok: false, status: 400, reason: "spam" });
  assert.equal(calls.length, 0);
});

test("a failed spam check sends nothing", async () => {
  mockFetch({ human: false });
  const outcome = await submitContact(good, config);
  assert.deepEqual(outcome, { ok: false, status: 403, reason: "spam" });
  assert.deepEqual(
    calls.map((call) => call.url),
    [TURNSTILE_VERIFY_URL],
  );
});

test("without the keys it sends nothing and says it is not configured", async () => {
  for (const missing of ["resendApiKey", "turnstileSecret", "to"] as const) {
    mockFetch();
    calls = [];
    const outcome = await submitContact(good, { ...config, [missing]: undefined });
    assert.deepEqual(
      outcome,
      { ok: false, status: 503, reason: "unconfigured" },
      missing,
    );
    assert.equal(calls.length, 0, missing);
  }
});

test("an email that does not go out is reported, not swallowed", async () => {
  mockFetch({ sent: false });
  const outcome = await submitContact(good, config);
  assert.deepEqual(outcome, { ok: false, status: 502, reason: "failed" });
});

test("the fields are read as trimmed strings, whatever was posted", () => {
  const submission = readSubmission({ name: "  Ada  ", email: 42, language: "tr" });
  assert.equal(submission.name, "Ada");
  assert.equal(submission.email, "");
  assert.equal(submission.language, "tr");
  assert.equal(readSubmission(null).language, "en");
  assert.deepEqual(validate(readSubmission(null)), {
    name: "required",
    email: "required",
    message: "required",
    token: "required",
  });
});

test("the company is left out of the email when it is not given", () => {
  const email = buildEmail(
    { ...good, company: "", language: "en" } as never,
    "hello@vegasoft.co.uk",
  );
  assert.ok(!email.text.includes("Company:"));
  assert.match(email.text, /Page: English/);
});

/** Every way a send can fail, and the one line each one is expected to leave behind. */
const failures: { what: string; run: () => Promise<unknown>; line: string }[] = [
  {
    what: "honeypot",
    run: () => submitContact({ ...good, honeypot: "http://spam" }, config),
    line: "contact: spam (honeypot)",
  },
  {
    what: "an address we could not reply to",
    run: () => submitContact({ ...good, email: "ada" }, config),
    line: "contact: invalid (email)",
  },
  {
    what: "nothing filled in",
    run: () => submitContact({}, config),
    line: "contact: invalid (name, email, message, token)",
  },
  {
    what: "a missing key",
    run: () => submitContact(good, { ...config, turnstileSecret: undefined }),
    line: "contact: not configured (TURNSTILE_SECRET_KEY missing)",
  },
  {
    what: "the wrong spam check key",
    run: () => submitContact(good, config, "203.0.113.1"),
    line: "contact: spam check refused (invalid-input-secret)",
  },
  {
    what: "a spam check that simply says no",
    run: () => submitContact(good, config),
    line: "contact: spam check refused (answered 200)",
  },
  {
    what: "an email service that refuses the key",
    run: () => submitContact(good, config, "203.0.113.1"),
    line: "contact: email service answered 401",
  },
];

/** The answers each failure needs from the two services it talks to. */
const answersFor: Record<string, Answers> = {
  "the wrong spam check key": { human: false, codes: ["invalid-input-secret"] },
  "a spam check that simply says no": { human: false },
  "an email service that refuses the key": { sendStatus: 401 },
};

for (const { what, run, line } of failures) {
  test(`${what} leaves one line saying why`, async () => {
    mockFetch(answersFor[what]);
    await run();
    assert.deepEqual(warnings, [line]);
  });
}

test("a send that works says nothing", async () => {
  mockFetch();
  const outcome = await submitContact(good, config, "203.0.113.1");
  assert.deepEqual(outcome, { ok: true });
  assert.deepEqual(warnings, []);
});

test("no line carries the sender, the token or a key", async () => {
  const secrets = [
    good.name,
    good.email,
    good.company,
    good.message,
    good.token,
    "203.0.113.1",
    config.resendApiKey,
    config.turnstileSecret,
    config.to,
  ];
  const seen: string[] = [];
  for (const { what, run } of failures) {
    mockFetch(answersFor[what]);
    warnings = [];
    await run();
    seen.push(...warnings);
  }
  assert.equal(seen.length, failures.length);
  for (const line of seen) {
    assert.match(line, /^contact: /);
    for (const secret of secrets) {
      assert.ok(secret);
      assert.ok(!line.includes(secret), `${line} carries ${secret}`);
    }
  }
});
