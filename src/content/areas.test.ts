import assert from "node:assert/strict";
import test from "node:test";
import { areas, areaSlugs } from "./en/areas.ts";
import { home } from "./en/home.ts";

test("the seven areas appear in catalogue order", () => {
  assert.deepEqual(
    areas.map((area) => area.slug),
    [...areaSlugs],
  );
});

test("there are fifty-two services, each with a one-sentence-or-more description", () => {
  const services = areas.flatMap((area) => area.services);
  assert.equal(services.length, 52);
  for (const service of services) {
    assert.ok(service.name.trim().length > 0);
    assert.match(service.description, /\.$/, `${service.name}: end with a full stop`);
  }
});

test("service names are unique", () => {
  const names = areas.flatMap((area) => area.services.map((service) => service.name));
  assert.equal(new Set(names).size, names.length);
});

test("exactly three services are pilots", () => {
  const pilots = areas.flatMap((area) =>
    area.services.filter((service) => service.pilot).map((service) => service.name),
  );
  assert.deepEqual(pilots, [
    "Predictive maintenance signals",
    "Visual quality inspection",
    "Demand and stock forecasting",
  ]);
});

test("every problem on the home page points at an existing area", () => {
  for (const problem of home.problems.items) {
    assert.ok(areaSlugs.includes(problem.area), problem.text);
  }
});
