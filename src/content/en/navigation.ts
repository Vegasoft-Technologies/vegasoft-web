// Links in the header and footer. Pages that do not exist yet are reached through
// sections of the home page; each later pull request points its link at the new page.

export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "How we work", href: "/#how-we-work" },
  { label: "Contact", href: "/#contact" },
];

export const footer = {
  tagline: "Software, data and AI for repetitive work.",
  servicesTitle: "Services",
  companyTitle: "Company",
  contactTitle: "Contact",
  companyLinks: [
    { label: "How we work", href: "/#how-we-work" },
    { label: "How we price", href: "/#pricing" },
    { label: "Contact", href: "/#contact" },
  ] satisfies NavLink[],
};

/** Text that assistive technology reads but the page does not show. */
export const labels = {
  skipLink: "Skip to content",
  mainNav: "Main",
  homeLink: "Vegasoft Technologies, home",
};
