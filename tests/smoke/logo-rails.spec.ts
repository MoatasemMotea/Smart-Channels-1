import { expect, test, type Page } from "@playwright/test";

/**
 * D-078 — the two logo rails: 23 client marks and 41 alliance marks
 * (jeddah-season has no logo and is skipped, not drawn empty); every
 * mark decodes; at rest every mark is ONE colour (white on dark, dark on
 * light) through a computed `filter`, the original colours return on
 * hover, and the three `originalColor` exceptions are never filtered;
 * all 64 render at one ink height (std dev < 15 % of the mean) with wide
 * marks capped at 180 px.
 */
const cells = (page: Page, rail: "clients" | "partners") => page.locator(`#${rail} .rail-copy-a .rail-cell`);

async function gotoHome(page: Page, loc: "en" | "ar") {
  await page.goto(`/${loc}/`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => {
    const s = document.documentElement.getAttribute("data-opening");
    return s === "done" || s === "skipped" || (s === null && document.body.style.overflow === "");
  }, null, { timeout: 15000 });
}

/** force every rail image (lazy, mostly off-screen) to load and decode */
async function decodeAll(page: Page) {
  await page.evaluate(async () => {
    const imgs = [...document.querySelectorAll<HTMLImageElement>(".rail-copy-a .rail-plate img")];
    for (const img of imgs) img.loading = "eager";
    await Promise.all(imgs.map((img) => img.decode().catch(() => undefined)));
  });
}

async function scrollTo(page: Page, id: string) {
  await page.evaluate((sel) => document.querySelector(sel)!.scrollIntoView({ block: "center" }), `#${id}`);
  await page.waitForTimeout(400);
}

for (const loc of ["en", "ar"] as const) {
  test(`${loc}: 23 client marks + 41 alliance marks, jeddah-season skipped, every mark decodes`, async ({ page }) => {
    await gotoHome(page, loc);
    await expect(cells(page, "clients")).toHaveCount(23);
    await expect(cells(page, "partners")).toHaveCount(41);
    await expect(page.locator('.rail-cell[data-id="jeddah-season"]')).toHaveCount(0);
    await expect(page.locator('#clients .rail-copy-a .rail-cell[data-id="riyadh-season"] img')).toHaveCount(1);
    await expect(page.locator('#clients .rail-copy-a .rail-cell[data-id="diriyah-season"] img')).toHaveCount(1);
    for (const id of ["buildup", "black-orange", "time", "balich-wonder-studio", "pfl-mena", "hqws"]) {
      await expect(page.locator(`.rail-cell[data-id="${id}"]`)).toHaveCount(0);
    }
    await decodeAll(page);
    const bad = await page.locator(".rail-copy-a .rail-plate img").evaluateAll((els) =>
      (els as HTMLImageElement[]).filter((i) => !(i.naturalWidth > 0)).map((i) => i.src),
    );
    expect(bad, "every logo must decode (naturalWidth > 0)").toEqual([]);
  });
}

