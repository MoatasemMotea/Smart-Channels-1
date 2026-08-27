# Smart Channels 2026 Website — Content Model

> P1 architecture contract, approved 2026-08-27 with amendments A-001–A-006.
> The TypeScript files described here are created at P3 (application
> scaffold). This document is the contract those files must match; any
> deviation at P3 must be flagged to the owner before it is built.

---

## 0. The governing rule

> **If changing it would change a business claim, it lives in the business
> content layer exactly once. If it is interface furniture, it lives in the
> UI-strings layer.**

Routine business-content changes must require editing data/content files
only — never React presentation components. Examples that must hold true
forever:

- `200+ → 250+` — one number in `stats.ts`, no component edits.
- Adding a gallery image/video — one file + one metadata entry, no JSX.
- Changing featured industries — flags in `industries.ts`.
- Adding the Arabic profile PDF — one array entry in `documents.ts`.
- Adding a client or alliance — one record, no visual component edits.

## 1. Two content layers

### Layer A — Business content (`src/content/*.ts`)

Typed TypeScript modules (Q6): strict types, compile-time validation, loud
failures. Facts (numbers, ids, paths, years, order, flags) exist **once**,
regardless of language. Localizable strings inside a record use an inline
`LocalizedText` object so facts are never forked per locale.

Planned modules:

```text
src/content/
  stats.ts               Track Record (D-002/A-001)
  solutions.ts           7 canonical families + sub-solutions (Q2)
  industries.ts          16 sectors (Q3)
  projects.ts            Source-backed project records (D-003/A-003/A-004)
  gallery.ts             Gallery items (D-008/Q7/A-004/A-005)
  gallery-categories.ts  Central category taxonomy (Q8)
  partners.ts            Technology alliances (D-005)
  clients.ts             Clients (D-005)
  company.ts             About/mission copy (profile-backed)
  contact.ts             Approved contact info (D-011)
  documents.ts           Downloadable documents (Q11)
  navigation.ts          Nav structure (Q10)
```

Content files are deliberately simple: data literals + type imports only. No
logic, no React, no side effects. Each file carries a header comment
explaining exactly how to edit it (owner-editability requirement).

### Layer B — UI strings (`src/messages/en.json`, `src/messages/ar.json`)

Interface vocabulary only: button labels, form labels, aria text, empty
states, the gallery "All" filter label (Q8), etc. Per-locale files are safe
here because they contain no business facts.

### The accessor boundary (A-006)

Presentation components never import content modules directly. They call
typed accessors in `src/lib/content/` (e.g., `getStats()`,
`getPublishedGalleryItems(locale)`, `getFeaturedIndustries()`). Accessors
also enforce publish filtering (A-004). A future CMS replaces accessor
internals; presentation and schemas are untouched.

## 2. Localization model

### 2.1 `LocalizedText`

```ts
/**
 * en: always required — the approved English source content.
 * ar: professional Arabic based strictly on the English source (D-006),
 *     requiring owner approval before publication.
 * arPolicy: only needed when `ar` is intentionally absent:
 *   'latin' — the official form IS Latin (vendor names like Cisco, HPE).
 *             This is VALID Arabic content, not a missing translation (A-002).
 * A field with no `ar` and no `arPolicy: 'latin'` is INCOMPLETE.
 */
type LocalizedText = {
  en: string;
  ar?: string;
  arPolicy?: 'latin';
};
```

### 2.2 Completeness enforcement (A-002)

- **Development:** rendering may fall back to `en` for incomplete `ar`
  business content, but every fallback is surfaced by the validation report
  (see §5) as a visible warning. No silent fallback.
- **Production release:** the validation run in release mode treats any
  incomplete `ar` business field (no `ar`, no `arPolicy: 'latin'`) as a
  **release-blocking content issue**. The Arabic experience never silently
  ships English business copy.
- **Intentional Latin:** `arPolicy: 'latin'` marks official-Latin proper
  nouns (Q5) as complete. Distinct from "missing" by construction.
- UI strings (Layer B) are checked for key parity between `en.json` and
  `ar.json` in the same validation.

### 2.3 Proper nouns (Q5)

Mixed policy, per record: `ar` is set only where an official Arabic name
exists (e.g., نيوم for NEOM, موسم الدرعية for Diriyah Season); otherwise
`arPolicy: 'latin'`. Never auto-transliterate; never invent Arabic names.
Every proposed Arabic proper noun is flagged for owner confirmation before
publication.

### 2.4 Open typographic decision

Numeral style in the Arabic locale (Western 0-9 vs Eastern ٠-٩) is decided at
P2 (Open item O-004) and then applied consistently via formatting utilities,
not hand-typed digits.

## 3. Schemas

Canonical home at P3: `src/types/content.ts`.

### 3.1 Shared

```ts
type Locale = 'en' | 'ar';

type MediaRef = {
  src: string;              // path under /public/media
  alt: LocalizedText;
  width?: number;           // populated by tooling where useful — never
  height?: number;          //   required manual owner input (A-005)
};
```

