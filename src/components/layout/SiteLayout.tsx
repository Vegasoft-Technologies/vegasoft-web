import { languageNames, type Language } from "@/content/routes.ts";
import { archivo, plexMono, plexSans } from "@/lib/fonts.ts";

/** The document: its language, the fonts and the body. One per language tree. */
export default function SiteLayout({
  language,
  children,
}: {
  language: Language;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={languageNames[language].htmlLang}
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
