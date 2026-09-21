import { expect, test, type Page } from "@playwright/test";

/**
 * D-075 — the homepage Selected Projects section is a horizontal accordion
 * of the owner's five projects (homeOrder 1..5): five panels in order, the
 * first active (flex 4 vs 1), hover and focus activate, ← → step, a click
 * on an inactive panel only activates it while a click on the active one
 * navigates, the sector tag is the right industry name, RTL puts the first
 * panel on the right with a sound vertical spine, phones get a snap-scrolled
 * card row instead, and reduced motion removes the transitions.
 */
const ORDER = [
  ["grand-mosque-makkah", "Grand Mosque — Makkah", "Religious & Holy Sites"],
  ["diriyah-season", "Diriyah Season", "Cultural Seasons & Festivals"],
  ["red-sea-film-festival", "Red Sea Film Festival", "Cultural Seasons & Festivals"],
  ["neom-sports-village", "NEOM Sports Village", "Giga-projects"],
  ["rcu-outdoor-entertainment-alula", "RCU Outdoor Entertainment — AlUla", "Cultural Seasons & Festivals"],
] as const;
const panels = (page: Page) => page.locator(".projects-accordion .pa-panel");
const active = (page: Page) => page.locator(".pa-panel[data-active]");
const grow = (page: Page) => panels(page).evaluateAll((els) => els.map((e) => getComputedStyle(e).flexGrow));

async function gotoAccordion(page: Page, loc: "en" | "ar") {
  await page.goto(`/${loc}/`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => {
    const s = document.documentElement.getAttribute("data-opening");
    return s === "done" || s === "skipped" || (s === null && document.body.style.overflow === "");
  }, null, { timeout: 15000 });
  await page.evaluate(() => document.querySelector(".projects-accordion")!.scrollIntoView({ block: "center" }));
  await page.waitForTimeout(500);
}

test("five panels in order, the first active (flex 4 vs 1), tags are the sector names, links carry the full title", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await gotoAccordion(page, "en");
  await expect(panels(page)).toHaveCount(5);
  for (const [i, [slug, title, sector]] of ORDER.entries()) {
    const p = panels(page).nth(i);
    await expect(p.locator("a")).toHaveAttribute("href", `/en/projects/${slug}`);
    await expect(p.locator("a")).toHaveAttribute("aria-label", title);
    await expect(p.locator(".pa-tag")).toHaveText(sector);
    await expect(p.locator(".pa-title")).toHaveText(title);
  }
  expect(await grow(page)).toEqual(["4", "1", "1", "1", "1"]);
  await expect(active(page).locator("a")).toHaveAttribute("aria-current", "true");
  await expect(page.locator('.pa-link[aria-current="true"]')).toHaveCount(1);
  await expect(page.locator(".pa-counter")).toHaveCount(0); // D-076: no visible counter
  // no image exists yet for any of the five: the designed ground, not an empty panel
  await expect(page.locator('.pa-panel[data-ground="designed"]')).toHaveCount(5);
  await expect(page.locator(".pa-panel img")).toHaveCount(0);
  // Red Sea has no location and none of the five has years: no meta line, no reserved gap
  await expect(panels(page).nth(2).locator(".pa-meta")).toHaveCount(0);
  await expect(panels(page).nth(0).locator(".pa-meta")).toHaveText("Makkah");
  // the transition is 700 ms on flex-grow
  const tr = await panels(page).nth(1).evaluate((e) => [getComputedStyle(e).transitionProperty, getComputedStyle(e).transitionDuration]);
  expect(tr).toEqual(["flex-grow", "0.7s"]);
  // the "all projects" doorway
  await expect(page.getByRole("link", { name: /View all projects/ })).toHaveAttribute("href", "/en/projects");
});

