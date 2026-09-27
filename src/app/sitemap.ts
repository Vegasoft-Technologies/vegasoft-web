import type { MetadataRoute } from "next";
import { allPagePaths, languageNames } from "@/content/routes.ts";
import { site } from "@/content/site.ts";

// Every page of the site in both languages, each with the other language beside it.
export default function sitemap(): MetadataRoute.Sitemap {
  return allPagePaths().flatMap((paths) => {
    const languages = {
      [languageNames.en.hrefLang]: `${site.url}${paths.en}`,
      [languageNames.tr.hrefLang]: `${site.url}${paths.tr}`,
      "x-default": `${site.url}${paths.en}`,
    };
    return [
      { url: `${site.url}${paths.en}`, alternates: { languages } },
      { url: `${site.url}${paths.tr}`, alternates: { languages } },
    ];
  });
}
