import { expect, test, type Page } from "@playwright/test";

/**
 * D-065 · D-067 — the 3D cover carousel, now the gallery section of the HOMEPAGE
 * (/#gallery); the standalone /gallery route was removed at D-067.
 *
 * The published set is three items (two videos, one image), so the ring
 * shows centre ±1 and hides the rest (owner decision: never the same
 * item twice on screen). The test browser (open-source Chromium) has no
 * H.264 decoder, so for the "centre video is playing" checks the video
 * requests are answered with a tiny VP9 clip recorded IN THE BROWSER at
 * test time from a canvas — a test-only stand-in that never touches the
 * repository's media (the real files stay H.264 for the site).
 */
const centre = (page: Page) => page.locator('.gcar-card[data-pos="0"]');

/**
 * D-067: the carousel lives on the HOMEPAGE. A full load plays the brand
 * opening (scroll held), then HashArrival delivers #gallery and focuses the
 * section (arriveAt). Wait for both to settle before touching the ring, or
 * the arrival steals focus from the centre card mid-test.
 */
async function gotoGallery(page: Page, loc: "en" | "ar") {
  await page.goto(`/${loc}/#gallery`, { waitUntil: "networkidle" });
  // the opening reports done/skipped; under reduced motion it may never mount, so the
  // released scroll lock (body overflow back to "") is the authoritative signal
  await page.waitForFunction(() => {
    const state = document.documentElement.getAttribute("data-opening");
    return state === "done" || state === "skipped" || (state === null && document.body.style.overflow === "");
  }, null, { timeout: 10000 });
  await page.waitForTimeout(1400); // arriveAt's one-shot choreography (1200 ms) + smooth scroll
  await page.locator("#gallery").scrollIntoViewIfNeeded();
}
const centreId = (page: Page) => centre(page).evaluate((el) => (el.querySelector("video, img") as HTMLMediaElement | HTMLImageElement).getAttribute("src"));

async function makeTestClip(page: Page): Promise<Buffer> {
  const base64 = await page.evaluate(async () => {
    const c = document.createElement("canvas"); c.width = 64; c.height = 64;
    const ctx = c.getContext("2d")!;
    const stream = c.captureStream(15);
    const rec = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });
    const chunks: Blob[] = [];
    rec.ondataavailable = (e) => chunks.push(e.data);
    const done = new Promise<void>((r) => { rec.onstop = () => r(); });
    rec.start();
    for (let i = 0; i < 12; i++) { ctx.fillStyle = i % 2 ? "#333" : "#ccc"; ctx.fillRect(0, 0, 64, 64); await new Promise((r) => setTimeout(r, 70)); }
    rec.stop(); await done;
    const buf = await new Blob(chunks, { type: "video/webm" }).arrayBuffer();
    return btoa(String.fromCharCode(...new Uint8Array(buf)));
  });
  return Buffer.from(base64, "base64");
}

async function serveDecodableVideos(page: Page) {
  await page.goto("about:blank");
  const clip = await makeTestClip(page);
  await page.route(/\/media\/gallery\/.*\.mp4$/, (route) => route.fulfill({ status: 200, contentType: "video/webm", body: clip }));
}

test("arrows rotate the ring and the loop returns to the first item", async ({ page }) => {
  await gotoGallery(page, "en");
  const first = await centreId(page);
  const n = await page.locator(".gcar-card").count();
  expect(n).toBe(3);
  await expect(page.locator('.gcar-card[data-pos="1"]')).toHaveCount(1);
  await expect(page.locator('.gcar-card[data-pos="-1"]')).toHaveCount(1);
  await expect(page.locator('.gcar-card[data-pos="hidden"]')).toHaveCount(0); // 3 items: ±1 covers the ring
  const next = page.getByRole("button", { name: "Next item" });
  await next.click();
  expect(await centreId(page)).not.toBe(first);
  await next.click();
  await next.click(); // third press: back to the first — the ring is a loop
  expect(await centreId(page)).toBe(first);
  await page.getByRole("button", { name: "Previous item" }).click();
  expect(await centreId(page)).not.toBe(first);
});

test("arrow keys step the ring; only the centre card is focusable", async ({ page }) => {
  await gotoGallery(page, "en");
  const first = await centreId(page);
  const open = centre(page).locator(".gcar-open");
  await expect(open).toHaveAttribute("tabindex", "0");
  await expect(page.locator('.gcar-card[data-pos="1"] .gcar-open')).toHaveAttribute("tabindex", "-1");
  await expect(page.locator('.gcar-card[data-pos="1"]')).toHaveAttribute("aria-hidden", "true");
  await open.focus();
  await page.keyboard.press("ArrowRight");
  const second = await centreId(page);
  expect(second).not.toBe(first);
  await page.keyboard.press("ArrowLeft");
  expect(await centreId(page)).toBe(first);
  await expect(page.locator('[role="region"][aria-roledescription="carousel"]')).toHaveAttribute("aria-label", "Gallery carousel");
});

