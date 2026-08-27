# Smart Channels 2026 Website — Decision Log

> Authoritative record of approved project decisions, per Master Directive §43.
> Before proposing or asking anything, check this log first. Decisions here are
> settled unless the owner explicitly reopens them.
>
> Status values: **Approved** · **Open** · **Superseded**

---

## Governance decisions

### D-001 — Logo
- **Date:** 2026-08-27
- **Decision:** Use only the authoritative Smart Channels logo supplied in Sources. No redesign or reinterpretation. The orange/red mark visible on field clothing is NOT an official brand variant unless explicitly approved later. If a vector logo is unavailable and a vector representation becomes technically necessary (e.g., for the opening animation), do not trace or recreate it automatically — first explain the proposed method, expected fidelity, and necessity, then request approval.
- **Reason:** Brand integrity; the supplied logo is authoritative (§4).
- **Scope:** All brand usage, opening experience, navigation, favicons, OG images.
- **Status:** Approved

### D-002 — Track Record
- **Date:** 2026-08-27
- **Decision:** Approved headline statistics (confirmed correct by owner):
  - **200+** Projects Delivered
  - **7** Years of Continuous Delivery
  - **16+** Sectors Served
  - **100+** National Venues & Events

  These exist in ONE centralized structured data source. Never duplicated across components or localization files. Track Record UI must later support viewport-triggered count-up animation (0 → value), smooth and premium, triggered on viewport entry, not restarting unnecessarily, preserving suffixes (`+`), respecting `prefers-reduced-motion`. Future number changes require changing data only. See amendment A-001 for the `asOf` contract.
- **Reason:** Credibility requires consistency; maintainability requires a single source (§16).
- **Scope:** `src/content/stats.ts` (P3+), Track Record UI (P6), company page.
- **Status:** Approved

### D-003 — Projects
- **Date:** 2026-08-27
- **Decision:** Project names from the approved Company Profile may be modeled as source-backed project records. Do NOT: download replacement logos from the internet; invent project scope; infer deliverables; create unsupported case-study narratives. Where the profile explicitly provides scope (sports cities/stadiums section, PDF p. 26), that information may be modeled. Project logo/public-usage status is explicit per record so records can be enabled, disabled, or displayed text-only via data alone.
- **Reason:** §3 source-of-truth rule; legal/brand safety on client identities.
- **Scope:** Project content schema, projects index page, homepage Selected Projects.
- **Status:** Approved

### D-004 — Featured Projects
- **Date:** 2026-08-27
- **Decision:** Featured Projects are NOT selected purely by prestige. Before P9, perform a **Project × Media × Evidence assessment** scoring: (1) approved project identity, (2) confirmed Smart Channels scope, (3) available authentic imagery/video, (4) visual storytelling potential, (5) strategic importance. The final 3–5 Featured Projects remain undecided.
- **Reason:** Credibility must outrank spectacle (§45); avoids implying unsupported claims.
- **Scope:** P9 planning; `featured` flags in project data.
- **Status:** Approved (assessment pending — see Open Items)

### D-005 — Technology Alliances & Clients
- **Date:** 2026-08-27
- **Decision:** Use only approved supplied assets. Never source replacement logos from Google/other websites. If PDF extraction quality is unacceptable, record the logo as an **Asset Gap** instead of silently substituting. Data architecture allows individual alliance/client records to be enabled, disabled, or replaced later without redesigning the UI.
- **Reason:** §22–§23; brand/legal safety.
- **Scope:** Partners page, homepage alliances/clients sections, asset pipeline.
- **Status:** Approved

### D-006 — Arabic
- **Date:** 2026-08-27
- **Decision:** Arabic is part of the product from the beginning. `/en` and `/ar` architecture from the foundation — no English-first retrofit. Arabic corporate copy: prepared professionally, based strictly on approved English source content, treated as requiring owner review/approval before publication. No new business claims may be introduced during translation. P14 is a final RTL **audit**, not first implementation.
- **Reason:** RTL retrofits are rework by definition; Saudi market requires first-class Arabic.
- **Scope:** All phases P3–P18. See amendment A-002 for completeness enforcement.
- **Status:** Approved

### D-007 — Hero Direction
- **Date:** 2026-08-27
- **Decision:** Hybrid direction: proprietary technical cinematic environment (network topology, signals, nodes, connectivity, infrastructure, controlled particles, depth, transmission, systems integration) + selectively integrated approved authentic media. Do NOT upscale the supplied low-resolution phone videos into full-screen hero backgrounds. Final visual direction requires P2 approval; no hero implementation yet.
- **Reason:** No hero-grade footage exists; a designed technical environment is ownable and performant.
- **Scope:** P2 creative direction, P5 hero build.
- **Status:** Approved (visual direction pending P2)

