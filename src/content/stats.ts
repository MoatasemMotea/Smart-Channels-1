import type { Stat } from "@/types/content";

/**
 * TRACK RECORD — the ONLY place these figures exist (D-002).
 *
 * HOW TO EDIT: change `value`/`suffix` and update `asOf` if the reporting
 * year changed. Never duplicate these numbers anywhere else. The count-up
 * animation (built at P6) reads this data automatically.
 *
 * Source: approved Company Profile 2026, pp. 21–22, confirmed by owner
 * (D-002/A-001). The p.21 "87 contracted engagements" statement is
 * EXCLUDED from public content (C-001) — do not add it here.
 */
export const stats: Stat[] = [
  {
    id: "projects",
    value: 200,
    suffix: "+",
    label: { en: "Projects Delivered", ar: "مشاريع منجزة" },
    asOf: 2026,
    source: "Company Profile 2026 p.22",
  },
  {
    id: "years",
    value: 7,
    label: { en: "Years of Continuous Delivery", ar: "سنوات من التنفيذ المتواصل" },
    asOf: 2026,
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
