import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/tokens.css";
import "@/styles/base.css";
import { contentFor } from "@/content/index.ts";
import { languageNames, pagePath } from "@/content/routes.ts";
import { archivo, plexMono, plexSans } from "@/lib/fonts.ts";
import Container from "@/components/ui/Container.tsx";
import PageFrame from "@/components/layout/PageFrame.tsx";
import styles from "./global-not-found.module.css";

const english = contentFor("en").notFound;
const turkish = contentFor("tr").notFound;

export const metadata: Metadata = { title: english.title };

// The app has no single root layout (English and Turkish have one each), so this answers
// every address that matches no route, with status 404. It cannot know which language
// was asked for, so it answers in English and offers the Turkish home page underneath.
export default function GlobalNotFound() {
  return (
    <html
      lang={languageNames.en.htmlLang}
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        <PageFrame
          language="en"
          paths={{ en: pagePath("home", "en"), tr: pagePath("home", "tr") }}
        >
          <main id="main" className={styles.main}>
            <Container>
              <h1 className={styles.title}>{english.title}</h1>
              <p className={styles.text}>{english.text}</p>
              <Link className={styles.link} href={pagePath("home", "en")}>
                {english.homeLink}
              </Link>
              <p className={styles.text} lang={languageNames.tr.htmlLang}>
                {turkish.title}.{" "}
                <Link href={pagePath("home", "tr")}>{turkish.homeLink}</Link>
              </p>
            </Container>
          </main>
        </PageFrame>
      </body>
    </html>
  );
}
