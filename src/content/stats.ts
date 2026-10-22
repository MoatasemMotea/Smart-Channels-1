import type { Stat } from "@/types/content";

/**
 * TRACK RECORD — the ONLY place these figures exist (D-002).
 *
 * HOW TO EDIT: change `value`/`suffix` and update `asOf` if the reporting
 * year changed. Never duplicate these numbers anywhere else. The count-up
 * animation (built at P6) reads this data automatically.
 *
 * D-081 — TWO FIGURES ADVANCE BY THEMSELVES, computed on the server and
 * regenerated daily (`revalidate = 86400` on the pages that show them):
 *   Projects Delivered = 200 + 20 × (current year − 2026)
 *   Years of Continuous Delivery = current year − FOUNDED_YEAR, or —
 *     while the founding year is not on record (it is not, today) —
 *     7 + 1 × (current year − 2026)
 * The base values below are the ONLY place to change them. Sectors and
 * National Venues & Events stay manual (no `growth`).
 *
 * Source: approved Company Profile 2026, pp. 21–22, confirmed by owner
 * (D-002/A-001). The p.21 "87 contracted engagements" statement is
 * EXCLUDED from public content (C-001) — do not add it here.
 */
/** The company's founding year, once the owner confirms it (D-081). While
 *  null, "years" grows from its approved 2026 value instead. */
export const FOUNDED_YEAR: number | null = null;

export const stats: Stat[] = [
  {
    id: "projects",
    value: 200,
    suffix: "+",
    label: { en: "Projects Delivered", ar: "مشاريع منجزة" },
    asOf: 2026,
    growth: { perYear: 20 },
    source: "Company Profile 2026 p.22",
  },
  {
    id: "years",
    value: 7,
    label: { en: "Years of Continuous Delivery", ar: "سنوات من التنفيذ المتواصل" },
    asOf: 2026,
    growth: { perYear: 1 },
    source: "Company Profile 2026 p.22",
  },
  {
    id: "sectors",
    value: 16,
    suffix: "+",
    label: { en: "Sectors Served", ar: "قطاعات نخدمها" },
    asOf: 2026,
    source: "Company Profile 2026 p.22",
  },
  {
    id: "venues",
    value: 100,
    suffix: "+",
    label: { en: "National Venues & Events", ar: "منشآت وفعاليات وطنية" },
    asOf: 2026,
    source: "Company Profile 2026 p.22",
  },
];
