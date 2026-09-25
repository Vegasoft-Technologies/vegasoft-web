// Every word on the English home page. Components read from here; no copy lives in JSX.

import type { AreaSlug } from "./areas.ts";

type Problem = { text: string; area: AreaSlug };

const problems: Problem[] = [
  { text: "A machine stops and nobody knows why.", area: "manufacturing" },
  { text: "We type the same data into three different programs.", area: "automation" },
  { text: "We missed the deadline on an official notice.", area: "automation" },
  {
    text: "Our website is slow on phones and doesn't show up on Google.",
    area: "websites",
  },
  { text: "Customers ask us the same questions every day.", area: "ai" },
  { text: "Month-end reporting takes us two days in Excel.", area: "data" },
];

export const home = {
  meta: {
    title: "Vegasoft Technologies | Software, data and AI for repetitive work",
    description:
      "From the machine on the factory floor to the inbox in the office, we use software, data and AI to win back the hours a business loses every day.",
  },
  hero: {
    title: "Repetitive work, handed over to systems.",
    lead: "From the machine on the factory floor to the inbox in the office, we use software, data and AI to win back the hours a business loses every day.",
    cta: { label: "Tell us about the job", href: "#contact" },
    indexTitle: "Areas of work",
  },
  problems: {
    title: "Problems we hear most often",
    intro: "If one sounds familiar, the answer is in that section.",
    items: problems,
  },
  services: {
    title: "What we do",
    pilotNoteBefore: "Services marked",
    pilotNoteAfter:
      "start with a small trial on a single line or process, and are rolled out once the results have been measured.",
    audienceLabel: "Who it's for:",
    exampleLabel: "Example:",
  },
  approach: {
    title: "We build technology for measurable work, not for show.",
    body: "In most businesses the costliest losses are the invisible ones: data typed in by hand, a missed deadline, a stoppage nobody can explain, the same report rebuilt every month. We find that work, measure it and hand it to a system. What you get back is time your team can spend on its real job.",
    signal: {
      title: "An uneven, hand-drawn line that becomes a regular digital signal",
      handLabel: "by hand",
      systemLabel: "by system",
    },
  },
  howWeWork: {
    title: "How we work",
    youGetLabel: "You get:",
    steps: [
      {
        title: "Listen",
        text: "We see the problem on site and measure together how long each task really takes.",
        youGet:
          "a written note of how the job is done today, how long it takes and what a system would change.",
      },
      {
        title: "Start small",
        text: "We first build a working version for a single process or line. Nothing grows before it proves its value.",
        youGet: "a working version on one process or line, with its results measured.",
      },
      {
        title: "Install and hand over",
        text: "We install it in your environment, train your team and document how it works.",
        youGet:
          "the system running in your environment, a trained team and written documentation.",
      },
      {
        title: "Stay with you",
        text: "We continue with maintenance, updates and monitoring, and extend the system as your needs grow.",
        youGet:
          "maintenance, updates and monitoring for a fixed monthly fee, and changes as your needs grow.",
      },
    ],
  },
  pricing: {
    title: "How we price",
    intro:
      "Every job is different, so we don't publish a price list. The way we build a price is always the same.",
    items: [
      {
        title: "A fixed-price first step",
        text: "We look at the job with you, measure it and set out in writing what a system would change. The fee for this step is agreed before it starts.",
      },
      {
        title: "A one-off price for the build",
        text: "The build is priced against that written scope, so you know the cost before any work begins.",
      },
      {
        title: "A monthly fee to keep it running",
        text: "Hosting, updates, monitoring and support after handover, for a fixed monthly fee.",
      },
    ],
  },
  contact: {
    title: "Tell us about the job.",
    body: "If something in your business is repeated by hand every day, it can very likely be handed to a system. Tell us about it and we'll say plainly whether it's a fit and how long it would take. Needs not listed here are welcome too.",
    hint: "It helps to know what is repeated, how often, who does it, and which programs or machines are involved. A rough note is enough. You do not need a specification.",
    cta: { label: "Email us", href: "mailto:hello@vegasoft.co.uk" },
    allDetails: { label: "All contact details", href: "/contact" },
    emailLabel: "Email",
    phoneLabel: "Phone",
    locationLabel: "Location",
  },
};
