import { expect, test, type Page } from "@playwright/test";

/**
 * Opening-visibility regression (owner directive, P5 hotfix).
 *
 * The cinematic brand opening must VISIBLY own the viewport on every full
 * document load: computed visibility is asserted (stage geometry, stacking,
 * logo opacity over time) — never DOM presence alone. Guards the two root
 * causes fixed here: the auto-skip racing hydration, and browser scroll
 * restoration playing the sequence outside the visible viewport.
 */

async function openingState(page: Page): Promise<string | null> {
  return page.evaluate(() => document.documentElement.getAttribute("data-opening"));
}

/** The fixed stage (engine host or CSS pre-stage) that covers the viewport. */
async function stageGeometry(page: Page) {
  return page.evaluate(() => {
    const pick = (sel: string) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const cs = getComputedStyle(el);
      if (cs.display === "none") return null;
      const r = el.getBoundingClientRect();
      return { position: cs.position, z: Number(cs.zIndex) || 0, w: r.width, h: r.height, top: r.top };
    };
    return pick(".opening-host") ?? pick(".opening-prestage");
  });
}

test("fresh load: the opening owns the viewport, the logo is readable, then the hero reveals", async ({ page }) => {
  await page.goto("/en", { waitUntil: "domcontentloaded" });

  // the sequence is armed pre-paint and the stage covers the viewport
  await expect
    .poll(async () => openingState(page), { timeout: 3000 })
    .toMatch(/pending|running/);
  const stage = await stageGeometry(page);
  expect(stage, "an opening stage must exist and be displayed").not.toBeNull();
  expect(stage!.position).toBe("fixed");
  expect(stage!.z).toBeGreaterThanOrEqual(59);
  const vp = page.viewportSize()!;
  expect(stage!.w).toBeGreaterThanOrEqual(vp.width - 2);
  expect(stage!.h).toBeGreaterThanOrEqual(vp.height - 2);

  // the hero must NOT visually dominate while the opening plays (the
  // staged elements — headline lines, sub, CTAs — are held back)
  const stageHidden = await page.evaluate(
    () => getComputedStyle(document.querySelector('.hero-stage[data-stage="2"]')!).opacity,
  );
  expect(Number(stageHidden)).toBeLessThan(0.05);

  // the REAL logo becomes computed-visible and HOLDS ≥ 800ms.
  // Measured in-page at fixed rAF cadence from the start of the
  // sequence — an expect.poll's growing intervals can DETECT
  // readability late and then under-measure the hold (the D-050
  // timeline holds the logo ~1.4s; the assertion targets the actual
  // continuous visible window, not the detection instant).
  const heldMs = await page.evaluate(
    () =>
      new Promise<number>((resolve) => {
        const readLogo = () => {
          const els = [...document.querySelectorAll<HTMLElement>(".opening-logo, .opening-prestage img")];
          const vis = els.filter((e) => {
            const cs = getComputedStyle(e);
            return cs.display !== "none" && e.getBoundingClientRect().width > 0;
          });
          return Math.max(0, ...vis.map((e) => Number(getComputedStyle(e).opacity)));
        };
        let visibleSince: number | null = null;
        let longest = 0;
        const t0 = performance.now();
        const tick = () => {
          const now = performance.now();
          const o = readLogo();
          if (o > 0.9) {
            visibleSince ??= now;
            longest = Math.max(longest, now - visibleSince);
          } else {
            visibleSince = null;
          }
          const state = document.documentElement.getAttribute("data-opening");
          if (state === "done" || state === "skipped" || now - t0 > 9000) resolve(longest);
          else requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
  );
  expect(heldMs, "the readable logo must hold ≥800ms, not flash").toBeGreaterThanOrEqual(800);

  // the sequence completes and the hero becomes visible + interactive
  await expect.poll(async () => openingState(page), { timeout: 8000 }).toBe("done");
  await expect(page.locator(".hero-headline")).toBeVisible();
  const unlocked = await page.evaluate(() => document.body.style.overflow === "");
  expect(unlocked, "scroll must unlock after the opening").toBe(true);
  await expect(page.locator(".hero-content a").first()).toBeVisible();
});

test("a second full reload replays the opening", async ({ page }) => {
  await page.goto("/en", { waitUntil: "domcontentloaded" });
  await expect.poll(async () => openingState(page), { timeout: 8000 }).toBe("done");
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect
    .poll(async () => openingState(page), { timeout: 3000 })
    .toMatch(/pending|running/);
  const stage = await stageGeometry(page);
  expect(stage?.position).toBe("fixed");
});

test("a mid-page refresh still SHOWS the opening (scroll restoration neutralized)", async ({ page }) => {
  await page.goto("/en", { waitUntil: "domcontentloaded" });
  await expect.poll(async () => openingState(page), { timeout: 8000 }).toBe("done");
  await page.evaluate(() => window.scrollTo(0, 2400));
  await page.waitForTimeout(300);
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect
    .poll(async () => openingState(page), { timeout: 3000 })
    .toMatch(/pending|running/);
  await page.waitForTimeout(400);
  const scrollY = await page.evaluate(() => window.scrollY);
  expect(scrollY, "the stage must start at the top of the document").toBeLessThan(4);
  const stage = await stageGeometry(page);
  expect(stage?.position).toBe("fixed");
  expect(stage!.top).toBeLessThanOrEqual(1);
});
