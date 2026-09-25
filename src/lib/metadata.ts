import type { Metadata } from "next";
import { site } from "@/content/site.ts";

/**
 * Metadata for a page other than the home page: its title (the layout adds the site
 * name), description, canonical address and Open Graph fields. A page's openGraph
 * replaces the layout's rather than merging with it, so the shared fields are repeated.
 */
export function pageMetadata(
  page: { title: string; description: string },
  path: string,
): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${page.title} | ${site.name}`,
      description: page.description,
      url: path,
      siteName: site.name,
      locale: "en_GB",
      type: "website",
    },
  };
}
