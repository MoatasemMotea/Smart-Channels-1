# Smart Channels 2026 Website — Creative Direction Specification

> P2 deliverable, produced 2026-08-27 under the P2 approval with amendments
> P2-A01…P2-A11. Companion artifacts: the 11 static visual boards in
> `design/boards/` and — since P2 Revision Round 1 —
> `docs/motion-implementation-contract.md`, which is binding on all motion,
> choreography, capability-tier, and legibility decisions from P4 onward.
>
> **LOCKED at P2 Revision Round 1 (D-014/D-015):** Typography =
> **Candidate A (Archivo-led)** with the Arabic companions below;
> Hero headline = **`TECHNOLOGY BEHIND THE EXPERIENCE.`** (the alternate is
> not the primary Hero). Candidate B remains documented for the record
> only.

---

## 1. Creative concept

**Internal concept name: THE SIGNAL BEHIND EVERYTHING** (P2-A01 — internal
direction, not automatically public copy).

Smart Channels' work is invisible when it succeeds. The website makes that
invisible layer visible as a designed world — a dark, precise, quietly alive
network environment in which evidence (real projects, venues, photography,
numbers) appears as moments of light. The visitor moves through the homepage
like a signal: constructed at the opening, routed through solutions and
industries, arriving at proof, terminating at a human conversation.

**Governing principles (approved):**

1. **Precision over decoration** — every technical-looking visual must have a
   meaningful relationship to connectivity, infrastructure, systems
   integration, transmission, coverage, or project evidence. No decorative
   fake-tech noise (P2-A01).
2. **Evidence over spectacle** — motion and atmosphere frame the proof; they
   never replace it.
3. **The accent is earned** — magenta appears where meaning peaks; scarcity
   is what makes it valuable.

**The ownable system: the Network Field.** One visual language — particles,
nodes, connection lines, travelling signals — derived from the authoritative
logo's own particle dots. It appears at five intensities: full (opening,
hero), cartographic (National Signal Field), ambient (Solutions, Smart AI),
seam (transition devices), hairline (annotations/dividers). One system
everywhere is what makes the site recognizably Smart Channels rather than
generically "techy" — and it is the Blink-independence guarantee (P2-A10):
the language comes from signal + topology + infrastructure + connectivity +
evidence + controlled particles, not from any reference site's identity.

## 2. Color & environment system

Brand values sampled from the authoritative logo asset (PDF-embedded
1147×939 lockup with alpha):

- **Smart Channels magenta: `#FF189C`** (dominant sampled value)
- **Brand purple: `#8D3492`** (particle dots)

### Dark theme (default)

| Token | Value | Use |
|---|---|---|
| `bg` | `#0A0A0C` | Page ground (neutral near-black — not purple-tinted) |
| `bg-deep` | `#060607` | Opening, Smart AI pocket, final CTA |
| `surface` | `#121215` | Raised panels |
| `surface-2` | `#1A1A1E` | Higher elevation |
| `ink` | `#F5F5F4` | Primary text |
| `ink-muted` | `#A3A3A0` (~60%) | Secondary text |
| `line` | `#FFFFFF` @ 8–12% | Hairlines, rules |
| `accent` | `#FF189C` | CTA, active/focus, live signal, key figures |
| `accent-soft` | `#FF189C` @ 10–14% | Glows, fills, focus rings |
| `atmos` | `#8D3492` @ ≤12% | Atmospheric depth ONLY — glow, particle depth, transitional influence. Never a surface fill, never a gradient wash (Q-P2-1 / P2-A01) |
| `field-line` | `#FFFFFF` @ 6–14% | Network field linework |
| `field-node` | `#C9C9CE` | Nodes at rest |

### Light theme (first-class, not an inversion)

| Token | Value | Use |
|---|---|---|
| `bg` | `#FAFAF8` | Warm-neutral paper, not clinical white |
| `surface` | `#FFFFFF` | Panels |
| `surface-2` | `#F1F1EE` | Recessed zones |
| `ink` | `#141416` | Primary text |
| `ink-muted` | `#5C5C5A` | Secondary |
| `line` | `#141416` @ 10–14% | Hairlines |
| `accent` | `#D80F7E` | Magenta deepened to hold AA contrast on light ground |
| `atmos` | near zero | Light chapters get premium feel from typography, spacing, photography — not effects |

