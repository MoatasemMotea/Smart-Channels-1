import { expect, test, type Page } from "@playwright/test";

/**
 * D-070 — the gallery lightbox is centred on the SCREEN.
 *
 * Before: Tailwind's preflight zeroes the UA `dialog { margin: auto }`, so
 * the 1200 px dialog sat at the start corner (Δx −120 px at 1440 in EN,
 * +120 in AR; ∓360 at 1920) and a portrait video was letter-boxed inside a
 * landscape box. Now the dialog is a full-screen grid: for a landscape
 * image and a portrait video, at 1440 and 390 × EN / AR, the media centre
 * is the screen centre (±1 px both axes), the caption is centred under it,
 * the arrows are symmetric about the screen centre (≥ 641 px) or a centred
 * row under the caption (390), and the media is entirely on screen.
 *
 * The test browser has no H.264 decoder, so the <video> box takes the
 * poster's dimensions (464×848 — the same portrait aspect as the clip).
 */
const CASES = [
  { w: 1440, h: 900 },
  { w: 390, h: 844 },
];
const LOCALES = ["en", "ar"] as const;
const KINDS = ["image", "video"] as const;

async function gotoGallery(page: Page, loc: "en" | "ar") {
  await page.goto(`/${loc}/#gallery`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => {
    const state = document.documentElement.getAttribute("data-opening");
    return state === "done" || state === "skipped" || (state === null && document.body.style.overflow === "");
  }, null, { timeout: 10000 });
  await page.waitForTimeout(1400);
  await page.locator("#gallery").scrollIntoViewIfNeeded();
}

async function openOn(page: Page, loc: "en" | "ar", kind: "image" | "video") {
  const centre = page.locator('.gcar-card[data-pos="0"]');
  for (let i = 0; i < 3; i++) {
    if ((await centre.getAttribute("data-kind")) === kind) break;
    await page.getByRole("button", { name: loc === "ar" ? "العنصر التالي" : "Next item" }).click();
    await page.waitForTimeout(700);
  }
  expect(await centre.getAttribute("data-kind")).toBe(kind);
  await centre.locator(".gcar-open").click();
  const dialog = page.locator("dialog.gallery-lightbox");
  await expect(dialog).toHaveAttribute("open", "");
  // media sized (image decoded / video box from its poster)
  await page.waitForFunction(() => {
    const m = document.querySelector<HTMLElement>("dialog.gallery-lightbox img, dialog.gallery-lightbox video");
    return !!m && m.getBoundingClientRect().height > 100;
  });
  await page.waitForTimeout(300);
  return dialog;
}

const centreOf = (r: DOMRect) => ({ x: r.x + r.width / 2, y: r.y + r.height / 2 });

