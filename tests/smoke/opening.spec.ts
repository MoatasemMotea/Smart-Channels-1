import { expect, test, type Page } from "@playwright/test";

/**
 * D-097 — the dots-logo opening (restored from 690d876 after D-085/D-086
 * replaced it with a video intro, since itself removed).
 *
 * The opening plays ONCE PER BROWSER SESSION on the homepage, on an
 * animating tier, with no #hash in the URL. Any meaningful input
 * (click/wheel/touch/key) skips it immediately. prefers-reduced-motion
 * and Save-Data both resolve the motion tier to STATIC, which never
 * mounts the opening at all. Computed visibility is asserted (stage
 * geometry, stacking, logo opacity over time) — never DOM presence
 * alone, per the P5 hotfix lesson this file inherits.
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

/** True only while the stage is actually FIXED above the page (pending/
 *  running/revealing) — .opening-host always exists in the DOM once
 *  mounted (it doubles as the ambient hero field), so presence alone
 *  never proves the viewport is covered. */
function stageCoversViewport(stage: Awaited<ReturnType<typeof stageGeometry>>): boolean {
  return stage !== null && stage.position === "fixed" && stage.z >= 59;
}

test("fresh session: the opening owns the viewport, the logo is readable, then the hero reveals", async ({
  page,
}) => {
  await page.goto("/en", { waitUntil: "domcontentloaded" });

  // the sequence is armed pre-paint and the stage covers the viewport
  await expect.poll(async () => openingState(page), { timeout: 3000 }).toMatch(/pending|running/);
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

  // the REAL logo becomes computed-visible and HOLDS ≥ 800ms. Measured
  // in-page at fixed rAF cadence from the start of the sequence — an
  // expect.poll's growing intervals can detect readability late and
  // then under-measure the hold.
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

  // D-097: the session is recorded the moment it finishes
  expect(await page.evaluate(() => sessionStorage.getItem("sc-opening"))).toBe("1");
});

test("a reload within the same session does not replay the opening", async ({ page }) => {
  await page.goto("/en", { waitUntil: "domcontentloaded" });
  await expect.poll(async () => openingState(page), { timeout: 8000 }).toBe("done");
  await page.reload({ waitUntil: "domcontentloaded" });
  // never pending/running again — resolves straight to "skipped"
  expect(await openingState(page)).toBe("skipped");
  await expect(page.locator(".hero-headline")).toBeVisible();
  const stage = await stageGeometry(page);
  expect(stageCoversViewport(stage), "no fixed stage should cover the viewport on a seen-session load").toBe(
    false,
  );
});

for (const [name, skip] of [
  ["a click", (page: Page) => page.mouse.click(10, 10)],
  ["a key press", (page: Page) => page.keyboard.press("Escape")],
  // page.mouse.wheel() routes through CDP mouse input, which the mobile
  // (touch-emulated) project doesn't reliably turn into a DOM "wheel"
  // event — dispatch the event the engine actually listens for directly.
  ["wheel", (page: Page) => page.evaluate(() => window.dispatchEvent(new WheelEvent("wheel", { deltaY: 40 })))],
] as const) {
  test(`${name} skips the opening immediately — never traps the viewport`, async ({ page }) => {
    await page.goto("/en", { waitUntil: "domcontentloaded" });
    // "running" specifically — the engine's own skip listeners attach
    // only once it mounts; catching the pre-hydration "pending" state
    // would dispatch the input before anything is there to hear it
    await expect.poll(async () => openingState(page), { timeout: 3000 }).toBe("running");
    await skip(page);
    await expect.poll(async () => openingState(page), { timeout: 2000 }).toBe("done");
    const stage = await stageGeometry(page);
    expect(stageCoversViewport(stage), "the stage must release the viewport once skipped").toBe(false);
    const unlocked = await page.evaluate(() => document.body.style.overflow === "");
    expect(unlocked).toBe(true);
  });
}

for (const loc of ["ar", "en"] as const) {
  test(`${loc}: reduced motion — no opening, hero is final from the first paint`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${loc}`, { waitUntil: "networkidle" });
    expect(await page.evaluate(() => document.documentElement.getAttribute("data-motion-tier"))).toBe("static");
    expect(await openingState(page)).toBeNull();
    await expect(page.locator(".opening-host")).toHaveCount(0);
    await expect(page.locator(".hero-headline")).toBeVisible();
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });
}

test("Save-Data — no opening, STATIC tier", async ({ page }) => {
  await page.route("**/*", (route) => route.continue());
  await page.addInitScript(() => {
    Object.defineProperty(window.navigator, "connection", {
      value: { saveData: true },
      configurable: true,
    });
  });
  await page.goto("/en", { waitUntil: "domcontentloaded" });
  expect(await page.evaluate(() => document.documentElement.getAttribute("data-motion-tier"))).toBe("static");
  expect(await openingState(page)).toBeNull();
});

for (const route of ["/ar/products", "/en/company", "/ar/partners"]) {
  test(`no opening on ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    expect(await openingState(page)).toBeNull();
    await expect(page.locator(".opening-host")).toHaveCount(0);
  });
}

for (const loc of ["ar", "en"] as const) {
  test(`${loc}: a #hash link skips the opening and lands on its section`, async ({ page }) => {
    await page.goto(`/${loc}/#contact`, { waitUntil: "domcontentloaded" });
    expect(await openingState(page)).toBe("skipped");
    await expect(page.locator("#contact")).toBeInViewport({ timeout: 10_000 });
    expect(stageCoversViewport(await stageGeometry(page)), "a hash arrival must never show the stage").toBe(
      false,
    );
    expect(await page.evaluate(() => sessionStorage.getItem("sc-opening"))).toBe("1");
    // later in the same session the homepage opens without it
    await page.goto(`/${loc}`);
    expect(await openingState(page)).toBe("skipped");
  });
}

test("a mid-sequence refresh still SHOWS the opening at the top (scroll restoration neutralized)", async ({
  page,
}) => {
  await page.goto("/en", { waitUntil: "domcontentloaded" });
  await expect.poll(async () => openingState(page), { timeout: 3000 }).toMatch(/pending|running/);
  // the sequence hasn't finished yet (session not marked seen) — a
  // refresh here must still show it, starting at the top
  await page.evaluate(() => window.scrollTo(0, 2400));
  await page.waitForTimeout(200);
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect.poll(async () => openingState(page), { timeout: 3000 }).toMatch(/pending|running/);
  await page.waitForTimeout(300);
  const scrollY = await page.evaluate(() => window.scrollY);
  expect(scrollY, "the stage must start at the top of the document").toBeLessThan(4);
  const stage = await stageGeometry(page);
  expect(stage?.position).toBe("fixed");
  expect(stage!.top).toBeLessThanOrEqual(1);
});
