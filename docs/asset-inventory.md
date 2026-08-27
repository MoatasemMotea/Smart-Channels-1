# Smart Channels 2026 Website — Asset Inventory & Gap Register

> P0 discovery findings, recorded at P1 (2026-08-27).
> Statuses: **approved** (owner-cleared for the stated use) · **candidate**
> (usable pending owner approval) · **rejected** (not for the new build) ·
> **gap** (needed but not available).
>
> Per Master Directive §4: source assets have NOT been renamed, transformed,
> compressed, or moved. Ingestion into the target structure happens at P3+
> with owner approval. Per D-005: unacceptable logo extraction quality is
> recorded here as a gap — never silently substituted.

---

## 1. Company Profile

| Asset | Details | Status |
|---|---|---|
| `Smart_Channels_Profile_2282026.pdf` (uploaded source, 31 pp, 2.9 MB, English) | Primary source of truth for all corporate content. Fully read at P0. Also the launch download document (Q11). | **approved** — content source + EN download |
| Arabic Company Profile PDF | Does not exist in sources. Data slot modeled (`documents.ts`); no placeholder shown (Q11). | **gap** (O-007) |

Content provided by the profile (page refs): About/positioning (3), message &
mission (4), what we do (5), 7 solution families with sub-solutions (6–20),
Track Record figures (21–22), 16 sectors (23), ~30 named projects with logos
(24–25), sports cities & stadiums with years + delivered scope (26),
~42 technology-alliance logos (27–28), ~27 client logos (29–30), approved
contact details (31).

## 2. Brand / logo

| Asset | Details | Status |
|---|---|---|
| High-res logo image (chat upload): pink/magenta "SC splash" mark, purple particle dots, wordmark, slogan "we take you to the future" | Authoritative identity reference (D-001). Raster, light-background composition. | **approved** as identity reference |
| Logo as rendered in profile PDF (cover p.1 dark variant, closing p.31) | Shows dark-background usage. | **candidate** reference for dark treatments |
| `img/Logo.jpg` (repo, 10 KB JPEG, baked white background) | Legacy low-res web logo. Not usable in the new build. | **rejected** |
| Vector logo (SVG/AI/EPS), official variants (white/mono) | Not supplied. Required (or a formally approved substitute path) for crisp UI usage and the opening animation. Per D-001 no automatic tracing — method proposal to owner first if needed. | **gap** (O-001, blocks parts of P2/P4) |
| Orange/red SC mark seen on field vests | NOT an official variant unless owner approves (D-001). | **rejected** for brand use |

## 3. Photography

### Chat-uploaded field photography

| Asset | Details | Status |
|---|---|---|
| Al Nassr FC / Alawwal Park press-conference room, technician in SC vest | Strong evidence photo (venues work). Client signage visible — usage rights to confirm (O-012). | **candidate** — gallery / evidence |
| Ceiling CCTV installation, "SMC vibes" office visible | Authentic delivery photo. Client-identifying signage — permission to confirm (O-012). | **candidate** — gallery |
| Patch-panel rack work, technician in SC vest (orange/red logo variant visible) | Excellent authentic infrastructure photo. Vest logo variant note per D-001. | **candidate** — gallery / about / hero support |

### Legacy repo `img/` (24 files) — all pending owner confirmation of origin (O-008)

Candidates (appear to be genuine field/infrastructure photography):

| File | Apparent content | Status |
|---|---|---|
| `Network closet.jpg` | Rack/closet cabling | **candidate** |
| `Network infrastructure.jpg` | Infrastructure work | **candidate** |
| `Cable solutions.jpg` | Cabling | **candidate** |
| `network communications and cabling.jpg` | Cabling work | **candidate** |
| `Routers.jpg` | Network hardware | **candidate** |
| `Servers.jpg` | Server room | **candidate** |
| `Surveillance Cameras.jpg` | CCTV | **candidate** |
| `Dallmayr CCTV system.jpg` | CCTV installation (client name in filename — verify) | **candidate** |
| `Access control.jpg` | Access control | **candidate** |
| `Fingerprint.jpg` | Biometrics (note: byte-identical size to Access control.jpg — likely duplicate) | **candidate** |
| `Wifi.jpg` | Wireless | **candidate** |
| `cwe audio and video solution in eevents.jpg` | Event AV | **candidate** |
| `data and specialized systems.jpg` | Systems | **candidate** |
| `Management devices.jpg` | Devices | **candidate** |

Rejected for the premium build (generic hardware-catalog character, risks
"Corporate PDF Syndrome" §39):

| File | Status |
|---|---|
| `PC.jpg`, `Printers.jpg`, `Printers1.jpg`, `Peripherals.jpg`, `Point of sale device.jpg`, `Point of contact.jpg` | **rejected** (owner may override per image) |
| `gradient (1).png` | **rejected** — legacy purple-gradient background art, explicitly against §1 |

### Photography gaps

| Need | Status |
|---|---|
| Hero-grade cinematic photography (1080p+ landscape) | **gap** (O-006) — D-007 hybrid direction compensates |
| Industry-specific imagery (16 sectors) | **gap** — industries render typographic/technical until approved imagery exists (Q3) |
| Per-project photography for future case studies | **gap** (O-003 / D-004) |

