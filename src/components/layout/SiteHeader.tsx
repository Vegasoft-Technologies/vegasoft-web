import Link from "next/link";
import { labels, mainNav } from "@/content/en/navigation.ts";
import { site } from "@/content/site.ts";
import Container from "@/components/ui/Container.tsx";
import Logo from "@/components/ui/Logo.tsx";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Logo background="light" priority />
        <nav className={styles.nav} aria-label={labels.mainNav}>
          <ul>
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
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
