"use client";

import Script from "next/script";
import { useRef, useState } from "react";
import type { Language } from "@/content/routes.ts";
import type { FieldError, FieldName } from "@/lib/contact.ts";
import styles from "./ContactForm.module.css";

type Copy = {
  title: string;
  noScript: string;
  nameLabel: string;
  emailLabel: string;
  companyLabel: string;
  companyOptional: string;
  messageLabel: string;
  honeypotLabel: string;
  submit: string;
  sending: string;
  required: string;
  badEmail: string;
  checkLabel: string;
  checkMissing: string;
  successTitle: string;
  successText: string;
  failure: string;
  privacyNote: string;
  privacyLink: string;
};

type ContactFormProps = {
  language: Language;
  copy: Copy;
  email: string;
  phone: string;
  phoneHref: string;
  privacyHref: string;
};

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * The one component on the site that runs in the browser. It posts the enquiry to the
 * route handler, which checks everything again and sends the email. Without JavaScript
 * the form is hidden and the email address and telephone number take its place.
 */
export default function ContactForm({
  language,
  copy,
  email,
  phone,
  phoneHref,
  privacyHref,
}: ContactFormProps) {
  const [errors, setErrors] = useState<Partial<Record<FieldName, FieldError>>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const sent = useRef<HTMLDivElement>(null);

  function messageFor(field: FieldName): string | undefined {
    const error = errors[field];
    if (!error) return undefined;
    if (field === "token") return copy.checkMissing;
    if (field === "email" && error !== "required") return copy.badEmail;
    return copy.required;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const body = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      message: String(data.get("message") ?? ""),
      honeypot: String(data.get("company-name") ?? ""),
      token: String(data.get("cf-turnstile-response") ?? ""),
      language,
    };
    setState("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        errors?: Partial<Record<FieldName, FieldError>>;
      };
      if (result.ok) {
        setErrors({});
        setState("sent");
        window.setTimeout(() => sent.current?.focus(), 0);
        return;
      }
      setErrors(result.errors ?? {});
      setState(Object.keys(result.errors ?? {}).length > 0 ? "idle" : "failed");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div className={styles.sent} ref={sent} tabIndex={-1}>
        <h3>{copy.successTitle}</h3>
        <p>{copy.successText}</p>
      </div>
    );
  }

  return (
    <>
      <noscript>
        <style>{`.${styles.form} { display: none }`}</style>
        <p className={styles.fallback}>
          {copy.noScript} <a href={`mailto:${email}`}>{email}</a>{" "}
          <a href={phoneHref}>{phone}</a>
        </p>
      </noscript>
      {siteKey && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" defer />
      )}
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="contact-name">{copy.nameLabel}</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {messageFor("name") && (
            <p className={styles.error} id="contact-name-error" role="alert">
              {messageFor("name")}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-email">{copy.emailLabel}</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {messageFor("email") && (
            <p className={styles.error} id="contact-email-error" role="alert">
              {messageFor("email")}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-company">
            {copy.companyLabel}{" "}
            <span className={styles.optional}>{copy.companyOptional}</span>
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-message">{copy.messageLabel}</label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            required
            aria-describedby={errors.message ? "contact-message-error" : undefined}
          />
          {messageFor("message") && (
            <p className={styles.error} id="contact-message-error" role="alert">
              {messageFor("message")}
            </p>
          )}
        </div>

        {/* No person sees this field. Anything in it means the sender is not a person. */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="contact-company-name">{copy.honeypotLabel}</label>
          <input
            id="contact-company-name"
            name="company-name"
            type="text"
            tabIndex={-1}
          />
        </div>

        {siteKey && (
          <div className={styles.field}>
            <span className={styles.checkLabel}>{copy.checkLabel}</span>
            <div
              className="cf-turnstile"
              data-sitekey={siteKey}
              data-language={language}
            />
            {messageFor("token") && (
              <p className={styles.error} role="alert">
                {messageFor("token")}
              </p>
            )}
          </div>
        )}

        <p className={styles.note}>
          {copy.privacyNote} <a href={privacyHref}>{copy.privacyLink}</a>
        </p>

        <button className={styles.submit} type="submit" disabled={state === "sending"}>
          {state === "sending" ? copy.sending : copy.submit}
        </button>

        {state === "failed" && (
          <p className={styles.error} role="alert">
            {copy.failure} <a href={`mailto:${email}`}>{email}</a>
          </p>
        )}
      </form>
    </>
  );
}
