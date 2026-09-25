import assert from "node:assert/strict";
import test from "node:test";
import { content } from "./index.ts";
import { languages, type Language } from "./routes.ts";

// Phrases the writing rules exclude (docs/engineering-guidelines.md, "Writing"). They are
// matched anywhere in a string, ignoring case.
const excludedPhrases: Record<Language, string[]> = {
  en: [
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
  ],
  tr: [
    "yenilikçi",
    "inovatif",
    "dijital dönüşüm",
    "son teknoloji",
    "sektör lideri",
    "öncü",
    "çığır açan",
    "fark yaratan",
    "benzersiz",
    "uçtan uca",
    "sinerji",
    "katma değer",
    "vizyoner",
    "kusursuz",
    "dünya standartlarında",
  ],
};

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

const copy: Record<Language, Text[]> = {
  en: collect(content.en, "en"),
  tr: collect(content.tr, "tr"),
};

test("the copy avoids the excluded phrases, in both languages", () => {
  for (const language of languages) {
    for (const { path, text } of copy[language]) {
      for (const phrase of excludedPhrases[language]) {
        assert.ok(
          !text.toLocaleLowerCase(language).includes(phrase),
          `${path}: ${phrase}`,
        );
      }
    }
  }
});

test("no arrows, long dashes or exclamation marks, in either language", () => {
  for (const language of languages) {
    for (const { path, text } of copy[language]) {
      assert.doesNotMatch(text, /[→—–!]/, path);
    }
  }
});

// The site's copy uses the trading name. The legal name appears only in the footer's
// legal line, on the Company information page and in the structured data, and always
// comes from src/content/company.ts.
test("no copy file names the company behind the trading name", () => {
  for (const language of languages) {
    for (const { path, text } of copy[language]) {
      assert.doesNotMatch(text, /\bLtd\b|\bLimited\b/, path);
    }
  }
});

test("the Turkish copy is written in Turkish", () => {
  const turkish = copy.tr.map((entry) => entry.text).join(" ");
  assert.match(turkish, /[ğşıİçöüÇÖÜĞŞ]/, "no Turkish letters found");
});
