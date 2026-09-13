import type { CatalogProduct } from "@/types/content";

/**
 * PRODUCTS (D-034 architecture · D-052 owner population · D-058 media
 * intake).
 *
 * The records below are the OWNER-APPROVED product categories: the 22
 * of the 2026-08-31 Products directive §2, plus the two the owner's
 * 2026-09 photography intake introduced (D-058 §2 — the filename is the
 * only source of a name, and "Access Control" and "P2P" arrived as
 * files that matched no existing record). This is a capability/category
 * presentation, NOT an e-commerce store: no model numbers,
 * manufacturers, specifications, prices or stock — and none may be
 * added without explicit owner approval.
 *
 * IMAGERY: every mapped photograph is OWNER-SUPPLIED (provenance in
 * media-source/images/products/MAPPING.md — binding). Categories
 * without approved imagery render the designed media-pending motif;
 * adding a photograph later = fill `image` on the record (pure data,
 * no component changes). `summary`/`importance` stay ABSENT until the
 * owner approves copy.
 *
 * ARABIC NAMES: rendered via arPolicy "latin" (the approved EN name)
 * — approved Arabic category terminology is an OPEN ITEM
 * (PRODUCT-AR-NAMES); nothing specialized is invented (§14).
 *
 * RIGHTS: all images are OWNER-SUPPLIED — PUBLICATION RIGHTS TO BE
 * CONFIRMED BEFORE FINAL LAUNCH (PRODUCT-MEDIA-RIGHTS).
 *
 * DELIVERY PATHS are never reused for different bytes (D-053): the
 * D-058 set lives at /media/products/<slug>-2026.webp beside the
 * files it replaced.
 */
