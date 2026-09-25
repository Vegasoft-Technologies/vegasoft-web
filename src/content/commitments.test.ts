import assert from "node:assert/strict";
import test from "node:test";
import { company } from "./company.ts";
import { commitment, commitments } from "./en/commitments.ts";

test("ids are unique", () => {
  const ids = commitments.items.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("the confirmed commitments exist and are approved", () => {
  for (const id of [
    "first-call",
    "reply",
    "payment",
    "progress",
    "ownership",
    "confidentiality",
    "on-site",
    "support-hours",
  ]) {
    const found = commitments.items.find((item) => item.id === id);
    assert.ok(found, id);
    assert.equal(found.approved, true, id);
    assert.deepEqual(commitment(id), found);
  }
});

test("a draft is not returned as a commitment", () => {
  for (const item of commitments.items) {
    if (!item.approved) assert.equal(commitment(item.id), null, item.id);
  }
  assert.equal(commitment("does-not-exist"), null);
});

test("every entry has a title and a text ending in a full stop", () => {
  for (const item of commitments.items) {
    assert.ok(item.title.trim().length > 0, item.id);
    assert.match(item.text, /\.$/, item.id);
  }
});

test("the support hours in the commitment and in the structured data agree", () => {
  const item = commitment("support-hours");
  const hours = company.supportHours;
  if (item === null || hours === null) return;
  // "09:00" in the data is written "9:00" in the sentence.
  for (const time of [hours.opens, hours.closes]) {
    assert.ok(item.text.includes(time.replace(/^0/, "")), time);
  }
  for (const day of [hours.days[0], hours.days[hours.days.length - 1]]) {
    assert.ok(item.text.includes(day), day);
  }
});
