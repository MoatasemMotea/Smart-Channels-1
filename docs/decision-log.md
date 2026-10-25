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


## LinkedIn activation + Organization schema (recorded 2026-09-06)

**D-055 — the first social account goes live, and the site gets its first
structured data.** Owner directive "D-055 — LinkedIn Activation +
Organization Schema". Baseline `49b5b3d`. Scope was explicitly bounded to
these two things; no media, no map, no motion system, no React component
and no dependency was touched.

**1. LinkedIn enabled as a TEMPORARY personal profile.** The owner
supplied `https://www.linkedin.com/in/smart-channels-514a80372/`. That is
a member profile (`/in/`), not a company page (`/company/`). It is
recorded in `src/content/social.ts` with `enabled: true`, so the footer
treatment built at D-029 renders it — one icon, nothing else. Instagram,
X and TikTok stay exactly as they were: `url: null`, `enabled: false`.
The record carries an inline TEMPORARY note pointing at O-016.

**2. Organization JSON-LD (first structured data in the project).** Built
in `src/lib/seo.ts` alongside the existing metadata helpers — same
pure-function shape as `pageMetadata()`, no new pattern, no new
dependency — and injected in `src/app/[locale]/layout.tsx`. It is
locale-aware: the brand name comes from the same `footer.brandName`
message the footer renders, and the address is localized through the
same `getContact()` accessor the footer's contact column uses.

**Nothing in it is invented.** Emitted fields are `name`, `logo`,
`address`, `telephone`, `email` — every one of them already approved
content (D-011, Company Profile p. 31). Fields whose data does not exist
were **omitted rather than filled**: no `url` (no production domain is
approved — D-010/O-011), no `PostalAddress` breakdown (the approved
address is authored as one localized line; splitting it would invent
structure), no founding date, no employee count, no coordinates. The
logo stays site-relative for the same reason a domain cannot be written.

**3. `sameAs` is wired but deliberately empty — so the field is absent.**
`sameAs` is derived from `getSocialLinks()` as the single source of
truth, then filtered to organization profiles only. On an Organization,
`sameAs` asserts "this URL is another official page of THIS ENTITY"; a
member profile is a different entity (a Person), so listing it would be
a false identity claim to search engines even though the company
operates the account. The LinkedIn URL therefore renders in the footer
but does not enter the graph, and since it is the only enabled record,
`sameAs` comes out empty and is dropped from the JSON-LD entirely — an
empty `sameAs` is worse than no `sameAs`.

The exclusion is **not a hand-maintained blocklist of URLs**. It reads
each platform's own URL grammar (`ORGANIZATION_PROFILE_PATH` in
`src/lib/seo.ts`): LinkedIn organizations live under `/company/`,
`/showcase/` or `/school/`, so `/in/<slug>` is filtered out by shape, and
any future URL is judged the same way. Instagram, X and TikTok share one
handle namespace between people and organizations, so their URLs carry
no signal and pass through unfiltered. Reversing the rule is deleting one
line. When the official company page is created, flipping the URL in
`src/content/social.ts` fills `sameAs` automatically — **a data edit,
zero engineering**, exactly as D-029 promised.

**4. Gated behind the indexing switch.** The JSON-LD is emitted only when
`indexingAllowed()` is true, matching `robots.ts` and `pageMetadata()`: a
noindex preview deployment has no reason to publish an identity graph
(Q-P3-11).

**Nothing was closed silently.** O-016 stays **open** — see its updated
note. O-011 (production domain) is unchanged and is what keeps `url` out
of the schema. Every other open item is untouched. No business fact,
project, product, client, partner, statistic, location, certification,
service, image or video was invented in this round.


## Categorised product catalogue (recorded 2026-09-13)

**D-059 — /products becomes nine categories and seventy-three cards.**
Owner directive "D-059 — صفحة المنتجات المصنّفة", followed by three
decisions after the pre-implementation audit found a real conflict.

