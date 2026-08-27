# Smart Channels 2026 Website — Information Architecture & Sitemap

> P1 architecture contract. Approved 2026-08-27 (Q1, Q4, Q10, A-004).
> Implementation lands at P3+; any deviation from this document must be flagged
> to the owner explicitly before it is built.

---

## 1. Sitemap

```text
/                                  Locale resolver — redirect only, never an indexed content page
/en                                Homepage (EN) — immersive cinematic journey
/ar                                Homepage (AR) — same journey, genuinely RTL

/{locale}/solutions                Solutions Ecosystem overview (interactive)
/{locale}/solutions/[slug]         Solution family detail pages (7):
                                     infrastructure-data-centre
                                     networking-connectivity
                                     security-solutions
                                     biometrics-access-control
                                     audio-visual-solutions
                                     unified-communications-smart-buildings
                                     video-surveillance-ai
/{locale}/projects                 Projects index (evidence wall) — NO detail pages at launch
/{locale}/industries               Sectors we serve (all 16)
/{locale}/gallery                  Data-driven gallery with category filters
/{locale}/company                  About, mission, Track Record (no Profile download — D-020)
/{locale}/partners                 Technology Alliances + Clients (one page, two distinct treatments)
/{locale}/contact                  Approved contact details + enquiry form (backend deferred, Q9)
```

Generated (non-page) routes, driven by the same content data:

- `sitemap.xml` — both locales, hreflang alternates
- `robots.txt`
- Localized metadata, Open Graph, and social images per route
- Structured data (Organization + LocalBusiness from approved contact data only)

**Reserved for the future, not built at launch:**

- `/{locale}/projects/[slug]` — added only when approved case-study content
  exists (`Project.caseStudy` populated per A-003). The route addition must not
  require changes to the base `Project` schema.
- A dedicated Smart AI route — Smart AI is a homepage section with a
  highlighted navigation presence at launch (Q10); the navigation schema
  supports adding a route later via data.

## 2. Homepage journey (chapter order)

The homepage remains the strongest experiential expression of the brand
(Q1). Chapter sequence follows Master Directive §7 as the working baseline;
composition and any re-sequencing proposals belong to P2:

```text
01 Opening Experience (first meaningful visit; see §8 of Master Directive)
02 Hero (D-007 hybrid technical-cinematic direction)
03 About Smart Channels
04 Track Record × National Network (D-002 count-up synced to the Saudi/Gulf scene — P4 Rev 2)
05 Solutions (ecosystem entry)
06 Industries (featured subset, data-driven per Q3)
07 Selected Projects (D-004 selection pending)
08 Gallery (featured items rail → /gallery)
09 Smart AI Consultant (D-009 front-end experience)
10 Technology Alliances
11 Clients / Trust (distinct treatment from 10, §23)
12 Final CTA — "Let's Talk"
13 Footer

(The former Company Profile chapter is removed by D-020 — the journey
closes Technology Alliances → Clients → Final CTA → Footer.)
```

## 3. Locale routing & detection (Q4)

**Structure:** one dynamic `[locale]` segment (`en` | `ar`) wrapping every
page. Both locales are statically generated.

**Root `/` resolution — priority order:**

1. **Explicit preference cookie** — set only when the visitor uses the
   language switcher. Once set, it always wins.
2. **`Accept-Language` detection** — Arabic-preferred browser → `/ar`.
3. **Fallback** → `/en`.

Redirects are temporary (307), so `/` never becomes a cached/canonical page.

**Persistence rule:** manual selection persists (long-lived cookie) and is
never overridden by detection on later visits. Switching language keeps the
visitor on the equivalent page (`/en/gallery` ⇄ `/ar/gallery`).

**RTL:** `<html lang="ar" dir="rtl">` set at the layout root from the locale.
All layout uses CSS logical properties from P3 onward (D-006 — no retrofit).
Directional UI (arrows, chevrons, carousel controls, motion direction where
semantically relevant) derives from a direction token, never per-component
hacks. P14 is an audit, not first implementation.

## 4. SEO architecture (§35)

- Every page declares a **self-canonical** URL (`/en/...` or `/ar/...`).
- `hreflang` alternates on every page: `en`, `ar`, and `x-default` → the
  `/en` equivalent.
- Cookie/detection behavior never changes content at a canonical URL —
  crawlers always see stable localized pages.
- Localized `<title>`/description per route from the content layer; no
  keyword stuffing.
- Semantic heading hierarchy is a build requirement on every page (§30).

## 5. Navigation (Q10)

**Desktop top-level (order is data-driven):**

| # | Item | Route |
|---|------|-------|
| 1 | Solutions | `/{locale}/solutions` |
| 2 | Projects | `/{locale}/projects` |
| 3 | Industries | `/{locale}/industries` |
| 4 | Gallery | `/{locale}/gallery` |
| 5 | Company | `/{locale}/company` |
| 6 | Partners | `/{locale}/partners` |

- **Primary CTA:** "Let's Talk" → `/{locale}/contact` — visually distinct
  from ordinary nav items.
- **Smart AI:** visually highlighted entry in the navigation experience
  (treatment designed at P2/P4) linking to the homepage Smart AI section; no
  dedicated route at launch. The `NavItem.highlight` field carries this.
- **Utility controls (not navigation items):** locale switcher, theme
  switcher.
- **Mobile navigation:** an intentionally designed experience (direction set
  at P2, built at P4) — not a compressed desktop bar. Usability outranks
  spectacle (§25).
- **Footer:** secondary navigation, approved contact details (D-011), legal
  placeholders only if/when owner supplies content — nothing invented.

## 6. Page-level publish control (A-004)

Public rendering is always filtered through publish state in the content
layer — gallery `published: false` items and project `display: 'hidden'`
records never render publicly, on any page, including sitemaps and structured
data. Content can therefore be staged in the repository ahead of approval.

## 7. Per-page content sources

| Route | Primary content sources (see `docs/content-model.md`) |
|---|---|
| Homepage | `stats`, `solutions` (summary), `industries` (featured), `projects` (featured), `gallery` (featured), `partners`, `clients`, `navigation`, `contact`, UI messages |
| /solutions + [slug] | `solutions` (7 `SolutionFamily` records incl. sub-solutions), related `partners` |
| /projects | `projects` (all with `display !== 'hidden'`), `sectors` cross-links |
| /industries | `industries` (all 16, ordered) |
| /gallery | `gallery` (published), `gallery-categories` |
| /company | company copy content, `stats` (no public documents — D-020) |
| /partners | `partners` (enabled), `clients` (enabled) |
| /contact | `contact`, enquiry form UI (integration state explicit per Q9) |

All of the above render through accessor functions (`src/lib/content/`) — no
page imports content files directly (A-006 CMS-migration boundary).
