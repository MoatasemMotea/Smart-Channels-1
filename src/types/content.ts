/**
 * Smart Channels — content schema contract.
 *
 * This file is the single source of truth for content shapes. It mirrors
 * docs/content-model.md (P1, amendments A-001…A-006, D-013) exactly; any
 * change here must be reflected there and approved by the owner.
 *
 * Provenance rule: every business value stored in src/content/ must trace
 * to the approved Company Profile, a logged owner decision, or
 * owner-supplied material. Never invent business facts (Amendment 2).
 */

export type Locale = "en" | "ar";

/**
 * en: always required — the approved English source content.
 * ar: professional Arabic based strictly on the English source (D-006);
 *     requires owner approval before publication.
 * arPolicy: 'latin' marks a proper noun whose official form IS Latin
 *     (e.g. vendor names). That counts as COMPLETE Arabic content (A-002),
 *     not a missing translation. A field with neither `ar` nor
 *     `arPolicy: 'latin'` is incomplete and blocks a release build.
 */
export interface LocalizedText {
  en: string;
  ar?: string;
  arPolicy?: "latin";
}

export interface MediaRef {
  /** Path under /public (e.g. /media/gallery/foo.jpg). */
  src: string;
  alt: LocalizedText;
  /** Populated by tooling where useful — never required manual input (A-005). */
  width?: number;
  height?: number;
}

/* ------------------------------------------------------------------ */
/* Statistics (D-002, A-001)                                           */
/* ------------------------------------------------------------------ */

export interface Stat {
  id: string;
  /** Count-up animation target (implemented at P6). */
  value: number;
  /** Preserved by the UI (e.g. "+"). */
  suffix?: string;
  label: LocalizedText;
  /** REQUIRED (A-001). Reporting year of the approved figure. */
  asOf: number;
  /** Internal provenance note — never rendered. */
  source?: string;
}

/* ------------------------------------------------------------------ */
/* Solutions (Q2 — 7 canonical families)                               */
/* ------------------------------------------------------------------ */

export interface SubSolution {
  id: string;
  name: LocalizedText;
  items?: LocalizedText[];
}

/**
 * Owner-approved Solution media record (D-050 Solutions integration ·
 * §13). One structured record serves BOTH the homepage showcase and the
 * detail-page moment. Paths point at PUBLIC delivery assets only —
 * never media-source/. Replacing media later = edit this record.
 */
export interface SolutionMedia {
  /** Public delivery video under /media/solutions/. */
  video: string;
  /** Reviewed meaningful-frame poster (STATIC/reduced-motion visual). */
  poster: string;
  orientation: "landscape" | "portrait";
  width: number;
  height: number;
  /** object-position focal point for cover crops (landscape). */
  focus?: { desktop?: string; mobile?: string };
  /** Factual description of the footage (accessibility). */
  alt: LocalizedText;
  /** A-004 pattern: false = excluded from ALL public rendering. */
  published: boolean;
}

export interface SolutionFamily {
  id: string;
  slug: string;
  name: LocalizedText;
  tagline: LocalizedText;
  summary: LocalizedText;
  subSolutions: SubSolution[];
  /** Only vendors the approved profile explicitly associates (Amendment 2). */
  relatedVendorIds?: string[];
  /** D-050 owner-approved family film (see SolutionMedia). */
  media?: SolutionMedia;
  order: number;
}

/* ------------------------------------------------------------------ */
/* Industries (Q3)                                                     */
/* ------------------------------------------------------------------ */

export interface Industry {
  id: string;
  name: LocalizedText;
  /** Homepage showcase membership — data-driven. */
  featured: boolean;
  order: number;
  media?: MediaRef;
}

/* ------------------------------------------------------------------ */
/* Projects (D-003, D-004, A-003, A-004, D-013)                        */
/* ------------------------------------------------------------------ */

/** D-013: a confirmed, approved service delivered on a project. */
export interface ProjectService {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
}

/** D-013: one item in a project's own ordered media collection. */
export interface ProjectMedia {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: LocalizedText;
  caption?: LocalizedText;
  order: number;
}

/** A-003: structural capability only. Populated ONLY with approved content. */
export interface ProjectCaseStudy {
  overview?: LocalizedText;
  heroMedia?: ProjectMedia;
  outcomes?: LocalizedText[];
}

export interface Project {
  id: string;
  /** Reserved for future /projects/[slug] (Q1/A-003). */
  slug: string;
  name: LocalizedText;
  location?: LocalizedText;
  /** D-013 temporal structure: {from:2025} → "2025"; {from:2023,to:2025} → "2023–2025". */
  years?: { from: number; to?: number };
  sectorIds: string[];
  /** D-013: confirmed services delivered — source-backed only. */
  services?: ProjectService[];
  /** Profile-backed scope bullets (e.g. p.26). */
  scope?: LocalizedText[];
  /** D-013: the project's own ordered media gallery. */
  media?: ProjectMedia[];
  /** D-013: related main-Gallery items BY REFERENCE — no duplicate files. */
  galleryItemIds?: string[];
  solutionIds?: string[];
  logo?: { src: string; quality: "approved" | "pdf-extract" };
  /** A-004 publish control. 'hidden' records are never publicly rendered. */
  display: "logo" | "text-only" | "hidden";
  /** Stays false until the D-004 assessment selects the featured set. */
  featured: boolean;
  caseStudy?: ProjectCaseStudy;
  order: number;
}

