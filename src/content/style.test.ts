import assert from "node:assert/strict";
import test from "node:test";
import * as areas from "./en/areas.ts";
import * as home from "./en/home.ts";
import * as navigation from "./en/navigation.ts";
import * as notFound from "./en/not-found.ts";
import * as questions from "./en/questions.ts";
import * as services from "./en/services.ts";
import * as about from "./en/about.ts";
import * as commitments from "./en/commitments.ts";
import * as companyPage from "./en/company-page.ts";
import * as contact from "./en/contact.ts";
import * as legal from "./en/legal.ts";
import * as proof from "./en/proof.ts";

// Phrases the writing rules exclude (docs/engineering-guidelines.md, "Writing"). They are
// matched anywhere in a string, ignoring case.
const excludedPhrases = [
  "empower",
  "unlock",
  "seamless",
  "cutting-edge",
  "cutting edge",
  "revolutionise",
  "revolutionize",
  "leverage",
  "elevate",
  "harness",
  "supercharge",
  "game-changer",
  "game changer",
  "next-gen",
  "innovative solutions",
  "world-class",
  "best-in-class",
  "state-of-the-art",
  "fast-paced",
  "transform your business",
];

type Text = { path: string; text: string };

function collect(value: unknown, path: string): Text[] {
  if (typeof value === "string") return [{ path, text: value }];
  if (Array.isArray(value))
    return value.flatMap((item, i) => collect(item, `${path}[${i}]`));
  if (value !== null && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) =>
      collect(item, `${path}.${key}`),
    );
  }
  return [];
}

const copy = [
  ...collect(areas, "areas"),
  ...collect(home, "home"),
  ...collect(navigation, "navigation"),
  ...collect(notFound, "notFound"),
  ...collect(questions, "questions"),
  ...collect(services, "services"),
  ...collect(about, "about"),
  ...collect(commitments, "commitments"),
  ...collect(companyPage, "companyPage"),
  ...collect(contact, "contact"),
  ...collect(legal, "legal"),
  ...collect(proof, "proof"),
];

test("the English copy avoids the excluded phrases", () => {
  for (const { path, text } of copy) {
    for (const phrase of excludedPhrases) {
      assert.ok(!text.toLowerCase().includes(phrase), `${path} contains "${phrase}"`);
    }
  }
});

test("no arrows, long dashes or exclamation marks", () => {
  for (const { path, text } of copy) {
    assert.doesNotMatch(text, /[→—–!]/, path);
  }
});

// The site's copy uses the trading name. The legal name appears only in the footer's
// legal line, on the Company information page and in the structured data, and always
// comes from src/content/company.ts.
test("no copy file names the company behind the trading name", () => {
  for (const { path, text } of copy) {
    assert.doesNotMatch(text, /\bLtd\b|\bLimited\b/, path);
  }
});
