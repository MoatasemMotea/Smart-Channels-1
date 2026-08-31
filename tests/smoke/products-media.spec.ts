import { expect, test } from "@playwright/test";

/**
 * D-052 Products media integration — focused regression.
 * Owner mapping, delivery availability, archive privacy, homepage
 * preview, 22-category index, no invented commerce content.
 */
const DELIVERY = [
  "/media/products/01-switch.webp",
  "/media/products/02-access-points.webp",
  "/media/products/03-camera.webp",
  "/media/products/04-firewall.webp",
];

test("all four product delivery images are publicly served", async ({ request }) => {
  for (const p of DELIVERY) {
    const res = await request.head(p);
    expect(res.status(), p).toBe(200);
  }
});

test("the product source archive is never publicly reachable", async ({ request }) => {
  const res = await request.get("/media-source/images/products/01-switch.jpg", {
    maxRedirects: 0,
  });
  expect([307, 308, 404]).toContain(res.status());
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
  expect(slots.every((s, i) => s.img.includes(encodeURIComponent(DELIVERY[i]!)) || s.img.includes(DELIVERY[i]!))).toBe(true);
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
  expect(withPhoto).toEqual(["access-points", "camera", "firewall", "switch"]);
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
