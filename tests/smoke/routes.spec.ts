import { expect, test } from "@playwright/test";

const routes = [
  "",
  // D-088 (SEO-2): /products is a 308 to the first category — see redirects
  "/products/networking",
  "/solutions",
  "/solutions/security-solutions",
  "/industries",
  "/company",
  "/partners",
  "/clients",
];
const locales = ["en", "ar"] as const;

/* D-050 §51 route compatibility: historical destinations redirect,
   locale preserved. */
const redirects: Array<[string, string]> = [
  ["/en/contact", "/en/#contact"],
  ["/ar/contact", "/ar/#contact"],
  ["/en/smart-ai", "/en"],
  ["/ar/smart-ai", "/ar"],
  // D-088 (SEO-2): one URL per page — the index is the first category
  ["/en/products", "/en/products/networking"],
  ["/ar/products", "/ar/products/networking"],
  // D-092: projects no longer have their own pages — every /projects
  // destination (bare route and every historical detail slug) redirects
  // to the homepage section, locale preserved.
  ["/en/projects", "/en/#projects"],
  ["/ar/projects", "/ar/#projects"],
  ["/en/projects/diriyah-season", "/en/#projects"],
  ["/ar/projects/grand-mosque-makkah", "/ar/#projects"],
  ["/en/projects/rcu-outdoor-entertainment-alula", "/en/#projects"],
  ["/ar/projects/king-abdullah-sports-city", "/ar/#projects"],
];
for (const [from, to] of redirects) {
  test(`${from} redirects to ${to}`, async ({ request }) => {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status()).toBe(308); // permanent since D-088
    expect(res.headers()["location"]).toBe(to);
  });
}

for (const locale of locales) {
  for (const route of routes) {
    test(`${locale}${route || "/"} renders clean`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });
      const response = await page.goto(`/${locale}${route}`);
      expect(response?.status()).toBe(200);

      // security headers present (Q-P3-12)
      const headers = response?.headers() ?? {};
      expect(headers["content-security-policy"]).toContain("default-src 'none'");
      expect(headers["x-content-type-options"]).toBe("nosniff");

      // correct localization attributes (true RTL, Q-P3-4)
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute(
        "dir",
        locale === "ar" ? "rtl" : "ltr",
      );

      // noindex by default (Q-P3-11)
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);

      // page has an h1 and no console/hydration errors
      await expect(page.locator("h1")).toHaveCount(1);
      await page.waitForLoadState("networkidle");
      const hydrationErrors = consoleErrors.filter(
        (e) => e.includes("Hydration") || e.includes("hydration") || e.includes("did not match"),
      );
      expect(hydrationErrors).toEqual([]);
      expect(consoleErrors).toEqual([]);
    });
  }
}

test("theme toggle switches data-theme and persists", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: /light theme/i }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("locale switcher navigates to the equivalent page", async ({ page }) => {
  await page.goto("/en/company");
  await page.getByRole("button", { name: /switch language/i }).click();
  await page.waitForURL("**/ar/company");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
});

// D-092: the hero CTA scrolls to the homepage Selected Projects section —
// project detail pages no longer exist.
test("Explore Projects CTA arrives at #projects", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("link", { name: /explore projects/i }).click();
  await page.waitForURL((url) => url.hash === "#projects");
  await expect(page.locator("#projects")).toBeInViewport();
});

// D-092: the withdrawn company phone number must not appear anywhere —
// display text, tel: links or JSON-LD — while the address/email stay.
test("the withdrawn phone number never renders on any page", async ({ page }) => {
  for (const path of ["/en", "/ar", "/en/company", "/ar/company"]) {
    await page.goto(path);
    const html = await page.content();
    expect(html).not.toContain("217 6668");
    expect(html).not.toContain("2176668");
  }
});
