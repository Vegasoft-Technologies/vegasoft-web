import type { MetadataRoute } from "next";
import { site } from "@/content/site.ts";

// Everything may be crawled at the canonical address. Preview and workers.dev addresses
// are kept out of search by the X-Robots-Tag header in next.config.ts, not by this file.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` };
}
