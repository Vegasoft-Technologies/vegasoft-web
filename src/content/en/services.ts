// The words on a service page that are not already in the services catalogue. The page
// itself is built from src/content/en/areas.ts (the area's name, promise, audience,
// services and example) and from the problems on the home page that point at it, so a
// change to the catalogue changes the page.

export const servicePage = {
  audienceLabel: "Who it's for:",
  problemsTitle: "Problems this solves",
  servicesTitle: "What we do",
  exampleTitle: "Example",
  next: {
    title: "How a job runs",
    links: [
      { label: "How we work", href: "/#how-we-work" },
      { label: "How we price", href: "/#pricing" },
      { label: "Questions we are asked", href: "/#questions" },
    ],
  },
  closing: {
    title: "Tell us about the job.",
    cta: { label: "All contact details", href: "/contact" },
  },
};
