# Smart Channels 2026 — Motion & Legibility Implementation Contract

> P2 Revision Round 1 deliverable (2026-08-27). This contract is binding on
> P4–P16 implementation. It turns the approved creative direction into
> implementation-ready choreography. Companion documents:
> `docs/creative-direction.md` (visual system) and the boards in
> `design/boards/`.
>
> Locked at this revision: **Typography = Candidate A (Archivo / Inter /
> IBM Plex Mono · Noto Kufi Arabic / IBM Plex Sans Arabic)** ·
> **Hero headline = `TECHNOLOGY BEHIND THE EXPERIENCE.`**

---

## 1. Governing rules

1. **Motion is storytelling architecture, not decoration.** Every major
   movement must communicate at least one of: **signal · connection ·
   reveal · evidence · transition · hierarchy · progression**. A movement
   that communicates none of these is cut.
2. **Cinematic grammar varies across the journey.** Quiet chapters (About,
   Alliances, Company Profile) move minimally; immersive chapters (Opening,
   Signal Field, Featured Project, Smart AI) carry the choreography. The
   contrast is the experience. The homepage must never feel like one reveal
   pattern repeated fourteen times.
3. **Forbidden patterns:** fade-up-everywhere; identical section reveals;
   free-floating decorative objects; template-like effect-library moves;
   constant ambient motion that causes fatigue; scroll-jacking of ordinary
   content.
4. **Nothing blocks the user.** No animation may delay navigation, input,
   or comprehension. Content is present and readable the moment its scene
   is on screen — choreography embellishes arrival, it never gates content.
5. **All values come from the motion tokens** (`docs/creative-direction.md`
   §8): duration scale 150–1200 ms, Engineered vs Cinematic easing
   families, stagger 40–120 ms, distances 4–64 px, blur ≤ 8 px. No ad-hoc
   numbers in components.

## 2. Capability tiers (mandatory content parity)

| Tier | Audience | Behavior |
|---|---|---|
| **FULL** | High-capability desktop, no reduced-motion | Complete choreography: particle physics, scroll-linked scenes, pointer-reactive depth, stroke-drawn signals. |
| **LITE** | Mobile / mid-capability | Same narrative with simplified physics: reduced particle counts (≈40–60% of FULL), no pointer parallax, shorter travel distances, pinned scenes replaced by sequential in-flow reveals, signal lines pre-simplified. |
| **STATIC** | `prefers-reduced-motion`, save-data, low capability, JS failure | Designed still states: static brand frame, fields as designed still images, counters at final values, opacity-only transitions ≤ 300 ms, all content and navigation identical. |

Tier selection: `prefers-reduced-motion` and save-data always win → STATIC.
Otherwise viewport + device signals (memory/cores where available) +
a first-frame performance probe pick FULL or LITE; a scene that misses its
frame budget downgrades itself gracefully at runtime. Progressive
enhancement: the server-rendered page is the STATIC experience; FULL/LITE
choreography attaches on top. JS failure therefore yields a complete site.

## 3. Performance budgets (pre-implementation, verified at P17)

- Opening + hero canvas JS: **≤ 60 KB gzipped** total, dynamically imported,
  never blocking first paint; the static brand frame is server-rendered
  HTML/CSS and is the LCP candidate.
- Any animated scene: **60 fps target on FULL, 30 fps floor on LITE**;
  below floor → tier downgrade.
- Canvas scenes pause (`cancelAnimationFrame`) when offscreen or tab
  hidden; at most **one** canvas scene animating at a time.
- Animation properties: `transform`/`opacity` (+ `clip-path` for masks)
  only on the compositor path; no layout-triggering animation. `filter`
  blur only in narrative reveals, never scroll-linked continuously.
- Scroll listeners: IntersectionObserver + rAF-throttled progress; no
  unthrottled `scroll` handlers.
- Total added motion-runtime JS for the homepage (beyond framework):
  **≤ 120 KB gzipped** budget, tracked from P4 onward.

