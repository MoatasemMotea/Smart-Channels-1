import type { NavItem } from "@/types/content";

/**
 * NAVIGATION (Q10 · P5 §6 information architecture).
 *
 * HOW TO EDIT: change labels/order here — the header, mobile menu and
 * footer all read this file. `highlight` marks Smart AI (accent entry)
 * and the primary CTA (the "Let's Talk" button IS the Contact
 * destination). Anchor hrefs (/#…) arrive with the section's cinematic
 * choreography (P5 §9). No destination exists here that is not part of
 * the approved architecture.
 */
export const navigation: NavItem[] = [
  { id: "home", label: { en: "Home", ar: "الرئيسية" }, href: "/", order: 1 },
  { id: "about", label: { en: "About Us", ar: "من نحن" }, href: "/company", order: 2 },
  { id: "products", label: { en: "Products", ar: "المنتجات" }, href: "/products", order: 3 },
  { id: "solutions", label: { en: "Solutions", ar: "الحلول" }, href: "/solutions", order: 4 },
  { id: "industries", label: { en: "Industries", ar: "القطاعات" }, href: "/industries", order: 5 },
  { id: "projects", label: { en: "Projects", ar: "المشاريع" }, href: "/projects", order: 6 },
  { id: "gallery", label: { en: "Gallery", ar: "المعرض" }, href: "/gallery", order: 7 },
  {
    id: "alliances",
    label: { en: "Technology Alliances", ar: "التحالفات التقنية" },
    href: "/#partners",
    order: 8,
  },
  { id: "clients", label: { en: "Our Clients", ar: "عملاؤنا" }, href: "/#clients", order: 9 },
  {
    id: "smart-ai",
    label: { en: "Smart AI", arPolicy: "latin" },
    href: "/#smart-ai",
    highlight: "smart-ai",
    order: 10,
  },
  { id: "contact", label: { en: "Contact", ar: "اتصل بنا" }, href: "/contact", order: 11 },
  {
    id: "lets-talk",
    label: { en: "Let's Talk", ar: "تواصل معنا" },
    href: "/contact",
    highlight: "cta",
    order: 12,
  },
];

/**
 * §9 width discipline: when the full architecture cannot breathe on one
 * line, these entries fold into a deliberate "More" menu — never shrunken
 * text, never a squeezed row. All entries return inline at ≥2xl.
 */
export const overflowNavIds = new Set(["gallery", "alliances", "clients"]);
