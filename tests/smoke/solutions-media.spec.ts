import { expect, test } from "@playwright/test";

/**
 * D-050 Solutions cinematic media integration — focused regression.
 * Locked MAPPING.md associations, delivery privacy, poster-first
 * playback lifecycle, manual interaction, detail-route media.
 */
const DELIVERY = [
  "/media/solutions/01-infrastructure-data-centre-web.mp4",
  "/media/solutions/02-networking-connectivity-web.mp4",
  "/media/solutions/03-security-technology-solutions-web.mp4",
  "/media/solutions/04-biometrics-access-control-web.mp4",
  "/media/solutions/05-audio-visual-solutions-web.mp4",
  "/media/solutions/06-unified-communications-smart-buildings-web.mp4",
  "/media/solutions/07-video-surveillance-ai-solutions-web.mp4",
];
const POSTERS = [
  "/media/solutions/posters/01-infrastructure-data-centre.jpg",
  "/media/solutions/posters/02-networking-connectivity.jpg",
  "/media/solutions/posters/03-security-technology-solutions.jpg",
  "/media/solutions/posters/04-biometrics-access-control.jpg",
  "/media/solutions/posters/05-audio-visual-solutions.jpg",
  "/media/solutions/posters/06-unified-communications-smart-buildings.jpg",
  "/media/solutions/posters/07-video-surveillance-ai-solutions.jpg",
];

test("all 7 delivery videos and 7 posters are publicly served", async ({ request }) => {
  for (const p of [...DELIVERY, ...POSTERS]) {
    const res = await request.head(p);
    expect(res.status(), p).toBe(200);
  }
});

test("the source archive is never publicly reachable", async ({ request }) => {
  const res = await request.get(
    "/media-source/video/solutions/01-infrastructure-data-centre-web.mp4",
    { maxRedirects: 0 },
  );
  expect([307, 308, 404]).toContain(res.status()); // locale redirect → 404 chrome
});

test("homepage loads no solution video eagerly; active-only near section", async ({ page }) => {
  const videoRequests: string[] = [];
  page.on("request", (r) => {
    if (r.url().includes("/media/solutions/") && r.url().endsWith(".mp4"))
      videoRequests.push(new URL(r.url()).pathname);
  });
  await page.goto("/en", { waitUntil: "networkidle" });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  // §7: nothing downloads while the section is far away
  expect(videoRequests).toEqual([]);
  await page.evaluate(() =>
    document.getElementById("solutions")?.scrollIntoView({ behavior: "instant", block: "center" }),
  );
  await page.waitForTimeout(1500);
  // only the ACTIVE Solution's video is requested — never all seven
  const distinct = [...new Set(videoRequests)];
  expect(distinct.length).toBeLessThanOrEqual(2);
  expect(distinct[0]).toBe(DELIVERY[0]);
  const mounted = await page.evaluate(
    () => document.querySelectorAll(".ss-stage video").length,
  );
  expect(mounted).toBeLessThanOrEqual(1);
});

test("manual selection activates mapped media; portrait keeps treatment", async ({ page }) => {
  await page.goto("/en", { waitUntil: "networkidle" });
  await page.keyboard.press("Escape");
  await page.evaluate(() =>
    document.getElementById("solutions")?.scrollIntoView({ behavior: "instant", block: "center" }),
  );
  await page.waitForTimeout(800);
  // activate 03 Security (portrait) — exact mapped file must load
  await page.locator(".ss-item-btn").nth(2).click();
  await page.waitForTimeout(1200);
  const src = await page.evaluate(
    () => document.querySelector<HTMLVideoElement>('.ss-layer[data-state="current"] video')?.getAttribute("src") ?? "",
  );
  expect(src).toBe(DELIVERY[2]);
  await expect(page.locator('.ss-layer[data-state="current"] .ss-portrait-frame')).toHaveCount(1);
  await expect(page.locator('.ss-layer[data-state="current"] .ss-depth')).toHaveCount(1);
  // portrait video keeps its native aspect (never stretched to 16:9)
  const box = await page
    .locator('.ss-layer[data-state="current"] .ss-portrait-frame')
    .boundingBox();
  expect(box && box.height / box.width).toBeGreaterThan(1.5);
});

test("detail route carries the mapped media moment", async ({ page }) => {
  await page.goto("/en/solutions/video-surveillance-ai", { waitUntil: "networkidle" });
  const moment = page.locator(".solution-moment");
  await expect(moment).toHaveCount(1);
  const src = await page.evaluate(
    () =>
      document.querySelector<HTMLVideoElement>(".solution-moment video")?.getAttribute("src") ??
      document.querySelector<HTMLImageElement>(".solution-moment img")?.getAttribute("src") ??
      "",
  );
  expect(src.includes("07-video-surveillance-ai")).toBe(true);
});
