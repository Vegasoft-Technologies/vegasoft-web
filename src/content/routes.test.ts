import assert from "node:assert/strict";
import test from "node:test";
import { areaSlugs } from "./en/areas.ts";
import { content } from "./index.ts";
import {
  allPagePaths,
  allPaths,
  anchorHref,
  anchorId,
  areaForSegment,
  areaSegment,
  languages,
  otherLanguage,
  pagePath,
  pagePaths,
  serviceIndexPath,
  servicePath,
  servicePaths,
  type Language,
} from "./routes.ts";

const pageKeys = ["home", "about", "contact", "company"] as const;
const anchorKeys = [
  "services",
  "how-we-work",
  "pricing",
  "commitments",
  "proof",
  "questions",
  "contact",
] as const;

/** Every address that answers, in one language. */
function addresses(language: Language): Set<string> {
  return new Set(allPaths(language));
}

/** Every anchor on the home page, and every area row on it. */
function anchorsOn(language: Language): Set<string> {
  return new Set([
    ...anchorKeys.map((key) => anchorId(key, language)),
    ...areaSlugs.map((slug) => areaSegment(slug, language)),
  ]);
}

test("every page has an address in both languages, and no two are the same", () => {
  const seen = new Set<string>();
  for (const paths of allPagePaths()) {
    for (const language of languages) {
      assert.ok(paths[language].startsWith("/"), paths[language]);
      assert.ok(!seen.has(paths[language]), `${paths[language]} twice`);
      seen.add(paths[language]);
    }
  }
  assert.equal(seen.size, (areaSlugs.length + pageKeys.length) * languages.length);
});

test("every Turkish address sits under /tr", () => {
  for (const path of allPaths("tr")) {
    assert.ok(path === "/tr" || path.startsWith("/tr/"), path);
  }
  assert.ok(serviceIndexPath("tr").startsWith("/tr/"));
});

test("an area's address segment leads back to the area", () => {
  for (const language of languages) {
    for (const slug of areaSlugs) {
      assert.equal(areaForSegment(areaSegment(slug, language), language), slug);
      assert.ok(servicePath(slug, language).endsWith(areaSegment(slug, language)));
      assert.equal(servicePaths(slug)[language], servicePath(slug, language));
    }
    assert.equal(areaForSegment("nothing-here", language), undefined);
  }
});

test("the language switch leads to the same page in the other language", () => {
  for (const language of languages) {
    const other = otherLanguage(language);
    assert.notEqual(other, language);
    for (const key of pageKeys) {
      assert.equal(pagePaths(key)[other], pagePath(key, other));
    }
  }
});

test("every link in the copy points at a page or an anchor that exists", () => {
  for (const language of languages) {
    const paths = addresses(language);
    const anchors = anchorsOn(language);
    const home = pagePath("home", language);
    const hrefs: string[] = [];
    const walk = (value: unknown) => {
      if (Array.isArray(value)) return value.forEach(walk);
      if (value !== null && typeof value === "object") {
        for (const [key, item] of Object.entries(value)) {
          if (key === "href" && typeof item === "string") hrefs.push(item);
          else walk(item);
        }
      }
    };
    walk(content[language]);
    assert.ok(hrefs.length > 0, language);
    for (const href of hrefs) {
      if (/^(https?:|mailto:|tel:)/.test(href)) continue;
      const [path, anchor] = href.split("#");
      const page = path === "" ? home : path;
      assert.ok(paths.has(page), `${language}: ${href} is not a page`);
      if (anchor !== undefined) {
        assert.ok(anchors.has(anchor), `${language}: #${anchor} is not on a page`);
      }
    }
  }
});

test("a link to a section of the home page carries the home page's address", () => {
  for (const language of languages) {
    for (const key of anchorKeys) {
      const href = anchorHref(key, language);
      assert.ok(href.includes(`#${anchorId(key, language)}`), href);
      if (language === "tr") assert.ok(href.startsWith("/tr#"), href);
    }
  }
});
