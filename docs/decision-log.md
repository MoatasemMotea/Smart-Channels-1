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

## P4 — Visual Revision Round 3 (2026-08-27, owner live-review corrections)

**D-024 — The opening plays on every full document load.** The cinematic
brand opening (darkness → particles → assembly → readable authoritative
logo with a lengthened ≈1.4 s premium hold → geography → hero) runs on
EVERY full page load/refresh of the homepage — the previous once-per-session
gating is removed. Soft interactions never replay it: locale switch, theme
switch, menu, and client-side navigation keep the current state (the
bootstrap only runs on real document loads). Skip-on-input, ≈1.5 s
slow-load auto-skip, STATIC direct hero, and the performance budgets all
remain binding. FULL ≈5.35 s, LITE ≈4.6 s.

**D-025 — Cinematic state must survive locale and theme changes (root
cause).** A locale switch is a soft navigation that re-renders the root
`<html>`; React resets its attributes to the SSR defaults — `data-motion-tier`
snapped to `static` (destroying every canvas until refresh) and
`data-opening` was dropped. Fixed structurally: client-owned html state
(theme from storage, the bootstrap-resolved motion tier, the opening state)
is mirrored in module scope and re-asserted by a layout-commit guard
(`HtmlStateGuard`) before paint. The Saudi geography is never rebuilt or
mirrored by locale/theme changes; theme switches restyle token surfaces
only. Regression-covered (in-app switch tests in the QA suites).

**D-026 — No public section numbering.** Section headings carry premium
titles only ("Solutions", «الحلول») — no visible `NN —` chapter labels
anywhere public (homepage headings, network scene, mobile menu). Numbers
remain internal (code, sequencing, tooling). Per-item numeric identifiers
inside content compositions (project entries, solution list) are a
sanctioned design device, and in Arabic the project identifier sits at the
block's upper-right through logical RTL flow (Western numerals per D-014).

**D-027 — Hero moves toward AI-generated cinematic event-technology
media.** The Hero is architected media-first: poster-first muted looping
`playsinline` video that never blocks LCP, FULL/LITE derivatives, STATIC
poster, offscreen pause, full owner-editability in
`src/content/hero-media.ts` (asset swap = data edit). The final asset is
AI-generated brand/capability storytelling media — never presented as
project evidence, never arbitrary stock footage, never misrepresenting
clients. No approved asset exists yet, so the slot ships disabled with the
approved field treatment in place (asset gap O-015; full generation brief
delivered in the Round 3 report; spec recorded in hero-media.ts).