### D-008 — Gallery
- **Date:** 2026-08-27
- **Decision:** Supplied photos/videos are **candidate** initial Gallery assets. Not every legacy `img/` file is automatically used. Gallery architecture is data-driven, designed for continuous expansion of JPG/JPEG/PNG/WebP/AVIF/MP4/WebM without component redesign. Clear separation of MEDIA FILES from MEDIA METADATA. Must support future CMS migration without rewriting the presentation layer.
- **Reason:** §19 CMS-like requirement; owner's ongoing workflow priority.
- **Scope:** Gallery schema, `public/media/gallery/`, P10 build.
- **Status:** Approved

### D-009 — Smart AI
- **Date:** 2026-08-27
- **Decision:** Initial build = premium front-end experience and integration-ready UX. Do NOT fabricate a working AI backend. Do NOT hard-code fake model responses in a way that could mislead users into believing they are communicating with a live AI service. Interface/interaction architecture designed so a real provider/API connects later. Provider, privacy architecture, lead routing, and API integration are future decisions.
- **Reason:** §21; honesty requirement.
- **Scope:** P11.
- **Status:** Approved

### D-010 — Deployment
- **Date:** 2026-08-27
- **Decision:** No production domain configured or assumed. No production deployment during build phases. Website is completed, exported, and tested locally first. Production deployment authorized separately after final review.
- **Reason:** Owner controls go-live.
- **Scope:** All phases; P19 handoff.
- **Status:** Approved

### D-011 — Contact
- **Date:** 2026-08-27
- **Decision:** Use only currently approved Company Profile contact information (PDF p. 31): King Faisal Road, Al Murabba District, Riyadh, Kingdom of Saudi Arabia · +966 11 217 6668 · info@smartchannels.co. Do NOT invent WhatsApp numbers, social accounts, LinkedIn URLs, map coordinates, additional offices, or careers information. These can be added later through the structured content system.
- **Reason:** §3 no-invention rule.
- **Scope:** Contact page, footer, structured data.
- **Status:** Approved

### D-012 — Legacy Website
- **Date:** 2026-08-27
- **Decision:** When P3 is explicitly authorized, the legacy static website (root `index.html`, `style.css`, `index.js`, legacy background art) may be replaced by the new application. Git history preserves the previous implementation. Not deleted or replaced during P1.
- **Reason:** Clean rebuild from zero (§1) with recoverable history.
- **Scope:** P3.
- **Status:** Approved

### D-013 — Rich Project / Case Study Content
- **Date:** 2026-08-27
- **Decision:** A single project must be architecturally capable of containing more than one image. Each project may eventually support: multiple images; multiple videos where available; project year; project period/range where applicable (`2025` or `2023–2025` per approved source data); location; sector; short approved overview; confirmed services delivered; related solution families; a project-specific media gallery; optional featured status; public/published state; media ordering.

  **Services delivered** — conceptual contract (only services explicitly supported by approved Smart Channels source material may be populated; never inferred or invented):

  ```ts
  type ProjectService = {
    id: string;
    title: LocalizedText;
    description?: LocalizedText;
  };
  // on Project: services?: ProjectService[];
  ```

  **Project media** — a collection, not a single image; arbitrary ordered mixes (image → image → video → image …) must never require React component changes:

  ```ts
  type ProjectMedia = {
    id: string;
    type: 'image' | 'video';
    src: string;
    poster?: string;
    alt: LocalizedText;
    caption?: LocalizedText;
    order: number;
  };
  // on Project: media?: ProjectMedia[];
  ```

  **Gallery relationship:** no unnecessary duplicate physical media files. The same approved asset must be able to appear inside its related project/case study AND in the main public Gallery through metadata relationships (IDs/references), not duplicate uploads.

  **Future project detail pages:** individual pages remain deferred at launch unless sufficient approved case-study content exists, but `/[locale]/projects/[slug]` must later be able to display hero/lead media, name, year/period, location, sector, overview, services delivered, related solutions, multiple images/videos, and related Gallery media — without redesigning the base Project content model.

  **Owner editability:** adding a photo to an existing project, adding a service, or changing a project year must be a structured-content edit only — never a new React component, page-layout modification, project duplication, or Gallery-architecture rebuild.
- **Reason:** Projects are the strongest proof point; the model must grow into full case studies without schema redesign. Extends A-003/D-003 — all provenance rules (no invented scope/content) remain fully in force.
- **Scope:** Project + Gallery schemas; future `/projects/[slug]`; P9/P10 builds. To be reflected in `docs/content-model.md` and `docs/maintenance-model.md` at the next authorized documentation update.
- **Status:** Approved

---

## Content clarification items

### C-001 — "87 contracted engagements between 2020 and 2026"
- **Date:** 2026-08-27
- **Decision:** This statement exists in the source profile (p. 21) but is **excluded from all public website content** until its relationship to the "200+ Projects Delivered" figure is explicitly resolved by the owner. Do not surface it anywhere in public-facing content. Do not invent an explanation reconciling the figures.
- **Status:** Open (excluded until resolved)