test("the centre video plays muted; leaving the centre pauses and rewinds it", async ({ page }) => {
  await serveDecodableVideos(page);
  await gotoGallery(page, "en");
  // bring a video to the centre if the first item is the image
  for (let i = 0; i < 3; i++) {
    if ((await centre(page).getAttribute("data-kind")) === "video") break;
    await page.getByRole("button", { name: "Next item" }).click();
  }
  const video = centre(page).locator("video");
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused), { timeout: 8000 }).toBe(false);
  expect(await video.evaluate((v: HTMLVideoElement) => v.muted)).toBe(true);
  expect(await video.evaluate((v: HTMLVideoElement) => v.hasAttribute("controls"))).toBe(false);
  expect(await video.evaluate((v: HTMLVideoElement) => v.loop && v.playsInline && v.preload === "metadata" && !!v.poster)).toBe(true);
  const src = await video.evaluate((v: HTMLVideoElement) => v.getAttribute("src"));
  await page.getByRole("button", { name: "Next item" }).click();
  const parked = page.locator(`.gcar-card video[src="${src}"]`);
  await expect.poll(() => parked.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  expect(await parked.evaluate((v: HTMLVideoElement) => v.currentTime)).toBe(0);
  expect(await parked.evaluate((v: HTMLVideoElement) => v.muted)).toBe(true);
});

test("the speaker button unmutes in place without opening the lightbox; a step re-mutes", async ({ page }) => {
  await serveDecodableVideos(page);
  await gotoGallery(page, "en");
  for (let i = 0; i < 3; i++) {
    if ((await centre(page).getAttribute("data-kind")) === "video") break;
    await page.getByRole("button", { name: "Next item" }).click();
  }
  const video = centre(page).locator("video");
  const src = await video.evaluate((v: HTMLVideoElement) => v.getAttribute("src"));
  await page.getByRole("button", { name: "Unmute video" }).click();
  expect(await video.evaluate((v: HTMLVideoElement) => v.muted)).toBe(false);
  await expect(page.locator("dialog.gallery-lightbox")).not.toHaveAttribute("open", "");
  await expect(page.getByRole("button", { name: "Mute video" })).toBeVisible();
  await page.getByRole("button", { name: "Next item" }).click();
  expect(await page.locator(`.gcar-card video[src="${src}"]`).evaluate((v: HTMLVideoElement) => v.muted)).toBe(true);
});

test("clicking the centre card opens the existing lightbox with controls and sound", async ({ page }) => {
  await serveDecodableVideos(page);
  await gotoGallery(page, "en");
  for (let i = 0; i < 3; i++) {
    if ((await centre(page).getAttribute("data-kind")) === "video") break;
    await page.getByRole("button", { name: "Next item" }).click();
  }
  await centre(page).locator(".gcar-open").click();
  const dialog = page.locator("dialog.gallery-lightbox");
  await expect(dialog).toHaveAttribute("open", "");
  const lb = dialog.locator("video");
  expect(await lb.evaluate((v: HTMLVideoElement) => v.hasAttribute("controls"))).toBe(true);
  expect(await lb.evaluate((v: HTMLVideoElement) => v.muted)).toBe(false);
  await expect(dialog.locator(".rail-nav")).toHaveCount(2); // the lightbox arrows are untouched
  await page.keyboard.press("Escape");
  await expect(dialog).not.toHaveAttribute("open", "");
});

test("a video whose file fails to load still shows its poster, without breaking the page", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.route(/\/media\/gallery\/.*\.mp4$/, (route) => route.abort()); // test-only: the file "does not exist"
  await gotoGallery(page, "en");
  const videos = page.locator(".gcar-card video");
  expect(await videos.count()).toBeGreaterThan(0);
  for (const v of await videos.all()) {
    expect(await v.getAttribute("poster")).toMatch(/^\/media\/posters\/.+\.jpg$/);
  }
  await expect(page.locator('.gcar-card[data-pos="0"]')).toBeVisible();
  await page.getByRole("button", { name: "Next item" }).click();
  await expect(page.locator('.gcar-card[data-pos="0"]')).toBeVisible();
  expect(errors).toEqual([]);
});

