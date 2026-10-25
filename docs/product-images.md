# Product catalogue imagery — intake sheet (D-060 · D-064 · D-066 · D-071)

The categorised catalogue (`src/content/product-catalog.ts`, D-059) is
linked type by type as photographs arrive: the image follows the TYPE,
never the brand — all cards of one type share one file. This sheet is
the working list. The last column names the delivery file under
`public/media/products/` for every linked type, or says why a supplied
file is held; an empty cell means nothing has been supplied yet.
Linking a photograph is a one-field edit on the type's row in `TYPES`.

## Specification

| | |
|---|---|
| Format | **WebP** |
| Background | **transparent** (real alpha channel — no baked white) |
| Width | **~600 px** |
| Aspect | **4:3** |
| Content | the product only — no model number, no brand overlay, no text |

## Intake path

`media-source/images/products-intake/` — the same drop-box used for the
D-058 batch. (Not created in advance; created when the batch is ready.)
Delivery derivatives are produced into `public/media/products/` on NEW
paths (D-053) — a path is never reused for different bytes.

## The 36 product types

| # | Category | النوع | Type | File |
|---|---|---|---|---|
| 1 | Networking | راوترات 5G | 5G Routers | `routers-5g.webp` |
| 2 | Networking | محوّلات أساسية | Core Switches | `core-switches.webp` |
| 3 | Networking | محوّلات شبكة | Switches | `switches.webp` |
| 4 | Networking | محوّلات PoE | PoE Switches | `poe-switches.webp` |
| 5 | Networking | مقويات إشارة | Wi-Fi Extenders | `wifi-extenders.webp` |
| 6 | Networking | نقاط وصول لاسلكية | Access Points | `access-points.webp` |
| 7 | Networking | وصلات نقطة لنقطة | Point-to-Point | `point-to-point.webp` |
| 8 | Networking | خزائن شبكات | Network Racks | `network-racks.webp` |
| 9 | Fiber Optics | محوّلات وسائط | Media Converters | `media-converters.webp` |
| 10 | Fiber Optics | موسّعات HDMI عبر الألياف | HDMI over Fiber Extenders | `hdmi-over-fiber.webp` |
| 11 | Fiber Optics | وحدات SFP | SFP Modules | `sfp-modules.webp` |
| 12 | Cybersecurity | جدران حماية | Firewalls | `firewalls.webp` |
| 13 | Surveillance | أجهزة التعرّف على الوجه | Face Recognition Terminals | `face-recognition.webp` |
| 14 | Surveillance | كاميرات مراقبة | CCTV Cameras | `cctv-cameras.webp` |
| 15 | Surveillance | مسجّلات شبكية | NVRs | `nvr-catalog.webp` |
| 16 | Surveillance | وحدات فك ترميز | Decoders | `decoders.webp` |
| 17 | AV & Display | شاشات فيديو وول | Video Wall Displays | `video-wall-displays.webp` |
| 18 | AV & Display | موزّعات HDMI | HDMI Splitters | `hdmi-splitters.webp` |
| 19 | AV & Display | موسّعات HDMI | HDMI Extenders | `hdmi-extenders.webp` |
| 20 | End-User Devices | أجهزة لوحية | Tablets | `tablets.webp` |
| 21 | End-User Devices | أجهزة مكتبية | Desktop PCs | `desktop-pcs.webp` (replacement, D-071) |
| 22 | End-User Devices | طابعات | Printers | `printers-catalog.webp` |
| 23 | End-User Devices | فأرات | Mice | `mice.webp` (replacement, D-071) |
| 24 | End-User Devices | لابتوب | Laptops | `laptops.webp` |
| 25 | End-User Devices | لوحات مفاتيح | Keyboards | `keyboards.webp` (replacement, D-071) |
| 26 | Storage & Servers | خوادم | Rack Servers | `rack-servers.webp` |
| 27 | Storage & Servers | مصفوفات تخزين | Storage Arrays | `storage-arrays.webp` |
| 28 | Storage & Servers | أقراص تخزين | Hard Drives | `hard-drives.webp` |
| 29 | Storage & Servers | ذاكرات فلاش | Flash Memory | `flash-memory.webp` |
| 30 | Two-Way Radio | أجهزة اتصال لاسلكي PTT | PTT Radios | `ptt-radios.webp` — owner exception (D-071): marketing scene with text, no alpha; replaced when a cut-out arrives |
| 31 | Two-Way Radio | شواحن متعددة القنوات | Multi-Bay Chargers | `multi-bay-chargers.webp` |
| 32 | Specialized Systems | حساسات عدّ وتحليل | People Counting Sensors | `people-counting-sensors.webp` |
| 33 | Specialized Systems | محطات رصد جوي | Weather Stations | `weather-stations.webp` |