**D-028 — Gulf regional reach: Bahrain · Qatar · UAE.** After the national
network matures, three restrained dashed routes leave the Kingdom toward
real regional geography, ending in HOLLOW rings with muted country labels
under a delayed "Regional reach" / «امتداد إقليمي» legend — visually and
semantically distinct from filled source-backed project nodes. These are
regional-reach storytelling only (consistent with the approved "Kingdom
and the Gulf" scope wording); claiming projects there requires approved
evidence and a separate owner decision. Data-driven in
`src/content/regions.ts`.

**D-029 — Contact actions & interaction color.** (a) Floating WhatsApp
action using owner-approved `+966 53 979 5999` (wa.me/966539795999), data
sourced from `contact.ts`, accessible EN/AR label, safe-area aware, hidden
during the opening, no prewritten message. (b) LinkedIn/Instagram/X
architecture in `src/content/social.ts` — records render publicly ONLY
when enabled with an owner-supplied URL (no invented URLs, no dead links,
no placeholders; validation enforces it). (c) Interactive text (nav,
links, project/solution titles, footer) glides neutral → brand magenta on
hover AND keyboard focus (engineered 300 ms curve, AA accent token in
Light theme, never the only affordance); body paragraphs stay stable.

**Round 3 additions also recorded:** scene-transition family on the reveal
primitive (rise / mask / converge / trace / sweep — per-section devices,
native scrolling, no pinning); map-environment depth (low-alpha perspective
grid + vignette + seeded atmospheric dust + one emergence scan sweep — map
stays primary); lengthened readable-logo hold (§2).

**Development review workflow (§28):** the opening now replays on every
plain refresh — no storage clearing needed. To review all four language ×
theme states without losing the cinematic world, use the in-app header
switchers in sequence (EN dark → toggle theme → light; switch العربية → AR
light → toggle → AR dark): the guard preserves tier/opening/theme state
across every switch. Reduced-motion (OS or DevTools emulation) previews
STATIC. Full matrix scripts live in the session QA harness
(`behavior/matrix/verify/extra` suites, 125 checks).

**Round 3 verification:** refresh-replay ×2, EN↔AR and Dark↔Light in-app
switches with live canvases throughout, header availability, no `NN —`
labels, WhatsApp/wa.me, zero dead links, hover-to-magenta, 8-cell matrix,
STATIC/no-JS frames, AR project composition — 125/125 automated checks;
zero console errors; no horizontal overflow; cinematic code+data 32 KB gz
(J-12 ≤60 KB); frame cost unchanged (≈5.3 ms FULL desktop, ≈2.4 ms LITE
mobile).

---

## P5 authorization note — P4 carryover fix (2026-08-29)

**Arabic Track Record RTL composition (owner live-review correction).**
Each statistic block now composes with the reading direction: in Arabic the
numeric value anchors at the UPPER-RIGHT of its own cell, the label sits
directly beneath it right-aligned, supporting text follows the same block,
and the four statistics read RTL from the right of the section. Root cause:
`dir="ltr"` sat on the `<dd>` block (left-anchoring the whole numeral);
bidi isolation moved to an inline token, so RTL controls block position
while `200+` never renders as `+200`. Western numerals kept (D-014/O-004);
EN unchanged; count-up unaffected. Applied to the network scene and the
company page; geometric regression checks added (15 assertions, EN/AR ×
desktop/mobile). P4 is approved; P5 (Homepage Journey) is authorized.

---

## P5 — Homepage Journey (2026-08-29, owner answers Q-P5-1…Q-P5-8)

**D-030 — Homepage journey compositions (implemented per owner answers).**
About = editorial split with the authentic fiber-splicing field still
(masked reveal; never stock or AI-as-evidence). Solutions = ecosystem
index (the seven families are the interface; signal rail + preview panel;
tap-to-expand disclosure on touch; no hover dependency). Industries = all
16 sectors in a structural typographic matrix, featured sectors emphasized,
no invented claims. Selected Projects = equal-weight evidence wall
(name / approved location / period / p.26 scope; NO featured hierarchy —
D-004 stays a P9 gate). Gallery = editorial masonry preview of the
owner-approved starter set. Smart AI = cinematic convergence teaser, honest
"upcoming experience" framing, CTA routed to /contact until P11 ships the
dedicated route (no fake chat — D-009). Alliances = engineered typographic
vendor index; Clients = calm structural trust field (deliberately
different; records upgrade to logo-backed via data when official assets
arrive). Final CTA = the signal field returns (distributed signals →
controlled convergence → action), dark in both themes, approved routes
only. Section rhythm: no adjacent composition or entry choreography
repeats.

**D-031 — Gallery starter set published (Q-P5-5).** Owner-approved:
event-network-build-2025.mp4, event-environment-night.mp4,
hospitality-walkway-night.mp4, and the fiber-splicing still (a frame
extracted at 42.5s from the approved network-build video — same owner
source, no external media; also the About image). Captions carry only
source-supported metadata; unresolved fields stay absent. Expansion
remains data-only (D-008/Amendment 3 pipeline unchanged).

**Arabic authoring (D-006).** P5 surfaces required AR for: company about /
mission / reach, four capability descriptions, seven solution taglines,
and the p.26 venue scope bullets — authored strictly from the approved
English, no new claims, marked in-source as pending owner review.
Remaining AR gaps: 54 (later-phase surfaces).

**Engineering note.** Fixed a latent reveal deadlock: a section clipped by
its own `clip-path` reports zero intersection, so the mask variant now
clips the section's child, never the observed element.

**P5 verification:** journey QA EN/AR × desktop/mobile — zero console
errors, no overflow, no dead links; suites 140/140 (behavior 20, matrix
64, switching 30, static/profile 11, RTL stats 15); unit 7/7 (publish
filter updated to the approved-set contract); smoke 40/40; hero field
≈4.4ms avg desktop FULL; interactive client chunks ≈39 KB gz.

---

## P5 hotfix + logo revision (2026-08-29, owner live review)

**D-032 — Opening visibility (blocking defect, root-caused and fixed).**
Two reproduced causes made the cinematic opening invisible on real loads:
(1) browser scroll restoration replayed the sequence above the restored
viewport on any mid-page refresh; (2) the 1.5s auto-skip raced hydration
(the engine was a lazy chunk) and silently cancelled the sequence.
Binding behavior now: the opening OWNS the initial viewport — a fixed
opaque stage (z-60) above header and hero until the reveal; scroll
restoration is neutralized (manual + instant top) while the sequence
runs; the engine hydrates with the page; a server-rendered CSS-only
pre-stage guarantees darkness → readable authoritative logo from first
paint before ANY JavaScript, with a silent 4s deterministic fallback (no
spinner); the logo asset is preloaded (fetchPriority=high) and decode()d
before the readable beat (~1.6–2.75s, ≥1s hold). Skip stays
intentional-input only; STATIC/reduced-motion stays exempt; locale/theme
switches never replay. Guarded by tests/smoke/opening.spec.ts (computed
visibility, stage geometry, logo hold, replay-on-reload, mid-page
refresh — desktop + mobile).

**D-033 — Technology Alliances & Our Clients are LOGO-driven.** The
typographic walls are superseded: both sections use the ACTUAL approved
marks from the updated Company Profile grids — p.28 (41 vendor logos) and
p.30 (27 client logos) — extracted at 300 DPI from the source PDF
(masters in media-source/brand/{alliances,clients}/, optimized webp
derivatives in public/media/logos/), proportions untouched, nothing
mirrored, no internet substitutes, no text fallbacks rendered. Alliances
= engineered hairline-ruled vendor grid with per-cell masked entrance and
signal-line hover; Clients = calm trust constellation of floating
natural-width chips with staggered rise. Logos sit on neutral light
surfaces in BOTH themes; each profile grid's closing "And more" is kept
as an honest ghost cell. The updated profile also resolved O-014: "Saleh
Al Rajhi Partners" and "HQWS" are now recorded (27 clients total).
Records upgrade to official assets via `logo.src` data edits. The source
PDF remains private (D-020 re-verified: 404, zero PDFs under public/).

**Verification:** logo QA 17/17 (counts/broken/fallbacks × EN/AR ×
desktop/mobile × themes, theme/locale-switch persistence); full battery
157 harness checks + repo Playwright 46/46 (routes + opening regression)
+ unit 7/7; frames A–F timed evidence (logo readable 2.16s, held 2.87s,
reveal 5.16s); refresh × EN/AR × dark/light all visible.

---

## P5 — Cinematic content experience, navigation & ecosystem motion (2026-08-29)

**D-034 — Products architecture (content later, never invented).** A
first-class Products section exists: typed `CatalogProduct` schema
(id/slug/name/summary/importance/category/image/gallery/featured/
published/sortOrder; localized fields carry the Arabic via LocalizedText),
`src/content/products.ts` SHIPS EMPTY by design, /en/products +
/ar/products routes are live and restrained, and the homepage carries the
cinematic product stage (perspective floor grid, glowing platform ring,
light beams — the designed environment IS the empty state). Owner-supplied
records land as depth objects on the platform with zero component
redesign. Copy states only approved solution-backed facts. Validation
guards uniqueness/paths.

**D-035 — Navigation information architecture + premium behavior.** The
header now reflects the real site: Home · About Us(/company) · Products ·
Solutions · Industries · Projects · Gallery · Technology Alliances(/#partners)
· Our Clients(/#clients) · Smart AI(/#smart-ai) + the Let's Talk CTA (the
Contact destination). Data-driven from navigation.ts; restrained
active-section indicator (route match + dominant-section probe on the
homepage); anchor clicks perform smooth cinematic ARRIVALS (§9): a signal
traces the destination's top edge, scene-specific beats fire (Smart AI
convergence replay, product-ring pulse), and keyboard focus resolves at
the section. The environment-aware header behavior (D-022) is untouched.

**D-036 — Logo ecosystems in motion.** Technology Alliances = the
ENGINEERED TECHNOLOGY STREAM: two counter-flowing depth rows of the
approved marks on seamless WAAPI loops (double-sequence tracks translated
exactly one copy-width — no visible jump), slow premium velocity, periodic
signal sweep, hover/focus eases the row to near-stillness while the mark
lifts with restrained glow. Our Clients = the TRUSTED INSTITUTIONAL
CONSTELLATION: three calmer counter-flowing rows with depth scale/opacity,
per-chip drift, soft edge masks and gentle pointer parallax — a visibly
different identity. Logos are never distorted, recolored or mirrored; RTL
reverses FLOW DIRECTION only (rail viewports are dir-isolated). Rails
pause offscreen/hidden-tab; LITE slows and simplifies; STATIC/no-JS keeps
the premium D-033 static grid compositions.

**Transition vocabulary mapping (§8):** SIGNAL TRACE=trace · MASK
REVEAL=mask · LIGHT SWEEP=sweep · CONVERGENCE=converge (+ Smart AI/CTA
scenes) · MEDIA REVEAL=media-reveal (About) · DEPTH SHIFT=scroll-driven
view-timeline depth on the About media and product-stage grid
(progressive enhancement, static-neutralized). Adjacent sections never
share an entry device.

**Verification:** P5 suite 29/29 (stream motion/direction/counts, RTL
flow reversal, hover localization, constellation counter-flow, stage
integrity with ZERO fake products, header IA/active/arrival/focus, STATIC
grids); mobile 6/6 (LITE rails EN/AR, IA menu); standing battery 140/140;
repo Playwright 44/44 + opening regression; unit 7/7; zero console
errors; no overflow; D-020 intact.

---

## P5 Visual Correction Round decisions (recorded 2026-08-29)

**D-037 — Riyadh cityscape hero composition (§1).** The hero now carries
Saudi urban identity from the first frame: `HeroCityscape` — ORIGINAL
stylized vector art drawn for this project (no photography, no
third-party or mirrored assets) — places a layered Riyadh skyline on the
hero horizon: far bluish ridge, mid indigo skyline, near-black silhouette
plane carrying a distinctive Riyadh-tower form (tapering shaft, open
crown arch traced in brand magenta, pulsing beacon), sparse deterministic
window lights, and two signal routes arcing over the city (topology over
the city; the live particle canvas plays BEHIND the skyline so stars read
as depth, not the subject). Cool-blue atmosphere settles onto a magenta
horizon glow (approved blue + magenta light). Scroll parallax separates
the layers where view-timelines are supported; FULL animates
beacon/signal flow, LITE keeps it calm, STATIC/no-JS renders the full
server-side SVG. The label reuses the approved "RIYADH — HEADQUARTERS" /
«الرياض — المقر الرئيسي» wording — brand storytelling, never project
evidence. The composition is 100% code (owner-editable, no binary
assets).

**D-038 — Route-first Products (§3, supersedes the D-034 placement).**
The full cinematic product stage (perspective grid, platform ring, light
beams, future depth-object pedestals) moved to /products, which is now a
dark-committed scene (header adopts the dark environment pre-paint). The
homepage carries only a minimal deliberate teaser: section title, the
approved one-line intro, a single light-ring doorway motif, and the
"Explore our products" cinematic CTA into the route. Still ZERO invented
products anywhere; `products.ts` ships empty by design.

**D-039 — Ecosystem continuation notes (§§4–5).** "And more" chips were
removed from INSIDE both logo systems. Each section now closes with a
restrained typographic line below the motion field, exact owner wording:
EN "And more technology partners" / AR «والمزيد من الشركاء التقنيين»
(Alliances) and EN "And more trusted organizations" / AR «والمزيد من
الجهات الموثوقة» (Clients), set as microlabels with a short accent
gradient dash.

**D-040 — Final header architecture with width discipline (§9).** Nav
order is now the approved final set: Home · About Us · Products ·
Solutions · Industries · Projects · Gallery · Technology Alliances · Our
Clients · Smart AI · Contact, plus locale/theme switches and the Let's
Talk CTA. Below 2xl (1536px) Gallery/Technology Alliances/Our Clients
fold into a deliberate "More" menu (keyboard accessible: Escape closes
and returns focus; outside-click dismisses; active state bubbles to the
More button while a folded destination is current) — never shrunken
text. At ≥2xl everything returns inline and the menu disappears. Arabic
remains an intentional RTL composition of the same system.

**§6/§8 polish.** Alliance stream gained a faint engineered under-glow;
a hero→about handoff line (single magenta signal drawn downward across
the boundary as the editorial scene reveals) joins the existing
transition vocabulary. No scroll-jacking anywhere.

**Verification (2026-08-29):** correction suite 36/36 (cityscape
composition/label EN+AR, teaser minimalism, /products full stage + dark
header env, rail-chip removal + exact closing wordings, stream motion,
handoff line, nav order, More fold/unfold/Escape, no overflow, zero
console errors); updated P5 suite 29/29 + mobile 6/6 (12-link menu);
RTL stats 15/15; Round-3 30/30; behavior 20/20; matrix 64/64 + extra
11/11; repo Playwright 50/50 (routes incl. /products + opening replay
regression); unit 7/7. Light theme keeps the dark-committed hero
(D-019); mobile composition verified.

---

## Riyadh photographic hero integration (recorded 2026-08-29)

**D-041 — Owner-approved Riyadh photograph is the Hero's primary media
layer (supersedes D-037's vector skyline).** The supplied photorealistic
Riyadh skyline image (Kingdom Centre center-right, open dark sky left)
replaces the code-drawn cityscape. The untouched master is archived at
`media-source/images/riyadh-skyline-hero-approved-2026-08-29.webp`
(never served); production derivatives live at `public/media/hero/`
(riyadh-{640,960,1280,1672}.webp + riyadh-1672.jpg fallback, 32–188 KB).
The photograph is never traced, redrawn, recolored, mirrored, blurred to
loss, or silhouetted — architecture untouched.

Layer architecture (bottom→top): HeroBackdropStatic (pre-load ground) →
`HeroRiyadh` photo stage [art-direction frame → drift wrapper → photo +
D-024 video slot (`HeroMedia`, still empty by design) + registered
network overlay SVG + HQ label] → opening pre-stage/canvas (particles
above the city) → directional + bottom scrims (z-1) → hero content
(z-2). The frame implements MANUAL COVER math (bottom-anchored,
aspect-locked, `width:max(100%, 177.68svh)`): landscape anchors right
(skyline center-right, headline zone open); portrait centers the
Kingdom Centre (`translateX(-70.4%)`). Because the overlay SVG shares
the photograph's 1672×941 coordinate space inside the same frame, the
luminous origin (pulsing ring + core above the crown), four signal
routes, six activation nodes and three SMIL traveling pulses stay
REGISTERED to the tower at every viewport. Gulf reach remains the
approved network-scene geography — nothing pretends Bahrain/Qatar/UAE
exist inside the photograph.

Motion: FULL = 46 s scale-1.045 camera drift (origin at the crown),
pointer depth on the overlay (±8 px), 3 pulses, origin/node activation,
particle canvas re-tuned to 0.5 opacity telemetry presence once the
opening resolves; LITE = slower drift, single pulse, far route dropped;
STATIC/reduced-motion = the full photographic composition renders
immediately, SMIL pulses removed via display:none, no drift. Opening
(LOCKED) unchanged; the reveal now materializes the photo under the
dispersing logo field via a 1600 ms fade whose declaration spans
revealing→done (verified frame-by-frame monotonic — no hard cut), and
`react-dom` preload()s the image with high priority so the opening
never reveals into an empty hero. Hardening found during verification:
the bootstrap now carries a self-removing scroll guard that snaps
browser-generated scroll restoration back to the stage (instant, never
smooth) while the opening owns the viewport — Chromium could re-apply a
restored scroll position after the bootstrap's pre-paint scrollTo.

Editability: swapping the photograph or enabling the future film is a
data edit in `src/content/hero-media.ts` (`heroScene` / `heroMedia`);
the video plays inside the same frame above the photo. `HeroCityscape`
(D-037 vector art) was removed from production code entirely — its
record remains in this log.

**Verification (2026-08-29):** new Riyadh suite 33/33 (photo cover +
bottom anchor, tower position desktop 67 vw / mobile centered, overlay
registration, approved label EN/AR, drift, pointer depth, canvas
re-tune, theme switch keeps the scene with no replay, locale switch no
replay, LITE/STATIC discipline, LCP 368 ms, D-020 404s, zero console
errors, no overflow); repo Playwright 50/50 ×5 consecutive (opening
replay + mid-page-refresh deterministic after the scroll guard);
correction suite 36/36; P5 29/29 + 6/6; RTL 15/15; R3 30/30; behavior
20/20 (smooth-scroll harness window corrected — product behavior was
right); matrix 64/64 + extra 11/11; unit 7/7.

---

## Strict visual implementation round (recorded 2026-08-29)

**D-042 — Reference-locked homepage composition.** The owner supplied an
approved visual target; this round implements its visual SYSTEM with
existing approved content only (§2 content-safety honored — none of the
reference's statistics, names or copy was carried over).

*Hero:* restrained reference-scale typography (EN clamp 2.2–3.6 rem,
AR 1.9–3.1 rem — dedicated compositions, wording unchanged/locked),
editorial column centered on the inline-start, D-041 Riyadh photograph
untouched as the visual subject, approved Track Record figures as a
quiet accent vertical rail on the inline-end (data-driven from stats.ts
— D-002 single source, bidi-isolated tokens), scroll indicator cleared
of the floating action. **All geographic text labels removed** from the
hero, the opening, and the network visualization ("RIYADH —
HEADQUARTERS" hero/opening labels, Riyadh/Bahrain/Qatar/UAE map labels,
the static caption's city names) — geography is now communicated
visually (origin pulse, routes, hollow reach markers); the approved
prose headings remain (editorial copy, not map labels). Engine label
callbacks stay null-guarded; choreography timing untouched.

*Logo ecosystems:* the dual counter-rails/constellation (D-036) are
superseded by ONE premium cinematic horizontal carousel per section —
the reference family. Dark glass cells (committed dark in both themes)
with a compact light plate carrying each mark: measured ~30% of the
approved logos are near-black glyphs, and recoloring is forbidden, so
the plate is the uniform legibility ground — original color, geometry
and proportions preserved for every logo (never recolored, mirrored,
stretched, cropped or distorted). Engine: rAF offset over a duplicated
sequence wrapping at one copy-width (physically continuous — no
restart, no gap, no jump); Alliances ≈30 px/s + signal sweep + magenta
edge response; Clients ≈22 px/s, cooler edge — same family, calmer
voice. Arrow controls page ~60% of the viewport with an eased tween;
drag/swipe (pointer capture) and horizontal trackpad wheel steer it
1:1; any manual interaction pauses the flow and it resumes ~4 s later
from the same position; hover (mouse) and keyboard focus pause in
place; rails pause offscreen/hidden-tab. Under-rail illuminated line
with a traveling highlight (FULL). LITE flows identically; STATIC
renders the complete motionless rail with working arrows; no-JS falls
back to a native horizontally scrollable strip (keyed off the absent
motion-tier attribute). Section heads pair the locale title with its
counterpart-language approved name as an accent echo. Continuation
lines remain BELOW the rails with the exact approved wordings.

*Products:* unchanged route-first teaser; the platform ring now
activates as the section reveals (§14 platform-light).

**Verification (2026-08-29):** new strict-round suite 32/32 (no
geographic labels on visualizations EN/AR, stats rail approved figures
inline-end, flow speed/direction/RTL, arrow paging + pause + ~4 s
resume, drag, clients calmer, closing wordings, no mirrored surfaces,
LITE flow + swipe, STATIC complete + arrow-navigable, browser-zoom
sweep 80→200% with zero overflow); updated regression battery all
green (rp 33, vc 36, p5b 29+6, rtl 15, r3 30, p4 20, matrix 64, extra
11); repo Playwright 50/50; unit 7/7; zero console errors.

---

## P6 — Inner-page experience build-out (recorded 2026-08-29)

**D-043 — Inner routes at the approved P5 standard (Q-P6-1a/2/3).**
Scope delivered exactly as authorized: /company, /solutions,
/solutions/[slug] ×7, /industries, /projects, /partners, /clients
(new route), /contact, /gallery shell. Approved content only; every
excluded item (projects detail routes, featured promotion, gallery
lightbox/masonry/FLIP, Smart AI experience, contact backend) remains
reserved for P9/P10/P11+.

*System:* `PageHero` — the dark-committed cinematic intro moment of an
inner route (Q-P6-3), one band with five PROGRAMMATIC motifs (signal /
nodes / grid / field / trace — pure CSS, no photography, no invented
imagery), staged typography, dark header environment pre-painted by the
bootstrap for hero-led routes. Bodies below stay theme-aware editorial.
Light-led pages (/solutions, /industries, /projects, /gallery) open
with editorial headers instead — every route has its own composition,
never the homepage copied.

*Per page:* Company = signal intro (approved positioning + about) →
mission pull-statement → p.4 values as a numbered index → four
capability pillars → Track Record (stats.ts single source) → reach +
contact CTA; profile stays source-only (D-020). Solutions index =
technical numbered index rows (01–07) with taglines + sub-solution
tags. Solution details = nodes intro with chapter index (0X/07),
summary lede, structured sub-solution columns (numbered 0X.Y, accent
bullets), certified-vendor marks ONLY where the profile associates them
(pp.18–19: unified-communications, video-surveillance-ai), and
prev/next/index cross-navigation. Industries = hairline structural
matrix, all 16, no per-industry claims. Projects = equal-weight
evidence ledger (32 records; name/location/years/scope only; no
featured hierarchy — P9's D-004 gate; zero detail links — D-011).
Partners = alliances-only now (grid intro, D-042 alliance carousel
REUSED at 30 px/s, complete typographic index below). Clients = NEW
/clients route (field intro, reach lede, D-042 client carousel reused
at its calmer 22 px/s, complete index); nav "Our Clients"/"Technology
Alliances" items now also light up on these standalone routes (alias
active-state). Contact = trace intro (converging signals), channel
board of the four approved channels with functional tel:/mailto:/wa.me
links — NO form exists or is mocked (D-010/O-009 unchanged). Gallery
shell = designed editorial shell (category tags + the 4 approved
starter records as poster-first cards with controls) — the P10 system
intentionally NOT implemented.

*Housekeeping:* pages.clients metadata + inner-page UI labels (EN/AR),
sitemap + route-smoke coverage for /clients, pages.partners description
updated to alliances-only framing (UI copy, no new business claims).

**Verification (2026-08-29):** P6 suite 53/53 (motif/env per route,
carousel reuse + speeds + RTL flow on both standalone routes, closing
lines, 7 index rows, cross-nav + vendor-association correctness, 16
sectors, 32 equal-weight records with zero featured markers/links,
4 approved channels + zero form elements, gallery shell 4/4 records +
zero lightbox, alias active-states, D-020 probes, STATIC completeness,
zoom 80→200% clean, EN/AR mobile clean); repo Playwright 54/54 (now
incl. /clients EN/AR ×2 projects); full standing battery green (sv 32,
rp 33, vc 36, p5b 29+6, rtl 15, r3 30, p4 20, matrix 64, extra 11);
unit 7/7; zero console/hydration errors; live visual inspection EN/AR
× dark/light × desktop/mobile performed via real browser screenshots.

---

## Project-wide requirements (recorded 2026-08-27)

- **Owner editability:** The finished website must not depend on Claude for ordinary maintenance. Full owner ownership/editability of source, content, statistics, media, projects, gallery, clients, alliances, navigation, contact, translations. Routine content changes happen in obvious structured files, not presentation components. No vendor lock-in; no proprietary visual builder required; code maintainable by another developer. (Detailed in `docs/maintenance-model.md`.)
- **Documentation:** Final project includes complete install/run/build/content-editing documentation (full checklist in Master Directive; delivered as final README at P19).
- **P19 — Final Handoff & Export:** occurs only after approved P18. Deliverables: complete runnable project for download; all source; all approved required assets; dependency manifests + lockfile; final README/documentation; verified clean install, clean production build, and local startup from clean state; final structure map; final maintenance guide. Excludes `node_modules`, `.next`, caches, unneeded test artifacts, local machine files, secrets, `.env` credentials. Provide `.env.example` if env vars become necessary.
- **Approval-gate workflow remains mandatory for every phase:** INSPECT → ASK → WAIT → PROPOSE → APPROVAL → IMPLEMENT → VERIFY → REPORT → STOP. No automatic phase progression.

---

## Roadmap resolution after P6 approval (recorded 2026-08-30)

**P6 approved at `a9b439f`.** Owner ruling: minor visual/detail
refinements are INTENTIONALLY DEFERRED to dedicated refinement rounds —
the current implementation is the accepted baseline but is NOT
permanently frozen. P6 is not to be reopened for cosmetics now.

**Phase-numbering audit (owner-directed):** an exhaustive search of the
repository — all docs, source, tests, and git history — finds **no P7
and no P8** in any authoritative project documentation. The recorded
phase skeleton is: P1–P6 (complete), P9 Featured Projects, P10 Gallery,
P11 Smart AI, P12 partner/client logos (delivered early, D-033), P13
contact form UI (historical P3-era note), P14 RTL audit, P15
contrast/legibility audit, P16 motion-contract closure, P17 performance
audit, P18 final review, P19 handoff & export. If the owner's Master
Directive defines P7/P8, that definition lives outside the repository
and must be supplied; otherwise the next implementation phases proceed
per the dependency-ordered roadmap.

**R-001 — Deferred refinement register (owner-mandated).** To be
revisited in dedicated polish rounds, explicitly NOT current blockers:
typography sizing/spacing · Arabic typography polish · animation timing
· transition intensity · Hero details · carousel details · lighting/
glow balance · section spacing · mobile composition · micro-interactions
· visual consistency.

---

## Master implementation directive — complete programming first (recorded 2026-08-30)

**Owner decision (explicit):** FINAL MEDIA POPULATION IS DEFERRED UNTIL
AFTER COMPLETE WEBSITE PROGRAMMING. Missing section/project media is no
longer an implementation blocker; every media surface ships
media-READY (structured optional data slots, deliberate programmatic
fallbacks, automatic data-only upgrades) — while the content-integrity
absolutes stay binding: no invented imagery/facts/products/relations,
no stock-as-evidence, D-009 and D-020 absolute. Exception: Technology
Alliances and Our Clients already carry approved logo assets and remain
as approved. After programming completes, the owner inspects the full
site and supplies section/project/product media, the hero film (O-015)
and social URLs (O-016), followed by the FINAL VISUAL REFINEMENT &
POLISH ROUND (R-001).

**D-044 — P9 Featured Projects + evidence-adaptive detail system.**
O-003 resolved per the accepted D-004 assessment: featured =
F1 Saudi Arabian Grand Prix, King Abdullah Sports City — Jeddah,
Prince Abdullah Al-Faisal Sports City — Jeddah, Al Awal Park & King
Fahd Sports City (Grand Mosque remains ledger-only; the conditional
recommendation was not confirmed). /projects opens with the Featured
chapter (cinematic evidence cards, programmatic motifs, media-ready);
detail routes exist ONLY for Featured or deep-evidence records (7
today) — Cinematic Media Mode is pure data activation
(caseStudy.heroMedia / media / galleryItemIds); evidence-led
programmatic opening until then; related projects + featured-to-
featured transition; thin records never get routes.

**D-045 — P10 Gallery system.** Filtered editorial masonry (All +
populated categories only), FLIP reflow (FULL) with fade-up entrances,
poster-first cards, native-dialog lightbox (modal focus containment,
Escape, direction-aware arrow keys, swipe, focus restoration,
muted-autoplay + controls). Publishes approved records only; complete
at any collection size.

**D-046 — P11 Smart AI experience.** /smart-ai ships integration-ready
and honestly disconnected (D-009): approved concept copy, future-tense
three-step explanation, solution families as data-driven domains, an
interaction shell wearing an explicit prototype state (status chip,
honesty note, permanently disabled send, human path primary), and a
typed provider adapter boundary (src/lib/smart-ai) whose contract
REQUIRES an owner-approved privacy notice before any live connection
(O-010, separately authorized). Homepage teaser CTA now opens the
experience.

**D-047 — P13 contact/enquiry form.** Bilingual owner-editable form
(contact-form.ts) in an EXPLICIT non-production state: a visible status
line says direct submission is not active; valid submissions compose
the visitor's own email (mailto) or WhatsApp message through the
approved channels — really sent by the visitor, never faked. Accessible
validation; typed future integration boundary (O-009 unchanged).

**D-048 — Products catalogue architecture.** /products is fully
media-ready: the approved stage remains the designed empty state;
published records now flow into a catalogue with automatic category
filter chips (≥2 approved categories) and cards that upgrade from a
designed typographic motif to owner photography via data alone. No
detail routes (not in the approved roadmap); zero invented inventory.

---

## Pre-media-population issue audit (recorded 2026-08-30)

**D-049 — Final functional & visual issue audit round** (baseline
`53833fb` accepted). Full-site audit across routes, homepage journey,
contact, projects, gallery, products, Smart AI, carousels, header,
Arabic, themes, motion, responsive/zoom, accessibility, privacy.

Register: **CRITICAL — none found.** **MAJOR (fixed):** M1 unmatched
URLs and notFound() guards rendered the bare framework 404 → branded
localized not-found boundary inside full site chrome (locale not-found
page + force-dynamic catch-all so the static-404 cache can never
regress it to the default page; invalid-slug 404 status preserved);
M2 header CTA wrapped to two lines at 1024 px → nowrap + tightened lg
gaps. **MINOR (fixed):** m3 mobile lightbox arrows overlapped the
media → arrows form a control row under the stage ≤640 px (desktop
unchanged via display:contents). **Deferred to R-001 (cosmetic,
non-blocking):** related-project meta spacing on detail pages;
transient floating-WhatsApp overlap while scrolling (standard FAB
behavior). Verified clean: locale switching on every dynamic route,
browser back/forward with no opening replay, scroll restoration,
homepage journey behaviors, AR contact form/lightbox/footer, light
theme on all new routes, stats-rail collision-free at 1280 px,
solutions live-preview interaction, tablet compositions.

**Verification:** repo Playwright 66/66; final matrix 23/23; p6 53/53;
standing battery all green (sv 32 · rp 33 · vc 36 · p5b 29+6 · rtl 15
· r3 30 · p4 20 · matrix 64 · extra 11); unit 7/7; typecheck/lint/build
clean; zero console/hydration errors; live browser inspection EN/AR ×
dark/light × desktop/tablet/mobile. The website is stable and ready
for media population.

---

## Final pre-media experience, architecture & lead system (recorded 2026-08-30)

**D-050 — Owner's final pre-media directive** (56 sections,
implemented as one twelve-phase round on baseline `9b88f69`).

**Opening (§1):** resequenced — cinematic particle motion first,
convergence, the approved logo appears ONCE (readable hold), seamless
hero release. The separate wordmark caption and the geographic HQ
label are removed (identity = the logo asset alone); the CSS prestage
is a signal pulse, never the logo; replay on true refresh only
(unchanged bootstrap rule).

**Hero (§2):** Riyadh photograph stays dominant. Removed: the F1
proof line, the "Systems Integration" descriptor, the stats rail and
all geographic labels. Brand-only overline; secondary CTA leads to
Let's Talk. New multi-depth technology-object layer: 7 desktop / 4
mobile programmatic line-art motifs (CCTV, processor, access point,
rack, sensor, switch, fiber node) at 2–4% hero width with slow
orbital drift; every slot is media-ready for owner assets
(src/content/hero-objects.ts).

**Header (§3/§5):** the logo always returns to the homepage top (on
the homepage it smooth-scrolls to the hero and clears the hash).
Final IA: Home · About Us(#about) · Solutions(#solutions) · Products
(/products) · Industries(#industries) · Projects(/projects) ·
Gallery(#gallery) · Technology Alliances(#partners) · Our
Clients(#clients) · Let's Talk CTA(#contact). No Contact item, no
Smart AI item. HashArrival gives deep links and cross-route hash
navigations the cinematic section arrival, deferred past a running
opening; inner-route aliases still light their nav items.

**Homepage journey (§4):** Opening → Hero → About → Reach → Solutions
→ Products preview → Industries → Selected Projects → Gallery →
Alliances → Clients → Let's Talk → Footer. Smart AI is gone as a
section (§14; /smart-ai redirects home, locale preserved).

**Reach (§8):** the visible "Track Record" heading is removed (the
approved figures remain, single-sourced); Qatar and UAE reach points
disabled — Saudi cities + Riyadh + Bahrain only.

**Media-ready (§7/§9/§41):** About declares a company-film slot
(aboutMedia — photograph remains poster/fallback); SolutionFamily
gains an optional media field; hero objects, project moments, product
slots and detail routes all upgrade by data alone.

**Products preview (§10):** the homepage teaser is a fixed FOUR-slot
featured stage reading getFeaturedProducts(); reserved engineered
frames until the owner supplies the catalogue; "Explore our products"
doorway.

**D-050/§12 — Selected Projects (supersedes D-044 featured set):**
owner's final four → grand-mosque-makkah (mapped from "Grand House" —
closest ledger record; **mapping FLAGGED for owner confirmation**),
diriyah-season, neom-sports-village, red-sea-film-festival. No new
records invented. Homepage presents them as cinematic full-width
numbered moments (alternating anchors, media-ready grounds, "Explore
Project" doorways) — not a card grid. Detail routes: 4 featured + 6
deep-evidence venues (10); F1 loses its route under the unchanged
evidence rule.

**Digital Employee (§§15–22, §34, §50):** "Smart Channels Digital
Employee" / «الموظف الرقمي لدى القنوات الذكية» — floating
conversational experience above the icon-only WhatsApp action. While
no AI provider is selected it runs HONEST GUIDED INTAKE (a
deterministic scripted assistant): permanent digital-identity
disclosure (never claims to be human), progressive collection
(name→company→phone→email→service→message), explicit consent with
the approved wording, then a REAL lead (source `digital-employee`)
with transcript + deterministic summary via POST /api/leads — success
only on the backend's 2xx. EN/AR human-handoff phrases surface the
approved channels. Conversation persists per browsing session
(sessionStorage). Typed AIProvider boundary (src/lib/digital-employee)
requires: server-side-only credentials, a privacy notice before first
send, no model access to the lead store, conversation input treated
as untrusted.

**Lead system (§§23–27, §§32–33):** shared Lead domain
(src/types/lead.ts) for both channels; human-owned status workflow
NEW→CONTACTED→QUALIFIED→PROPOSAL→WON/LOST (AI never sets status);
audit trail on every change. Provider-neutral boundaries: LeadStore
adapter (dev/single-instance JSON file store under gitignored .data/,
server-only, atomic writes) and a LeadCreated notification boundary
(server-log observer; real delivery = owner provider decision).
POST /api/leads: JSON-only, 64KB cap, per-IP fixed-window rate limit,
full server-side validation/sanitization (control-char strip, length
bounds, enum whitelists), honeypot, consent required; storage failure
returns failure. Homepage Let's Talk: real form (Send Message),
genuine success only on 2xx with reference, honest failure with the
direct channels; contact info = phone/email/address + click-to-load
Google map (keyless query embed on the approved address text — no
invented coordinates; CSP amended narrowly with frame-src
https://www.google.com); NO WhatsApp number row. /contact →
locale-preserving redirect to /#contact; the D-047
compose-your-own-email form is superseded and removed.

**Admin console (§§28–31):** /admin/leads (second root layout outside
the localized tree; middleware excludes /admin). Real auth:
ADMIN_PASSWORD env credential (constant-time compare, rate-limited
login), HMAC-signed httpOnly session cookie (8h); explicit locked
state while unconfigured — no default credentials, nothing committed.
Console: statistics from real data, status/source/text filters, lead
detail (full record, transcript, summary), status workflow + internal
notes via audited server actions, CSV export (UTF-8 BOM, escaped).

**Floating stack & cursor (§§36–38):** bottom-up WhatsApp → Digital
Employee → Back-to-Top (revealed after meaningful scroll; instant
under reduced motion); all hidden during the opening; the DE panel
overlays the stack while open. Custom cursor: a small magenta/purple
halo that ACCOMPANIES the native cursor — fine pointers only, off for
touch/coarse/reduced-motion/STATIC; link state grows the ring; DRAG
(carousel viewports) and VIEW (gallery cards) states carry localized
microlabels; text fields keep the pure native caret.

**Carousels (§35):** root-caused RTL defect — translateX(+x) left the
viewport's left edge uncovered in RTL because the duplicated copies
extend rightward; fix = translateX(x − w) in RTL. The flow offset now
survives locale/theme switches via a per-rail sessionStorage mirror
(no reset, no gap, no stop). Verified: zero edge gap across ar/en ×
dark/light over sampled flowing time.

**Social (§39):** TikTok added as a fourth disabled record; footer
renders only owner-supplied URLs (O-016 now covers LinkedIn /
Instagram / X / TikTok). Sitemap drops redirecting routes; inner-page
contact CTAs point at /#contact. §40: no welcome audio exists.

**Verification (§§52–53):** typecheck/lint/build clean; unit 7/7
(featured invariant updated to the owner's four); repo Playwright
70/70 (routes + §51 redirect assertions, desktop+mobile);
D-050 matrix 61 checks green (opening single-logo timing, hero
cleanliness + object counts, header IA + anchor/logo behavior,
journey ids, reach heading/markers/counters, four product slots,
four cinematic moments in owner order, Let's Talk consent/validation/
genuine-success, full Digital Employee guided run incl. handoff and
cross-route persistence, floating stack, cursor states + touch
absence, AR parity incl. exact Arabic consent line, light theme,
mobile/narrow overflow); console-error sweep clean on 12 routes; map
iframe created on demand with no CSP refusal; live API checks
(201/422/405/honeypot/429 path, admin auth, BOM CSV, 401s).

---

## Solutions cinematic media integration (recorded 2026-08-30)

**D-051 — Owner-approved Solutions media integrated** (first media
population round; owner directive after the 7/7 asset audit).

**Assets.** Sources archived untouched at media-source/video/solutions/
(byte-identical, SHA-256 manifest in MAPPING.md — the binding
file→family mapping, unchanged). Public delivery under
public/media/solutions/: files 02/04/06/07 are byte-copies (already
web-weight, faststart, no recompression); 01 (was 4K ≈22 Mbps + audio)
and 05/03 (portrait 2160w) received lighter H.264 serving derivatives
(1080-class, CRF-based, audio stripped, faststart) — 01: 26→2.8 MB,
03: 18→3.1 MB, 05: 21→3.9 MB. Seven reviewed posters (meaningful
frames chosen from 4-frame contact sheets, never blind frame-0) under
public/media/solutions/posters/. All seven delivery files pass a full
ffmpeg decode.

**Data (§13).** SolutionMedia record on solutionFamilies[].media:
video/poster/orientation/dimensions/per-viewport focus/localized
alt/published — one record drives homepage AND detail page; validation
enforces the locked mapping, public-only paths, orientation
consistency and file existence; unit invariant asserts the exact
seven-way mapping.

**Homepage.** SolutionsIndex replaced by SolutionsShowcase: a
structured index (numbers/rails/inline expansion; horizontal chips on
mobile) driving one large cinematic stage. Manual activation only
(click/tap/keyboard; active ≠ color-alone); scroll contributes only a
subtle FULL-tier depth shift — no scroll-jacking, no trapping. One
motion language: directional mask wipe (landscape), rising masked
frame over same-media blurred atmosphere (portrait §10 — never
stretched/cropped-away/mirrored), shared light sweep; LITE =
crossfade; STATIC = posters only, zero video elements. Playback
lifecycle (§7): poster-first, only the ACTIVE video ever mounts and
only once the section is near (IO rootMargin 30%); offscreen and
hidden-tab pause with clean resume; outgoing layer unmounts after the
transition. Measured: initial /en = 0 solutions bytes; approaching the
section loads exactly active poster + active video. Landscape records
carry per-viewport object-position focus. Active Solution persists
across locale/theme switches (sessionStorage mirror).

**Detail pages (§12).** Each family opens its body with a
SolutionCinematicMoment (same record, IO-managed playback, portrait
treatment preserved) between the chapter hero and the approved
summary; no content invented, no extra sections forced.

**Verification.** typecheck/lint/validate/unit (8/8) clean; repo
Playwright 80/80 incl. a new solutions-media spec (mapping, delivery
+ poster availability, media-source privacy, no eager loading,
active-only mounting, portrait treatment, detail media); behavior
matrix green (per-solution mapping ×7, keyboard, offscreen
pause/resume, theme switch continuity, AR continuity + no mirroring,
mobile 16:9 vs 4:5 stages, STATIC posters, boundary shots, zoom/width
sweep, console clean). NOTE: the sandbox's Chromium lacks an H.264
decoder, so rendered playback was verified as (a) full ffmpeg decode
of all seven delivery files + (b) element/lifecycle assertions via
stubs; H.264 MP4 plays in all production browsers.

**Owner-flagged media observations (no action taken):** file 03
contains legible in-footage third-party text ("RETRO SCI-FI
SCREENSAVER … BY ANDY FIELDING"); file 06 is monochrome amid a color
set; files 04/07 contain recognizable people (owner-supplied footage —
usage rights assumed owner-cleared); loop seams vary (8.4–30 s
sources). See the round report.

---

## Products cinematic media integration (recorded 2026-08-31)

**D-052 — Owner Products round** (baseline `4e4d7ae` — the owner's
four image files committed to the repo; directive of 2026-08-31).

**Categories (§2, binding):** the 22 approved product categories
populate products.ts verbatim — Switch, Access Points, Router, Laptop,
Multi Charger, T60, SFP, Firewall, Core Switch, Monitor, PC, UPS,
Printers, NVR, Hard Disk, Decoder, Face Recognition Terminals, Camera,
Tablet, HDMI Extender, AC Adapter, Media Converter. A
capability/category presentation — NO models, manufacturers,
specifications, prices, stock or invented descriptions
(`summary`/`importance` stay absent until approved; unit test enforces
absence). Arabic names render via arPolicy "latin" — approved Arabic
category terminology is open item **PRODUCT-AR-NAMES** (§14: flag,
never invent specialized terms).

**Imagery (binding mapping, manifest at
media-source/images/products/MAPPING.md):** 01→Switch, 02→Access
Points (NEW approved replacement), 03→Camera, 04→Firewall. Sources
archived untouched (SHA-256 manifest); delivery = WebP derivatives
under public/media/products/ (metadata-stripped, aspect preserved,
NEVER upscaled): 01 stays 500×270 native (low-res — presented
`contain` on a light plate so the device is whole, never cropped or
enlarged), 02 1600w, 03 1365w native portrait, 04 1600w. Rights
status: **OWNER-SUPPLIED — PUBLICATION RIGHTS TO BE CONFIRMED BEFORE
FINAL LAUNCH** (**PRODUCT-MEDIA-RIGHTS**); no license invented, no
attribution added. **PRODUCT-MEDIA-01:** the Firewall visual is a
TEMPORARY conceptual cybersecurity image (flagged `provisional` in
data) — never presented as a specific appliance; replace via pure
data/derivative swap.

**Architecture:** the D-034/D-048 architecture absorbed the round
through data — no replacement. ProductImage record adds data-driven
art direction (`fit` cover/contain, `focus`, `provisional`);
`featuredOrder` carries the owner's homepage order (Switch, Access
Points, Camera, Firewall); accessors sort by it. Homepage preview:
the four editorial moments in consistent frames harmonizing the mixed
source backgrounds; §8 motion (FULL: 1.04→1.00 settle behind the slot
entrance + controlled hover depth; LITE: slot fades; STATIC:
complete imagery, no motion dependency); anchors land on /products
category cards (`id = slug`). /products: cinematic stage carries the
four featured (framed windows, contain-plate for the switch); the
complete 22-category index below — photos only where approved, the
designed motif for the other 18 (never blank); absent copy simply
does not render. Explore Our Products → /products preserved.

**Validation/tests:** validate-content enforces the exact image
mapping, public-only paths, file existence, featured set, and
22-record count; unit invariant asserts names/mapping/order/
provisional flag/no-copy; new products-media smoke spec (delivery
availability, archive privacy, homepage preview order+mapping+no
commerce language, 22-card index, AR non-mirroring). Repo Playwright
90/90. The opening spec's logo-hold assertion was rebuilt to measure
the actual continuous visible window at rAF cadence (its expect.poll
could detect readability late and under-measure the D-050 hold —
harness fix; product behavior verified correct at ≈1.4 s).

**Performance:** initial /en unchanged at 0.97 MB with ZERO product
image bytes (lazy below-fold); images load on section approach;
explicit dimensions on all slot images (no CLS); EN↔AR and
dark↔light switches keep all four images intact.

---

## Products media — second owner asset set (recorded 2026-08-31)

**D-053 — Second Products media integration** (audit accepted; owner
decision message the same day; baseline `aee014b` — 29 owner files
uploaded to media-source/images/).

**Owner-approved integrations (8 new + 1 replacement).** Laptop →
laptop.jpg · Core Switch → core-switch.webp · SFP → sfp.jpg · Tablet →
tablet.jpg · Printers → printers.jpg (Printers1.jpg, the stronger of
the two) · **Multi Charger AND T60 → one shared combined photograph**
(multi-charger-t60.png — referenced twice, never duplicated or split)
· NVR → nvr.png · **Firewall → firewall-interim.jpg**, replacing the
superseded conceptual Security-screen visual (retained unused at
`04-firewall-conceptual-superseded.jpg`).

**Explicit owner decisions honoured.** (a) The visible HIKVISION
branding in the NVR photograph is ACCEPTED — never removed, blurred,
cropped out, recoloured or regenerated. (b) The Firewall visual is
INTERIM: real data-centre hardware, not an appliance — the record
stays flagged `provisional` and **PRODUCT-MEDIA-01 remains OPEN**.
(c) Six categories with supplied-but-rejected media (Router, UPS,
Monitor, PC, HDMI Extender, Face Recognition Terminals) and four with
none (Hard Disk, Decoder, AC Adapter, Media Converter) keep the
designed media-pending state — nothing sourced, generated or borrowed.
(d) The 14 held files stay archived and unpublished; **Point of
contact.jpg (identifiable person) must never be published**, and none
of the held imagery may ever be presented as Gallery/project evidence.

**Result:** 22 categories unchanged; **12 now carry approved imagery**
(Switch, Access Points, Camera, Firewall, Laptop, Core Switch, SFP,
Tablet, Printers, Multi Charger, T60, NVR — 11 distinct files); 10
keep the fallback motif. The homepage preview stays at exactly FOUR
featured (§8) with the Firewall visual swapped in place; /products
carries the full 12-photo / 10-motif index.

**Art direction (data-driven, D-052 architecture extended).** New
`plate` field on ProductImage grounds contain-fit sources on a surface
matched to the SOURCE's own background — **verified by sampling corner
pixels, not by eye** (a small preview had misread the NVR background as
black; it is white). White plate: Switch, Multi Charger/T60, NVR.
Light plate: Core Switch (a genuine transparent cutout — a cover crop
would clip the chassis). Cover + focal point: the photographic sources.
The Firewall focal point is 50% 62% — a portrait source into a
landscape window crops vertically, and 62% favours the rack faces and
cabling over the blank corridor wall.

**Defect found and fixed during QA (deployment-relevant).** Replacing
the Firewall image's bytes under its existing delivery path served a
STALE optimized variant (the old landscape crop) from the Next image
cache. Root-caused by comparing served bytes, disk bytes and the
element's natural dimensions. Fix: the interim visual gets its own
delivery path (`firewall-interim.webp`). **Rule for future media
swaps: change the path, not just the bytes** — image-optimizer, CDN and
browser caches key on the URL.

**Optimization.** WebP derivatives, metadata-stripped, aspect ratios
preserved, **never upscaled**, no AI enhancement/regeneration, no
product manipulation, no branding edits: firewall-interim 1200×1804
(243 KB) · laptop 1200×1800 (29 KB) · sfp 1600×1065 (86 KB) · tablet
1600×1067 (38 KB) · printers 1600×1066 (70 KB) · core-switch 900×600
native, alpha preserved (12 KB) · multi-charger-t60 500×500 native
(18 KB) · nvr 800×800 native (10 KB).

**Verification.** typecheck/lint/validate/unit clean (validation and
unit invariants now police the 12-way mapping, the shared MC/T60
source, the exact 10 fallback categories and the four-featured limit);
repo Playwright **90/90**; Products QA matrix **28/28** — homepage
four-only, Firewall replacement, 22/12/10 index split, source-matched
plates, shared media, EN/AR (photography never mirrored, branding
never flipped), Light/Dark, STATIC/reduced-motion (all 12 complete),
mobile/tablet/zoom widths with zero overflow, keyboard, zero broken
images, zero console/hydration errors, archive never publicly
reachable. **Performance unchanged: initial /en 0.97 MB with ZERO
product images eagerly loaded** (lazy below-fold, explicit dimensions,
no CLS).

---

## Visual Experience System V2 (recorded 2026-09-01)

**D-054 — the site becomes one connected premium experience.** Owner
directive "SMART CHANNELS — VISUAL EXPERIENCE SYSTEM V2 MASTER
IMPLEMENTATION DIRECTIVE" (37 sections, OWNER APPROVED — EXECUTION
AUTHORIZED). Explicitly **not a rebuild**: every decision below is a
refactor, extension or composition of an existing approved system.
Baseline `a3ea632`. Benchmarks (sela.sa, blinkexperience.com,
blackorangelive.com) informed QUALITY ONLY — no layout, animation, code,
identity, typography or asset was taken from any of them.

**Stage A found no architectural conflict.** The theme system was already
a clean token architecture; the white→black→white alternation came from
seven scene classes hard-committing `#0a0a0c` plus local dark ink tokens,
not from a structural flaw. The separately reported carousel blank-tail
bug **did not reproduce** (copy width 8134px against a 1344px viewport,
two copies tracked, zero gap under 12× paging stress across en/ar ×
dark/light × 1440/1920/2560). No page progress indicator existed, and
none was added (§30).

**1. CONTINUOUS WHITE CANVAS (§5).** The site is one architectural canvas.
Depth comes from a surface hierarchy — `--canvas`, `--canvas-raised`,
`--canvas-sunken`, `--canvas-media`, `--canvas-edge`, `--canvas-glass`,
`--canvas-shadow` — defined for BOTH themes, not from flipping a section
to black. Reach, Products, Let's Talk and the Selected Projects moments
moved onto it. **The hero keeps its night-Riyadh dark ground by design**:
ARRIVAL is a deliberate chapter, not an alternation. A project moment
commits to dark only when an approved photograph is its ground — the
photograph brings its own darkness, and until then the moment is an
editorial moment on the canvas (§15; no media invented, no chapter
faked).

**2. GLOBAL SIGNAL LANGUAGE (§3).** One recurring DNA, never one literal
permanent line: `--signal` / `--signal-soft` / `--signal-faint` /
`--signal-trace` / `--signal-node` tokens, plus five primitives —
`.seam` (a boundary crossed once by light), `.signal-node`,
`.scan-frame`, `.edge-pulse`, `.magnetic`. All are tier-guarded and
carry RTL variants.

**3. ABSOLUTE MOTION RULE (§4).** Every motion reveals, connects,
transitions or responds. Concretely: chapter boundaries are crossed
(seam), rows are read along their length (connected arrival), product
media is opened by its scan rather than decorated by it, controls
respond to approach. Nothing loops for its own sake; nothing glows.

**4. THE SAUDI MAP REMAINS (§9) — and is drawn in the theme's ink.** The
map is non-negotiable and stays. Rather than keeping a black box on a
white page, the engine and the static SVG now read `--map-*` tokens:
the Kingdom is luminous on the dark canvas and **charcoal on the white
one**. Same geography, same story, one map — never a second artwork, and
never a mirrored one (the canvas draws in screen space, the static frame
keeps its `dir="ltr"` isolation). A theme change repaints the settled
frame once; the story never replays. **No route was invented**: the
national routes and hollow regional-reach markers are exactly the
approved source-backed geography they always were.

**5. HERO TECHNOLOGY SIGNAL FIELD (§8).** The objects became a field
without a byte of new runtime JavaScript: per-slot drift periods and
negative start offsets (deterministic, server and client agree) so
nothing is ever in phase; a distinct path per depth; the deepest objects
painting UNDER the hero scrims and the nearest in front of the scene; and
a slow unsynchronised luminosity breath on FULL only. **The architecture
remains the hero** — the objects stay small, stay clear of the headline,
and carry no HUD, readouts or invented metrics.

**6. RESTRAINED IMAGE DEPTH (§13).** One three-layer treatment, applied
through the existing `.media-frame`: an offset ground plate, a raised
frame surface, and the image with its own inner edge. Composition, not
animation — nothing in it moves.

**7. SELECTIVE MAGNETIC INTERACTION (§14).** Three controls, and only
three, lean toward an approaching pointer: the hero's primary CTA, the
header's Let's Talk, the lead form's Send Message. Capped at 7px, zero
beyond 84px, settling to exactly zero on leave. It runs inside the
cursor's existing rAF loop, is gated to fine pointers with motion
enabled, and **nothing depends on it** — with it off every control is in
the same place. This is not a cursor-dependent site.

**8. GOOGLE MAP DIRECTLY VISIBLE (§19).** The "View map" gate is removed;
the embed renders as part of the contact composition and stays lazy.
Behind it sits a designed ground carrying the approved address, so a
blocked or unreachable embed never leaves a blank rectangle. Still no API
key, no credentials, no fabricated coordinates.

**9. DELIVERY ARCHITECTURE UNCHANGED AND STILL HONEST (§20).** Reviewed,
not altered: leads are durably stored, the `LeadNotifier` boundary is
architected and unconnected, and the UI claims only what is true ("your
enquiry has been recorded"). **No provider was chosen and no credential
exists in the repository** — O-017 stays open.

**10. NO PAGE PROGRESS INDICATOR (§30).** None existed; none was built.

**11. PERFORMANCE RULES (§27).** No GSAP, no Lenis, no Three.js — no
dependency at all was added; the whole system is CSS plus the observers
and loops that already existed. Three loops that were spinning unused
frames now stop: the hero ambient field (which had been requesting frames
forever while skipping the work offscreen), both logo rails (which paused
their motion but not their loop), and the cursor loop. Standing rule: a
loop that cannot be seen must not be scheduled.

**Contrast correction.** The canvas introduced a sunken surface tier, and
the AA-weighted light accent fell to 4.36:1 against it on the
regional-reach legend and the "Explore Project" links. It is deepened
from `#d80f7e` to `#c50d73` — 5.71 on white, 5.46 on the canvas, 5.09 on
the sunken tier — with the light signal tokens following it. §5's "never
compromise contrast" is a hard constraint, not a preference.

**Two defects found by visual QA and fixed.** (a) The generic scan-reveal
pre-state hid the four featured product photographs outright, because the
homepage slots are owned by a more specific settle animation, so the
reveal never ran and the clipped pre-state simply stayed; the pre-state is
now tied to the element that actually receives `.is-visible`, and the
slots carry the mask in their own keyframes. (b) The RTL scan sweep was
losing to its LTR rule on specificity and swept the wrong way in Arabic.

**Verification.** Build, lint and typecheck clean; 9 unit tests; **90/90**
repo Playwright smoke tests. The §32 matrix — desktop and mobile × EN and
AR × Light and Dark, eight combinations, every named chapter — audits
**clean** on section presence, non-empty layout, horizontal overflow,
console/page errors and WCAG AA text contrast. True 200% zoom (720×450 at
2×) has no horizontal overflow; the 201px seen under CSS `zoom` is that
property's known fixed-element artifact. Theme and locale round-trips
preserve state and never replay the opening. The only mirrored artwork in
Arabic is the four rail chevrons — direction indicators; no logo,
photograph or map is mirrored.

**Before → after (§33), measured against a build of baseline `a3ea632`.**

| | baseline | V2 | delta |
|---|---|---|---|
| Homepage transfer | 1348.8 KB | 1352.6 KB | +3.8 KB |
| JS (gzip, all chunks) | 251.4 KB | 251.9 KB | +0.5 KB |
| CSS (gzip) | 20.3 KB | 22.3 KB | +2.0 KB |
| Images / fonts | 792.8 / 254.6 KB | unchanged | 0 |
| Requests · DOM nodes | 36 · 1107 | 36 · 1113 | 0 · +6 |
| Dependencies | — | — | none added |
| rAF at rest, hero in view | 196 / 2s | 47 / 2s | −76% |
| rAF at rest, Reach | 480 / 2s | **0** | −100% |
| rAF at rest, contact | 484 / 2s | **0** | −100% |
| CLS | 0 | 0 | — |

**Nothing was closed silently (§34).** O-016 through O-020 and every
PRODUCT-MEDIA item remain exactly as they were; O-020 in particular is
untouched — Solutions video 03 was not modified, blurred, cropped or
replaced. No business fact, project, product, client, partner, statistic,
location, certification, service, image or video was invented in this
round.


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
| O-009 | ~~Contact form backend~~ **RESOLVED by D-050**: the local lead system (POST /api/leads + LeadStore) is the backend; remaining decision is the production persistence/notification provider (see O-017). | — | Closed as originally scoped. |
| O-010 | Digital Employee AI provider (multilingual service, privacy notice, server-side credentials) | Live conversational mode | D-050 supersedes the Smart AI framing; guided intake ships meanwhile. Provider decision matrix in the D-050 report. |
| O-011 | Production domain & hosting | P19+/deployment | D-010. |
| O-012 | Client-identifying imagery permissions (e.g., "SMC vibes" office photo, Al Nassr room) | P10 gallery population | Owner to confirm usage rights per photo. |
| O-013 | Official light-background logo lockup not supplied | Light-theme brand presentation (P4+ polish) | Light theme currently uses the SC mark cropped from the authoritative asset; no lockup fabricated (D-001). |
| O-014 | ~~Two p.30 client names not legible~~ **RESOLVED** (updated profile, 2026-08-29): "Saleh Al Rajhi Partners" and "HQWS" recorded with logos (D-033). | — | Closed. |
| O-015 | Hero AI cinematic video + poster (D-027) not yet generated/approved | Final Hero media | Slot architecture ready; generation brief in the Round 3 report; spec in src/content/hero-media.ts. |
| O-016 | Official LinkedIn / Instagram / X / TikTok company URLs | Footer social treatment | Records prepared disabled in src/content/social.ts; enabling is a data edit (D-029/D-050 §39). |
| O-017 | Production lead persistence + LeadCreated delivery provider (durable store for serverless/multi-instance; email/Slack/webhook notification) | Production lead operations | D-050: local file store + server-log notifier are the honest dev defaults; adapters ready (LeadStore / LeadNotifier). Owner decision — see the D-050 provider decision matrix. |
| O-018 | ADMIN_PASSWORD (+ optional ADMIN_SESSION_SECRET) provisioning at deploy time | /admin/leads access | D-050 §28: console renders an explicit locked state until set; no default credentials exist. |
| O-019 | Confirm "Grand House" → grand-mosque-makkah mapping | Selected Projects correctness | D-050 §12: the owner's list says "Grand House"; the closest ledger record is Grand Mosque — Makkah. Featured on that mapping, FLAGGED for explicit confirmation. |
| O-020 | **REQUIRED PRE-LAUNCH MEDIA REPLACEMENT:** Replace Security Technology Solutions video 03 before final launch because visible third-party text appears inside the footage. | Final launch | Owner decision 2026-08-30 (D-051 flag acknowledged): current video 03 stays temporarily, UNMODIFIED (no blur/crop/regenerate). The owner supplies a clean approved replacement in the final media/refinement round — then: drop the new source into media-source/video/solutions/, regenerate the delivery derivative + poster under public/media/solutions/, keep the same record paths or update src/content/solutions.ts. Mapping 03 → security-solutions is unchanged. |
| PRODUCT-MEDIA-01 | **STILL OPEN** — Firewall uses INTERIM generic data-centre imagery (upgraded from the conceptual visual at D-053); a true approved Firewall appliance photograph is still required. | Final refinement | Flagged `provisional` in data and never presented as a specific appliance. Swap = new source in media-source/images/products/ + regenerated derivative on a NEW delivery path (D-053: reusing a path serves stale cached variants) + record edit. |
| PRODUCT-MEDIA-RIGHTS | Publication/licensing rights for **all eleven** owner-supplied Product images must be confirmed before final public launch unless already proven by a verified source/license. | Final launch | D-052/D-053: recorded as OWNER-SUPPLIED — PUBLICATION RIGHTS TO BE CONFIRMED BEFORE FINAL LAUNCH in media-source/images/products/MAPPING.md. No license invented; no attribution added. Several second-set files have stock-photography characteristics. |
| PRODUCT-AR-NAMES | Approved Arabic names for the 22 product categories | AR polish (non-blocking — approved EN names render via arPolicy latin) | D-052 §14: specialized terminology never invented; owner to approve Arabic terms (or confirm Latin presentation) at final refinement. |
| PRODUCT-MEDIA-02 | Low-resolution sources: 01-switch.jpg (500×270) and multi-charger-t60.png (500×500) | Final refinement (both presented whole on plates meanwhile) | D-052/D-053: never upscaled or AI-enhanced; higher-resolution owner photographs are recommended. |
| PRODUCT-MEDIA-03 | Ten categories still without approved imagery — **Router, UPS, Monitor, PC, HDMI Extender, Face Recognition Terminals** (supplied media rejected for cause at D-053) and **Hard Disk, Decoder, AC Adapter, Media Converter** (never supplied) | Full Products imagery | Each keeps the designed media-pending motif; adding one later is a pure data edit. Rejection reasons per category are recorded in media-source/images/products/MAPPING.md. |
| V2-MAP-EMBED | The Google Maps embed on the contact chapter could not be visually confirmed from the build environment — its egress policy blocks google.com. | Final launch check | D-054 §19: markup, laziness and the removal of the "View map" gate are verified; the rendered map needs one look on a normal network. The designed address ground behind it means a blocked embed is never a blank rectangle. |
| PRODUCT-MEDIA-HELD | 14 second-set files held from Product use; **Point of contact.jpg must remain unpublished** (identifiable person, legible institutional emblem) | — | D-053: the infrastructure/technical images may be considered for a future owner-authorized Solutions-support round; none may ever be presented as Gallery/project evidence. |
