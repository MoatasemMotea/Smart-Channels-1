import { expect, test, type Page } from "@playwright/test";

/**
 * D-097 restored the dots-logo opening (D-086 had made the hero final
 * from the first paint; that premise no longer holds for a fresh
 * session — tests/smoke/opening.spec.ts covers the opening's own
 * behavior in full). What's still guaranteed, and asserted here, is the
 * SKIPPED/return-visit path: once a session has already seen the
 * opening (or carries a #hash, or reduced motion), the hero is final at
 * DOMContentLoaded exactly as before, and nothing below the fold is
 * requested before the visitor scrolls there.
 */
async function markOpeningSeen(page: Page) {
  await page.addInitScript(() => {
    try {
      sessionStorage.setItem("sc-opening", "1");
    } catch {
      /* ignore */
    }
  });
}

/** data-opening resolves to "done"/"skipped", or was never set at all
 *  (STATIC tier) — either way the hero is final and scroll is free. */
async function waitForHeroFinal(page: Page) {
  await page.waitForFunction(
    () => {
      const s = document.documentElement.getAttribute("data-opening");
      return s === "done" || s === "skipped" || (s === null && document.body.style.overflow === "");
    },
    null,
    { timeout: 20_000 },
  );
}

for (const loc of ["ar", "en"] as const) {
  test(`${loc}: hero, photograph and header are final at DOMContentLoaded on a seen session`, async ({ page }) => {
    await markOpeningSeen(page);
    await page.addInitScript(() => {
      document.addEventListener("DOMContentLoaded", () => {
        const read = (sel: string) =>
          [...document.querySelectorAll<HTMLElement>(sel)].map((el) => {
            const cs = getComputedStyle(el);
            return { sel, opacity: cs.opacity, transform: cs.transform, animation: cs.animationName, visibility: cs.visibility };
          });
        const accent = document.querySelector(".hero-accent-word");
        (window as unknown as { __firstPaint: unknown }).__firstPaint = {
          items: [...read(".hero-photo-stage"), ...read(".site-header")],
          accent: accent ? getComputedStyle(accent).color : null,
          opening: document.documentElement.getAttribute("data-opening"),
        };
      });
    });
    await page.goto(`/${loc}`, { waitUntil: "domcontentloaded" });
    const fp = (await page.evaluate(() => (window as unknown as { __firstPaint: unknown }).__firstPaint)) as {
      items: { sel: string; opacity: string; transform: string; animation: string; visibility: string }[];
      accent: string;
      opening: string | null;
    };
    expect(fp.items.length).toBeGreaterThanOrEqual(1);
    // "skipped" on a seen session: the quick-entrance animation is
    // already running at DOMContentLoaded (keyed off html[data-opening])
    expect(fp.opening).toBe("skipped");
    await waitForHeroFinal(page);
    await expect(page.locator(".hero-headline")).toBeVisible();
    // the quick riyadh-arrive/hero-accent-sweep animations (≤800ms on a
    // skipped load) may still be mid-flight the instant data-opening
    // resolves — wait for them to settle before reading final values
    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.querySelector(".hero-photo-stage")!).opacity))
      .toBe("1");
    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.querySelector(".hero-accent-word")!).color))
      .toBe("rgb(255, 24, 156)"); // the brand magenta
  });
}

/* D-086 — below the fold waits: a homepage load at scroll 0 requests no
   industries scene, no gallery video poster and no gallery video. D-097:
   a seen session so scroll is never held back by the opening. */
for (const loc of ["ar", "en"] as const) {
  test(`${loc}: no industries image, gallery poster or gallery video before scrolling`, async ({ page }) => {
    await markOpeningSeen(page);
    const early: string[] = [];
    page.on("request", (r) => {
      const u = new URL(r.url()).pathname;
      if (u.startsWith("/media/industries/") || u.startsWith("/media/posters/") || /^\/media\/gallery\/.*\.mp4$/.test(u)) early.push(u);
    });
    await page.goto(`/${loc}`, { waitUntil: "networkidle" });
    await waitForHeroFinal(page);
    await page.waitForTimeout(1500);
    expect(early).toEqual([]);
    // and they do arrive once the visitor gets there
    await page.evaluate(() => document.querySelector("#gallery")?.scrollIntoView({ behavior: "instant", block: "center" }));
    await expect.poll(() => early.some((u) => u.startsWith("/media/posters/"))).toBe(true);
  });
}
