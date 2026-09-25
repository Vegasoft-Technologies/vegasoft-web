import assert from "node:assert/strict";
import test from "node:test";
import { company, companyLabels, legalLineFields } from "./company.ts";

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

test("every other detail is unknown (null), a trimmed non-empty value or link, or a non-empty list of them", () => {
  for (const [key, value] of Object.entries(company)) {
    if (key === "tradingName") continue;
    const ok =
      value === null ||
      isTrimmedText(value) ||
      isLink(value) ||
      (Array.isArray(value) &&
        value.length > 0 &&
        value.every((item) => isTrimmedText(item) || isLink(item)));
    assert.ok(ok, key);
  }
});

test("every detail has a label, and the legal line names real details", () => {
  for (const key of Object.keys(company)) {
    assert.ok(key in companyLabels, `${key} has no label`);
  }
  for (const key of legalLineFields) {
    assert.ok(key in company, key);
  }
});
