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
import { stats } from "@/content/stats";
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
import { navigation } from "@/content/navigation";
import { company } from "@/content/company";

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

export function getStats(): Stat[] {
  return stats;
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

export function getFeaturedIndustries(): Industry[] {
  return getIndustries().filter((i) => i.featured);
}

/** Public projects only — display: 'hidden' records never render (A-004). */
export function getPublicProjects(): Project[] {
  return projects.filter((p) => p.display !== "hidden").sort(byOrder);
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
