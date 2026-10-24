import { expect, test, type Page } from "@playwright/test";

/**
 * D-086 — videos download only while on screen.
 *
 * Every decorative video (homepage Solutions stage, the solution page's
 * cinematic moment, project heroes, About) is a LazyVideo: poster and
 * preload="none" until it enters the viewport, released (src removed,
 * buffer freed) when it leaves; one Solutions video at a time. The only
 * preload="auto" on the site is the D-085 intro.
 */
function videoRequests(page: Page, part: string) {
  const urls: string[] = [];
  page.on("request", (r) => {
    if (r.url().includes(part) && /\.(mp4|webm)$/.test(new URL(r.url()).pathname)) urls.push(new URL(r.url()).pathname);
  });
  return urls;
}
const scrollTo = (page: Page, sel: string) =>
  page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ behavior: "instant", block: "center" }), sel);
const stageSrc = (page: Page) =>
  page.evaluate(() => document.querySelector(".ss-stage video")?.getAttribute("src") ?? null);

test("homepage Solutions: nothing before the stage is on screen; released when it leaves; one video at a time", async ({ page }) => {
  const urls = videoRequests(page, "/media/solutions/");
  await page.goto("/en", { waitUntil: "networkidle" });
  await page.keyboard.press("Escape");
  expect(urls).toEqual([]);
  expect(await page.locator(".ss-stage video").getAttribute("preload")).toBe("none");
  expect(await stageSrc(page)).toBeNull();

  await scrollTo(page, ".ss-stage");
  await expect.poll(() => stageSrc(page)).toBe("/media/solutions/01-infrastructure-data-centre-web.mp4");
  await expect(page.locator(".ss-stage video[src]")).toHaveCount(1);

  // switching keeps exactly one video with a source
  await page.locator(".ss-item-btn").nth(3).click();
  await expect.poll(() => stageSrc(page)).toBe("/media/solutions/04-biometrics-access-control-web.mp4");
  await page.waitForTimeout(900); // the outgoing layer has gone
  await expect(page.locator(".ss-stage video[src]")).toHaveCount(1);

  // off screen: paused, source removed, poster back
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect.poll(() => stageSrc(page)).toBeNull();
  expect(await page.locator(".ss-stage video").evaluate((v: HTMLVideoElement) => v.paused && v.readyState === 0)).toBe(true);
});

test("solution page: the cinematic moment downloads only once on screen and is released after", async ({ page }) => {
  const urls = videoRequests(page, "/media/solutions/");
  await page.goto("/en/solutions/networking-connectivity", { waitUntil: "networkidle" });
  const moment = page.locator(".solution-moment video");
  await expect(moment).toHaveAttribute("preload", "none");
  const inView = await moment.evaluate((v) => v.getBoundingClientRect().top < innerHeight);
  if (!inView) {
    expect(urls).toEqual([]);
    expect(await moment.getAttribute("src")).toBeNull();
  }
  await scrollTo(page, ".solution-moment");
  await expect(moment).toHaveAttribute("src", "/media/solutions/02-networking-connectivity-web.mp4");
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
  await expect(moment).not.toHaveAttribute("src");
});

for (const route of ["/en", "/ar", "/en/solutions/networking-connectivity", "/en/projects"]) {
  test(`no preload="auto" on ${route} (the intro is the only exception)`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    expect(await page.locator('video[preload="auto"]:not(.intro-video)').count()).toBe(0);
  });
}
