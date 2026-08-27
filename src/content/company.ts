import type { LocalizedText } from "@/types/content";

/**
 * COMPANY / ABOUT copy — from the approved Company Profile 2026 (pp. 3–5,
 * 30–31). HOW TO EDIT: change text here; Arabic fields are authored from
 * the approved English and require owner review before publication (D-006).
 * General positioning uses the approved source scope "the Kingdom and the
 * Gulf" (P2-A04).
 */
export const company = {
  /** p.3 headline. */
  positioning: {
    en: "A trusted technology solutions partner in Saudi Arabia",
    ar: "شريك موثوق لحلول التقنية في المملكة العربية السعودية",
  } satisfies LocalizedText,

  /** p.3 about paragraph — verbatim from the approved profile. */
  about: {
    en: "Smart Channels delivers integrated technology, communications, infrastructure and security solutions for businesses, institutions, facilities and events. Our capabilities span advisory and technical services, systems integration, managed services, project delivery and ongoing support — helping customers build reliable, secure and scalable environments.",
  } satisfies LocalizedText,

  /** p.4 mission — verbatim from the approved profile. */
  mission: {
    en: "We are committed to carefully listening to our customers' distinct needs, fully understanding their requirements, and then guiding them to the best technologies that serve those needs and contribute to the tangible growth of their business.",
  } satisfies LocalizedText,

  /** p.4 numbered value statements. */
  values: [
    { en: "Comprehensive and integrated solutions" },
    { en: "Reliable solutions built to global standards" },
    { en: "Quality, reliability and operational efficiency" },
  ] satisfies LocalizedText[],

  /** p.3 capability pillars. */
  capabilities: [
    {
      id: "advisory",
      name: { en: "Advisory & Technical", ar: "الاستشارات والخدمات التقنية" },
      description: {
        en: "Guiding clients to the technologies that serve their needs and drive tangible business growth.",
      },
    },
    {
      id: "engineering",
      name: { en: "Engineering Team", ar: "الفريق الهندسي" },
      description: {
        en: "Highly experienced engineers and technicians across design, implementation and maintenance.",
      },
    },
    {
      id: "integration",
      name: { en: "Systems Integration", ar: "تكامل الأنظمة" },
      description: {
        en: "Network, communications and security systems brought into one scalable architecture.",
      },
    },
    {
      id: "managed",
      name: { en: "Managed Services", ar: "الخدمات المُدارة" },
      description: {
        en: "Operation, monitoring and continuous support, with annual maintenance contracts.",
      },
    },
  ],

  /** p.30 client-base scope statement (approved source scope, P2-A04). */
  reach: {
    en: "Government bodies, giga-projects, financial institutions, global brands and event organisers across the Kingdom and the Gulf.",
  } satisfies LocalizedText,
};
