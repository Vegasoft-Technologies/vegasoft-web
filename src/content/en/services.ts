// The words on a service page that are not already in the services catalogue. The page
// itself is built from src/content/en/areas.ts (the area's name, promise, audience,
// services and example) and from the problems on the home page that point at it, so a
// change to the catalogue changes the page.

import { anchorHref, pagePath } from "../routes.ts";

export const servicePage = {
  audienceLabel: "Who it's for:",
  problemsTitle: "Problems this solves",
  servicesTitle: "What we do",
  exampleTitle: "Example",
  next: {
    title: "How a job runs",
    links: [
      { label: "How we work", href: anchorHref("how-we-work", "en") },
      { label: "How we price", href: anchorHref("pricing", "en") },
      { label: "Questions we are asked", href: anchorHref("questions", "en") },
    ],
  },
  closing: {
    title: "Tell us about the job.",
    cta: { label: "All contact details", href: pagePath("contact", "en") },
  },
};