## 4. Legibility contract (production, non-negotiable)

The boards' small technical annotations are board-caption styling and must
NOT carry into production content. Production rules:

- **Body copy:** ≥ 16 px (mobile) / 17–18 px (desktop equivalent tokens),
  line-height ≥ 1.6, measure ≤ ~70ch. Arabic body: same size tokens with
  line-height ≥ 1.8.
- **Navigation:** ≥ 14 px, full contrast (`ink` on surface), never
  letter-spaced into illegibility; touch targets ≥ 48 px.
- **Buttons/CTAs:** ≥ 14 px semibold, instantly readable labels; icon-only
  controls always have accessible names.
- **Mono/technical micro-labels** (chapter indices, meta rows): decorative
  or supporting metadata ONLY — floor 11 px, and no essential information
  may exist only at this level; anything essential is duplicated in
  standard-size text or accessible markup.
- **Muted text** (`ink-muted`): secondary content only, must still meet
  WCAG AA (4.5:1 normal / 3:1 large); low-contrast grey is never the
  default body treatment. Dark-theme muted token is tuned to ≥ 4.5:1
  against `bg`; light-theme equivalent against paper.
- **Arabic:** never smaller than its Latin counterpart role; Kufi display
  only at display sizes; UI/body always IBM Plex Sans Arabic.
- **Text over fields/media:** guaranteed by vignette/scrim tokens, verified
  at P15/P17 contrast audit. WCAG AA applies to all production UI/content.

## 5. Homepage choreography map

Notation: E = Engineered easing, C = Cinematic easing (tokens §8).
"Impl" = implementation candidate, finalized at P3/P4 with trade-offs per
D-001/Q-P2-5 where marked ◇.

### 01 · Opening — particle identity
- **Purpose:** signal → identity → environment; the brand constructs itself.
- **Entry (first meaningful visit, once/session):**
  `0.0–0.4s` multi-depth particles drift in (3 depth layers, velocity
  variation per layer, far layer slightly soft — restrained depth-of-field);
  `0.4–1.4s` physically believable convergence: particles decelerate along
  curved paths into the SC mark (C easing, per-particle stagger seeded, not
  uniform — no flat confetti); magenta resolves at coherence; wordmark
  fades in (E, 300 ms); mark holds ~500 ms;
  `1.4–2.2s` controlled dispersion: mark releases outward, particles become
  topology nodes; connection lines stroke-draw between settling nodes;
  `2.2–2.8s` hero typography rises into the live field. **No hard cut** —
  the dispersed particles ARE the hero field's initial node set.
- **Interaction:** any meaningful input (click/tap/scroll/key) → 150 ms
  crossfade to the fully-formed hero; navigation never trapped.
- **FULL:** 3-layer Canvas 2D particle system. **LITE:** 2 layers, ~50%
  particles, simplified paths, same 4 beats. **STATIC:** server-rendered
  brand frame, 300 ms opacity fade to hero.
- **Impl ◇:** Canvas 2D (particles) + SVG (line strokes); technique/fidelity
  proposal goes to owner after logo-asset assessment before P4 build.
- **Constraints:** ≤ 3 s; session-flagged; zero contribution to LCP (static
  frame is the LCP); JS chunk dynamically imported.

### 02 · Hero — kinetic reveal
- **Purpose:** hierarchy + signal; the claim arrives like a transmission.
- **Entry (continuous from 01; on later visits runs standalone):** staged
  sequence — eyebrow overline types/fades in (E 300 ms) → headline lines
  rise per-line with 90 ms stagger (C 700 ms, 40 px, slight blur-out) →
  **EXPERIENCE.** resolves last: arrives muted, then magenta sweeps through
  it once (C 500 ms) — the accent is earned on-screen → supporting copy
  (E 400 ms) → CTAs (E 400 ms, 60 ms stagger) → proof caption + scroll cue
  (E 300 ms). Total ≈ 1.6 s after field is live; content readable from the
  first frame of each element.
