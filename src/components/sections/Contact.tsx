import Link from "next/link";
import { company } from "@/content/company.ts";
import { contentFor } from "@/content/index.ts";
import { anchorId, type Language } from "@/content/routes.ts";
import { site } from "@/content/site.ts";
import ButtonLink from "@/components/ui/ButtonLink.tsx";
import Container from "@/components/ui/Container.tsx";
import styles from "./Contact.module.css";

export default function Contact({ language }: { language: Language }) {
  const { commitments, home } = contentFor(language);
  const { contact } = home;
  const reply = commitments.items.find((item) => item.id === "reply" && item.approved);
  return (
    <section
      className={styles.section}
      id={anchorId("contact", language)}
      aria-labelledby="contact-title"
    >
      <Container grid>
        <div className={styles.text}>
          <h2 id="contact-title">{contact.title}</h2>
          <p>{contact.body}</p>
          {reply && <p className={styles.reply}>{reply.text}</p>}
          <p className={styles.hint}>{contact.hint}</p>
          <div className={styles.actions}>
            <ButtonLink href={contact.cta.href}>{contact.cta.label}</ButtonLink>
            <Link className={styles.more} href={contact.allDetails.href}>
              {contact.allDetails.label}
            </Link>
          </div>
        </div>
        <dl className={styles.details}>
          <div>
            <dt>{contact.emailLabel}</dt>
            <dd>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </dd>
          </div>
          <div>
            <dt>{contact.phoneLabel}</dt>
            <dd>
              <a href={site.phoneHref}>{site.phone}</a>
            </dd>
          </div>
          {company.location !== null && (
            <div>
              <dt>{contact.locationLabel}</dt>
              <dd>{company.location}</dd>
            </div>
          )}
        </dl>
      </Container>
    </section>
  );
}
