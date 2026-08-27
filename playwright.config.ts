import { defineConfig } from "@playwright/test";

/**
 * Smoke suite (Q-P3-10): primary routes × EN/AR, desktop + mobile,
 * dark/light, no console errors, no hydration errors, headers present.
 * Runs against a production build: `npm run build && npm run test:smoke`.
 */
export default defineConfig({
  testDir: "tests/smoke",
  fullyParallel: true,
  timeout: 30_000,
  use: {
    baseURL: "http://127.0.0.1:3100",
  },
  webServer: {
    command: "npm run start -- --port 3100",
    url: "http://127.0.0.1:3100/en",
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 } } },
  ],
});
