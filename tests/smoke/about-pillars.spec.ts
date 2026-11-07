import { expect, test } from "@playwright/test";
import sharp from "sharp";

/**
 * D-092/D-101 — the homepage "About" section: a centered heading, an intro
 * paragraph with three highlight rows and an image slot (a brand-mark
 * placeholder until the owner supplies a photo), and a 4-card "skew cards"
 * grid (D-101) for vision / mission / values / goals.
 */
const EXPECT = {
  en: {
    heading: "About us",
    vision: "Our vision",
    mission: "Our mission",
    valuesTitle: "Our values",
    goalsTitle: "Our goals",
    values: ["Reliability & Safety", "Precision", "Responsiveness", "Partnership"],
    goal: "Empower national talent and develop their technical skills.",
    gone: "Fiber fusion splicing",
  },
  ar: {
    heading: "من نحن",
    vision: "رؤيتنا",
    mission: "رسالتنا",
    valuesTitle: "قيمنا",
    goalsTitle: "أهدافنا",
    values: ["الموثوقية والسلامة", "الدقة", "سرعة الاستجابة", "الشراكة"],
    goal: "تمكين الكفاءات الوطنية وتطوير مهاراتها التقنية.",
    gone: "لِحام ألياف بصرية",
  },
} as const;

for (const loc of ["en", "ar"] as const) {
  test(`${loc}: one centered h2, intro + highlights, four skew cards (vision/mission/values/goals); the old photo is gone`, async ({
    page,
  }, info) => {
    test.skip(info.project.name !== "desktop");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${loc}/`, { waitUntil: "networkidle" });
    const about = page.locator("#about");
    const e = EXPECT[loc];

    await expect(about.locator("h2")).toHaveCount(1);
    await expect(about.locator("h2")).toHaveText(e.heading);

    // D-101 Round 3: the heading and subtitle share the header container's center axis
    const centering = await about.locator(".about-header").evaluate((container) => {
      const h2 = container.querySelector("h2")!.getBoundingClientRect();
      const p = container.querySelector(".about-subtitle")!.getBoundingClientRect();
      const c = container.getBoundingClientRect();
      const center = (r: DOMRect) => (r.left + r.right) / 2;
      return { h2Delta: Math.abs(center(h2) - center(c)), pDelta: Math.abs(center(p) - center(c)) };
    });
    expect(centering.h2Delta).toBeLessThan(1);
    expect(centering.pDelta).toBeLessThan(1);

    await expect(about.locator(".about-highlight")).toHaveCount(3);
    await expect(about.locator(".about-media-placeholder")).toHaveCount(1);
    // the brand-mark watermark placeholder (no owner photo configured yet)
    await expect(about.locator(".about-media-mark")).toHaveCount(1);
    expect(await about.innerText()).not.toContain(e.gone);
    await expect(about.locator("figure")).toHaveCount(0);

    const cards = about.locator(".skew-card");
    await expect(cards).toHaveCount(4);
    await expect(cards.nth(0).locator(".skew-card-title")).toContainText(e.vision);
    await expect(cards.nth(1).locator(".skew-card-title")).toContainText(e.mission);
    await expect(cards.nth(2).locator(".skew-card-title")).toContainText(e.valuesTitle);
    await expect(cards.nth(2).locator(".skew-card-item-name")).toHaveText(e.values.map((v) => new RegExp(v)));
    await expect(cards.nth(3).locator(".skew-card-title")).toContainText(e.goalsTitle);
    await expect(cards.nth(3).locator(".skew-card-goal")).toHaveCount(4);
    await expect(cards.nth(3)).toContainText(e.goal);
  });
}

test("the About section keeps text contrast ≥ 4.5:1 on both themes", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ar/", { waitUntil: "networkidle" });
  for (const theme of ["dark", "light"]) {
    await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
    await page.waitForTimeout(400); // let the theme color transition settle
    const worst = await page.locator("#about").evaluate((root) => {
      const rgb = (s: string) => (s.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
      const lum = ([r, g, b]: number[]) => {
        const f = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
        return 0.2126 * f(r!) + 0.7152 * f(g!) + 0.0722 * f(b!);
      };
      let min = 99;
      // skew-card text sits over a sibling gradient panel, not an ancestor
      // background-color — this DOM-walk heuristic can't see it; it's
      // covered separately by the pixel-sampled test below.
      for (const el of root.querySelectorAll("h2, h3, p, li, strong, span")) {
        if (!el.textContent?.trim()) continue;
        if (el.closest(".skew-card")) continue;
        let bgEl: Element | null = el;
        while (bgEl && getComputedStyle(bgEl).backgroundColor.replace(/\s/g, "").match(/rgba\(0,0,0,0\)|transparent/)) {
          bgEl = bgEl.parentElement;
        }
        const bg = lum(rgb(getComputedStyle(bgEl ?? document.body).backgroundColor));
        const c = lum(rgb(getComputedStyle(el).color));
        min = Math.min(min, (Math.max(c, bg) + 0.05) / (Math.min(c, bg) + 0.05));
      }
      return min;
    });
    expect(worst, theme).toBeGreaterThanOrEqual(4.5);
  }
});

/**
 * D-101 — skew-card text contrast, sampled from the actual rendered pixels
 * (the panel is a gradient sibling, not a solid ancestor background-color,
 * so the generic DOM-walk contrast test above can't see it).
 */
test("skew-card text contrast ≥ 4.5:1 against the rendered gradient panel (both themes)", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.setViewportSize({ width: 1440, height: 1400 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en/#about", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);

  const rgb = (s: string) => (s.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
  const lum = ([r, g, b]: number[]) => {
    const f = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    return 0.2126 * f(r!) + 0.7152 * f(g!) + 0.0722 * f(b!);
  };

  for (const theme of ["dark", "light"] as const) {
    await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
    await page.waitForTimeout(400);
    const cards = page.locator(".skew-card");
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const buffer = await card.screenshot();
      const { data, info: meta } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const lines = await card.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        const out: { x: number; y: number; color: string }[] = [];
        for (const t of el.querySelectorAll(".skew-card-content p, .skew-card-content span, .skew-card-content li")) {
          for (const r of t.getClientRects()) {
            if (r.width === 0 || r.height === 0) continue;
            // sample just inside the line's top edge — the interline gap,
            // clear of glyph ink, but still on the panel background
            out.push({
              x: Math.min(r.left + 4, r.right - 2) - rect.left,
              y: r.top + 1 - rect.top,
              color: getComputedStyle(t).color,
            });
          }
        }
        return out;
      });
      for (const line of lines) {
        const x = Math.round(Math.min(Math.max(line.x, 0), meta.width - 1));
        const y = Math.round(Math.min(Math.max(line.y, 0), meta.height - 1));
        const idx = (y * meta.width + x) * meta.channels;
        const bg = [data[idx]!, data[idx + 1]!, data[idx + 2]!];
        const ratio = (Math.max(lum(rgb(line.color)), lum(bg)) + 0.05) / (Math.min(lum(rgb(line.color)), lum(bg)) + 0.05);
        expect(ratio, `${theme} card ${i} at (${x},${y})`).toBeGreaterThanOrEqual(4.5);
      }
    }
  }
});

/**
 * D-101 Round 2 — every text line inside a skew card must stay inside that
 * card's colored panel (no spilling into the skewed-away corner).
 */
for (const loc of ["en", "ar"] as const) {
  for (const width of [1440, 390] as const) {
    test(`${loc} @${width}: skew-card text stays inside the colored panel`, async ({ page }, info) => {
      test.skip(info.project.name !== "desktop");
      await page.setViewportSize({ width, height: 1400 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`/${loc}/#about`, { waitUntil: "networkidle" });
      await page.waitForTimeout(500);

      const violations = await page.evaluate(() => {
        const out: string[] = [];
        for (const card of document.querySelectorAll(".skew-card")) {
          const panel = card.querySelector(".skew-card-panel-solid")!;
          const panelBox = panel.getBoundingClientRect();
          for (const el of card.querySelectorAll(".skew-card-content p, .skew-card-content span, .skew-card-content li")) {
            for (const r of el.getClientRects()) {
              if (r.width === 0 || r.height === 0) continue;
              const within =
                r.left >= panelBox.left - 0.5 &&
                r.right <= panelBox.right + 0.5 &&
                r.top >= panelBox.top - 0.5 &&
                r.bottom <= panelBox.bottom + 0.5;
              if (!within) out.push((el.textContent ?? "").slice(0, 40));
            }
          }
        }
        return out;
      });
      expect(violations, violations.join(", ")).toHaveLength(0);
    });
  }
}

test("the About section has no horizontal scroll at 390px", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.setViewportSize({ width: 390, height: 1400 });
  await page.goto("/en/#about", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test("a skew card activates its hover-equivalent state via :focus-within (keyboard)", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.goto("/en/#about", { waitUntil: "networkidle" });
  const card = page.locator(".skew-card").first();
  const content = card.locator(".skew-card-content");
  const restPadding = await content.evaluate((el) => getComputedStyle(el).paddingBlockStart);
  await card.focus();
  await expect(card).toBeFocused();
  await page.waitForTimeout(500); // let the --dur-component (450ms) padding transition settle
  const focusedPadding = await content.evaluate((el) => getComputedStyle(el).paddingBlockStart);
  expect(focusedPadding).not.toBe(restPadding);
});
