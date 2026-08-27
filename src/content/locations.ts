import type { LocalizedText } from "@/types/content";

/**
 * GEOGRAPHIC EVIDENCE LOCATIONS (D-017/K-13) — owner-editable.
 *
 * HOW TO EDIT: latitude/longitude are the canonical coordinates (city
 * center is fine); screen positions are derived by tooling — never type
 * x/y by hand. Every non-HQ location MUST reference at least one approved
 * project record id (validated). `appearsInOpening` controls the opening
 * scene; the P6 Track Record scene uses the full list.
 *
 * Do NOT add cities, offices, or Gulf locations without owner-approved
 * source backing (Amendment 2 / D-5). Riyadh is the HQ (approved contact,
 * profile p.31) and the only labeled location in the opening (C-4/D-5).
 */
export interface MapLocation {
  id: string;
  name: LocalizedText;
  latitude: number;
  longitude: number;
  kind: "hq" | "venue-city";
  projectIds: string[];
  appearsInOpening: boolean;
  priority: number;
}

export const locations: MapLocation[] = [
  {
    id: "riyadh",
    name: { en: "Riyadh", ar: "الرياض" },
    latitude: 24.71,
    longitude: 46.68,
    kind: "hq",
    // HQ per approved contact (p.31); Riyadh-delivered projects (pp.24–25):
    projectIds: ["riyadh-marathon", "wta-finals-riyadh", "world-combat-games", "islamic-solidarity-games", "fei-world-cup-finals"],
    appearsInOpening: true,
    priority: 1,
  },
  {
    id: "jeddah",
    name: { en: "Jeddah", ar: "جدة" },
    latitude: 21.54,
    longitude: 39.17,
    kind: "venue-city",
    projectIds: ["king-abdullah-sports-city", "prince-abdullah-al-faisal", "al-jawhara-stadium", "f1-saudi-arabian-gp", "fifa-club-world-cup-jeddah", "formula-e1-jeddah"],
    appearsInOpening: true,
    priority: 2,
  },
  {
    id: "makkah",
    name: { en: "Makkah", ar: "مكة المكرمة" },
    latitude: 21.42,
    longitude: 39.83,
    kind: "venue-city",
    projectIds: ["grand-mosque-makkah"],
    appearsInOpening: true,
    priority: 3,
  },
  {
    id: "alula",
    name: { en: "AlUla", ar: "العلا" },
    latitude: 26.61,
    longitude: 37.93,
    kind: "venue-city",
    projectIds: ["rcu-outdoor-alula", "alula-tour", "alula-camel-cup"],
    appearsInOpening: true,
    priority: 4,
  },
  {
    id: "abha",
    name: { en: "Abha", ar: "أبها" },
    latitude: 18.22,
    longitude: 42.51,
    kind: "venue-city",
    projectIds: ["prince-sultan-sports-city-abha"],
    appearsInOpening: true,
    priority: 5,
  },
  {
    id: "neom",
    name: { en: "NEOM", ar: "نيوم" },
    latitude: 28.1,
    longitude: 35.25,
    kind: "venue-city",
    projectIds: ["neom-sports-village"],
    appearsInOpening: true,
    priority: 6,
  },
  {
    id: "diriyah",
    name: { en: "Diriyah", ar: "الدرعية" },
    latitude: 24.74,
    longitude: 46.57,
    kind: "venue-city",
    projectIds: ["diriyah-season"],
    appearsInOpening: true,
    priority: 7,
  },
  {
    id: "taif",
    name: { en: "Taif", ar: "الطائف" },
    latitude: 21.27,
    longitude: 40.42,
    kind: "venue-city",
    projectIds: ["king-fahd-sports-city-taif"],
    appearsInOpening: false, // visually clusters with Makkah in the opening; P6 uses it
    priority: 8,
  },
  {
    id: "tabuk",
    name: { en: "Tabuk", ar: "تبوك" },
    latitude: 28.38,
    longitude: 36.57,
    kind: "venue-city",
    projectIds: ["camel-festival-tabuk"],
    appearsInOpening: false, // visually clusters with NEOM in the opening; P6 uses it
    priority: 9,
  },
];
