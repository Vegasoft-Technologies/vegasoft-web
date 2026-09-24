import { company } from "@/content/company.ts";
import { home } from "@/content/en/home.ts";
import { site } from "@/content/site.ts";
import ButtonLink from "@/components/ui/ButtonLink.tsx";
import Container from "@/components/ui/Container.tsx";
import Pending from "@/components/ui/Pending.tsx";
import styles from "./Contact.module.css";

const { contact } = home;

export default function Contact() {
  // The location row is left out of a deployed build while it is not known, and shown
  // as a placeholder in development (docs/decisions/0004).
  const showLocation =
    company.location !== null || process.env.NODE_ENV === "development";

  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-title">
      <Container grid>
        <div className={styles.text}>
          <h2 id="contact-title">{contact.title}</h2>
          <p>{contact.body}</p>
          <div className={styles.action}>
            <ButtonLink href={contact.cta.href}>{contact.cta.label}</ButtonLink>
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
          {showLocation && (
            <div>
              <dt>{contact.locationLabel}</dt>
              <dd>{company.location ?? <Pending label={contact.locationLabel} />}</dd>
            </div>
          )}
        </dl>
      </Container>
    </section>
  );
}
