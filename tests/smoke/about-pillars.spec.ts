import { expect, test } from "@playwright/test";

/**
 * D-092 — the homepage "About" section (owner-approved design, replaces
 * the old photo + 4-pillar layout): a centered heading, an intro
 * paragraph with three highlight rows and a dark image placeholder (the
 * fiber-splicing photo and its caption are gone), a vision/mission row,
 * five value cards and a goals panel.
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
  test(`${loc}: one centered h2, intro + highlights, vision/mission, four values, four goals; the old photo is gone`, async ({
    page,
  }, info) => {
    test.skip(info.project.name !== "desktop");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${loc}/`, { waitUntil: "networkidle" });
    const about = page.locator("#about");
    const e = EXPECT[loc];

    await expect(about.locator("h2")).toHaveCount(1);
    await expect(about.locator("h2")).toHaveText(e.heading);

    await expect(about.locator(".about-highlight")).toHaveCount(3);
    await expect(about.locator(".about-media-placeholder")).toHaveCount(1);
    expect(await about.innerText()).not.toContain(e.gone);
    await expect(about.locator("figure")).toHaveCount(0);
    await expect(about.locator("img")).toHaveCount(0);

    await expect(about.locator(".about-vm-vision .about-vm-label")).toContainText(e.vision);
    await expect(about.locator(".about-vm-mission .about-vm-label")).toContainText(e.mission);

    await expect(about.locator(".about-values-head h3")).toHaveText(e.valuesTitle);
    await expect(about.locator(".about-value-card")).toHaveCount(4);
    await expect(about.locator(".about-value-name")).toHaveText(e.values.map((v) => new RegExp(v)));

    await expect(about.locator(".about-goals-head h3")).toHaveText(e.goalsTitle);
    await expect(about.locator(".about-goal-item")).toHaveCount(4);
    await expect(about.locator(".about-goals-grid")).toContainText(e.goal);
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
      for (const el of root.querySelectorAll("h2, h3, p, li, strong, span")) {
        if (!el.textContent?.trim()) continue;
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