### 3.2 Statistics (D-002, A-001)

```ts
type Stat = {
  id: string;               // 'projects' | 'years' | 'sectors' | 'venues' ...
  value: number;            // count-up animation target
  suffix?: string;          // '+' preserved by the UI
  label: LocalizedText;
  asOf: number;             // REQUIRED (A-001). Currently 2026.
  source?: string;          // internal provenance note — never rendered
};
```

Approved data (single source; C-001 excluded from public content):

| id | value | suffix | label.en | asOf |
|----|-------|--------|----------|------|
| projects | 200 | + | Projects Delivered | 2026 |
| years | 7 | | Years of Continuous Delivery | 2026 |
| sectors | 16 | + | Sectors Served | 2026 |
| venues | 100 | + | National Venues & Events | 2026 |

Count-up behavior (implemented P6, driven by this data only):
viewport-triggered, smooth/premium, no unnecessary restarts, suffix
preserved, `prefers-reduced-motion` renders final values without animation.

### 3.3 Solutions (Q2)

```ts
type SubSolution = {
  id: string;
  name: LocalizedText;
  items?: LocalizedText[];        // profile-backed bullet capabilities
};

type SolutionFamily = {
  id: string;
  slug: string;                   // /solutions/[slug]
  name: LocalizedText;
  tagline: LocalizedText;         // profile-backed statement headline
  summary: LocalizedText;         // profile-backed intro copy
  subSolutions: SubSolution[];
  relatedVendorIds?: string[];    // ids into partners.ts (e.g. PBX: cisco, avaya…)
  order: number;
};
```

The 7 canonical families (slugs fixed in `docs/ia-sitemap.md`). Splitting or
reorganizing a family later is a data change (new records / moved
sub-solutions), not a presentation rewrite.

### 3.4 Industries (Q3)

```ts
type Industry = {
  id: string;
  name: LocalizedText;
  featured: boolean;   // homepage showcase membership — data-driven
  order: number;
  media?: MediaRef;    // optional; absent until approved imagery exists
};
```

All 16 profile sectors are modeled. Initial `featured: true` candidates per
Q3: major-sporting-events, stadiums-sports-cities, giga-projects,
government-public-sector, cultural-seasons-festivals, motorsport-racing,
hospitality-fb.

### 3.5 Projects (D-003, D-004, A-003, A-004, D-013)

Per D-013, a project is architecturally a **rich record**: it can carry
multiple ordered media items, multiple approved services, and temporal
structures (`2025` or `2023–2025`), and it relates to Gallery items by
reference — never by duplicating physical media files.

```ts
// D-013: a confirmed, approved service delivered on a project.
// Populated ONLY from approved Smart Channels source material —
// never inferred or invented.
type ProjectService = {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
};

// D-013: one item in a project's own media collection. Arbitrary ordered
// mixes (image → image → video → image …) render through one presentation
// layer — adding items never requires React changes.
type ProjectMedia = {
  id: string;
  type: 'image' | 'video';
  src: string;
  poster?: string;                // videos; auto-generated, manual wins (A-005)
  alt: LocalizedText;
  caption?: LocalizedText;
  order: number;
};

type ProjectCaseStudy = {
  // Structural capability only (A-003). Populated ONLY with approved,
  // source-backed content — never invented. No detail pages at launch.
  overview?: LocalizedText;
  heroMedia?: ProjectMedia;       // lead media for future /projects/[slug]
  outcomes?: LocalizedText[];     // only where explicitly source-backed
};

type Project = {
  id: string;
  slug: string;                   // reserved for future /projects/[slug]
  name: LocalizedText;            // Q5 proper-noun policy applies
  location?: LocalizedText;       // only where source-backed (e.g. "— Jeddah")
  years?: { from: number; to?: number }; // D-013 temporal structure:
                                         // {from: 2025} → "2025";
                                         // {from: 2023, to: 2025} → "2023–2025".
                                         // Only where source-backed.
  sectorIds: string[];
  services?: ProjectService[];    // D-013: confirmed services delivered
  scope?: LocalizedText[];        // profile-backed scope bullets (e.g. p.26)
  media?: ProjectMedia[];         // D-013: project's own ordered media gallery
  galleryItemIds?: string[];      // D-013: related main-Gallery items BY
                                  //   REFERENCE — same physical file appears
                                  //   in both places, no duplicate uploads
  solutionIds?: string[];         // related solution families
  logo?: {
    src: string;
    quality: 'approved' | 'pdf-extract';  // unacceptable quality → Asset Gap, no logo
  };
  display: 'logo' | 'text-only' | 'hidden';  // A-004 publish control:
                                             // 'hidden' = never publicly rendered
  featured: boolean;              // false until D-004 assessment selects 3–5
  caseStudy?: ProjectCaseStudy;   // A-003 future slot — absent at launch
  order: number;
};
```