## Files already on disk (D-058) — kept, currently unlinked

`public/media/products/` still holds the 18 `-2026.webp` delivery files
and the 11 earlier ones (29 in total). Nothing was deleted at D-060; the
homepage stage (`src/content/products.ts`) keeps serving its four.

**D-088:** five of the earlier files had no reference anywhere in the code
and were deleted from `public/` by owner decision: `01-switch.webp`,
`02-access-points.webp`, `03-camera.webp`, `firewall-interim.webp` and
`multi-charger-t60.webp`. Their originals stay in
`media-source/images/products/` (`.jpg` / `.png`).

## وسائط المقدمة — Intro media (D-085)

Source: a video generated with Gemini, supplied by the owner (uploaded 2026-10-24 as
`media-source/intro-original.mp4.mp4`). Archived untouched as
`media-source/video/intro-original.mp4` — 10.0 s · 1280×720 · H.264 High · 24 fps ·
AAC stereo 48 kHz 128k · 3,327,900 bytes. Content: a pink/violet particle swirl that
resolves into the SC mark, the “Smart Channels” wordmark and the tagline “we take you
to the future”, then a zoom into the mark; light radial background throughout.

| File (`public/media/intro/`) | Encoding | Size (bytes) |
|---|---|---|
| `intro.mp4` | H.264 High · CRF 25 · yuv420p · AAC 96k · `+faststart` | 1,330,673 |
| `intro.webm` | VP9 · CRF 36 · `-b:v 0` · Opus 80k | 925,435 |
| `intro-poster.jpg` | first frame · `-q:v 3` | 8,480 |

Encoded with the system ffmpeg (not a project dependency).

## قاعدة الفيديو الدائمة — Permanent video rule (D-086)

**Every video enters `public/media/` only after encoding with these settings.**
Its original goes to `media-source/` first and is never touched; the
delivery file is encoded from that original.

| Setting | Value |
|---|---|
| Codec | H.264 High, `yuv420p`, `-preset slow`, `-movflags +faststart`, `-map_metadata -1` |
| Size | long edge ≤ 1280 px: landscape ≤ 1280×720, portrait ≤ 720×1280; never upscaled |
| Quality | `-crf 28`. If the result exceeds its budget, keep CRF 28 and cap the peaks (`-maxrate`/`-bufsize`, 2× buffer) rather than lowering resolution or raising CRF. |
| Audio | removed (`-an`) unless the page lets the visitor hear it, otherwise AAC 96k |
| Budget | ≤ 2.5 MB per Solutions film · ≤ 4 MB per Gallery video |
| WebM (VP9 CRF 36, `-b:v 0`) | only when clearly smaller (≥ 25%); at D-086 it was not (−16% / +58% / +19%), so none ships |
| Playback | `LazyVideo` (poster, `preload="none"`): downloads only while on screen, released when it leaves; no `preload="auto"` anywhere except the D-085 intro |

Reference command (landscape, silent):
`ffmpeg -i media-source/…/source.mp4 -an -vf "scale='min(1280,iw)':-2" -c:v libx264 -profile:v high -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart -map_metadata -1 public/media/…/name.mp4`

### Before / after (D-086, encoded from the media-source originals)

| File (`public/media/`) | Before | After | Delivery |
|---|---|---|---|
| solutions/01-infrastructure-data-centre-web.mp4 | 2.7 MB (1920×1080) | 0.41 MB | 1280×720 · no audio |
| solutions/02-networking-connectivity-web.mp4 | 16.3 MB (1920×1080) | **3.31 MB** | 1280×720 · no audio · CRF 28 + `-maxrate 900k`: over budget, see note |
| solutions/03-security-technology-solutions-web.mp4 | 2.9 MB (1080×1920) | 0.68 MB | 720×1280 · no audio |
| solutions/04-biometrics-access-control-web.mp4 | 10.1 MB (1920×1080) | 1.98 MB | 1280×720 · no audio |
| solutions/05-audio-visual-solutions-web.mp4 | 3.7 MB (1080×1920) | 0.74 MB | 720×1280 · no audio |
| solutions/06-unified-communications-smart-buildings-web.mp4 | 7.3 MB (1920×1080) | 2.47 MB | 1280×720 · no audio |
| solutions/07-video-surveillance-ai-solutions-web.mp4 | 6.0 MB (1920×1080) | 1.00 MB | 1280×720 · no audio |
| gallery/event-environment-night.mp4 | 4.0 MB | 1.12 MB | 464×848 · AAC 96k (the carousel can unmute) |
| gallery/event-network-build-2025.mp4 | 14.1 MB | 3.68 MB | 848×464 · AAC 96k · CRF 28 + `-maxrate 300k` — **deleted from `public/` at D-088** with its poster (the record is unpublished); the original stays in `media-source/video/` |
| gallery/hospitality-walkway-night.mp4 | 5.3 MB | 1.70 MB | 464×848 · AAC 96k |
| **Total** | **72.4 MB** | **17.1 MB** | −76% |

