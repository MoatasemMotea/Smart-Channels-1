import type { NavItem } from "@/types/content";

/**
 * NAVIGATION (final pre-media directive §5 · D-050).
 *
 * HOW TO EDIT: change labels/order here — the header, mobile menu and
 * footer all read this file.
 *
 * The homepage is the primary one-page experience (§4): About Us,
 * Solutions, Industries, Gallery, Technology Alliances and Our Clients
 * navigate to their homepage sections (anchor hrefs, with cinematic
 * arrival); Products and Projects open their dedicated pages. There is
 * NO separate Contact item — the "Let's Talk" CTA IS the contact
 * destination (the homepage Let's Talk section). Smart AI is no longer
 * a navigation destination (§14 — the Digital Employee is a floating
 * experience, not a section).
 */
export const navigation: NavItem[] = [
  { id: "home", label: { en: "Home", ar: "الرئيسية" }, href: "/", order: 1 },
  { id: "about", label: { en: "About Us", ar: "من نحن" }, href: "/#about", order: 2 },
  { id: "solutions", label: { en: "Solutions", ar: "الحلول" }, href: "/#solutions", order: 3 },
  { id: "products", label: { en: "Products", ar: "المنتجات" }, href: "/products", order: 4 },
  { id: "industries", label: { en: "Industries", ar: "القطاعات" }, href: "/#industries", order: 5 },
  { id: "projects", label: { en: "Projects", ar: "المشاريع" }, href: "/projects", order: 6 },
  { id: "gallery", label: { en: "Gallery", ar: "المعرض" }, href: "/#gallery", order: 7 },
  {
    id: "alliances",
    label: { en: "Technology Alliances", ar: "التحالفات التقنية" },
    href: "/#partners",
    order: 8,
  },
  { id: "clients", label: { en: "Our Clients", ar: "عملاؤنا" }, href: "/#clients", order: 9 },
  {
    id: "lets-talk",
    label: { en: "Let's Talk", ar: "تواصل معنا" },
    href: "/#contact",
    highlight: "cta",
    order: 10,
  },
];

/**
 * §9 width discipline: when the full architecture cannot breathe on one
 * line, these entries fold into a deliberate "More" menu — never shrunken
 * text, never a squeezed row. All entries return inline at ≥2xl.
 */
export const overflowNavIds = new Set(["gallery", "alliances", "clients"]);
