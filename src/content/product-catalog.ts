/**
 * PRODUCT CATALOGUE — categorised (D-059).
 *
 * The owner's 2026-09-13 directive: NINE categories and SEVENTY-THREE
 * cards, transcribed verbatim — no record added, invented or inferred.
 * A card is a (category, product type, brand) triple; the brand may be
 * empty, which means "no brand shown", never a placeholder.
 *
 * This file is a SEPARATE data model from `products.ts` (the 24
 * CatalogProduct records that still drive the homepage stage). The two
 * co-exist by explicit owner decision — see D-059 in docs/decision-log.md
 * for why, and for the condition under which they merge.
 *
 * IMAGERY follows the PRODUCT TYPE, not the brand: every "Switches"
 * card shares switches' photograph. D-060: the catalogue is currently
 * UNLINKED from all imagery — every type's `image` is "" and every card
 * renders the neutral placeholder — pending a new photography batch
 * (specification and intake path in docs/product-images.md). Nothing is
 * generated, downloaded or invented. There is deliberately NO locked
 * manifest here: linking a photograph is a one-field data edit on the
 * type's row, and the validator only checks that a referenced file
 * exists on disk.
 */
export type CategorySlug =
  | "networking"
  | "fiber"
  | "cybersecurity"
  | "surveillance"
  | "av"
  | "computing"
  | "storage"
  | "communication"
  | "environmental";

export interface ProductCategory {
  slug: CategorySlug;
  shortEn: string; // for the category strip
  shortAr: string;
  fullEn: string; // page title + metadata
  fullAr: string;
  order: number;
}

export interface ProductCard {
  category: CategorySlug;
  typeEn: string; // product type
  typeAr: string;
  brand: string; // empty = no brand
  image: string; // filename inside public/media/products/ — empty = placeholder
}

export const productCategories: ProductCategory[] = [
  { slug: "networking", shortEn: "Networking", shortAr: "الشبكات والاتصال", fullEn: "Networking & Connectivity", fullAr: "الشبكات والاتصال", order: 1 },
  { slug: "fiber", shortEn: "Fiber Optics", shortAr: "الألياف البصرية", fullEn: "Fiber Optic Solutions", fullAr: "حلول الألياف البصرية", order: 2 },
  { slug: "cybersecurity", shortEn: "Cybersecurity", shortAr: "الأمن السيبراني", fullEn: "Cybersecurity", fullAr: "الأمن السيبراني", order: 3 },
  { slug: "surveillance", shortEn: "Surveillance", shortAr: "المراقبة والأمن", fullEn: "Surveillance & Security", fullAr: "المراقبة والأمن", order: 4 },
  { slug: "av", shortEn: "AV & Display", shortAr: "العرض والصوتيات", fullEn: "Professional AV & Display", fullAr: "أنظمة العرض والصوتيات", order: 5 },
  { slug: "computing", shortEn: "End-User Devices", shortAr: "أجهزة المستخدم", fullEn: "IT & End-User Computing", fullAr: "أجهزة المستخدم وتقنية المعلومات", order: 6 },
  { slug: "storage", shortEn: "Data Storage", shortAr: "تخزين البيانات", fullEn: "Data Storage", fullAr: "تخزين البيانات", order: 7 },
  { slug: "communication", shortEn: "Two-Way Radio", shortAr: "الاتصال اللاسلكي", fullEn: "Communication Systems", fullAr: "أنظمة الاتصال اللاسلكي", order: 8 },
  { slug: "environmental", shortEn: "Specialized Systems", shortAr: "أنظمة متخصصة", fullEn: "Environmental & Specialized", fullAr: "الأنظمة البيئية والمتخصصة", order: 9 },
];

/**
 * One row per product TYPE: its category, names, the shared photograph
 * (owner mapping table, D-059 §2 — "" where none exists yet) and the
 * brands that expand into cards. The 73 cards are derived below, so a
 * type's image lives in exactly one place.
 */
type TypeRow = {
  category: CategorySlug;
  typeEn: string;
  typeAr: string;
  image: string;
  brands: string[];
};

