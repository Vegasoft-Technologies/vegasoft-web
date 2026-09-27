// Draws the sharing image for each language: navy, the white logo and the home page's
// headline, and nothing else. Run it again whenever the headline or the logo changes.
//
//   npx playwright@1 install chromium   # once, if the browser is missing
//   node scripts/og.mjs
//
// Playwright is not a dependency of the site. The two PNGs it writes are committed, so
// a build never needs it.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const size = { width: 1200, height: 630 };
const out = new URL("../public/og/", import.meta.url);

/** The headline each language shares, read from the site's own content. */
async function headlines() {
  const read = async (language) => {
    const file = await readFile(
      new URL(`../src/content/${language}/home.ts`, import.meta.url),
      "utf8",
    );
    const match = file.match(/hero: \{\s*\n\s*title: "([^"]+)"/);
    if (!match) throw new Error(`no headline found for ${language}`);
    return match[1];
  };
  return { en: await read("en"), tr: await read("tr") };
}

const template = (headline, logo) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap">
<style>
  * { box-sizing: border-box; margin: 0; }
  body {
    width: ${size.width}px; height: ${size.height}px;
    background: #0b1f3a; color: #ffffff;
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 72px 80px;
    font-family: "Archivo", Arial, sans-serif;
  }
  .logo { width: 260px; height: auto; }
  h1 {
    font-size: 78px; font-weight: 600; font-stretch: 88%;
    line-height: 1.02; letter-spacing: -0.02em; max-width: 16ch;
    text-wrap: balance;
  }
</style>
</head>
<body>
  <img class="logo" src="${logo}" alt="">
  <h1>${headline}</h1>
</body>
</html>`;

const logo = await readFile(
  new URL("../public/brand/vegasoft-logo-beyaz.svg", import.meta.url),
);
const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: size, deviceScaleFactor: 1 });
for (const [language, headline] of Object.entries(await headlines())) {
  await page.setContent(template(headline, logoSrc), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const png = await page.screenshot({ type: "png" });
  await writeFile(new URL(`share-${language}.png`, out), png);
  console.log(`public/og/share-${language}.png`, headline);
}
await browser.close();
