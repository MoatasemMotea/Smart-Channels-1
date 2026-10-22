import { partners } from "./partners";
import { clients } from "./clients";
import { arabicPending } from "./arabic-pending";

/**
 * LANGUAGE ALLOW-LIST (D-081) — the ONLY text allowed in the other
 * script. On an Arabic page: brands and technical terms in Latin (each
 * wrapped lang="en" by <LangText>); on an English page: the two Arabic
 * marks the design shows on purpose (each wrapped lang="ar"). Anything
 * else in the wrong script fails the language smoke test.
 *
 * HOW TO EDIT: a new partner or an international client is picked up
 * from its record automatically; add a technical term to TECH_TERMS; an
 * unknown official Arabic name goes to arabic-pending.ts, not here.
 */

/** brands: the 41 technology partners, international clients (arPolicy
 *  latin), the company's own name, and vendor/event marks that appear
 *  inside approved copy */
export const BRANDS: string[] = [
  "Smart Channels",
  ...partners.map((p) => p.name.en),
  ...clients.filter((c) => c.name.arPolicy === "latin").map((c) => c.name.en),
  "Avaya",
  "Alcatel",
  "FIFA",
  // D-082: series marks kept in Latin inside the official Arabic project names
  "PFL",
  "E1",
];

/** D-082: the company's registered Arabic (legal) name — commercial register.
 *  Arabic, so always at home on Arabic pages; carried by the Arabic
 *  Organization JSON-LD as `legalName`. "Smart Channels" stays the brand. */
export const LEGAL_NAME_AR = "شركة القنوات الذكية";

/** technical terms and standards kept in Latin inside Arabic sentences */
export const TECH_TERMS: string[] = [
  "5G", "AI", "AMC", "ANPR", "AV", "CATV", "CCTV", "CTI", "HDMI", "IP", "IPTV", "IT", "LPR",
  "MPO", "MTP", "NVR", "PBX", "PoE", "PTT", "SFP", "UPS", "VPN", "Wi-Fi", "Cat", "6A",
];

/** names awaiting their official Arabic (accepted, and listed, by the test) */
export const PENDING_LATIN: string[] = arabicPending.map((p) => p.en);

/** identifiers that are not language at all */
export const IDENTIFIER = /^(?:[\w.+-]+@[\w-]+(?:\.[\w-]+)+|https?:\/\/\S+|[\w-]+(?:\.[\w-]+)+\/?\S*)$/;

/** Latin shown on purpose on Arabic pages: the language switcher names
 *  English in English, and the counterpart-language echo under two
 *  section titles (D-042, decorative, aria-hidden) */
export const LATIN_ON_AR: string[] = ["English", "Technology Alliances", "Our Clients"];

/** Arabic shown on purpose on English pages (switcher + counterpart echo) */
export const ARABIC_ON_EN: string[] = ["العربية", "التحالفات التقنية", "عملاؤنا"];