---

## P1 rulings (Q1–Q12, 2026-08-27, all Approved)

| ID | Topic | Ruling |
|----|-------|--------|
| Q1 | Page architecture | Multi-page. Homepage = primary immersive journey. Localized routes: `/[locale]/solutions`, `/[locale]/solutions/[slug]`, `/projects`, `/industries`, `/gallery`, `/company`, `/partners`, `/contact`. NO public project detail pages at launch; schema reserves `/projects/[slug]` for later (see A-003). |
| Q2 | Solutions taxonomy | The 7 source-backed families from the Company Profile are canonical (Infrastructure & Data Centre; Networking & Connectivity; Security Solutions; Biometrics & Access Control; Audio & Visual Solutions; Unified Communications & Smart Buildings; Video Surveillance & AI Solutions). Sub-solutions modeled within each family. Reorganization must be possible via data changes. |
| Q3 | Industries | Model all 16 approved sectors with `featured` + `order`. Initial homepage featured candidates: Major Sporting Events; Stadiums & Sports Cities; Giga-projects; Government & Public Sector; Cultural Seasons & Festivals; Motorsport & Racing; Hospitality & F&B. Featured selection is configurable data. No invented industry claims/imagery. |
| Q4 | Default locale | `/` → explicit preference cookie (set by manual switch) → else Arabic-preferred browser → `/ar`, otherwise `/en`. Manual choice persists and overrides detection on future visits. Clean explicit `/en` `/ar` canonical routes for SEO. |
| Q5 | Proper nouns in Arabic | Mixed policy with per-record override (`name.en` / `name.ar`). Vendors may remain Latin. Official Arabic names used where established. No automatic transliteration; no invented Arabic names. |
| Q6 | Owner editing workflow | Typed TypeScript structured content modules, strict types, compile-time validation, loud failures. Content files deliberately simple; routine editing must not require understanding React components. Presentation separate from business content. |
| Q7 | Gallery metadata | Practical model: `id`, `type`, `src`, localized `alt`, localized `caption` (optional), `year`, `location`, `category`, `projectId`, `featured`, `order`, `poster` (video). Optional fields not mandatory; incomplete metadata must not break rendering. Automatic poster-generation script with manual override (implemented/documented by P10). |
| Q8 | Gallery categories | Filtering approved. Taxonomy: Events & Venues; Infrastructure & Networks; Security & Surveillance; Audio Visual; Field Operations. "All" is a UI state, not a stored category. Labels EN/AR. Centrally configurable. |
| Q9 | Contact experience | Professional enquiry form modeled in architecture. NO fabricated submission backend; no email/API service yet. `tel:` / `mailto:` links approved. Form must make its integration state explicit and never falsely claim submission succeeded. |
| Q10 | Navigation | Top level: Solutions · Projects · Industries · Gallery · Company · Partners. Primary CTA: "Let's Talk". Smart AI gets a visually highlighted presence but no dedicated route at launch. Locale/theme are utility controls. Mobile navigation gets its own intentional design. |
| Q11 | Profile downloads | English profile only while it is the only document. No "Arabic — Coming Soon" placeholder. Content model carries an AR slot fillable by data only. |
| Q12 | P1 documentation | `docs/decision-log.md`, `docs/ia-sitemap.md`, `docs/content-model.md`, `docs/asset-inventory.md`, `docs/maintenance-model.md`. Maintenance doc = architecture intent at P1, not the final README. |

---

## P1 amendments (A-001–A-006, 2026-08-27, all Approved)

### A-001 — Track Record `asOf` required numeric
`Stat.asOf` is a **required `number`** (not optional string). Current approved value: `asOf: 2026`. Conceptual contract:

```ts
type Stat = {
  id: string;
  value: number;
  suffix?: string;
  label: LocalizedText;
  asOf: number;      // required
  source?: string;
};
```

### A-002 — Arabic completeness / no silent production fallback
English fallback for incomplete Arabic **business content** is permitted during development only, and every fallback must produce a visible validation/reporting warning. For production release, Arabic completeness validation must pass; missing required Arabic business copy is a **release-blocking content issue**. Exception: proper nouns intentionally configured to remain in their official Latin form are valid and are NOT missing translations. The content model documents how intentional-Latin is distinguished from missing (see `docs/content-model.md` §"Localization").

### A-003 — Future project case-study contract
The future slot is `caseStudy?: ProjectCaseStudy` (not `caseStudy?: null`). `ProjectCaseStudy` defines structural capability only — potential fields: overview, approved hero media, project media, confirmed scope, location, timeline, solution relationships, gallery relationships, source-backed outcomes. No invented case-study content is ever populated; no project detail pages at launch. Purpose: `/projects/[slug]` can be added later without redesigning the base `Project` schema.

