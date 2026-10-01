// Draws every raster icon from src/app/icon.svg, the white V on navy, so that all of
// them are the same mark at every size. Run it again whenever the mark changes.
//
//   npx playwright@1 install chromium   # once, if the browser is missing
//   node scripts/icons.mjs
//
// CHROME_PATH=/path/to/chrome overrides the browser, for a machine whose installed
// Chromium is not the build this Playwright expects.
//
// Playwright is not a dependency of the site. The files it writes are committed, so a
// build never needs it.
//
// What it writes:
//   src/app/favicon.ico              16, 32 and 48 px, which is what Google reads
//   src/app/icon.png                 192 px, for the web manifest and Android
//   public/brand/vegasoft-logo-512.png  512 px, the Organization logo in structured
//                                       data, which has to be a raster square

import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const markUrl = new URL("../src/app/icon.svg", import.meta.url);
const mark = await readFile(markUrl, "utf8");

/** The mark drawn at one size, as PNG bytes. */
async function draw(page, size) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<!doctype html><meta charset="utf-8">
     <style>html,body{margin:0;padding:0;background:transparent}
     svg{display:block;width:${size}px;height:${size}px}</style>${mark}`,
    { waitUntil: "load" },
  );
  return page.screenshot({ type: "png", omitBackground: true });
}

/**
 * An .ico holding one PNG per size. The header is six bytes, then sixteen bytes per
 * image, then the images themselves: all little-endian.
 */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 means icon
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, png }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // 0 means 256
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // colours in the palette: none, it is a PNG
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map((image) => image.png)]);
}

const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
);
const page = await browser.newPage({ deviceScaleFactor: 1 });

const forIco = [];
for (const size of [16, 32, 48]) forIco.push({ size, png: await draw(page, size) });
await writeFile(new URL("../src/app/favicon.ico", import.meta.url), ico(forIco));
console.log("src/app/favicon.ico", forIco.map((i) => i.size).join(", "));

for (const [target, size] of [
  ["../src/app/icon.png", 192],
  ["../public/brand/vegasoft-logo-512.png", 512],
]) {
  await writeFile(new URL(target, import.meta.url), await draw(page, size));
  console.log(target.replace("../", ""), `${size}px`);
}

await browser.close();
