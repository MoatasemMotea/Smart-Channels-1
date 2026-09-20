import { expect, test } from "@playwright/test";

/**
 * Products media integration — focused regression (D-052 → D-058).
 * Owner mapping, delivery availability, archive privacy, homepage
 * preview, 24-category index, no invented commerce content.
 */
/* the D-058 §4 featured four, in the owner's exact order */
const FEATURED = [
  "/media/products/firewall-2026.webp",
  "/media/products/core-switch-2026.webp",
  "/media/products/laptop-2026.webp",
  "/media/products/cameras-2026.webp",
];
const DELIVERY = [
  ...FEATURED,
  "/media/products/switch-2026.webp",
  "/media/products/access-points-2026.webp",
  "/media/products/router-2026.webp",
  "/media/products/multi-charger-2026.webp",
  "/media/products/t60-2026.webp",
  "/media/products/sfp.webp",
  "/media/products/pc-2026.webp",
  "/media/products/ups-2026.webp",
  "/media/products/printers-2026.webp",
  "/media/products/nvr-2026.webp",
  "/media/products/tablet-2026.webp",
  "/media/products/hdmi-extender-2026.webp",
  "/media/products/media-converter-2026.webp",
  "/media/products/access-control-2026.webp",
  "/media/products/p2p-2026.webp",
];
/* the five categories that keep the designed media-pending state */
const FALLBACK = [
  "monitor", "hard-disk", "decoder", "face-recognition-terminals", "ac-adapter",
];
/* second-round files the owner held back — must never be published */
const HELD = [
  "/media-source/images/Point of contact.jpg",
  "/media-source/images/Router.jpg",
  "/media-source/images/UPS.jpg",
];

test("all nineteen product delivery images are publicly served", async ({ request }) => {
  for (const p of DELIVERY) {
    const res = await request.head(p);
    expect(res.status(), p).toBe(200);
  }
});

test("the product source archive is never publicly reachable", async ({ request }) => {
  for (const p of ["/media-source/images/products/01-switch.jpg", ...HELD]) {
    const res = await request.get(p, { maxRedirects: 0 });
    expect([307, 308, 404], p).toContain(res.status());
  }
});

test("/products: renders the first category (networking) exactly as its own page, no counters", async ({ page }) => {
  // D-063: the nine-tile index is gone — /products IS the first category by `order`
  await page.goto("/en/products", { waitUntil: "networkidle" });
  await expect(page.locator(".catalog-tile")).toHaveCount(0);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveText("Networking & Connectivity");
  await expect(page.locator(".catalog-card")).toHaveCount(8);
  await expect(page.locator('.catalog-side-link[aria-current="page"]')).toHaveText("Networking");
  await expect(page).toHaveTitle(/Products/); // generic metadata, not the category's
  const text = await page.evaluate(() => document.querySelector("main")?.innerText ?? "");
  expect(text).not.toMatch(/\b\d+\s*(products|items|cards)\b/i); // no counters anywhere
  expect(text).not.toMatch(/\$|SAR|price|buy now|add to cart/i);
  // the two routes render the same tree
  await page.goto("/en/products/networking", { waitUntil: "networkidle" });
  const own = await page.evaluate(() => document.querySelector("main")?.innerText ?? "");
  expect(own).toBe(text);
});

test("/products/networking: eight cards — one per type — no model numbers, never a store", async ({ page }) => {
  await page.goto("/en/products/networking", { waitUntil: "networkidle" });
  await expect(page.locator("h1")).toHaveText("Networking & Connectivity");
  await expect(page.locator(".catalog-card")).toHaveCount(8);
  await expect(page.locator('.catalog-side-link[aria-current="page"]')).toHaveText("Networking");
  // D-064/D-066/D-068: all eight networking types carry a photograph — eight <img>,
  // none of them a placeholder; a card IS a type (D-068), so "Switches" is one card
  await expect(page.locator(".catalog-card img")).toHaveCount(8);
  await expect(page.locator(".catalog-card [data-empty]")).toHaveCount(0);
  const switches = page.locator(".catalog-card", { hasText: /^Switches/ });
  await expect(switches).toHaveCount(1);
  await expect(switches.locator("img")).toHaveAttribute("src", "/media/products/switches.webp");
  // every photograph actually decoded — a broken path renders nothing, not a placeholder.
  // The images are loading="lazy", so each is scrolled into view and decoded first
  // (on the mobile project most of the grid starts below the fold)
  const painted = await page.evaluate(async () => {
    const imgs = [...document.querySelectorAll<HTMLImageElement>(".catalog-card img")];
    for (const i of imgs) { i.scrollIntoView(); await i.decode().catch(() => undefined); }
    return imgs.every((i) => i.complete && i.naturalWidth > 0);
  });
  expect(painted).toBe(true);
  // innerText, not textContent: adjacent card lines ("Switches" + "Aruba") would otherwise
  // concatenate into "sAr" and trip the SAR guard below
  const text = await page.evaluate(() => document.querySelector("main")?.innerText ?? "");
  expect(text).not.toMatch(/DS-K1T673DX/);
  expect(text).not.toMatch(/\b\d+\s*(products|items|cards)\b/i);
  // D-062: the "never a store" guard moved here from the deleted homepage stage test —
  // the catalogue is where the risk of commerce language lives now
  expect(text).not.toMatch(/\$|SAR|price|buy now|add to cart/i);
  const broken = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLImageElement>(".catalog-card img")].filter((i) => i.complete && i.naturalWidth === 0).length,
  );
  expect(broken).toBe(0);
});