**Future `/projects/[slug]` contract (D-013):** the route, when authorized,
renders hero/lead media, name, year/period, location, sector, overview,
services delivered, related solutions, the ordered `media` collection, and
related Gallery media — entirely from the fields above. Adding the route
must require no changes to this schema. Adding a photo or service to an
existing project, or changing its year, is a data edit in `projects.ts`
only — never a new component, layout change, project duplication, or
Gallery rework.

### 3.6 Gallery (D-008, Q7, Q8, A-004, A-005)

```ts
type GalleryCategoryId =
  | 'events-venues'
  | 'infrastructure-networks'
  | 'security-surveillance'
  | 'audio-visual'
  | 'field-operations';

type GalleryCategory = {
  id: GalleryCategoryId;
  label: LocalizedText;           // EN/AR labels (Q8)
  order: number;
};
// "All" is a UI filter state in messages files — never a stored category.

type GalleryItem = {
  id: string;
  type: 'image' | 'video';
  src: string;                    // /media/gallery/... (jpg jpeg png webp avif mp4 webm)
  published: boolean;             // A-004: false = excluded from ALL public
                                  //   rendering; metadata preserved
  alt: LocalizedText;
  poster?: string;                // videos: auto-generated by tooling; manual value wins
  caption?: LocalizedText;
  year?: number;
  location?: LocalizedText;
  category: GalleryCategoryId;
  projectId?: string;
  featured?: boolean;             // homepage rail membership
  order?: number;                 // omitted → sorts after explicitly ordered items
};
```

Optional fields degrade gracefully in rendering (Q7): no caption → no
caption row; no year/location → omitted. Incomplete optional metadata never
breaks the Gallery.

### 3.7 Partners & clients (D-005)

```ts
type Partner = {
  id: string;
  name: LocalizedText;            // vendors typically arPolicy: 'latin'
  logo?: { src: string; quality: 'approved' | 'pdf-extract' };
  domains: (
    | 'networking' | 'security' | 'surveillance' | 'datacenter'
    | 'cabling' | 'av' | 'compute' | 'cloud'
  )[];
  enabled: boolean;               // toggle without UI changes
  order: number;
};

type Client = {
  id: string;
  name: LocalizedText;
  logo?: { src: string; quality: 'approved' | 'pdf-extract' };
  enabled: boolean;
  order: number;
};
```

Unacceptable extraction quality → record keeps `logo` absent and the gap is
logged in `docs/asset-inventory.md` (Asset Gap Register). Never substitute
internet-sourced logos.

### 3.8 Contact & documents (D-011, Q11, Q9)

```ts
type ContactInfo = {
  address: LocalizedText;
  phone: string;                  // rendered as tel: link
  email: string;                  // rendered as mailto: link
  links?: { id: string; label: LocalizedText; href: string }[];
  // ships EMPTY — no invented socials/WhatsApp/maps/careers (D-011);
  // future additions are data-only
};

type ProfileDocument = {
  locale: Locale;
  src: string;                    // /docs/... under public/
  label: LocalizedText;
};
// Ships with the EN profile only (Q11). No "coming soon" placeholder.
// Adding the AR profile = add file + one array entry.
```

Enquiry form (Q9): form fields/validation modeled in UI at build time; NO
submission backend is fabricated. During development the form explicitly
shows its non-integrated state and never claims an enquiry was submitted.

### 3.9 Navigation (Q10)

```ts
type NavItem = {
  id: string;
  label: LocalizedText;
  href: string;
  highlight?: 'smart-ai' | 'cta'; // Smart AI presence + "Let's Talk" CTA
  order: number;
};
```

## 4. Content provenance rule

Every business-content value in `src/content/` must trace to: the approved
Company Profile, an explicit owner decision in `docs/decision-log.md`, or an
owner-supplied asset/statement. Anything else does not enter the content
layer. C-001 ("87 contracted engagements…") is explicitly excluded from
public content until resolved.

## 5. Validation strategy (Q6 "fail loudly", A-002, A-005)

Layered checks, all documented for the owner at P19:

1. **Compile time (always on):** strict TypeScript — wrong shapes, missing
   required fields (`asOf`, `published`, `display`…), invalid category ids
   fail the build.
2. **Content validation script (documented, runnable):**
   - every `src`/`poster`/`logo.src`/document path exists on disk;
   - media types are within the accepted set;
   - id/slug uniqueness and referential integrity
     (`projectId`, `sectorIds`, `relatedVendorIds`, `galleryItemIds`);
   - Arabic completeness report (A-002): development mode = visible
     warnings listing every EN fallback; release mode = missing required
     Arabic business copy is release-blocking;
   - messages key parity `en.json` ⇄ `ar.json`.
3. **Media utility (by P10, A-005):** reads/generates media metadata
   (dimensions where useful) and generates video posters automatically;
   manual `poster` values always win. The owner never types dimensions by
   hand.

## 6. Future CMS migration path (A-006)

No CMS now. Because presentation reads only through `src/lib/content/`
accessors and schemas are plain serializable shapes, a future CMS migration
is: replicate schemas in the CMS, point accessors at the CMS client, keep
components and types unchanged. Recorded so the boundary is preserved through
every later phase.
