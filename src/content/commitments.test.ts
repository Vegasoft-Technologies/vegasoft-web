import assert from "node:assert/strict";
import test from "node:test";
import { commitment, commitments } from "./en/commitments.ts";

test("ids are unique", () => {
  const ids = commitments.items.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("the three approved commitments exist and are approved", () => {
  for (const id of ["reply", "ownership", "on-site"]) {
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
