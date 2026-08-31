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
      // low-res source presented whole on a plate matched to its own
      // white studio background — never upscaled, never cropped (§12)
      fit: "contain",
      plate: "white",
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
    image: {
      src: "/media/products/laptop.webp",
      width: 1200,
      height: 1800,
      fit: "cover",
      focus: "58% 56%",
      alt: { en: "Open laptop on a white pedestal in soft daylight", ar: "حاسوب محمول مفتوح على قاعدة بيضاء بإضاءة نهارية ناعمة" }, // AR authored (D-006) — owner review pending
    },
    featured: false,
    published: true,
    sortOrder: 4,
  },
  {
    id: "multi-charger",
    slug: "multi-charger",
    name: { en: "Multi Charger", arPolicy: "latin" },
    /* owner decision: Multi Charger and T60 SHARE this single combined
       product photograph — no duplicated or fabricated media (§1) */
    image: {
      src: "/media/products/multi-charger-t60.webp",
      width: 500,
      height: 500,
      fit: "contain",
      plate: "white",
      alt: { en: "Six handheld two-way radios docked in a multi-bay charging station", ar: "ستة أجهزة اتصال لاسلكي محمولة في محطة شحن متعددة المنافذ" }, // AR authored (D-006) — owner review pending
    },
    featured: false,
    published: true,
    sortOrder: 5,
  },
  {
    id: "t60",
    slug: "t60",
    name: { en: "T60", arPolicy: "latin" },
    /* SAME source as Multi Charger (owner decision — shared media) */
    image: {
      src: "/media/products/multi-charger-t60.webp",
      width: 500,
      height: 500,
      fit: "contain",
      plate: "white",
      alt: { en: "Handheld two-way radios shown with their multi-bay charging station", ar: "أجهزة اتصال لاسلكي محمولة مع محطة الشحن متعددة المنافذ" }, // AR authored (D-006) — owner review pending
    },
    featured: false,
    published: true,
    sortOrder: 6,
  },
  {
    id: "sfp",
    slug: "sfp",
    name: { en: "SFP", arPolicy: "latin" },
    image: {
      src: "/media/products/sfp.webp",
      width: 1600,
      height: 1065,
      fit: "cover",
      focus: "48% 46%",
      alt: { en: "Hand inserting an optical SFP transceiver into a line card", ar: "يد تُركّب وحدة إرسال ضوئية SFP في بطاقة شبكة" }, // AR authored (D-006) — owner review pending
    },
    featured: false,
    published: true,
    sortOrder: 7,
  },
  {
    id: "firewall",
    slug: "firewall",
    name: { en: "Firewall", arPolicy: "latin" },
    /* PRODUCT-MEDIA-01 (still OPEN): the owner-approved INTERIM visual
       is real data-centre hardware, NOT a physical firewall appliance —
       it stays flagged provisional until a true appliance photograph is
       supplied (owner decision 2026-08-31). The delivery path is
       deliberately DISTINCT from the superseded conceptual visual's —
       reusing a path for different bytes serves stale variants from
       image/CDN caches. */
    image: {
      src: "/media/products/firewall-interim.webp",
      width: 1200,
      height: 1804,
      fit: "cover",
      // portrait source into a landscape window: the vertical focal
      // point decides the crop — 62% favours the rack faces and
      // cabling over the blank corridor wall
      focus: "50% 62%",
      provisional: true,
      alt: { en: "Data-centre aisle lined with equipment cabinets and status indicators", ar: "ممر في مركز بيانات تصطف على جانبيه خزائن المعدات ومؤشرات التشغيل" }, // AR authored (D-006) — owner review pending
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
    /* transparent-background studio cutout — presented whole on a
       neutral plate; a cover crop would clip the chassis ends (§9) */
    image: {
      src: "/media/products/core-switch.webp",
      width: 900,
      height: 600,
      fit: "contain",
      plate: "light",
      alt: { en: "Rack-mount core switch with fibre and ethernet port banks", ar: "محوّل أساسي بحجم الرف بمنافذ ألياف وإيثرنت" }, // AR authored (D-006) — owner review pending
    },
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
    image: {
      src: "/media/products/printers.webp",
      width: 1600,
      height: 1066,
      fit: "cover",
      focus: "34% 55%",
      alt: { en: "Office multifunction printer being operated at a workplace", ar: "طابعة مكتبية متعددة الوظائف أثناء التشغيل في بيئة عمل" }, // AR authored (D-006) — owner review pending
    },
    featured: false,
    published: true,
    sortOrder: 13,
  },
  {
    id: "nvr",
    slug: "nvr",
    name: { en: "NVR", arPolicy: "latin" },
    /* owner decision 2026-08-31: the visible manufacturer branding in
       this photograph is explicitly ACCEPTED and must never be removed,
       blurred, cropped out or recoloured to hide it. The plate matches
       the source's own white studio background (verified by sampling,
       not by eye). */
    image: {
      src: "/media/products/nvr.webp",
      width: 800,
      height: 800,
      fit: "contain",
      plate: "white",
      alt: { en: "Network video recorder unit, front three-quarter view", ar: "جهاز تسجيل فيديو شبكي بمنظور أمامي ثلاثة أرباع" }, // AR authored (D-006) — owner review pending
    },
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
    image: {
      src: "/media/products/tablet.webp",
      width: 1600,
      height: 1067,
      fit: "cover",
      focus: "45% 48%",
      alt: { en: "Hand using a stylus on a tablet screen at a desk", ar: "يد تستخدم قلماً رقمياً على شاشة جهاز لوحي على مكتب" }, // AR authored (D-006) — owner review pending
    },
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