Note on 02: 30 s of dense, constantly moving HUD lines. At 2.5 MB (`-maxrate 620k`) the fine lines visibly block and smear; at 960 px and CRF 28 it is 4.12 MB; VP9 is 11 MB. 1280 px with a 900k cap (3.31 MB) is visually equivalent at the stage's display size (751×470 px) and was chosen over a visible loss.

## Derived brand and hero files (D-086)

Each is cut from an untouched source; the source stays where it is and keeps serving where noted.

| File | Derived from | How | Size |
|---|---|---|---|
| `public/brand/logo-dark-lockup.webp` | `public/brand/logo-dark.png` (1147×939, 497,008 B) | Lanczos scale to 156×128 (2× its largest display, the 64 px footer), **lossless** WebP with alpha: same shape and colours | 13,420 B |
| `public/brand/logo-mark-small.webp` | `public/brand/logo-mark.png` (610×660, 259,334 B) | Lanczos scale to 104×112, lossless WebP with alpha | 10,268 B |
| `public/media/hero/riyadh-portrait-529.webp` | `media-source/images/riyadh-skyline-hero-approved-2026-08-29.webp` (1672×941) | crop x 913–1442 × full height (9:16, centred on the Kingdom Centre at 70.4%), native pixels (no upscale), WebP q74 | 52,364 B |

The header and footer use the two logo derivatives. The PNG originals stay in `public/brand/`, and `logo-dark.png` remains the Organization JSON-LD logo. The portrait crop is served by `<picture>` only under `(orientation: portrait) and (max-aspect-ratio: 9/16)` and placed in the hero frame at its original position, so the network overlay stays registered. Wider screens keep the landscape set.

### D-085R — the intro in two cuts

The owner supplied two shorter cuts (7.6 s, final zoom removed) plus a portrait poster, uploaded to `media-source/` and **moved as delivered** to `public/media/intro/` (no re-encode: both are already H.264 High, faststart, AAC ~96k). The 10 s original stays in `media-source/video/intro-original.mp4`. `intro.mp4` and `intro.webm` were deleted.

| File (`public/media/intro/`) | Source | Size (bytes) |
|---|---|---|
| `intro-portrait.mp4` | owner cut · 720×1280 · 25 fps · 7.6 s · AAC | 672,493 |
| `intro-landscape.mp4` | owner cut · 1280×720 · 24 fps · 7.6 s · AAC | 984,876 |
| `intro-portrait-poster.jpg` | owner poster · 720×1280 (uploaded as `intro-portrait-poster.jpg.jpg`) | 7,810 |
| `intro-poster.jpg` | first frame of `intro-landscape.mp4`, `-q:v 3` | 8,300 |

Under `(orientation: portrait)` the browser fetches the portrait cut and poster, otherwise the landscape ones: one video file per visit. Playwright's Chromium has no H.264, so the intro smoke tests answer these requests with `tests/smoke/fixtures/intro-test.webm`, a 320 px VP9 copy of the landscape cut (102,510 B). That file is a test fixture only and never served by the site.

## صور المشاركة — Share images (D-088 · SEO-10)

| File | Source | Bytes |
|---|---|---|
| `public/og/og-ar.png` | `scripts/generate-og.ts` · 1200×630 · `logo-dark.png` + the Arabic home title in Noto Kufi Arabic (`media-source/fonts/notokufi-5.woff2`, OFL) | 183,606 |
| `public/og/og-en.png` | same · the English home title in Archivo (`public/fonts/archivo-3.woff2`) | 187,445 |

One image per locale for now, used as `og:image` and `twitter:image`
(`summary_large_image`) on every page. The text is the existing
`home.title`; re-run `npx tsx scripts/generate-og.ts` when it changes.
Chromium screenshots carry no EXIF/XMP/IPTC, and the SEC-12 unit test
(`tests/unit/image-metadata.test.ts`) checks every image in `public/`.
