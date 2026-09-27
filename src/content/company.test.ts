import assert from "node:assert/strict";
import test from "node:test";
import { company, formatAddress } from "./company.ts";
import { content } from "./index.ts";
import { languages } from "./routes.ts";

function isTrimmedText(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value === value.trim();
}

function isLink(value: unknown): boolean {
  return (
    value !== null &&
    typeof value === "object" &&
    isTrimmedText((value as { label?: unknown }).label) &&
    isTrimmedText((value as { href?: unknown }).href)
  );
}

test("the trading name is Vegasoft Technologies", () => {
  assert.equal(company.tradingName, "Vegasoft Technologies");
});

test("the text details are unknown (null) or trimmed and non-empty", () => {
  for (const key of [
    "legalName",
    "placeOfRegistration",
    "location",
    "companyNumber",
    "vatNumber",
    "serviceArea",
    "founded",
  ] as const) {
    const value = company[key];
    assert.ok(value === null || isTrimmedText(value), key);
  }
});

test("the registered office has every part, or is not known", () => {
  const { address } = company;
  if (address === null) return;
  for (const part of ["street", "town", "postcode", "country"] as const) {
    assert.ok(isTrimmedText(address[part]), part);
  }
  assert.equal(
    formatAddress(address),
    `${address.street}, ${address.town} ${address.postcode}`,
  );
});

test("every profile is a label and an address", () => {
  if (company.social === null) return;
  assert.ok(company.social.length > 0);
  for (const link of company.social) assert.ok(isLink(link), link.label);
});

test("the support hours name days and two times of day", () => {
  const { supportHours } = company;
  if (supportHours === null) return;
  assert.ok(supportHours.days.length > 0);
  for (const day of supportHours.days) assert.ok(isTrimmedText(day), day);
  for (const time of [supportHours.opens, supportHours.closes]) {
    assert.match(time, /^\d{2}:\d{2}$/, time);
  }
});

test("every detail has a label in every language", () => {
  for (const language of languages) {
    const labels = content[language].companyLabels;
    for (const key of Object.keys(company)) {
      assert.ok(isTrimmedText(labels[key as keyof typeof labels]), `${language} ${key}`);
    }
  }
});
