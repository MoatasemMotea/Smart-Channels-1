import { expect, test } from "@playwright/test";

const routes = [
  "",
  "/products",
  "/solutions",
  "/solutions/security-solutions",
  "/projects",
  "/industries",
  "/gallery",
  "/company",
  "/partners",
  "/contact",
];
const locales = ["en", "ar"] as const;

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