## 4. Video

| Asset | Technical | Apparent content | Status |
|---|---|---|---|
| `1.mp4` (chat upload) | 848×464 landscape, h264+aac, 79 s, ~1.5 Mbps | Event-site build/walkthrough (2025 forum environment, Riyadh): branded hoardings, rigging, **fiber-splicing close-up by SC technician**, night boulevard | **candidate** — gallery; splicing segment is the strongest "technology behind the experience" moment |
| `2.mp4` (chat upload) | 464×848 portrait, h264+aac, 25 s | Night event dressing — branded pylons with screens (tennis event) | **candidate** — gallery (portrait rail) |
| `3.mp4` (chat upload) | 464×848 portrait, h264+aac, 31 s | Night hospitality/heritage walkway, lanterns, palms | **candidate** — gallery (portrait rail) |

Constraints (D-007): phone-grade ≤848 px sources must NOT be upscaled into
full-screen hero backgrounds. Correct usage: gallery tiles, portrait rails,
inset evidence moments. All gallery videos are poster-first, lazy,
play-on-intent (§20).

| Need | Status |
|---|---|
| Hero-grade ambient video (≥1080p, landscape, cinematic) | **gap** (O-006) |
| Video posters | To be auto-generated by the documented media utility (A-005, by P10); manual override supported |

## 5. Project, partner & client logos

| Asset group | Details | Status |
|---|---|---|
| ~30 project logos (PDF pp. 24–25) | Embedded in PDF at presentation resolution. Per-record `display` control ('logo' / 'text-only' / 'hidden') exists regardless (D-003/A-004). | **candidate** — extraction quality to assess at P12 prep; failures become gaps, never internet substitutes |
| ~42 technology-alliance logos (PDF p. 28) | Same constraints. | **candidate** (O-005) |
| ~27 client logos (PDF p. 30) | Same constraints. | **candidate** (O-005) |
| Standalone vendor-approved logo files | Not supplied. | **gap** (O-005) — preferred over PDF extraction where obtainable from owner |

## 6. Legacy code (context, not assets)

| Item | Status |
|---|---|
| `index.html`, `style.css`, `index.js` (root) | **rejected** for reuse; replaced at P3 per D-012 (git history preserves them) |

## 7. Target asset structure (created at P3 — nothing moved yet)

```text
public/
  brand/                  logo files, favicons, OG base art
  media/
    hero/                 hero media (pending O-006 / P2 direction)
    gallery/              gallery images + videos (owner-managed, D-008)
    posters/              video posters (auto-generated; manual override wins)
    projects/             future case-study media (A-003)
  partners/               alliance logos
  clients/                client logos
  docs/                   downloadable documents (EN profile; AR slot later)
```

**Naming convention:** lowercase-kebab, content-descriptive
(`alawwal-park-press-room.jpg`, `fiber-splicing-riyadh-2025.mp4`). Applied at
P3 ingestion; originals preserved in git history. Optimized derivatives are
produced by documented, reproducible scripts — never by untracked hand edits.

## 7b. P3 ingestion status (2026-08-27)

Executed under Q-P3-7 / Amendment 3 — committing ≠ publishing:

| Asset | Now lives at | Status |
|---|---|---|
| Company Profile 2026 EN PDF | `media-source/documents/` + public download copy `public/docs/company-profile-2026-en.pdf` | **approved & published** (Q11) |
| Video 1 (event/network build, 79s) | `media-source/video/event-network-build-2025.mp4` | archived; gallery **candidate, published: false** (O-008/O-012) |
| Video 2 (night event environment, 25s) | `media-source/video/event-environment-night.mp4` | archived; candidate, published: false |
| Video 3 (hospitality walkway, 31s) | `media-source/video/hospitality-walkway-night.mp4` | archived; candidate, published: false |
| Master logo extraction (1147×939, alpha) | `media-source/brand/logo-master-extracted.png` + web copies `public/brand/logo-dark.png`, mark crop `logo-mark.png`, favicon | **approved** (D-001 authoritative asset) |
| Legacy `img/` (22 files after gradient deletion) | unchanged in `img/` | pending O-008 review; not referenced by the application |

New gaps recorded: **O-013** (official light-background logo lockup), **O-014** (two illegible p.30 client names — omitted from clients data pending owner confirmation).

## 8. Asset Gap Register (live summary)

| Gap | Open item | Blocks |
|---|---|---|
| Vector logo + official variants | O-001 | Parts of P2 (brand system), P4 (opening animation) |
| Hero-grade photo/video | O-006 | P5 media selection (mitigated by D-007) |
| Partner/client standalone logos or acceptable extractions | O-005 | P12 quality bar |
| Arabic Company Profile PDF | O-007 | Nothing (EN-only shown per Q11) |
| Industry imagery | — | Richer industry visuals (non-blocking) |
| Owner confirmation: legacy `img/` origins | O-008 | Gallery population (P10) |
| Owner confirmation: client-identifying imagery rights | O-012 | Gallery population (P10) |