**Accent discipline:** magenta well under ~5% of any viewport. Permitted:
brand mark, primary CTA, active/focus states, the travelling signal, key
figures. Purple never exceeds atmosphere. All interactive states
(hover/focus/active/disabled) defined per theme; focus always visible.

## 3. Typography

**Not final until board review (P2-A02).** Board 02 carries a controlled
comparison — same Hero composition and copy, two systems:

### Candidate A — Archivo-led (leading candidate)

| Role | Latin | Arabic |
|---|---|---|
| Display | **Archivo** (variable: wght 100–900, wdth 62–125). SemiBold/Bold, slightly tightened; *Expanded width reserved for hero + chapter openers only* | **Noto Kufi Arabic** Bold — geometric Kufi skeleton matching Archivo's industrial rhythm at display sizes |
| Body / UI | **Inter** (400/500/600) | **IBM Plex Sans Arabic** (400–600) |
| Annotation | **IBM Plex Mono** (400/500) | IBM Plex Sans Arabic, mono-styled via size/letter-spacing token (no fake Arabic mono) |

### Candidate B — Geist-led (challenger)

| Role | Latin | Arabic |
|---|---|---|
| Display | **Geist** (700/800) — engineered neo-grotesque; maximum technical-premium authority, quieter editorial voice | **IBM Plex Sans Arabic** Bold (Geist's neutrality pairs better with Plex's engineered Arabic than with Kufi geometry) |
| Body / UI | Geist (400/500) | IBM Plex Sans Arabic |
| Annotation | IBM Plex Mono | as above |

Trade-off summary: A = stronger editorial display presence and width
flexibility, three families to govern; B = single-family coherence and
colder engineering precision, weaker large-scale editorial character. Both
are free, SIL-licensed, self-hostable via `next/font` (no commercial
dependency, no runtime CDN). **Final selection after board review; Arabic is
judged alongside Latin, never independently.**

### Shared type system (both candidates)

- Fluid clamp-based scale: `display-1` ~56→128px · `display-2` 40→88 ·
  `h1` 32→56 · `h2` 24→36 · `h3` 20→24 · `body-lg` 18→20 · `body` 16 ·
  `caption` 13 · `mono` 12–13 (uppercase, +8% tracking).
- **Numerals: Western 0–9 in both locales** (O-004 resolved). Tabular
  figures for counters so `200+` holds width while counting.
- Arabic type scale shares the same role tokens; only family and
  line-height adjust (Arabic roles run ~1.15× line-height).
- Condensed widths never used for running text; Expanded never below 40px
  size (readability guards, Q-P2-2).

## 4. Grid, spacing, composition modes

- 12-column fluid grid, 96px max gutters, content max-width 1440–1560px;
  cinematic media may run full-bleed.
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192px.
- Section vertical rhythm: editorial 128–192px; cinematic full-viewport.
- **Six composition modes** (§10 of the Master Directive), each with defined
  rules: **Cinematic** (full-bleed environment, type as image),
  **Editorial** (asymmetric, whitespace-led, max 8-col text measure),
  **Technical** (field visualizations + mono annotation layer),
  **Evidence** (oversized factual typography, real media, real numbers),
  **Immersive** (scene-scale interaction, max 3 pinned uses),
  **Structural** (strict grid for dense information; the only mode where
  card-like containers are permitted, and hairline-bordered rather than
  floating rounded boxes).
- **Adjacency rule:** no two adjacent homepage chapters share a composition
  mode (demonstrated on Board 11).

## 5. Homepage visual rhythm

