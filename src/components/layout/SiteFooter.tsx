import Link from "next/link";
import { company, companyLabels } from "@/content/company.ts";
import { areas } from "@/content/en/areas.ts";
import { footer } from "@/content/en/navigation.ts";
import { site } from "@/content/site.ts";
import Container from "@/components/ui/Container.tsx";
import Logo from "@/components/ui/Logo.tsx";
import Pending from "@/components/ui/Pending.tsx";
import styles from "./SiteFooter.module.css";

const detailKeys = Object.keys(companyLabels) as (keyof typeof companyLabels)[];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container grid className={styles.columns}>
        <div className={styles.brand}>
          <Logo background="dark" />
          <p className={styles.tagline}>{footer.tagline}</p>
        </div>
        <nav className={styles.col} aria-labelledby="footer-services">
          <h2 id="footer-services">{footer.servicesTitle}</h2>
          <ul>
            {areas.map((area) => (
              <li key={area.slug}>
                <Link href={`/#${area.slug}`}>{area.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className={styles.col} aria-labelledby="footer-company">
          <h2 id="footer-company">{footer.companyTitle}</h2>
          <ul>
            {footer.companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.col}>
          <h2>{footer.contactTitle}</h2>
          <ul>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={site.phoneHref}>{site.phone}</a>
            </li>
          </ul>
        </div>
      </Container>
      <Container>
        <div className={styles.legal}>
          <span>© {site.name}</span>
          {detailKeys.map((key) => {
            const value = company[key];
            // A detail that is not known yet is left out of a deployed build entirely,
            // and shown as a placeholder in development (docs/decisions/0004).
            if (value === null && process.env.NODE_ENV !== "development") return null;
            return (
              <span key={key}>
                {value === null ? (
                  <Pending label={companyLabels[key]} />
                ) : (
                  `${companyLabels[key]}: ${value}`
                )}
              </span>
            );
          })}
        </div>
      </Container>
    </footer>
  );
}
