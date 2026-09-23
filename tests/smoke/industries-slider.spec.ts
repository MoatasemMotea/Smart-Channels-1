import { expect, test, type Page } from "@playwright/test";

/**
 * D-072 — the homepage Industries section is a full-width slider of the 16
 * approved sectors in the owner's importance order, with no "featured"
 * marks: order 01→16, arrows and the loop, 5 s autoplay that does NOT
 * pause on hover (D-073) but does on the visible button, no autoplay and
 * no orb under reduced motion, RTL-mirrored controls, the
 * active label kept in view in the bottom strip, a title that fits 390 px,
 * lazy scenes (the first decoded at load, the sixth not yet), the scene
 * shown whole (0 % cropped) on three viewports, and the light orb present
 * during the 900 ms reveal and gone after it.
 */
const ORDER = [
  "Religious & Holy Sites", "Government & Public Sector", "Giga-projects", "Diplomatic Missions",
  "Banking & Finance", "Industrial & Energy", "Education", "Stadiums & Sports Cities",
  "Major Sporting Events", "Motorsport & Racing", "Healthcare", "Cultural Seasons & Festivals",
  "Hospitality & F&B", "Retail & Malls", "Transport & Rail", "Media & Broadcast",
];
const region = (page: Page) => page.locator('.industries-slider[role="region"]');
const active = (page: Page) => page.locator('.industries-slide[data-state="active"]');
const activeIndex = (page: Page) => active(page).getAttribute("data-slide");
const expectSlide = (page: Page, i: number) => expect(active(page)).toHaveAttribute("data-slide", String(i));

/**
 * D-079: click a label the way a visitor reaches it — bring it into view INSIDE the
 * horizontally scrolling strip first (block "nearest": the page itself does not move).
 * Playwright's own auto-scroll centres an off-strip tab on BOTH axes, which would scroll
 * the page past the sticky Industries scene and let Selected Projects cover the strip.
 */
async function clickTab(page: Page, n: number) {
  const tab = page.locator(`.industries-slider-tab[data-tab="${n}"]`);
  // the strip also scrolls ITSELF (smoothly) after every autoplay step: scroll the strip's
  // own horizontal container (never the page) until the tab is wholly inside it and the
  // container is still — Playwright then has nothing to scroll before its real click
  await tab.evaluate(async (e) => {
    if (!document.querySelector(".scene-stack[data-stack-on]")) return; // no stack (LITE/STATIC): a plain click
    // an earlier pointer action (hover) may have let Playwright scroll the page — put the
    // sticky scene back where its bottom meets the viewport bottom (cover 0)
    // (scrollIntoView on a STUCK element reads its stuck position — compute the static top)
    const section = document.querySelector<HTMLElement>("#industries")!;
    document.documentElement.classList.add("sc-measure");
    let top = 0;
    for (let n: HTMLElement | null = section; n; n = n.offsetParent as HTMLElement | null) top += n.offsetTop;
    document.documentElement.classList.remove("sc-measure");
    window.scrollTo({ top: Math.max(top + section.offsetHeight - innerHeight, top - (innerHeight - section.offsetHeight) / 2), behavior: "instant" });
    let sc: HTMLElement | null = e.parentElement;
    while (sc && !/(auto|scroll)/.test(getComputedStyle(sc).overflowX)) sc = sc.parentElement;
    const frame = () => new Promise((r) => requestAnimationFrame(r));
    for (let i = 0; i < 20; i++) {
      const box = sc ? sc.getBoundingClientRect() : { left: 0, right: innerWidth };
      const lo = Math.max(0, box.left);
      const hi = Math.min(innerWidth, box.right);
      const r = e.getBoundingClientRect();
      if (sc && r.left < lo) sc.scrollLeft -= lo - r.left + 8;
      else if (sc && r.right > hi) sc.scrollLeft += r.right - hi + 8;
      const x = sc?.scrollLeft ?? 0;
      await frame();
      await frame();
      const q = e.getBoundingClientRect();
      if ((sc?.scrollLeft ?? 0) === x && q.left >= lo - 1 && q.right <= hi + 1) return;
    }
  });
  await tab.click();
}

/** the homepage plays its opening first; then bring the section into view WITHOUT focusing it (focus pauses autoplay) */
async function gotoSlider(page: Page, loc: "en" | "ar") {
  await page.goto(`/${loc}/`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => {
    const s = document.documentElement.getAttribute("data-opening");
    return s === "done" || s === "skipped" || (s === null && document.body.style.overflow === "");
  }, null, { timeout: 15000 });
  // D-079: on desktop Industries is a sticky scene taller than the viewport — bring its BOTTOM
  // edge to the viewport bottom (the whole slider on screen, the riser not yet in: cover 0)
  await page.evaluate(() => {
    const el = document.querySelector<HTMLElement>("#industries")!;
    el.scrollIntoView({ block: el.offsetHeight > innerHeight ? "end" : "center", behavior: "instant" });
  });
  await page.waitForTimeout(600);
}

