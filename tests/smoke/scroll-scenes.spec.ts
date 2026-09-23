import { expect, test, type Page } from "@playwright/test";

/**
 * D-079 — scroll-linked cinematics. Two scene stacks on the homepage
 * (About rises over the stuck Hero; Selected Projects rises over the
 * stuck Industries) and the reversible MotionSection progress everywhere.
 * Every value is a function of the scroll position: going down and
 * coming back to the same position must give the same numbers.
 */
type Vars = { cover: number; enter: number; t: number };

async function gotoHome(page: Page, path = "/en/") {
  await page.goto(path, { waitUntil: "networkidle" });
  await page.waitForFunction(() => {
    const s = document.documentElement.getAttribute("data-opening");
    return s === "done" || s === "skipped" || (s === null && document.body.style.overflow === "");
  }, null, { timeout: 20000 });
  await page.waitForTimeout(200);
}

/** STATIC document top (sticky scenes measured as if not stuck — same method as the engine) */
const staticTop = (page: Page, sel: string) =>
  page.evaluate((sel) => {
    const html = document.documentElement;
    html.classList.add("sc-measure");
    let y = 0;
    let n = document.querySelector<HTMLElement>(sel);
    while (n) {
      y += n.offsetTop;
      n = n.offsetParent as HTMLElement | null;
    }
    html.classList.remove("sc-measure");
    return y;
  }, sel);

async function scrollToY(page: Page, y: number) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
  await page.waitForTimeout(150); // one engine frame + settle
}

const readVars = (page: Page, stick: string, cover: string, reveal: string) =>
  page.evaluate(
    ([stick, cover, reveal]) => {
      const num = (sel: string, k: string) => Number(document.querySelector<HTMLElement>(sel)!.style.getPropertyValue(k) || "NaN");
      return { cover: num(stick, "--cover"), enter: num(cover, "--enter"), t: num(reveal, "--t") };
    },
    [stick, cover, reveal] as const,
  ) as Promise<Vars>;