| Ch | Chapter | Mode | Env |
|----|---------|------|-----|
| 01 | Opening | Immersive | Dark |
| 02 | Hero | Cinematic | Dark (continuous) |
| 03 | About | Editorial | **Light** |
| 04 | Track Record / National Signal Field | Technical–Immersive | **Dark** |
| 05 | Solutions Ecosystem | Structural–Technical | Dark (env held; composition changes: cartographic → indexical) |
| 06 | Industries | Evidence–Exploratory | **Light** |
| 07 | Selected Projects | Cinematic Evidence | **Dark** |
| 08 | Gallery | Editorial media mosaic | **Light** |
| 09 | Smart AI | Immersive | **Dark** (deepest) |
| 10 | Technology Alliances | Structural | Light |
| 11 | Clients | Evidence (distinct treatment from 10) | Light (env held) |
| 12 | Company Profile | Editorial compact | Light→dim |
| 13 | Final CTA | Cinematic close | **Dark** |
| 14 | Footer | Structural | Dark |

Environment changes follow storytelling, not mechanical alternation
(Q-P2-4): five designed seams, each with a device — **light-sweep horizon**
(02→03), **signal-trail carry-over** (03→04 and 12→13: a single magenta line
travels the seam and becomes the first element of the next scene), **masked
media reveal** (07→08), **atmospheric dim** (08→09). Never a bare
`background-color` swap.

## 6. Opening experience (narrative spec)

```text
0.0–0.4s  Darkness. Scattered particles drift in from depth — echoes of the
          logo's own dots. Mono caption: SMART CHANNELS.
0.4–1.4s  Particles converge and assemble the SC mark; magenta resolves at
          the moment of coherence. Wordmark + slogan fade beneath.
          The mark holds ~0.5s — the identity beat.
1.4–2.2s  Controlled dispersion: the mark releases; particles stream into
          topology lines and nodes — the network field forms.
2.2–2.8s  Hero typography rises inside the living field. No cut, no black
          frame: the brand becomes the environment.
```

Contract: ≤~3s; first meaningful visit; once per session; never on internal
navigation; any meaningful input skips instantly to the formed hero;
navigation never trapped; reduced-motion → static brand frame + restrained
fade; graceful static fallback when advanced rendering is unavailable.
**Technique (Canvas 2D sampling / SVG paths / WebGL) is deliberately not
chosen here** — it will be proposed with fidelity, performance, and
maintenance trade-offs after the best available logo asset is assessed,
before P4 implementation (D-001, P2-A02). The concept is not downgraded to a
logo glow (Q-P2-5).

## 7. Hero

Pure designed technology environment (Q-P2-6a) — no photography, no
low-resolution dependence. Full-bleed network field with depth-of-field
(near lines crisp, far soft); one slow magenta signal traversing at a time.
Left-anchored stacked display type (EN) / right-anchored mirrored (AR):
mono overline `SMART CHANNELS — SYSTEMS INTEGRATION`, headline, two-line
sub-headline, dual CTA (accent-filled **Explore Projects**, quiet
**Talk to Smart AI**), bottom scroll cue + rotating source-backed proof
caption (`F1 SAUDI ARABIAN GP — EVENT TECHNOLOGY`).

**Headline (P2-A03 — visually selectable, final approval after board
review).** Board 02 shows primary and one restrained alternate:

- **H1 (primary):** `TECHNOLOGY BEHIND THE EXPERIENCE.`
  AR (authored equivalent, requires approval): **«التقنية التي تصنع التجربة.»**
- **H-alt:** `CONNECT. PROTECT. EMPOWER.` (profile p. 6 verbatim-derived)
  AR: **«نصل. نحمي. نمكّن.»**

**Supporting copy scope (P2-A04):** general company positioning follows the
approved source scope — **"across the Kingdom and the Gulf"** (profile
p. 30: "…across the Kingdom and the Gulf"). "Across Saudi Arabia" is used
only where a sentence intentionally discusses Saudi national project
evidence (e.g., the National Signal Field scene). Working sub-headline
(proposed copy, requires approval): *"We design, build and manage the
intelligent technology behind connected environments across the Kingdom and
the Gulf — infrastructure, networks, security, communications and smart
buildings."*

## 8. Motion system

Dual register (approved), fully tokenized — no ad-hoc values anywhere:

- **Durations:** `micro 150/200 · control 300 · component 400–500 ·
  section 600–900 · narrative 900–1200` (ms).
