// Every word on the About page. The ownership text comes from the commitments, so the
// two can never differ.

import { pagePath } from "../routes.ts";
import { commitments } from "./commitments.ts";

const ownership = commitments.items.find((item) => item.id === "ownership");

export const about = {
  meta: {
    title: "About",
    description:
      "Vegasoft Technologies builds software, data tools and AI that take repetitive work off businesses.",
  },
  title: "About Vegasoft",
  lead: "We build software, data tools and AI that take repetitive work off businesses, from the machine on the factory floor to the inbox in the office.",
  principles: {
    title: "What we hold to",
    items: [
      {
        title: "Measurable work, not show",
        text: "We start from a job that costs time today and measure how long it really takes. Nothing grows before it proves its value.",
      },
      {
        title: "Small first",
        text: "A working version on a single process or line comes before anything bigger. Services marked Pilot stay a trial until the results have been measured.",
      },
      {
        title: "Yours to keep",
        text: ownership?.text ?? "",
      },
      {
        title: "Plain answers",
        text: "We say plainly whether a job is a fit and how long it would take, before any work starts.",
      },
    ],
  },
  where: {
    title: "Where we work",
  },
  company: {
    title: "The company",
    link: { label: "Company information", href: pagePath("company", "en") },
  },
  closing: {
    title: "Tell us about the job.",
    cta: { label: "All contact details", href: pagePath("contact", "en") },
  },
};
