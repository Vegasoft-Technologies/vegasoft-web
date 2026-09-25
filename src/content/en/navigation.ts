// Links in the header and footer. The service pages do not exist yet, so Services points
// at the section of the home page; the pull request that adds them moves the link.

export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footer = {
  tagline: "Software, data and AI for repetitive work.",
  servicesTitle: "Services",
  companyTitle: "Company",
  contactTitle: "Contact",
  companyLinks: [
    { label: "About", href: "/about" },
    { label: "How we work", href: "/#how-we-work" },
    { label: "How we price", href: "/#pricing" },
    { label: "Questions", href: "/#questions" },
    { label: "Contact", href: "/contact" },
    { label: "Company information", href: "/company" },
  ] satisfies NavLink[],
  /** Pages that are coming. Their place is shown where the markers are on. */
  companySoon: ["Privacy notice", "Terms of business"],
};

/** Text that assistive technology reads but the page does not show. */
export const labels = {
  skipLink: "Skip to content",
  mainNav: "Main",
  homeLink: "Vegasoft Technologies, home",
  /** Before a sentence the owner has not approved yet. Shown only in development. */
  draft: "Draft, not yet approved:",
};
