import type { Industry } from "@/types/content";

/**
 * INDUSTRIES — the 16 approved sectors (Company Profile 2026 p.23).
 *
 * HOW TO EDIT: toggle `featured` / change `order` to control the homepage
 * showcase (Q3) — no component changes. Do not add sectors that are not
 * owner-approved. `media` stays absent until approved industry imagery
 * exists.
 */
export const industries: Industry[] = [
  { id: "major-sporting-events", name: { en: "Major Sporting Events", ar: "الفعاليات الرياضية الكبرى" }, featured: true, order: 1 },
  { id: "stadiums-sports-cities", name: { en: "Stadiums & Sports Cities", ar: "الملاعب والمدن الرياضية" }, featured: true, order: 2 },
  { id: "motorsport-racing", name: { en: "Motorsport & Racing", ar: "رياضة المحركات والسباقات" }, featured: true, order: 3 },
  { id: "cultural-seasons-festivals", name: { en: "Cultural Seasons & Festivals", ar: "المواسم الثقافية والمهرجانات" }, featured: true, order: 4 },
  { id: "government-public-sector", name: { en: "Government & Public Sector", ar: "الحكومة والقطاع العام" }, featured: true, order: 5 },
  { id: "religious-holy-sites", name: { en: "Religious & Holy Sites", ar: "المواقع الدينية والمقدسة" }, featured: false, order: 6 },
  { id: "giga-projects", name: { en: "Giga-projects", ar: "المشاريع العملاقة" }, featured: true, order: 7 },
  { id: "hospitality-fb", name: { en: "Hospitality & F&B", ar: "الضيافة والأغذية والمشروبات" }, featured: true, order: 8 },
  { id: "healthcare", name: { en: "Healthcare", ar: "الرعاية الصحية" }, featured: false, order: 9 },
  { id: "education", name: { en: "Education", ar: "التعليم" }, featured: false, order: 10 },
  { id: "banking-finance", name: { en: "Banking & Finance", ar: "البنوك والقطاع المالي" }, featured: false, order: 11 },
  { id: "industrial-energy", name: { en: "Industrial & Energy", ar: "الصناعة والطاقة" }, featured: false, order: 12 },
  { id: "transport-rail", name: { en: "Transport & Rail", ar: "النقل والسكك الحديدية" }, featured: false, order: 13 },
  { id: "diplomatic-missions", name: { en: "Diplomatic Missions", ar: "البعثات الدبلوماسية" }, featured: false, order: 14 },
  { id: "retail-malls", name: { en: "Retail & Malls", ar: "التجزئة والمراكز التجارية" }, featured: false, order: 15 },
  { id: "media-broadcast", name: { en: "Media & Broadcast", ar: "الإعلام والبث" }, featured: false, order: 16 },
];
