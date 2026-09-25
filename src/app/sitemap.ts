import type { MetadataRoute } from "next";
import { site } from "@/content/site.ts";

// Every page of the site, at the canonical address. Later pull requests add their pages.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${site.url}/` }];
}
