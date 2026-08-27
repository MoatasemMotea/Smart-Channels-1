import type { LocalizedText, Project } from "@/types/content";

/**
 * PROJECTS — source-backed records only (D-003 / Amendment 2), from the
 * approved Company Profile 2026 pp. 24–26.
 *
 * HOW TO EDIT (see docs/maintenance-model.md):
 * - `display` controls public exposure: 'logo' | 'text-only' | 'hidden'.
 *   All records ship 'text-only' — no approved standalone logo assets
 *   exist yet (O-005). Never substitute internet logos.
 * - `featured` stays false until the owner's D-004 assessment.
 * - `years`, `scope`, `services`, `media` may only be filled with
 *   owner-approved, source-backed facts. Absent field = not yet approved,
 *   NOT unknown-so-guessed.
 * - Adding a photo/video = one `media` entry; relating a Gallery item =
 *   its id in `galleryItemIds` (no duplicate files) — D-013.
 *
 * The six venue records carry years and delivered scope from p.26
 * ("Sports cities & stadiums — planned, installed and commissioned across
 * the Kingdom's major sporting venues"; scope list "What we deliver at a
 * venue"). Naming follows p.26 where it is more complete than p.24.
 */

/** Scope delivered at the p.26 sports venues (verbatim list, p.26). */
const venueScope: LocalizedText[] = [
  { en: "Fiber and internet cabling" },
  { en: "Network components & switching" },
  { en: "Server and equipment rooms" },
  { en: "Ticket booths & workstations" },
  { en: "CCTV design and installation" },
  { en: "Operations and control room" },
];

const base = { display: "text-only" as const, featured: false };

