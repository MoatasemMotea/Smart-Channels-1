import { expect, test, type Page } from "@playwright/test";
import { splitForeign } from "../../src/lib/i18n/lang-runs";
import { ARABIC_ON_EN, BRANDS, IDENTIFIER, LATIN_ON_AR, PENDING_LATIN, TECH_TERMS } from "../../src/content/lang-allowlist";

/**
 * D-081 — ONE LANGUAGE PER PAGE, permanently.
 *
 * Crawls every page reachable from the locale's home (same-locale links,
 * no hashes) and reads every text node plus alt/aria-label/title/
 * placeholder and the document title. On an Arabic page every Latin run
 * must be (a) allowed — a brand, a technical term, an identifier, or a
 * name on the owner's pending list — and (b) inside an element whose
 * language is English (`lang="en"`, WCAG 3.1.2). On an English page the
 * same holds for Arabic runs. Attributes and the title cannot carry a
 * language of their own, so they are checked for (a) only. The pending
 * names seen are printed on every run.
 */
const PHRASES = new Set([...BRANDS, ...TECH_TERMS, ...PENDING_LATIN, ...LATIN_ON_AR]);
const TOKENS = new Set([...PHRASES].flatMap((p) => p.split(/[\s/&,()+:—–-]+/)).filter(Boolean));
const PENDING = new Set(PENDING_LATIN);