test("hover activates, arrows and Home/End step, a click on an inactive panel activates without navigating, a click on the active one navigates", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await gotoAccordion(page, "en");
  await panels(page).nth(2).hover();
  await expect(panels(page).nth(2)).toHaveAttribute("data-active", "true");
  await expect.poll(() => grow(page), { timeout: 2000 }).toEqual(["1", "1", "4", "1", "1"]);
  await panels(page).nth(2).locator("a").focus();
  await page.keyboard.press("ArrowRight");
  await expect(panels(page).nth(3)).toHaveAttribute("data-active", "true");
  expect(await page.evaluate(() => document.activeElement?.getAttribute("href"))).toBe("/en/projects/neom-sports-village");
  await page.keyboard.press("ArrowLeft");
  await expect(panels(page).nth(2)).toHaveAttribute("data-active", "true");
  await page.keyboard.press("End");
  await expect(panels(page).nth(4)).toHaveAttribute("data-active", "true");
  await page.keyboard.press("Home");
  await expect(panels(page).nth(0)).toHaveAttribute("data-active", "true");
  // click on an inactive panel: activates only. A mouse click is preceded by hover
  // (which already activates), so the branch is exercised with a bare click event —
  // what a touch tap or a synthetic activation delivers at desktop width
  await page.mouse.move(5, 5);
  await panels(page).nth(1).locator("a").dispatchEvent("click");
  await page.waitForTimeout(300);
  await expect(page).toHaveURL(/\/en\/?$/);
  await expect(panels(page).nth(1)).toHaveAttribute("data-active", "true");
  // click on the active panel: navigates
  await panels(page).nth(1).locator("a").click();
  await expect(page).toHaveURL(/\/en\/projects\/diriyah-season$/);
  await expect(page.locator("h1")).toContainText("Diriyah Season");
});

test("RTL: the first panel sits at the right and grows toward the left; the vertical spine renders", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await gotoAccordion(page, "ar");
  const boxes = await panels(page).evaluateAll((els) => els.map((e) => e.getBoundingClientRect().x));
  expect(boxes[0]).toBeGreaterThan(boxes[4]!); // logical first = right-most
  expect(await grow(page)).toEqual(["4", "1", "1", "1", "1"]);
  await expect(panels(page).nth(0).locator(".pa-tag")).toHaveText("المواقع الدينية والمقدسة");
  const spine = panels(page).nth(1).locator(".pa-spine");
  const s = await spine.evaluate((e) => { const r = e.getBoundingClientRect(); return { wm: getComputedStyle(e).writingMode, dir: getComputedStyle(e).direction, w: r.width, h: r.height, visible: getComputedStyle(e).opacity }; });
  expect(s.wm).toBe("vertical-rl");
  expect(s.h).toBeGreaterThan(s.w * 3); // truly vertical
  expect(s.visible).toBe("1");
  // ← in RTL moves to the logical NEXT (the panel to the left)
  await panels(page).nth(0).locator("a").focus();
  await page.keyboard.press("ArrowLeft");
  await expect(panels(page).nth(1)).toHaveAttribute("data-active", "true");
});

test("390 px: no accordion — five snap-scrolled 4:5 cards, hidden scrollbar, direct navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await gotoAccordion(page, "en");
  const row = page.locator(".projects-accordion");
  const cs = await row.evaluate((e) => ({ snap: getComputedStyle(e).scrollSnapType, ox: getComputedStyle(e).overflowX, sb: getComputedStyle(e).scrollbarWidth, scrollW: e.scrollWidth, clientW: e.clientWidth }));
  expect(cs.snap).toContain("x");
  expect(cs.ox).toBe("auto");
  expect(cs.sb).toBe("none");
  expect(cs.scrollW).toBeGreaterThan(cs.clientW * 3);
  expect(await grow(page)).toEqual(["0", "0", "0", "0", "0"]);
  const b = await panels(page).nth(0).boundingBox();
  expect(Math.abs(b!.width / b!.height - 0.8)).toBeLessThan(0.02); // 4:5
  expect(b!.width / 390).toBeGreaterThan(0.8);
  await expect(panels(page).nth(1).locator(".pa-spine")).toBeHidden();
  await expect(panels(page).nth(1).locator(".pa-title")).toBeVisible();
  // a card navigates on the first tap, no activation step
  await panels(page).nth(1).locator("a").click();
  await expect(page).toHaveURL(/\/en\/projects\/diriyah-season$/);
});

test("reduced motion: no flex transition, no scale — an instant switch", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await gotoAccordion(page, "en");
  // the site clamps every transition to 200 ms (!important) under reduced motion; the accordion's own 700 ms is gone
  expect(parseFloat(await panels(page).nth(1).evaluate((e) => getComputedStyle(e).transitionDuration))).toBeLessThanOrEqual(0.2);
  expect(await panels(page).nth(1).locator(".pa-ground").evaluate((e) => getComputedStyle(e).transform)).toBe("none");
  await panels(page).nth(3).hover();
  await expect.poll(() => grow(page), { timeout: 600 }).toEqual(["1", "1", "1", "4", "1"]);
  await ctx.close();
});
