// Links in the header and footer, and the words assistive technology reads. Every
// address comes from src/content/routes.ts, so a page is spelled in one place only.

import { anchorHref, pagePath } from "../routes.ts";

export type NavLink = { label: string; href: string };

export const navigation = {
  mainNav: [
    { label: "Services", href: anchorHref("services", "en") },
    { label: "About", href: pagePath("about", "en") },
    { label: "Contact", href: pagePath("contact", "en") },
  ] satisfies NavLink[],
  footer: {
    tagline: "Software, data and AI for repetitive work.",
    servicesTitle: "Services",
    companyTitle: "Company",
    contactTitle: "Contact",
    companyLinks: [
      { label: "About", href: pagePath("about", "en") },
      { label: "How we work", href: anchorHref("how-we-work", "en") },
      { label: "How we price", href: anchorHref("pricing", "en") },
      { label: "Questions", href: anchorHref("questions", "en") },
      { label: "Contact", href: pagePath("contact", "en") },
      { label: "Company information", href: pagePath("company", "en") },
    ] satisfies NavLink[],
    /** Pages that are coming. Their place is shown where the markers are on. */
    companySoon: ["Privacy notice", "Terms of business"],
  },
  /** Text that assistive technology reads, and the two markers. */
  labels: {
    skipLink: "Skip to content",
    mainNav: "Main",
    homeLink: "Vegasoft Technologies, home",
    /** On a detail or a page that is still coming. */
    soon: "Soon",
    /** Before a sentence the owner has not approved yet. */
    draft: "Draft, not yet approved:",
  },
};