- **Ambient:** field alive but controlled — slow node drift, one signal
  route travelling at a time (≥ 8 s period); FULL adds restrained
  pointer-reactive depth (max 12 px translation, eased, disabled for
  keyboard/touch and reduced-motion).
- **Scroll/exit:** field parallaxes at 0.85× against type; hands off into
  Seam A (see §6).
- **FULL:** as above. **LITE:** same staged reveal, no pointer depth,
  lighter field. **STATIC:** all hero content rendered, single 300 ms fade.
- **Impl:** CSS/WAAPI for type stages; Canvas field shared with 01.

### 03 · About — quiet editorial
- **Purpose:** trust through restraint after the immersive opening.
- **Entry:** deliberately quiet — headline rises once (C 600 ms), photo
  unmasks laterally (clip-path, C 700 ms), capability list draws its
  hairlines (E 400 ms, 60 ms stagger). Nothing else moves.
- **Scroll:** none (native flow). **Interaction:** link/hover states only.
- **LITE:** same, shorter distances. **STATIC:** rendered, no motion.
- **Impl:** CSS only. This is a designated "quiet scene" — its stillness
  frames the neighbors.

### 04 · Track Record — National Signal Field
- **Purpose:** evidence; number and geography make one claim.
- **Entry (viewport-triggered, once):** coordinated narrative —
  ① land dot-matrix fades up (C 500 ms);
  ② venue nodes activate in delivery order (E, 80 ms stagger, glow pop);
  ③ evidence constellation links stroke-draw progressively between venues
  (SVG dash animation, C 900 ms overlapping);
  ④ one signal travels a drawn route;
  ⑤ Riyadh HQ ring draws separately (distinct — never a hub);
  ⑥ labels reveal with controlled timing (E 300 ms each, following their
  node);
  ⑦ counters count up `0→200+ · 0→7 · 0→16+ · 0→100+` **in sync with the
  link-drawing** (≈1.4 s, ease-out, tabular figures, suffixes preserved),
  resolving as the last links complete. Counters never restart on re-entry.
- **Scroll:** scene enters in-flow (not pinned). **Interaction:** none
  required; nodes are decorative duplicates of accessible text content.
- **FULL:** full sequence. **LITE:** fewer land dots, links draw in 2
  groups, same counter sync. **STATIC:** all nodes lit, links drawn,
  counters at final values immediately.
- **Impl:** SVG (map, links, labels) + rAF counter; no canvas needed.

### 05 · Solutions Ecosystem
- **Purpose:** connection — selection visibly reconfigures the system.
- **Entry:** index rows reveal with hairline draws (E, 60 ms stagger);
  preview panel unmasks (C 500 ms); ambient topology fades behind.
- **Interaction (hover/focus/keyboard — all equivalent):** selecting a
  family → active row ink/accent swap (E 200 ms); preview content
  crossfades per-block (E 250 ms, 40 ms stagger: tagline → sub-solutions →
  vendors); **topology reconfigures**: nodes re-link toward a new
  constellation shape and one signal re-routes from the active index row
  toward the preview panel (C 600 ms) — motion literally connects family
  to preview. `aria-hidden` on the topology; `aria-live="polite"` on the
  preview.
- **Scroll:** pinned exploration permitted on desktop FULL only (one of the
  ≤ 3 pinned scenes) — index scrubs through families as the user scrolls
  the pinned range; a visible "skip" affordance and normal click/keyboard
  selection always work. LITE/mobile: never pinned — tap-based progressive
  disclosure (accordion), one family open at a time.
- **STATIC:** all families listed, first preview rendered, selection swaps
  instantly with no transitional motion.
- **Impl:** CSS/WAAPI for UI; Canvas or SVG for topology (P3 decision);
  pinning via position:sticky + rAF progress (library need assessed at P3).

### 06 · Industries
- **Purpose:** exploration; scale of sectors.
- **Entry:** active industry name rises as one mass (C 700 ms); meta line
  and secondary industry names follow (E, staggered).
