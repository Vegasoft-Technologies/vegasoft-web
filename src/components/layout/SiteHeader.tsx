import Link from "next/link";
import { contentFor } from "@/content/index.ts";
import type { Language } from "@/content/routes.ts";
import { site } from "@/content/site.ts";
import Container from "@/components/ui/Container.tsx";
import Logo from "@/components/ui/Logo.tsx";
import LanguageSwitch from "./LanguageSwitch.tsx";
import styles from "./SiteHeader.module.css";

type SiteHeaderProps = {
  language: Language;
  /** The page being read, in both languages, for the switch. */
  paths: Record<Language, string>;
};

export default function SiteHeader({ language, paths }: SiteHeaderProps) {
  const { mainNav, labels } = contentFor(language).navigation;
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Logo language={language} background="light" priority />
        <nav className={styles.nav} aria-label={labels.mainNav}>
          <ul>
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <LanguageSwitch language={language} paths={paths} />
            </li>
          </ul>
        </nav>
        <div className={styles.contact}>
          <a href={site.phoneHref}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </Container>
    </header>
  );
}
