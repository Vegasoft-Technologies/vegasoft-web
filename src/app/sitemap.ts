import type { MetadataRoute } from "next";
import { allPagePaths, languageNames } from "@/content/routes.ts";
import { site } from "@/content/site.ts";

/**
 * When the site last changed. The deployment sets it from the commit it is building, so
 * rebuilding the same commit gives the same answer and a crawler is not told the pages
 * changed when only the build did. A build without it falls back to the build date,
 * which is near enough for a preview and for a workstation.
 */
const lastModified = new Date(process.env.SITE_LAST_MODIFIED ?? Date.now());

// Every page of the site in both languages, each with the other language beside it.
export default function sitemap(): MetadataRoute.Sitemap {
  return allPagePaths().flatMap((paths) => {
    const languages = {
      [languageNames.en.hrefLang]: `${site.url}${paths.en}`,
      [languageNames.tr.hrefLang]: `${site.url}${paths.tr}`,
      "x-default": `${site.url}${paths.en}`,
    };
    return [
      { url: `${site.url}${paths.en}`, lastModified, alternates: { languages } },
      { url: `${site.url}${paths.tr}`, lastModified, alternates: { languages } },
    ];
  });
}
