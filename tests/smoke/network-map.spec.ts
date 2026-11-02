import { expect, test, type Page } from "@playwright/test";

/**
 * D-093 — the network map is a pure animated panel: server-final Track
 * Record numbers, no city buttons, no popover cards, no pointer/keyboard
 * interaction on map nodes. The text alternative (D-081 owner decision
 * (ج)) is the only accessible/clickable-free way to read cities and
 * their projects.
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

test.describe("D-093: no interaction left on the map", () => {
  test.beforeEach(async ({}, info) => test.skip(info.project.name !== "desktop"));

  test("no popover markup, no city buttons, no cards", async ({ page }) => {
    await gotoMap(page, "ar");
    await expect(page.locator(".map-city")).toHaveCount(0);
    await expect(page.locator(".map-card")).toHaveCount(0);
    await expect(page.locator(".map-cities")).toHaveCount(0);
  });

  test("the stage carries no interactive elements, links or pointer affordance", async ({ page }) => {
    await gotoMap(page, "ar");
    const stage = page.locator(".network-stage");
    await expect(stage).toHaveAttribute("aria-hidden", "true");
    await expect(stage.locator("a, button, [tabindex]")).toHaveCount(0);
    const cursor = await stage.evaluate((el) => getComputedStyle(el).cursor);
    expect(cursor).not.toBe("pointer");
  });

  test("Tab does not stop inside the map stage", async ({ page }) => {
    await gotoMap(page, "ar");
    const stageBox = (await page.locator(".network-stage").boundingBox())!;
    let stoppedInStage = false;
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press("Tab");
      const inStage = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? el.closest(".network-stage") !== null : false;
      });
      if (inStage) {
        stoppedInStage = true;
        break;
      }
    }
    expect(stoppedInStage, "focus never lands inside the aria-hidden map stage").toBe(false);
    void stageBox;
  });
});

test("small screens: the visible list of cities and their projects, no links", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile");
  await gotoMap(page, "ar");
  const list = page.locator(".map-city-list");
  await expect(list).toBeVisible();
  await expect(list.locator(".map-city-list-name")).toHaveCount(9);
  await expect(list).toContainText("مكة المكرمة");
  await expect(list.getByRole("link", { name: "المسجد الحرام — مكة المكرمة" })).toHaveCount(0);
  await expect(list).toContainText("المسجد الحرام — مكة المكرمة");
});

test("200 % zoom (720 px wide): no horizontal overflow — the list takes over", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.setViewportSize({ width: 720, height: 450 });
  await gotoMap(page);
  await expect(page.locator(".map-city-list")).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

// D-093 item 4: the counter must visibly count up, not snap to final —
// a real scroll arrival, sampled early (<300ms, under 200) and settled
// (2.5s, at the final value).
for (const [loc, w, selector] of [
  ["en", 1440, '[data-scene="track-record"]'] as const,
  // mobile: the stat grid sits far below the (tall) map stage, so arrival
  // is scrolling to the grid itself — exactly the off-screen-at-launch
  // case the fallback observer exists for
  ["ar", 390, ".stat-grid"] as const,
]) {
  test(`${loc} @${w}px: the figures visibly count up from scroll arrival`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto(`/${loc}/`, { waitUntil: "networkidle" });
    const target = page.locator(selector);
    const box = (await target.boundingBox())!;
    const steps = 20;
    for (let i = 1; i <= steps; i++) {
      await page.mouse.wheel(0, box.y / steps);
      await page.waitForTimeout(20);
    }
    const first = () => page.locator(".stat-grid dd > span > span:first-child").first().textContent();

    await page.waitForTimeout(300);
    const early = Number(await first());
    expect(early, "under 300ms past arrival, still rising").toBeLessThan(200);

    await page.waitForTimeout(2200); // total ≈ 2.5s past arrival
    const settled = await first();
    expect(settled).toBe("200");
  });
}
