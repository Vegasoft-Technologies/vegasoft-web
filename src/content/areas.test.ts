import assert from "node:assert/strict";
import test from "node:test";
import { areaSlugs } from "./en/areas.ts";
import { content } from "./index.ts";
import { languages } from "./routes.ts";

test("the seven areas appear in catalogue order, in both languages", () => {
  for (const language of languages) {
    assert.deepEqual(
      content[language].areas.map((area) => area.slug),
      [...areaSlugs],
      language,
    );
  }
});

test("service names are unique within a language", () => {
  for (const language of languages) {
    const names = content[language].areas.flatMap((area) =>
      area.services.map((service) => service.name),
    );
    assert.equal(new Set(names).size, names.length, language);
  }
});

test("every problem on the home page points at an existing area", () => {
  for (const language of languages) {
    for (const problem of content[language].home.problems.items) {
      assert.ok(areaSlugs.includes(problem.area), `${language}: ${problem.text}`);
    }
  }
});

test("only the Websites area carries an example, in both languages", () => {
  for (const language of languages) {
    const withExample = content[language].areas
      .filter((area) => area.example)
      .map((area) => area.slug);
    assert.deepEqual(withExample, ["websites"], language);
  }
});
