import assert from "node:assert/strict";
import test from "node:test";
import { content } from "./index.ts";
import { languages, type Language } from "./routes.ts";

const [first, ...rest] = languages;

// A language's own lookup table, keyed by a value rather than by a field: English needs
// no Turkish name for a place of registration, and Turkish does.
const lookups = new Set(["placeNames"]);

/** The shape of a value: its keys and the length of its lists, without the words. */
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return { list: value.length, items: value.map(shape) };
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, item]) => [key, lookups.has(key) ? "lookup" : shape(item)]),
    );
  }
  return typeof value;
}

test("both languages hold the same shape, key for key", () => {
  for (const language of rest) {
    assert.deepEqual(
      shape(content[language]),
      shape(content[first]),
      `${language} differs from ${first}`,
    );
  }
});

test("both languages hold the seven areas, in the same order", () => {
  for (const language of languages) {
    assert.deepEqual(
      content[language].areas.map((area) => area.slug),
      content[first].areas.map((area) => area.slug),
      language,
    );
  }
});

test("both languages hold fifty-two services, with the same three pilots", () => {
  for (const language of languages) {
    const services = content[language].areas.flatMap((area) => area.services);
    assert.equal(services.length, 52, language);
    const pilots = content[language].areas.flatMap((area, areaIndex) =>
      area.services
        .map((service, index) => ({ service, index }))
        .filter(({ service }) => service.pilot)
        .map(({ index }) => `${areaIndex}.${index}`),
    );
    assert.deepEqual(pilots, ["0.5", "3.5", "4.2"], language);
    for (const service of services) {
      assert.ok(service.name.trim().length > 0, language);
      assert.match(service.description, /\.$/, `${language}: ${service.name}`);
    }
  }
});

test("both languages hold the same six problems, pointing at the same areas", () => {
  for (const language of languages) {
    assert.deepEqual(
      content[language].home.problems.items.map((problem) => problem.area),
      content[first].home.problems.items.map((problem) => problem.area),
      language,
    );
  }
});

test("both languages hold the same commitments, with the same approvals", () => {
  for (const language of languages) {
    assert.deepEqual(
      content[language].commitments.items.map((item) => [item.id, item.approved]),
      content[first].commitments.items.map((item) => [item.id, item.approved]),
      language,
    );
  }
});

test("both languages hold the same rows on the company information page", () => {
  for (const language of languages) {
    assert.deepEqual(
      content[language].companyPage.rows,
      content[first].companyPage.rows,
      language,
    );
  }
});

test("no sentence is the same in both languages, except a name or a label", () => {
  // A quick guard against a Turkish file left in English: the longest sentences differ.
  const longest = (language: Language) =>
    JSON.stringify(content[language])
      .split('"')
      .filter((part) => part.length > 80)
      .sort((a, b) => b.length - a.length)
      .slice(0, 20);
  const english = new Set(longest("en"));
  for (const sentence of longest("tr")) {
    assert.ok(!english.has(sentence), sentence.slice(0, 60));
  }
});
