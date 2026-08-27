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
  phone: "+966 11 217 6668",
  email: "info@smartchannels.co",
  /* Owner-approved P4 Revision 3 §12 (floating WhatsApp action). */
  whatsapp: "+966 53 979 5999",
  links: [],
};
