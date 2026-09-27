import assert from "node:assert/strict";
import test from "node:test";
import { company } from "../content/company.ts";
import { content } from "../content/index.ts";
import { languageNames, languages } from "../content/routes.ts";
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

const graph = (language: "en" | "tr") =>
  structuredData(language)["@graph"] as Record<string, unknown>[];

test("the graph holds the organisation, the site and the questions", () => {
  for (const language of languages) {
    assert.deepEqual(
      graph(language).map((node) => node["@type"]),
      ["Organization", "WebSite", "FAQPage"],
      language,
    );
  }
});

test("each language's questions are in its own structured data, in order", () => {
  for (const language of languages) {
    const faq = graph(language)[2] as unknown as {
      inLanguage: string;
      mainEntity: { name: string }[];
    };
    assert.equal(faq.inLanguage, languageNames[language].hrefLang, language);
    assert.deepEqual(
      faq.mainEntity.map((entity) => entity.name),
      content[language].questions.items.map((item) => item.question),
      language,
    );
  }
});

test("a company detail that is not known yet is left out, never null", () => {
  for (const language of languages) {
    walk(structuredData(language), "graph", (path, value) => {
      assert.notEqual(value, null, `${language} ${path}`);
      assert.notEqual(value, "", `${language} ${path}`);
    });
    const organization = graph(language)[0];
    assert.equal("legalName" in organization, company.legalName !== null);
    assert.equal("address" in organization, company.address !== null);
    assert.equal("identifier" in organization, company.companyNumber !== null);
    assert.equal("vatID" in organization, company.vatNumber !== null);
    assert.equal("foundingDate" in organization, company.founded !== null);
    assert.equal("sameAs" in organization, company.social !== null);
  }
});

test("the registered office is in the structured data field by field", () => {
  const organization = graph("en")[0] as unknown as {
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
  const organization = graph("en")[0] as unknown as {
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
  for (const language of languages) {
    const json = structuredDataJson(language);
    assert.ok(!json.includes("<"), language);
    assert.deepEqual(JSON.parse(json), structuredData(language), language);
  }
});
