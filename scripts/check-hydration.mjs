/**
 * HYDRATION GUARD (D-076).
 *
 * React reports server/client attribute mismatches only in DEVELOPMENT
 * builds (production strips the warning), so the production smoke suite
 * can never see them. This script starts `next dev` on a temporary port,
 * loads the homepage under BOTH motion settings (prefers-reduced-motion:
 * reduce / no-preference), waits until React has hydrated (ScrollState
 * writes `data-scrolled` on <html> only after hydration), counts console
 * messages that mention hydration, stops the server and exits non-zero
 * when any were seen. The pre-paint bootstrap rewrites attributes on
 * <html> (theme, motion tier, header environment, opening state) before
 * React compares them; `suppressHydrationWarning` on that one element is
 * what keeps this at zero.
 *
 *   npm run check:hydration
 */
import { spawn } from "node:child_process";
import { chromium } from "@playwright/test";

const PORT = Number(process.env.HYDRATION_PORT || 3111);
const BASE = `http://localhost:${PORT}`;
const ROUTES = ["/en/", "/ar/"];
const SETTINGS = ["reduce", "no-preference"];

const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "--port", String(PORT)], {
  stdio: ["ignore", "pipe", "pipe"],
  detached: true,
  env: { ...process.env, BROWSER: "none" },
});
let log = "";
server.stdout.on("data", (d) => (log += d));
server.stderr.on("data", (d) => (log += d));
const stop = () => {
  try {
    process.kill(-server.pid, "SIGTERM");
  } catch {
    /* already gone */
  }
};
process.on("exit", stop);

async function waitForServer() {
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(`${BASE}/en`);
      if (r.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`next dev did not answer on ${BASE} within 120 s\n${log.slice(-2000)}`);
}

let total = 0;
try {
  await waitForServer();
  const browser = await chromium.launch();
  for (const reducedMotion of SETTINGS) {
    for (const route of ROUTES) {
      const ctx = await browser.newContext({ reducedMotion, viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      const hits = [];
      page.on("console", (m) => {
        if ((m.type() === "error" || m.type() === "warning") && /hydrat/i.test(m.text())) hits.push(m.text());
      });
      await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 180_000 });
      const hydrated = await page
        .waitForFunction(() => document.documentElement.hasAttribute("data-scrolled"), null, { timeout: 60_000 })
        .then(() => true)
        .catch(() => false);
      await page.waitForTimeout(1500);
      const attrs = await page.evaluate(() => Object.fromEntries([...document.documentElement.attributes].map((a) => [a.name, a.value])));
      total += hits.length;
      console.log(
        `${reducedMotion.padEnd(14)} ${route.padEnd(6)} hydrated=${hydrated} hydration messages=${hits.length} tier=${attrs["data-motion-tier"]} header-env=${attrs["data-header-env"] ?? "-"} opening=${attrs["data-opening"] ?? "-"}`,
      );
      for (const h of hits) console.log("   " + h.split("\n").slice(0, 1).join("") + " …");
      if (!hydrated) {
        total += 1;
        console.log("   the page never hydrated — counted as a failure");
      }
      await ctx.close();
    }
  }
  await browser.close();
} finally {
  stop();
}
console.log(total === 0 ? "\nhydration guard: 0 mismatches" : `\nhydration guard: ${total} problem(s)`);
process.exit(total === 0 ? 0 : 1);