test("order 01→16 in the strip; zero featured marks; no visible counter (D-076)", async ({ page }) => {
  await gotoSlider(page, "en");
  await expect(page.locator(".industries-slider-tab")).toHaveText(ORDER);
  await expect(page.locator(".industries-slide")).toHaveCount(16);
  await expect(active(page).locator(".industries-slide-title")).toHaveText(ORDER[0]!);
  await expectSlide(page, 0);
  await expect(page.locator(".industries-slider-counter, .industries-slider-counter-now, .industries-slider-counter-total")).toHaveCount(0); // D-076
  await expect(active(page)).toHaveAttribute("aria-label", "01 / 16"); // the accessible label stays
  // D-072: no distinction marks anywhere in the DOM
  await expect(page.locator(".industry-mark, [data-featured], .industries-matrix")).toHaveCount(0);
  expect(await page.locator("#industries").innerText()).not.toMatch(/Featured focus sector/);
  // accessibility contract
  await expect(region(page)).toHaveAttribute("aria-roledescription", "carousel");
  await expect(region(page)).toHaveAttribute("aria-label", "Industries we serve");
  await expect(page.locator('.industries-slide[aria-hidden="true"]')).toHaveCount(15);
  await expect(page.locator(".industries-slide[inert]")).toHaveCount(15);
  await expect(region(page).locator('[aria-live="polite"]')).toHaveText(ORDER[0]!);
  const toggle = page.getByRole("button", { name: "Pause automatic rotation" });
  const tb = await toggle.boundingBox();
  expect(tb!.width).toBeGreaterThanOrEqual(44);
  expect(tb!.height).toBeGreaterThanOrEqual(44);
});

test("arrows step and the loop closes: 16 → 01 and 01 → 16; Home/End", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop"); // the arrows are hidden at ≤ 640 px (strip + swipe there)
  await gotoSlider(page, "en");
  const next = page.getByRole("button", { name: "Next industry" });
  const prev = page.getByRole("button", { name: "Previous industry" });
  await next.click();
  await expect(active(page).locator(".industries-slide-title")).toHaveText(ORDER[1]!);
  await expect(active(page)).toHaveAttribute("data-slide", "1");
  await prev.click();
  await prev.click(); // 01 → 16: the loop
  await expect(active(page).locator(".industries-slide-title")).toHaveText(ORDER[15]!);
  await expect(active(page)).toHaveAttribute("data-slide", "15");
  await next.click(); // 16 → 01
  await expect(active(page).locator(".industries-slide-title")).toHaveText(ORDER[0]!);
  await expect(region(page).locator('[aria-live="polite"]')).toHaveText(ORDER[0]!);
  await next.focus();
  await page.keyboard.press("End");
  await expect(active(page)).toHaveAttribute("data-slide", "15");
  await page.keyboard.press("Home");
  await expect(active(page)).toHaveAttribute("data-slide", "0");
  await page.keyboard.press("ArrowRight");
  await expect(active(page)).toHaveAttribute("data-slide", "1");
  await page.keyboard.press("ArrowLeft");
  await expect(active(page)).toHaveAttribute("data-slide", "0");
  // the leaving slide's exit state clears on transitionend (no slide stuck in "leaving")
  await expect(page.locator('.industries-slide[data-state="leaving"]')).toHaveCount(0);
});

test("autoplay runs in view, advances after 5 s, keeps running under the pointer, pauses only on the visible button", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop"); // hover is a pointer affair
  await gotoSlider(page, "en");
  await expect(region(page)).toHaveAttribute("data-autoplay", "running");
  const fill = page.locator('.industries-slider-tab[aria-current="true"] .industries-slider-tab-fill');
  expect(await fill.evaluate((e) => getComputedStyle(e).animationDuration)).toBe("5s");
  await expect(active(page)).toHaveAttribute("data-slide", "1", { timeout: 7000 });
  // D-073: hover does not stop the clock
  await active(page).hover();
  await expect(region(page)).toHaveAttribute("data-autoplay", "running");
  await expect(active(page)).toHaveAttribute("data-slide", "2", { timeout: 7000 });
  // a click on a label moves with the full transition and restarts the timer — autoplay stays on
  await clickTab(page, 9);
  await expect(active(page)).toHaveAttribute("data-slide", "9");
  await expect(region(page)).toHaveAttribute("data-autoplay", "running"); // focus inside does not pause either
  await expect(active(page)).toHaveAttribute("data-slide", "10", { timeout: 7000 });
  // only the visible button pauses
  await page.getByRole("button", { name: "Pause automatic rotation" }).click();
  await expect(region(page)).toHaveAttribute("data-autoplay", "paused");
  await expect(page.getByRole("button", { name: "Resume automatic rotation" })).toBeVisible();
  const before = await activeIndex(page);
  await page.waitForTimeout(5800);
  expect(await activeIndex(page)).toBe(before);
});

