import type { Partner } from "@/types/content";

/**
 * TECHNOLOGY ALLIANCES — vendor names from the approved Company Profile
 * 2026 p.28 ("Certified vendor partnerships"), in page order.
 *
 * HOW TO EDIT: toggle `enabled` to show/hide a record; add `logo` only
 * when an approved-quality asset exists (D-005/O-005 — never substitute
 * internet logos). Vendor names keep their official Latin form (Q5).
 * `domains` is intentionally omitted: the profile does not map vendors to
 * domains individually (Amendment 2 — no inference).
 */
const name = (en: string): Partner["name"] => ({ en, arPolicy: "latin" });

export const partners: Partner[] = [
  { id: "cisco", name: name("Cisco"), enabled: true, order: 1 },
  { id: "aruba", name: name("Aruba (HPE)"), enabled: true, order: 2 },
  { id: "huawei", name: name("Huawei"), enabled: true, order: 3 },
  { id: "hpe", name: name("HPE"), enabled: true, order: 4 },
  { id: "juniper", name: name("Juniper Networks"), enabled: true, order: 5 },
  { id: "h3c", name: name("H3C"), enabled: true, order: 6 },
  { id: "ruijie", name: name("Ruijie"), enabled: true, order: 7 },
  { id: "unifi", name: name("UniFi Network"), enabled: true, order: 8 },
  { id: "dlink", name: name("D-Link"), enabled: true, order: 9 },
  { id: "linksys", name: name("Linksys"), enabled: true, order: 10 },
  { id: "extell", name: name("ExTell"), enabled: true, order: 11 },
  { id: "grandstream", name: name("Grandstream"), enabled: true, order: 12 },
  { id: "fortinet", name: name("Fortinet"), enabled: true, order: 13 },
  { id: "paloalto", name: name("Palo Alto Networks"), enabled: true, order: 14 },
  { id: "hikvision", name: name("Hikvision"), enabled: true, order: 15 },
  { id: "dahua", name: name("Dahua Technology"), enabled: true, order: 16 },
  { id: "hanwha", name: name("Hanwha Vision"), enabled: true, order: 17 },
  { id: "bosch", name: name("Bosch"), enabled: true, order: 18 },
  { id: "dallmeier", name: name("Dallmeier"), enabled: true, order: 19 },
  { id: "honeywell", name: name("Honeywell"), enabled: true, order: 20 },
  { id: "axis", name: name("Axis Communications"), enabled: true, order: 21 },
  { id: "dell", name: name("Dell Technologies"), enabled: true, order: 22 },
  { id: "lenovo", name: name("Lenovo"), enabled: true, order: 23 },
  { id: "asus", name: name("ASUS"), enabled: true, order: 24 },
  { id: "westerndigital", name: name("Western Digital"), enabled: true, order: 25 },
  { id: "jupiter", name: name("Jupiter Systems"), enabled: true, order: 26 },
  { id: "synology", name: name("Synology"), enabled: true, order: 27 },
  { id: "aws", name: name("AWS"), enabled: true, order: 28 },
  { id: "corning", name: name("Corning"), enabled: true, order: 29 },
  { id: "commscope", name: name("CommScope"), enabled: true, order: 30 },
  { id: "datwyler", name: name("Datwyler"), enabled: true, order: 31 },
  { id: "belden", name: name("Belden"), enabled: true, order: 32 },
  { id: "zebra", name: name("Zebra"), enabled: true, order: 33 },
  { id: "eaton", name: name("Eaton"), enabled: true, order: 34 },
  { id: "apc", name: name("APC by Schneider Electric"), enabled: true, order: 35 },
  { id: "samsung", name: name("Samsung"), enabled: true, order: 36 },
  { id: "lg", name: name("LG"), enabled: true, order: 37 },
  { id: "sony", name: name("Sony"), enabled: true, order: 38 },
  { id: "philips", name: name("Philips"), enabled: true, order: 39 },
  { id: "epson", name: name("Epson"), enabled: true, order: 40 },
  { id: "panasonic", name: name("Panasonic"), enabled: true, order: 41 },
];
