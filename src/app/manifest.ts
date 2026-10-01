import type { MetadataRoute } from "next";
import { site } from "@/content/site.ts";

// The small manifest a browser reads when someone adds the site to a home screen. The
// site is not an application and has no offline mode; this is here so that the name and
// the icon are right when a browser asks for them.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: "Software, data and AI for repetitive work.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    // The navy the mark is drawn on, --navy in src/styles/tokens.css.
    theme_color: "#0b1f3a",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/vegasoft-logo-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