test("the reveal: the light orb exists during the 900 ms transition and is gone after; the leaving slide is released", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await gotoSlider(page, "en");
  await page.getByRole("button", { name: "Pause automatic rotation" }).click();
  await clickTab(page, 1);
  await expect(page.locator(".industries-slider-orb")).toHaveCount(1);
  await expect(page.locator('.industries-slide[data-state="leaving"]')).toHaveCount(1);
  await expect(page.locator('.industries-slide[data-entering]')).toHaveCount(1);
  const dur = await active(page).evaluate((e) => getComputedStyle(e).transitionDuration);
  expect(dur.split(",").every((d) => parseFloat(d) === 0.9)).toBe(true);
  await expect(page.locator(".industries-slider-orb")).toHaveCount(0, { timeout: 3000 });
  await expect(page.locator('.industries-slide[data-state="leaving"]')).toHaveCount(0);
  await expect(page.locator('.industries-slide[data-entering]')).toHaveCount(0);
  expect(await active(page).evaluate((e) => getComputedStyle(e).willChange)).toBe("auto");
});

test("reduced motion: no autoplay, no pause button, no progress line, no orb, no clip-path or blur", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await gotoSlider(page, "en");
  await expect(region(page)).toHaveAttribute("data-autoplay", "off");
  await expect(page.locator(".industries-slider-toggle")).toHaveCount(0);
  await expect(page.locator('.industries-slider-tab[aria-current="true"] .industries-slider-tab-line')).toBeHidden();
  await page.waitForTimeout(5800);
  await expect(active(page)).toHaveAttribute("data-slide", "0");
  await clickTab(page, 1);
  await expect(page.locator(".industries-slider-orb")).toHaveCount(0);
  const cs = await active(page).evaluate((e) => { const c = getComputedStyle(e); return { t: c.transitionDuration, clip: c.clipPath, filter: c.filter }; });
  expect(parseFloat(cs.t)).toBeLessThanOrEqual(0.2);
  expect(cs.clip).toBe("none");
  expect(cs.filter).toBe("none");
  await ctx.close();
});

for (const [w, h] of [[1440, 900], [1890, 600], [390, 844]] as const) {
  test(`${w}×${h}: the scene is shown whole — 0 % cropped — over the blurred backdrop`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await gotoSlider(page, "en");
    const m = await page.evaluate(() => {
      const stage = document.querySelector(".industries-slider-stage")!.getBoundingClientRect();
      const img = document.querySelector<HTMLImageElement>('[data-slide="0"] .industries-slide-media img')!;
      const box = img.getBoundingClientRect();
      const ar = img.naturalWidth / img.naturalHeight; // intrinsic aspect of the chosen candidate
      const boxAr = box.width / box.height;
      // contain: the drawn size is the largest that fits the box at the intrinsic aspect
      const drawnW = boxAr > ar ? box.height * ar : box.width;
      const drawnH = boxAr > ar ? box.height : box.width / ar;
      const backdrop = document.querySelector<HTMLImageElement>('[data-slide="0"] .industries-slide-backdrop img')!;
      return { fit: getComputedStyle(img).objectFit, drawnW, drawnH, boxW: box.width, boxH: box.height, stageH: stage.height, backdropFit: getComputedStyle(backdrop).objectFit, backdropFilter: getComputedStyle(backdrop).filter };
    });
    expect(m.fit).toBe("contain");
    expect(m.drawnW).toBeLessThanOrEqual(m.boxW + 0.5);
    expect(m.drawnH).toBeLessThanOrEqual(m.boxH + 0.5); // nothing hidden: the drawn scene fits the box → 0 % cropped
    expect(Math.abs(m.drawnW - m.boxW) < 1 || Math.abs(m.drawnH - m.boxH) < 1).toBe(true); // bound by width or by height
    expect(m.backdropFit).toBe("cover");
    expect(m.backdropFilter).toContain("blur(");
    const expected = w <= 640 ? Math.min(Math.max(300, 0.7 * w), 480) : Math.min(Math.max(420, 0.56 * w), 720);
    expect(Math.abs(m.stageH - expected)).toBeLessThanOrEqual(1);
  });
}

