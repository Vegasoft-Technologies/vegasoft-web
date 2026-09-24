import assert from "node:assert/strict";
import test from "node:test";
import * as areas from "./en/areas.ts";
import * as home from "./en/home.ts";
import * as navigation from "./en/navigation.ts";
import * as notFound from "./en/not-found.ts";

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

test("the business is never described as a limited company", () => {
  for (const { path, text } of copy) {
    assert.doesNotMatch(text, /\bLtd\b|\bLimited\b/, path);
  }
});
