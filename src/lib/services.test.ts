import assert from "node:assert/strict";
import test from "node:test";
import { areas, areaSlugs } from "../content/en/areas.ts";
import { home } from "../content/en/home.ts";
import { areaBySlug, problemsFor, servicePath } from "./services.ts";

test("every area has a page, and its address is its slug", () => {
  for (const area of areas) {
    assert.equal(servicePath(area.slug), `/services/${area.slug}`);
    assert.equal(areaBySlug(area.slug), area);
  }
  assert.equal(areaBySlug("does-not-exist"), undefined);
});

test("every problem on the home page appears on the page of the area it points at", () => {
  for (const problem of home.problems.items) {
    assert.ok(problemsFor(problem.area).includes(problem.text), problem.text);
  }
});

test("a page's problems all belong to that area", () => {
  for (const slug of areaSlugs) {
    for (const text of problemsFor(slug)) {
      const problem = home.problems.items.find((item) => item.text === text);
      assert.equal(problem?.area, slug, text);
    }
  }
});
