import assert from "node:assert/strict";
import test from "node:test";
import { oldAddresses } from "./redirects.ts";
import { content } from "./index.ts";
import { allPagePaths, languages, type Language } from "./routes.ts";
import { site } from "./site.ts";
import { structuredData } from "../lib/structured-data.ts";

/** What a search result can show: how long a description may be, either way. */
const descriptionLimits = { min: 120, max: 160 };

/** Every page's title as the browser tab shows it, and its description. */
function pagesFor(
  language: Language,
): { page: string; title: string; description: string }[] {
  const c = content[language];
  const named = [
    // The home page sets its own title in full; the rest are completed by the layout.
    { page: "home", title: c.home.meta.title, description: c.home.meta.description },
    ...(
      [
        ["about", c.about.meta],
        ["contact", c.contact.meta],
        ["company", c.companyPage.meta],
        ["privacy", c.privacy.meta],
      ] as const
    ).map(([page, meta]) => ({
      page,
      title: `${meta.title} | ${site.name}`,
      description: meta.description,
    })),
    ...c.areas.map((area) => ({
      page: `services/${area.slug}`,
      title: `${area.name} | ${site.name}`,
      description: area.metaDescription,
    })),
  ];
  return named;
}

test("every page in both languages has a title, and no two are the same", () => {
  const all: string[] = [];
  for (const language of languages) {
    const pages = pagesFor(language);
    // The sitemap's count is the number of pages the site has, per language.
    assert.equal(pages.length, allPagePaths().length, language);
    for (const { page, title } of pages) {
      assert.ok(title.trim().length > 0, `${language} ${page}`);
      // The home page leads with the brand; every other page ends with it.
      const placed =
        page === "home" ? title.startsWith(site.name) : title.endsWith(site.name);
      assert.ok(placed, `${language} ${page}: ${title}`);
      all.push(title);
    }
  }
  assert.equal(new Set(all).size, all.length, "two pages share a title");
});

test("the home page's title starts with the site name, and the others do not", () => {
  for (const language of languages) {
    const [home, ...rest] = pagesFor(language);
    assert.ok(home.title.startsWith(site.name), `${language}: ${home.title}`);
    for (const { page, title } of rest) {
      assert.ok(
        !title.startsWith(site.name),
        `${language} ${page} begins with the brand`,
      );
    }
  }
});

test("every description is between 120 and 160 characters, and none repeats", () => {
  const all: string[] = [];
  for (const language of languages) {
    for (const { page, description } of pagesFor(language)) {
      const length = [...description].length;
      assert.ok(
        length >= descriptionLimits.min && length <= descriptionLimits.max,
        `${language} ${page}: ${length} characters`,
      );
      all.push(description);
    }
  }
  assert.equal(new Set(all).size, all.length, "two pages share a description");
});

test("the structured data gives Google the site name, the short name and a raster logo", () => {
  for (const language of languages) {
    const graph = structuredData(language)["@graph"] as Record<string, unknown>[];
    const webSite = graph.find((node) => node["@type"] === "WebSite");
    assert.ok(webSite, language);
    assert.equal(webSite.name, site.name);
    assert.equal(webSite.alternateName, site.shortName);
    // It describes the domain, so both languages point at the root, not at /tr/.
    assert.equal(webSite.url, `${site.url}/`);
    assert.equal(webSite["@id"], `${site.url}/#website`);

    const organization = graph.find((node) => node["@type"] === "Organization");
    assert.ok(organization, language);
    const logo = String(organization.logo);
    assert.match(logo, /^https:\/\/vegasoft\.co\.uk\/.+\.png$/, "the logo must be a PNG");
    assert.ok(logo.includes("512"), "and at least 112 px square");
  }
});

test("every redirect from the old site lands on a page that exists", () => {
  const paths = new Set(allPagePaths().flatMap((entry) => [entry.en, entry.tr]));
  assert.ok(oldAddresses.length > 0);
  for (const { source, destination, why } of oldAddresses) {
    assert.match(source, /^\/[^\s]*$/, source);
    assert.ok(why.trim().length > 0, `${source} has no reason`);
    // A fragment points at a section of the page before the hash.
    const [path] = destination.split("#");
    assert.ok(paths.has(path === "" ? "/" : path), `${source} -> ${destination}`);
  }
  assert.equal(new Set(oldAddresses.map((a) => a.source)).size, oldAddresses.length);
});
