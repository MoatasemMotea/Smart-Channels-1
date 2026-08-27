// Smart Channels 2026 — P2 board renderer (design tooling, not app code).
// Renders each board-*.html to a PNG in design/boards/.
// Requires a Playwright install with Chromium. Run from design/boards/src/:
//   PLAYWRIGHT_DIR=$(npm root -g)/playwright node shoot.mjs [board-name ...]
// (or `npm i playwright` anywhere and set PLAYWRIGHT_DIR to it)
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_DIR || 'playwright');
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const src = dirname(fileURLToPath(import.meta.url));
const out = join(src, '..');
const only = process.argv.slice(2);
const boards = readdirSync(src).filter(f => f.startsWith('board-') && f.endsWith('.html'))
  .filter(f => only.length === 0 || only.some(o => f.includes(o)));

const executablePath = process.env.BOARD_CHROMIUM || undefined;
const browser = await chromium.launch(executablePath ? { executablePath } : {});
for (const f of boards) {
  const width = f.includes('board-11') ? 1840 : 2360;
  const scale = f.includes('board-11') ? 1.4 : 2;
  const page = await browser.newPage({ deviceScaleFactor: scale, viewport: { width, height: 600 } });
  await page.goto('file://' + join(src, f));
  await page.waitForTimeout(900); // fonts + canvas
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const png = f.replace('.html', '.png');
  await page.screenshot({ path: join(out, png), fullPage: true });
  console.log('rendered', png);
  await page.close();
}
await browser.close();