for (const { w, h } of CASES) {
  for (const loc of LOCALES) {
    for (const kind of KINDS) {
      test(`${w}×${h} ${loc} ${kind}: media centred on the screen, caption under it, arrows symmetric`, async ({ page }, info) => {
        test.skip(info.project.name !== "mobile");
        await page.setViewportSize({ width: w, height: h });
        await gotoGallery(page, loc);
        const dialog = await openOn(page, loc, kind);

        const g = await dialog.evaluate((d) => {
          const box = (el: Element | null) => (el ? el.getBoundingClientRect().toJSON() : null);
          const media = d.querySelector("img, video")!;
          return {
            vw: innerWidth,
            vh: innerHeight,
            dialog: box(d),
            media: box(media),
            caption: box(d.querySelector(".gallery-lightbox-caption")),
            row: box(d.querySelector(".gallery-lightbox-nav-row")),
            prev: box(d.querySelector(".gallery-lightbox-prev")),
            next: box(d.querySelector(".gallery-lightbox-next")),
            close: box(d.querySelector(".gallery-lightbox-close")),
            rowDisplay: getComputedStyle(d.querySelector(".gallery-lightbox-nav-row")!).display,
            captionAlign: getComputedStyle(d.querySelector(".gallery-lightbox-caption")!).textAlign,
            ratio: media.tagName === "IMG" ? (media as HTMLImageElement).naturalWidth / (media as HTMLImageElement).naturalHeight : 464 / 848,
          };
        });
        // the dialog fills the screen
        expect(g.dialog).toMatchObject({ x: 0, y: 0, width: w, height: h });
        // media centre = screen centre (±1 px), wholly on screen, aspect kept
        const m = centreOf(g.media as DOMRect);
        expect(Math.abs(m.x - w / 2)).toBeLessThanOrEqual(1);
        expect(Math.abs(m.y - h / 2)).toBeLessThanOrEqual(1);
        expect(g.media!.x).toBeGreaterThanOrEqual(0);
        expect(g.media!.y).toBeGreaterThanOrEqual(0);
        expect(g.media!.right).toBeLessThanOrEqual(w);
        expect(g.media!.bottom).toBeLessThanOrEqual(h);
        expect(Math.abs(g.media!.width / g.media!.height - g.ratio)).toBeLessThan(0.02);
        if (kind === "video") expect(g.media!.width).toBeLessThan(g.media!.height); // a narrow column, not a letter-boxed band
        // caption directly under the media, centred on it, as wide as it
        const c = centreOf(g.caption as DOMRect);
        expect(Math.abs(c.x - m.x)).toBeLessThanOrEqual(1);
        expect(g.caption!.y).toBeGreaterThan(g.media!.bottom);
        expect(g.caption!.y - g.media!.bottom).toBeLessThan(24);
        expect(Math.abs(g.caption!.width - g.media!.width)).toBeLessThanOrEqual(1);
        expect(g.captionAlign).toBe("center");
        expect(g.caption!.bottom).toBeLessThanOrEqual(h);
        // arrows: symmetric about the screen centre (wide) or a centred row under the caption (390)
        const p = centreOf(g.prev as DOMRect);
        const n = centreOf(g.next as DOMRect);
        if (w > 640) {
          expect(g.rowDisplay).toBe("contents");
          expect(Math.abs(p.x + n.x - w)).toBeLessThanOrEqual(2);
          expect(Math.abs(p.y - h / 2)).toBeLessThanOrEqual(1);
          expect(Math.abs(n.y - h / 2)).toBeLessThanOrEqual(1);
          const start = loc === "ar" ? g.next! : g.prev!; // the "previous" arrow sits at the inline start
          expect(start.x).toBeGreaterThanOrEqual(12);
          expect(start.x).toBeLessThanOrEqual(40);
        } else {
          expect(g.rowDisplay).toBe("flex");
          const r = centreOf(g.row as DOMRect);
          expect(Math.abs(r.x - w / 2)).toBeLessThanOrEqual(1);
          expect(g.row!.y).toBeGreaterThanOrEqual(g.caption!.bottom);
          expect(g.row!.bottom).toBeLessThanOrEqual(h);
        }
        // close button at the screen's top inline-end corner
        expect(g.close!.y).toBeGreaterThanOrEqual(12);
        expect(g.close!.y).toBeLessThanOrEqual(40);
        if (loc === "ar") expect(g.close!.x).toBeLessThanOrEqual(40);
        else expect(w - g.close!.right).toBeLessThanOrEqual(40);

        // unchanged behaviour: Escape closes and focus returns to the opening card
        await page.keyboard.press("Escape");
        await expect(dialog).not.toHaveAttribute("open", "");
        expect(await page.evaluate(() => document.activeElement?.closest(".gcar-card") !== null)).toBe(true);
      });
    }
  }
}

test("1440 en: a click on the empty stage (the dialog itself) still closes the lightbox", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile");
  await page.setViewportSize({ width: 1440, height: 900 });
  await gotoGallery(page, "en");
  const dialog = await openOn(page, "en", "image");
  await page.mouse.click(120, 800); // outside the media, the caption and the arrows
  await expect(dialog).not.toHaveAttribute("open", "");
});
