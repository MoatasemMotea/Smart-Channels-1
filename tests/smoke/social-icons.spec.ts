import { expect, test } from "@playwright/test";

/**
 * D-091 — footer social icon row (Facebook, X, LinkedIn, Instagram).
 * Only platforms with a real, owner-supplied URL render (no dead links,
 * no "#" hrefs); currently only LinkedIn is set, so Facebook, X and
 * Instagram must be absent. Hover/focus-visible rises a magenta layer
 * and turns the icon white with a 360° Y-axis turn — reduced motion
 * keeps the state change but drops the rotation and the transition.
 */

test("only the icons with a real URL render, in Facebook/X/LinkedIn/Instagram order", async ({ page }) => {
  await page.goto("/en");
  const row = page.locator(".social-row");
  const icons = row.locator(".social-icon");
  await expect(icons).toHaveCount(1); // only linkedin has a URL today
  await expect(icons.first()).toHaveAttribute("href", "https://www.linkedin.com/in/smart-channels-514a80372/");
  await expect(icons.first()).toHaveAttribute("target", "_blank");
  await expect(icons.first()).toHaveAttribute("rel", "noopener noreferrer");
  await expect(icons.first()).toHaveAttribute("aria-label", "LinkedIn");
  // never a dead "#" placeholder anywhere on the page
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
});

test("the aria-label is the Arabic platform name on /ar", async ({ page }) => {
  await page.goto("/ar");
  await expect(page.locator(".social-icon").first()).toHaveAttribute("aria-label", "لينكدإن");
});

for (const [w, h] of [
  [1440, 900],
  [390, 844],
] as const) {
  test(`circle size ${w}px: 56px desktop / 48px mobile, icon ratio 35/80`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto("/en");
    const icon = page.locator(".social-icon").first();
    await icon.scrollIntoViewIfNeeded();
    const box = await icon.boundingBox();
    const expected = w >= 641 ? 56 : 48;
    expect(box!.width).toBeCloseTo(expected, 0);
    expect(box!.height).toBeCloseTo(expected, 0);
    expect(box!.width).toBeGreaterThanOrEqual(44); // touch target floor
    const glyphBox = await icon.locator(".social-icon-glyph").boundingBox();
    expect(glyphBox!.width / box!.width).toBeCloseTo(35 / 80, 2);
  });
}

test("hover and focus-visible: the magenta fill rises and the icon turns white", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en");
  const icon = page.locator(".social-icon").first();
  await icon.scrollIntoViewIfNeeded();

  const restFill = await icon.locator(".social-icon-fill").evaluate((e) => getComputedStyle(e).insetBlockStart);
  const restColor = await icon.locator(".social-icon-glyph").evaluate((e) => getComputedStyle(e).color);
  expect(restFill).not.toBe("0px"); // fully below the circle at rest (resolves against the border-box padding edge)
  expect(restColor).toBe("rgb(10, 10, 12)"); // dark icon on the white circle

  await icon.hover();
  await page.waitForTimeout(600); // settle past the 0.5s rise

  const hoverFill = await icon.locator(".social-icon-fill").evaluate((e) => parseFloat(getComputedStyle(e).insetBlockStart));
  const hoverColor = await icon.locator(".social-icon-glyph").evaluate((e) => getComputedStyle(e).color);
  const hoverTransform = await icon.locator(".social-icon-glyph").evaluate((e) => getComputedStyle(e).transform);
  expect(hoverFill).toBeLessThan(1); // fully risen (sub-pixel rounding only)
  expect(hoverColor).toBe("rgb(255, 255, 255)");
  expect(hoverTransform).not.toBe("none"); // the Y-axis turn applied

  // keyboard focus gets the same treatment as hover (focus-visible)
  await page.mouse.move(0, 0);
  await page.keyboard.press("Tab"); // skip-link
  await icon.focus();
  await page.waitForTimeout(600);
  const focusFill = await icon.locator(".social-icon-fill").evaluate((e) => parseFloat(getComputedStyle(e).insetBlockStart));
  expect(focusFill).toBeLessThan(1);
});

test("reduced motion: the state still changes, with no rotation and no transition", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto("/en");
  const icon = page.locator(".social-icon").first();
  await icon.scrollIntoViewIfNeeded();

  const glyph = icon.locator(".social-icon-glyph");
  expect(await glyph.evaluate((e) => getComputedStyle(e).transitionProperty)).toBe("none");

  await icon.hover();
  await page.waitForTimeout(100);
  expect(await glyph.evaluate((e) => getComputedStyle(e).transform)).toBe("none"); // no Y-axis turn
  expect(await icon.locator(".social-icon-fill").evaluate((e) => parseFloat(getComputedStyle(e).insetBlockStart))).toBeLessThan(1); // state still changes
  await ctx.close();
});

test("RTL: logical spacing, no mirrored layout break", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  const row = page.locator(".social-row");
  await row.scrollIntoViewIfNeeded();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
  await expect(row.locator(".social-icon")).toHaveCount(1);
});