test("RTL mirrors the ring: logical +1 sits on the LEFT of the centre, and the arrows flip", async ({ page }) => {
  await gotoGallery(page, "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  const box = async (sel: string) => page.locator(sel).evaluate((el) => { const r = el.getBoundingClientRect(); return r.left + r.width / 2; });
  const c = await box('.gcar-card[data-pos="0"]');
  expect(await box('.gcar-card[data-pos="1"]')).toBeLessThan(c);
  expect(await box('.gcar-card[data-pos="-1"]')).toBeGreaterThan(c);
  await expect(page.locator('[role="region"][aria-roledescription="carousel"]')).toHaveAttribute("aria-label", "دوّار المعرض");
  // the chevrons are mirrored by CSS in RTL
  expect(await page.locator(".gcar-btn svg").first().evaluate((el) => getComputedStyle(el).transform)).toMatch(/matrix\(-1,/);
  // in RTL "ArrowLeft" advances (reading direction)
  const first = await centreId(page);
  await centre(page).locator(".gcar-open").focus();
  await page.keyboard.press("ArrowLeft");
  expect(await centreId(page)).not.toBe(first);
});

test("LTR: logical +1 sits on the RIGHT, tilted with its top toward the centre", async ({ page }) => {
  await gotoGallery(page, "en");
  const box = async (sel: string) => page.locator(sel).evaluate((el) => { const r = el.getBoundingClientRect(); return r.left + r.width / 2; });
  const c = await box('.gcar-card[data-pos="0"]');
  expect(await box('.gcar-card[data-pos="1"]')).toBeGreaterThan(c);
  // rotation sign read from the computed matrix: b < 0 → counter-clockwise → the RIGHT card's top leans left, toward the centre
  const m = await page.locator('.gcar-card[data-pos="1"]').evaluate((el) => getComputedStyle(el).transform.match(/matrix\(([^)]+)\)/)![1]!.split(",").map(Number));
  expect(m[1]!).toBeLessThan(0);
  const ml = await page.locator('.gcar-card[data-pos="-1"]').evaluate((el) => getComputedStyle(el).transform.match(/matrix\(([^)]+)\)/)![1]!.split(",").map(Number));
  expect(ml[1]!).toBeGreaterThan(0);
});

test("reduced motion: no rotation in the computed transform, opacity-only transition", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await gotoGallery(page, "en");
  for (const pos of ["1", "-1"]) {
    const m = await page.locator(`.gcar-card[data-pos="${pos}"]`).evaluate((el) => getComputedStyle(el).transform.match(/matrix\(([^)]+)\)/)![1]!.split(",").map(Number));
    expect(Math.abs(m[1]!)).toBeLessThan(1e-6); // b === 0 → no rotate
    expect(Math.abs(m[2]!)).toBeLessThan(1e-6); // c === 0
  }
  const tr = await page.locator('.gcar-card[data-pos="0"]').evaluate((el) => getComputedStyle(el).transitionProperty);
  expect(tr).toBe("opacity");
  await ctx.close();
});

test("the homepage gallery section renders the carousel with no console errors in both locales", async ({ page }) => {
  for (const loc of ["en", "ar"]) {
    const errors: string[] = [];
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    await gotoGallery(page, loc as "en" | "ar");
    await expect(page.locator(".gcar")).toHaveCount(1);
    await expect(page.locator(".gallery-masonry, .gallery-tile")).toHaveCount(0); // the masonry preview is gone (D-067)
    await page.getByRole("button", { name: loc === "en" ? "Next item" : "العنصر التالي" }).click();
    await page.waitForTimeout(700);
    expect(errors).toEqual([]);
  }
});

test("the header's Gallery link reaches #gallery from the homepage and from an inner page", async ({ page }) => {
  for (const start of ["/en", "/en/company"]) {
    await page.goto(start, { waitUntil: "networkidle" });
    // Gallery folds into the deliberate "More" menu below 2xl (the test viewports are narrower)
    const more = page.getByRole("button", { name: "More" });
    if (await more.isVisible()) await more.click();
    await page.getByRole("link", { name: "Gallery", exact: true }).first().click();
    await expect(page).toHaveURL(/\/en\/?#gallery$/);
    const inView = await page.locator("#gallery").evaluate(async (el) => {
      await new Promise((r) => setTimeout(r, 900)); // smooth scroll
      const r = el.getBoundingClientRect();
      return r.top < innerHeight && r.bottom > 0;
    });
    expect(inView, `from ${start}`).toBe(true);
    await expect(page.locator("#gallery .gcar")).toHaveCount(1);
  }
});

test("/gallery is gone: 404 in both locales, no redirect", async ({ request }) => {
  for (const loc of ["en", "ar"]) {
    const res = await request.get(`/${loc}/gallery`, { maxRedirects: 0 });
    expect(res.status(), loc).toBe(404);
  }
});