test("one colour at rest: white filter on dark, dark filter on light; exceptions and hover show the original", async ({ page }) => {
  await gotoHome(page, "en");
  await scrollTo(page, "partners");
  const filters = (rail: "clients" | "partners") =>
    cells(page, rail).evaluateAll((els) => els.map((e) => [e.getAttribute("data-id"), getComputedStyle(e.querySelector("img")!).filter]));
  const dark = [...(await filters("partners")), ...(await filters("clients"))];
  expect(dark).toHaveLength(64);
  const exceptions = ["lenovo", "hopscotch", "moments-international"];
  for (const [id, f] of dark) {
    if (exceptions.includes(id!)) expect(f, `${id} keeps its own colours`).toBe("none");
    else expect(f, `${id} at rest on dark`).toBe("brightness(0) invert(1)");
  }
  // light theme: the same marks turn dark, exceptions still untouched
  await page.evaluate(() => document.documentElement.setAttribute("data-theme", "light"));
  await page.waitForTimeout(400); // the 200 ms filter transition runs on a theme switch too
  const light = [...(await filters("partners")), ...(await filters("clients"))];
  for (const [id, f] of light) {
    if (exceptions.includes(id!)) expect(f).toBe("none");
    else expect(f, `${id} at rest on light`).toBe("brightness(0)");
  }
  await page.evaluate(() => document.documentElement.setAttribute("data-theme", "dark"));
  // hover: the original colours return on that mark only (200 ms transition).
  // The track is moving, so Playwright's own hover (which waits for a
  // stable box) cannot be used: park the pointer on the rail — that pauses
  // the flow — then move onto a cell that is fully inside the viewport.
  const vp = (await page.locator("#partners .rail-viewport").boundingBox())!;
  await page.mouse.move(vp.x + vp.width / 2, vp.y + vp.height / 2);
  await page.waitForTimeout(150);
  expect(await page.locator("#partners .rail-track").evaluate((e) => getComputedStyle(e).animationPlayState)).toBe("paused");
  const visible = await cells(page, "partners").evaluateAll((els, ex) =>
    els
      .map((e) => ({ id: e.getAttribute("data-id")!, r: e.getBoundingClientRect() }))
      .filter(({ id, r }) => !ex.includes(id) && r.left > 8 && r.right < innerWidth - 8 && r.width > 0)
      .map(({ id, r }) => ({ id, x: r.left + r.width / 2, y: r.top + r.height / 2})),
    exceptions,
  );
  expect(visible.length).toBeGreaterThan(1);
  const [target, other] = visible;
  await page.mouse.move(target!.x, target!.y);
  const hovered = page.locator(`#partners .rail-copy-a .rail-cell[data-id="${target!.id}"] img`);
  await expect(hovered).toHaveCSS("filter", "none");
  expect(await hovered.evaluate((e) => getComputedStyle(e).transitionDuration)).toBe("0.2s");
  await expect(page.locator(`#partners .rail-copy-a .rail-cell[data-id="${other!.id}"] img`)).toHaveCSS("filter", "brightness(0) invert(1)");
});

test("reduced motion: no transition on the mark colour", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await gotoHome(page, "en");
  await scrollTo(page, "partners");
  const prop = await page.locator('#partners .rail-copy-a .rail-cell[data-id="cisco"] img').evaluate((e) => getComputedStyle(e).transitionProperty);
  expect(prop).toBe("none");
});

test("one ink height for all 64 (std dev < 15 % of mean), wide marks capped at 180 px", async ({ page }, info) => {
  await gotoHome(page, "en");
  await decodeAll(page);
  await scrollTo(page, "partners");
  const rows = await page.locator(".rail-copy-a .rail-plate img").evaluateAll((els) =>
    (els as HTMLImageElement[]).map((img) => {
      const r = img.getBoundingClientRect();
      // the delivery files are trimmed to their ink box, so the drawn
      // (object-fit: contain) image IS the ink: its height is the smaller
      // of the box height and the width-limited height
      const inkH = Math.min(r.height, (r.width * img.naturalHeight) / img.naturalWidth);
      return { id: img.closest(".rail-cell")!.getAttribute("data-id"), boxW: r.width, boxH: r.height, inkH, ratio: img.naturalWidth / img.naturalHeight };
    }),
  );
  expect(rows).toHaveLength(64);
  const expectedH = info.project.name === "desktop" ? 1440 * 0.024 : 28; // clamp(28px, 2.4vw, 40px)
  for (const r of rows) {
    expect(r.boxH, `${r.id} box height`).toBeCloseTo(expectedH, 0);
    expect(r.boxW, `${r.id} width cap`).toBeLessThanOrEqual(180.5);
    if (r.ratio <= 4) expect(r.inkH, `${r.id} full height`).toBeCloseTo(expectedH, 0);
  }
  const mean = rows.reduce((s, r) => s + r.inkH, 0) / rows.length;
  const sd = Math.sqrt(rows.reduce((s, r) => s + (r.inkH - mean) ** 2, 0) / rows.length);
  await info.attach("ink-heights.json", { body: JSON.stringify({ mean, sd, rows }, null, 1), contentType: "application/json" });
  expect(sd / mean, `ink height spread: mean ${mean.toFixed(1)} sd ${sd.toFixed(1)}`).toBeLessThan(0.15);
});
