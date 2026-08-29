import type { Partner } from "@/types/content";

/**
 * TECHNOLOGY ALLIANCES — vendor names from the approved Company Profile
 * 2026 p.28 ("Certified vendor partnerships"), in page order.
 *
 * HOW TO EDIT: toggle `enabled` to show/hide a record; logos are the
 * owner-approved marks extracted at 300 DPI from the profile's p.28 grid
 * (P5 logo revision) — replace `logo.src` with an official vendor asset
 * to upgrade quality (never substitute internet logos, D-005). Vendor
 * names remain the accessible labels in their official Latin form (Q5).
 * `domains` is intentionally omitted: the profile does not map vendors to
 * domains individually (Amendment 2 — no inference).
 */
const name = (en: string): Partner["name"] => ({ en, arPolicy: "latin" });

export const partners: Partner[] = [
  { id: "cisco", name: name("Cisco"), logo: { src: "/media/logos/alliances/cisco.webp", quality: "pdf-extract" }, enabled: true, order: 1 },
  { id: "aruba", name: name("Aruba (HPE)"), logo: { src: "/media/logos/alliances/aruba.webp", quality: "pdf-extract" }, enabled: true, order: 2 },
  { id: "huawei", name: name("Huawei"), logo: { src: "/media/logos/alliances/huawei.webp", quality: "pdf-extract" }, enabled: true, order: 3 },
  { id: "hpe", name: name("HPE"), logo: { src: "/media/logos/alliances/hpe.webp", quality: "pdf-extract" }, enabled: true, order: 4 },
  { id: "juniper", name: name("Juniper Networks"), logo: { src: "/media/logos/alliances/juniper.webp", quality: "pdf-extract" }, enabled: true, order: 5 },
  { id: "h3c", name: name("H3C"), logo: { src: "/media/logos/alliances/h3c.webp", quality: "pdf-extract" }, enabled: true, order: 6 },
  { id: "ruijie", name: name("Ruijie"), logo: { src: "/media/logos/alliances/ruijie.webp", quality: "pdf-extract" }, enabled: true, order: 7 },
  { id: "unifi", name: name("UniFi Network"), logo: { src: "/media/logos/alliances/unifi.webp", quality: "pdf-extract" }, enabled: true, order: 8 },
  { id: "dlink", name: name("D-Link"), logo: { src: "/media/logos/alliances/dlink.webp", quality: "pdf-extract" }, enabled: true, order: 9 },
  { id: "linksys", name: name("Linksys"), logo: { src: "/media/logos/alliances/linksys.webp", quality: "pdf-extract" }, enabled: true, order: 10 },
  { id: "extell", name: name("ExTell"), logo: { src: "/media/logos/alliances/extell.webp", quality: "pdf-extract" }, enabled: true, order: 11 },
  { id: "grandstream", name: name("Grandstream"), logo: { src: "/media/logos/alliances/grandstream.webp", quality: "pdf-extract" }, enabled: true, order: 12 },
  { id: "fortinet", name: name("Fortinet"), logo: { src: "/media/logos/alliances/fortinet.webp", quality: "pdf-extract" }, enabled: true, order: 13 },
  { id: "paloalto", name: name("Palo Alto Networks"), logo: { src: "/media/logos/alliances/paloalto.webp", quality: "pdf-extract" }, enabled: true, order: 14 },
  { id: "hikvision", name: name("Hikvision"), logo: { src: "/media/logos/alliances/hikvision.webp", quality: "pdf-extract" }, enabled: true, order: 15 },
  { id: "dahua", name: name("Dahua Technology"), logo: { src: "/media/logos/alliances/dahua.webp", quality: "pdf-extract" }, enabled: true, order: 16 },
  { id: "hanwha", name: name("Hanwha Vision"), logo: { src: "/media/logos/alliances/hanwha.webp", quality: "pdf-extract" }, enabled: true, order: 17 },
  { id: "bosch", name: name("Bosch"), logo: { src: "/media/logos/alliances/bosch.webp", quality: "pdf-extract" }, enabled: true, order: 18 },
  { id: "dallmeier", name: name("Dallmeier"), logo: { src: "/media/logos/alliances/dallmeier.webp", quality: "pdf-extract" }, enabled: true, order: 19 },
  { id: "honeywell", name: name("Honeywell"), logo: { src: "/media/logos/alliances/honeywell.webp", quality: "pdf-extract" }, enabled: true, order: 20 },
  { id: "axis", name: name("Axis Communications"), logo: { src: "/media/logos/alliances/axis.webp", quality: "pdf-extract" }, enabled: true, order: 21 },
  { id: "dell", name: name("Dell Technologies"), logo: { src: "/media/logos/alliances/dell.webp", quality: "pdf-extract" }, enabled: true, order: 22 },
  { id: "lenovo", name: name("Lenovo"), logo: { src: "/media/logos/alliances/lenovo.webp", quality: "pdf-extract" }, enabled: true, order: 23 },
  { id: "asus", name: name("ASUS"), logo: { src: "/media/logos/alliances/asus.webp", quality: "pdf-extract" }, enabled: true, order: 24 },
  { id: "westerndigital", name: name("Western Digital"), logo: { src: "/media/logos/alliances/westerndigital.webp", quality: "pdf-extract" }, enabled: true, order: 25 },
  { id: "jupiter", name: name("Jupiter Systems"), logo: { src: "/media/logos/alliances/jupiter.webp", quality: "pdf-extract" }, enabled: true, order: 26 },
  { id: "synology", name: name("Synology"), logo: { src: "/media/logos/alliances/synology.webp", quality: "pdf-extract" }, enabled: true, order: 27 },
  { id: "aws", name: name("AWS"), logo: { src: "/media/logos/alliances/aws.webp", quality: "pdf-extract" }, enabled: true, order: 28 },
  { id: "corning", name: name("Corning"), logo: { src: "/media/logos/alliances/corning.webp", quality: "pdf-extract" }, enabled: true, order: 29 },
  { id: "commscope", name: name("CommScope"), logo: { src: "/media/logos/alliances/commscope.webp", quality: "pdf-extract" }, enabled: true, order: 30 },
  { id: "datwyler", name: name("Datwyler"), logo: { src: "/media/logos/alliances/datwyler.webp", quality: "pdf-extract" }, enabled: true, order: 31 },
  { id: "belden", name: name("Belden"), logo: { src: "/media/logos/alliances/belden.webp", quality: "pdf-extract" }, enabled: true, order: 32 },
  { id: "zebra", name: name("Zebra"), logo: { src: "/media/logos/alliances/zebra.webp", quality: "pdf-extract" }, enabled: true, order: 33 },
  { id: "eaton", name: name("Eaton"), logo: { src: "/media/logos/alliances/eaton.webp", quality: "pdf-extract" }, enabled: true, order: 34 },
  { id: "apc", name: name("APC by Schneider Electric"), logo: { src: "/media/logos/alliances/apc.webp", quality: "pdf-extract" }, enabled: true, order: 35 },
  { id: "samsung", name: name("Samsung"), logo: { src: "/media/logos/alliances/samsung.webp", quality: "pdf-extract" }, enabled: true, order: 36 },
  { id: "lg", name: name("LG"), logo: { src: "/media/logos/alliances/lg.webp", quality: "pdf-extract" }, enabled: true, order: 37 },
  { id: "sony", name: name("Sony"), logo: { src: "/media/logos/alliances/sony.webp", quality: "pdf-extract" }, enabled: true, order: 38 },
  { id: "philips", name: name("Philips"), logo: { src: "/media/logos/alliances/philips.webp", quality: "pdf-extract" }, enabled: true, order: 39 },
  { id: "epson", name: name("Epson"), logo: { src: "/media/logos/alliances/epson.webp", quality: "pdf-extract" }, enabled: true, order: 40 },
  { id: "panasonic", name: name("Panasonic"), logo: { src: "/media/logos/alliances/panasonic.webp", quality: "pdf-extract" }, enabled: true, order: 41 },
];
