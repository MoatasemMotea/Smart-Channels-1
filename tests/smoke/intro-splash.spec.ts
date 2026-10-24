import { expect, test, type Page } from "@playwright/test";

/**
 * D-085 — the video intro splash.
 *
 * The intro never shows to an automated browser (navigator.webdriver), so
 * the rest of the suite keeps the cinematic-opening path untouched; every
 * test here that needs the intro switches that flag off before any page
 * script runs. A log of every value html[data-opening] / html[data-intro]
 * takes proves the opening never runs alongside or after the intro.
 */
const COPY = {
  ar: { label: "مقدمة Smart Channels", skip: "تخطَّ المقدمة", on: "تشغيل الصوت", off: "كتم الصوت" },
  en: { label: "Smart Channels intro", skip: "Skip intro", on: "Turn sound on", off: "Mute sound" },
} as const;

async function asVisitor(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, "webdriver", { get: () => false, configurable: true });
  });
}

/** records every value the two html attributes take, from the first byte
 *  (the init script runs before the parser creates <html>, so it wraps the
 *  setters every writer — head scripts and React alike — goes through) */
async function logHtmlStates(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as { __states: string[] };
    w.__states = [];
    const watched = (el: Element, name: string) => el === document.documentElement && (name === "data-opening" || name === "data-intro");
    const set = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function (name: string, value: string) {
      if (watched(this, name)) w.__states.push(`${name}=${value}`);
      return set.call(this, name, value);
    };
    const remove = Element.prototype.removeAttribute;
    Element.prototype.removeAttribute = function (name: string) {
      if (watched(this, name)) w.__states.push(`${name} removed`);
      return remove.call(this, name);
    };
  });
}
const states = (page: Page) => page.evaluate(() => (window as unknown as { __states: string[] }).__states);

function introRequests(page: Page) {
  const urls: string[] = [];
  page.on("request", (r) => {
    if (r.url().includes("/media/intro/")) urls.push(r.url());
  });
  return urls;
}

for (const loc of ["ar", "en"] as const) {
  test(`${loc}: first visit shows the intro in ${loc}; a reload in the same session shows neither it nor the opening`, async ({ page }) => {
    await asVisitor(page);
    await logHtmlStates(page);
    await page.goto(`/${loc}`);
    const html = page.locator("html");
    const splash = page.locator(".intro-splash");
    await expect(html).toHaveAttribute("data-intro", "on");
    await expect(splash).toBeVisible();
    await expect(splash).toHaveAttribute("role", "dialog");
    await expect(splash).toHaveAttribute("aria-label", COPY[loc].label);
    await expect(page.locator(".intro-video")).toHaveAttribute("aria-hidden", "true");
    await expect(page.locator(".intro-video source")).toHaveCount(2);
    expect(await page.locator(".intro-video source").evaluateAll((s) => s.map((x) => x.getAttribute("src")))).toEqual([
      "/media/intro/intro.webm",
      "/media/intro/intro.mp4",
    ]);
    // the buttons speak the page's language; Skip has focus
    const skip = page.locator(".intro-skip");
    await expect(skip).toContainText(COPY[loc].skip);
    await expect(skip).toBeFocused();
    await expect(page.locator(".intro-sound")).toHaveAttribute("aria-label", COPY[loc].on);
    // Skip sits at the inline end: left in Arabic, right in English
    const sb = (await skip.boundingBox())!;
    const ob = (await page.locator(".intro-sound").boundingBox())!;
    expect(loc === "ar" ? sb.x < ob.x : sb.x > ob.x).toBe(true);
    for (const b of [sb, ob]) expect(Math.min(b.width, b.height)).toBeGreaterThanOrEqual(44);
    // the hero below is already final: the opening was skipped, never run
    await expect(html).toHaveAttribute("data-opening", "skipped");
    await skip.click();
    await expect(splash).toHaveCount(0);
    expect(await states(page)).toContain("data-intro=on");
    expect(await states(page)).toContain("data-opening=skipped");
    expect((await states(page)).filter((s) => /data-opening=(pending|running|revealing|done)/.test(s))).toEqual([]);

    // nothing carried the window away from the hero while it played
    expect(await page.evaluate(() => window.scrollY)).toBe(0);

    await page.reload({ waitUntil: "networkidle" });
    await expect(page.locator(".site-header")).toBeVisible();
    // the hero, final, at the top — no mount-time scroll moved the page
    await expect(page.locator(".hero-scene h1")).toBeInViewport();
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    await expect(html).not.toHaveAttribute("data-intro");
    await expect(splash).toHaveCount(0);
    await expect(html).toHaveAttribute("data-opening", "skipped");
    expect(await states(page)).not.toContain("data-intro=on");
    expect(await states(page)).toContain("data-opening=skipped");
    expect((await states(page)).filter((s) => /data-opening=(pending|running|revealing|done)/.test(s))).toEqual([]);
  });
}

// (/ar/contact is not here: it redirects to the homepage's #contact)
for (const route of ["/ar/products", "/en/company", "/ar/partners", "/en/projects"]) {
  test(`no intro on ${route}`, async ({ page }) => {
    await asVisitor(page);
    const urls = introRequests(page);
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator("html")).not.toHaveAttribute("data-intro");
    await expect(page.locator(".intro-splash")).toHaveCount(0);
    expect(urls).toEqual([]);
  });
}

