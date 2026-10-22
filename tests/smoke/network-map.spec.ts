import { expect, test, type Page } from "@playwright/test";

/**
 * D-081 — the network map: server-final Track Record numbers, Dammam as a
 * route without a button, and city buttons with project cards built as a
 * popover (keyboard Tab · Enter · Esc, hover that survives moving onto
 * the card, ≥ 44 px targets, the dot's contrast, cards inside the
 * viewport, touch, and the visible list on phones).
 */
async function gotoMap(page: Page, loc: "en" | "ar" = "en") {
  await page.goto(`/${loc}/`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => {
    const s = document.documentElement.getAttribute("data-opening");
    return s === "done" || s === "skipped" || (s === null && document.body.style.overflow === "");
  }, null, { timeout: 20000 });
  await page.evaluate(() => document.querySelector('[data-scene="track-record"]')!.scrollIntoView({ block: "start", behavior: "instant" }));
  await page.waitForTimeout(400);
}
const city = (page: Page, id: string) => page.locator(`.map-city[data-city="${id}"]`);
const card = (page: Page, id: string) => page.locator(`#map-card-${id}`);

for (const loc of ["en", "ar"] as const) {
  test(`${loc}: the final figures are in the server HTML and never rewritten by the client`, async ({ page, request }, info) => {
    test.skip(info.project.name !== "desktop");
    const html = await (await request.get(`/${loc}/`)).text();
    const dd = [...html.matchAll(/<dd[^>]*><span dir="ltr"[^>]*><span>(\d+)<\/span>/g)].map((m) => m[1]);
    expect(dd).toEqual(["200", "7", "16", "100"]); // 2026: the approved values
    await gotoMap(page, loc);
    await page.waitForTimeout(9000); // the whole network story
    const shown = await page.locator(".stat-grid dd > span > span:first-child").allTextContents();
    expect(shown).toEqual(["200", "7", "16", "100"]);
  });
}

