import assert from "node:assert/strict";
import test from "node:test";
import { company } from "../content/company.ts";
import { questions } from "../content/en/questions.ts";
import { site } from "../content/site.ts";
import { structuredData, structuredDataJson } from "./structured-data.ts";

function walk(
  value: unknown,
  path: string,
  visit: (path: string, value: unknown) => void,
) {
  visit(path, value);
  if (Array.isArray(value))
    value.forEach((item, i) => walk(item, `${path}[${i}]`, visit));
  else if (value !== null && typeof value === "object")
    for (const [key, item] of Object.entries(value)) walk(item, `${path}.${key}`, visit);
}

test("the graph holds the organisation, the site and the questions", () => {
  const types = structuredData()["@graph"].map((node) => node["@type"]);
  assert.deepEqual(types, ["Organization", "WebSite", "FAQPage"]);
});

test("every question on the page is in the structured data, in order", () => {
  const faq = structuredData()["@graph"][2] as { mainEntity: { name: string }[] };
  assert.deepEqual(
    faq.mainEntity.map((entity) => entity.name),
    questions.items.map((item) => item.question),
  );
});

test("a company detail that is not known yet is left out, never null", () => {
  walk(structuredData(), "graph", (path, value) => {
    assert.notEqual(value, null, path);
    assert.notEqual(value, "", path);
  });
  const organization = structuredData()["@graph"][0] as Record<string, unknown>;
  assert.equal("legalName" in organization, company.legalName !== null);
  assert.equal("address" in organization, company.address !== null);
  assert.equal("areaServed" in organization, company.serviceArea !== null);
  assert.equal("foundingDate" in organization, company.founded !== null);
  assert.equal("sameAs" in organization, company.social !== null);
});

test("the organisation has a contact point with the email address and the telephone number", () => {
  const organization = structuredData()["@graph"][0] as {
    contactPoint: { email: string; telephone: string; availableLanguage?: string[] };
  };
  assert.equal(organization.contactPoint.email, site.email);
  assert.equal(organization.contactPoint.telephone, site.phone);
  assert.equal(
    "availableLanguage" in organization.contactPoint,
    company.languages !== null,
  );
});

test("the script text parses back and cannot close a script element", () => {
  const json = structuredDataJson();
  assert.ok(!json.includes("<"));
  assert.deepEqual(JSON.parse(json), structuredData());
});
