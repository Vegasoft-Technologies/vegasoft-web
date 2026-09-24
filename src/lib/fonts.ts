import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

// Self-hosted at build time. latin-ext carries the Turkish letters (ğ, ş, ı, İ) that the
// Turkish pages will need.
//
// None of the three is preloaded. A preload fetches every subset listed, so the English
// page would fetch 112 KB of latin-ext files it never uses before its first paint. Without
// it the browser fetches only the subset files the page's text needs: latin alone on the
// English pages, and latin-ext as well on the Turkish ones.

/** Headings. Variable, with the width axis the headings narrow slightly. */
export const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
  preload: false,
});

/** Body text and interface. */
export const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-plex-sans",
  preload: false,
});

/** Diagram labels and data values only. */
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
  variable: "--font-plex-mono",
  preload: false,
});