### A-004 — Publish control
Owner-managed content carries explicit publish state. Gallery items: required `published: boolean`; `published: false` excludes the item from public rendering while preserving metadata. Projects: public display controlled through the existing `display` architecture (`'logo' | 'text-only' | 'hidden'`, where `'hidden'` = not publicly rendered). All data-driven — content can be prepared in the repository without automatic public exposure.

### A-005 — Media dimensions & owner workflow
The owner is never required to manually inspect/type image dimensions when adding media. Width/height may be stored where technically useful, but by P10 the project provides a documented utility/validation workflow that reads or generates necessary media metadata automatically where practical. Adding gallery media = ① add file ② add/edit understandable metadata ③ run documented validation/media utility if required ④ build. Never React component modification.

### A-006 — CMS position
No CMS now. Repository-based typed content architecture. The accessor boundary (`src/lib/content/`) is preserved so a future CMS can replace the data source without rewriting presentation components. Priorities: reliability, ownership, simplicity, strict validation, easy local editing, no vendor lock-in.

---

## P2 — Creative Direction rulings (2026-08-27, all Approved)

Q-P2-1…Q-P2-14 answered and the P2 STEP D proposal approved in principle
with amendments P2-A01…P2-A11. Full creative contract lives in
`docs/creative-direction.md`; summary of binding rulings:

| ID | Ruling |
|----|--------|
| Q-P2-1 | Neutral premium dark foundation (near-black/charcoal); magenta as controlled accent; purple as atmosphere only — never dominant. No Purple AI Syndrome. |
| Q-P2-2 | Free/self-hostable fonts only; industrial/grotesque editorial direction; no commercial-font dependency; 2–3 candidates compared before final selection. |
| Q-P2-3 | Modern Arabic sans designed as first-class alongside Latin; **Western numerals 0–9 in the Arabic experience** (stats keep `200+` form). |
| Q-P2-4 | Dark default; Light fully designed first-class; stored explicit theme choice respected; contrast rhythm follows storytelling, never mechanical alternation. |
| Q-P2-5 | Full signature opening (particles → mark → dispersion → network environment → hero); 2–3s; once/session; skippable; reduced-motion static frame; technique chosen only after logo asset assessment (D-001). |
| Q-P2-6 | Hero = pure designed technology environment; no low-res photography dependence; photography arrives later as evidence. |
| Q-P2-7 | `TECHNOLOGY BEHIND THE EXPERIENCE.` approved as working direction, not locked; 3 EN/AR candidates proposed; final selection after boards (see P2-A03). |
| Q-P2-8 | Dual-register motion (Engineered 150–500ms / Cinematic 600–1200ms) with shared easing/duration/stagger/distance/blur tokens. No random values. |
| Q-P2-9 | Native scroll foundation; ≤3 pinned sequences (Opening→Hero, Solutions, Featured Project); Connected Earth developed at P2 for Track Record with strict source-backed geography. |
| Q-P2-10 | Solutions = Editorial Index + Live Preview + ambient (non-navigational) topology; keyboard/touch accessible; mobile progressive disclosure. |
| Q-P2-11 | Projects = Typographic Evidence Wall; global non-destructive media grade preserving authenticity; originals untouched. |
| Q-P2-12 | Gallery = editorial masonry + filters + accessible lightbox; content videos never autoplay with sound; ambient video always muted. |
| Q-P2-13 | Adaptive motion complexity by capability tier; canvas not categorically banned on mobile; reduced-motion gets complete designed experience. |
| Q-P2-14 | P2 deliverable = written specification + static visual boards (mandatory before visual implementation). |

### P2 amendments (P2-A01…P2-A11, 2026-08-27, all Approved)

- **P2-A01** — Concept "THE SIGNAL BEHIND EVERYTHING" approved (internal, not automatically public copy); three governing principles approved; network field approved as primary ownable system; every technical visual must relate to connectivity/infrastructure/integration/transmission/coverage/evidence.
- **P2-A02** — Typography NOT final until visual comparison: Board 02 shows Archivo-led Candidate A vs one alternative (Geist-led Candidate B) on the SAME hero composition/copy; Arabic evaluated alongside Latin; no fonts installed as app dependencies during P2.
- **P2-A03** — Hero headline remains visually selectable: H1 primary + one restrained alternate shown on the board; final approval after board review.
- **P2-A04** — General positioning copy follows approved source scope "the Kingdom and the Gulf" (profile p. 30); "across Saudi Arabia" only when intentionally discussing Saudi national project evidence. All hero support copy remains proposed until approved.
- **P2-A05** — National Signal Field semantics: national reach / connected evidence, NOT operational routing from HQ. Riyadh labeled separately as HQ; no Riyadh→every-project topology; every geographic node source-backed.
- **P2-A06** — Track Record counters (200+ / 7 / 16+ / 100+) must live inside the Signal Field scene; Board 05 shows placement; count-up implemented later (P6), not in P2; reduced-motion shows final values.
- **P2-A07** — Smart AI board/design must communicate prototype state: conceptual, integration-ready; no fake streaming, model status, response times, capabilities, or conversations presented as real functionality.
- **P2-A08** — Media grade: 10–15% desaturation is a direction, not a universal value; adapt per photograph; preserve documentary authenticity; originals untouched.
- **P2-A09** — Boards expanded to 11: the ten proposed + Board 11 Full Homepage Journey strip (rhythm/pacing/diversity evaluation; may be lower fidelity but sequence must be clear).
- **P2-A10** — Blink remains benchmark only; no reproduction of its compositions/transitions/navigation/typography/layouts/identity; Smart Channels language = signal + topology + infrastructure + connectivity + evidence + controlled particles.
- **P2-A11** — P2 authorizes design artifacts only: specification, 11 boards, listed documentation updates. No scaffold, no `src/`, no libraries, no components, no Canvas/WebGL implementation, no P3, no legacy deletion.

