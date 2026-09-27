import assert from "node:assert/strict";
import test from "node:test";
import { company } from "./company.ts";
import { content } from "./index.ts";
import { languages } from "./routes.ts";

const approvedIds = [
  "first-call",
  "reply",
  "payment",
  "progress",
  "ownership",
  "confidentiality",
  "on-site",
  "support-hours",
];

test("ids are unique, in both languages", () => {
  for (const language of languages) {
    const ids = content[language].commitments.items.map((item) => item.id);
    assert.equal(new Set(ids).size, ids.length, language);
  }
});

test("the confirmed commitments exist and are approved", () => {
  for (const language of languages) {
    for (const id of approvedIds) {
      const found = content[language].commitments.items.find((item) => item.id === id);
      assert.ok(found, `${language}: ${id}`);
      assert.equal(found.approved, true, `${language}: ${id}`);
    }
  }
});

test("where your data lives is still a draft", () => {
  for (const language of languages) {
    const draft = content[language].commitments.items.find(
      (item) => item.id === "data-hosting",
    );
    assert.ok(draft, language);
    assert.equal(draft.approved, false, language);
  }
});

test("every entry has a title and a text ending in a full stop", () => {
  for (const language of languages) {
    for (const item of content[language].commitments.items) {
      assert.ok(item.title.trim().length > 0, `${language}: ${item.id}`);
      assert.match(item.text, /\.$/, `${language}: ${item.id}`);
    }
  }
});

test("the support hours in the commitment and in the structured data agree", () => {
  const hours = company.supportHours;
  if (hours === null) return;
  for (const language of languages) {
    const item = content[language].commitments.items.find(
      (entry) => entry.id === "support-hours",
    );
    assert.ok(item, language);
    // "09:00" in the data is written "9:00" or "09.00" in a sentence.
    for (const time of [hours.opens, hours.closes]) {
      const [h, m] = time.split(":");
      const pattern = new RegExp(`\\b0?${Number(h)}[:.]${m}\\b`);
      assert.match(item.text, pattern, `${language}: ${time}`);
    }
  }
});
