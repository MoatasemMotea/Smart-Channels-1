# P2 Creative Direction — Static Visual Boards

Design artifacts for the Smart Channels 2026 website (P2 deliverable). These
are **direction boards, not application implementation** — the production
site is built from P3 onward against `docs/creative-direction.md`.

## Boards

| PNG | Shows |
|---|---|
| `board-01-opening.png` | Opening particle identity — 4-frame storyboard |
| `board-02-hero-desktop.png` | Hero desktop · typography comparison (Candidate A: Archivo/Inter/Plex Mono vs Candidate B: Geist/Plex Mono) · AR mirror · alternate headline |
| `board-03-hero-mobile.png` | Hero mobile EN + AR, capability tiers |
| `board-04-light-editorial.png` | Light editorial environment (About) |
| `board-05-signal-field.png` | Track Record + National Signal Field with counter placement |
| `board-06-solutions.png` | Solutions index + live preview, mobile disclosure inset |
| `board-07-projects.png` | Featured Project + Typographic Evidence Wall |
| `board-08-gallery.png` | Gallery masonry + lightbox behaviour inset |
| `board-09-smart-ai.png` | Smart AI — explicitly conceptual / integration-ready |
| `board-10-transitions.png` | Dark ↔ Light seam devices |
| `board-11-homepage-journey.png` | Full homepage journey strip (14 chapters) |

## Sources (`src/`)

Each board is a self-contained HTML file rendered to PNG with
`src/shoot.mjs` (Playwright + Chromium):

```bash
cd design/boards/src
PLAYWRIGHT_DIR=$(npm root -g)/playwright node shoot.mjs          # all boards
PLAYWRIGHT_DIR=$(npm root -g)/playwright node shoot.mjs board-05 # one board
```

- `base.css` — design tokens mirroring `docs/creative-direction.md` §2–§3
- `field.js` — deterministic (seeded) network-field renderer
- `fonts/` — self-hosted render-only copies of the candidate fonts
  (Archivo, Inter, IBM Plex Mono, Geist, Noto Kufi Arabic, IBM Plex Sans
  Arabic — all SIL OFL). **This is not the application font pipeline**;
  production font delivery is decided at P3 via `next/font`.
- `assets/` — the authoritative logo (extracted with alpha from the approved
  Company Profile PDF) and stills extracted from the supplied project
  videos. Source files in the owner's uploads and `img/` were not modified.

Notes: boards reference some legacy `img/` photos marked *candidate* in
`docs/asset-inventory.md`; their appearance on a board is not approval —
Gallery population is decided at P10 (O-008 / O-012). All Arabic strings on
boards are proposed copy requiring approval (D-006). Vendor/client names
render as text placeholders pending logo-quality assessment (D-005/O-005).