test.describe("desktop stacks (FULL tier)", () => {
  test.beforeEach(async ({}, info) => test.skip(info.project.name !== "desktop"));

  for (const [name, stick, cover, reveal] of [
    ["hero → about", '[data-scene="hero"]', "#about", "#solutions"],
    ["industries → projects", "#industries", "#projects", "#gallery"],
  ] as const) {
    test(`reversible: ${name} mid-transition values are identical after going down and coming back (±0.01)`, async ({ page }) => {
      await gotoHome(page);
      const vh = await page.evaluate(() => innerHeight);
      const mid = (await staticTop(page, cover)) - vh / 2;
      await scrollToY(page, mid - 600);
      await scrollToY(page, mid);
      const down = await readVars(page, stick, cover, reveal);
      expect(down.cover).toBeGreaterThan(0.3);
      expect(down.cover).toBeLessThan(0.7);
      await scrollToY(page, mid + 2500);
      await scrollToY(page, mid);
      const up = await readVars(page, stick, cover, reveal);
      expect(Math.abs(up.cover - down.cover)).toBeLessThanOrEqual(0.01);
      expect(Math.abs(up.enter - down.enter)).toBeLessThanOrEqual(0.01);
      expect(Math.abs(up.t - down.t)).toBeLessThanOrEqual(0.01);
    });
  }

  for (const [w, h] of [[1440, 900], [1366, 768], [1920, 1080]] as const) {
    test(`${w}×${h}: each stuck scene is read in full before it is covered — no pixel clipped`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      await gotoHome(page);
      await page.evaluate(() => window.dispatchEvent(new Event("resize")));
      await page.waitForTimeout(200);
      for (const [stick, cover] of [['[data-scene="hero"]', "#about"], ["#industries", "#projects"]] as const) {
        const top = await staticTop(page, stick);
        const coverTop = await staticTop(page, cover);
        // 1) at its own top the scene starts at the top of the viewport, uncovered
        await scrollToY(page, top);
        const a = await page.evaluate((s) => {
          const el = document.querySelector<HTMLElement>(s)!;
          const cs = getComputedStyle(el);
          const box = el.getBoundingClientRect();
          // the cover clip is inset(0 …): it can only cut what overflows the section box —
          // measure the largest overflow of any visible descendant
          // (a section that already clips to its own box — the hero's cover-cropped
          // photograph, overflow: hidden since D-041 — loses nothing more to it)
          let overflow = 0;
          if (cs.overflowY === "visible") for (const d of el.querySelectorAll<HTMLElement>("*")) {
            const r = d.getBoundingClientRect();
            if (r.width === 0 || r.height === 0 || getComputedStyle(d).visibility === "hidden") continue;
            overflow = Math.max(overflow, box.top - r.top, r.bottom - box.bottom);
          }
          return { top: box.top, cover: el.style.getPropertyValue("--cover"), overflowY: cs.overflowY, clip: cs.clipPath, h: el.offsetHeight, overflow };
        }, stick);
        expect(Math.abs(a.top), `${stick} top at its static top`).toBeLessThanOrEqual(1);
        expect(a.overflow, `${stick}: no descendant outside the box the clip follows`).toBeLessThanOrEqual(1);
        if (a.h >= h) {
          expect(Number(a.cover)).toBe(0);
          expect(a.clip).toBe("none");
        } else {
          // a scene SHORTER than the viewport (Industries at 1920×1080) sits whole on
          // screen at its top while the riser has just begun below it: nothing is clipped
          expect(Number(a.cover), `${stick} barely begun`).toBeLessThan(0.05);
        }
        // 2) the instant covering starts, its bottom edge sits on the viewport bottom — fully read
        await scrollToY(page, coverTop - h);
        const b = await page.evaluate((s) => {
          const el = document.querySelector<HTMLElement>(s)!;
          return { bottom: el.getBoundingClientRect().bottom, cover: Number(el.style.getPropertyValue("--cover")), pos: getComputedStyle(el).position };
        }, stick);
        expect(b.pos).toBe("sticky");
        expect(b.cover, `${stick} not covered yet`).toBe(0);
        if (a.h >= h) expect(Math.abs(b.bottom - h), `${stick} bottom on the viewport bottom (h=${a.h})`).toBeLessThanOrEqual(1);
        else expect(b.bottom, `${stick} wholly on screen (h=${a.h})`).toBeLessThanOrEqual(h + 1);
      }
    });
  }

  test("header environment follows the VISIBLE scene; the nav probe skips a covered section", async ({ page }) => {
    await gotoHome(page);
    const vh = await page.evaluate(() => innerHeight);
    const env = () => page.evaluate(() => document.documentElement.getAttribute("data-header-env"));
    const aboutTop = await staticTop(page, "#about");
    // hero → about: covered below/above the half-way mark
    await scrollToY(page, aboutTop - vh * 0.65); // cover ≈ 0.12
    expect(await env()).toBe("dark");
    await scrollToY(page, aboutTop - vh / 2); // cover = 0.5 → covered
    expect(await page.locator('[data-scene="hero"]').getAttribute("data-covered")).toBe("");
    expect(await env()).toBe("surface");
    await scrollToY(page, aboutTop - vh * 0.65); // and back
    expect(await env()).toBe("dark");
    // industries → projects: mid-transition — Industries is covered, so no anchor is active for it
    const projTop = await staticTop(page, "#projects");
    await scrollToY(page, projTop - vh * 0.35);
    await expect(page.locator("#industries")).toHaveAttribute("data-covered", "");
    expect(await env()).toBe("surface");
    await expect(page.locator('.site-header a[href$="/#industries"][aria-current="true"]')).toHaveCount(0);
    await scrollToY(page, projTop - vh * 1.2);
    await expect(page.locator("#industries")).not.toHaveAttribute("data-covered", "");
  });

  test("industries autoplay stops while Selected Projects covers it (cover > 0.5) and resumes on the way back", async ({ page }) => {
    await gotoHome(page);
    const vh = await page.evaluate(() => innerHeight);
    const slider = page.locator("[data-autoplay]");
    await scrollToY(page, await staticTop(page, "#industries"));
    await expect(slider).toHaveAttribute("data-autoplay", "running");
    const projTop = await staticTop(page, "#projects");
    await scrollToY(page, projTop - vh * 0.3); // cover ≈ 0.8
    await expect(slider).toHaveAttribute("data-autoplay", "paused");
    await scrollToY(page, projTop - vh * 0.7); // cover ≈ 0.1
    await expect(slider).toHaveAttribute("data-autoplay", "running");
  });

  test("after a section is fully revealed its computed transform is literally none (D075-RESIDUAL-TRANSFORM)", async ({ page }) => {
    await gotoHome(page);
    const ids = await page.locator("main .reveal").evaluateAll((els) => els.map((e) => e.getAttribute("data-scene") ?? e.id));
    expect(ids).toEqual(["about", "solutions", "industries", "projects", "gallery", "partners", "clients", "cta"]);
    for (const key of ids) {
      const sel = `main .reveal[data-scene="${key}"], main .reveal#${key}`;
      await scrollToY(page, await staticTop(page, sel));
      const s = await page.locator(sel).first().evaluate((e) => ({ rs: e.getAttribute("data-rs"), tf: getComputedStyle(e).transform, filter: getComputedStyle(e).filter }));
      expect(s.rs, key).toBe("1");
      expect(s.tf, key).toBe("none");
      expect(s.filter, key).toBe("none");
    }
    // the converge section specifically — scale(.988) must not survive
    await scrollToY(page, (await staticTop(page, "#projects")) + 400);
    expect(await page.locator("#projects").evaluate((e) => getComputedStyle(e).transform)).toBe("none");
  });

  test("keyboard focus inside a covered scene brings it back: the focused tab is never behind the riser", async ({ page }) => {
    await gotoHome(page);
    const vh = await page.evaluate(() => innerHeight);
    const projTop = await staticTop(page, "#projects");
    await scrollToY(page, projTop - vh * 0.4); // Industries covered (≈ 0.65)
    await page.locator('.industries-slider-tab[data-tab="2"]').focus();
    await page.waitForTimeout(300);
    const s = await page.evaluate(() => {
      const tab = document.querySelector<HTMLElement>('.industries-slider-tab[data-tab="2"]')!;
      const r = tab.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return { cover: Number(document.querySelector<HTMLElement>("#industries")!.style.getPropertyValue("--cover")), onTop: tab.contains(hit), inView: r.bottom <= innerHeight + 1 && r.top >= 0 };
    });
    expect(s.cover).toBe(0);
    expect(s.inView).toBe(true);
    expect(s.onTop, "the focused tab is the topmost element at its centre").toBe(true);
  });

  test("the side index: ten dots, aria-hidden, one active bar that follows the scroll", async ({ page }) => {
    await gotoHome(page);
    const index = page.locator(".scene-index");
    await expect(index).toHaveAttribute("aria-hidden", "true");
    await expect(index.locator("span")).toHaveCount(10);
    await expect(index.locator("span[data-on]")).toHaveCount(1);
    await expect(index.locator("span[data-on]")).toHaveAttribute("data-for", "hero");
    await scrollToY(page, await staticTop(page, "#gallery"));
    await expect(index.locator("span[data-on]")).toHaveAttribute("data-for", "gallery");
    expect(await index.evaluate((e) => getComputedStyle(e).display)).toBe("flex");
  });
});

