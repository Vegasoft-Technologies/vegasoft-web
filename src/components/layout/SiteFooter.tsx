import Link from "next/link";
import { company } from "@/content/company.ts";
import { contentFor } from "@/content/index.ts";
import { servicePath, type Language } from "@/content/routes.ts";
import { site } from "@/content/site.ts";
import { showSoon } from "@/lib/soon.ts";
import Container from "@/components/ui/Container.tsx";
import Logo from "@/components/ui/Logo.tsx";
import Soon from "@/components/ui/Soon.tsx";
import LegalLine from "./LegalLine.tsx";
import styles from "./SiteFooter.module.css";

/** The company details under the email address and the telephone number. */
const contactFields = ["location"] as const;

export default function SiteFooter({ language }: { language: Language }) {
  const { areas, companyLabels, navigation } = contentFor(language);
  const { footer } = navigation;
  return (
    <footer className={styles.footer}>
      <Container grid className={styles.columns}>
        <div className={styles.brand}>
          <Logo language={language} background="dark" />
          <p className={styles.tagline}>{footer.tagline}</p>
        </div>
        <nav
          className={`${styles.col} ${styles.services}`}
          aria-labelledby="footer-services"
        >
          <h2 id="footer-services">{footer.servicesTitle}</h2>
          <ul>
            {areas.map((area) => (
              <li key={area.slug}>
                <Link href={servicePath(area.slug, language)}>{area.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav
          className={`${styles.col} ${styles.company}`}
          aria-labelledby="footer-company"
        >
          <h2 id="footer-company">{footer.companyTitle}</h2>
          <ul>
            {footer.companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            {showSoon &&
              footer.companySoon.map((label) => (
                <li key={label} className={styles.soon}>
                  <Soon language={language} label={label} />
                </li>
              ))}
          </ul>
        </nav>
        <div className={`${styles.col} ${styles.contact}`}>
          <h2>{footer.contactTitle}</h2>
          <ul>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={site.phoneHref}>{site.phone}</a>
            </li>
            {contactFields.map((key) => {
              const value = company[key];
              if (value === null) return null;
              return (
                <li key={key} className={styles.detail}>
                  <span className={styles.label}>{companyLabels[key]}</span> {value}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
      <Container>
        <LegalLine language={language} />
      </Container>
    </footer>
  );
}