export const projects: Project[] = [
  // ---- p.24 ----
  { ...base, id: "grand-mosque-makkah", slug: "grand-mosque-makkah", name: { en: "Grand Mosque — Makkah", ar: "المسجد الحرام — مكة المكرمة" }, location: { en: "Makkah", ar: "مكة المكرمة" }, sectorIds: ["religious-holy-sites"], order: 1 },
  { ...base, id: "rcu-outdoor-alula", slug: "rcu-outdoor-entertainment-alula", name: { en: "RCU Outdoor Entertainment — AlUla", arPolicy: "latin" }, location: { en: "AlUla", ar: "العلا" }, sectorIds: ["cultural-seasons-festivals"], order: 2 },
  { ...base, id: "diriyah-season", slug: "diriyah-season", name: { en: "Diriyah Season", ar: "موسم الدرعية" }, location: { en: "Diriyah", ar: "الدرعية" }, sectorIds: ["cultural-seasons-festivals"], order: 3 },
  { ...base, id: "red-sea-film-festival", slug: "red-sea-film-festival", name: { en: "Red Sea Film Festival", ar: "مهرجان البحر الأحمر السينمائي" }, sectorIds: ["cultural-seasons-festivals"], order: 4 },
  { ...base, id: "neom-sports-village", slug: "neom-sports-village", name: { en: "NEOM Sports Village", arPolicy: "latin" }, location: { en: "NEOM", ar: "نيوم" }, sectorIds: ["giga-projects"], order: 5 },
  {
    ...base,
    id: "prince-abdullah-al-faisal",
    slug: "prince-abdullah-al-faisal-sports-city",
    name: { en: "Prince Abdullah Al-Faisal Sports City — Jeddah", ar: "مدينة الأمير عبدالله الفيصل الرياضية — جدة" },
    location: { en: "Jeddah", ar: "جدة" },
    years: { from: 2023, to: 2025 },
    scope: venueScope,
    sectorIds: ["stadiums-sports-cities"],
    order: 6,
  },
  {
    ...base,
    id: "king-abdullah-sports-city",
    slug: "king-abdullah-sports-city",
    name: { en: "King Abdullah Sports City — Jeddah", ar: "مدينة الملك عبدالله الرياضية — جدة" },
    location: { en: "Jeddah", ar: "جدة" },
    years: { from: 2023, to: 2025 },
    scope: venueScope,
    sectorIds: ["stadiums-sports-cities"],
    order: 7,
  },
  {
    ...base,
    id: "king-fahd-sports-city-taif",
    slug: "king-fahd-sports-city-taif",
    name: { en: "King Fahd Sports City — Taif", ar: "مدينة الملك فهد الرياضية — الطائف" },
    location: { en: "Taif", ar: "الطائف" },
    years: { from: 2023, to: 2024 },
    scope: venueScope,
    sectorIds: ["stadiums-sports-cities"],
    order: 8,
  },
  {
    ...base,
    id: "prince-sultan-sports-city-abha",
    slug: "prince-sultan-sports-city-abha",
    name: { en: "Prince Sultan bin Abdulaziz Sports City — Abha", ar: "مدينة الأمير سلطان بن عبدالعزيز الرياضية — أبها" },
    location: { en: "Abha", ar: "أبها" },
    years: { from: 2023, to: 2025 },
    scope: venueScope,
    sectorIds: ["stadiums-sports-cities"],
    order: 9,
  },
  { ...base, id: "riyadh-marathon", slug: "riyadh-marathon", name: { en: "Riyadh Marathon", ar: "ماراثون الرياض" }, location: { en: "Riyadh", ar: "الرياض" }, sectorIds: ["major-sporting-events"], order: 10 },
  { ...base, id: "fifa-club-world-cup-jeddah", slug: "fifa-club-world-cup-jeddah", name: { en: "FIFA Club World Cup — Jeddah", arPolicy: "latin" }, location: { en: "Jeddah", ar: "جدة" }, sectorIds: ["major-sporting-events"], order: 11 },
  { ...base, id: "afc-champions-league-elite-final", slug: "afc-champions-league-elite-final", name: { en: "AFC Champions League Elite Final", arPolicy: "latin" }, sectorIds: ["major-sporting-events"], order: 12 },
  { ...base, id: "afc-u23-championship", slug: "afc-u23-championship", name: { en: "AFC U23 Championship", arPolicy: "latin" }, sectorIds: ["major-sporting-events"], order: 13 },
  { ...base, id: "afc-u17-championship", slug: "afc-u17-championship", name: { en: "AFC U17 Championship", arPolicy: "latin" }, sectorIds: ["major-sporting-events"], order: 14 },
  { ...base, id: "world-combat-games", slug: "world-combat-games", name: { en: "World Combat Games — Riyadh 2023", arPolicy: "latin" }, location: { en: "Riyadh", ar: "الرياض" }, sectorIds: ["major-sporting-events"], order: 15 },
  { ...base, id: "f1-saudi-arabian-gp", slug: "formula-1-saudi-arabian-grand-prix", name: { en: "Formula 1 Saudi Arabian Grand Prix", arPolicy: "latin" }, location: { en: "Jeddah", ar: "جدة" }, sectorIds: ["motorsport-racing"], order: 16 },
  { ...base, id: "formula-e1-jeddah", slug: "formula-e1-jeddah", name: { en: "Formula E1 — Jeddah", arPolicy: "latin" }, location: { en: "Jeddah", ar: "جدة" }, sectorIds: ["motorsport-racing"], order: 17 },
  { ...base, id: "rally-dakar", slug: "rally-dakar", name: { en: "Rally Dakar", arPolicy: "latin" }, sectorIds: ["motorsport-racing"], order: 18 },
  { ...base, id: "alula-tour", slug: "alula-tour", name: { en: "AlUla Tour", arPolicy: "latin" }, location: { en: "AlUla", ar: "العلا" }, sectorIds: ["major-sporting-events"], order: 19 },
  { ...base, id: "pfl-venues", slug: "pfl-green-hall-boulevard-mena", name: { en: "PFL — Green Hall / Boulevard / MENA", arPolicy: "latin" }, sectorIds: ["major-sporting-events"], order: 20 },
  // ---- p.25 ----
  { ...base, id: "saudi-cup", slug: "saudi-cup", name: { en: "Saudi Cup", ar: "كأس السعودية" }, sectorIds: ["major-sporting-events"], order: 21 },
  { ...base, id: "fei-world-cup-finals", slug: "fei-world-cup-finals-riyadh", name: { en: "FEI World Cup Finals — Riyadh", arPolicy: "latin" }, location: { en: "Riyadh", ar: "الرياض" }, sectorIds: ["major-sporting-events"], order: 22 },
  { ...base, id: "longines-gct", slug: "longines-global-champions-tour", name: { en: "Longines Global Champions Tour", arPolicy: "latin" }, sectorIds: ["major-sporting-events"], order: 23 },
  { ...base, id: "alula-camel-cup", slug: "alula-camel-cup", name: { en: "AlUla Camel Cup", ar: "كأس العلا للهجن" }, location: { en: "AlUla", ar: "العلا" }, sectorIds: ["cultural-seasons-festivals"], order: 24 },
  { ...base, id: "camel-festival-tabuk", slug: "camel-festival-tabuk", name: { en: "Camel Festival — Tabuk", ar: "مهرجان الإبل — تبوك" }, location: { en: "Tabuk", ar: "تبوك" }, sectorIds: ["cultural-seasons-festivals"], order: 25 },
  { ...base, id: "wta-finals-riyadh", slug: "wta-finals-riyadh", name: { en: "WTA Finals — Riyadh", arPolicy: "latin" }, location: { en: "Riyadh", ar: "الرياض" }, sectorIds: ["major-sporting-events"], order: 26 },
  { ...base, id: "next-gen-atp-finals", slug: "next-gen-atp-finals", name: { en: "Next Gen ATP Finals", arPolicy: "latin" }, sectorIds: ["major-sporting-events"], order: 27 },
  { ...base, id: "saudi-games", slug: "saudi-games", name: { en: "Saudi Games", ar: "دورة الألعاب السعودية" }, sectorIds: ["major-sporting-events"], order: 28 },
  { ...base, id: "islamic-solidarity-games", slug: "islamic-solidarity-games-riyadh-2025", name: { en: "Islamic Solidarity Games — Riyadh 2025", ar: "دورة ألعاب التضامن الإسلامي — الرياض 2025" }, location: { en: "Riyadh", ar: "الرياض" }, sectorIds: ["major-sporting-events"], order: 29 },
  { ...base, id: "saudi-snooker-masters", slug: "saudi-arabia-snooker-masters", name: { en: "Saudi Arabia Snooker Masters", arPolicy: "latin" }, sectorIds: ["major-sporting-events"], order: 30 },
  // ---- p.26 rows not on pp.24–25 ----
  {
    ...base,
    id: "al-jawhara-stadium",
    slug: "al-jawhara-stadium-jeddah",
    name: { en: "Al Jawhara Stadium — Jeddah", ar: "ملعب الجوهرة — جدة" },
    location: { en: "Jeddah", ar: "جدة" },
    years: { from: 2023, to: 2024 },
    scope: venueScope,
    sectorIds: ["stadiums-sports-cities"],
    order: 31,
  },
  {
    ...base,
    id: "al-awal-park-king-fahd",
    slug: "al-awal-park-king-fahd-sports-city",
    name: { en: "Al Awal Park & King Fahd Sports City", arPolicy: "latin" },
    // location intentionally absent — p.26 does not state it (Amendment 2).
    years: { from: 2022, to: 2025 },
    scope: venueScope,
    sectorIds: ["stadiums-sports-cities"],
    order: 32,
  },
];
