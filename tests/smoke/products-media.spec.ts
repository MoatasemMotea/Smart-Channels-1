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

test("homepage preview: exactly the four featured categories with mapped images", async ({
  page,
}) => {
  await page.goto("/en", { waitUntil: "networkidle" });
  await page.keyboard.press("Escape");
  await page.evaluate(() =>
    document.getElementById("products")?.scrollIntoView({ behavior: "instant", block: "center" }),
  );
  await page.waitForTimeout(800);
  const slots = await page.evaluate(() =>
    [...document.querySelectorAll(".product-slot-filled")].map((li) => ({
      name: li.querySelector("p")?.textContent?.trim(),
      img: li.querySelector("img")?.getAttribute("src") ?? "",
      href: li.querySelector("a")?.getAttribute("href") ?? "",
    })),
  );
  expect(slots.map((s) => s.name)).toEqual(["Firewall", "Core Switch", "Laptop", "Cameras"]);
  expect(slots.every((s, i) => s.img.includes(encodeURIComponent(FEATURED[i]!)) || s.img.includes(FEATURED[i]!))).toBe(true);
  // §8: the homepage stays at FOUR — never a catalogue
  expect(slots).toHaveLength(4);
  expect(slots.map((s) => s.href)).toEqual([
    "/en/products#firewall",
    "/en/products#core-switch",
    "/en/products#laptop",
    "/en/products#camera",
  ]);
  const section = await page.evaluate(
    () => document.querySelector('[data-scene="products"]')?.textContent ?? "",
  );
  // §6: never e-commerce — no prices, no cart language
  expect(section).not.toMatch(/\$|SAR|price|buy now|add to cart/i);
});

test("/products: the nine categories as tiles, the strip above them, no counters", async ({ page }) => {
  await page.goto("/en/products", { waitUntil: "networkidle" });
  const tiles = await page.locator(".catalog-tile").evaluateAll((els) =>
    els.map((a) => (a as HTMLAnchorElement).getAttribute("href")),
  );
  expect(tiles).toEqual([
    "/en/products/networking", "/en/products/fiber", "/en/products/cybersecurity",
    "/en/products/surveillance", "/en/products/av", "/en/products/computing",
    "/en/products/storage", "/en/products/communication", "/en/products/environmental",
  ]);
  await expect(page.locator(".catalog-bar-link")).toHaveCount(9);
  await expect(page.locator("h1")).toHaveCount(1);
  const text = await page.evaluate(() => document.querySelector("main")?.textContent ?? "");
  expect(text).not.toMatch(/\b\d+\s*(products|items|cards)\b/i); // no counters anywhere
  expect(text).not.toMatch(/\$|SAR|price|buy now|add to cart/i);
});

test("category strip: hover reveals after a delay, leaving closes, Escape closes, focus opens", async ({ page }) => {
  await page.goto("/en/products", { waitUntil: "networkidle" });
  const first = page.locator(".catalog-bar-link").first();
  const panel = page.locator("#catalog-panel-networking");
  await first.hover();
  await expect(first).toHaveAttribute("aria-expanded", "false"); // not yet — 110 ms guard
  await expect(first).toHaveAttribute("aria-expanded", "true", { timeout: 1500 });
  await expect(panel).toBeVisible();
  // the panel lists the unique types of the category
  await expect(panel.locator("li")).toHaveText(["5G Routers", "Core Switches", "Switches", "Wi-Fi Extenders", "Access Points", "Point-to-Point"]);
  await page.mouse.move(5, 5);
  await expect(first).toHaveAttribute("aria-expanded", "false", { timeout: 1500 });
  await first.focus();
  await expect(first).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(first).toHaveAttribute("aria-expanded", "false");
});

test("/products/networking: fifteen cards, brand toggle filters and releases, no model numbers", async ({ page }) => {
  await page.goto("/en/products/networking", { waitUntil: "networkidle" });
  await expect(page.locator("h1")).toHaveText("Networking & Connectivity");
  await expect(page.locator(".catalog-card")).toHaveCount(15);
  await expect(page.locator('.catalog-side-link[aria-current="page"]')).toHaveText("Networking");
  await expect(page.locator('.catalog-bar-link[aria-current="page"]')).toHaveText("Networking");
  // D-060: the catalogue is unlinked from imagery — all five Switches
  // cards show the same neutral placeholder, and NO <img> survives inside
  // any card on the page (catches a stray image in any other type too)
  const switches = page.locator(".catalog-card", { hasText: /^Switches/ });
  await expect(switches).toHaveCount(5);
  await expect(switches.locator("[data-empty] svg")).toHaveCount(5);
  await expect(page.locator(".catalog-card img")).toHaveCount(0);
  // a type without a photograph shows the placeholder, never nothing
  await expect(page.locator(".catalog-card", { hasText: "Wi-Fi Extenders" }).locator("[data-empty] svg")).toHaveCount(1);
  // brand toggle
  const cisco = page.locator(".catalog-brand", { hasText: "Cisco" });
  await cisco.click();
  await expect(cisco).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".catalog-card")).toHaveCount(2);
  await cisco.click();
  await expect(cisco).toHaveAttribute("aria-pressed", "false");
  await expect(page.locator(".catalog-card")).toHaveCount(15);
  const text = await page.evaluate(() => document.querySelector("main")?.textContent ?? "");
  expect(text).not.toMatch(/DS-K1T673DX/);
  expect(text).not.toMatch(/\b\d+\s*(products|items|cards)\b/i);
  const broken = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLImageElement>(".catalog-card img")].filter((i) => i.complete && i.naturalWidth === 0).length,
  );
  expect(broken).toBe(0);
});

test("AR /products/networking: same fifteen cards, Arabic names, RTL, nothing mirrored", async ({ page }) => {
  await page.goto("/ar/products/networking", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("h1")).toHaveText("الشبكات والاتصال");
  await expect(page.locator(".catalog-card")).toHaveCount(15);
  await expect(page.locator(".catalog-card-name").first()).toHaveText("راوترات 5G");
  const mirrored = await page.evaluate(() =>
    [...document.querySelectorAll(".catalog-card img")].some((i) => getComputedStyle(i).transform.includes("-1")),
  );
  expect(mirrored).toBe(false);
});

test("unknown category slug is a 404", async ({ request }) => {
  const res = await request.get("/en/products/not-a-category");
  expect(res.status()).toBe(404);
});
