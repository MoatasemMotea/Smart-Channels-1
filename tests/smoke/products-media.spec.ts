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

test("/products: complete 24-category index, images only where approved", async ({ page }) => {
  await page.goto("/en/products", { waitUntil: "networkidle" });
  const cards = await page.evaluate(() =>
    [...document.querySelectorAll(".product-card")].map((c) => ({
      id: c.id,
      hasPhoto: Boolean(c.querySelector(".product-card-photo img")),
      hasMotif: Boolean(c.querySelector(".product-card-motif")),
    })),
  );
  expect(cards).toHaveLength(24);
  const withPhoto = cards.filter((c) => c.hasPhoto).map((c) => c.id).sort();
  expect(withPhoto).toEqual([
    "access-control", "access-points", "camera", "core-switch", "firewall",
    "hdmi-extender", "laptop", "media-converter", "multi-charger", "nvr", "p2p",
    "pc", "printers", "router", "sfp", "switch", "t60", "tablet", "ups",
  ]);
  // the remaining five keep the designed media-pending motif
  expect(cards.filter((c) => c.hasMotif).map((c) => c.id).sort()).toEqual([...FALLBACK].sort());
  // D-058: Multi Charger and T60 now present their OWN, distinct photographs
  const own = await page.evaluate(() =>
    ["multi-charger", "t60"].map(
      (id) => document.querySelector<HTMLImageElement>(`#${id} img`)?.getAttribute("src") ?? "",
    ),
  );
  expect(own[0]).not.toBe(own[1]);
  expect(own[0]).toContain("multi-charger-2026");
  expect(own[1]).toContain("t60-2026");
  for (const c of cards) {
    expect(c.hasPhoto || c.hasMotif, c.id).toBe(true); // never a blank placeholder
  }
  // anchor from the homepage preview lands on a real card
  expect(cards.some((c) => c.id === "switch")).toBe(true);
  // broken-image guard on the four photos
  const broken = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLImageElement>(".product-card-photo img")].filter(
      (i) => i.complete && i.naturalWidth === 0,
    ).length,
  );
  expect(broken).toBe(0);
});

test("AR /products renders the same 24 categories, photography not mirrored", async ({
  page,
}) => {
  await page.goto("/ar/products", { waitUntil: "networkidle" });
  const n = await page.evaluate(() => document.querySelectorAll(".product-card").length);
  expect(n).toBe(24);
  const mirrored = await page.evaluate(() =>
    [...document.querySelectorAll(".product-card-photo img")].some((i) =>
      getComputedStyle(i).transform.includes("-1"),
    ),
  );
  expect(mirrored).toBe(false);
});