const clean = (run: string) => run.replace(/^[\s.,:;()'’"/-]+|[\s.,:;()'’"/-]+$/g, "");

function latinAllowed(run: string): boolean {
  const r = clean(run);
  if (!r || PHRASES.has(r) || IDENTIFIER.test(r)) return true;
  // a run may chain allowed pieces ("Cat 6 / Cat 6A / Cat 7", "IP PBX", "© 2026 Smart Channels")
  let rest = r;
  for (const p of [...PHRASES].sort((a, b) => b.length - a.length)) rest = rest.split(p).join(" ");
  return rest
    .split(/[\s/&,()+:—–©.-]+/)
    .filter(Boolean)
    .every((tok) => /^\d+[A-Za-z]?$/.test(tok) || TOKENS.has(tok));
}

type Finding = { route: string; where: string; text: string; run: string; problem: string };

async function crawl(page: Page, loc: "en" | "ar") {
  const seen = new Set<string>();
  // seed: the home page plus every sitemap route of this locale (a few pages,
  // e.g. /smart-ai, are not linked from the page body); links extend it
  const sitemap = await (await page.request.get("/sitemap.xml")).text();
  const queue = [
    `/${loc}`,
    // routes that exist but no page links to and the sitemap omits
    `/${loc}/contact`,
    `/${loc}/smart-ai`,
    ...[...sitemap.matchAll(/<loc>[^<]*?(\/(?:en|ar)(?:\/[^<]*)?)<\/loc>/g)]
      .map((m) => m[1]!.replace(/\/$/, ""))
      .filter((p) => p === `/${loc}` || p.startsWith(`/${loc}/`)),
  ];
  const findings: Finding[] = [];
  const pendingSeen = new Set<string>();
  while (queue.length) {
    const route = queue.shift()!;
    if (seen.has(route)) continue;
    seen.add(route);
    await page.goto(route, { waitUntil: "networkidle" });
    const data = await page.evaluate(() => {
      const nodes: { text: string; lang: string; where: string }[] = [];
      const where = (el: Element) => {
        const s = el.closest("[data-scene], section[id], header, footer, nav, main > *");
        return `${el.tagName.toLowerCase()} in ${s ? s.getAttribute("data-scene") || s.id || s.tagName.toLowerCase() : "body"}`;
      };
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n: Node | null;
      while ((n = walker.nextNode())) {
        const el = n.parentElement;
        if (!el || el.closest("script,style,noscript,template")) continue;
        const t = (n.textContent ?? "").replace(/\s+/g, " ").trim();
        if (!t) continue;
        nodes.push({ text: t, lang: el.closest("[lang]")?.getAttribute("lang") ?? "", where: where(el) });
      }
      const attrs: { text: string; where: string }[] = [];
      for (const el of document.body.querySelectorAll("[alt],[aria-label],[title],[placeholder]")) {
        for (const a of ["alt", "aria-label", "title", "placeholder"]) {
          const v = (el.getAttribute(a) ?? "").trim();
          if (v) attrs.push({ text: v, where: `${a} of ${where(el)}` });
        }
      }
      const links = [...document.querySelectorAll<HTMLAnchorElement>("a[href]")].map((a) => a.getAttribute("href")!);
      return { nodes, attrs, title: document.title, links, body: document.body.textContent?.replace(/\s+/g, " ") ?? "" };
    });
    const foreignLang = loc === "ar" ? "en" : "ar";
    const check = (text: string, where: string, lang: string | null) => {
      for (const r of splitForeign(text, loc).filter((x) => x.lang)) {
        const run = clean(r.text);
        if (!run) continue;
        const ok = loc === "ar" ? latinAllowed(run) : ARABIC_ON_EN.includes(run);
        if (!ok) findings.push({ route, where, text, run, problem: "not on the allow-list" });
        else if (lang !== null && !lang.startsWith(foreignLang)) findings.push({ route, where, text, run, problem: `lang="${lang}" — needs lang="${foreignLang}"` });
      }
    };
    if (loc === "ar") for (const p of PENDING) if (data.body.includes(p)) pendingSeen.add(p);
    for (const n of data.nodes) check(n.text, n.where, n.lang);
    for (const a of data.attrs) check(a.text, a.where, null);
    check(data.title, "<title>", null);
    for (const href of data.links) {
      if (!href.startsWith(`/${loc}`) || href.includes("#")) continue;
      const path = href.replace(/\/$/, "");
      if (!seen.has(path) && !queue.includes(path) && !/\.(pdf|xml|txt)$/.test(path)) queue.push(path);
    }
  }
  return { pages: seen.size, findings, pendingSeen: [...pendingSeen].sort() };
}

for (const loc of ["ar", "en"] as const) {
  test(`${loc}: every page speaks one language — foreign runs only from the allow-list, each wrapped in lang`, async ({ page }, info) => {
    test.skip(info.project.name !== "desktop"); // language does not depend on the viewport
    test.setTimeout(300_000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    const { pages, findings, pendingSeen } = await crawl(page, loc);
    await info.attach(`${loc}-pending-names.json`, { body: JSON.stringify(pendingSeen, null, 1), contentType: "application/json" });
    if (pendingSeen.length) console.log(`[${loc}] names awaiting official Arabic (${pendingSeen.length}): ${pendingSeen.join(" · ")}`);
    const report = findings.map((f) => `${f.route} · ${f.where} · «${f.run}» · ${f.problem} · in: ${f.text.slice(0, 90)}`);
    expect(report, `${findings.length} foreign-script runs:\n${report.join("\n")}`).toEqual([]);
    expect(pages, "the crawl reached the whole site").toBeGreaterThanOrEqual(37);
  });
}

/* D-082 — the mobile menu (portalled, mounted only when open) is part of
   every page: open it at 390 px and hold its text to the same rules. */
for (const loc of ["ar", "en"] as const) {
  test(`${loc}: the OPEN mobile menu at 390 px speaks one language too`, async ({ page }, info) => {
    test.skip(info.project.name !== "mobile");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${loc}/partners`, { waitUntil: "networkidle" });
    await page.locator(".menu-toggle").click();
    const panel = page.locator(".site-menu");
    await expect(panel).toBeVisible();
    const nodes = await panel.evaluate((root) => {
      const out: { text: string; lang: string }[] = [];
      const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let n: Node | null;
      while ((n = w.nextNode())) {
        const t = (n.textContent ?? "").replace(/\s+/g, " ").trim();
        if (t) out.push({ text: t, lang: n.parentElement?.closest("[lang]")?.getAttribute("lang") ?? "" });
      }
      return out;
    });
    expect(nodes.length).toBeGreaterThan(5);
    const foreign = loc === "ar" ? "en" : "ar";
    const problems: string[] = [];
    for (const n of nodes) {
      for (const r of splitForeign(n.text, loc).filter((x) => x.lang)) {
        const run = clean(r.text);
        if (!run) continue;
        const ok = loc === "ar" ? latinAllowed(run) : ARABIC_ON_EN.includes(run);
        if (!ok) problems.push(`«${run}» not on the allow-list`);
        else if (!n.lang.startsWith(foreign)) problems.push(`«${run}» lang="${n.lang}"`);
      }
    }
    expect(problems).toEqual([]);
    // the email is there, and carries English
    await expect(panel.locator('a[href^="mailto:"] [lang="en"]')).toHaveCount(1);
  });
}
