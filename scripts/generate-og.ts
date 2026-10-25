/**
 * Open Graph image generation (D-088 · SEO-10): renders one static
 * 1200×630 PNG per locale into public/og/ — the logo plus the existing
 * home title (src/messages/*.json, no new copy). Run by hand after the
 * title changes: `npx tsx scripts/generate-og.ts`.
 *
 * Fonts are embedded as data URLs so the result never depends on the
 * machine: Arabic uses the archived Noto Kufi Arabic subset
 * (media-source/fonts/notokufi-5.woff2, OFL — the site itself uses the
 * system Arial stack since D-088), English uses the site's Archivo.
 */
import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "@playwright/test";
import ar from "../src/messages/ar.json";
import en from "../src/messages/en.json";

const root = join(import.meta.dirname, "..");
const dataUrl = (rel: string, type: string) =>
  `data:${type};base64,${readFileSync(join(root, rel)).toString("base64")}`;

const LOGO = dataUrl("public/brand/logo-dark.png", "image/png");
const FONTS = {
  ar: { family: "OG Kufi", src: dataUrl("media-source/fonts/notokufi-5.woff2", "font/woff2"), weight: "400 700" },
  // archivo-3 is the Basic Latin subset of the variable font
  en: { family: "OG Archivo", src: dataUrl("public/fonts/archivo-3.woff2", "font/woff2"), weight: "100 900" },
} as const;

function page(locale: "ar" | "en"): string {
  const title = (locale === "ar" ? ar : en).home.title;
  const [brand, tagline] = title.split(" — ");
  const f = FONTS[locale];
  return `<!doctype html><html lang="${locale}" dir="${locale === "ar" ? "rtl" : "ltr"}"><head><meta charset="utf-8">
<style>
@font-face { font-family: "${f.family}"; src: url(${f.src}) format("woff2"); font-weight: ${f.weight}; }
* { margin: 0; box-sizing: border-box; }
html, body { width: 1200px; height: 630px; }
body { background: radial-gradient(120% 90% at 85% 10%, #1a0d16 0%, #0a0a0c 55%, #060607 100%);
  color: #f5f5f4; font-family: "${f.family}", sans-serif; display: flex; align-items: center; gap: 64px; padding: 0 96px; }
img { width: 300px; height: auto; flex: none; }
h1 { font-size: ${locale === "ar" ? 64 : 60}px; font-weight: 700; line-height: 1.3; }
p { margin-top: 20px; font-size: ${locale === "ar" ? 40 : 36}px; font-weight: 500; line-height: 1.5; color: #b4b4b1; }
.bar { width: 96px; height: 6px; background: #ff189c; margin-top: 32px; }
</style></head><body><img src="${LOGO}" alt=""><div><h1>${brand}</h1>${tagline ? `<p>${tagline}</p>` : ""}<div class="bar"></div></div></body></html>`;
}

async function main() {
  const out = join(root, "public/og");
  mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const locale of ["ar", "en"] as const) {
    const p = await ctx.newPage();
    await p.setContent(page(locale), { waitUntil: "load" });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: join(out, `og-${locale}.png`), type: "png" });
    await p.close();
    console.log(`generate-og: public/og/og-${locale}.png`);
  }
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
