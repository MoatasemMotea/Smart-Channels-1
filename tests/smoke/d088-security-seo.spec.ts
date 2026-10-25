import { expect, test } from "@playwright/test";

/**
 * D-088 smoke: request guards (SEC-3 · SEC-11), Arabic default (SEO-7),
 * /products → first category (SEO-2), sitemap (SEO-1), share image
 * (SEO-10), structured data (SEO-11) and the "storage unavailable" form
 * path (SEC-5).
 *
 * No lead is ever stored: every POST below is refused before the store is
 * touched, and the form test answers /api/leads itself (route.fulfill).
 */
const BASE = "http://127.0.0.1:3100";
const LEAD = { source: "contact-form", locale: "en", name: "T", email: "t@example.com", message: "m", consent: true };

test.describe("API request guards", () => {
  test("lead intake refuses a missing or foreign Origin (403)", async ({ request }) => {
    const none = await request.post("/api/leads", { data: LEAD });
    expect(none.status()).toBe(403);
    const foreign = await request.post("/api/leads", { data: LEAD, headers: { origin: "https://evil.example" } });
    expect(foreign.status()).toBe(403);
  });

  test("lead intake accepts JSON only (415) and caps the body (413)", async ({ request }) => {
    const text = await request.post("/api/leads", {
      headers: { origin: BASE, "content-type": "text/plain" },
      data: JSON.stringify(LEAD),
    });
    expect(text.status()).toBe(415);
    const big = await request.post("/api/leads", {
      headers: { origin: BASE, "content-type": "application/json" },
      data: JSON.stringify({ ...LEAD, message: "x".repeat(70 * 1024) }),
    });
    expect(big.status()).toBe(413);
  });

  test("admin sign-in and sign-out refuse a foreign Origin (403)", async ({ request }) => {
    const login = await request.post("/api/admin/login", {
      headers: { origin: "https://evil.example" },
      form: { password: "x" },
      maxRedirects: 0,
    });
    expect(login.status()).toBe(403);
    const logout = await request.post("/api/admin/logout", { headers: { origin: "https://evil.example" }, maxRedirects: 0 });
    expect(logout.status()).toBe(403);
  });

  test("CSV export refuses a cross-site request (403) and HSTS is sent", async ({ request }) => {
    const res = await request.get("/api/admin/leads/export", { headers: { "sec-fetch-site": "cross-site" } });
    expect(res.status()).toBe(403);
    const page = await request.get("/ar");
    expect(page.headers()["strict-transport-security"]).toContain("max-age=63072000");
  });
});

test.describe("Arabic by default (SEO-7)", () => {
  test("a new visitor on / goes to /ar whatever the browser language", async ({ request }) => {
    for (const lang of ["en-US,en;q=0.9", "ar-SA", ""]) {
      const res = await request.get("/", { maxRedirects: 0, headers: { "accept-language": lang } });
      expect([307, 308]).toContain(res.status());
      expect(res.headers()["location"]).toMatch(/\/ar$/);
    }
  });

  test("an explicit language choice (cookie) is still respected", async ({ request }) => {
    const res = await request.get("/", { maxRedirects: 0, headers: { cookie: "NEXT_LOCALE=en", "accept-language": "ar" } });
    expect(res.headers()["location"]).toMatch(/\/en$/);
  });
});

test.describe("/products (SEO-2)", () => {
  for (const locale of ["en", "ar"]) {
    test(`/${locale}/products is a permanent redirect to the first category`, async ({ request }) => {
      const res = await request.get(`/${locale}/products`, { maxRedirects: 0 });
      expect(res.status()).toBe(308);
      expect(res.headers()["location"]).toBe(`/${locale}/products/networking`);
    });
  }

  test("the Products nav item points to the first category and stays active on every category", async ({ page }) => {
    test.skip(test.info().project.name === "mobile", "the desktop nav carries the active state");
    await page.goto("/en/products/storage");
    const item = page.locator('header a[aria-current="true"]', { hasText: "Products" });
    await expect(item).toHaveCount(1);
    await expect(item).toHaveAttribute("href", "/en/products/networking");
  });
});

test.describe("sitemap, share image, structured data", () => {
  test("the sitemap lists all nine categories in both languages and no /products index", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    for (const cat of ["networking", "fiber", "cybersecurity", "surveillance", "av", "computing", "storage", "communication", "environmental"]) {
      expect(xml).toContain(`/en/products/${cat}</loc>`);
      expect(xml).toContain(`/ar/products/${cat}</loc>`);
    }
    expect((xml.match(/\/en\/products\/[a-z-]+<\/loc>/g) ?? []).length).toBe(9);
    expect(xml).not.toMatch(/\/products<\/loc>/);
  });

  test("every page carries its locale's absolute 1200×630 share image and a large Twitter card", async ({ page, request }) => {
    for (const [path, locale] of [["/ar", "ar"], ["/en/projects", "en"], ["/ar/products/networking", "ar"]] as const) {
      await page.goto(path);
      const og = await page.locator('meta[property="og:image"]').getAttribute("content");
      expect(og).toMatch(new RegExp(`^https?://[^/]+/og/og-${locale}\\.png$`));
      await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
      const img = await request.get(new URL(og!).pathname);
      expect(img.status()).toBe(200);
      expect(img.headers()["content-type"]).toBe("image/png");
    }
  });

  test("Arabic pages use the Arabic site name and title template", async ({ page }) => {
    await page.goto("/ar");
    await expect(page).toHaveTitle("القنوات الذكية — التقنية التي تصنع التجربة");
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "القنوات الذكية");
    await page.goto("/ar/projects");
    await expect(page).toHaveTitle(/ — القنوات الذكية$/);
  });

  test("no structured data is published while indexing is off (noindex preview)", async ({ page }) => {
    await page.goto("/ar/projects/diriyah-season");
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(0);
  });
});

test.describe("lead storage unavailable (SEC-5)", () => {
  test("the form never claims success and offers email and WhatsApp", async ({ page }) => {
    let posted = 0;
    await page.route("**/api/leads", (route) => {
      posted++;
      return route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ ok: false, error: "storage-unconfigured" }) });
    });
    await page.goto("/en#contact");
    const form = page.locator("form").filter({ has: page.locator("#lf-name") });
    await form.locator("#lf-name").fill("Test Visitor");
    await form.locator("#lf-email").fill("visitor@example.com");
    await form.locator("#lf-message").fill("Hello");
    await form.locator('input[name="consent"]').check();
    await form.locator('button[type="submit"]').click();

    const fail = page.locator(".lead-fail");
    await expect(fail).toBeVisible();
    expect(posted).toBe(1);
    await expect(fail.locator('a[href="mailto:info@smartchannels.co"]')).toHaveCount(1);
    await expect(fail.locator('a[href="https://wa.me/966539795999"]')).toHaveCount(1);
    await expect(page.locator(".lead-success")).toHaveCount(0);
  });
});
