// Every address on the site, in both languages, in one place. The pages, the language
// switch, the alternates, the sitemap and the tests all read this file, so an address
// exists in exactly one spelling.

import { areaSlugs, type AreaSlug } from "./en/areas.ts";

export const languages = ["en", "tr"] as const;
export type Language = (typeof languages)[number];

/** How each language names itself, and how the markup names it. */
export const languageNames: Record<
  Language,
  { code: string; name: string; htmlLang: string; hrefLang: string; locale: string }
> = {
  en: {
    code: "EN",
    name: "English",
    htmlLang: "en-GB",
    hrefLang: "en-GB",
    locale: "en_GB",
  },
  tr: { code: "TR", name: "Türkçe", htmlLang: "tr", hrefLang: "tr-TR", locale: "tr_TR" },
};

/** A page, whatever language it is read in. */
export type PageKey = "home" | "about" | "contact" | "company";

const pages: Record<PageKey, Record<Language, string>> = {
  home: { en: "/", tr: "/tr" },
  about: { en: "/about", tr: "/tr/hakkimizda" },
  contact: { en: "/contact", tr: "/tr/iletisim" },
  company: { en: "/company", tr: "/tr/sirket-bilgileri" },
};

/** The part of a service address before the area, for example /services or /tr/hizmetler. */
const serviceIndex: Record<Language, string> = { en: "/services", tr: "/tr/hizmetler" };

/** The address segment of each area, and the id of its row on the home page. */
const areaSegments: Record<AreaSlug, Record<Language, string>> = {
  manufacturing: { en: "manufacturing", tr: "uretim" },
  automation: { en: "automation", tr: "is-surecleri" },
  websites: { en: "websites", tr: "web" },
  ai: { en: "ai", tr: "yapay-zeka" },
  data: { en: "data", tr: "veri" },
  mobile: { en: "mobile", tr: "mobil" },
  infrastructure: { en: "infrastructure", tr: "altyapi" },
};

/** The sections of the home page that are linked to. */
export type AnchorKey =
  | "services"
  | "how-we-work"
  | "pricing"
  | "commitments"
  | "proof"
  | "questions"
  | "contact";

const anchors: Record<AnchorKey, Record<Language, string>> = {
  services: { en: "services", tr: "hizmetler" },
  "how-we-work": { en: "how-we-work", tr: "nasil-calisiyoruz" },
  pricing: { en: "pricing", tr: "fiyatlandirma" },
  commitments: { en: "commitments", tr: "guvenceler" },
  proof: { en: "proof", tr: "isler" },
  questions: { en: "questions", tr: "sorular" },
  contact: { en: "contact", tr: "iletisim" },
};

/** The address of a page. */
export function pagePath(page: PageKey, language: Language): string {
  return pages[page][language];
}

/** The same page in both languages, for the canonical address and the alternates. */
export function pagePaths(page: PageKey): Record<Language, string> {
  return pages[page];
}

/** The address segment of an area, which is also the id of its row on the home page. */
export function areaSegment(slug: AreaSlug, language: Language): string {
  return areaSegments[slug][language];
}

/** The area an address segment belongs to, or undefined when nothing matches. */
export function areaForSegment(
  segment: string,
  language: Language,
): AreaSlug | undefined {
  return areaSlugs.find((slug) => areaSegments[slug][language] === segment);
}

/** The address of an area's page. */
export function servicePath(slug: AreaSlug, language: Language): string {
  return `${serviceIndex[language]}/${areaSegment(slug, language)}`;
}

/** An area's page in both languages. */
export function servicePaths(slug: AreaSlug): Record<Language, string> {
  return { en: servicePath(slug, "en"), tr: servicePath(slug, "tr") };
}

/** The address of the services index, which redirects to the section of the home page. */
export function serviceIndexPath(language: Language): string {
  return serviceIndex[language];
}

/** The id of a section of the home page. */
export function anchorId(anchor: AnchorKey, language: Language): string {
  return anchors[anchor][language];
}

/** A link to a section of the home page from anywhere on the site. */
export function anchorHref(anchor: AnchorKey, language: Language): string {
  const home = pagePath("home", language);
  return `${home === "/" ? "" : home}#${anchorId(anchor, language)}`;
}

/** A link to an area's row on the home page. */
export function areaAnchorHref(slug: AreaSlug, language: Language): string {
  const home = pagePath("home", language);
  return `${home === "/" ? "" : home}#${areaSegment(slug, language)}`;
}

/** Every address on the site, in one language, in the order the sitemap lists them. */
export function allPaths(language: Language): string[] {
  return [
    pagePath("home", language),
    ...areaSlugs.map((slug) => servicePath(slug, language)),
    pagePath("about", language),
    pagePath("contact", language),
    pagePath("company", language),
  ];
}

/** Every page of the site as its address in each language, for the sitemap. */
export function allPagePaths(): Record<Language, string>[] {
  return [
    pagePaths("home"),
    ...areaSlugs.map((slug) => servicePaths(slug)),
    pagePaths("about"),
    pagePaths("contact"),
    pagePaths("company"),
  ];
}

/** The other language, for the switch in the header. */
export function otherLanguage(language: Language): Language {
  return language === "en" ? "tr" : "en";
}