for (const id of ["industries", "projects", "gallery"] as const) {
  test(`anchor /#${id} arrives with the section fully revealed, not mid-transition`, async ({ page }, info) => {
    test.skip(info.project.name !== "desktop");
    await gotoHome(page, `/en/#${id}`);
    await page.waitForFunction((id) => {
      const r = document.getElementById(id)!.getBoundingClientRect();
      return Math.abs(r.top) < 2;
    }, id, { timeout: 8000 });
    await page.waitForTimeout(300);
    const s = await page.locator(`#${id}`).evaluate((e) => ({
      top: e.getBoundingClientRect().top,
      rs: e.getAttribute("data-rs"),
      enter: e.style.getPropertyValue("--enter"),
      cover: e.style.getPropertyValue("--cover"),
    }));
    expect(Math.abs(s.top)).toBeLessThan(2);
    expect(s.rs).toBe("1");
    if (id === "projects") expect(s.enter).toBe("1");
    if (id === "industries") expect(Number(s.cover)).toBeLessThan(0.05);
  });
}

test("LITE (phone): no sticky scene, no stack, the reveal still reverses", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile");
  await gotoHome(page);
  expect(await page.evaluate(() => document.documentElement.getAttribute("data-motion-tier"))).toBe("lite");
  const sticky = await page.locator("main *").evaluateAll((els) => els.filter((e) => getComputedStyle(e).position === "sticky").length);
  expect(sticky).toBe(0);
  await expect(page.locator(".scene-stack[data-stack-on]")).toHaveCount(0);
  await expect(page.locator(".scene-index")).toBeHidden();
  const top = await staticTop(page, "#gallery");
  const vh = await page.evaluate(() => innerHeight);
  await scrollToY(page, top - vh * 0.7);
  const t1 = await page.locator("#gallery").evaluate((e) => Number(e.style.getPropertyValue("--t")));
  expect(t1).toBeGreaterThan(0);
  expect(t1).toBeLessThan(1);
  await scrollToY(page, top + 800);
  await scrollToY(page, top - vh * 0.7);
  const t2 = await page.locator("#gallery").evaluate((e) => Number(e.style.getPropertyValue("--t")));
  expect(Math.abs(t2 - t1)).toBeLessThanOrEqual(0.01);
});

test("STATIC (reduced motion): no motion variables, no reveal state, no stack, everything visible", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await gotoHome(page);
  expect(await page.evaluate(() => document.documentElement.getAttribute("data-motion-tier"))).toBe("static");
  await scrollToY(page, 3000);
  const leaks = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>("*")].filter(
      (e) => ["--t", "--cover", "--enter", "--stick-top"].some((k) => e.style.getPropertyValue(k) !== "") || e.hasAttribute("data-rs"),
    ).length,
  );
  expect(leaks).toBe(0);
  await expect(page.locator(".reveal")).toHaveCount(0);
  await expect(page.locator(".scene-stack[data-stack-on]")).toHaveCount(0);
  await expect(page.locator(".scene-index")).toBeHidden();
  const sticky = await page.locator("main *").evaluateAll((els) => els.filter((e) => getComputedStyle(e).position === "sticky").length);
  expect(sticky).toBe(0);
});
