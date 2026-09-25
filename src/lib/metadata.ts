import type { Metadata } from "next";
import { languageNames, type Language } from "@/content/routes.ts";
import { site } from "@/content/site.ts";

/**
 * Metadata for a page: its title (the layout adds the site name unless the title is
 * absolute), description, canonical address, the same page in the other language, and
 * the Open Graph fields. A page's openGraph replaces the layout's rather than merging
 * with it, so the shared fields are repeated.
 */
export function pageMetadata(
  language: Language,
  page: { title: string; description: string; absoluteTitle?: boolean },
  paths: Record<Language, string>,
): Metadata {
  const title = page.absoluteTitle ? { absolute: page.title } : page.title;
  return {
    title,
    description: page.description,
    alternates: {
      canonical: paths[language],
      languages: {
        [languageNames.en.hrefLang]: paths.en,
        [languageNames.tr.hrefLang]: paths.tr,
        "x-default": paths.en,
      },
    },
    openGraph: {
      title: page.absoluteTitle ? page.title : `${page.title} | ${site.name}`,
      description: page.description,
      url: paths[language],
      siteName: site.name,
      locale: languageNames[language].locale,
      type: "website",
    },
  };
}