for (const loc of ["ar", "en"] as const) {
  test(`${loc}: reduced motion — no intro, and not one byte of its media is requested`, async ({ page }) => {
    await asVisitor(page);
    await page.emulateMedia({ reducedMotion: "reduce" });
    const urls = introRequests(page);
    await page.goto(`/${loc}`, { waitUntil: "networkidle" });
    await expect(page.locator("html")).not.toHaveAttribute("data-intro");
    await expect(page.locator(".intro-splash")).toHaveCount(0);
    expect(urls).toEqual([]);
  });

  test(`${loc}: already seen this session (sc-intro=1) — no intro, no media request, no opening`, async ({ page }) => {
    await asVisitor(page);
    await logHtmlStates(page);
    await page.addInitScript(() => {
      try {
        sessionStorage.setItem("sc-intro", "1");
      } catch {
        /* ignore */
      }
    });
    const urls = introRequests(page);
    await page.goto(`/${loc}`, { waitUntil: "networkidle" });
    await expect(page.locator("html")).not.toHaveAttribute("data-intro");
    await expect(page.locator(".intro-splash")).toHaveCount(0);
    await expect(page.locator("html")).toHaveAttribute("data-opening", "skipped");
    expect(await states(page)).toContain("data-opening=skipped");
    expect((await states(page)).filter((s) => /data-opening=(pending|running|revealing|done)/.test(s))).toEqual([]);
    expect(urls).toEqual([]);
  });
}

test("Skip removes the intro from the DOM, releases the scroll lock, records the session and fires sc:intro-done", async ({ page }) => {
  await asVisitor(page);
  await page.goto("/en");
  await expect(page.locator(".intro-splash")).toBeVisible();
  const locked = () =>
    page.evaluate(() => [getComputedStyle(document.documentElement).overflow, getComputedStyle(document.body).overflow]);
  expect(await locked()).toEqual(["hidden", "hidden"]);
  await page.evaluate(() => {
    const w = window as unknown as { __done: boolean };
    w.__done = false;
    window.addEventListener("sc:intro-done", () => (w.__done = true));
  });
  await page.locator(".intro-skip").click();
  await expect(page.locator(".intro-splash")).toHaveCount(0);
  expect(await page.evaluate(() => (window as unknown as { __done: boolean }).__done)).toBe(true);
  expect(await page.evaluate(() => sessionStorage.getItem("sc-intro"))).toBe("1");
  expect((await locked()).includes("hidden")).toBe(false);
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
});

test("Esc skips the intro", async ({ page }) => {
  await asVisitor(page);
  await page.goto("/ar");
  await expect(page.locator(".intro-splash")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".intro-splash")).toHaveCount(0);
  await expect(page.locator("html")).not.toHaveAttribute("data-intro");
});

test("sound starts muted; the sound button toggles aria-pressed, the label and video.muted", async ({ page }) => {
  await asVisitor(page);
  await page.goto("/en");
  const sound = page.locator(".intro-sound");
  const muted = () => page.locator(".intro-video").evaluate((v: HTMLVideoElement) => v.muted);
  await expect(sound).toHaveAttribute("aria-pressed", "false");
  expect(await muted()).toBe(true);
  await sound.click();
  await expect(sound).toHaveAttribute("aria-pressed", "true");
  await expect(sound).toHaveAttribute("aria-label", COPY.en.off);
  expect(await muted()).toBe(false);
  await sound.click();
  await expect(sound).toHaveAttribute("aria-pressed", "false");
  await expect(sound).toHaveAttribute("aria-label", COPY.en.on);
  expect(await muted()).toBe(true);
});

test("a video that cannot load never holds the site: the page is free within 3 s", async ({ page }) => {
  await asVisitor(page);
  await logHtmlStates(page);
  await page.route("**/media/intro/**", (r) => r.abort());
  await page.goto("/ar");
  await expect(page.locator(".intro-splash")).toHaveCount(0, { timeout: 3000 });
  await expect(page.locator("html")).not.toHaveAttribute("data-intro");
  expect(await states(page)).toContain("data-intro=on"); // it did start
  await expect(page.locator(".hero-scene h1")).toBeInViewport();
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
});

for (const loc of ["ar", "en"] as const) {
  test(`${loc}: a reduced-motion visitor stays at the top — no mount-time scroll moves the page (D085-SLIDER-SCROLL)`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${loc}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    // the strip still centres its active tab — horizontally, inside itself
    await expect(page.locator('.industries-slider-tab[aria-current="true"]')).toHaveCount(1);
  });

  test(`${loc}: a #hash link skips the intro, lands on its section and marks the intro seen`, async ({ page }) => {
    await asVisitor(page);
    const urls = introRequests(page);
    await page.goto(`/${loc}/#contact`);
    await expect(page.locator("#contact")).toBeInViewport({ timeout: 10_000 });
    await expect(page.locator("html")).not.toHaveAttribute("data-intro");
    await expect(page.locator(".intro-splash")).toHaveCount(0);
    expect(await page.evaluate(() => sessionStorage.getItem("sc-intro"))).toBe("1");
    expect(urls).toEqual([]);
    // later in the same session the homepage opens without it
    await page.goto(`/${loc}`);
    await expect(page.locator(".site-header")).toBeVisible();
    await expect(page.locator("html")).not.toHaveAttribute("data-intro");
    await expect(page.locator(".intro-splash")).toHaveCount(0);
  });
}
