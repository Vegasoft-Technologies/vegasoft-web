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

const graph = () => structuredData()["@graph"] as Record<string, unknown>[];

test("the graph holds the organisation, the site and the questions", () => {
  assert.deepEqual(
    graph().map((node) => node["@type"]),
    ["Organization", "WebSite", "FAQPage"],
  );
});

test("every question on the page is in the structured data, in order", () => {
  const faq = graph()[2] as unknown as { mainEntity: { name: string }[] };
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
  const organization = graph()[0];
  assert.equal("legalName" in organization, company.legalName !== null);
  assert.equal("address" in organization, company.address !== null);
  assert.equal("identifier" in organization, company.companyNumber !== null);
  assert.equal("vatID" in organization, company.vatNumber !== null);
  assert.equal("foundingDate" in organization, company.founded !== null);
  assert.equal("sameAs" in organization, company.social !== null);
});

test("the registered office is in the structured data field by field", () => {
  const organization = graph()[0] as unknown as {
    address: {
      "@type": string;
      streetAddress: string;
      addressLocality: string;
      postalCode: string;
      addressCountry: string;
    };
    areaServed: { "@type": string; name: string };
  };
  assert.ok(company.address);
  assert.equal(organization.address["@type"], "PostalAddress");
  assert.equal(organization.address.streetAddress, company.address.street);
  assert.equal(organization.address.addressLocality, company.address.town);
  assert.equal(organization.address.postalCode, company.address.postcode);
  assert.equal(organization.address.addressCountry, company.address.country);
  assert.equal(organization.areaServed["@type"], "Country");
  assert.equal(organization.areaServed.name, company.address.country);
});

test("the contact point carries the email address, the phone number and the support hours", () => {
  const organization = graph()[0] as unknown as {
    contactPoint: {
      email: string;
      telephone: string;
      hoursAvailable?: {
        "@type": string;
        dayOfWeek: string[];
        opens: string;
        closes: string;
      };
    };
  };
  assert.equal(organization.contactPoint.email, site.email);
  assert.equal(organization.contactPoint.telephone, site.phone);
  assert.ok(company.supportHours);
  const hours = organization.contactPoint.hoursAvailable;
  assert.ok(hours, "hoursAvailable");
  assert.equal(hours["@type"], "OpeningHoursSpecification");
  assert.deepEqual(hours.dayOfWeek, company.supportHours.days);
  assert.equal(hours.opens, company.supportHours.opens);
  assert.equal(hours.closes, company.supportHours.closes);
});

test("the script text parses back as JSON and cannot close a script element", () => {
  const json = structuredDataJson();
  assert.ok(!json.includes("<"));
  assert.deepEqual(JSON.parse(json), structuredData());
});
