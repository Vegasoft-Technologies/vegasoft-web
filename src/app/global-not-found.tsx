import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/tokens.css";
import "@/styles/base.css";
import { notFound } from "@/content/en/not-found.ts";
import { archivo, plexMono, plexSans } from "@/lib/fonts.ts";
import SiteFooter from "@/components/layout/SiteFooter.tsx";
import SiteHeader from "@/components/layout/SiteHeader.tsx";
import SkipLink from "@/components/layout/SkipLink.tsx";
import Container from "@/components/ui/Container.tsx";
import styles from "./global-not-found.module.css";

export const metadata: Metadata = { title: notFound.title };

// The app has no single root layout (English now, Turkish later), so this answers every
// address that matches no route, with status 404. It repeats the layout's frame.
export default function GlobalNotFound() {
  return (
    <html
      lang="en-GB"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        <SkipLink />
        <SiteHeader />
        <main id="main" className={styles.main}>
          <Container>
            <h1 className={styles.title}>{notFound.title}</h1>
            <p className={styles.text}>{notFound.text}</p>
            <Link className={styles.link} href="/">
              {notFound.homeLink}
            </Link>
          </Container>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
