/**
 * Content accessor boundary (A-006).
 *
 * Presentation components consume content ONLY through these functions —
 * never by importing src/content modules directly. This is what makes a
 * future CMS migration a swap of accessor internals, and it is where
 * publish/display filtering is enforced (A-004): unpublished or hidden
 * records never reach any public rendering path.
 */
import type {
  Client,
  GalleryCategory,
  GalleryItem,
  Industry,
  Locale,
  LocalizedText,
  NavItem,
  Partner,
  ProfileDocument,
  Project,
  SolutionFamily,
  Stat,
} from "@/types/content";
import { FOUNDED_YEAR, stats } from "@/content/stats";
import { locations } from "@/content/locations";
import { solutionFamilies } from "@/content/solutions";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { galleryItems } from "@/content/gallery";
import { galleryCategories } from "@/content/gallery-categories";
import { partners } from "@/content/partners";
import { clients } from "@/content/clients";
import { contact } from "@/content/contact";
import { documents } from "@/content/documents";
import { socialLinks } from "@/content/social";
import { gulfRegions } from "@/content/regions";
import { heroMedia } from "@/content/hero-media";
import { products } from "@/content/products";
import { productCards, productCategories, type CategorySlug } from "@/content/product-catalog";
import { navigation } from "@/content/navigation";
import { company } from "@/content/company";
import { project } from "@/lib/map/geo";

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

/**
 * Resolve a LocalizedText for a locale. Missing Arabic falls back to
 * English (allowed during development, A-002); intentional-Latin proper
 * nouns (arPolicy: 'latin') are valid in Arabic by policy (Q5).
 * Release-completeness is enforced by scripts/validate-content.ts.
 */
export function localize(text: LocalizedText, locale: Locale): string {
  if (locale === "ar") return text.ar ?? text.en;
  return text.en;
}

/** The current calendar year in Riyadh (the company's home time zone). */
export function riyadhYear(now: Date = new Date()): number {
  return Number(new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Riyadh", year: "numeric" }).format(now));
}

/**
 * D-081: the Track Record figures as of `now`. A figure with `growth`
 * advances by perYear for every calendar year after its `asOf`; "years"
 * becomes (current year − FOUNDED_YEAR) once the founding year is on
 * record. Never below the approved value. Call on the server — the pages
 * that render these regenerate daily (revalidate = 86400).
 */
export function getStats(now: Date = new Date()): Stat[] {
  const year = riyadhYear(now);
  return stats.map((s) => {
    if (!s.growth) return s;
    const grown =
      s.id === "years" && FOUNDED_YEAR !== null
        ? year - FOUNDED_YEAR
        : s.value + s.growth.perYear * Math.max(0, year - s.asOf);
    return { ...s, value: Math.max(s.value, grown) };
  });
}

/** One button on the network map (a city, or a group of cities closer
 *  than a touch target) and the data its card shows (D-081). */
export interface MapCityView {
  id: string;
  label: string;
  /** member node positions (normalized map coordinates) */
  points: { nx: number; ny: number }[];
  projectCount: number;
  first: { name: string; sector: string; href: string | null; image: { src: string; alt: string } | null };
}
/** The text alternative: every city with all of its projects. */
export interface MapCityListItem {
  id: string;
  name: string;
  projects: { name: string; href: string | null }[];
}

export function getMapCities(locale: Locale): { buttons: MapCityView[]; list: MapCityListItem[] } {
  const join = (names: string[]) =>
    locale === "ar"
      ? names.join(" و")
      : names.length < 3
        ? names.join(" and ")
        : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
  const visible = new Set(getPublicProjects().map((p) => p.id));
  const projectOf = (id: string) => (visible.has(id) ? projects.find((p) => p.id === id) : undefined);
  const hrefOf = (p: Project) => (projectHasDetail(p) ? `/projects/${p.slug}` : null);
  const withProjects = locations.filter((l) => l.kind !== "coverage-city" && l.projectIds.length > 0);
  const list: MapCityListItem[] = withProjects.map((l) => ({
    id: l.id,
    name: localize(l.name, locale),
    projects: l.projectIds
      .map(projectOf)
      .filter((p): p is Project => Boolean(p))
      .map((p) => ({ name: localize(p.name, locale), href: hrefOf(p) })),
  }));
  const groups = new Map<string, typeof withProjects>();
  for (const l of withProjects) {
    const key = l.group ?? l.id;
    groups.set(key, [...(groups.get(key) ?? []), l]);
  }
  const buttons: MapCityView[] = [...groups.entries()].map(([key, members]) => {
    const all = members.flatMap((m) => m.projectIds.map(projectOf)).filter((p): p is Project => Boolean(p));
    // the card leads with a project that has its own page (owner's selection
    // first, by homeOrder), otherwise the first on record
    const ranked = [...all].sort((a, b) => {
      const da = hrefOf(a) ? 0 : 1;
      const db = hrefOf(b) ? 0 : 1;
      return da - db || (a.homeOrder ?? 99) - (b.homeOrder ?? 99);
    });
    const lead = ranked[0]!;
    const sector = industries.find((i) => i.id === lead.sectorIds[0]);
    const media = lead.media?.find((m) => m.type === "image");
    return {
      id: key,
      label: join(members.map((m) => localize(m.name, locale))),
      points: members.map((m) => project(m.latitude, m.longitude)).map((p) => ({ nx: p.x, ny: p.y })),
      projectCount: all.length,
      first: {
        name: localize(lead.name, locale),
        sector: sector ? localize(sector.name, locale) : "",
        href: hrefOf(lead),
        image: media ? { src: media.src, alt: localize(media.alt, locale) } : null,
      },
    };
  });
  return { buttons, list };
}

export function getSolutionFamilies(): SolutionFamily[] {
  return [...solutionFamilies].sort(byOrder);
}

export function getSolutionFamilyBySlug(slug: string): SolutionFamily | undefined {
  return solutionFamilies.find((f) => f.slug === slug);
}

export function getIndustries(): Industry[] {
  return [...industries].sort(byOrder);
}

/** Public projects only — display: 'hidden' records never render (A-004). */
export function getPublicProjects(): Project[] {
  return projects.filter((p) => p.display !== "hidden").sort(byOrder);
}

/** P9/D-044: the owner-selected Featured set. */
export function getFeaturedProjects(): Project[] {
  return getPublicProjects().filter((p) => p.featured);
}

/** D-075: the owner's five homepage projects, in `homeOrder`. */
export function getHomeProjects(): Project[] {
  return getPublicProjects()
    .filter((p) => p.homeOrder !== undefined)
    .sort((a, b) => a.homeOrder! - b.homeOrder!);
}

/**
 * P9 evidence-adaptive rule: a project earns a detail route when it is
 * Featured OR carries deep approved evidence (years + delivered scope).
 * Thin records stay ledger-only so weak pages never exist.
 * D-075 extension (owner decision): a project the owner shows on the
 * homepage (`homeOrder`) deserves a page.
 */
export function projectHasDetail(p: Project): boolean {
  return p.featured || p.homeOrder !== undefined || Boolean(p.years && p.scope && p.scope.length > 0);
}

export function getDetailProjects(): Project[] {
  return getPublicProjects().filter(projectHasDetail);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug && p.display !== "hidden");
}

