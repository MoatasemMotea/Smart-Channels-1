import { expect, test } from "@playwright/test";

/**
 * D-052 Products media integration — focused regression.
 * Owner mapping, delivery availability, archive privacy, homepage
 * preview, 22-category index, no invented commerce content.
 */
const FEATURED = [
  "/media/products/01-switch.webp",
  "/media/products/02-access-points.webp",
  "/media/products/03-camera.webp",
  "/media/products/firewall-interim.webp",
];
const DELIVERY = [
  ...FEATURED,
  "/media/products/laptop.webp",
  "/media/products/core-switch.webp",
  "/media/products/sfp.webp",
  "/media/products/tablet.webp",
  "/media/products/printers.webp",
  "/media/products/multi-charger-t60.webp",
  "/media/products/nvr.webp",
];
/* the ten categories that keep the designed media-pending state */
const FALLBACK = [
  "router", "monitor", "pc", "ups", "hard-disk", "decoder",
  "face-recognition-terminals", "hdmi-extender", "ac-adapter", "media-converter",
];
/* second-round files the owner held back — must never be published */
const HELD = [
  "/media-source/images/Point of contact.jpg",
  "/media-source/images/Router.jpg",
  "/media-source/images/UPS.jpg",
];

test("all eleven product delivery images are publicly served", async ({ request }) => {
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
  expect(slots.map((s) => s.name)).toEqual(["Switch", "Access Points", "Camera", "Firewall"]);
  expect(slots.every((s, i) => s.img.includes(encodeURIComponent(FEATURED[i]!)) || s.img.includes(FEATURED[i]!))).toBe(true);
  // §8: the homepage stays at FOUR — never a catalogue
  expect(slots).toHaveLength(4);
  expect(slots.map((s) => s.href)).toEqual([
    "/en/products#switch",
    "/en/products#access-points",
    "/en/products#camera",
    "/en/products#firewall",
  ]);
  const section = await page.evaluate(
    () => document.querySelector('[data-scene="products"]')?.textContent ?? "",
  );
  // §6: never e-commerce — no prices, no cart language
  expect(section).not.toMatch(/\$|SAR|price|buy now|add to cart/i);
});

test("/products: complete 22-category index, images only where approved", async ({ page }) => {
  await page.goto("/en/products", { waitUntil: "networkidle" });
  const cards = await page.evaluate(() =>
    [...document.querySelectorAll(".product-card")].map((c) => ({
      id: c.id,
      hasPhoto: Boolean(c.querySelector(".product-card-photo img")),
      hasMotif: Boolean(c.querySelector(".product-card-motif")),
    })),
  );
  expect(cards).toHaveLength(22);
  const withPhoto = cards.filter((c) => c.hasPhoto).map((c) => c.id).sort();
  expect(withPhoto).toEqual([
    "access-points", "camera", "core-switch", "firewall", "laptop",
    "multi-charger", "nvr", "printers", "sfp", "switch", "t60", "tablet",
  ]);
  // the remaining ten keep the designed media-pending motif
  expect(cards.filter((c) => c.hasMotif).map((c) => c.id).sort()).toEqual([...FALLBACK].sort());
  // Multi Charger and T60 present the SAME shared source
  const shared = await page.evaluate(() =>
    ["multi-charger", "t60"].map(
      (id) => document.querySelector<HTMLImageElement>(`#${id} img`)?.getAttribute("src") ?? "",
    ),
  );
  expect(shared[0]).toBe(shared[1]);
  expect(shared[0]).toContain("multi-charger-t60");
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

test("AR /products renders the same 22 categories, photography not mirrored", async ({
  page,
}) => {
  await page.goto("/ar/products", { waitUntil: "networkidle" });
  const n = await page.evaluate(() => document.querySelectorAll(".product-card").length);
  expect(n).toBe(22);
  const mirrored = await page.evaluate(() =>
    [...document.querySelectorAll(".product-card-photo img")].some((i) =>
      getComputedStyle(i).transform.includes("-1"),
    ),
  );
  expect(mirrored).toBe(false);
});
