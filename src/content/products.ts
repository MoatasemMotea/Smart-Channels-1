import type { CatalogProduct } from "@/types/content";

/**
 * PRODUCTS (D-034 architecture · D-052 owner population).
 *
 * The 22 records below are the OWNER-APPROVED product categories
 * (2026-08-31 Products directive §2, names verbatim). This is a
 * capability/category presentation, NOT an e-commerce store: no model
 * numbers, manufacturers, specifications, prices or stock — and none
 * may be added without explicit owner approval.
 *
 * IMAGERY: only the four owner-supplied photographs are mapped
 * (media-source/images/products/MAPPING.md — binding). Categories
 * without approved imagery render the designed media-pending motif;
 * adding a photograph later = fill `image` on the record (pure data,
 * no component changes). `summary`/`importance` stay ABSENT until the
 * owner approves copy.
 *
 * ARABIC NAMES: rendered via arPolicy "latin" (the approved EN name)
 * — approved Arabic category terminology is an OPEN ITEM
 * (PRODUCT-AR-NAMES); nothing specialized is invented (§14).
 *
 * RIGHTS: the four images are OWNER-SUPPLIED — PUBLICATION RIGHTS TO
 * BE CONFIRMED BEFORE FINAL LAUNCH (PRODUCT-MEDIA-RIGHTS).
 */
export const products: CatalogProduct[] = [
  {
    id: "switch",
    slug: "switch",
    name: { en: "Switch", arPolicy: "latin" },
    image: {
      src: "/media/products/01-switch.webp",
      width: 500,
      height: 270,
      // low-res source presented whole on a light plate — never
      // upscaled, never cropping the physical device (§12)
      fit: "contain",
      alt: { en: "Compact PoE network switch with ethernet and SFP ports", ar: "محوّل شبكة مدمج بمنافذ إيثرنت وSFP" }, // AR authored (D-006) — owner review pending
    },
    featured: true,
    featuredOrder: 1,
    published: true,
    sortOrder: 1,
  },
  {
    id: "access-points",
    slug: "access-points",
    name: { en: "Access Points", arPolicy: "latin" },
    image: {
      src: "/media/products/02-access-points.webp",
      width: 1600,
      height: 1067,
      fit: "cover",
      focus: "62% 30%",
      alt: { en: "Compact white wireless device mounted on an interior wall", ar: "جهاز لاسلكي أبيض مثبّت على جدار داخلي" }, // AR authored (D-006) — owner review pending
    },
    featured: true,
    featuredOrder: 2,
    published: true,
    sortOrder: 2,
  },
  {
    id: "router",
    slug: "router",
    name: { en: "Router", arPolicy: "latin" },
    featured: false,
    published: true,
    sortOrder: 3,
  },
  {
    id: "laptop",
    slug: "laptop",
    name: { en: "Laptop", arPolicy: "latin" },
    featured: false,
    published: true,
    sortOrder: 4,
  },
  {
    id: "multi-charger",
    slug: "multi-charger",
    name: { en: "Multi Charger", arPolicy: "latin" },
    featured: false,
    published: true,
    sortOrder: 5,
  },
  {
    id: "t60",
    slug: "t60",
    name: { en: "T60", arPolicy: "latin" },
    featured: false,
    published: true,
    sortOrder: 6,
  },
  {
    id: "sfp",
    slug: "sfp",
    name: { en: "SFP", arPolicy: "latin" },
    featured: false,
    published: true,
    sortOrder: 7,
  },
  {
    id: "firewall",
    slug: "firewall",
    name: { en: "Firewall", arPolicy: "latin" },
    /* PRODUCT-MEDIA-01: TEMPORARY conceptual visual — not a physical
       firewall appliance; replace via data edit when the owner supplies
       an approved product photograph. */
    image: {
      src: "/media/products/04-firewall.webp",
      width: 1600,
      height: 1066,
      fit: "cover",
      focus: "50% 45%",
      provisional: true,
      alt: { en: "Conceptual cybersecurity visual — the word Security on a dark screen", ar: "صورة تعبيرية للأمن السيبراني — كلمة Security على شاشة داكنة" }, // AR authored (D-006) — owner review pending
    },
    featured: true,
    featuredOrder: 4,
    published: true,
    sortOrder: 8,
  },
  {
    id: "core-switch",
    slug: "core-switch",
    name: { en: "Core Switch", arPolicy: "latin" },
    featured: false,
    published: true,
    sortOrder: 9,
  },
  {
    id: "monitor",
    slug: "monitor",
    name: { en: "Monitor", arPolicy: "latin" },
    featured: false,
    published: true,
    sortOrder: 10,
  },
  {
    id: "pc",
    slug: "pc",
    name: { en: "PC", arPolicy: "latin" },
    featured: false,
    published: true,
    sortOrder: 11,
  },
  {
    id: "ups",
    slug: "ups",
    name: { en: "UPS", arPolicy: "latin" },
    featured: false,
    published: true,
    sortOrder: 12,
  },
  {
    id: "printers",
    slug: "printers",
    name: { en: "Printers", arPolicy: "latin" },
    featured: false,
    published: true,
    sortOrder: 13,
  },
  {
    id: "nvr",
    slug: "nvr",
    name: { en: "NVR", arPolicy: "latin" },
    featured: false,
    published: true,
    sortOrder: 14,
  },
  {
    id: "hard-disk",
    slug: "hard-disk",
    name: { en: "Hard Disk", arPolicy: "latin" },
    featured: false,
    published: true,
    sortOrder: 15,
  },
  {
    id: "decoder",
    slug: "decoder",
    name: { en: "Decoder", arPolicy: "latin" },
    featured: false,
    published: true,
    sortOrder: 16,
  },
  {
    id: "face-recognition-terminals",
    slug: "face-recognition-terminals",
    name: { en: "Face Recognition Terminals", arPolicy: "latin" },
    featured: false,
    published: true,
    sortOrder: 17,
  },
  {
    id: "camera",
    slug: "camera",
    name: { en: "Camera", arPolicy: "latin" },
    image: {
      src: "/media/products/03-camera.webp",
      width: 1365,
      height: 2048,
      fit: "cover",
      focus: "50% 42%",
      alt: { en: "Fixed and dome surveillance cameras mounted on a pole against a clear sky", ar: "كاميرات مراقبة ثابتة وقبة مثبتة على عمود تحت سماء صافية" }, // AR authored (D-006) — owner review pending
    },
    featured: true,
    featuredOrder: 3,
    published: true,
    sortOrder: 18,
  },
  {
    id: "tablet",
    slug: "tablet",
    name: { en: "Tablet", arPolicy: "latin" },
    featured: false,
    published: true,
    sortOrder: 19,
  },
  {
    id: "hdmi-extender",
    slug: "hdmi-extender",
    name: { en: "HDMI Extender", arPolicy: "latin" },
    featured: false,
    published: true,
    sortOrder: 20,
  },
  {
    id: "ac-adapter",
    slug: "ac-adapter",
    name: { en: "AC Adapter", arPolicy: "latin" },
    featured: false,
    published: true,
    sortOrder: 21,
  },
  {
    id: "media-converter",
    slug: "media-converter",
    name: { en: "Media Converter", arPolicy: "latin" },
    featured: false,
    published: true,
    sortOrder: 22,
  },
];