test("/products/computing: four types photographed, two held on the placeholder (D-066 · D-068 · D-071)", async ({ page }) => {
  await page.goto("/en/products/computing", { waitUntil: "networkidle" });
  await expect(page.locator(".catalog-card")).toHaveCount(6);
  // laptops, tablets, printers, desktop-pcs (D-071) carry photographs; keyboards, mice are held — one card each
  await expect(page.locator(".catalog-card img")).toHaveCount(4);
  await expect(page.locator(".catalog-card [data-empty]")).toHaveCount(2);
  await expect(page.locator(".catalog-card", { hasText: "Desktop PCs" }).locator('img[src="/media/products/desktop-pcs.webp"]')).toHaveCount(1);
  for (const held of ["Keyboards", "Mice"])
    await expect(page.locator(".catalog-card", { hasText: held }).locator("[data-empty] svg").first()).toBeVisible();
});

test("/products/storage: renamed to Storage & Servers, four types, all photographed (D-066)", async ({ page }) => {
  await page.goto("/en/products/storage", { waitUntil: "networkidle" });
  await expect(page.locator("h1")).toHaveText("Storage & Servers");
  await expect(page.locator('.catalog-side-link[aria-current="page"]')).toHaveText("Storage & Servers");
  await expect(page.locator(".catalog-card")).toHaveCount(4);
  await expect(page.locator(".catalog-card img")).toHaveCount(4);
  await expect(page.locator(".catalog-card-name").first()).toHaveText("Rack Servers"); // owner order: servers first
  await page.goto("/ar/products/storage", { waitUntil: "networkidle" });
  await expect(page.locator("h1")).toHaveText("التخزين والخوادم");
  await expect(page.locator('.catalog-side-link[aria-current="page"]')).toHaveText("التخزين والخوادم");
});

test("AR /products/networking: same eight cards, Arabic names, RTL, nothing mirrored", async ({ page }) => {
  await page.goto("/ar/products/networking", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("h1")).toHaveText("الشبكات والاتصال");
  await expect(page.locator(".catalog-card")).toHaveCount(8);
  await expect(page.locator(".catalog-card-name").first()).toHaveText("راوترات 5G");
  const text = await page.evaluate(() => document.querySelector("main")?.innerText ?? "");
  expect(text).not.toMatch(/\$|SAR|price|buy now|add to cart|ريال|سعر|اشترِ|أضف إلى السلة/i); // never a store, in Arabic too
  const mirrored = await page.evaluate(() =>
    [...document.querySelectorAll(".catalog-card img")].some((i) => getComputedStyle(i).transform.includes("-1")),
  );
  expect(mirrored).toBe(false);
});

test("D-068 (a): no brand line on any category page — a card is a photograph and a type name", async ({ page }) => {
  for (const loc of ["en", "ar"]) {
    for (const cat of ["networking", "fiber", "cybersecurity", "surveillance", "av", "computing", "storage", "communication", "environmental"]) {
      await page.goto(`/${loc}/products/${cat}`, { waitUntil: "networkidle" });
      await expect(page.locator(".catalog-card-brand")).toHaveCount(0);
      // and no brand name leaks into a card by another route
      const text = await page.locator(".catalog-grid").innerText();
      expect(text, `${loc}/${cat}`).not.toMatch(/Aruba|Cisco|Hikvision|Linksys|Ruijie|Huawei|Lenovo|Dell/);
      expect(await page.locator(".catalog-card p").count()).toBe(await page.locator(".catalog-card").count()); // exactly one text line per card
    }
  }
});

test("unknown category slug is a 404", async ({ request }) => {
  const res = await request.get("/en/products/not-a-category");
  expect(res.status()).toBe(404);
});