### P2 Revision Round 1 — Motion, Legibility & Cinematic Experience Lock (2026-08-27, Approved)

- **P2 visual direction: APPROVED IN PRINCIPLE** with this focused refinement; boards not redesigned.
- **D-014 — Typography locked:** Candidate A — Archivo-led English system (Archivo display / Inter body / IBM Plex Mono annotations) with the proposed Arabic companions (Noto Kufi Arabic display / IBM Plex Sans Arabic body). Legibility takes priority over visual experimentation in the Arabic pairing.
- **D-015 — Hero headline locked:** `TECHNOLOGY BEHIND THE EXPERIENCE.` is the primary English Hero headline. `CONNECT. PROTECT. EMPOWER.` is not the primary Hero (available as a section motif only).
- **D-016 — Motion & Legibility Implementation Contract:** `docs/motion-implementation-contract.md` is binding on P4–P16. Key rulings: cinematic motion is a core requirement (no static-sections-with-fade-ups outcome); every major movement communicates signal/connection/reveal/evidence/transition/hierarchy/progression; varied cinematic grammar (quiet vs immersive scenes); opening = multi-depth believable particle physics with no hard cut into the Hero; hero = staged kinetic reveal with earned-accent EXPERIENCE resolve; Track Record = counters coordinated with progressive node/link/signal choreography; Solutions selection visibly reconfigures topology; **Featured Projects gain a mandatory Cinematic Media Mode when authentic approved media exists (never reduced to typography)** alongside the approved Evidence Wall for media-less records; Gallery FLIP reflow + accessible lightbox transitions; five seam devices mapped to explicit homepage boundaries; production legibility rules (mono micro-labels are decorative/supporting only, AA contrast, Arabic line-height/sizing); FULL/LITE/STATIC capability tiers with mandatory content parity; performance budgets set before implementation; GSAP admitted only with evidence for Featured choreography; no WebGL at launch.

---

## P3 — Technical Foundation (2026-08-27, implemented under owner authorization with Amendments 1–8)

**Resolved technology manifest (Amendment 1 — exact, pinned, compatibility-verified):**
next 16.3.3 · react/react-dom 19.2.8 · next-intl 4.14.0 · tailwindcss + @tailwindcss/postcss 4.3.3 · typescript 5.9.3 (TS 7.0 skipped: brand-new native-port major, stability priority) · eslint 9.39.5 (eslint 10 rejected by eslint-plugin-jsx-a11y 6.10.2 peer range — stability per Amendment 1) · eslint-config-next 16.3.3 · prettier 3.9.6 · vitest 4.1.11 · @playwright/test 1.56.1 (pinned to environment browsers; satisfies Next peer ^1.51.1) · sharp 0.35.4 · tsx 4.23.12 · @types/node 20.19.43 (matches Node 20 engines floor) · @types/react 19.2.18 · @types/react-dom 19.2.5.