**1. A SEPARATE data model, by decision.** `src/content/product-catalog.ts`
holds `ProductCategory` (9) and `ProductCard` (73: category + product
type + optional brand). `src/content/products.ts` — the 24
`CatalogProduct` records — is **untouched**, because the homepage stage
(`ProductsStage.tsx`, out of scope) still reads it through
`getFeaturedProducts()`, and its validator rules (lines 131–187) still
hold. The owner rejected merging both into one file ("the first person
to open it in a month will not know which is authoritative") and
rejected touching the stage (a decision not yet taken). New accessors
`getProductCategories()`, `getProductCategoryBySlug()`,
`getProductCards(category?)` were ADDED; the existing product accessors
were not edited by a single line.

**2. Routes.** `/[locale]/products` is the category tile grid;
`/[locale]/products/[category]` renders a category's cards — nine
categories × two locales = eighteen static routes via
`generateStaticParams`; metadata from `fullEn`/`fullAr`; an unknown slug
falls through `notFound()` to the branded boundary.

**3. Imagery follows the product TYPE, not the brand** — the owner's
mapping table, applied verbatim: 18 delivery files serve 19 of the 36
product types (`hdmi-extender-2026` serves both HDMI Extenders and HDMI
over Fiber Extenders; `access-control-2026` serves Face Recognition
Terminals; D-052's `sfp.webp` serves SFP Modules). The remaining 17
types show a neutral inline-SVG placeholder. `ups-2026.webp` is
deliberately unmapped (the power category was removed by explicit
decision) and stays on disk. **No locked image manifest** for this
catalogue, by owner instruction — the validator only checks that each
referenced file exists, so photographs can be added one field at a time.

**4. Behaviour (§4, as specified).** The category strip reveals a panel
of unique type names after 110 ms and closes 220 ms after the pointer
leaves (entering the panel cancels the close); on `(hover: none)` the
first tap opens and the second follows the link; focus opens, Escape
closes, `aria-expanded`/`aria-controls` are kept true. The category page
has a sticky side list (horizontal strip on small screens), a brand row
of toggles that filter and release, and a `minmax(178px, 1fr)` grid.
Cards show the image (4:3), the type name at 700 and the brand at 400 /
.72 — no model number anywhere, no counter anywhere. Logical CSS
properties give full RTL; reduced motion and the STATIC tier remove
transitions; focus is visible on every interactive element.

**5. `ProductCatalog.tsx` is now unreferenced by any route** and is left
in place by owner instruction. No test imports it by name; the two
smoke tests that asserted its DOM were rewritten for the new pages.

**Nothing was closed silently.** Two new open items below.


## Category strip removed (recorded 2026-09-13)

**D-061 — the horizontal category strip and its hover-reveal panel are
deleted; the side list is the only category navigation.** Owner
directive "D-061 — حذف شريط التصنيفات الأفقي".

`CategoryBar.tsx` is removed together with its two call sites, its
strip-only CSS, the `catalog.viewAll` message, and the dead code that
fed the panel (the per-category `types` computation on both pages and
the index page's `getProductCards` import — the accessor itself stays in
use on the category page). The three grouped selectors that the strip
shared with the side list, tiles and brand toggles (`:focus-visible`,
`prefers-reduced-motion`, STATIC tier) keep every other member; only the
strip's two class names were struck from them.

**The vertical scrollbar beside the strip is gone with it — root cause,
measured:** `.catalog-bar-list` set `overflow-x: auto`, which makes
`overflow-y` compute to `auto`; its nine `position:absolute` panels
extended ~223 px (EN) / ~247 px (AR) below the list box and
`visibility:hidden` hides paint but not scrollable overflow, so
`scrollHeight` 331/362 against `clientHeight` 52/54 produced a
scrollbar in both locales (left-hand in RTL). The cause lived entirely
inside the strip; no general rule was touched. After removal
`.catalog-side-list` measures equal client/scroll heights in both
locales and no other vertical scroll container exists on the page.

The index page's navigation is its nine tiles, each a link to its
category. `CategorySidebar` was already a `<nav aria-label>` landmark
(`inner.categories`), so no landmark was lost.


## Products preview removed from the homepage; category page simplified (recorded 2026-09-13)

**D-062.** Owner directive "D-062 — تبسيط صفحة التصنيف + إزالة المنتجات
من الرئيسية".

**Part one — the brand filter row is gone.** `CategoryCards` is a plain
server-rendered grid again: no filter state, no toggles, no
`brandsLabel`. The brand remains as the quiet second line under each
card — text, not a control. Brand-only CSS is deleted; `.catalog-brand`
was struck from the three grouped selectors it shared with the side
list and tiles, which keep every other member. `catalog.brands` had one
consumer and is deleted. `CategorySidebar` is untouched.

**Part two — `ProductsStage.tsx` is deleted** with its import and call
site on the homepage and all of its CSS (`.products-scene`,
`.products-stage`, `.products-slots`, `.product-slot*`, `.stage-*`, the
`[data-scene="products"]` reveal rules, their keyframes, and the
theme/RTL overrides that lived outside the main block — none used by
any other component; the two stage members of the shared
`[data-fit="contain"] img` group were struck, the `.product-card-photo`
member kept). The `SectionSeam variant="trace"` that followed it is also
removed: Solutions already reveals as `trace` and ends on `border-b`, so
a trace seam directly after it separated without distinguishing. The
homepage journey is now Solutions → Industries; both seam states were
captured at the junction before this was settled (gap 1 px with the
seam, 0 px without — the `border-b` hairline is the divider either way).

The `/products#<slug>` anchors had a single source — the stage's card
links — and had pointed at nothing since D-059; they are gone with it.
`--platform-*` tokens stay in `:root`: the orphaned `ProductCatalog`
CSS still reads them.

**What now reads `products.ts`.** After this change no rendering path
uses `products.ts` or any of the 29 files in `public/media/products/`
— the four featured photographs no longer appear anywhere.
`getFeaturedProducts()` has no consumer and is marked dead in place;
`getPublishedProducts()` is read only by the orphaned `ProductCatalog`;
the validator's D-052/D-058 block and the unit test still guard the
data. **Nothing is deleted here, by decision** — see the updated
`D059-DUAL-SOURCE` for why and for the closing condition.


**D-063.** Owner directive "D-063 — `/products` يعرض أول تصنيف مباشرة" (2026-09-13). `/products` no longer shows the nine-tile index; it renders the FIRST category by `order` (networking) exactly as `/products/networking` does — hero with the category name, the side list with that category marked `aria-current="page"`, its 15 cards. Metadata is unchanged: `/products` keeps the generic "Products" title and description, and its canonical still points at itself (`seo.ts` untouched by instruction).

- **Deduplication method:** the whole category body (side list + card grid, formerly lines 53–81 of `[category]/page.tsx`) was extracted into one server component, `src/components/products/CategoryCatalog.tsx` (`{ locale, category }`). Both routes now render `<CategoryCatalog …/>`; each keeps its own `generateMetadata`. The alternatives — re-exporting the `[category]` page from the index with fabricated params, or a redirect — were rejected: the first bends Next's page contract and drags the category metadata along, the second contradicts the directive that `/products` render content under its own metadata.
- **CSS:** the tile-only block (`.catalog-tiles`, `.catalog-tile`, `:hover`, `-short`, `-full`, 30 lines) deleted; `.catalog-tile` removed from the grouped `:focus-visible`, `prefers-reduced-motion` and `data-motion-tier="static"` selectors, leaving `.catalog-side-link` alone in each.
- **Messages:** nothing died. `pages.products.title`/`.description` are still consumed by `generateMetadata` (index and category), `inner.categories` keeps three consumers (gallery ×2, the orphaned `ProductCatalog.tsx`), `catalog.categoriesNav` gains a second consumer.
- **Tests:** the smoke test "/products: the nine categories as tiles, no counters" was rewritten in place, not deleted — it now asserts zero tiles, one `h1` = "Networking & Connectivity", 15 cards, Networking current, the generic `<title>`, the two guards (no counters, no commerce language) and that `main.innerText` of `/en/products` equals that of `/en/products/networking`. 96/96 smoke green.
- **Measured (pink dot question, item 7 of the pre-check):** the dot beside the title is the static, `aria-hidden` `●` overline span in `PageHero.tsx` (11×19 px AR / 8×14 px EN). Between the hero and the first card the only accent-coloured pixels at 1440/768/390 are the active side-list link and, at 390, the fixed chat button; no card element and no hover state produces a dot.

**D-064.** Owner directive "D-064 — حذف خمسة أنواع + ربط 25 صورة" (2026-09-13), executed in two commits.

- **Part 1** (`e77ca34`): five av types removed with their cards — Video Wall Controllers, Y-Splitters, Display Remotes, HD Cables, VGA Cables. Catalogue: 31 types / 68 cards; av = 3 types / 4 cards; the Jupiter brand leaves with the controllers.
- **Part 1b** (owner amendment, same day): the Monitors type (computing) removed with its six cards — ArrQW, Dell, Egeira, HP, LG, Majesty. Catalogue: 30 types / 62 cards; computing = 6 types / 15 cards. The brands LG, ArrQW and Majesty leave the catalogue with it, as intended. `monitors.png`, when it arrives, stays in the intake folder unlinked.
- **Part 2 — intake measured, not assumed.** 25 files arrived in `media-source/images/products-intake/` (owner commits `24d9229`, `1fb8729`). Every file was measured for a REAL alpha channel (any pixel < 255), dimensions, weight, fully-transparent share and product-pixel alpha: 23 PNG cut-outs with real alpha (product body at alpha 252–253, corners at 0); **two held by owner decision:** `ptt-radios.jpeg` (JPEG, no alpha, a full-bleed marketing scene with legible captions "Individual Call · All Call · Group Call · Broadcast Call" — not a product cut-out) and `desktop-pcs.png` (PNG with no alpha channel and a baked white ground; no algorithmic background removal — that would generate pixels the source never made). `face-recognition.png` was briefly held for the face on the terminal's screen and cleared by the owner as AI-generated. Legible text inside `hard-drives` and `flash-memory` was read at full resolution and approved: "Surveillance HDD · NAS HDD · Enterprise HDD · SATA SSD · 2.5″ · M.2 NVMe SSD" and "SDXC I · microSDXC · 256GB V30 · U3 · CFexpress -B · 512GB · XQD · SD · microSD" — no misspelling, no brand name.
- **Derivation** (path (b), owner-approved after a before/after table): originals archived under `media-source/images/products/` by `git mv`; derivatives in `public/media/products/<name>.webp`, cropped to the alpha ≥ 16 bounding box (verified per file that every product pixel lies inside the box), longest edge **600px** (the card is `minmax(178px,1fr)` with a plain `<img>` and no srcset, so 600 covers 2x and 3x; the earlier 1200 was 6.7× over), except the three 3:1 files `switches`, `firewalls`, `core-switches` at **800px** because their limiting edge is the one that fills the card. WebP quality 86, alphaQuality 100, effort 6. Encoding cost measured against a lossless reference of the same crop and scale: mean RGB error 1.3–3.7 / 255 on product pixels, alpha channel exact. 35,645 KB in → 1,144 KB out. `sharp.trim()` was tried first and rejected: it compares every channel against the corner pixel, and RGB noise under alpha 0 stopped it at the first row, so the crop is an explicit alpha bounding box.
- **Naming deviation, forced:** `nvr.webp` and `printers.webp` already existed in `public/media/products/` (D-052 delivery files, different bytes), and `nvr.png` already existed in the archive. D-053 forbids reusing a delivery path for different bytes and the directive kept the 29 old files untouched, so the two derivatives are `nvr-catalog.webp` and `printers-catalog.webp`, and the nvr original is archived as `nvr-catalog.png`. (During execution the two old files were overwritten for one step and restored from HEAD before anything else happened; `git diff` on the 29 is empty.)
- **Linking:** 23 of 30 types carry an image (after Part 1b); the image follows the TYPE (five Switches cards → `switches.webp`, five Media Converters cards → `media-converters.webp`). Seven types render the placeholder: Camera Mounts, Decoders, HDMI Splitters, Mice, Keyboards (no image supplied), Desktop PCs and PTT Radios (held). No locked manifest; the validator's D-059 section keeps checking only that a referenced file exists.
- **Tests:** the temporary D-060 assertion (`every image is ""`) removed alone, as its comment required; the type-shares-one-file rule stays. The networking smoke test's three D-060 placeholder assertions were replaced by measured ones: fifteen `<img>`, zero placeholders, the five Switches cards share exactly `/media/products/switches.webp`, and every image is scrolled into view, decoded and has `naturalWidth > 0` (the first run failed on the mobile project because lazy images below the fold were never fetched — the decode step fixes the test, not the page).
- **Proof run:** nine categories × two themes × two locales, 68 cards, 23 unique images all decoded with `naturalWidth > 0`, zero broken, zero mirrored in RTL, zero console errors.

**D-065.** Owner directive "D-065 — معرض دوّار ثلاثي الأبعاد للصور والفيديو" (2026-09-15). The editorial masonry on `/gallery` (and its FLIP reflow) is replaced by a 3D cover carousel; the D-045 lightbox stays and opens from the centre card.

- **Component:** `src/components/gallery/GalleryCarousel.tsx` (new, client). One ring of square cards; geometry lives entirely in CSS keyed by the signed LOGICAL offset `[data-pos]` (centre `clamp(200px, 32vw, 300px)`; ±1 at 64 % / ∓20°, overlapping the centre by ~12 % of its width; ±2 at 50 % / ∓35°; ±3 at 40 % / ∓45°; opacities 1 / .95 / .75 / .4; z-index 10 / 9 / 8 / 7), so RTL mirrors x and rotation by `[dir="rtl"]` rules alone. Rotation is read physically: a side card tilts its TOP edge toward the centre (left card `+rot`, right card `−rot`) — the directive's table and its prose agree on that intent, and the literal `rotate(-20deg)` example was taken as illustrative. Only `transform` and `opacity` animate (600 ms `cubic-bezier(.34,1.3,.64,1)`); positions beyond `floor((n−1)/2)` are `data-pos="hidden"` so an item is never on screen twice (owner decision §3 — with three published items the ring shows centre ±1). Arrows (own `.gcar-btn` class, 44 px, `aria-label` from the new `gallery.carousel.*` keys — `.rail-nav` untouched), ← / → keys (reading-direction aware), pointer swipe (40 px), horizontal wheel (throttled 600 ms); no automatic rotation. `prefers-reduced-motion` and the STATIC tier drop rotation and slide: a 200 ms opacity crossfade only.
- **Video discipline:** the centre video `play()`s muted (`muted playsInline loop preload="metadata"`, poster mandatory, no `controls`); leaving the centre pauses, rewinds and re-mutes; the speaker button toggles mute in place; the card click opens the lightbox, whose `<video>` now autoplays WITH sound (the click is the permission) — the only edits inside the lightbox JSX are that dropped `muted` attribute (with a justified `jsx-a11y/media-has-caption` disable: ambient footage without speech) and `poster={current.poster}` in place of the convention-derived value. A video whose file fails shows its poster; nothing throws.
- **Data:** the existing `GalleryItem` model already covers the directive (`type` ≡ kind, `alt`/`caption` as `LocalizedText`, `poster?`) — no rename (owner §1). The three video records now name their `poster` explicitly; `posterOf` (derivation by convention) is deleted from `GalleryExperience` — it has no consumer there. **Note:** `GalleryPreview.tsx` on the homepage still derives posters by the same convention; it is out of scope and untouched.
- **Validator (appended after the locked product block, lines 131–187 unshifted):** every video record must name a poster; a PUBLISHED video must be ≤ 8 MB; at most five published videos. `event-network-build-2025.mp4` is 14.09 MB, so its record is `published: false` until the re-encoded file lands (see D065-VIDEO-REENCODE) — the gallery shows three items meanwhile. A unit test pins all three rules.
- **CSS:** `.gallery-masonry-item`, `.gallery-card`, `.gallery-card-media`, `.gallery-card-caption` deleted (no consumer); `.gallery-masonry` kept (the homepage preview uses it); `.gallery-play-badge` reused for the card badge.
- **Smoke (`tests/smoke/gallery-carousel.spec.ts`, 10 tests × 2 projects):** arrows rotate and loop; ← / → step and only the centre card is focusable; centre video `paused === false && muted === true`, leaving pauses/rewinds/re-mutes; speaker toggles without opening the lightbox; the lightbox opens with `controls` and sound and its two `.rail-nav` arrows are intact; a video whose request is aborted (test-only) still shows its poster with no page error; RTL puts logical +1 on the LEFT and mirrors the chevrons; LTR tilt signs; reduced motion → no rotation in the computed matrix and `transition-property: opacity`; no console errors in both locales. The test browser is open-source Chromium with **no H.264 decoder**, so the "playing" assertions answer the mp4 requests with a tiny VP9 clip recorded in the browser at test time — test-only, never written to the repository.

**D-066.** Owner directive "D-066 — أربعة أنواع جديدة + ست صور + إعادة تسمية تصنيف" (2026-09-15), two commits.

- **Part 1** (`33c8a7f`): the storage category's display names become "Storage & Servers" / "التخزين والخوادم" (short and full; slug and `/products/storage` unchanged — the only place the name lives is the category row, nothing in `messages/*.json`). Four brandless types added in the owner's order (PoE Switches after Switches, Network Racks last in networking; Rack Servers then Storage Arrays first in storage). Camera Mounts removed — the owner had intended it at D-064 but the instruction never reached the session (a relay error, per the owner), and batch 3 (`544ffef`: decoders, hdmi-splitters, monitors) had likewise arrived without a follow-up directive; both were folded into D-066 by decision. Catalogue: **33 types / 65 cards** — networking 8/17, surveillance 4/6, storage 4/9.
- **Part 2 — measured, then linked.** Eight candidates measured (real alpha, dimensions, weight, transparent share, product-pixel alpha): all PNG cut-outs with real alpha, product body at 247–253. Derivation as D-064 (alpha ≥ 16 bounding box, 600 px, WebP q86 / alphaQuality 100 / effort 6; no 3:1 file, so no 800 px case; `network-racks` is portrait → 536×600). **Held by owner decision after seeing the card previews:** `keyboards` and `mice` carry a baked semi-transparent light haze (only 9–15 % of pixels fully transparent) that reads as a grey cloud on the dark theme — they stay in the intake folder unlinked until clean cut-outs arrive. `hdmi-splitters` carries a fainter trace and is linked (the AV category is now fully photographed); the owner reviews its dark-theme card and may replace it. **Six linked:** poe-switches, network-racks, rack-servers, storage-arrays, decoders, hdmi-splitters. Collision check ran BEFORE any copy this time (lesson from D-064); no collision. 29 of 33 types photographed; four on the placeholder: Keyboards, Mice, Desktop PCs, PTT Radios.
- **Intake sheet** `docs/product-images.md` regenerated from the catalogue: 33 rows, renamed category, the four new types, the file column filled for every linked type and a "held — why" note for the four held files; the intro no longer claims the catalogue is unlinked.
- **Tests:** unit counts 62 → 65 (networking 17, surveillance 6, storage 9); networking smoke back to 17 `<img>` / 0 placeholders after a green interim commit at 15 / 2; new smoke tests for `/products/computing` (7 `<img>` / 8 placeholders — laptops, tablets, printers photographed; desktop-pcs, keyboards, mice held) and `/products/storage` (renamed heading and side-list label in EN and AR, nine cards all photographed, Rack Servers first).

**D-067.** Owner directive "D-067 — الدوّار على الرئيسية · حذف صفحة المعرض" (2026-09-16). The D-065 carousel moves onto the homepage in the existing `#gallery` section (same `MotionSection`, same `SectionHeading`), the standalone `/gallery` route is deleted, and the D-045 lightbox is extracted so the carousel can open it there.

- **Extracted, behaviour unchanged:** `src/components/gallery/GalleryLightbox.tsx` — the `<dialog>` JSX moved verbatim from `GalleryExperience` (the only edits are the three renames the extraction forces: `visible` → `items`, `step` → `onStep`, the ✕ handler closes via the local ref); the two effects (showModal / `close` event; Escape · direction-aware arrow keys · pointer swipe · backdrop click) moved with it. `src/components/home/GallerySection.tsx` (client) owns the carousel index, the lightbox index and the opener ref, and returns focus to the opening card on close exactly as before.
- **Deleted:** `src/app/[locale]/gallery/page.tsx` (route folder), `GalleryPreview.tsx` (with its last `posterOf`-style convention derivation), `GalleryExperience.tsx`, the category filter (never shown on the homepage), the masonry CSS (`.gallery-masonry` ×2, `.gallery-tile`, `.gallery-caption`). `/gallery` now falls through the branded `[...rest]` not-found boundary — no redirect, the site is unpublished.
- **Kept, by measurement not assumption:** `.gallery-shell-media/-caption` (used by `projects/[slug]`), `.gallery-filter*` (used by the orphaned `ProductCatalog.tsx`), `.gallery-lightbox*`, `.gallery-play-badge`, `.rail-nav`. Two pre-existing CSS orphans (`.gallery-shell-grid`, `.gallery-cat`) left in place — D067-CSS-ORPHANS.
- **Links:** `navigation.ts` already pointed the header and footer "Gallery" entries at `/#gallery`; the dead `ANCHOR_ROUTE_ALIASES["/#gallery"]` line in `HeaderNav.tsx` is removed (the `/#gallery → gallery` scroll mapping stays). **One-line exception to the forbidden list, by owner decision:** the `/gallery` entry in `sitemap.ts` is removed, because the ordered deletion is what made it lie; the diff of that file is one deleted line.
- **Messages:** `pages.gallery.title` keeps a consumer (the lightbox's fallback aria-label); `pages.gallery.description` is dead — kept, see D062-DEAD-MESSAGES.
- **Tests:** the ten D-065 smoke tests move from `/en|ar/gallery` to `/en|ar/#gallery` with their assertions unchanged; `routes.spec` drops `/gallery`; two new tests — the header's Gallery link (through the "More" menu) lands on `#gallery` in view from the homepage and from `/company`, and `/gallery` is 404 in both locales with no redirect.
- **Observation for a later decision (not changed here — the carousel stays as built at D-065):** the centre video calls `play()` on mount, so on the homepage the first video (≈4 MB) starts downloading and playing muted while the section is still below the fold. The old preview gated playback on an IntersectionObserver. Recorded as D067-OFFSCREEN-PLAY.

**D-068.** Owner directive "D-068 — بطاقة واحدة لكل نوع منتج" (2026-09-19). A catalogue card is now a product TYPE, not a (type × brand) pair: 33 cards instead of 65, every brand kept.

- **Model:** `ProductCard.brand: string` → `brands: string[]` (alphabetical by `localeCompare(…, "en")`, may be empty). `productCards` = the `TYPES` rows directly (no `flatMap`), brands sorted at derivation. The seven brandless types that were stored as `brands: [""]` (an empty-string stand-in that produced one card each) are now `brands: []`; the validator rejects any empty brand string so the stand-in cannot return.
- **Card (`CategoryCards.tsx`):** photograph → type name (700) → one brand line "Aruba · Cisco · Hikvision · Linksys · Ruijie" (400, ink at .72 — the existing `.catalog-card-brand` rule, no CSS change) or no line at all. The line carries `dir="ltr"` on its own element: the names are Latin, and inside an RTL card the bidi algorithm would otherwise reverse them and displace the separators — proven by a smoke test that measures the glyph positions of the first and last brand in EN and AR.
- **Two-line exception, by owner decision:** `CategoryCatalog.tsx` (forbidden list) consumed the singular field; its key becomes `${category}|${typeEn}` and the field `brands: k.brands` — the diff is exactly those two lines.
- **Validator:** duplicate key `category|type|brand` → `category|type`; new rule: no empty brand string; "every category has a card" and "image exists on disk" unchanged. The unit-test rule "every card of a type shares one file" is tautological with one card per type and was replaced by: each card is one `TYPES` row (33, no `category|type` repeat), brands non-empty and `localeCompare`-sorted, the Switches order pinned, the seven brandless types pinned.
- **Amendment, option (a) (owner, same day, separate commit):** the brand line is not drawn at all — a card is the photograph and the type name. `brands` stays in the data (sorted, validated, non-empty) but has no visual consumer; `.catalog-card-brand` and its CSS rule are removed; the "Switches brand order" smoke test is replaced by "no `.catalog-card-brand` and no brand name inside the grid on any of the nine category pages, exactly one text line per card".
- **Counts:** 33 cards — networking 8 · fiber 3 · cybersecurity 1 · surveillance 4 · av 3 · computing 6 · storage 4 · communication 2 · environmental 2. Smoke counters follow (networking 17 → 8 cards and `<img>`; computing 15 → 6 with 3 photographs / 3 placeholders; storage 9 → 4; `/products` 17 → 8); the D-063 innerText-equality test still holds. `docs/product-images.md` unchanged (already per type).

**D-069.** Owner directive "D-069 — القائمة على الجوال" (2026-09-19). The mobile menu (below `lg`, 64 rem) is rebuilt on the owner's approved five-part plan; the desktop header is untouched.

- **Diagnosis (measured before the change, `/company`, 390×844 and 768×1024, EN and AR):** at the top of the page the old overlay covered the viewport (390×844 / 768×1024); after a 400 px scroll it collapsed to 390×80 / 768×80 (`clientHeight` 80 against `scrollHeight` 911, first link at y = 100 — outside its own box) and the page showed only the "MENU" microlabel and the ✕. Root cause: the overlay was `position: fixed` INSIDE `.site-header`, and `html[data-scrolled="true"] .site-header` sets `backdrop-filter: blur(10px)`, which makes the header the containing block of its fixed descendants. The "MENU" text was `common.menu` through `.microlabel` (uppercase).
- **Fix (`MobileMenu.tsx`, full rewrite; `HeaderNav.tsx` unchanged):** the panel and its backdrop are rendered through `createPortal` into `document.body` — outside the header they cannot be captured. One toggle `button.menu-toggle` (44×44, `aria-controls="site-menu"`, truthful `aria-expanded`, `aria-label` = `nav.openMenu` / `nav.closeMenu`) whose three SVG bars morph ☰ ⇄ ✕ (200 ms; the inner ✕ button and the "MENU" label are gone — `common.menu` now names the `nav`). `nav#site-menu` is a sheet under the 80 px header (`inset: 5rem 0 auto 0`, `max-block-size: calc(100dvh − 5rem)`, z-index 70 above the floating buttons at 60/59) over a dimmed backdrop (z 69); it shares the header's environment tokens (`html[data-header-env="dark"]` — one selector added to the existing header rule) so the stack is never two-tone. Enter/exit 220 ms; the node stays mounted until `transitionend` (or `transitioncancel`) of the panel's opacity — no fixed timer — and unmounts at once when no transition will run (reduced motion, STATIC tier, `display: none` past the breakpoint, or a sheet still at opacity 0). Open locks `body` scroll and focuses the first link; Escape closes and returns focus to the toggle; a link click closes then navigates; backdrop click, `usePathname()` change and `matchMedia("(min-width: 64rem)")` matching all close. Tab / Shift+Tab cycle inside the sheet. Locale and theme switches live inside the sheet; the contact block (approved `contact.ts`) stays. Rows are 48 px minimum, `text-align: start`; in RTL the toggle sits at the inline end (x = 24) and the LTR phone line is right-aligned.
- **Two defects found while testing, fixed before commit:** (1) a node inserted and flipped to `data-state="open"` in the same frame has no before-change style, so no enter transition ran on a freshly navigated route and the later exit never fired `transitionend` (sheet stuck) — the open rAF now flushes style (`getBoundingClientRect`) before flipping; (2) the ✕ read as a "K": `translateY(…) rotate(…)` rotates first — now `rotate(…) translateY(…)`.
- **Measured after the change (`/company`, top AND scrolled 400 px, EN and AR):** 390×844 → sheet (0, 80, 390×672 EN / ×692 AR), `clientHeight` = `scrollHeight` (no internal scroll), first link y = 93 (48 / 50 px rows), last link bottom 525 / 541, backdrop (80, 764); 768×1024 → sheet 768×672 / ×692, backdrop (80, 944). All eight cells identical between top and scrolled; `body.overflow = hidden`, `aria-expanded = true`, focus on the first link, `offsetParent === null` (the viewport, not the header). Header at 1440 (EN/AR × top/scrolled, 1440×96 clips): pixel-identical before/after (0 differing samples).
- **Logo hypothesis (owner asked for a check before any fix):** the light-theme mark `logo-mark.png` inside `h-12` is NOT clipped — natural 64×69, rendered 45×48 (`w-auto` keeps the aspect ratio), its link box 45×48, no overflow clipper on any ancestor; the dark lockup renders 68×56 inside the 81 px header at 390 / 320 / 768. Nothing to fix; the smoke test now asserts the logo stays inside the header container at 390 and 768, top and scrolled.
- **Tests:** `tests/smoke/mobile-menu.spec.ts` (16 tests, mobile project; one desktop test): 390 and 768 × EN/AR × top/scrolled — toggle geometry and labels, sheet in the viewport under the header, rows ≥ 48 px inside the viewport, z-index > 60, RTL direction/alignment, focus enters, Escape → focus back on the toggle and body unlocked; Tab trap; link click closes and navigates; browser back closes; backdrop click closes; growing to 1024 closes, resets and hides the toggle; logo inside the container; 1440 has no toggle and no sheet and an 81 px header. Gates: `npm run check` (11 tests), `npm run build`, `npm run test:smoke` (140 passed, 16 skipped).
- **CSS:** the `.mobile-menu-overlay` / `.mobile-menu-item` / `@keyframes menu-item-in` / static-tier / RTL rules are removed with their only consumer (no orphans); new `.menu-toggle*`, `.site-menu*` rules in their place. Forbidden files (`navigation.ts`, footer, gallery, products, `seo.ts`, `sitemap.ts`, `.rail-nav`, `package.json`) — zero diff.

**D-070.** Owner directive "D-070 — توسيط نافذة عرض المعرض" (2026-09-19), with four decisions on the pre-check: the dialog fix as scoped, the small-screen arrow row stays UNDER the media (the owner withdrew "over the media" — a portrait video fills the height at 390 px and arrows over it would cover what the visitor looks at), the close button fixed at the screen corner, and the centring assertion in the smoke suite.

- **Diagnosis (measured before, `/#gallery`, landscape image 848×464 and portrait video — poster 464×848 in the test browser):** `getComputedStyle(dialog)` gave `margin: 0px · inset: 0px · display: block · place-items: normal` in all twelve cases. Tailwind v4 preflight (`*, ::before, ::after, ::backdrop { margin: 0 }`) zeroes the UA `dialog { margin: auto }` that centres a dialog, so the 1200 px box sat at the start corner: media centre − screen centre = −120 px at 1440 EN, +120 AR, ∓360 at 1920, ∓19 at 390; vertically −64 … −282 px; the arrow pair (absolute at the box edges) was off by ∓240 / ∓720 / ∓266. Second defect: `width: 100%` on the media letter-boxed the portrait video inside a 1168×684 landscape box.
- **Fix (CSS block `.gallery-lightbox*`, JSX wrapper only):** `.gallery-lightbox` — `inset: 0 · width: 100vw · height: 100dvh · max-width/max-height: none · margin: 0`; `.gallery-lightbox[open]` — `display: grid` with rows `minmax(--lb-stack, 1fr) auto minmax(--lb-stack, 1fr)` and `justify-items/align-items: center` (the `[open]` guard keeps the UA `dialog:not([open]) { display: none }` in force; preflight untouched). The body is `display: contents`, the stage is grid row 2. Media: `width/height: auto · max-width: min(92vw, 1400px) · max-height: min(84dvh, calc(100dvh − 2·--lb-stack)) · object-fit: contain` — a portrait video is bounded by height and becomes a centred column (405×740 at 1440, 464×848 at 1920, 322×588 at 390). New `.gallery-lightbox-below` (absolute, `top: calc(100% + .75rem)`, `inset-inline: 0`) holds the caption — full media width, `text-align: center` — and the arrow row, outside the centring. `.gallery-lightbox-prev/-next` and `-close` are `position: fixed` at the screen edges with `--lb-edge: clamp(12px, 3vw, 40px)`; `.rail-nav` itself untouched. ≤ 640 px: `--lb-stack: 8rem`, media `max-width: 100vw`, caption 14 px, arrow row `display: flex; justify-content: center` under the caption.
- **Deviation 1 (accepted by the owner, no action):** on a 900 px-high screen the media cap resolves to 740 px (82.2 dvh), not 84 dvh, because the symmetric stack reservation (`100dvh − 2 × 5rem`) is the tighter bound; at 1080 px 84 dvh wins.
- **Deviation 2 → follow-up commit (owner directive 2026-09-19):** with `width/height: auto` the landscape image rendered at its natural 848×464 on desktop. Now the media fills its box by ORIENTATION: `GalleryLightbox` sets `data-orientation="landscape|portrait"` on the media element from its real dimensions (`naturalWidth/Height` on `load` for an image; `videoWidth/Height` on `loadedmetadata` for a video, with the poster's dimensions — read through an `Image()` — as the stand-in until metadata arrives; square counts as landscape). CSS: landscape → `width: min(92vw, 1400px); height: auto` (`width: 100vw` at ≤ 640 px — no side margin); portrait → `height: min(84dvh, calc(100dvh − 2·--lb-stack)); width: auto`; the `max-*` guards and `object-fit: contain` stay. Measured (twelve cases, Δx = Δy = 0 unchanged, arrows symmetric, media on screen): 1440 → image 1325×725 (100 % of the width cap, 98 % of the height cap), video 405×740 (100 % of the height cap); 1920 → image 1400×766 (100 % / 84 %), video 496×907 (100 % height); 390 → image 390×213 (100 % of 100vw), video 322×588 (100 % height). No letter-box in any case; a landscape image gets bars only when its width-derived height exceeds the cap (viewport wider than the image's aspect), where the height guard clamps. The smoke test asserts the orientation attribute and the fill (landscape ≥ 90 % of the width cap or height-bound; portrait = the height cap ±1 px).
- **Measured after (twelve cases, top of the section, `/#gallery`):** media centre − screen centre = 0 px on both axes in all twelve; arrows symmetric about the screen centre (sum of centres − width = 0) at 1440/1920, and a centred row under the caption at 390 (row centre = 195); caption x/width = media x/width; media wholly on screen; close at (1360, 40) EN / (40, 40) AR at 1440. 1440: image 296,218,848×464; video 518,80,405×740. 1920: image 536,308; video 728,116,464×848. 390: image 0,315,390×213; video 34,128,322×588.
- **Behaviour unchanged (asserted):** Escape closes and focus returns to the opening card; a click on the empty stage (the dialog element) still closes; arrows, swipe, sound and posters untouched (`tests/smoke/gallery-carousel.spec.ts` still green).
- **Tests:** `tests/smoke/gallery-lightbox.spec.ts` (9 tests, mobile project): 1440 and 390 × EN/AR × image/video — |Δx| ≤ 1, |Δy| ≤ 1, media on screen with its aspect, portrait video narrower than tall, caption centred under the media at its width, arrows symmetric ±2 px at 1440 / centred row at 390, close at the top inline-end corner; plus the empty-stage click. Gates: `npm run check` (11), `npm run build`, `npm run test:smoke` (149 passed, 25 skipped). Forbidden files (`GalleryCarousel.tsx`, `GallerySection.tsx`, `.rail-nav`, `package.json`) — zero diff.

**D-071.** Owner directive "D-071 — استبدال أربع صور محجوزة" (2026-09-20), then narrowed to three, then approved for one. The owner's intake commit `af05f4b` ("batch 5, 3 replacements") changes ONE file: `products-intake/desktop-pcs.png` (1,253,933 → 2,226,188 bytes). `keyboards.png` and `mice.png` are byte-identical to batch 4 (`af5e2b1`, 2026-09-15) — their replacements were not pushed — and `ptt-radios.jpeg` stays held by decision.

- **Measured (D-064 criteria; "transparent" = alpha < 16 as at D-066):** desktop-pcs NEW — PNG RGBA 1536×1024, 2,174 KB, 34.7 % transparent (28.2 % at alpha 0 + 6.5 % at 1–15), 3.5 % at 16–200, product-pixel alpha median 252, no pixel at 255; the old file was an opaque white-ground PNG 1448×1086 (0 % transparent). keyboards (unchanged) 8.7 % transparent, mice (unchanged) 14.9 % — the baked haze of D-066 is still there, so both stay held.
- **Derived and linked (owner approval after the before/after table):** `public/media/products/desktop-pcs.webp` on a NEW path (D-053; no collision) — crop to the alpha ≥ 16 bounding box (2,25 → 1524,988 = 1523×964; the 3,207 pixels outside it are haze at alpha 1–15, no product pixel), longest edge 600 px → 600×380, WebP q86 / alphaQuality 100 / effort 6, 83.4 KB. Encoding cost against a lossless reference of the same crop and scale: mean RGB error 2.89 / 255 on product pixels, alpha channel exact. Original archived by `git mv` to `media-source/images/products/desktop-pcs.png`. `product-catalog.ts`: one field on the Desktop PCs row; `docs/product-images.md` row 21 updated. Card preview checked in both themes and locales (renders 200×149 in the card; no grey cloud on the dark theme).
- **Follow-up (owner intake `b8094f7`, batch 6, approved after a second before/after table):** keyboards and mice replaced with the same names. Measured — keyboards 1536×1024, 2,260 KB, **40.8 %** transparent (was 8.7 %), haze band alpha 1–15 down from 8.6 % to 2.0 %, product alpha 252, border-ring mean alpha 46.9 → 15.0; mice 1536×1024, 1,961 KB, **50.4 %** transparent (was 14.8 %), haze 14.3 % → 1.0 %, product alpha 251, border ring 15.1 → 3.3. The baked haze is gone (alpha maps show hard edges); the small holes between the keys, the borderless silver keyboard and the soft shadow under the mice were accepted by the owner in advance. Derived as above on new paths: `keyboards.webp` 600×385, 115.9 KB (crop 1498×960; 107 haze pixels outside the box), `mice.webp` 600×366, 78.6 KB (crop 1484×906; 57 outside); RGB error 2.52 / 1.94 per 255 on product pixels, alpha exact. Originals archived by `git mv`; two one-field edits in `product-catalog.ts`; sheet rows 23 and 25. Card previews clean in both themes and locales; the computing category has no placeholder left.
- **PTT Radios — closing, OWNER EXCEPTION (2026-09-20).** The owner's `171b875` replaced `ptt-radios.jpeg` with `ptt-radios.png`, but the PNG is the same scene byte for byte (mean channel difference 0.00; 3 channels, no alpha, 1280×720; four readable labels "Individual / Group / All / Broadcast Call" over a 3-D city) — and its source, `t60-2026.jpg` from D-058, has the same sha256 as the D-064 `ptt-radios.jpeg`: one marketing render under three names. The proposed alternative `t60-2026.webp` is that scene (no alpha, "full-bleed composited scene → cover" in the D-058 manifest); `multi-charger-t60.png` shows six real radios on a charger but is a 500×500 white-plate JPEG, and `multi-charger-2026.webp` is the empty charger. **Owner decision:** link the scene anyway as a documented exception — it breaks the D-064 standard (a scene with text, no alpha) and is replaced the moment a cut-out arrives. Derived on a new path: `public/media/products/ptt-radios.webp`, 600×338, 3 channels, WebP q86 / effort 6, 44.4 KB (mean RGB error 1.88 / 255 against the lossless resize); `product-catalog.ts` one field; sheet row 30 marked as the exception; `products-intake/ptt-radios.png` deleted as a duplicate (the bytes live on as `media-source/images/products/t60-2026.jpg`).
- **Tally:** **33 of 33 types photographed — the catalogue is complete** (32 to the D-064 standard, PTT Radios by exception). Smoke: every category has as many `<img>` as cards and no placeholder, 33 cards in total, and the PTT card decodes `ptt-radios.webp` at 600 px. Gates: `npm run validate`, `npm run check` (11), `npm run build`, `npm run test:smoke` (149 passed, 25 skipped).

**D-072.** Owner directive "D-072 — قسم الصناعات: سلايدر بملء العرض (16 شريحة)" (2026-09-20), with eight pre-check decisions. The homepage Industries section is a full-width hero slider of the 16 approved sectors in a new importance order, with no "featured" marks; the section shell (`#industries`, `data-scene`, heading, `border-b`, the node seam after it) is unchanged, so hash arrival and the neighbours (Solutions before, `SectionSeam` + Selected Projects after) are untouched.

- **Data (`industries.ts`, `types/content.ts`):** `featured` and the unused `media?` are gone; `tagline` (owner text, verbatim, EN/AR) and `image` + `imageWidth` are added; `order` re-ranked 01 Religious … 16 Media (ids unchanged — projects reference them). `getFeaturedIndustries()` and its unit assertion deleted; the unit test now pins the 16-name order and the presence of both taglines. Validator: Arabic tagline check, both delivery files must exist, and `imageWidth` must equal the WebP's real canvas width (read from the VP8X header) — the srcset descriptor is never a guess. `imageWidth` is one field beyond the directive: with a `w` descriptor of 1920 for a 1672-px file the browser reported `naturalWidth` 1254 and chose candidates on a lie.
- **Images (owner intake `47c6f1c`, 16 PNG, 38.82 MB):** 14 scenes archived by `git mv` to `media-source/images/industries/` and derived to `public/media/industries/industry-NN-slug.webp` at the ORIGINAL width (1672, motorsport 1536 — no enlargement, owner decision 2) plus `-960.webp` for phones, WebP q80 / effort 6: **28 files, 4,822 KB (4.71 MB)** — largest 296 KB (01), smallest 91 KB (16-960). **Held (owner decision 1):** `industry-08-stadiums.png` and `industry-09-sporting-events.png` are transparent cut-outs (46 % alpha < 16), not scenes; they stay in the intake folder, and slides 08 and 09 show the dark gradient alone (`image: ""`). Several scenes carry baked-in signage text (02, 06, 07, 11, 14, 15, 16 …) — recorded, no action (owner decision 7).
- **Slider (`IndustriesSection.tsx` server shell + `IndustriesSlider.tsx` client, CSS `.industries-slider*`):** height `min(80vh, 720px)` / `min(70vh, 560px)` at ≤ 640; scene `object-fit: cover` under a scrim (bottom band for the strip + central pool for the title); title in `--font-display` (Archivo / Noto Kufi Arabic) at `clamp(32px, 5vw, 64px)` 700 white, `clamp(26px, 8vw, 36px)` on phones; tagline 16–18 px at 80 % white (14 px on phones); counter `01` at the line start and `16` at the line end (logical, Latin digits in both languages — measured mirrored in RTL); bottom strip of 16 label buttons (`aria-current`), `overflow-x: auto` + scroll-snap, scrollbar hidden visually, the active one centred by `scrollIntoView({ inline: "center" })`, a 2 px line above each that fills over the 6 s autoplay. Transition 700 ms (scene opacity + scale 1.04→1, text −8 px out / +8 px in with a 150 ms delay); the leaving slide clears on `transitionend`/`transitioncancel`, or at once when it never became visible or nothing transitions. Autoplay 6 s, paused on hover, on focus inside the region, and while under half the region is on screen (IntersectionObserver 0.5); a visible 44 px pause/play button at the inline START (the floating chat/WhatsApp buttons own the inline end in both directions — the first draft put it under them). Reduced motion or the STATIC tier: no autoplay, no button, 200 ms fade, progress line hidden. `←`/`→` (direction-aware), Home/End, a 40 px non-mouse swipe, the loop 16→01. Only the active slide is in the accessibility tree (`aria-hidden` + `inert` on the rest); `role="region"`, `aria-roledescription="carousel"`, label from the new root `industries.carousel.*` keys (EN/AR); a polite live region announces the name. Images are mounted for the active slide and its two neighbours only (`loading="lazy"` beyond the first, `fetchpriority="high"` on the active), so the rest never load until they are next in line.
- **Measured:** at open (top of the page, no scroll) 1440 fetches 01 + its neighbours 02 and 16 = **746 KB** (303 + 261 + 200 KB at their real sizes on the wire); 390 fetches **126 KB** (01-960 only — the lazy neighbours stay unfetched below the fold). Contrast on the lightest scene (07 Education, mean luminance 117/255), white title against the scrimmed background behind its box: 1440 → 11.0:1 vs the mean, **6.41:1 vs the lightest pixel**, 0 % of pixels under 4.5:1; 390 → after deepening the phone scrim (first draft: 3.39:1 on the lightest pixel, 9.4 % of pixels failing) 12.2:1 vs the mean, **6.73:1 vs the lightest pixel**, 0 % failing. Tagline at 1440: 5.29:1 vs the lightest pixel. Every title fits 390 px (all 16, EN).
- **CSS name clash, recorded (owner decision 6):** the homepage matrix block (`/* INDUSTRIES (Q-P5-3) */`, lines 1960–1993) and the `/industries` page block (`/* ---- INDUSTRIES ---- */`, ~2713) both defined `.industries-matrix` and `.industry-cell`; the later block won the cascade, so the homepage had been rendering with the page's card rules, not its own. The homepage block is deleted with its component; the page keeps its block; the slider's classes are namespaced `.industries-slider*`. Two identical selectors in one stylesheet must not happen again.
- **Messages:** `home.featuredMark` (EN + AR) lost its only consumer — kept, see D062-DEAD-MESSAGES.
- **Tests:** `tests/smoke/industries-slider.spec.ts` (8 tests): order 01→16 in the strip and counter; zero marks (`.industry-mark`, `[data-featured]`, `.industries-matrix`, the "Featured focus sector" text); a11y contract (region, 15 hidden + inert, live region, 44 px button); arrows, loop both ways, Home/End/arrow keys, no slide left in `leaving`; autoplay advances within 8 s, pauses on hover and on the button; reduced motion → no autoplay, no button, no line, 200 ms; RTL counter mirrored with Latin digits; active label inside the strip after 16 transitions; 390 titles within the screen and 08/09 gradient-only; first scene decoded, sixth not fetched, exactly three `<img>` in the DOM. Gates: `npm run check` (11), `npm run build`, `npm run test:smoke`.
- **Zero diff on the forbidden set:** `GalleryCarousel`, `GalleryLightbox`, `.rail-nav`, products, `MobileMenu`, `seo.ts`, `sitemap.ts`, `package.json`; no library added.

**D-073.** Owner directive "D-073 — تصحيحات سلايدر الصناعات" (2026-09-20): four corrections to the D-072 slider, confined to `IndustriesSlider.tsx`, its CSS block, its messages (none needed) and its tests.

- **Diagnosis (measured before):** the D-072 box height followed the viewport (`min(80vh, 720px)`), so `object-fit: cover` hid 11.2 % of the 16:9 scene at 1440×900, **54.9 %** at 1890×600 (top/bottom) and **60.8 %** at 390×844 (left/right). Autoplay also stopped on hover and on focus, so a click on a label or an arrow froze it.
- **(a) Whole scene, no crop:** the foreground is `object-fit: contain`, centred, bound by height or width; behind it `.industries-slide-backdrop` holds the same scene (the 960 px file) at `cover` with `blur(28px) saturate(1.2)`, `scale(1.12)` and a 45 % dim. Box height `clamp(420px, 56vw, 720px)` (`clamp(300px, 70vw, 480px)` at ≤ 640). Measured after: **0 % cropped** on all three — 1440×900 draws 1280×720 in a 1440×720 box (height-bound), 1890×600 draws 1280×720 in 1890×720 (height-bound; the box is taller than that viewport by design of the clamp), 390×844 draws 390×220 in 390×300 (width-bound). The backdrop costs one extra 960 px file per mounted slide on desktop (~100 KB, accepted by the owner; on phones it is the same file as the foreground).
- **(b) Autoplay:** 5000 ms; the progress line above the active label fills in 5000 ms and restarts with every change. Hover and focus no longer pause; it stops only for the visible button, the section leaving the viewport (IntersectionObserver 0.5), a hidden tab (`visibilitychange`, new) and reduced motion. A click on a label or an arrow moves with the full transition and restarts the timer from zero (the timer is keyed on the index).
- **(c) Cinematic change, 900 ms:** the leaving slide stays still underneath; the entering slide is revealed by `clip-path: circle(0%→75% at 50% 50%)` with `cubic-bezier(.7, 0, .3, 1)` while `filter: blur(12px→0)` and `transform: scale(1.06→1)` settle; a light orb (`28vmin`, radial pink→violet, `blur(24px)`, `mix-blend-mode: screen`, `pointer-events: none`, `aria-hidden`) crosses from the line end to the line start (mirrored keyframes in RTL) with opacity 0→1→0 peaking at 50 %; the text leaves in the first 250 ms (`opacity 1→0`, `translateY(0→−10px)`) and arrives from 450 to 900 ms. Animated properties are `clip-path`, `filter`, `transform`, `opacity` only; `will-change` is set through `data-entering` on the entering slide for the duration of the reveal and removed after (`will-change: auto` measured after). The idle state parks every slide at the reveal's start (`visibility: hidden`, circle 0 %, blur 12, scale 1.06) so the transition always has a before-change style; the leaving slide is released on the entering slide's `transitionend` / `transitioncancel`, or on the next frame when `getAnimations()` is empty (STATIC tier, or a step back to a slide still at its target) — no fixed timer. Reduced motion / STATIC: a 200 ms opacity fade, `clip-path: none`, `filter: none`, no orb, no progress line, no autoplay.
- **Dropped frames (caveat: headless Chromium, software rendering, no GPU — worse than a real device):** three reveals at 1440 measured with `requestAnimationFrame` over the 900 ms window: 38 / 41 / 41 frames of 54 expected, **25.9–33.3 % dropped**, longest gap 50–67 ms; an idle 900 ms window on the same page renders 56 frames. Under the owner's 40 % threshold, so the backdrop blur stays at 28 px; the owner judges on a real device.
- **Contrast on the lightest scene (07 Education), white text vs the background behind its box:** 1440 → title 10.7:1 vs the mean, **5.53:1 vs the lightest pixel**, tagline 5.34:1 (was 6.41 / 5.29 at D-072 — the blurred backdrop is a little lighter behind the title). 390 → the first D-073 draft fell to 3.58:1 on the lightest pixel (0.7 % of pixels failing) because the whole scene now sits behind the text; the phone scrim was deepened (pool 0.88, base 0.4) → **6.84:1** title, 6.83:1 tagline, 0 % failing.
- **(d) Slides 08 and 09:** unchanged — gradient, name, tagline; the reveal and the orb run over them like the rest.
- **Tests (`industries-slider.spec.ts`, now 11):** autoplay 5 s, keeps running under the pointer and with focus inside, a label click restarts without pausing, only the button pauses; the orb exists during the reveal and is gone after, `data-entering` and the leaving state clear, `will-change` back to auto, transition durations 0.9 s; reduced motion → no orb, `clip-path: none`, `filter: none`, ≤ 200 ms; 0 % crop on 1440×900 / 1890×600 / 390×844 with the box height per the clamp, backdrop `cover` + blur; the lazy test counts three foregrounds and three backdrops. Gates: `npm run check` (11), `npm run build`, `npm run test:smoke`. Zero diff outside the slider, its CSS block and its tests; `package.json` untouched.

**D-074.** Owner decision (2026-09-20): link `industry-08-stadiums` and `industry-09-sporting-events` as they are — transparent cut-outs (46 % alpha < 16), not scenes — **as a documented exception** to the D-072 rule; they are replaced the moment scene photographs arrive. 16 of 16 slides now carry a file.

- **Derivation (D-072 recipe, alpha preserved — no flattening on white):** originals moved by `git mv` to `media-source/images/industries/`; `industry-08-stadiums.webp` 1536×1024 (388 KB) + `-960.webp` 960×640 (179 KB); `industry-09-sporting-events.webp` 1536×1024 (342 KB) + `-960.webp` 960×640 (168 KB) — WebP q80, `alphaQuality: 100`, effort 6, transparency 46.1–46.8 % in every derivative, exactly the source. `industries.ts`: `image` + `imageWidth: 1536` on the two rows with an inline note. Foreground `contain` like the rest; the blurred backdrop is the cut-out itself over the dark gradient (the transparent area shows the gradient through it).
- **Contrast (white text vs the background behind its box):** before any change, 1440 → slide 08 title **3.90:1** on the lightest pixel (0.2 % of pixels failing), tagline 4.11:1; slide 09 title 4.83:1, tagline 4.89:1 — under or at the limit, as the owner anticipated. The scrim was deepened **for these two slides only**, keyed on their stable ids (`data-id` on the slide; `.industries-slide[data-id="stadiums-sports-cities"]`, `…"major-sporting-events"`) in two media ranges — ≥ 641 px: pool 0.82 / base 0.34; ≤ 640 px: pool 0.92 / base 0.45 (a first draft without the media scope overrode the phone scrim and dropped the 390 tagline to 4.06:1). After: 1440 → 08 title **7.56:1**, tagline 7.43:1; 09 title 9.01:1, tagline 8.75:1; 390 → 08 title 10.9:1, tagline 7.99:1; 09 title 11.6–11.8:1, tagline 8.39:1; 0 % of pixels under 4.5:1 in five of six 390 samples — one sample of slide 09's tagline showed 0.34 % of its pixels at ~1.0 luminance (brighter than the text), not reproduced in four further runs with the custom cursor hidden; recorded, not explained.
- **Tests:** the 390 test now expects no `data-empty` slide and a foreground `<img>` with alpha on 08 and 09. Gates: `npm run check` (11), `npm run build`, `npm run test:smoke`. Files: `industries.ts`, `IndustriesSlider.tsx` (the `data-id` attribute), the slider CSS block, the slider spec, the four derivatives, the two archived originals. `industries-intake/` is empty.

**D-075.** Owner directive "D-075 — قسم المشاريع: أكورديون أفقي" (2026-09-20), six pre-check decisions. The homepage Selected Projects section becomes a horizontal accordion of the owner's five projects; the D-050 §12 cinematic moments and their CSS (`.project-moment*`, `moment-rise`) are removed. The `SectionSeam` before and the gallery after are untouched.

- **Data:** new `homeOrder?: number` on `Project` (1 Grand Mosque — Makkah, 2 Diriyah Season, 3 Red Sea Film Festival, 4 NEOM Sports Village, 5 RCU Outdoor Entertainment — AlUla) — independent of `featured`, which keeps its three consumers untouched (the /projects "Featured" chapter, the detail page's chapter label, the D-050 §12 unit assertion). No project text changed. Validator: exactly `1..5` once each, none hidden. `getHomeProjects()` added.
- **P9 rule extended (owner decision):** `projectHasDetail` is now `featured || homeOrder !== undefined || (years && scope)` — "a project the owner shows on the homepage deserves a page". Effect: `/projects/rcu-outdoor-entertainment-alula`, a 404 before in both locales, is generated by `generateStaticParams` (`.next/server/app/{en,ar}/projects/rcu-outdoor-entertainment-alula.html` present) and answers 200; `routes.spec.ts` now visits it. The unit test pins the five in order and asserts each has a detail route.
- **Images:** none of the five carries `media` (no project has any; `public/media/projects/` does not exist and was not created). All five panels render the designed no-image ground — dark gradient (#16181f → #0d0e13 → #06060a) + an inline SVG dot grid at opacity .08 + the larger title `clamp(28px, 3.6vw, 52px)` — and switch to the photograph the day one `media` entry is added. The panels commit to a dark ground in both themes (white text), the same rule the D-050 photo moments used.
- **Desktop (> 900 px):** `ul.projects-accordion` (`role="list"` kept explicitly against WebKit's `list-style: none` semantics loss), five `li.pa-panel` each wrapped by one `Link` to `/projects/[slug]` (`aria-current="true"` on the active, accessible name = the full title), row height `clamp(420px, 52vw, 640px)`, gap 12 px, radius 16 px, a 1 px 8 % white edge (added after the dark-theme screenshot showed the inactive panels melting into the canvas). Active `flex-grow: 4`, others 1, `transition: flex-grow 700ms cubic-bezier(.25, 1, .5, 1)`; the image (when one exists) `cover` at `scale(1.1)` settling to 1 in 1000 ms; the fade is an opacity layer (`.pa-dim`), never `filter`. Active content (sector tag from `industries.ts` through `sectorIds[0]`, title `clamp(24px, 3vw, 44px)` 700 white, location · years line at 80 % — only what exists, so Red Sea shows tag and title alone and no panel shows a year, "Explore Project ↗" with an inline SVG, counter `01 / 05` at the top inline-end) enters after 200 ms rising 12 px. Inactive panels show the title vertically (`writing-mode: vertical-rl`, 14 px, white, at the foot) fading out on activation. Hover or focus activates; ← → step logically (mirrored in RTL) and move focus; Home/End jump; a click on an inactive panel only activates it (`preventDefault`, second click navigates), a click on the active one navigates. No autoplay.
- **RTL:** the row is a logical flex row, so panel 1 sits at the right (x 1266 vs 24 for panel 5) and grows toward the left. The Arabic spine under `vertical-rl` renders the line rotated 90° clockwise with upright-rotated glyphs (`text-orientation: mixed`) reading bottom-to-top — the geometric rotation of an RTL line, not a flip — so `vertical-lr` was not needed; recorded with the spine screenshot.
- **Phones (≤ 900 px):** CSS only — the same markup becomes a snap-scrolled row (`overflow-x: auto`, `scroll-snap-type: x mandatory`, scrollbar hidden), cards `84vw` wide at 4 : 5, content always visible over the bottom dim, no spine, no activation step (the click handler checks `min-width: 901px`), a tap navigates.
- **Reduced motion / STATIC tier:** the accordion's own transitions and the scale are off; the site's global STATIC clamp (`transition-duration: 200ms !important` on every element) still applies, so the switch is a 200 ms flex change, not 700.
- **Measured (1440×900, at rest):** computed `flex-grow` 4 / 1 / 1 / 1 / 1 → widths 640 / 160 / 160 / 160 / 160 px, row height 632 px; `transition-property: flex-grow`, `0.7s`, `cubic-bezier(0.25, 1, 0.5, 1)`; content delay 0.2 s; mid-transition at ≈ 280 ms after hovering panel 3: 178 / 160 / 622 (the ease-out is front-loaded), settled 160 / 160 / 640. Contrast on the designed ground (there is no image; the gradient's top is the lightest area): title 18.6:1, tag 18.2:1, meta 15.8:1, spine 18.8:1 on the lightest pixel. The designed panel is not empty: gradient + dot grid (`opacity .08`, present in the DOM) + the 51.8 px title.
- **Tests:** `tests/smoke/projects-accordion.spec.ts` (5 tests): order, hrefs, accessible names, tags = sector names, first active 4/1/1/1/1, counter, five designed grounds and no `<img>`, no meta line for Red Sea, 700 ms flex-grow, the "View all projects" link; hover / arrows / Home / End with focus following; the inactive click (a bare click event — a mouse click is preceded by hover, which already activates) stays on the page, the active click reaches `/projects/diriyah-season`; RTL first-panel position, tag in Arabic, spine `vertical-rl` and taller than wide, ← moves to the logical next; 390 snap row, hidden scrollbar, 4 : 5, ≥ 80 % width, direct navigation; reduced motion ≤ 200 ms, no scale, immediate switch. `routes.spec.ts` gains the AlUla route. Gates: `npm run check` (12 unit), `npm run build`, `npm run test:smoke`.
- **Zero diff on the forbidden set:** Industries slider, gallery, products, `MobileMenu`, `seo.ts`, `sitemap.ts`, the `/projects` pages, `package.json`. Messages: the existing `home.selectedProjects.exploreProject` / `.allProjects` keys, none added.

**D-076.** Owner directive "D-076 — حذف العدّادات + إصلاح عدم التطابق في الترطيب" (2026-09-21), five decisions after the pre-check.

- **The motion-tier rule, verbatim (pre-check item 3, unchanged by decision):** the pre-paint bootstrap in `ThemeAndTierScript.tsx` decides — `static` when `prefers-reduced-motion: reduce` matches OR `navigator.connection.saveData === true`; otherwise `lite` when `(max-width: 767px)` matches; otherwise `full`. Nothing else can drop a device to `static`. Best guess for the user's device at `static`: the OS "reduce motion" setting (Windows › Accessibility › Visual effects › Animation effects off; macOS Reduce motion; Android Remove animations) — or Chrome's data saver. The values to check in the user's console: `matchMedia("(prefers-reduced-motion: reduce)").matches`, `navigator.connection && navigator.connection.saveData`, `document.documentElement.dataset.motionTier`.
- **Dead rule → debt D076-DEAD-TIER-RULE:** `resolveMotionTier()` in `src/lib/motion/capability.ts` also demotes to `lite` on `deviceMemory ≤ 4` or `hardwareConcurrency ≤ 4`, but `currentMotionTier()` adopts the bootstrap's attribute whenever it is present, so those two signals never run. Kept, not deleted (owner decision).
- **The hydration mismatch, reproduced:** React reports attribute mismatches only in development builds — the production smoke suite showed 0 before and after — so it was reproduced on `next dev` (through `localhost`; `127.0.0.1` is refused by the dev server with 403s and the page never hydrates). One warning per load in both settings: under `reduce`, the DOM carried `data-header-env="dark"` that the JSX lacks; under `no-preference`, `data-motion-tier` (`static` in JSX, `full` in the DOM), `data-header-env` and `data-opening="pending"`. All are attributes the bootstrap writes on `<html>` before React compares them — intended pre-paint state, not a bug. `data-header-env` is NOT deleted by the script: the `-` line in React's diff is the DOM value the server JSX never had (the pre-check's reading was reversed).
- **Fix:** `suppressHydrationWarning` on `<html>` in `layout.tsx` — one attribute, that node only, nothing else suppressed. **Guard:** `npm run check:hydration` (`scripts/check-hydration.mjs`) starts `next dev` on a temporary port, loads `/en/` and `/ar/` under `reduce` and `no-preference`, waits for hydration (`data-scrolled` appears only after React runs), counts console messages mentioning hydration, stops the server and fails on any. **Before the fix: 4 loads → 4 messages (1 each). After: 4 loads → 0.** It runs on the dev build on purpose and is not part of `test:smoke`. `next dev` writes `AGENTS.md` and `CLAUDE.md` on every start (Next 16 agent rules) — tool residue, now in `.gitignore` (owner decision 4).
- **Counters removed:** the Industries slide's visible `01` / `16` (`.industries-slider-counter*`, JSX + CSS + RTL rule) and the projects panel's `02 / 05` (`.pa-counter`, JSX + CSS in three rules). The slide's accessible label (`aria-label="01 / 16"`) and the polite live region stay. No message key involved. Tests: every counter assertion now reads the active slide's `data-slide`; the RTL test that measured the counter's mirroring now measures the pause button and the arrows (pause at the line start = right, "previous" toward the right, "next" toward the left, mirrored glyph) and that ← moves to the logical next; the accordion test asserts the counter is gone.
- **Files:** `layout.tsx` (one attribute) · `IndustriesSlider.tsx` · `ProjectsAccordion.tsx` · the two CSS blocks · the two specs · `scripts/check-hydration.mjs` (new) · `package.json` (the `check:hydration` script line, asked for) · `.gitignore` (two lines). Gates: `npm run check`, `npm run build`, `npm run test:smoke`, `npm run check:hydration`.

**D-077.** Owner directive "D-077 — ثلاث صور جديدة للمعرض" (2026-09-21), intake `267d47c`; owner decisions on the pre-check: Al Nassr is NOT a client (the event was held at their venue — the venue is named, never the club), `category: events-venues` for the press room and `infrastructure-networks` for the two office photographs, no `projectId` (the only ledger record at that venue, `al-awal-park-king-fahd`, is a 2022–2025 venue fit-out — linking would imply the event was part of it, which is unconfirmed), `order` 1..3 on the existing published records and 4..6 on the new (data only), `object-position` through an optional field and one line in the carousel only if the crop cuts the subject.

- **Files:** `3.jpeg` renamed `smc-office-ladder-install.jpg`; the three originals moved by `git mv` to `media-source/images/gallery/` (new folder; the older `fiber-splicing-riyadh-2025.png` stays in `media-source/images/` by decision). Measured: all three portrait JPEGs with **no EXIF, ICC or XMP at all** (no orientation tag, no GPS) — stripped before delivery. Derivatives, metadata never written (sharp writes none unless asked), verified by RIFF chunk scan: `al-nassr-press-room.webp` 960×1280 183 KB + `-800` 600×800 82 KB; `smc-office-ceiling-install.webp` 720×1280 70 KB + `-800` 450×800 34 KB; `smc-office-ladder-install.webp` 1200×1600 162 KB + `-800` 600×800 63 KB — WebP q82, long edge ≤ 1600 without enlargement (the originals are 1280–1600). Originals 526 KB → full-size derivatives 415 KB (+ 179 KB of card files).
- **Model:** `GalleryItem.thumb?` (the card's smaller file; the lightbox keeps `src`) and `GalleryItem.focus?` (`object-position` for the card's cover crop). **One line in `GalleryCarousel.tsx`** (the card `<img>`): `src={item.thumb ?? item.src}` and `style={{ objectPosition: item.focus }}` — the authorised exception; without `thumb` the 800 px file would have been dead. `GalleryLightbox.tsx` untouched.
- **Records:** `image-al-nassr-press-room` (alt/caption EN "Event AV and network setup — press room, Alawwal Park, Riyadh" / AR "تجهيز صوتي ومرئي وشبكي لفعالية — قاعة المؤتمرات، ملعب الأول بارك، الرياض"), `image-smc-office-ceiling-install`, `image-smc-office-ladder-install` — owner text verbatim, `caption = alt`, `location Riyadh`, `year 2026`, `published: true`, `order` 4–6. The three existing published records take `order` 1–3 (`getPublishedGalleryItems` sorts absent `order` last, so the new ones would otherwise have jumped ahead).
- **Card crop (square 300 px card, `cover`), measured:** press room 3:4 → 25 % hidden, 12.5 % top / 12.5 % bottom with the default centre — the technician and the wall stay whole, no `focus`. Ceiling install 9:16 → 43.8 % hidden; the centre crop cut the technician's head, so `focus: "50% 20%"` → 8.8 % top / 35 % bottom. Ladder install 3:4 → 25 % hidden; the centre crop cut the head of the technician on the ladder, so `focus: "50% 0%"` → 0 % top / 25 % bottom. `object-position` reaches the card image (computed "50% 20%" / "50% 0%"; the press room stays "50% 50%").
- **Ring, measured at 1440:** six items → `limit = floor((6−1)/2) = 2`: positions −2 … +2 on screen (x 250 → 1191, widths 209 / 246 / 300 / 246 / 209), the opposite item at `hidden` (opacity 0). At 390 the same five carry widths 196 / 230 / 281. The lightbox on the press room: 960×1280 shown 555×740 at the exact centre (Δ 0 / 0), `data-orientation="portrait"` (D-070 rule), caption present.
- **Validator:** `thumb` must exist when published; a published photograph's `src` and `thumb` must be WebP with no `EXIF`, `ICCP` or `XMP ` RIFF chunk (checked programmatically) — with the existing category / project / path / Arabic checks.
- **Tests (`gallery-carousel.spec.ts`):** six cards, ±1 and ±2 present, one hidden, the loop closes after six presses; the "step to a video" helpers walk the full ring; new: the three photographs sit after the starter set with their 800 px files, five cards inside the 1440 viewport and the hidden one at opacity 0, the focus values on the right images, the lightbox opens the 1600 file as a portrait with the Alawwal Park caption. Two assertions on the carousel region's label are now scoped to `#gallery` — the page has carried two `aria-roledescription="carousel"` regions since D-072, and the unscoped locator matched both. Gates: `npm run check` (12), `npm run build`, `npm run test:smoke`.
- **Zero diff on the forbidden set** beyond the one authorised line: `GalleryLightbox.tsx`, Industries, Projects, products, `seo.ts`, `sitemap.ts`, `package.json` untouched. Naming: first committed under the intake name `al-nassr-press-room`; renamed the same day on the owner's instruction to `alawwal-park-press-room` (original, both derivatives, record id `image-alawwal-park-press-room`) so the file name matches the public text, which names the venue only.

**D-078.** Owner directive "D-078 — العملاء: حذف 7، إضافة 3، شفافية وتوحيد لون وحجم الشعارات الـ64" (2026-09-21), logo intake `392a79f` (`riyadh-season.png`, `diriyah-season.png`); owner decisions on the pre-check: "RPM" matched no record and is dropped from the deletion list (six deleted, not seven; 27 − 6 + 3 = 24); D-057 PART 1 is re-run on the final set and its output replaces `public/media/logos/` directly, the `logos-transparent` staging folder deleted after linking; marks whose ground is part of the design are neither stripped nor excluded but carry `originalColor: true` and render unfiltered; `diriyah-season` stays as a client id alongside the project id (separate collections); the D-033 "never recolored" comment in `LogoMotion` is superseded with the exceptions named; count tests created.

- **D-057 status, recorded here for the first time.** No D-057 section existed in this log (only commit `e41de47`). PART 1 — `scripts/logo-transparency.ts` (flood fill from the border through near-white only, feather band un-premultiplied against white, extraction-dust sweep, trim to the ink box) — had written 68 files to a staging folder that nothing linked; the site kept serving the opaque extractions. D-078 approves the method, points the script at `public/media/logos/` and closes PART 1, PART 2 (colour) and PART 3 (size). The staging folder is gone (`git rm`), and a unit test asserts it stays gone.
- **(أ) Deleted — six client records with their delivery WebPs and source PNGs:** `buildup` · `black-orange` · `time` · `balich-wonder-studio` · `pfl-mena` · `hqws`. No page, project or message referenced any of them (`pfl-venues` in `projects.ts` is a project record, not a client link, and is untouched). **RPM:** the pre-check found no record by that name. After derivation the contact sheet shows that the `response-plus` mark reads "RESPONSE PLUS MEDICAL COMPLEX — RPM" (its own monogram). Per the owner's rule ("إن حدّد المستخدم لاحقًا أي سجل يقصد بـ RPM، متابعة بسطر") the record is KEPT and the observation is filed as D078-RPM; nothing was deleted on an inference.
- **(ب) Added — three season brands** at `order` 26–28 with bilingual names supplied by the owner: `riyadh-season` (Riyadh Season / موسم الرياض, `quality: "approved"` — owner cut-out), `jeddah-season` (Jeddah Season / موسم جدة, **no logo**, `// pending logo` — the rails skip it because `TrustSections`/the clients page already filter on `src`, while the complete name index on `/clients` lists it), `diriyah-season` (Diriyah Season / موسم الدرعية, `quality: "approved"`). `diriyah-season` is deliberately both a client id and a project id: `checkUnique` is per collection and no code joins the two; a unit test documents the overlap. Roster: **24 clients, 23 with a logo; 41 alliances; 64 logo files.**
- **(ج) Transparency — 64 files derived from the 64 sources in one run** (`media-source/brand/{clients 23, alliances 41}` → `public/media/logos/…`, WebP q92, `alphaQuality: 100`, trimmed to the ink box, height capped at 300 px with `withoutEnlargement` — only `riyadh-season` was affected, 567×798 → 213×300). Mean background removed 66.8 %; interior holes 0 across the set (the script now pre-marks a source's own transparent pixels as background and keeps them out of the feather band, so an owner cut-out's antialiased edge is never un-premultiplied). Real-alpha audit (programmatic, every file): 61 files carry an alpha channel with 19–79 % fully transparent pixels; the three **SOLID-GROUND** files have ~0 % transparency inside their ink box because the box IS the mark — `lenovo` (red box), `hopscotch` (black square), `moments-international` (black band). These three carry `originalColor: true` and render with `filter: none`, always; `hopscotch` is additionally delivered without an alpha plane (the encoder drops a fully opaque one). Total delivery bytes 539 KB for 64 files (was 428 KB for 68 opaque files; the difference is alpha and the larger owner cut-out). **D-053 note:** this is the one in-place rewrite of delivery paths authorised by the owner in the directive; every one of the 64 paths now serves different bytes than before under the same URL, so a cached opaque variant may survive until its TTL expires.
- **(ج) Colour — `filter` on the `<img>`, not `mask-image`.** At rest `.logo-rail { --rail-mark-filter: brightness(0) invert(1) }` (white) and `[data-theme="light"] .logo-rail { --rail-mark-filter: brightness(0) }` (black); `.rail-plate img { filter: var(--rail-mark-filter); transition: filter 200ms }`. Why filter: the real `<img>` stays in the DOM (same request, same `alt`, same `loading="lazy"`, same decode path the smoke suite already checks), the theme switch is one custom property, and the original colours are one declaration away — `.rail-cell:hover .rail-plate img, .rail-viewport:focus-visible .rail-plate img { filter: none }`. A mask would have needed a second element per mark carrying `mask-image: url(…)` plus the hidden `<img>` for hover, and the mask cannot be "turned off" to show the original without swapping elements. `:focus-visible` is on the rail region because nothing inside a cell is focusable (D-056 keeps the strip a single named keyboard target that also pauses the flow) — keyboard focus therefore restores the colours of every mark in the rail at once. Under `prefers-reduced-motion: reduce` and the STATIC tier the transition is `none` (the tier's global 200 ms clamp is moot on `transition-property: none`). The D-033 header comment in `LogoMotion.tsx` and the `TrustSections.tsx` note are rewritten to say so.
- **(د) Size by ink — one rule for both rails:** `.rail-plate img { block-size: clamp(28px, 2.4vw, 40px); inline-size: auto; max-inline-size: 180px; object-fit: contain }`. Because every delivery file is trimmed to its ink box, the box height is the ink height, so the clamp alone equalises the 64 marks; the 180 px cap binds only where ratio × height > 180 (at 40 px that is every mark wider than 4.5:1 — the owner's "> 4:1" set; a 4:1 mark is 160 px at full height and is never capped). The client rail's separate 2.1 rem/8.5 rem and the two mobile `max-block-size` overrides are removed (the clamp already yields 28 px at 390); the cell heights (4 rem / 3.6 rem / mobile 3.2 rem / 3 rem) and `.rail-nav` are untouched. **Measured ink height, 64 marks:** BEFORE (opaque files under the old `max-block-size` rules, ink box scaled by contain): mean 26.4 px, σ 3.9 px = **14.9 %**, range 16–32 (the wide alliance marks and the smaller client rule pulled it apart). AFTER at 1440: mean 32.6 px, σ 3.8 px = **11.6 %**, range 20.8–34.5 (the residual spread is entirely the seven marks wider than 6:1 — `dallmeier`, `unifi`, `fortinet`, `hikvision`, `hanwha`, `grandstream`, `westcon-comstor` — held to the 180 px cap; every mark ≤ 4:1 sits at exactly 34.5 px). AFTER at 390: mean 27.5 px, σ 1.6 px = **5.9 %**, range 20.8–28. Both under the 15 % gate; the smoke test attaches the per-mark table on every run. `hopscotch` (149×150 source) draws at 34.5 px = 0.23× its pixels — not soft at 1× or 2× DPR.
- **Observation (not acted on):** 24 of the 64 marks are DARK-INK (mean ink luminance < 95 — `zebra` 41, `sela` 41, `hwadi` 31, `hopscotch` 37, `sony` 66, `dahua` 66, `hpe` 75 …). At rest the white filter makes them legible on the dark theme; on hover their ORIGINAL colours return, which is the directive, and a black wordmark on the dark canvas is then barely visible (screenshot `hover-hpe-1440`: the green E shows, the black HP does not). The two `originalColor` black marks (`hopscotch`, `moments-international`) sit in that state permanently on the dark theme. Filed as D078-HOVER-DARK-INK for the owner.
- **Validator:** clients and partners now fail on a declared logo whose file is missing, and on `originalColor` without a logo; a record with no logo is accepted (pending mark). **Tests:** `tests/unit/logos.test.ts` (7: 24 clients with the six absent and the three present · 41 alliances · season names EN/AR and Jeddah without a logo · the diriyah-season overlap · `originalColor` on exactly the three · 64 files present, 23 under clients, real alpha on the 61 and solid on the 3, height ≤ 300 · no staging folder) and `tests/smoke/logo-rails.spec.ts` (5 × 2 projects: EN/AR 23 + 41 cells, no `jeddah-season` cell, riyadh/diriyah present, the six absent, every `<img>` decodes with `naturalWidth > 0` · computed `filter` white on dark / black on light / `none` on the three exceptions, original on the hovered mark only with a 0.2 s duration and the flow paused, the neighbour still filtered · no transition under reduced motion · one ink height with σ/mean < 15 % and width ≤ 180 px). Gates: `npm run check` green (20 unit tests), `npm run build` green, `npm run test:smoke` 193 passed / 33 skipped (project-scoped). Zero diff outside the scope: `.rail-nav`, the D-056 motion (`rail-flow`, durations, direction, edge fade, pause), products, gallery, industries, projects, `seo.ts`, `sitemap.ts`, `package.json` untouched.

**D-078 follow-up** (owner 2026-09-22, separate commit). (1) D078-RPM closed: `response-plus` stays, 24 clients final. (2) D078-HOVER-DARK-INK, option أ: `.rail-plate::before` is a light plate — `inset: -6px -10px` around the mark (the plate box now hugs the `<img>`; the cell still centres it, nothing moves), `border-radius: 8px`, `rgba(250,250,248,.92)`, `opacity: 0` at rest with `transition: opacity 200ms`, `opacity: 1` under `html[data-theme="dark"] .rail-cell:hover` and `html[data-theme="dark"] .rail-viewport:focus-visible` — the same triggers and the same 200 ms as the colour return, so the plate and the original colours arrive together. The light theme has no rule, so no plate; the `originalColor` exceptions are not excluded, so `hopscotch` and `moments-international` (black on dark) get the plate on hover. Under `prefers-reduced-motion: reduce` and the STATIC tier the plate's transition is `none`. The `<img>` is `position: relative` so it paints above the pseudo-element. Measured from the rendered screenshot at 1440 (dark theme, HPE hovered): plate pixel vs the darkest pixel of the "HP" letters — plate rgb(230,230,229) vs ink rgb(5,5,6) = **16.3:1** (gate ≥ 4.5:1). Tests added to `logo-rails.spec.ts`: plate opacity 1 on the hovered cell and 0 on its neighbour, the plate's colour/radius/inset/duration, no plate on the light theme under the same hover, plate down when the pointer leaves, no plate on any mark at rest, `transition-property: none` under reduced motion. Gates: `npm run check` green (20 unit tests), `npm run build` green, `npm run test:smoke` 195 passed / 33 skipped (+2 from the plate tests).

**D-079.** Owner directive "D-079 — الانتقالات السينمائية: تكديس ثلاثة مشاهد + كشف قابل للانعكاس" (2026-09-23), reference prototype v2 (artifact 51tZ6CNSwRRNVifVg6tscs); governing principle: every movement is tied to the scroll position, never to the moment of appearance — down advances it, up returns it exactly. Owner decisions on the pre-check: (2) option أ — two ADJACENT stacks without re-ordering the page: About rises over the sticky Hero, Selected Projects rises over the sticky Industries; `id="projects"` added (SelectedProjects + HashArrival); (3) one conversion of `MotionSection` site-wide — rise/mask/trace driven by `--t` as they look, converge by `--t` WITHOUT blur ending at literal `transform: none`, sweep retired to mask, `.is-visible` kept with hysteresis (on > 0.6, off < 0.3), SectionSeam moved onto the same engine, the orphaned ProductCatalog untouched; (4) the engine never runs before the opening releases and writes a transform on the hero only while cover > 0; the hero field stops at cover > 0.5; (5) the header environment and the 42 % nav probe ignore a scene at cover ≥ 0.5; (6) the gallery is not stacked — its pause clause is dropped — and the Industries autoplay gets `cover ≤ 0.5` through an engine-written attribute; (8) the static top of a sticky section is computed explicitly and `arriveAt` uses it instead of `scrollIntoView`.

- **Engine** — `src/lib/motion/scroll-engine.ts`: one passive `scroll` listener → one `requestAnimationFrame` → CSS custom properties and state attributes only (no React state per frame, no layout read per frame). Document positions are measured once per layout change (resize, a `ResizeObserver` on `<body>`, registration, the opening's release) through `offsetTop` chains, which ignore transforms; sticky scenes are measured under `html.sc-measure`, which turns their stickiness off for the read without moving the flow. Per frame the work is arithmetic on `scrollY`, so every value is a pure function of the scroll position. Animated properties: `transform` · `opacity` · `border-radius` (the riser's top corners) · `clip-path` (the title wipe and the mask variant) — no `filter`, no `top`/`height`. No library, no `animation-timeline`.
- **Reveal (`--t`)** — starts when a section's top is 92 % down the viewport and completes at 45 %, eased in-out cubic (the delay is the 8 % before the start); a section that can never reach the 45 % line finishes at the last reachable scroll position. `data-rs` = `0` | `p` | `1`; every transform rule is scoped to `:not([data-rs="1"])`, so a revealed section's computed transform is literally `none`. Inside every variant the section title (`.section-title`, added to `SectionHeading` and the Let's Talk heading) wipes in with `clip-path` from the start of the line (mirrored in RTL, ±0.4 em margins so Arabic marks are never cut at t = 1), and `.section-lead` (Clients reach line, Let's Talk lede) rises 18 px → 0 with opacity. The title box is `inline-size: fit-content` inside a reveal section so a short title's wipe does not run across empty width (the text position is unchanged).
- **D075-RESIDUAL-TRANSFORM — closed.** Cause, recorded under this name: `.reveal[data-reveal="converge"]` (scale(0.988) translateY(10px) + blur(6px)) had the same specificity as `.reveal.is-visible` and came later in the file, and the converge "visible" rule reset only `filter` — so Selected Projects (and every converge section on inner pages) kept `scale(0.988) translateY(10px)` forever, which is also why its measured box read 949 px in the D-079 pre-check: its real height is 961 px. Converge is now `scale(.988 → 1) translateY(10px → 0)` on `--t`, no blur, and ends at `transform: none` (smoke-tested on all 8 homepage sections and audited on all 23 reveal sections of 9 English inner routes plus /ar/company — zero exceptions).
- **Stacks** — `SceneStack` (client) wraps each pair; the wrapper is the sticky scene's containing block, so the stuck scene is released — already fully covered — when its pair ends and never lingers under the rest of the page. FULL tier and ≥ 768 px only (the engine sets `data-stack-on` after measuring). The stuck scene: `position: sticky; top: var(--stick-top)` with `--stick-top = min(0, innerHeight − height)` measured, so a scene taller than the screen sticks when its BOTTOM edge reaches the viewport bottom. While cover > 0 (`data-cover-active`): `scale(1 − .07·cover)` from the top, `translateY(−2vh·cover)`, a black `.scene-veil` at `.72·cover`, and on the hero `.hero-content` rises 70 px and fades by `.6·cover` while the photograph/backdrop rises 60 px. At cover 0 no rule applies — the computed transform is `none`, so the hero's fixed opening stage is never re-parented. The riser: opaque `var(--bg)`, top corners `32px·(1 − enter)`, and a `.scene-edge` (a fading 96 px shadow above its top edge carrying a 1 px magenta line) at `1 − enter`. `data-covered` at cover ≥ 0.5; `data-cover-full` at cover = 1 hides the stuck scene (`visibility: hidden`) — added for performance, it is entirely under the riser at that point.
- **Zero clipping, measured** (smoke test, three viewports): at its static top each stuck scene starts at the viewport top with nothing overflowing the box its transform follows; at the instant its cover begins its bottom edge sits on the viewport bottom (±1 px). Industries at 1440×900 sticks at −30 px, at 1366×768 at −162 px, at 1920×1080 at 0 (930 px < 1080 px — there it sits whole on screen while the riser has just begun: cover 0.0107 at its own top). The hero already clips its cover-cropped photograph to its own box (`overflow: hidden`, D-041); nothing else is clipped.
- **Deviation — the covered scene's bottom corners (`24px·cover`) are NOT drawn.** Implemented first as an animated rounded `clip-path`, it re-rasterised the whole scene every frame: dropped frames 52 % → 26 % when removed (a constant 24 px clip measured the same 26 %, so the animated radius was the cost). Measured over 99 positions per transition at three viewports: the receding scene's bottom edge is always under the riser except at 1920×1080 in the first 13 % of the Industries cover, where the formula gives ≤ 0.21 px. Removing it is visually identical to the formula at every position.
- **Conflicts fixed, not worked around.** (a) Opening: the engine writes nothing while `html[data-opening]` is pending/running/revealing; the two `main > *:not(.hero-scene)` rules (the opening hold-back and the first-child header padding) now account for `.scene-stack`. (b) Header: `ScrollState` and the `HeaderNav` 42 % probe skip `[data-covered]` and recompute on the engine's `sc:covered` event; measured: `dark` at hero cover ≈ 0.12, `surface` at 0.5 and back to `dark` on the way up; Industries covered mid-transition → `surface` and no active Industries link. Geometric note: at cover exactly 0.5 the header band still lies over the (darkened) hero; the owner's rule makes it `surface` from that point. (c) Autoplay: the slider's `autoplay` gains `&& !covered` from a MutationObserver on the section's `data-covered` (the only change inside `IndustriesSlider`); `running` at cover ≈ 0.1, `paused` at ≈ 0.8, `running` again on the way back. The hero field stops the same way (`OpeningExperience`). (d) Anchors: `arriveAt` scrolls to the engine's static top; `/#industries`, `/#projects` and `/#gallery` arrive at top ±2 px with `data-rs="1"`, Projects `--enter = 1`, Industries cover < 0.05.
- **Found during verification — focus behind the riser.** The Industries tab strip sits on the bottom edge of the stuck scene, exactly where Selected Projects enters first. The existing slider smoke tests failed 3 in 12 runs: Playwright's auto-scroll overshot the stick point and the riser intercepted the click. The same geometry would hide a keyboard-focused tab behind the next chapter (WCAG 2.4.11). Fix in the engine: `focusin` inside a stuck scene scrolls back to where its cover is 0 (the riser's top on the viewport bottom); smoke-tested — focus a tab at cover ≈ 0.65 → cover 0, the tab in view and topmost at its centre. The slider spec's setup now places Industries at that stick point (bottom edge on the viewport bottom — the whole slider on screen, cover 0) and clicks a label the way a visitor reaches it: scrolled into view inside the strip, never by page scroll, with the sticky scene re-placed from its static top first (a stuck element answers `scrollIntoView` with its stuck position). Only the test's positioning changed — every slider assertion is as before; the spec then passed 10/10 and 4 × 16/16 in repeat runs.
- **Side index** — `SceneIndex`: ten dots (hero · about · track record · solutions · industries · projects · gallery · partners · clients · contact) at the inline end, mid-height, `aria-hidden`; the active one is a 26 px magenta bar, switched instantly (a height transition would animate `height`, which the directive excludes; only its colour fades). Hidden below 880 px and in the STATIC tier.
- **Tiers** — FULL: everything. LITE (≤ 767 px): no stack, no sticky element in `<main>` (smoke-tested), reversible reveal only. STATIC / reduced motion: nothing registers — no `--t`, `--cover`, `--enter`, `--stick-top` or `data-rs` anywhere, no `.reveal`, no sticky element, no index (smoke-tested).
- **Dropped frames** (headless Chromium, software rasterisation — no GPU in the build container; 1440×900; full homepage wheel scroll down then up in 80 px steps, rAF deltas, 3 runs each; the baseline is commit `c971123` built in a temporary worktree and measured with the identical script): **before D-079 11.4–13.3 % (p95 33 ms) · after D-079 24.4–24.9 % (p95 50 ms)**. Main-thread task time over the two transition bands is at or below the baseline (style recalc roughly doubles, script and layout do not); the remainder is compositing of the full-viewport scaled layer and its veil in software. Promoting both to layers only while a cover runs was measured to help (33 % → 26 %); pausing the covered scene's own animations was measured not to. Real-GPU numbers are not measured here.
- **Scope** — `sweep` → `mask` on the homepage gallery, /projects/[slug] project media, /solutions/[slug] vendors, /company clients. Tests: `tests/smoke/scroll-scenes.spec.ts` (15 across both projects — reversibility ±0.01 on both transitions, zero clip at 1440×900 · 1366×768 · 1920×1080, header at mid-transition, focus recovery, autoplay at cover > 0.5, transform `none` after reveal, the index, the three anchors, LITE, STATIC). Gates: `npm run check` green (20), `npm run build` green, `npm run check:hydration` 0 mismatches (EN/AR × reduce/no-preference), `npm run test:smoke` 210 passed / 48 skipped / 0 failed on two consecutive full runs (195 before D-079 + 15 new). Zero diff on `GalleryCarousel`, `ProjectsAccordion`, `MobileMenu`, the products components, `.rail-nav`, `seo.ts`, `sitemap.ts`, `package.json`.

**D-081.** Owner directive "D-081 — ثلاث مهام: العربية الكاملة · الخريطة · من نحن" (2026-10-22), one commit per task in this order. Pre-check: 74 pages scanned (37 per language) — 244 distinct Latin strings on the Arabic pages, 3 Arabic strings on the English pages (the switcher and the counterpart echo); the map has 8 routed cities + Riyadh and four counters; the About copy under the photograph is the caption and the four-capability row. Owner decisions: the work stays on `claude/smart-channels-2026-discovery-y2albk`; "Smart Channels" and technical acronyms stay Latin on an allow-list with `lang="en"`; the echo and the switcher keep their script with the right `lang`; partner brands Latin; Saudi clients by their official Arabic names, international client brands Latin; projects always Arabic; unknown official names go to a pending list the test accepts and names; the 61 missing translations are translated (translation of existing content, not new copy); hard-coded strings move to the messages.

- **Part A — one language per page.**
  - **Mechanism:** `splitForeign()` (`src/lib/i18n/lang-runs.ts`) finds every run in the other script; `<LangText>` (`src/components/ui/LangText.tsx`) is the one way a content or message string reaches the page and wraps each foreign run in `<span lang="en" dir="ltr">` (or `lang="ar" dir="rtl"` on English pages). The `dir` isolates the run in the bidi algorithm — this corrected «+add» to «add+» in the Arabic clients index (pre-existing). A Latin run begins at the first word that contains a letter and leaves trailing sentence punctuation outside, so «© 2026 Smart Channels.» renders exactly as before (measured before/after). Attributes (`alt`, `aria-label`, `title`) cannot carry their own language; they are checked against the allow-list only.
  - **Allow-list** (`src/content/lang-allowlist.ts`): brands = "Smart Channels", the 41 partners, the international clients (Rothschild & Co, Veolia, Mott MacDonald, Westcon-Comstor, Moelis, mediaPro International — `arPolicy: "latin"`), and Avaya, Alcatel, FIFA, which appear inside approved copy; technical terms (5G, AI, AMC, ANPR, AV, CATV, CCTV, CTI, HDMI, IP, IPTV, IT, LPR, MPO, MTP, NVR, PBX, PoE, PTT, SFP, UPS, VPN, Wi-Fi, Cat 6/6A/7); identifiers (email/URL); design strings: «English», «Technology Alliances», «Our Clients» on Arabic pages, «العربية», «التحالفات التقنية», «عملاؤنا» on English pages.
  - **Names:** clients with official Arabic from the Arabic printed in their own approved logos — مجمع ريسبونس بلس الطبي · ڤيدا القابضة · شركة العرض المتقن · الظهران اكسبو · تكامل (and the existing صالح عبد العزيز الراجحي) — or long established: سلا. Projects: `arPolicy` removed from all 18; seven filled — كأس العالم للأندية FIFA — جدة · نهائي دوري أبطال آسيا للنخبة · كأس آسيا تحت 23 عامًا · كأس آسيا تحت 17 عامًا · جائزة السعودية الكبرى للفورمولا 1 · رالي داكار · طواف العلا · الأول بارك ومدينة الملك فهد الرياضية. **Pending (18, `src/content/arabic-pending.ts`):** clients SkyWave, Water & Power Engineering, add+, Sala Entertainment, Hopscotch, Moments International, Hwadi, Reform Athletica; projects RCU Outdoor Entertainment — AlUla, NEOM Sports Village, World Combat Games — Riyadh 2023, Formula E1 — Jeddah, PFL — Green Hall / Boulevard / MENA, FEI World Cup Finals — Riyadh, Longines Global Champions Tour, WTA Finals — Riyadh, Next Gen ATP Finals, Saudi Arabia Snooker Masters. The validator now fails a project with `arPolicy: "latin"`, a client/project without Arabic that is not pending, and a pending entry that already has Arabic or names a different record.
  - **Translations (owner review pending):** every `solutions.ts` summary, item and the four Latin-only sub-solution names (58 + 4), and the three company values. Acronyms and brands stay Latin inside the Arabic sentences.
  - **Code → messages:** `nav.mainLabel`, `nav.homeLabel`, `footer.navLabel`, `footer.logoAlt`, `footer.markAlt`, `lead.honeypot`; `/clients` and `/partners` indexes and the solution vendor fallback use `localize()`; `LocationMap` shows the address in the page language and keeps the approved English address as the map query.
  - **Permanent test** `tests/smoke/language-purity.spec.ts` (2): crawls every page from the locale home + the sitemap + the two unlinked routes `/contact` and `/smart-ai` (37 per language), fails on any foreign run that is not allowed or not wrapped in the right `lang`, and prints the pending names on every run. Validation AR gaps 54 → 10 (the ten pending projects).
  - **Left out, recorded:** `MobileMenu` is forbidden, so the email inside the OPEN mobile menu has no `lang` (the crawl never opens the menu). The Arabic footer shows the company name as «القنوات الذكية» (`footer.brandName`) — Arabic, not flagged by the scan; it conflicts with "Smart Channels stays Latin" and awaits the owner's word. Text-only `<LangText>` wraps were applied inside the otherwise forbidden products cards/sidebar, the projects accordion titles and the gallery lightbox caption (the "عدا النصوص في أ" exception); their logic is untouched.
- **Part B — the network map.**
  - **Counters:** `stats.ts` holds the base values and the rule: Projects Delivered 200 + 20 × (year − 2026); Years of Continuous Delivery = year − `FOUNDED_YEAR`, or 7 + 1 × (year − 2026) while the founding year is not on record (it is not); Sectors and National Venues & Events stay manual. `getStats(now)` computes them on the server in Riyadh time (the year turns at midnight Riyadh). `NetworkScene` receives them as props, and the final numbers are written into the server HTML. The client's reset to `0` and the count-up are removed, so the number on screen is always the server's (smoke-tested: the HTML and the post-story DOM both read 200 · 7 · 16 · 100 in 2026; unit-tested for 2027, 2030 and the Riyadh New Year boundary).
  - **Deviation — daily regeneration:** `/company` carries `revalidate = 86400` as directed. The homepage was built with it first and measured: on Next 16.3.3 the client router's segment prefetches of a revalidated homepage hang — `200` headers, a body that never closes — so every page that links home never reaches network-idle. That reproduced 4 failures in the existing smoke suite (`products-media`, `mobile-menu`), and it disappears without `revalidate`. The homepage therefore renders on the server per request (`dynamic = "force-dynamic"`, ≈ 25–38 ms), which is stricter than daily and never build-time only. Logged as D081-HOME-ISR.
  - **Dammam:** a new `kind: "coverage-city"` in `locations.ts` — a route from Riyadh and a node in both the canvas and the static frame, no project, no button, no card, not in the opening; the validator's "non-HQ needs a project" rule now applies to `venue-city` only. Tabuk and Abha already had routes.
  - **City buttons + cards** (`MapCities.tsx`): six buttons. Riyadh + Diriyah and Jeddah + Makkah + Taif are grouped (`group` in `locations.ts`: 6 px and 33–37 px apart on a 1440 px map); each button is a real `<button>` named «مكة المكرمة — مشروع واحد» / «الرياض والدرعية — 6 مشاريع» (ICU plurals in both languages), with a hit area of at least 44 × 44, a 2 px focus ring, and dots in the brand magenta ringed by the page ground (≥ 3:1 in both themes, measured). Positions come from `layout.ts`, shared with the canvas engine, so buttons sit on the drawn nodes on the canvas (final camera) and on the static frame. The card shows the lead project (one with its own page first, by the owner's `homeOrder`), its sector, its photograph when one exists (none today), «و N مشاريع أخرى», and «عرض المشروع» when it has a page. WCAG 1.4.13: hover opens, moving onto the card keeps it, no timer, Esc closes and returns focus, a click or tap pins it, a tap outside closes it, `aria-expanded` + `aria-controls`, the card follows its button in the DOM so Tab reaches its link, and it is placed above (or below) and clamped inside the viewport. Below 768 px (and at 200 % zoom on a 1440 px screen) the buttons give way to a visible list of every city with its projects (option ج); above it the same list is the visually hidden text alternative.
  - **Found and fixed:** pending Latin names were split at « — » into separate isolated runs and read backwards in Arabic; Latin words now stay one run across « — » and « / ».
  - **Tests:** `tests/smoke/network-map.spec.ts` (10 across both projects — server-final numbers EN/AR, six buttons ≥ 44 with names and no Dammam button, keyboard Tab · Enter · Tab · Esc, hover persistence onto the card, NEOM edge at 1024 px, dot contrast in both themes, touch tap/outside tap, the phone list, 200 % zoom) and a unit test for the counters. Gates: `npm run check` (21 unit), build, `npm run test:smoke` 222 passed / 60 skipped, `npm run check:hydration` 0.
- **Part C — About (homepage).** The capability row under the photograph is replaced by the owner's four parts as `h3` under the section's existing `h2`, in this order: رؤيتنا · رسالتنا · قيمنا (five values, each a bold name and one line) · أهدافنا (four goals), in both languages, held in `company.aboutPillars`. The old «رسالتنا» label and quote in the text column are removed. The `h2`, the paragraph, the photograph and its caption are unchanged. Same row layout and reversible arrival (stagger with D-079 `.is-visible` hysteresis), text ≥ 4.5:1 in both themes (measured in the test). `/company` still shows the profile's `mission`, `values` and `capabilities`. Its mission sentence differs from the new homepage mission (D081-TWO-MISSIONS). `home.missionLabel` lost its only consumer and is kept under the standing rule. Test: `tests/smoke/about-pillars.spec.ts` (3). Gates: `npm run check` (21), build, `npm run test:smoke` 225 passed / 63 skipped, `npm run check:hydration` 0.

**D-082.** Owner directive "D-082 — متابعة D-081: الأسماء · الفرع · الرسالة · الاسم القانوني" (2026-10-22).
- **Branch:** the only branch of record is `claude/smart-channels-2026-discovery-y2albk` (pushes verified in D-081 and here). `claude/smart-channels-social-diagnostic-jyz69v` held no commit absent from y2albk; it is deleted locally, but the session's git proxy refused the remote delete five times ("remote end hung up") and the GitHub connector has no branch-delete tool — it remains on GitHub for the owner to delete (Settings → Branches), with nothing to lose.
- **Names:** «سلا» → «سيلا» (Sela). The ten pending projects take the owner's official Arabic names verbatim (PFL and E1 added to the allow-list, wrapped `lang="en"`). SkyWave, add+, Hopscotch, Moments International and Reform Athletica move to the allow-list as Latin brands. **Pending now 3, not the 2 expected:** Water & Power Engineering and Hwadi as directed, plus **Sala Entertainment**, which was on the D-081 list but is named in neither D-082 group, so it was kept waiting rather than decided. Validation AR gaps 10 → 0.
- **Legal name:** `seo.ts` gains one line in the Arabic Organization JSON-LD — `legalName: "شركة القنوات الذكية"`, `alternateName: "Smart Channels"` (plus its one-line comment; the authorised exception — nothing else in the file). The JSON-LD is emitted only when indexing is allowed, so a unit test calls `organizationSchema()` directly. `LEGAL_NAME_AR` is exported from the allow-list (Arabic text is native to Arabic pages, so the language test accepts it without a rule). The Arabic footer is untouched.
- **One mission:** `company.mission` now holds the owner's wording; the homepage About and `/company` both read it; `aboutPillars.mission` is removed (unit-tested).
- **Mobile menu:** one line in `MobileMenu.tsx` — the email becomes `<span lang="en" dir="ltr">{contact.email}</span>`. `<LangText>` would have needed a second line (its import), so the single-line exception is met with the same markup LangText emits for this string. The language test now opens the menu at 390 px in both languages and holds every text node to the same rules (2 tests).
- **Gates:** `npm run check` (23 unit), build, `npm run test:smoke` 227 passed / 65 skipped / 0 failed, `npm run check:hydration` 0.


**D-083.** Owner directive "متابعة D-083 — التزام واحد" (2026-10-22). D-082 approved.
- **Translations:** three corrections to the 61 — #5 «خزائن الشبكات والصناديق», #11 «عزل الممرات الساخنة والباردة», #48 «يجمع السنترال الخاص (PBX)…» (`solutions.ts`). The other 58 stand as approved.
- **One set of values:** `company.values` now holds the owner's five (الموثوقية · الدقة · السرعة · السلامة · الشراكة / Reliability · Precision · Speed · Safety · Partnership), each a name and one line. The homepage About and `/company` both read it; `/company` renders name + line where it showed the profile's three p.4 statements (#59–61), which are deleted, as is `aboutPillars.values`. A unit test pins the five, their order, both languages, the absence of `aboutPillars.values` and of the old wording.
- **Pending list closed:** Water & Power Engineering, Hwadi and Sala Entertainment become allow-listed Latin brands (`name()` → `arPolicy: "latin"`). `arabic-pending.ts` is kept as an empty array with a comment on how to add a name later; the `pendingAr` helper in `clients.ts` is kept for the same path (no current user). A unit test pins the list as empty. Validation: 0 AR gaps; the language test prints no pending names.
- **Gates:** `npm run check` (25 unit), build, `npm run test:smoke` 227 passed / 65 skipped / 0 failed, `npm run check:hydration` 0.

**D-085.** Owner directive "D-085 — شاشة ترحيب بالفيديو (Intro Splash)" (stage 1 intake 2026-10-24, stage 2 approval the same day).
- **Media (stage 1, `5c75c9c`):** the owner's Gemini-generated intro archived untouched as `media-source/video/intro-original.mp4` (10.0 s, 1280×720, H.264 + AAC); `public/media/intro/intro.mp4` 1,330,673 B, `intro.webm` 925,435 B, `intro-poster.jpg` 8,480 B (see `docs/product-images.md` «وسائط المقدمة»).
- **Splash:** `IntroSplash` (client) on the homepage only. `IntroScript`, inline in `<head>` before `ThemeAndTierScript`, sets `html[data-intro="on"]` only when the path is the homepage, `sessionStorage["sc-intro"]` is not `"1"` (read in try/catch), there is no prefers-reduced-motion, no Save-Data, and `navigator.webdriver` is false. CSS shows the splash and locks scroll only under that attribute (no flash; `<html>` already has `suppressHydrationWarning`). The `<video>` (WebM then MP4, muted, playsinline, autoplay, poster) mounts on the client only when the intro is on — a visitor who does not see it downloads none of it (tested). Sound never starts by itself. Closes on video end, `currentTime > duration − 0.9 s`, Skip, Esc, a media error (the video's or the last source's), a rejected `play()`, or no playback within 3 s; 0.9 s exit (scale 1.25 + blur 6 px, opacity, sound fade), then `sc-intro=1`, scroll released, removed from the DOM, `sc:intro-done` fired. Buttons: brand-magenta token for focus and the progress bar, text from the new `intro` messages namespace in both languages.
- **Opening (modifies Revision 3 §1 on the homepage):** `ThemeAndTierScript` gains one condition — when `data-intro="on"` or `sc-intro="1"` it sets `data-opening="skipped"` instead of `"pending"`; the opening block itself is unchanged. So the opening no longer plays on every full load: after the intro, and on every later load in the session, the hero starts final. The opening code stays and still runs when the intro is ineligible for other reasons (an automated browser), so `opening.spec` and the existing suite pass unmodified.
- **Found and contained:** `IndustriesSlider` centres its active tab with `scrollIntoView({block:"nearest"})` at mount, which carries the window ~3,600 px down to the slider. The opening's scroll guard masked it; on the skipped path it surfaced. `IntroScript` therefore snaps unrequested scrolls to the top on intro-skipped homepage loads until the visitor's first input (wheel/touch/key/press), not when the URL has a #hash — the same mechanism the opening uses. **Pre-existing, unchanged:** reduced-motion visitors already land at the slider on the homepage (no opening, no guard). Root fix is in `IndustriesSlider.tsx` (forbidden in this directive) — open item D085-SLIDER-SCROLL.
- **Tests:** new `tests/smoke/intro-splash.spec.ts` (14 tests × desktop/mobile) re-enables the intro with an init script; `scripts/check-hydration.mjs` gains a third pass with the intro shown. The 14 existing spec files are unchanged.

**D-085 stage 3 — complete.** Owner directive "D-085 — المرحلة 3: إغلاق البنود" (2026-10-24).
- **D085-SLIDER-SCROLL closed:** line 156 of `IndustriesSlider.tsx` (owner's exception, nothing else in the file) — `btn.scrollIntoView({inline:"center", block:"nearest"})` becomes a `scrollBy` on the strip by the distance between the tab's centre and the strip's centre (rect-based, so RTL and LTR alike). The window never scrolls, at mount or on a slide change. Reduced-motion homepage landing: scrollY 3604 (1440) / 5004 (390) before → 0 after, both languages. The IntroScript top-of-page guard is **deleted** — no masking; the "page at the top after the intro" assertions pass without it.
- **No intro with a #hash:** a sixth IntroScript condition — a homepage URL with a hash shows no intro and sets `sc-intro="1"` (so ThemeAndTierScript skips the opening and the intro does not appear later in the session). `/ar/contact` → `/ar/#contact` lands straight on the contact section.
- **Slow test:** `test.slow()` on industries-slider "the bottom strip keeps the active label in view after every transition" only — a timing failure in this container (it failed identically on the build without D-085), not a regression; its logic is unchanged.
- **Tests:** `intro-splash.spec.ts` gains reduced-motion scrollY = 0 (/ar, /en) and #contact (/ar, /en) — 18 tests × desktop/mobile.

**D-086 (items 7 and 9).** Owner directives during D-086 phase 1 (2026-10-24); the measurement items 1–5 await decisions.
- **Item 7, test only:** `scroll-scenes` "header environment…" waits for `data-header-env` (`expect.poll`, 4 assertions). It was an intermittent failure older than D-085 (3/10 on `5c75c9c`); after the fix 10/10 passed, and the full suite gave 263 passed, 0 failed (`69e641a`). The `projects-accordion` pointer park landed just before (`690d876`).
- **Item 9, videos:** all ten Solutions and Gallery videos were re-encoded from their `media-source` originals (untouched; every one already had an original) to H.264 CRF 28, long edge ≤ 1280 px, faststart; Solutions are silent, Gallery keeps AAC 96k (the carousel can unmute). 72.4 MB → 17.1 MB. Two clips needed a peak cap to stay at CRF 28 (02: 900k; event-network-build: 300k). **02 is 3.31 MB, over the 2.5 MB budget:** the budget-sized encode visibly smears its fine lines, so quality won (see `docs/product-images.md`). No WebM ships, because it was not clearly smaller. Same names, so no content paths changed.
- **Loading:** new `LazyVideo` (poster, `preload="none"`, src attached only while on screen, released with `removeAttribute("src")` + `load()` when it leaves, hidden tab pauses). Used by the homepage Solutions stage (one video at a time; the `eligible` state and manual play/pause removed), `SolutionCinematicMoment`, the project hero and AboutScene. Only the D-085 intro keeps `preload="auto"`. The permanent encoding rule is in `docs/product-images.md`. New `tests/smoke/video-loading.spec.ts`.

**D-086 phase 2 — opening removed, hero final from the first paint, below the fold waits, absolute SEO URLs.** Owner directive "D-086 — المرحلة 2: البنود المتبقية" (2026-10-24). Items 7 and 9 were already closed; the 3.31 MB clip 02 was approved.
- **D-086 cancels Revision 3 §1 for good:** the D-085 video intro is the only opening experience. Deleted: `OpeningExperience.tsx` (195 lines), `opening/engine.ts` (519), `lib/opening-state.ts` (40) and `tests/smoke/opening.spec.ts` (126, retired). The opening block, its scroll guard and its 4 s auto-skip are gone from `ThemeAndTierScript`, as are the D-085 `skipped` condition, the opening wait in `HashArrival`, the gate in `scroll-engine` and the restore in `HtmlStateGuard`. 210 CSS lines removed: opening stage, pre-stage pulse, page hold-back, floating-stack hold-back, the canvas presence and the hero/photo/header entrances. `<html>` never carries `data-opening`. `src/generated/opening-data.ts` and its generator stay for the map. `locations.ts` keeps `appearsInOpening` (content data, now unread).
- **The particle field is removed** with the engine. The rule that hides the static backdrop linework on animating tiers stays, so nothing new appears in the hero.
- **Hero final from the first paint:** no `hero-stage-enter`, `riyadh-arrive`, accent sweep or `header-in` on the homepage. At DOMContentLoaded every hero line, the photograph and the header have opacity 1, transform none, no animation and visible visibility, and «التجربة» is magenta from the start (new `hero-first-paint.spec.ts`). The `hero-stage-enter` keyframes stay, used only by the inner-page PageHero.
- **Logo:** the `<link rel="preload">` of the 497,008 B PNG and the header Image `priority` (a second preload) are removed. Header and footer serve lossless 2× WebP derivatives, `logo-dark-lockup.webp` (13,420 B) and `logo-mark-small.webp` (10,268 B), at the same size and look. The PNGs stay; `logo-dark.png` remains the JSON-LD logo.
- **Portrait Riyadh:** `riyadh-portrait-529.webp` (52,364 B, a native 529×941 crop around the tower) via `<picture>` under `(orientation: portrait) and (max-aspect-ratio: 9/16)`, placed in the frame at its original position so the overlay stays registered. It ships at native pixels rather than the suggested ~720×1280, because upscaling adds bytes without detail. The landscape preload is removed, so phones fetch one file.
- **Below the fold:** the industries scenes and the gallery video posters and sources attach only on approach (IntersectionObserver, 1000 px / 800 px). Native `loading="lazy"` alone loaded them at once in lab tools, whose 3000 px threshold for an unknown connection covers the section. The D-073 test now checks that the first scene decodes before the section arrives, and not at load.
- **SEO:** `siteUrl()` gives `metadataBase` from NEXT_PUBLIC_SITE_URL, else `https://` + VERCEL_PROJECT_PRODUCTION_URL, else http://localhost:3000; no domain is in the code. The homepage gets `pageMetadata("/")`: canonical, hreflang ar/en/x-default and OG url, all absolute, with the title unchanged. Noindex stays. README and `.env.example` name the two launch variables.
  - With the launch settings simulated locally, Lighthouse SEO is 100 on `/ar` and `/ar/company`. Measured on an origin other than `siteUrl()`, the canonical audit reports "points to another hreflang location". That is expected on preview URLs, but on the production URL it passes.
- **HTML:** 237,627 → 234,161 B raw (40,055 B gzip). 132 KB of it is the RSC data stream, which repeats the server-rendered tree for hydration (inherent). Its largest row is the full message set (12.7 KB) sent to NextIntlClientProvider. Pruning it is not safe without a per-component namespace audit, so it is reported, not done.
- **Lighthouse, local `/ar`, median of 3** (the default is what Lighthouse sees: an automated browser, so no intro):

| | Before (opening) | Before (opening skipped) | After |
|---|---|---|---|
| Mobile perf · LCP · SI · TBT · CLS | 0 · 10.60 s (NO_LCP 2/3) · 6.68 s · 838 ms · 0 | 61 · 8.65 s · 5.45 s · 201 ms · 0 | **72 · 4.73 s · 3.32 s · 249 ms · 0.003** |
| Desktop perf · LCP · SI · TBT · CLS | 0 · NO_LCP 3/3 · 1.91 s · 0 ms · 0 | 89 · 2.03 s · 1.52 s · 1 ms · 0 | **98 · 1.09 s · 0.94 s · 20 ms · 0.002** |

  - Mobile requests before LCP: 1,242 KB → 706 KB; page total 1,615 KB → 820 KB.
  - Targets met: Desktop LCP < 1.2 s, Mobile SI < 3.5 s, SEO ≥ 95 at launch.
  - Mobile LCP 4.73 s is above 2.5 s locally, where the simulated FCP floor is 3.3 s (the owner's Vercel PageSpeed FCP was 1.2 s). Confirm on Vercel after deploy. The next levers are those deferred by the owner: critical CSS, deferring the engines' JS, and fonts (D-088).

**D-085R — the intro in two cuts.** Owner directive "D-085R — تحسين المقدمة" (2026-10-25).
- **Media:** the owner's `intro-portrait.mp4` (720×1280, 672,493 B) and `intro-landscape.mp4` (1280×720, 984,876 B), both 7.6 s with the final zoom removed, and `intro-portrait-poster.jpg`, moved as delivered from `media-source/` to `public/media/intro/`. They are already H.264 faststart, so nothing was re-encoded. The double `.jpg.jpg` extension was dropped. `intro.mp4` and `intro.webm` were deleted. `intro-poster.jpg` is now the landscape cut's first frame. The 10 s original stays in `media-source/video/`.
- **IntroSplash:** `<source media="(orientation: portrait)" src="intro-portrait.mp4">` then `intro-landscape.mp4`, with the poster chosen by the same query: one file per visit, verified at 390 (portrait only) and 1440/2560 (landscape only).
- **Stage:** portrait uses `object-fit: cover`, filling the screen. Landscape uses `object-fit: contain` on a radial gradient (#f6f4f7 → #d8d5da) with an 8 % mask on all four edges. The element is sized to the picture (`min(100vw, 100vh × 16/9)`), so the mask falls on the picture's own edges at every aspect ratio and no border shows (checked at 1440×900 and 2560×1080).
- **Exit:** begins on `ended`; the D-085 close at `duration − 0.9 s` is removed because the zoom it cut away is gone. Scale 1 → 1.06 with a 0.7 s fade, and the blur is dropped. The sound fade follows the same 0.7 s.
- **Unchanged:** the rest of D-085 (gate, once per session, muted start, Skip/Esc/sound button, 3 s guard, error and play() rejection close, scroll lock, `sc:intro-done`).
- **Observed, not changed:** on tall phones (390×844 ≈ 19.5:9), `cover` crops about 43 px from each side of the 9:16 portrait cut, so the «Smart Channels» wordmark reaches the screen edges.
- **Tests:** the intro spec serves a VP9 fixture for the .mp4 requests, because the test browser has no H.264. New tests cover one file and one poster per orientation and the exit beginning only at the video's end. The original-source sentence in `media-source/README.md` was updated.

**D-088 — the Arabic font, security and SEO.** Owner directive "D-088" (phase 1 inspection, then the phase 2 decisions of 2026-10-25). D-089 and D-090 not touched; no new package; `package.json` unchanged; no new Arabic copy merged (the privacy page, the category texts and the «سياسة الخصوصية» link wording are in the report for approval).
- **Font (A):** Arabic text uses the system stack. The tokens are `"Archivo", Arial, "Segoe UI", Tahoma, "Geeza Pro", "Noto Naskh Arabic", sans-serif` (display) and the same with `"Inter"` (body). The Latin faces cover Latin only (unicode-range), so Arabic falls through to the device font, which may differ by device (owner decision 1). The 21 Arabic `@font-face` blocks are removed. Their files (496,936 B: Noto Kufi Arabic ×5, IBM Plex Sans Arabic ×16, OFL) moved to `media-source/fonts/` with a LICENSE note. Arabic headings get line-height 1.35 at weight 700; `letter-spacing` is 0 on Arabic microlabels, tags and names. Before/after screenshots of nine pages, the form, the footer and the menu are in the report.
- **SEC-5 · SEC-3 · SEC-11 — Upstash Redis over REST** (`src/lib/store/redis.ts`, fetch, 5 s timeout; reads `KV_REST_API_URL/TOKEN` or `UPSTASH_REDIS_REST_URL/TOKEN`):
  - Leads: `sc:lead:<id>` with a 12-month TTL (`LEAD_TTL_SEC`, marked [للتأكيد] in the privacy draft), indexed by the ZSET `sc:leads`; status changes keep the TTL. `.data/` remains the development store only.
  - On Vercel without the variables, the store is "unavailable". `/api/leads` answers 503 `storage-unconfigured`; the form and the Digital Employee show their failure state with email and WhatsApp links and never claim success; the console shows an operator banner.
  - One limiter for sign-in (5 per 15 min) and leads (5 per 10 min), shared through Redis and in memory without it or on a Redis error. Going over locks the key, doubling per strike within 24 h (base 15/10 min, cap 24 h). A successful sign-in clears the key.
  - The client IP comes from `x-vercel-forwarded-for` / `x-real-ip`. `x-forwarded-for` is trusted only on Vercel; anywhere else all clients share one bucket.
  - Sessions: the token is `exp.sid.mac`; with Redis the sid is registered for 8 h and deleted at sign-out, so a copied cookie dies with it. A Redis failure fails closed. The cookie is `sameSite: strict`. Every caller awaits the now-async check; the synchronous version would have treated a Promise as signed in.
- **Request guards:**
  - POST routes need an Origin naming this host: the Host header, the request URL's origin, or `siteUrl()`. `next start` reports `req.url` as localhost, so the Host comparison is needed; a smoke run caught it.
  - The CSV export refuses `Sec-Fetch-Site: cross-site`.
  - Content types: leads accept JSON only, sign-in accepts form encodings (415 otherwise).
  - 64 KB cap (413): checked from content-length before reading, and enforced again while reading the stream.
- **SEC-4:** `csvCell` prefixes `'` to values starting with `= + - @ Tab CR`. **SEC-7:** HSTS `max-age=63072000; includeSubDomains` (no preload: the owner decides later). **SEC-8 rejected:** Next's per-page inline flight scripts need `'unsafe-inline'`; a hash disables it and a nonce forces dynamic rendering of every page. **SEC-12:** the 188 public images were already clean; `tests/unit/image-metadata.test.ts` walks JPEG segments, PNG chunks and WebP chunks so it cannot come back.
- **SEC-2/9 (owner decision 8):** deleted from `public/` the unpublished `event-network-build-2025` video and poster, and the five unreferenced product images `01-switch`, `02-access-points`, `03-camera`, `firewall-interim`, `multi-charger-t60`; every original is in `media-source/`. The gallery record stays unpublished; the validator reports its missing file as the usual warning. Observed, not deleted: five more earlier files (`core-switch`, `laptop`, `nvr`, `printers`, `tablet`) are also not referenced by name in the code.
- **SEO:**
  - SEO-1: the sitemap uses `siteUrl()`, lists the nine categories with language alternates and drops `/products`; robots names it when indexing is on.
  - SEO-2 · SEO-8: `/products` is a 308 to the first category, and `/contact` and `/smart-ai` are now 308 too (`permanentRedirect`). The nav points at `/products/networking`, with `match: "/products"` keeping it active on every category (the overflow "More" included).
  - SEO-4/9: card names are `h2` with no visual change; the texts await approval.
  - SEO-5: the project description is the overview, else the scope, else name and sectors, then location and years, cut at a word near 155 characters.
  - SEO-6: Arabic home title «القنوات الذكية — التقنية التي تصنع التجربة», template «%s — القنوات الذكية» and an Arabic `og:site_name` on `/ar`.
  - SEO-7: `defaultLocale = "ar"`, so every new visitor goes to `/ar`. **Deviation:** `localeDetection` stays true, because false would also ignore the language-switcher cookie. Instead the middleware withholds `Accept-Language`, so only the cookie can choose `/en`. x-default is `/ar`.
  - SEO-10: `scripts/generate-og.ts` renders `public/og/og-ar.png` and `og-en.png` (1200×630), used as `og:image` with `summary_large_image` on every page.
  - SEO-11: the Organization schema has a PostalAddress split from the approved address (no postal code), legalName «شركة القنوات الذكية» in both languages, an alternateName, an absolute url and logo, a contactPoint and `areaServed: "SA"`. BreadcrumbList on the sub-pages, emitted only when indexing is on and placed last in the page (the `main > :first-child` clearance rule).
  - SEO-12: the gallery and accordion images take their data alt.
- **Lighthouse SEO** (local, `final` variant): noindex build 61 on `/ar` and `/ar/products/networking`. The two failures are `is-crawlable` (noindex by design) and `canonical` (origin ≠ `siteUrl()`). With the launch settings simulated (`NEXT_PUBLIC_ALLOW_INDEXING=true`, `NEXT_PUBLIC_SITE_URL` = the test origin) it is **100 on both, mobile and desktop**.
- **Tests:** new `tests/unit/security.test.ts` (12: CSV, lockout in memory and against an in-memory Upstash stand-in, revocation, fail-closed, store selection with the 12-month TTL), `tests/unit/image-metadata.test.ts` (3) and `tests/smoke/d088-security-seo.spec.ts` (guards 403/415/413, HSTS, `/`→`/ar` and the cookie, the 308s, nav state, sitemap, OG image, Arabic title, no JSON-LD under noindex, and the 503 form path through `route.fulfill`). No test lead was sent to any deployment.
- **Existing tests updated to the decided behaviour:**
  - `routes` and `products-media`: `/products` is a redirect, and redirects must be 308.
  - `mobile-menu`: the Products link lands on `/products/networking`.
  - `language-purity`: crawl ≥ 36, since `/products` is no longer a page.
  - `products-media` D-068: a card's text line is now `p` or `h2`.
  - `validate-content`: x-default `/ar`, legalName in both languages.

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
| O-016 | **STILL OPEN** — Official **company** LinkedIn page, plus Instagram / X / TikTok company URLs | Organization `sameAs`; full footer social treatment | D-055: LinkedIn is live TEMPORARILY on a personal profile (`/in/`, not `/company/`) — it renders in the footer but is excluded from Organization `sameAs`, which is therefore empty and omitted from the JSON-LD. Instagram / X / TikTok remain prepared-and-disabled in src/content/social.ts. Closing this item = create the official company page, replace the URL, and supply the remaining three; each is a data edit that fills the footer and `sameAs` automatically (D-029/D-050 §39/D-055). |
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
| D059-DUAL-SOURCE | **Updated at D-062:** no longer "two product sources rendered" — now **one source rendered** (`product-catalog.ts`, 9 categories / 73 cards, currently image-less per D-060) **and one source preserved, unrendered** (`products.ts`, 24 records with a locked manifest mapping 19 photographs to 19 products, still green in the validator and unit test). | Nothing rendered today; a clean deletion tomorrow | Owner decision 2026-09-13: `products.ts` is kept because it is the most precise record we hold of which photograph belongs to which product, and `product-catalog.ts` has no images yet. **Closing sequence:** the new photography batch arrives and is linked type-by-type → the catalogue is self-sufficient → THEN `products.ts`, its 29 delivery files, the validator manifest block (lines 131–187), the D-058 unit test, `getPublishedProducts`/`getFeaturedProducts` and the orphaned `ProductCatalog.tsx` are deleted together in one dedicated task. |
| D059-SITEMAP | The eighteen `/products/[category]` routes are NOT in `sitemap.ts`. | Discoverability once indexing opens | Owner decision 2026-09-13: `sitemap.ts` still points at `https://example.invalid` and indexing is closed behind `NEXT_PUBLIC_ALLOW_INDEXING`; listing eighteen routes under a placeholder domain adds debt. **Add them when the production domain is approved (D-010 / O-011).** |
| D061-LOST-COVERAGE | The D-059 smoke test "category strip: hover reveals after a delay, leaving closes, Escape closes, focus opens" was deleted with the strip. It covered, verbatim: **(1)** immediately after `hover`, `aria-expanded="false"` (the 110 ms open guard), then `"true"` within the timeout; **(2)** the panel `toBeVisible`; **(3)** the panel lists the category's unique types in order — 5G Routers · Core Switches · Switches · Wi-Fi Extenders · Access Points · Point-to-Point; **(4)** moving the pointer away → `"false"` (the 220 ms deferred close); **(5)** `focus` → `"true"` at once; **(6)** `Escape` → `"false"`. | Nothing today | This coverage lapsed with the strip. **Reinstate it if any hover-reveal behaviour returns anywhere** — the six checks are the contract for a panel that must not flicker, must be reachable without a pointer, and must close on Escape. |
| D062-LOST-COVERAGE | The smoke test "homepage preview: exactly the four featured categories with mapped images" was deleted with `ProductsStage`. It covered, verbatim: **(1)** the four slot names in order — Firewall · Core Switch · Laptop · Cameras; **(2)** each slot's `<img src>` matching its `FEATURED` delivery file; **(3)** exactly FOUR slots — "the homepage stays at four, never a catalogue"; **(4)** the four anchors `/en/products#firewall` · `#core-switch` · `#laptop` · `#camera`; **(5)** no commerce language (`$|SAR|price|buy now|add to cart`) inside the section. | Nothing today | (1)–(4) lapsed with the stage. **(5) is an architectural principle — the site is not a store — and was moved, not lost:** the same regex now guards `/products/networking` (EN) and `/ar/products/networking` (with Arabic terms), because the catalogue is where the risk of slipping into commerce language lives now. `/products` already carried it since D-059. |
| D062-DEAD-MESSAGES | `home.products.title` · `.sub` · `.explore` · `.cta` (EN + AR) have had no consumer since D-062 (the stage) and D-059 (the old /products page). **Added at D-067:** `pages.gallery.description` (EN + AR), dead since the `/gallery` page was deleted — Review 1: pending. **Added at D-072:** `home.featuredMark` (EN + AR), dead since the featured marks left the Industries section — Review 1: pending. **Added at D-081:** `home.missionLabel` (EN + AR), dead since the About section's old mission block was replaced by the four parts — Review 1: pending. | Nothing | Owner decision 2026-09-13: **kept**. Four polished bilingual strings for a homepage products section; a dead key costs nothing in the bundle, re-writing Arabic copy costs. **Delete only if two consecutive reviews pass with no use.** Review 1: pending. |
| D063-CANONICAL | `/products` and `/products/networking` render byte-identical bodies since D-063; `/products` still declares itself canonical. | Duplicate-content hygiene once indexing opens (site is `noindex` today) | Recommendation 2026-09-13: point `/products` canonical (AND its hreflang alternates, which `pageMetadata` derives from the same path) at `/products/networking` — the body *is* the networking page and the reverse would break the nine-sibling symmetry. Owner to decide; `seo.ts` change in a separate task. |
| D064-HELD-IMAGES | **Updated at D-066:** `ptt-radios.jpeg`, `desktop-pcs.png`, `keyboards.png`, `mice.png` (baked light haze) and `monitors.png` (type deleted) sit in `media-source/images/products-intake/`, tracked, unlinked. | PTT Radios, Desktop PCs, Keyboards and Mice cards show the placeholder | Owner decision 2026-09-13: the radios file is a marketing scene with captions, the PC file has a baked white ground. Resolve by a replacement cut-out (WebP/PNG with real alpha) dropped in the same intake folder — a one-field link on the type's row. No type is without a supplied file any more (D-066); the four placeholders are all held files. `hdmi-splitters` is linked with a faint haze and may be replaced. |
| D064-NAMING | Two catalogue derivatives carry a `-catalog` suffix (`nvr-catalog.webp`, `printers-catalog.webp`; archive `nvr-catalog.png`) instead of the directive's bare names. | Nothing | Forced by D-053 (never reuse a delivery path for different bytes) — the bare names were taken by D-052 files that the directive kept untouched. Goes away with D059-DUAL-SOURCE: once the 29 old files are deleted the two can be renamed if the owner wants uniform names. |
| D065-VIDEO-REENCODE | `event-network-build-2025.mp4` (14.09 MB) exceeds the D-065 8 MB limit for a published gallery video; its record is `published: false`. | The gallery shows 3 of 4 approved items | Owner decision 2026-09-15: the consultant re-encodes the file to ≤ 8 MB with ffmpeg (none on the build host) and hands it back for a push on a NEW delivery path (D-053). **Closes when:** the new file is committed, the record's `src` points at it, `published: true`, and `npm run validate` is green. No exception to the limit. |
| D067-CSS-ORPHANS | `.gallery-shell-grid` and `.gallery-cat` in `globals.css` have no consumer (pre-existing orphans found at D-067). | Nothing | Owner decision 2026-09-16: leave; clean up together with `ProductCatalog.tsx` and its `.gallery-filter*` rules when D059-DUAL-SOURCE closes. |
| D076-DEAD-TIER-RULE | `resolveMotionTier()` in `src/lib/motion/capability.ts` demotes to `lite` on `deviceMemory ≤ 4` / `hardwareConcurrency ≤ 4`, but `currentMotionTier()` adopts the bootstrap's `data-motion-tier` whenever present, so the two signals never run — the inline bootstrap (reduced-motion / Save-Data / 767 px) is the only rule in force. | Nothing (documented rule ≠ effective rule) | Owner decision 2026-09-21: keep, do not delete now. **Closes when:** the owner either adds the two signals to the bootstrap or removes them from `capability.ts` so the code says what it does. |
| D067-OFFSCREEN-PLAY | ~~On the homepage the carousel's centre video played (muted) from mount, before the `#gallery` section scrolled into view.~~ **RESOLVED** (owner directive 2026-09-19, separate commit): `GalleryCarousel` gates playback on an IntersectionObserver over the ring (threshold 0.5) — off screen the centre video is paused where it is, in view it plays muted, leaving pauses it again; manual rotation in view is unchanged and `preload="metadata"` stays. Measured on the real files at scroll 0: `paused === true`, `played.length === 0`, `readyState 0`, `networkState` not LOADING, only the browser's own `preload=metadata` range probe on the wire; a smoke test covers idle-at-top and playing-in-view (with the test-only VP9 stand-in) and paused-again-after-leaving. | — | Closed. |
| D078-RPM | ~~The owner's deletion list named "RPM"; no record carries that id or name; the `response-plus` mark reads "RESPONSE PLUS MEDICAL COMPLEX — RPM".~~ **RESOLVED** (owner 2026-09-22): `response-plus` stays — RPM is not on the deletion list. 24 clients is final. | — | Closed. |
| D078-JEDDAH-LOGO | `jeddah-season` has a record and no mark; the rails skip it, the `/clients` name index lists it. | One of 24 clients absent from both rails | Closes when the owner supplies `media-source/brand/clients/jeddah-season.png` (real alpha or white ground — the script handles both): run `npx tsx scripts/logo-transparency.ts`, add `logo: { src: "/media/logos/clients/jeddah-season.webp", quality: "approved" }`, update the 23/24 counts in `tests/unit/logos.test.ts` and `tests/smoke/logo-rails.spec.ts`. Never invent the mark. |
| D078-HOVER-DARK-INK | ~~On the dark theme, hover returns a mark's original colours and 24 of 64 dark-ink marks become barely visible in that state.~~ **RESOLVED** (owner 2026-09-22, option أ, separate commit): on the dark theme only, a soft light plate (`rgba(250,250,248,.92)`, 8 px radius, 6 px 10 px around the ink) rises behind the hovered mark — and behind every mark while the rail has keyboard focus — on the same 200 ms as the colour; the light theme never shows it; the three `originalColor` marks get it too; reduced motion shows it without a transition. Measured: HPE's black ink on the plate ≥ 4.5:1 (value in the D-078 follow-up paragraph). | — | Closed. |
| D075-RESIDUAL-TRANSFORM | ~~`.reveal[data-reveal="converge"]` kept `scale(0.988) translateY(10px)` after its reveal (equal specificity, later in the file; the visible rule reset only `filter`).~~ **RESOLVED at D-079:** converge runs on `--t`, has no blur, and every transform rule stops applying at `data-rs="1"` — computed `transform: none`, smoke-tested. | — | Closed. |
| D079-FRAMES | Headless software rendering drops 24.6 % of frames over a full homepage scroll after D-079 vs 12.1 % before (same script, same container). | Scroll smoothness on low-end hardware — unverified on a real GPU | Recorded 2026-09-23. **Closes when** the same script (`rAF` deltas over a full wheel scroll, 1440×900) is run on a real GPU machine and the owner accepts the number, or asks for a lighter cover (e.g. no scale, veil only — measured 18 % in software). |
| D081-AR-NAMES | **RESOLVED at D-083:** pending = 0 — the last three (Water & Power Engineering, Hwadi, Sala Entertainment) became allow-listed Latin brands; `src/content/arabic-pending.ts` stays as an empty list with instructions. | One-language Arabic pages | Closed. A future name without official Arabic is added to the pending list; the validator and the language test enforce it. |
| D081-FOOTER-BRAND | ~~The Arabic footer names the company «القنوات الذكية».~~ **RESOLVED at D-082:** the footer stays as it is; «شركة القنوات الذكية» is the registered name, carried as `legalName` in the Arabic JSON-LD. | — | Closed. |
| D081-HOME-ISR | The homepage renders per request (`dynamic = "force-dynamic"`) instead of `revalidate = 86400`: on Next 16.3.3 a revalidated homepage makes the router's segment prefetches hang (headers sent, body never closed). | Homepage cacheability (≈ 30 ms per request on the server, no CDN reuse) | Recorded 2026-10-22. **Closes when** a Next upgrade lets `revalidate = 86400` pass `npm run test:smoke` (products-media and mobile-menu reproduced the hang); then swap the one line in `src/app/[locale]/page.tsx`. |
| D081-TWO-MISSIONS | ~~Two mission sentences.~~ **RESOLVED at D-082:** one `company.mission`, read by the homepage About and `/company`. | — | Closed. |
| D085-SLIDER-SCROLL | **RESOLVED at D-085 stage 3:** `IndustriesSlider.tsx` now centres the active tab with `strip.scrollBy({left})` — horizontal, inside the strip — instead of `scrollIntoView`; the page never moves (reduced-motion homepage scrollY 3604/5004 → 0). The IntroScript top-of-page guard is removed. | — | Closed. |
