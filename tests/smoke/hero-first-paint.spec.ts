import { expect, test } from "@playwright/test";

/**
 * D-086 — the homepage hero is final from the first paint.
 *
 * The cinematic opening, its particle field and every entrance animation
 * are gone: at DOMContentLoaded (before any JavaScript hydrates) the
 * headline, sub-copy, CTAs, the Riyadh photograph and the header are
 * fully visible — opacity 1, no transform, no animation, no hidden
 * visibility — "the experience" word is already in its final colour,
 * and <html> carries no data-opening.
 */
for (const loc of ["ar", "en"] as const) {
  test(`${loc}: hero, photograph and header are final at DOMContentLoaded; no data-opening`, async ({ page }) => {
    await page.addInitScript(() => {
      document.addEventListener("DOMContentLoaded", () => {
        const read = (sel: string) =>
          [...document.querySelectorAll<HTMLElement>(sel)].map((el) => {
            const cs = getComputedStyle(el);
            return { sel, opacity: cs.opacity, transform: cs.transform, animation: cs.animationName, visibility: cs.visibility };
          });
        const accent = document.querySelector(".hero-accent-word");
        (window as unknown as { __firstPaint: unknown }).__firstPaint = {
          items: [...read(".hero-scene .hero-stage"), ...read(".hero-photo-stage"), ...read(".site-header")],
          accent: accent ? getComputedStyle(accent).color : null,
          opening: document.documentElement.getAttribute("data-opening"),
          canvas: document.querySelectorAll(".hero-scene canvas").length,
        };
      });
    });
    await page.goto(`/${loc}`, { waitUntil: "domcontentloaded" });
    const fp = (await page.evaluate(() => (window as unknown as { __firstPaint: unknown }).__firstPaint)) as {
      items: { sel: string; opacity: string; transform: string; animation: string; visibility: string }[];
      accent: string;
      opening: string | null;
      canvas: number;
    };
    expect(fp.items.length).toBeGreaterThanOrEqual(7);
    for (const i of fp.items) {
      expect(i, i.sel).toMatchObject({ opacity: "1", transform: "none", animation: "none", visibility: "visible" });
    }
    expect(fp.accent).toBe("rgb(255, 24, 156)"); // the brand magenta, from the start
    expect(fp.opening).toBeNull();
    expect(fp.canvas).toBe(0); // no particle field
    // and it stays that way once the page has hydrated
    await page.waitForLoadState("networkidle");
    await expect(page.locator("html")).not.toHaveAttribute("data-opening");
  });
}

/* D-086 — below the fold waits: a homepage load at scroll 0 requests no
   industries scene, no gallery video poster and no gallery video. */
for (const loc of ["ar", "en"] as const) {
  test(`${loc}: no industries image, gallery poster or gallery video before scrolling`, async ({ page }) => {
    const early: string[] = [];
    page.on("request", (r) => {
      const u = new URL(r.url()).pathname;
      if (u.startsWith("/media/industries/") || u.startsWith("/media/posters/") || /^\/media\/gallery\/.*\.mp4$/.test(u)) early.push(u);
    });
    await page.goto(`/${loc}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    expect(early).toEqual([]);
    // and they do arrive once the visitor gets there
    await page.evaluate(() => document.querySelector("#gallery")?.scrollIntoView({ behavior: "instant", block: "center" }));
    await expect.poll(() => early.some((u) => u.startsWith("/media/posters/"))).toBe(true);
  });
}