**Key implementation rulings:**
- Q-P3 answers 1–12 and Amendments 1–8 executed as approved; standard Node-capable Next architecture, all content pages statically generated; server-side locale middleware (next-intl) implementing the Q4 cookie-first detection.
- **Fonts:** self-hosted via manual `@font-face` with per-script unicode-range subsets (`public/fonts/`) rather than `next/font/local` — next/font cannot express unicode-range subsetting, and per-script subsets serve the approved priorities (Arabic shaping, sensible subsetting, offline builds). All SIL OFL, licenses documented.
- **CSP (Amendment 4):** production `default-src 'none'` baseline; the ONE inline allowance is `script-src 'unsafe-inline'` — required by Next's static-generation inline bootstrap chunks (no nonce possible on static output; per-page hashes impractical); scope script-only, external script origins remain fully blocked; documented in next.config.ts as removable when pages become dynamic or Next ships static nonce/hash support. `style-src 'unsafe-inline'` for React style attributes/critical CSS (style-only, no user-generated content). Dev-only additions: 'unsafe-eval' + ws: for HMR, never in production.
- **Amendment 2 compliance:** 32 project records — all from pp.24–26; every optional unsupported field left absent (e.g. Al Awal Park row carries no location: p.26 does not state one); two p.30 client names omitted as not confidently legible (owner to confirm; see asset inventory). Partner `domains` omitted (profile does not map vendors to domains). All projects `featured: false` (D-004), all `display: 'text-only'` (no approved logo assets, O-005).
- **Amendment 3 compliance:** media-source/ committed as archive (3 videos, profile PDF, master logo extraction); gallery ships 3 candidate records `published: false`; NO public derivatives generated for unpublished media — media scripts process approved records only, so nothing unapproved is publicly reachable. Verified: /media-source/* returns 404.
- **Git LFS (Amendment 7):** not introduced; threshold procedure documented in media-source/README.md without a hard-coded size law.
- **O-013 (new open item):** no official light-background logo lockup exists; light theme shows the self-contained SC mark cropped from the authoritative asset (no lockup fabricated, D-001). Owner to supply an official light variant.

---

## P4 — Opening Experience + Navigation (2026-08-27, owner-approved direction & rulings)

**D-017 — Cinematic brand-to-geography opening (extends P2, does not cancel it).** The first-visit opening is one continuous cinematic sequence: Smart Channels particles → brand assembly (readable hold) → controlled dispersion → Saudi Arabia emerges → Riyadh/HQ revealed → restrained national evidence network expands (+abstract Gulf reach) → continuous transformation into the Hero → locked H1. No cuts between scenes; the visual system transforms continuously. Supersedes the ≤~3 s clause of motion-contract §5·01: **target ≈4.6 s, tunable 4.3–5.2 s during browser QA** (A-1); must never feel slow or like a loading screen.

**D-018 — Logo particle method (D-001 compliance, A-2 approved).** Build-time raster sampling of the authoritative logo master generates the particle point-cloud; at full coherence the sequence crossfades into the **untouched authoritative raster asset** — the identity the visitor reads is always the real approved logo. No tracing, no redesign, no invented vector. Architecture must allow swapping in an official vector source later without rebuilding the animation system.

**P4 rulings (all owner-approved 2026-08-27):**
- **B-3:** refined stylized Saudi representation — immediately recognizable as Saudi Arabia (cinematic point-cloud/topology, depth, restrained luminous contour cues, selective node illumination); no political-border styling, no infographic/dotted-template aesthetics.
- **C-4:** Riyadh label locked — EN `RIYADH — HEADQUARTERS`, AR «الرياض — المقر الرئيسي»; precision ring + controlled ignition pulse + restrained label + subtle camera emphasis; never presented as operational hub-and-spoke (P2-A05 remains binding).
- **D-5:** opening stays geographically restrained: Riyadh is the only persistent textual label; other nodes source-backed and normally unlabeled (adding 1–2 city labels requires a QA-time proposal to the owner first); no project names in the opening; full evidence narrative + counters remain P6.
- **E-6:** map→Hero is a cinematic camera transformation, not a fade: topology releases, particles gain depth, virtual camera pushes/reframes, geographic literalness dissolves, one magenta trajectory survives into the hero field, H1 emerges from the same spatial composition; Riyadh ring dissolves during the transformation.
- **F-7:** navigation absent during the opening, enters with the final hero reveal; instant on skip; transparent over hero → controlled blur/solid after scroll; no glassmorphism overuse.
- **F-8:** intentional full-screen mobile navigation in the same visual universe; usability over spectacle; keyboard/focus accessible.
- **G-9:** LITE tells the same five-beat story at ≈4.0 s with reduced density/depth/camera/signal complexity.
- **H-10:** scene labels localize; the logo asset itself never changes; directional/compositional behavior mirrors in RTL where meaningful; **Saudi geography itself is never mirrored**.
- **D-019 (H-4, formal):** cinematic dark environments (Opening, Hero, National Signal Field, Smart AI, and any scene later designated dark-cinematic) remain dark in BOTH global themes; the Light theme governs editorial/structural surfaces and UI. Preserves the approved dark/light storytelling rhythm.
- **I-11:** reduced-motion/STATIC = no timed opening; direct meaningful Hero with a designed static backdrop representing the system's final state; all content available.
- **J-12:** ≤60 KB gz opening engine + data; dynamically loaded; server-rendered Hero remains the meaningful-first-frame baseline; engine not ready ≈1.5 s after first paint → silent skip (no spinner/percentage/blank/blocking); runtime frame monitoring auto-downgrades FULL→LITE.
- **K-13:** geographic data is owner-editable with **latitude/longitude as the canonical human-maintained coordinates**; normalized/cartographic positions are derived by tooling, never hand-maintained; validation enforces that non-HQ evidence locations reference approved source-backed project records.
- **Cinematic quality bar:** completion is judged as a continuous cinematic composition (depth, particle behavior, transformation continuity, hierarchy, map recognizability, Riyadh moment, camera, typography timing, nav entrance, readability, mobile, performance); no generic easing everywhere; particles never stop/restart between stages — velocity and trajectory carry across target states.
- **Visual diversity rule:** magenta is an accent and narrative signal, never the whole language — neutral/white particles, subtle purple atmospheric depth, controlled magenta activation, focus falloff, scale variation, negative space, typographic contrast.
- **Hero legibility:** once H1 begins revealing, field activity behind/adjacent to the headline is restrained; readability outranks particle density (D-016 remains binding).

**P4 implementation record (QA round, 2026-08-27):**
- **P4-V1 — Hero anchor fix (legibility rule):** `.hero-scene` had only `min-height`, so the content column's `h-full`/`justify-end` never engaged — the headline top-anchored under the transparent nav and clipped at the viewport edge. Fixed by making the scene a flex column with the content as `flex-1` (bottom-anchored) plus top padding clearing the header; verified across EN/AR desktop, mobile, STATIC and a short 1280×700 viewport (H1 top always below header bottom; proof row bottom-anchored).
- **P4-V2 — Jeddah shoreline vertex nudge (K-13 integrity):** content validation correctly rejected Jeddah (39.17E) as outside the stylized coast, whose segment ran ~0.16° east of the true coordinate. Two Red Sea outline vertices moved seaward ([39.7,20.8]→[39.45,20.75], [39.1,22.0]→[38.95,22.0]); canonical lat/lon untouched; point cloud regenerated by tooling; map recognizability re-verified in browser. Coordinates stay truthful — the stylized art adapts to the data, never the reverse.
- **P4-V3 — STATIC mount + engine start:** the opening host reads the pre-paint motion tier via `useSyncExternalStore` (server snapshot `static`); STATIC renders no canvas/DOM at all, and the engine effect keys on the resolved tier so the first cinematic frame still starts correctly after hydration.
- **Verification:** behavior suite 20/20; Playwright smoke 40/40 (desktop+mobile, EN+AR, all routes); typecheck/lint/content-validation/unit tests clean; opening chunk 26 KB gz (budget ≤60 KB, J-12); measured FULL desktop ≈5.4 ms avg / ≈8 ms p95 per frame, LITE mobile ≈2.5 ms avg, zero console errors, no runtime downgrade triggered.

## P4 — Visual Revision Round 2 (2026-08-27, owner live-browser review)

**D-020 — Company Profile is source-only.** The supplied Company Profile PDF
was provided ONLY as the source of truth for approved company information. It
must never be published, downloadable, or publicly reachable: no copy under
`public/`, no download CTA, no route, no sitemap/metadata reference, no public
derivative. This supersedes the Q11/P1–P3 assumption of a public download.
The approved information EXTRACTED from it remains valid website content. The
source stays privately archived in `media-source/documents/` (marked SOURCE
MATERIAL — NOT PUBLIC). `npm run validate` fails on any PDF under `public/`
or any publicly-enabled Profile record. The former homepage "Company Profile"
chapter is removed; the journey closes Alliances → Clients → Final CTA.

**D-021 — Saudi/Gulf cinematic network scene (homepage chapter 04).** The
approved geographic brand narrative is a designed homepage scene, not a map
widget: the Kingdom emerges from the established particle universe → Riyadh
activates as the cinematic origin (ring sweep, bloom, `RIYADH /
HEADQUARTERS` · «الرياض / المقر الرئيسي») → the signal travels outward city
by city along curved routes → the constellation matures → abstract unlabeled
trajectories continue toward the Gulf horizon. **Semantic distinction
(binding):** this scene is BRAND/REACH storytelling, where Riyadh may
initiate the outward signal; project-evidence semantics (Track Record /
future National Signal Field evidence claims) remain peer-based per P2-A05 —
nodes carry no project labels and nothing claims operational HQ routing.
All destination nodes are source-backed location records (validated);
Gulf continuation is abstract with no fabricated nodes/labels. Track Record
counters (D-002: 200+/7/16+/100+, as of 2026) count up from zero in step
with the choreography and resolve exactly; STATIC/reduced-motion receives a
designed final frame (server-rendered SVG map, Riyadh marker, final values)
with no canvas mounted. The story plays once, pauses offscreen, and stops
rendering after completion (one active canvas at a time).

**D-022 — Environment-aware header.** The fixed header adopts the tokens of
the environment BENEATH it (`data-header-env`, computed from
`[data-env="dark"]` scene intersection; pre-paint seeded by the bootstrap):
over dark-committed scenes it always uses dark-scene tokens and the dark
lockup, whatever the global theme; over editorial surfaces it follows the
theme. Root cause of the owner-observed disappearing header: the transparent
header inherited Light-theme ink (#141416 at ~1.4:1) over the dark hero.

**D-023 — Arabic is a first-class designed experience.** (a) Cinematic
parity: every arrival without the full opening (locale switches, return
visits, auto-skip) receives a staged hero entrance + earned accent sweep —
never a static pop-in; the ambient field always resolves to the same cooled
selective-accent state as the completed opening. Root cause of the
owner-observed Arabic degradation: the once-per-session opening left
non-first loads with zero entrance choreography, and the STATIC backdrop
artwork double-rendered behind the live canvas (hide rule was keyed to
`data-opening` instead of the motion tier). (b) Art direction: dedicated AR
hero metrics (clamp 2.25rem–5.25rem, lh 1.32, bounded measure), AR sub
19px/2.05, AR microlabels leave the Latin mono voice (Plex Sans Arabic, no
tracking), larger AR nav type, taller mobile-menu leading. (c) **Approved
Arabic brand wording (binding):** القنوات الذكية / نأخذك إلى المستقبل ↔
Smart Channels / We Take You To The Future — applied to the opening caption,
hero overline and footer textual brand block; the logo artwork itself is
never altered (D-001).

**Revision 2 verification:** 8-cell QA matrix (EN/AR × desktop/mobile ×
dark/light) 64/64; STATIC/parity/profile checks 11/11; behavior suite 20/20;
smoke 40/40; unit 7/7; content validation passing (now incl. D-020 gates);
zero console errors; no horizontal overflow; Profile PDF returns 404;
cinematic code+data ≈29 KB gz total (J-12 budget ≤60 KB); hero field pauses
while the network scene plays (§19).

---

## Project-wide requirements (recorded 2026-08-27)

- **Owner editability:** The finished website must not depend on Claude for ordinary maintenance. Full owner ownership/editability of source, content, statistics, media, projects, gallery, clients, alliances, navigation, contact, translations. Routine content changes happen in obvious structured files, not presentation components. No vendor lock-in; no proprietary visual builder required; code maintainable by another developer. (Detailed in `docs/maintenance-model.md`.)
- **Documentation:** Final project includes complete install/run/build/content-editing documentation (full checklist in Master Directive; delivered as final README at P19).
- **P19 — Final Handoff & Export:** occurs only after approved P18. Deliverables: complete runnable project for download; all source; all approved required assets; dependency manifests + lockfile; final README/documentation; verified clean install, clean production build, and local startup from clean state; final structure map; final maintenance guide. Excludes `node_modules`, `.next`, caches, unneeded test artifacts, local machine files, secrets, `.env` credentials. Provide `.env.example` if env vars become necessary.
- **Approval-gate workflow remains mandatory for every phase:** INSPECT → ASK → WAIT → PROPOSE → APPROVAL → IMPLEMENT → VERIFY → REPORT → STOP. No automatic phase progression.

---

## Open items register

| ID | Item | Blocks | Notes |
|----|------|--------|-------|
| O-001 | Vector logo files (SVG/AI/EPS) not supplied | P2 brand system; P4 opening animation | Per D-001: no automatic tracing. If vectorization becomes necessary, method + fidelity proposal goes to owner first. |
| O-002 | C-001 "87 engagements" reconciliation | Nothing at launch (excluded) | Owner to resolve relationship to 200+ figure if it should ever appear. |
| O-003 | Featured Projects selection | P9 | Requires D-004 Project × Media × Evidence assessment. |
| O-004 | ~~Arabic numerals style in AR locale~~ | — | **RESOLVED 2026-08-27 (Q-P2-3):** Western numerals 0–9 in the Arabic experience; statistics keep `200+` / `100+` forms. |
| O-005 | Partner/client logo source files | P12 | Only PDF-embedded logos exist. Extraction quality to be assessed; failures become Asset Gaps per D-005. |
| O-006 | Hero-grade media | P2/P5 | No 1080p+ cinematic media exists; D-007 hybrid direction compensates. |
| O-007 | Arabic Company Profile PDF | None (Q11: EN-only shown) | AR slot exists in data; add when supplied. |
| O-008 | Which legacy `img/` photos are genuine Smart Channels photography vs. stock | P10 gallery population | Owner confirmation needed per image before Gallery use (D-008: candidates only). |
| O-009 | Contact form backend (service, routing, privacy) | Deployment/integration planning | Q9/D-010: UI modeled, backend deferred. |
| O-010 | Smart AI provider, privacy architecture, lead routing | Post-P11 integration | D-009. |
| O-011 | Production domain & hosting | P19+/deployment | D-010. |
| O-012 | Client-identifying imagery permissions (e.g., "SMC vibes" office photo, Al Nassr room) | P10 gallery population | Owner to confirm usage rights per photo. |
| O-013 | Official light-background logo lockup not supplied | Light-theme brand presentation (P4+ polish) | Light theme currently uses the SC mark cropped from the authoritative asset; no lockup fabricated (D-001). |
| O-014 | Two p.30 client names not confidently legible in source PDF (row-1 Arabic-named partner firm; the "HQWS"-like mark) | P12 clients completeness | Omitted from clients.ts pending owner confirmation (Amendment 2). |