- **Interaction:** selecting an industry (tap/click/keyboard; hover
  preview on desktop) crossfades the large name with a horizontal wipe
  (C 450 ms) and updates meta; no hover-only behavior.
- **LITE:** same, no wipe — crossfade. **STATIC:** instant swap.
- **Impl:** CSS only.

### 07 · Selected Projects — dual mode
- **Purpose:** evidence made cinematic.
- **Mode A — Cinematic Featured (records WITH approved media; D-013):**
  scroll-driven media reveal: the media window opens from a masked strip to
  large scale as the scene enters (clip-path inset animation, C, scroll-
  linked over ~60 vh on FULL); project title choreographs over it in two
  staggered lines; scope/services chips draw in sequence (E, 60 ms);
  year/period and location meta follow. Multiple media items advance as a
  horizontal cinematic rail (drag/swipe + buttons; scroll-linked advance on
  FULL only). Exit: the active media item's edge carries into the next
  record — project-to-project transitions are masked wipes, not cuts.
  **This mode is mandatory for featured projects once authentic approved
  media exists — major projects are not reduced to typography (Revision-1
  §7).**
- **Mode B — Evidence Wall (records without approved media):** rows reveal
  with hairline draws + name rise (E, 70 ms stagger); enriched rows unfold
  their scope chips on entry; hover/focus slides the row arrow (E 200 ms).
- **Pinned budget:** the Featured reveal is the third permitted pinned
  scene (FULL desktop only); LITE plays the same reveal as a non-pinned
  entry animation. **STATIC:** media at final size, all text rendered.
- **Impl:** CSS clip-path + WAAPI; scroll-linking via sticky + rAF; GSAP
  admitted here only if the P4 spike shows rAF choreography insufficient —
  decided with evidence at P3/P9, never by default.

### 08 · Gallery
- **Purpose:** living archive; media density with calm behavior.
- **Entry:** tiles reveal bottom-up in viewport order (E 350 ms, 50 ms
  stagger capped at 8 — later tiles reveal as they enter, no all-at-once).
- **Filtering:** FLIP reflow — surviving tiles glide to new positions
  (E 350 ms), leaving tiles fade-scale out (200 ms), entering fade in;
  filter pill state change is instant. LITE: fade-only reflow. STATIC:
  instant reflow.
- **Video:** poster → playback: play affordance scales on press (E 150 ms),
  poster crossfades into playing video (250 ms); sound only after this
  explicit Play (Q-P2-12).
- **Lightbox:** open = source-tile zoom transition into viewer (C 400 ms,
  transform-only FLIP); close reverses to the originating tile; keyboard
  ←/→ slide 24 px + crossfade (E 250 ms), ESC always instant; touch swipe
  follows the finger 1:1 then settles (E). Focus trapped while open,
  returned on close.
- **Owner rule:** all behavior is driven by `gallery.ts` data — adding
  media never touches components (D-008/A-005).
- **Impl:** CSS + FLIP utility (small, hand-rolled); no gallery library.

### 09 · Smart AI
- **Purpose:** the system listens — ambient, reactive, honest.
- **Entry:** deepest-dark pocket dims in (Seam D); particle core orbits
  slowly; consultation panel rises (C 500 ms); mapping lines
  (need → solution family) stroke-draw one by one (E, 120 ms stagger).
- **Ambient/reactive:** the field around the core breathes at low
  amplitude; on input-bar focus the core's orbit tightens and one signal
  routes from the bar toward the core (E 400 ms) — the environment reacts
  to intent. Prototype state stays explicit per P2-A07 (badge + scripted
  demonstration label are part of the design).
- **LITE:** static core with CSS pulse, no reactive field. **STATIC:**
  fully rendered panel, no ambient motion.
- **Impl:** Canvas 2D core (shares the field system) + CSS.

### 10 · Technology Alliances — quiet structural
- **Entry:** rail rows fade/rise once (E 300 ms, small stagger). Logos:
  grayscale at rest → brand color on hover/focus (E 200 ms). No marquee
  unless it passes accessibility (pausable, non-essential). A quiet scene.

