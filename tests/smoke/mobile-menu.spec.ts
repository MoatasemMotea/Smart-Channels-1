import { expect, test, type Page } from "@playwright/test";

/**
 * D-069 — the mobile menu (below the lg / 64 rem breakpoint).
 *
 * The defect: the panel used to live INSIDE the fixed header, and once the
 * page had scrolled (data-scrolled="true" → backdrop-filter) the header became
 * the containing block of its fixed descendants — the "full-screen" overlay
 * collapsed to the 80 px header strip. The rebuilt menu is a portal into
 * document.body, so the binding table is checked at 390 and 768 × EN / AR,
 * at the top of the page AND after a 400 px scroll (the failing state).
 *
 * Runs on a route without the homepage opening choreography (/company) so
 * scroll locking is the menu's alone.
 */
const ROUTE = "/company";
const HEADER = 80; // h-20 header; the sheet starts under it
const VIEWPORTS = [
  { w: 390, h: 844 },
  { w: 768, h: 1024 },
];
const LOCALES = ["en", "ar"] as const;
type Loc = (typeof LOCALES)[number];
const OPEN_LABEL = { en: "Open menu", ar: "افتح القائمة" };
const CLOSE_LABEL = { en: "Close menu", ar: "أغلق القائمة" };

const toggle = (page: Page) => page.locator("button.menu-toggle");
const panel = (page: Page) => page.locator("nav#site-menu");
const box = async (page: Page, sel: string) =>
  page.evaluate((s) => {
    const r = document.querySelector(s)!.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height, bottom: r.bottom, right: r.right };
  }, sel);

async function gotoRoute(page: Page, loc: Loc, scrolled: boolean) {
  await page.goto(`/${loc}${ROUTE}`, { waitUntil: "networkidle" });
  if (scrolled) {
    await page.evaluate(() => window.scrollTo(0, 400));
    await expect(page.locator("html")).toHaveAttribute("data-scrolled", "true");
    await page.waitForTimeout(350); // header surface transition (--dur-control)
  }
}

async function openMenu(page: Page) {
  await toggle(page).click();
  await expect(toggle(page)).toHaveAttribute("aria-expanded", "true");
  await expect(panel(page)).toHaveAttribute("data-state", "open");
  // let the 220 ms enter transition settle before measuring
  await expect
    .poll(() => panel(page).evaluate((e) => `${getComputedStyle(e).opacity}/${getComputedStyle(e).transform}`))
    .toBe("1/none");
}

for (const { w, h } of VIEWPORTS) {
  for (const loc of LOCALES) {
    for (const scrolled of [false, true]) {
      const where = scrolled ? "scrolled 400px" : "top";
      test(`${w}×${h} ${loc} (${where}): open locks the page, the sheet is in the viewport, focus enters`, async ({ page }, info) => {
        test.skip(info.project.name !== "mobile");
        await page.setViewportSize({ width: w, height: h });
        await gotoRoute(page, loc, scrolled);

        // one toggle, ≥44×44, truthful labels, no inner ✕ / MENU text
        const tg = toggle(page);
        await expect(tg).toHaveCount(1);
        await expect(tg).toHaveAttribute("aria-controls", "site-menu");
        await expect(tg).toHaveAttribute("aria-expanded", "false");
        await expect(tg).toHaveAttribute("aria-label", OPEN_LABEL[loc]);
        expect(await tg.innerText()).toBe("");
        const tb = await box(page, "button.menu-toggle");
        expect(tb.w).toBeGreaterThanOrEqual(44);
        expect(tb.h).toBeGreaterThanOrEqual(44);
        // RTL: the toggle sits at the inline end (left in Arabic)
        if (loc === "ar") expect(tb.right).toBeLessThan(w / 2);
        else expect(tb.x).toBeGreaterThan(w / 2);
        await expect(panel(page)).toHaveCount(0);

        await openMenu(page);
        await expect(tg).toHaveAttribute("aria-label", CLOSE_LABEL[loc]);
        expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
        if (scrolled) expect(await page.evaluate(() => window.scrollY)).toBe(400);

        // the sheet: full width, under the header, inside the viewport, links readable
        const pb = await box(page, "nav#site-menu");
        expect(pb.x).toBe(0);
        expect(pb.w).toBe(w);
        expect(pb.y).toBe(HEADER);
        expect(pb.bottom).toBeLessThanOrEqual(h);
        expect(pb.h).toBeGreaterThan(400);
        const links = panel(page).locator("a.site-menu-link");
        expect(await links.count()).toBe(9);
        const rows = await links.evaluateAll((els) => els.map((e) => e.getBoundingClientRect()));
        for (const r of rows) {
          expect(r.height).toBeGreaterThanOrEqual(48);
          expect(r.top).toBeGreaterThanOrEqual(HEADER);
          expect(r.bottom).toBeLessThanOrEqual(h);
        }
        // RTL: rows read from the line start (direction rtl, text-align start)
        const dir = await links.first().evaluate((e) => [getComputedStyle(e).direction, getComputedStyle(e).textAlign]);
        expect(dir).toEqual([loc === "ar" ? "rtl" : "ltr", "start"]);
        // above the floating buttons
        const z = await panel(page).evaluate((e) => Number(getComputedStyle(e).zIndex));
        expect(z).toBeGreaterThan(60);
        // focus entered the first link
        await expect.poll(() => page.evaluate(() => document.activeElement?.className ?? "")).toContain("site-menu-link");
        // locale + theme switches live inside the sheet
        await expect(panel(page).locator(".site-menu-tools button, .site-menu-tools a")).not.toHaveCount(0);

        // Escape: closes, unmounts after the exit transition, focus returns to the toggle, scroll unlocked
        await page.keyboard.press("Escape");
        await expect(tg).toHaveAttribute("aria-expanded", "false");
        await expect(panel(page)).toHaveCount(0);
        expect(await page.evaluate(() => document.activeElement?.className ?? "")).toBe("menu-toggle");
        expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
        if (scrolled) expect(await page.evaluate(() => window.scrollY)).toBe(400);
      });
    }

    test(`${w}×${h} ${loc}: Tab cycles inside the sheet; a link click closes and navigates`, async ({ page }, info) => {
      test.skip(info.project.name !== "mobile");
      await page.setViewportSize({ width: w, height: h });
      await gotoRoute(page, loc, true);
      await openMenu(page);
      const n = await panel(page).evaluate(
        (e) => e.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])').length,
      );
      for (let i = 0; i < n + 2; i++) {
        await page.keyboard.press("Tab");
        expect(await page.evaluate(() => !!document.activeElement?.closest("nav#site-menu"))).toBe(true);
      }
      await page.keyboard.press("Shift+Tab");
      expect(await page.evaluate(() => !!document.activeElement?.closest("nav#site-menu"))).toBe(true);

      // link click → close, then navigate (client-side; the sheet is gone on the new route)
      await panel(page).locator("a.site-menu-link", { hasText: loc === "ar" ? "المنتجات" : "Products" }).click();
      await expect(page).toHaveURL(new RegExp(`/${loc}/products$`));
      await expect(panel(page)).toHaveCount(0);
      await expect(toggle(page)).toHaveAttribute("aria-expanded", "false");
      expect(await page.evaluate(() => document.body.style.overflow)).toBe("");

      // route change (browser back) closes an open sheet
      await openMenu(page);
      await page.goBack();
      await expect(page).toHaveURL(new RegExp(`/${loc}${ROUTE}$`));
      await expect(panel(page)).toHaveCount(0);
      await expect(toggle(page)).toHaveAttribute("aria-expanded", "false");
    });
  }
}

