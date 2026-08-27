import type { ProfileDocument } from "@/types/content";

/**
 * DOWNLOADABLE DOCUMENTS (Q11).
 *
 * HOW TO EDIT: to add the Arabic Company Profile later, place the PDF in
 * /public/docs/ and add one entry with locale "ar". No component changes
 * needed. Do not add "coming soon" placeholders.
 */
export const documents: ProfileDocument[] = [
  {
    locale: "en",
    src: "/docs/company-profile-2026-en.pdf",
    label: { en: "Company Profile 2026 (English)", ar: "الملف التعريفي 2026 (بالإنجليزية)" },
  },
];
