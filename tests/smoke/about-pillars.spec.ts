import { expect, test } from "@playwright/test";

/**
 * D-081 (C) — the homepage About section: the h2 and the paragraph stay,
 * the photograph and its caption stay, the old "Our mission" block is
 * gone, and the four parts — vision · mission · values · goals — sit
 * under the photograph as h3, in both languages, with text contrast
 * ≥ 4.5:1 in both themes.
 */
const EXPECT = {
  en: { h3: ["Our vision", "Our mission", "Our values", "Our goals"], value: "Reliability", goal: "Develop national technical talent", gone: "Engineering Team" },
  ar: { h3: ["رؤيتنا", "رسالتنا", "قيمنا", "أهدافنا"], value: "الموثوقية", goal: "تطوير الكفاءات التقنية الوطنية", gone: "الفريق الهندسي" },
} as const;

for (const loc of ["en", "ar"] as const) {
  test(`${loc}: one h2, four h3 parts in order, five values, four goals; the old row and mission block are gone`, async ({ page }, info) => {
    test.skip(info.project.name !== "desktop");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${loc}/`, { waitUntil: "networkidle" });
    const about = page.locator("#about");
    await expect(about.locator("h2")).toHaveCount(1);
    await expect(about.locator("h3")).toHaveText([...EXPECT[loc].h3]);
    await expect(about.locator(".about-values > li")).toHaveCount(5);
    await expect(about.locator(".about-values > li").first()).toContainText(EXPECT[loc].value);
    await expect(about.locator(".about-goals > li")).toHaveCount(4);
    await expect(about.locator(".about-goals")).toContainText(EXPECT[loc].goal);
    expect(await about.innerText()).not.toContain(EXPECT[loc].gone);
    // "mission" appears once — as the h3, not also as the old label + quote
    expect((await about.innerText()).split(EXPECT[loc].h3[1]).length - 1).toBe(1);
    // the photograph and its caption are unchanged
    await expect(about.locator("figure img")).toHaveAttribute("src", /fiber-splicing-riyadh-2025/);
    await expect(about.locator("figcaption")).toHaveCount(1);
  });
}

test("the four parts keep text contrast ≥ 4.5:1 on both themes", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ar/", { waitUntil: "networkidle" });
  for (const theme of ["dark", "light"]) {
    await page.evaluate((t) => document.documentElement.setAttribute("data-theme", t), theme);
    const worst = await page.locator(".about-pillars").evaluate((root) => {
      const rgb = (s: string) => (s.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
      const lum = ([r, g, b]: number[]) => {
        const f = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
        return 0.2126 * f(r!) + 0.7152 * f(g!) + 0.0722 * f(b!);
      };
      let bgEl: Element | null = root;
      while (bgEl && getComputedStyle(bgEl).backgroundColor.replace(/\s/g, "").match(/rgba\(0,0,0,0\)|transparent/)) bgEl = bgEl.parentElement;
      const bg = lum(rgb(getComputedStyle(bgEl ?? document.body).backgroundColor));
      let min = 99;
      for (const el of root.querySelectorAll("h3, p, li, strong, span")) {
        if (!el.textContent?.trim()) continue;
        const c = lum(rgb(getComputedStyle(el).color));
        min = Math.min(min, (Math.max(c, bg) + 0.05) / (Math.min(c, bg) + 0.05));
      }
      return min;
    });
    expect(worst, theme).toBeGreaterThanOrEqual(4.5);
  }
});