test("RTL: the pause button sits at the line start (right) and the arrows mirror; ← moves to the logical next", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await gotoSlider(page, "ar");
  const stage = (await page.locator(".industries-slider-stage").boundingBox())!;
  const toggle = (await page.locator(".industries-slider-toggle").boundingBox())!;
  const prev = (await page.locator('.industries-slider-arrow[data-dir="prev"]').boundingBox())!;
  const next = (await page.locator('.industries-slider-arrow[data-dir="next"]').boundingBox())!;
  const mid = stage.x + stage.width / 2;
  expect(toggle.x + toggle.width / 2).toBeGreaterThan(mid); // inline start = right in RTL
  expect(prev.x + prev.width / 2).toBeGreaterThan(mid); // "previous" toward the line start
  expect(next.x + next.width / 2).toBeLessThan(mid); // "next" toward the line end
  expect(await page.locator('.industries-slider-arrow[data-dir="prev"] svg').evaluate((e) => getComputedStyle(e).transform)).not.toBe("none"); // glyph mirrored
  await expect(active(page).locator(".industries-slide-title")).toHaveText("المواقع الدينية والمقدسة");
  await expect(region(page)).toHaveAttribute("aria-label", "القطاعات التي نخدمها");
  await expect(page.locator(".industries-slider-counter")).toHaveCount(0);
  await page.locator(".industries-slider-toggle").focus();
  await page.keyboard.press("ArrowLeft"); // RTL: ← is the logical next
  await expectSlide(page, 1);
});

test("the bottom strip keeps the active label in view after every transition", async ({ page }) => {
  await gotoSlider(page, "en");
  const strip = page.locator(".industries-slider-strip");
  for (let i = 0; i < 16; i++) {
    await clickTab(page, (i * 5) % 16);
    await page.waitForTimeout(700); // smooth scrollIntoView
    const s = (await strip.boundingBox())!;
    const t = (await page.locator('.industries-slider-tab[aria-current="true"]').boundingBox())!;
    expect(t.x, `tab ${(i * 5) % 16}`).toBeGreaterThanOrEqual(s.x - 1);
    expect(t.x + t.width, `tab ${(i * 5) % 16}`).toBeLessThanOrEqual(s.x + s.width + 1);
  }
});

test("390 px: every title fits the screen width; the two cut-out slides carry their files (D-074)", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await gotoSlider(page, "en");
  for (let i = 0; i < 16; i++) {
    await clickTab(page, i);
    await expect(active(page)).toHaveAttribute("data-slide", String(i));
    const r = (await active(page).locator(".industries-slide-title").boundingBox())!;
    expect(r.x, ORDER[i]).toBeGreaterThanOrEqual(0);
    expect(r.x + r.width, ORDER[i]).toBeLessThanOrEqual(390);
  }
  // D-074: 08 and 09 are transparent cut-outs linked by owner exception — a scene
  // like the rest (foreground + blurred ground over the gradient), alpha preserved
  await expect(page.locator(".industries-slide[data-empty]")).toHaveCount(0);
  for (const i of [7, 8]) {
    await clickTab(page, i);
    const img = page.locator(`.industries-slide[data-slide="${i}"] .industries-slide-media img`);
    await expect(img).toHaveCount(1);
    await expect(img).toHaveAttribute("src", /industry-0[89]-[a-z-]+\.webp$/);
  }
});

test("lazy scenes: the first is decoded at load, the sixth is not loaded yet", async ({ page }) => {
  await gotoSlider(page, "en");
  const first = page.locator('.industries-slide[data-slide="0"] .industries-slide-media img');
  await expect(first).toHaveCount(1);
  expect(await first.evaluate((i: HTMLImageElement) => i.naturalWidth)).toBeGreaterThan(0);
  // D-073: each mounted slide also carries its blurred backdrop (the 960 file)
  await expect(page.locator('.industries-slide[data-slide="0"] .industries-slide-backdrop img')).toHaveAttribute("src", /industry-01-religious-960\.webp$/);
  await expect(page.locator('.industries-slide[data-slide="5"] img')).toHaveCount(0);
  expect(await page.evaluate(() => performance.getEntriesByType("resource").filter((e) => e.name.includes("industry-06-")).length)).toBe(0);
  // the neighbours are the only other scenes in the DOM: three foregrounds, three backdrops
  expect(await page.locator(".industries-slide-media img").count()).toBe(3);
  expect(await page.locator(".industries-slide-backdrop img").count()).toBe(3);
});