/** Same-sector related projects (excluding the project itself). */
export function getRelatedProjects(project: Project, limit = 4): Project[] {
  return getPublicProjects()
    .filter((p) => p.id !== project.id && p.sectorIds.some((s) => project.sectorIds.includes(s)))
    .slice(0, limit);
}

export function getGalleryCategories(): GalleryCategory[] {
  return [...galleryCategories].sort(byOrder);
}

/** Published gallery items only (A-004/Amendment 3). */
export function getPublishedGalleryItems(): GalleryItem[] {
  return galleryItems
    .filter((g) => g.published)
    .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER));
}

export function getPartners(): Partner[] {
  return partners.filter((p) => p.enabled).sort(byOrder);
}

export function getClients(): Client[] {
  return clients.filter((c) => c.enabled).sort(byOrder);
}

export function getContact() {
  return contact;
}

export function getDocuments(): ProfileDocument[] {
  return documents;
}

export function getNavigation(): NavItem[] {
  return [...navigation].sort(byOrder);
}

export function getPublishedProducts() {
  return products.filter((p) => p.published).sort((a, b) => a.sortOrder - b.sortOrder);
}

// D-062 — بلا مستهلك منذ حذف ProductsStage.
// تُحذف مع products.ts عند إغلاق D059-DUAL-SOURCE.
export function getFeaturedProducts() {
  // D-052 §3: the owner's featured display order, not catalogue order
  return getPublishedProducts()
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredOrder ?? a.sortOrder) - (b.featuredOrder ?? b.sortOrder));
}

/* ---- D-059 categorised catalogue — a SEPARATE model from products.ts
   (which keeps serving the homepage stage); see decision-log D-059 ---- */
export function getProductCategories() {
  return [...productCategories].sort(byOrder);
}

export function getProductCategoryBySlug(slug: string) {
  return productCategories.find((c) => c.slug === slug);
}

export function getProductCards(category?: CategorySlug) {
  return category ? productCards.filter((c) => c.category === category) : productCards;
}

export function getSocialLinks() {
  // public boundary: only enabled records WITH a real URL ever render
  return socialLinks
    .filter((l) => l.enabled && l.url)
    .sort((a, b) => a.order - b.order);
}

export function getGulfRegions() {
  return gulfRegions.filter((r) => r.enabled);
}

export function getHeroMedia() {
  return heroMedia;
}

export function getCompany() {
  return company;
}
