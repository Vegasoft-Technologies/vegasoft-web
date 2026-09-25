// Promises to clients, in the order a client meets them. An approved entry is published.
// One with approved: false is a proposed sentence for the owner to decide on: it is left
// out of the production build and shown in place, marked as a draft, where the markers
// are on (src/lib/soon.ts). No entry states a figure.

export type Commitment = { id: string; title: string; text: string; approved: boolean };

export const commitments = {
  title: "What you can count on",
  intro: "The same on every job, from a first step to a system that has run for years.",
  items: [
    {
      id: "first-call",
      title: "A first conversation costs nothing",
      text: "The first conversation is free. We look at the job with you and say whether it is a fit before any fee is agreed.",
      approved: true,
    },
    {
      id: "reply",
      title: "A reply within one working day",
      text: "Email or call, and you hear back from us within one working day.",
      approved: true,
    },
    {
      id: "payment",
      title: "Payment follows the work",
      text: "Payment is staged against the written scope, and nothing is due before the scope is agreed.",
      approved: true,
    },
    {
      id: "progress",
      title: "You see the work as it is built",
      text: "You see working software while it is being built, not only at the end.",
      approved: true,
    },
    {
      id: "ownership",
      title: "Yours to keep",
      text: "You own what we build: the code, the data and the documentation. If you ever move to someone else, we hand over everything they need to look after it.",
      approved: true,
    },
    {
      id: "confidentiality",
      title: "Your business stays your business",
      text: "We sign a non-disclosure agreement before we look at your data if you ask for one, and we never name you as a client without your written permission.",
      approved: true,
    },
    {
      id: "on-site",
      title: "On site when it matters",
      text: "We work remotely and come on site when the job needs it, for example to see a line running or to install a system.",
      approved: true,
    },
    {
      id: "support-hours",
      title: "Support hours",
      text: "Support runs Monday to Friday, 9:00 to 18:00 UK time, with cover outside those hours by arrangement.",
      approved: true,
    },
    {
      id: "data-hosting",
      title: "Where your data lives",
      text: "Your data is hosted in the United Kingdom or the European Union, and you are told where before a system goes live.",
      approved: false,
    },
  ] satisfies Commitment[],
};

/** An approved commitment by id, or null when it is not approved or does not exist. */
export function commitment(id: string): Commitment | null {
  const found = commitments.items.find((item) => item.id === id);
  return found && found.approved ? found : null;
}
