import type { NavItem } from "@/types/content";

/**
 * NAVIGATION (Q10). HOW TO EDIT: change labels/order here. `highlight`
 * marks Smart AI (visually highlighted entry) and the primary CTA.
 */
export const navigation: NavItem[] = [
  { id: "solutions", label: { en: "Solutions", ar: "الحلول" }, href: "/solutions", order: 1 },
  { id: "projects", label: { en: "Projects", ar: "المشاريع" }, href: "/projects", order: 2 },
  { id: "industries", label: { en: "Industries", ar: "القطاعات" }, href: "/industries", order: 3 },
  { id: "gallery", label: { en: "Gallery", ar: "المعرض" }, href: "/gallery", order: 4 },
  { id: "company", label: { en: "Company", ar: "الشركة" }, href: "/company", order: 5 },
  { id: "partners", label: { en: "Partners", ar: "الشركاء" }, href: "/partners", order: 6 },
  {
    id: "smart-ai",
    label: { en: "Smart AI", arPolicy: "latin" },
    href: "/#smart-ai",
    highlight: "smart-ai",
    order: 7,
  },
  {
    id: "lets-talk",
    label: { en: "Let's Talk", ar: "تواصل معنا" },
    href: "/contact",
    highlight: "cta",
    order: 8,
  },
];