- **Easing:** *Engineered* `cubic-bezier(0.2, 0, 0, 1)` (+ decel/accel
  variants) — buttons, controls, navigation, links, filters, components,
  utility. *Cinematic* `cubic-bezier(0.65, 0, 0.15, 1)` + expo-out — hero,
  major transitions, featured project, storytelling scenes.
- **Stagger:** engineered 40–60ms; cinematic 80–120ms; ≥8 children → group.
- **Distance:** micro 4–8px · component 16–24px · section 32–64px.
- **Opacity** always paired with transform. **Blur** ≤8px, narrative reveals
  only. **Scale** 0.98→1 components; media settle 1.04→1.
- Motion vocabulary: **transmission** (arrival along a direction),
  **assembly** (resolve from parts), **connection** (linked elements respond
  together). Anything that moves must express one of these.

## 9. Scroll choreography

Native scroll is the foundation. Maximum ~3 pinned/sticky narrative
sequences: ① Opening→Hero continuity, ② Solutions Ecosystem, ③ Featured
Project. Ordinary informational sections are never pinned.

## 10. National Signal Field (Track Record — Connected Earth concept)

**Approved concept; preferred over a generic 3D globe.** A stylized dark
cartographic field — Saudi Arabia abstracted into the site's node/line
language.

**Geography semantics (P2-A05):** the visualization communicates
**national reach / connected evidence**, NOT operational routing from
headquarters. Venue/project nodes form a peer evidence network
(inter-venue constellation links); **Riyadh is marked separately as `HQ`**
with a distinct ring treatment and is *not* drawn as the origin of every
connection. No unsupported office locations, no invented project locations,
no fabricated markers.

**Source-backed nodes only** (from approved project records): Makkah (Grand
Mosque) · Jeddah (King Abdullah Sports City, Al Jawhara, Prince Abdullah
Al-Faisal, FIFA Club World Cup, F1 Saudi Arabian GP, Formula E1) · Taif
(King Fahd Sports City) · Abha (Prince Sultan Sports City) · AlUla (RCU,
AlUla Tour, Camel Cup) · Diriyah (Diriyah Season) · NEOM (Sports Village) ·
Tabuk (Camel Festival) · Riyadh (HQ; Riyadh Marathon, WTA Finals, Boulevard
venues). Node labels name projects/venues, never offices.

**Track Record integration (P2-A06 — mandatory):** the four approved
counters live inside the scene as its data layer —
`200+ Projects Delivered · 7 Years of Continuous Delivery · 16+ Sectors
Served · 100+ National Venues & Events` — placed as an aligned stat band
within the field (Board 05 shows exact placement). At implementation (P6,
not P2): counters animate 0→value on viewport entry, once, suffixes
preserved, tabular figures; reduced-motion shows final values immediately.
Rendered 2D (SVG/Canvas): cartographic abstraction is cheaper, more legible,
and more honest than a WebGL globe.

## 11. Solutions Ecosystem

Editorial Index + Live Preview (Q-P2-10c). Desktop: left — the seven
families as an oversized numbered index (01–07); right — live preview
(tagline, sub-solutions, related certified vendors, `Explore →`). Behind:
ambient topology re-links as the active family changes — atmosphere only,
`aria-hidden`, never the navigation mechanism. The index is a true list of
links: keyboard navigable, understandable without animation, usable on
touch. Mobile: intentionally designed progressive disclosure (full-width
expanding rows, tap-driven, static line motif). Family pages follow
Problem → Solution → Technology → Outcome using profile-backed content.

## 12. Projects treatment

**Typographic Evidence Wall** (approved): oversized project names as the
imagery; alternating row scales; mono meta columns (sector · location ·
years, where approved); logos only where record `display: 'logo'` and
quality permits; the six stadium records render enriched with their approved
scope chips. Rows are real links prepared for future case-study pages
(D-013). No manufactured thin case studies. **Featured Project band:** one
cinematic full-width moment; selection deferred to the D-004 assessment —
composition designed now, populated later.

## 13. Media treatment (P2-A08)

