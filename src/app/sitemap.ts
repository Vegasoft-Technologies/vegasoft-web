import type { MetadataRoute } from "next";
import { areaSlugs } from "@/content/en/areas.ts";
import { site } from "@/content/site.ts";
import { servicePath } from "@/lib/services.ts";

// Every page of the site, at the canonical address. Later pull requests add their pages.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...areaSlugs.map((slug) => servicePath(slug)),
    "/about",
    "/contact",
    "/company",
  ];
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
