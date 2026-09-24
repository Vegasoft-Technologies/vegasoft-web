import assert from "node:assert/strict";
import test from "node:test";
import { company } from "./company.ts";

test("the trading name is Vegasoft Technologies", () => {
  assert.equal(company.tradingName, "Vegasoft Technologies");
});

test("every other detail is unknown (null) or a trimmed, non-empty value", () => {
  for (const [key, value] of Object.entries(company)) {
    if (key === "tradingName") continue;
    assert.ok(
      value === null ||
        (typeof value === "string" && value.length > 0 && value === value.trim()),
      key,
    );
  }
});