const TYPES: TypeRow[] = [
  /* ---- networking (15 cards) ---- */
  { category: "networking", typeEn: "5G Routers", typeAr: "راوترات 5G", image: "", brands: ["Huawei"] },
  { category: "networking", typeEn: "Core Switches", typeAr: "محوّلات أساسية", image: "", brands: ["Cisco", "TP-Link"] },
  { category: "networking", typeEn: "Switches", typeAr: "محوّلات شبكة", image: "", brands: ["Aruba", "Cisco", "Hikvision", "Linksys", "Ruijie"] },
  { category: "networking", typeEn: "Wi-Fi Extenders", typeAr: "مقويات إشارة", image: "", brands: ["TP-Link"] },
  { category: "networking", typeEn: "Access Points", typeAr: "نقاط وصول لاسلكية", image: "", brands: ["Aruba", "EDiMax", "Huawei", "Linksys", "Ubiquiti"] },
  { category: "networking", typeEn: "Point-to-Point", typeAr: "وصلات نقطة لنقطة", image: "", brands: ["UPOE"] },
  /* ---- fiber (9 cards) ---- */
  { category: "fiber", typeEn: "Media Converters", typeAr: "محوّلات وسائط", image: "", brands: ["D-Link", "Planet", "TP-Link", "TRENDnet", "Vivotek"] },
  { category: "fiber", typeEn: "HDMI over Fiber Extenders", typeAr: "موسّعات HDMI عبر الألياف", image: "", brands: [""] },
  { category: "fiber", typeEn: "SFP Modules", typeAr: "وحدات SFP", image: "", brands: ["Alcatel-Lucent", "Cisco", "Huawei"] },
  /* ---- cybersecurity (1 card) ---- */
  { category: "cybersecurity", typeEn: "Firewalls", typeAr: "جدران حماية", image: "", brands: ["Fortinet"] },
  /* ---- surveillance (7 cards) ---- */
  { category: "surveillance", typeEn: "Face Recognition Terminals", typeAr: "أجهزة التعرّف على الوجه", image: "", brands: ["Hikvision"] },
  { category: "surveillance", typeEn: "Camera Mounts", typeAr: "حوامل كاميرات", image: "", brands: [""] },
  { category: "surveillance", typeEn: "CCTV Cameras", typeAr: "كاميرات مراقبة", image: "", brands: ["EZVIZ", "Hikvision"] },
  { category: "surveillance", typeEn: "NVRs", typeAr: "مسجّلات شبكية", image: "", brands: ["Hikvision"] },
  { category: "surveillance", typeEn: "Decoders", typeAr: "وحدات فك ترميز", image: "", brands: ["Digibird", "Hikvision"] },
  /* ---- av (9 cards) ---- */
  { category: "av", typeEn: "Display Remotes", typeAr: "أجهزة تحكّم شاشات", image: "", brands: [""] },
  { category: "av", typeEn: "Video Wall Displays", typeAr: "شاشات فيديو وول", image: "", brands: ["Hikvision", "Samsung"] },
  { category: "av", typeEn: "HDMI Splitters", typeAr: "موزّعات HDMI", image: "", brands: ["UGREEN"] },
  { category: "av", typeEn: "Y-Splitters", typeAr: "موزّعات Y", image: "", brands: [""] },
  { category: "av", typeEn: "HDMI Extenders", typeAr: "موسّعات HDMI", image: "", brands: [""] },
  { category: "av", typeEn: "Video Wall Controllers", typeAr: "وحدات تحكّم فيديو وول", image: "", brands: ["Jupiter"] },
  { category: "av", typeEn: "HD Cables", typeAr: "وصلات HD", image: "", brands: [""] },
  { category: "av", typeEn: "VGA Cables", typeAr: "وصلات VGA", image: "", brands: [""] },
  /* ---- computing (21 cards) ---- */
  { category: "computing", typeEn: "Tablets", typeAr: "أجهزة لوحية", image: "", brands: ["Lenovo"] },
  { category: "computing", typeEn: "Desktop PCs", typeAr: "أجهزة مكتبية", image: "", brands: ["Dell", "Egeira", "HP"] },
  { category: "computing", typeEn: "Monitors", typeAr: "شاشات", image: "", brands: ["ArrQW", "Dell", "Egeira", "HP", "LG", "Majesty"] },
  { category: "computing", typeEn: "Printers", typeAr: "طابعات", image: "", brands: ["Canon", "Epson", "HP"] },
  { category: "computing", typeEn: "Mice", typeAr: "فأرات", image: "", brands: ["MIXIE", "PULI"] },
  { category: "computing", typeEn: "Laptops", typeAr: "لابتوب", image: "", brands: ["Asus", "Dell", "Lenovo"] },
  { category: "computing", typeEn: "Keyboards", typeAr: "لوحات مفاتيح", image: "", brands: ["Dell", "MIXIE", "PULI"] },
  /* ---- storage (7 cards) ---- */
  { category: "storage", typeEn: "Hard Drives", typeAr: "أقراص تخزين", image: "", brands: ["Dell", "Hikvision", "Seagate", "Western Digital"] },
  { category: "storage", typeEn: "Flash Memory", typeAr: "ذاكرات فلاش", image: "", brands: ["Hikvision", "NEO HOME", "SanDisk"] },
  /* ---- communication (2 cards) ---- */
  { category: "communication", typeEn: "PTT Radios", typeAr: "أجهزة اتصال لاسلكي PTT", image: "", brands: ["Kirisun"] },
  { category: "communication", typeEn: "Multi-Bay Chargers", typeAr: "شواحن متعددة القنوات", image: "", brands: ["Kirisun"] },
  /* ---- environmental (2 cards) ---- */
  { category: "environmental", typeEn: "People Counting Sensors", typeAr: "حساسات عدّ وتحليل", image: "", brands: ["Xovis"] },
  { category: "environmental", typeEn: "Weather Stations", typeAr: "محطات رصد جوي", image: "", brands: [""] },
];

/** The 73 cards, in category order then as listed by the owner. */
export const productCards: ProductCard[] = TYPES.flatMap((t) =>
  t.brands.map((brand) => ({
    category: t.category,
    typeEn: t.typeEn,
    typeAr: t.typeAr,
    brand,
    image: t.image,
  })),
);
