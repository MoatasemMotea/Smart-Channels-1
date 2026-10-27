import type { ContactInfo } from "@/types/content";

/**
 * CONTACT — approved contact information only (D-011).
 *
 * HOW TO EDIT: update the values below. Do NOT add WhatsApp, social
 * accounts, map coordinates, extra offices or careers info without owner
 * approval — approved additions go into `links`.
 *
 * Source: approved Company Profile 2026, p. 31.
 */
export const contact: ContactInfo = {
  address: {
    en: "King Faisal Road, Al Murabba District, Riyadh, Kingdom of Saudi Arabia",
    ar: "طريق الملك فيصل، حي المربع، الرياض، المملكة العربية السعودية",
  },
  // D-088: the line above, split for structured data (no postal code)
  addressParts: {
    street: { en: "King Faisal Road, Al Murabba District", ar: "طريق الملك فيصل، حي المربع" },
    city: { en: "Riyadh", ar: "الرياض" },
    country: "SA",
  },
  phone: "+966 11 217 6668",
  email: "info@smartchannels.co",
  /* Owner-approved P4 Revision 3 §12 (floating WhatsApp action). */
  whatsapp: "+966 53 979 5999",
  links: [],
  /* D-091: social presence. The LinkedIn URL carried over from the P4
     Rev3 §13 footer treatment — still a personal profile (/in/), not
     the company page (/company/), so src/lib/seo.ts excludes it from
     Organization sameAs. Facebook, X and Instagram await owner URLs. */
  social: {
    facebook: null,
    x: null,
    linkedin: "https://www.linkedin.com/in/smart-channels-514a80372/",
    instagram: null,
  },
};