export const products: CatalogProduct[] = [
  {
    id: "switch",
    slug: "switch",
    name: { en: "Switch", arPolicy: "latin" },
    /* transparent cut-out (D-058) — presented whole on the card canvas */
    image: {
      src: "/media/products/switch-2026.webp",
      width: 1200,
      height: 353,
      fit: "contain",
      alt: { en: "Rack-mount network switch with 48 ethernet ports and SFP uplinks, front view", ar: "محوّل شبكة بحجم الرف بـ48 منفذ إيثرنت ووصلات SFP، منظور أمامي" }, // AR authored (D-006) — owner review pending
    },
    featured: false,
    published: true,
    sortOrder: 1,
  },
  {
    id: "access-points",
    slug: "access-points",
    name: { en: "Access Points", arPolicy: "latin" },
    /* transparent cut-out (D-058) */
    image: {
      src: "/media/products/access-points-2026.webp",
      width: 1200,
      height: 820,
      fit: "contain",
      alt: { en: "Ceiling-mount wireless access point, a white disc with a blue status ring", ar: "نقطة وصول لاسلكية سقفية، قرص أبيض بحلقة حالة زرقاء" }, // AR authored (D-006) — owner review pending
    },
    featured: false,
    published: true,
    sortOrder: 2,
  },
  {
    id: "router",
    slug: "router",
    name: { en: "Router", arPolicy: "latin" },
    /* transparent cut-out (D-058) */
    image: {
      src: "/media/products/router-2026.webp",
      width: 1200,
      height: 436,
      fit: "contain",
      alt: { en: "Desktop router with four external antennas and rear ethernet ports", ar: "موجّه مكتبي بأربعة هوائيات خارجية ومنافذ إيثرنت خلفية" }, // AR authored (D-006) — owner review pending
    },
    featured: false,
    published: true,
    sortOrder: 3,
  },
  {
    id: "laptop",
    slug: "laptop",
    name: { en: "Laptop", arPolicy: "latin" },
    /* transparent cut-out (D-058) */
    image: {
      src: "/media/products/laptop-2026.webp",
      width: 1200,
      height: 811,
      fit: "contain",
      alt: { en: "Open laptop, front three-quarter view", ar: "حاسوب محمول مفتوح بمنظور أمامي ثلاثة أرباع" }, // AR authored (D-006) — owner review pending
    },
    featured: true,
    featuredOrder: 3,
    published: true,
    sortOrder: 4,
  },
  {
    id: "multi-charger",
    slug: "multi-charger",
    name: { en: "Multi Charger", arPolicy: "latin" },
    /* transparent cut-out (D-058) — its OWN photograph now; the earlier
       shared Multi Charger/T60 file is superseded */
    image: {
      src: "/media/products/multi-charger-2026.webp",
      width: 1200,
      height: 552,
      fit: "contain",
      alt: { en: "Six-bay charging station with handheld two-way radios docked", ar: "محطة شحن بست فتحات مع أجهزة اتصال لاسلكي محمولة موصولة" }, // AR authored (D-006) — owner review pending
    },
    featured: false,
    published: true,
    sortOrder: 5,
  },
  {
    id: "t60",
    slug: "t60",
    name: { en: "T60", arPolicy: "latin" },
    /* full-bleed composited scene (D-058) — its OWN photograph now */
    image: {
      src: "/media/products/t60-2026.webp",
      width: 1200,
      height: 675,
      fit: "cover",
      alt: { en: "Handheld two-way radios over an aerial city view with call-mode labels", ar: "أجهزة اتصال لاسلكي محمولة فوق منظر جوي لمدينة مع تسميات أوضاع الاتصال" }, // AR authored (D-006) — owner review pending
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
    /* transparent cut-out (D-058). This is the owner's own appliance
       photograph, so PRODUCT-MEDIA-01 (the interim data-centre visual)
       is closed by this record; the interim file stays on its old path
       untouched. */
    image: {
      src: "/media/products/firewall-2026.webp",
      width: 1200,
      height: 287,
      fit: "contain",
      alt: { en: "Rack-mount firewall appliance with ethernet and SFP ports, front view", ar: "جهاز جدار حماية بحجم الرف بمنافذ إيثرنت وSFP، منظور أمامي" }, // AR authored (D-006) — owner review pending
    },
    featured: true,
    featuredOrder: 1,
    published: true,
    sortOrder: 8,
  },
  {
    id: "core-switch",
    slug: "core-switch",
    name: { en: "Core Switch", arPolicy: "latin" },
    /* transparent cut-out (D-058) */
    image: {
      src: "/media/products/core-switch-2026.webp",
      width: 1200,
      height: 326,
      fit: "contain",
      alt: { en: "Rack-mount core switch with dense fibre port banks, front view", ar: "محوّل أساسي بحجم الرف بصفوف كثيفة من منافذ الألياف، منظور أمامي" }, // AR authored (D-006) — owner review pending
    },
    featured: true,
    featuredOrder: 2,
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
    /* opaque white studio ground (D-058) — presented whole on a plate
       matched to its own background, never cropped */
    image: {
      src: "/media/products/pc-2026.webp",
      width: 1200,
      height: 900,
      fit: "contain",
      plate: "white",
      alt: { en: "Desktop computer tower with two monitors, keyboard and mouse", ar: "حاسوب مكتبي مع شاشتين ولوحة مفاتيح وفأرة" }, // AR authored (D-006) — owner review pending
    },
    featured: false,
    published: true,
    sortOrder: 11,
  },
  {
    id: "ups",
    slug: "ups",
    name: { en: "UPS", arPolicy: "latin" },
    /* transparent cut-out (D-058) */
    image: {
      src: "/media/products/ups-2026.webp",
      width: 1198,
      height: 1200,
      fit: "contain",
      alt: { en: "Tower UPS unit with a front status display", ar: "وحدة تغذية غير منقطعة برجية بشاشة حالة أمامية" }, // AR authored (D-006) — owner review pending
    },
    featured: false,
    published: true,
    sortOrder: 12,
  },
  {
    id: "printers",
    slug: "printers",
    name: { en: "Printers", arPolicy: "latin" },
    /* transparent cut-out (D-058) */
    image: {
      src: "/media/products/printers-2026.webp",
      width: 1200,
      height: 798,
      fit: "contain",
      alt: { en: "Assorted office printers — multifunction, inkjet, label and receipt models", ar: "مجموعة طابعات مكتبية — متعددة الوظائف ونافثة للحبر وطابعات ملصقات وإيصالات" }, // AR authored (D-006) — owner review pending
    },
    featured: false,
    published: true,
    sortOrder: 13,
  },
  {
    id: "nvr",
    slug: "nvr",
    name: { en: "NVR", arPolicy: "latin" },
    /* transparent cut-out (D-058) */
    image: {
      src: "/media/products/nvr-2026.webp",
      width: 1200,
      height: 405,
      fit: "contain",
      alt: { en: "Network video recorder, front three-quarter view", ar: "جهاز تسجيل فيديو شبكي بمنظور أمامي ثلاثة أرباع" }, // AR authored (D-006) — owner review pending
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
    /* "Cameras" — the owner's filename and the D-058 §4 featured list
       both say so; id/slug stay stable so the index anchor keeps working */
    name: { en: "Cameras", arPolicy: "latin" },
    /* transparent cut-out (D-058) */
    image: {
      src: "/media/products/cameras-2026.webp",
      width: 1200,
      height: 892,
      fit: "contain",
      alt: { en: "Assorted surveillance cameras — bullet, dome, box, cube and PTZ models", ar: "مجموعة كاميرات مراقبة — أنبوبية وقبة وصندوقية ومكعبة وPTZ" }, // AR authored (D-006) — owner review pending
    },
    featured: true,
    featuredOrder: 4,
    published: true,
    sortOrder: 18,
  },
  {
    id: "tablet",
    slug: "tablet",
    name: { en: "Tablet", arPolicy: "latin" },
    /* transparent cut-out (D-058) */
    image: {
      src: "/media/products/tablet-2026.webp",
      width: 1200,
      height: 800,
      fit: "contain",
      alt: { en: "Assorted tablets, some with keyboards and styluses", ar: "مجموعة أجهزة لوحية، بعضها مع لوحات مفاتيح وأقلام رقمية" }, // AR authored (D-006) — owner review pending
    },
    featured: false,
    published: true,
    sortOrder: 19,
  },
  {
    id: "hdmi-extender",
    slug: "hdmi-extender",
    name: { en: "HDMI Extender", arPolicy: "latin" },
    /* transparent cut-out (D-058) */
    image: {
      src: "/media/products/hdmi-extender-2026.webp",
      width: 1200,
      height: 740,
      fit: "contain",
      alt: { en: "HDMI extender transmitter and receiver pair with adapters and cables", ar: "زوج موسّع HDMI مرسل ومستقبل مع محوّلات وكابلات" }, // AR authored (D-006) — owner review pending
    },
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
    /* transparent cut-out (D-058) */
    image: {
      src: "/media/products/media-converter-2026.webp",
      width: 1200,
      height: 766,
      fit: "contain",
      alt: { en: "Assorted fibre media converters with ethernet and SFP ports", ar: "مجموعة محوّلات وسائط ألياف بمنافذ إيثرنت وSFP" }, // AR authored (D-006) — owner review pending
    },
    featured: false,
    published: true,
    sortOrder: 22,
  },
  /* ---- D-058 intake: two categories new to the catalogue. Name and
     photograph only, exactly as the owner's files say — no summary, no
     category, nothing inferred. ---- */
  {
    id: "access-control",
    slug: "access-control",
    name: { en: "Access Control", arPolicy: "latin" },
    /* transparent cut-out (D-058) */
    image: {
      src: "/media/products/access-control-2026.webp",
      width: 1200,
      height: 812,
      fit: "contain",
      alt: { en: "Access control set — controller board, magnetic lock, fingerprint terminal, exit button and cards", ar: "طقم تحكم بالدخول — لوحة تحكم وقفل مغناطيسي وجهاز بصمة وزر خروج وبطاقات" }, // AR authored (D-006) — owner review pending
    },
    featured: false,
    published: true,
    sortOrder: 23,
  },
  {
    id: "p2p",
    slug: "p2p",
    name: { en: "P2P", arPolicy: "latin" },
    /* transparent cut-out (D-058) */
    image: {
      src: "/media/products/p2p-2026.webp",
      width: 1200,
      height: 800,
      fit: "contain",
      alt: { en: "Assorted outdoor wireless antennas and bridge units", ar: "مجموعة هوائيات لاسلكية خارجية ووحدات ربط" }, // AR authored (D-006) — owner review pending
    },
    featured: false,
    published: true,
    sortOrder: 24,
  },
];
