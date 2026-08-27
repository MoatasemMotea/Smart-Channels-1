import type { GalleryCategory } from "@/types/content";

/**
 * GALLERY CATEGORIES (Q8) — central taxonomy. "All" is a UI filter state,
 * never a stored category. HOW TO EDIT: adjust labels/order; adding or
 * removing a category also requires updating GalleryCategoryId in
 * src/types/content.ts (strict typing keeps records valid — Q6).
 */
export const galleryCategories: GalleryCategory[] = [
  { id: "events-venues", label: { en: "Events & Venues", ar: "الفعاليات والمنشآت" }, order: 1 },
  {
    id: "infrastructure-networks",
    label: { en: "Infrastructure & Networks", ar: "البنية التحتية والشبكات" },
    order: 2,
  },
  {
    id: "security-surveillance",
    label: { en: "Security & Surveillance", ar: "الأمن والمراقبة" },
    order: 3,
  },
  { id: "audio-visual", label: { en: "Audio Visual", ar: "الصوت والصورة" }, order: 4 },
  { id: "field-operations", label: { en: "Field Operations", ar: "العمليات الميدانية" }, order: 5 },
];
