// Addresses the old site had, which are still in Google's index and would otherwise
// answer 404 here. They come from the Wayback Machine's record of vegasoft.co.uk; only
// pages that answered 200 are listed, not images or scripts.
//
// Relative imports, so that Node's test runner can load this file without the alias.

import { pagePath } from "./routes.ts";

export type OldAddress = {
  /** The address the old site served. */
  source: string;
  /** The nearest page here. A fragment points at a section of the home page. */
  destination: string;
  /** Why that is the nearest. */
  why: string;
};

export const oldAddresses: OldAddress[] = [
  {
    source: "/index.htm",
    destination: pagePath("home", "en"),
    why: "The old home page.",
  },
  {
    source: "/contact.php",
    destination: pagePath("contact", "en"),
    why: "The old contact page; this one does the same job.",
  },
  {
    source: "/services.htm",
    destination: "/#services",
    why: "The old list of services. The seven areas are a section of the home page, which is also where /services goes.",
  },
  {
    source: "/portfolio.htm",
    destination: pagePath("home", "en"),
    why: "The old page of past work. Nothing here matches it, because no case study is published yet, so a general page goes to the home page rather than to a 404.",
  },
];