Unified, **non-destructive, adaptive** presentation grade: controlled
desaturation (*direction ~10–15%, adapted per photograph — not a mandatory
universal value*), richer blacks, restrained contrast, subtle magenta
influence in highlights, extremely fine grain only in dark chapters where
justified. Authenticity outranks grade: real project photography must remain
documentary and credible; light chapters run a gentler grade preserving
daylight honesty; no image is forced excessively dark. Applied via CSS
filter/overlay tokens per context; original media files untouched.

## 14. Gallery

Editorial masonry: mixed aspect ratios (portrait phone videos sit naturally
in column flow); central-taxonomy filter pills ("All" = UI state);
image/video coexistence, poster-first videos (play glyph + duration); lazy
progressive loading; responsive columns 1/2/3/4. Accessible fullscreen
lightbox: keyboard + swipe, focus trap, ESC always works, captions/meta
where present. **Audio:** gallery videos never autoplay with sound; after
explicit Play, audio plays normally; ambient/decorative video is always
muted (Q-P2-12).

## 15. Smart AI environment (P2-A07)

The deepest-dark pocket of the journey: compact orbiting particle core (echo
of the opening mark), consultation panel, mono annotations mapping an
example enquiry to solution families. **Prototype honesty is part of the
design:** the interface carries an explicit `CONCEPT — INTEGRATION-READY UX`
status marker; the example exchange is visibly labeled as a scripted
demonstration of the intended experience; no streaming responses, no live
model status, no fake response times, no fabricated capabilities, no fake
completed conversations presented as real functionality. When an approved
backend exists, the treatment evolves. This chapter owns the site's single
soft radial glow.

## 16. Responsive strategy

Designed breakpoints 390 / 768 / 1024 / 1440 / 1920+. Mobile is a parallel
design: hover → tap/focus; horizontal scenes → vertical stacks or swipe
rails; oversized type follows the fluid scale (no truncation). **Adaptive
motion complexity** (Q-P2-13): capability tiers — *full* (full particle
physics), *lite* (reduced density/simplified physics), *static* (designed
still frames) — chosen by viewport + device capability + performance +
user preference. Canvas is not categorically forbidden on mobile; lower
capability devices get a lighter equivalent, never a punishment version.
Advanced systems pause offscreen and on hidden tabs.

## 17. Reduced-motion strategy

`prefers-reduced-motion` receives the complete site, fully understandable:
static opening brand frame; opacity-only transitions ≤300ms; no parallax, no
pins (pinned narratives become sequenced static scenes), no particle drift
(fields render as designed stills); counters render final values
immediately; carousels/lightbox move only on explicit command. The reduced
experience is designed, not merely disabled.

## 18. Board index

Static visual boards in `design/boards/` (design artifacts — not
application implementation; HTML sources for the boards live in
`design/boards/src/` for future revision):

| Board | File | Shows |
|---|---|---|
| 01 | `board-01-opening.png` | Opening particle identity — 4-frame storyboard |
| 02 | `board-02-hero-desktop.png` | Hero desktop: Candidate A vs Candidate B typography comparison (same composition/copy), H1 primary + H-alt treatment, AR mirror inset |
| 03 | `board-03-hero-mobile.png` | Hero mobile |
| 04 | `board-04-light-editorial.png` | Light editorial environment (About) |
| 05 | `board-05-signal-field.png` | Track Record + National Signal Field with counter placement |
| 06 | `board-06-solutions.png` | Solutions index + live preview, mobile disclosure inset |
| 07 | `board-07-projects.png` | Featured Project + Evidence Wall |
| 08 | `board-08-gallery.png` | Gallery masonry + lightbox inset |
| 09 | `board-09-smart-ai.png` | Smart AI — explicitly conceptual / integration-ready |
| 10 | `board-10-transitions.png` | Dark ↔ Light seam devices |
| 11 | `board-11-homepage-journey.png` | Full homepage journey strip (14 chapters, rhythm/pacing evaluation) |

All content on boards is drawn from approved sources (profile copy, approved
stats, approved contact, source-backed geography); Arabic strings on boards
are proposed copy requiring approval before publication (D-006).