test("768 en: backdrop click closes; growing past the breakpoint closes and resets", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile");
  await page.setViewportSize({ width: 768, height: 1024 });
  await gotoRoute(page, "en", true);
  await openMenu(page);
  const pb = await box(page, "nav#site-menu");
  expect(pb.bottom).toBeLessThan(1024 - 40); // the backdrop is visible below the sheet
  await page.mouse.click(384, 1024 - 12);
  await expect(panel(page)).toHaveCount(0);
  await expect(toggle(page)).toHaveAttribute("aria-expanded", "false");

  await openMenu(page);
  await page.setViewportSize({ width: 1024, height: 800 });
  await expect(panel(page)).toHaveCount(0);
  await expect(toggle(page)).toHaveAttribute("aria-expanded", "false");
  await expect(toggle(page)).toBeHidden();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(toggle(page)).toBeVisible();
  await expect(panel(page)).toHaveCount(0);
});

for (const { w, h } of VIEWPORTS) {
  test(`${w}×${h}: the header logo stays inside its container, top and scrolled`, async ({ page }, info) => {
    test.skip(info.project.name !== "mobile");
    await page.setViewportSize({ width: w, height: h });
    for (const scrolled of [false, true]) {
      await gotoRoute(page, "en", scrolled);
      const r = await page.evaluate(() => {
        const header = document.querySelector(".site-header > div")!.getBoundingClientRect();
        const img = [...document.querySelectorAll<HTMLImageElement>(".site-header img")].find((i) => i.offsetWidth > 0)!;
        const b = img.getBoundingClientRect();
        return { header: { top: header.top, bottom: header.bottom, left: header.left, right: header.right }, img: { top: b.top, bottom: b.bottom, left: b.left, right: b.right, w: b.width, h: b.height }, natural: { w: img.naturalWidth, h: img.naturalHeight }, clip: getComputedStyle(img.parentElement!).overflow };
      });
      expect(r.img.top).toBeGreaterThanOrEqual(r.header.top);
      expect(r.img.bottom).toBeLessThanOrEqual(r.header.bottom);
      expect(r.img.left).toBeGreaterThanOrEqual(r.header.left);
      expect(r.img.right).toBeLessThanOrEqual(r.header.right);
      // rendered at the natural aspect ratio (w-auto): nothing is cropped
      expect(Math.abs(r.img.w / r.img.h - r.natural.w / r.natural.h)).toBeLessThan(0.05);
      expect(r.clip).toBe("visible");
    }
  });
}

test("1440: no toggle, no sheet — the desktop header is untouched", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  for (const loc of LOCALES) {
    await gotoRoute(page, loc, false);
    await expect(toggle(page)).toBeHidden();
    await expect(panel(page)).toHaveCount(0);
    await expect(page.locator(".site-header nav").first()).toBeVisible();
    const hb = await box(page, ".site-header");
    expect(hb.h).toBe(81);
  }
});