/* ------------------------------------------------------------------ */
/* Gallery (D-008, Q7, Q8, A-004, A-005)                               */
/* ------------------------------------------------------------------ */

export type GalleryCategoryId =
  | "events-venues"
  | "infrastructure-networks"
  | "security-surveillance"
  | "audio-visual"
  | "field-operations";

export interface GalleryCategory {
  id: GalleryCategoryId;
  label: LocalizedText;
  order: number;
}

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  /** Path under /public/media/gallery once derivatives exist. */
  src: string;
  /**
   * A-004: false = excluded from ALL public rendering (pages, sitemaps,
   * structured data); metadata preserved. Committing a file to the repo is
   * NOT publication (Amendment 3).
   */
  published: boolean;
  alt: LocalizedText;
  /** Videos: generated by scripts/generate-posters.ts; manual value wins. */
  poster?: string;
  caption?: LocalizedText;
  year?: number;
  location?: LocalizedText;
  category: GalleryCategoryId;
  projectId?: string;
  featured?: boolean;
  order?: number;
}

/* ------------------------------------------------------------------ */
/* Partners & clients (D-005)                                          */
/* ------------------------------------------------------------------ */

export interface Partner {
  id: string;
  name: LocalizedText;
  /** Absent until an approved-quality asset exists (D-005/O-005). */
  logo?: { src: string; quality: "approved" | "pdf-extract" };
  /** Optional: only where the profile explicitly associates domains. */
  domains?: string[];
  enabled: boolean;
  order: number;
}

export interface Client {
  id: string;
  name: LocalizedText;
  logo?: { src: string; quality: "approved" | "pdf-extract" };
  enabled: boolean;
  order: number;
}

/* ------------------------------------------------------------------ */
/* Contact & documents (D-011, Q11)                                    */
/* ------------------------------------------------------------------ */

export interface ContactInfo {
  address: LocalizedText;
  /** Rendered as a tel: link. */
  phone: string;
  /** Rendered as a mailto: link. */
  email: string;
  /** Owner-approved WhatsApp number (P4 Rev3 §12); display form.
   *  The wa.me destination is derived by stripping non-digits. */
  whatsapp?: string;
  /** Ships empty by design (D-011); future additions are data-only. */
  links?: { id: string; label: LocalizedText; href: string }[];
}

/** Social platform record (P4 Rev3 §13). URLs are owner-supplied; an
 *  entry renders publicly ONLY when enabled with a real URL — no dead
 *  links, no placeholders. */
export interface SocialLink {
  platform: "linkedin" | "instagram" | "x" | "tiktok";
  /** Official company URL — never invented. null until supplied. */
  url: string | null;
  enabled: boolean;
  label: LocalizedText;
  order: number;
}

/** Regional Gulf reach destination (P4 Rev3 §10): storytelling reach
 *  trajectories, NOT project-evidence locations. */
export interface GulfRegion {
  id: string;
  name: LocalizedText;
  latitude: number;
  longitude: number;
  enabled: boolean;
}

/** Hero cinematic media slot (P4 Rev3 §§7–9). All paths under /public;
 *  replacing the asset is a data edit, never a component change. */
export interface HeroMediaConfig {
  /** false until an owner-approved asset exists — nothing renders. */
  enabled: boolean;
  /** Desktop/tablet video (mp4/webm, muted-loop ambient). */
  videoSrc: string | null;
  /** Lighter mobile derivative; falls back to poster when null. */
  videoMobileSrc: string | null;
  /** Mandatory poster/fallback still (also the STATIC-tier visual). */
  poster: string | null;
}

/** Hero photographic scene (owner-approved still; Riyadh media round).
 *  Swapping the photograph is a data edit, never a component change. */
export interface HeroSceneConfig {
  /** Fallback src (broadest-support format, largest size). */
  src: string;
  /** Modern-format responsive candidates, standard srcset syntax. */
  srcSet: string;
  /** Rendered-width hint for the browser's candidate selection. */
  sizes: string;
  /** Intrinsic pixel size of the master (drives the art-direction frame
   *  aspect ratio and the overlay coordinate space). */
  width: number;
  height: number;
}

export interface ProfileDocument {
  locale: Locale;
  /** Path under /public. */
  src: string;
  label: LocalizedText;
}

/* ------------------------------------------------------------------ */
/* Navigation (Q10)                                                    */
/* ------------------------------------------------------------------ */

/**
 * PRODUCT CATALOGUE record (P5 §4 — architecture first, content later).
 * Localized fields use LocalizedText: `name.ar` carries the owner-approved
 * Arabic (the schema's nameAr/summaryAr/importanceAr). Optional fields
 * stay ABSENT until owner-approved — no placeholders, no invention.
 */
export interface CatalogProduct {
  id: string;
  /** Future /products/[slug] detail route. */
  slug: string;
  name: LocalizedText;
  /** Short supporting copy. */
  summary: LocalizedText;
  /** Why it matters / use case (owner-supplied). */
  importance: LocalizedText;
  /** Owner-approved category wording only. */
  category?: LocalizedText;
  /** Primary product photograph under /public (owner-supplied). */
  image?: MediaRef;
  /** Additional owner-supplied imagery. */
  gallery?: MediaRef[];
  featured: boolean;
  /** A-004 pattern: false = excluded from ALL public rendering. */
  published: boolean;
  sortOrder: number;
}

export interface NavItem {
  id: string;
  label: LocalizedText;
  /** Route path without locale prefix (e.g. "/solutions"). */
  href: string;
  highlight?: "smart-ai" | "cta";
  order: number;
}