test.describe("desktop city buttons", () => {
  test.beforeEach(async ({}, info) => test.skip(info.project.name !== "desktop"));

  test("six buttons (grouped where cities touch), named with their project count, each ≥ 44 × 44, no button for Dammam", async ({ page }) => {
    await gotoMap(page, "ar");
    const rows = await page.locator(".map-city").evaluateAll((els) =>
      els.map((e) => ({ id: e.getAttribute("data-city"), name: e.getAttribute("aria-label"), w: e.getBoundingClientRect().width, h: e.getBoundingClientRect().height, controls: e.getAttribute("aria-controls"), expanded: e.getAttribute("aria-expanded") })),
    );
    expect(rows.map((r) => r.id)).toEqual(["riyadh-diriyah", "jeddah-makkah-taif", "alula", "abha", "neom", "tabuk"]);
    expect(rows.find((r) => r.id === "riyadh-diriyah")!.name).toBe("الرياض والدرعية — 6 مشاريع");
    expect(rows.find((r) => r.id === "abha")!.name).toBe("أبها — مشروع واحد");
    for (const r of rows) {
      expect(r.w, r.id!).toBeGreaterThanOrEqual(44);
      expect(r.h, r.id!).toBeGreaterThanOrEqual(44);
      expect(r.expanded).toBe("false");
      await expect(page.locator(`#${r.controls}`)).toHaveCount(1);
    }
    await expect(page.locator('.map-city[data-city="dammam"]')).toHaveCount(0);
  });

  test("keyboard only: Tab to a city, Enter opens its card, Tab reaches the card's link, Esc closes and returns focus", async ({ page }) => {
    await gotoMap(page);
    await city(page, "riyadh-diriyah").focus();
    await page.keyboard.press("Tab"); // → the next city (its closed card is skipped)
    await expect(city(page, "jeddah-makkah-taif")).toBeFocused();
    expect(await city(page, "jeddah-makkah-taif").evaluate((e) => getComputedStyle(e).outlineStyle)).toBe("solid"); // visible focus ring
    await page.keyboard.press("Enter");
    await expect(city(page, "jeddah-makkah-taif")).toHaveAttribute("aria-expanded", "true");
    await expect(card(page, "jeddah-makkah-taif")).toBeVisible();
    await expect(card(page, "jeddah-makkah-taif")).toContainText("Grand Mosque — Makkah");
    await expect(card(page, "jeddah-makkah-taif")).toContainText("and 7 more projects");
    await page.keyboard.press("Tab");
    await expect(card(page, "jeddah-makkah-taif").getByRole("link", { name: "View project" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(card(page, "jeddah-makkah-taif")).toBeHidden();
    await expect(city(page, "jeddah-makkah-taif")).toHaveAttribute("aria-expanded", "false");
    await expect(city(page, "jeddah-makkah-taif")).toBeFocused();
  });

  test("hover: the card stays while the pointer moves onto it, never times out, and closes once the pointer leaves both", async ({ page }) => {
    await gotoMap(page);
    await city(page, "abha").hover();
    await expect(card(page, "abha")).toBeVisible();
    const box = (await card(page, "abha").boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
    await page.waitForTimeout(1500);
    await expect(card(page, "abha")).toBeVisible();
    await page.mouse.move(5, 5);
    await expect(card(page, "abha")).toBeHidden();
  });

  test("the card stays inside the viewport at the map's edge (NEOM) at 1024 px", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await gotoMap(page);
    await city(page, "neom").click();
    const b = (await card(page, "neom").boundingBox())!;
    expect(b.x).toBeGreaterThanOrEqual(8);
    expect(b.x + b.width).toBeLessThanOrEqual(1024 - 8);
    expect(b.y).toBeGreaterThanOrEqual(0);
  });

  test("the dot keeps ≥ 3:1 against its surround (a ring of the page ground), both themes", async ({ page }) => {
    await gotoMap(page);
    for (const theme of ["dark", "light"]) {
      await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
      const ratio = await page.locator(".map-city-dot").first().evaluate((e) => {
        const cs = getComputedStyle(e);
        const rgb = (s: string) => (s.match(/\d+(\.\d+)?/g) ?? []).slice(0, 3).map(Number);
        const lum = ([r, g, b]: number[]) => {
          const f = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
          return 0.2126 * f(r!) + 0.7152 * f(g!) + 0.0722 * f(b!);
        };
        const dot = lum(rgb(cs.backgroundColor));
        const ring = lum(rgb(cs.boxShadow));
        return (Math.max(dot, ring) + 0.05) / (Math.min(dot, ring) + 0.05);
      });
      expect(ratio, theme).toBeGreaterThanOrEqual(3);
    }
  });

  test("touch: the first tap shows the card, a tap outside closes it", async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 1024, height: 768 }, hasTouch: true });
    const page = await ctx.newPage();
    await gotoMap(page);
    await city(page, "alula").tap();
    await expect(card(page, "alula")).toBeVisible();
    await page.tap("h2");
    await expect(card(page, "alula")).toBeHidden();
    await ctx.close();
  });
});

test("small screens: the buttons give way to the visible list of cities and their projects", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile");
  await gotoMap(page, "ar");
  await expect(page.locator(".map-cities")).toBeHidden();
  const list = page.locator(".map-city-list");
  await expect(list).toBeVisible();
  await expect(list.locator(".map-city-list-name")).toHaveCount(9);
  await expect(list).toContainText("مكة المكرمة");
  await expect(list.getByRole("link", { name: "المسجد الحرام — مكة المكرمة" })).toHaveAttribute("href", "/ar/projects/grand-mosque-makkah");
});

test("200 % zoom (720 px wide): no overflowing card — the list takes over", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.setViewportSize({ width: 720, height: 450 });
  await gotoMap(page);
  await expect(page.locator(".map-cities")).toBeHidden();
  await expect(page.locator(".map-city-list")).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