### 11 · Clients — evidence statement
- **Entry:** trust statement rises per-line (C 600 ms, 80 ms stagger) —
  the one typographic flourish in the light tail; client names reveal as a
  single quiet block (E 300 ms). Distinct treatment from 10 (§23).

### 12 · Company Profile — quiet editorial
- **Entry:** single rise (C 500 ms); buttons E-standard. Quiet by design;
  the calm before the closing scene.

### 13 · Final CTA — convergence
- **Purpose:** progression completed; every signal arrives here.
- **Entry:** the field returns via Seam B (signal-trail carry-over from
  12); multiple faint signal routes converge from the edges toward the
  center over ~1.2 s (C); "Let's build it **together.**" rises; the
  converged signals resolve into a subtle ring behind the CTA button;
  CTA pulses **once** (scale 1→1.03→1, C 600 ms) and then rests.
- **LITE:** two routes, same beats. **STATIC:** rendered final state.
- **Impl:** SVG routes + CSS.

### 14 · Footer — structural, still
- **Entry:** none beyond page flow. Utility motion only (link hover E
  150 ms). The journey ends at rest.

## 6. Dark ↔ Light seam mapping (homepage boundaries)

| Seam | Boundary | Device | Behavior (FULL) |
|---|---|---|---|
| A | 02 Hero → 03 About | **Light-sweep horizon** | Field settles to a horizon; one magenta sweep crosses; paper rises beneath (scroll-linked, C register). |
| B | 03 About → 04 Signal Field | **Signal-trail carry-over** | One magenta line exits the About column, crosses the seam, and becomes the first drawn constellation link of the Field. |
| C | 07 Projects → 08 Gallery | **Masked media reveal** | The featured record's final media window expands until its light surround becomes the Gallery paper environment. |
| D | 08 Gallery → 09 Smart AI | **Atmospheric dim** | Daylight dims through the controlled gradient into the deepest dark; purple atmosphere at its permitted maximum. |
| E | 12 Profile → 13 Final CTA | **Signal-trail carry-over** (reprise of B) | The line that opened the dark world closes it — same device, deliberate echo. |

Boundaries not listed (04→05, 05→06, 06→07, 09→10, 10→11, 11→12, 13→14)
change composition, not environment, or move within the light tail — they
use standard section entries only. **No seam is ever a bare
`background-color` swap**; STATIC tier renders seams as designed static
gradients with opacity-only progression.

## 7. Implementation-candidate summary

| System | Candidate | Rationale |
|---|---|---|
| Opening particles / hero field / AI core | Canvas 2D (◇ final proposal after logo assessment, D-001) | One shared, seeded particle system; WebGL not justified at this scale |
| Signal lines, constellation, map | SVG stroke-draw | Crisp at any DPI, cheap, accessible to mask |
| Type reveals, UI states, quiet scenes | CSS / WAAPI | Compositor-only, zero dependency |
| Counters | rAF + tabular figures | 20 lines, no library |
| Gallery reflow / lightbox | FLIP (hand-rolled) | Transform-only, no gallery lib |
| Scroll-linked scenes (Solutions, Featured, seams) | position:sticky + IntersectionObserver + rAF progress; CSS scroll-driven animations progressive enhancement | Native-first |
| GSAP (or equivalent) | **Admitted only for 07 Featured choreography if the P4/P9 rAF spike fails**; decision made with evidence at P3/P9 | §32/§39 Overengineering guard |
| WebGL / Three.js | **Not used at launch** | No scene requires it; cost unjustified |

## 8. Verification hooks

- P4+ every phase report states which tier behaviors were implemented and
  visually verified (FULL on desktop viewport, LITE on 390 px, STATIC via
  emulated `prefers-reduced-motion`).
- P15/P17 audit this contract: budgets (§3), legibility (§4), tier parity
  (§2), seam devices (§6).
- Deviations from this contract require an explicit owner decision recorded
  in `docs/decision-log.md`.
