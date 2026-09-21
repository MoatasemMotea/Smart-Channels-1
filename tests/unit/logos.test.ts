import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { clients } from "../../src/content/clients";
import { partners } from "../../src/content/partners";
import { projects } from "../../src/content/projects";

/**
 * D-078 — the client roster (6 removed, 3 added), the two rails' logo
 * files (64, transparent with REAL alpha), and the documented
 * `originalColor` exceptions whose ground is part of the mark.
 */
const REMOVED = ["buildup", "black-orange", "time", "balich-wonder-studio", "pfl-mena", "hqws"];
const ADDED = ["riyadh-season", "jeddah-season", "diriyah-season"];
const ORIGINAL_COLOR = ["hopscotch", "moments-international", "lenovo"];

async function alphaStats(file: string) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const total = info.width * info.height;
  let transparent = 0;
  for (let i = 0; i < total; i++) if (data[i * 4 + 3] === 0) transparent++;
  const meta = await sharp(file).metadata();
  return { hasAlpha: meta.hasAlpha === true, transparentPct: (100 * transparent) / total, width: info.width, height: info.height };
}

describe("D-078 client roster", () => {
  it("has 24 clients: the 27 of D-033 minus six removed plus three seasons", () => {
    expect(clients).toHaveLength(24);
    const ids = clients.map((c) => c.id);
    for (const id of REMOVED) expect(ids).not.toContain(id);
    for (const id of ADDED) expect(ids).toContain(id);
  });

  it("keeps the 41 alliances untouched", () => {
    expect(partners).toHaveLength(41);
  });

  it("names the seasons in both languages; jeddah-season has NO logo (pending — never invented)", () => {
    const byId = Object.fromEntries(clients.map((c) => [c.id, c]));
    expect(byId["riyadh-season"]?.name).toEqual({ en: "Riyadh Season", ar: "موسم الرياض" });
    expect(byId["jeddah-season"]?.name).toEqual({ en: "Jeddah Season", ar: "موسم جدة" });
    expect(byId["diriyah-season"]?.name).toEqual({ en: "Diriyah Season", ar: "موسم الدرعية" });
    expect(byId["jeddah-season"]?.logo).toBeUndefined();
    expect(byId["jeddah-season"]?.enabled).toBe(true);
    expect(byId["riyadh-season"]?.logo?.src).toBe("/media/logos/clients/riyadh-season.webp");
    expect(byId["diriyah-season"]?.logo?.src).toBe("/media/logos/clients/diriyah-season.webp");
  });

  it("diriyah-season is deliberately both a client id and a project id (separate collections)", () => {
    expect(projects.some((p) => p.id === "diriyah-season")).toBe(true);
    expect(clients.some((c) => c.id === "diriyah-season")).toBe(true);
  });

  it("carries originalColor on exactly the three documented exceptions", () => {
    const flagged = [...clients, ...partners].filter((r) => r.originalColor).map((r) => r.id).sort();
    expect(flagged).toEqual([...ORIGINAL_COLOR].sort());
  });
});

describe("D-078 logo files", () => {
  const records = [...clients, ...partners].filter((r) => r.logo);

  it("links exactly 64 logo files (23 clients + 41 alliances), all present", () => {
    expect(records).toHaveLength(64);
    expect(records.filter((r) => r.logo!.src.includes("/clients/"))).toHaveLength(23);
    for (const r of records) expect(existsSync(join("public", r.logo!.src)), r.id).toBe(true);
  });

  it("every non-exception file has REAL alpha (a channel AND transparent pixels); exceptions are solid", async () => {
    for (const r of records) {
      const s = await alphaStats(join("public", r.logo!.src));
      if (r.originalColor) {
        expect(s.transparentPct, `${r.id} is a solid brand box`).toBeLessThan(1);
      } else {
        expect(s.hasAlpha, `${r.id} alpha channel`).toBe(true);
        expect(s.transparentPct, `${r.id} transparent share`).toBeGreaterThan(5);
      }
      expect(s.height, `${r.id} delivery cap`).toBeLessThanOrEqual(300);
    }
  }, 60_000);

  it("no staging folder is left behind", () => {
    expect(existsSync("public/media/logos-transparent")).toBe(false);
  });
});
