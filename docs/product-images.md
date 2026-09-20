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
| 30 | Two-Way Radio | أجهزة اتصال لاسلكي PTT | PTT Radios | held — marketing scene, JPEG (D-064) |
| 31 | Two-Way Radio | شواحن متعددة القنوات | Multi-Bay Chargers | `multi-bay-chargers.webp` |
| 32 | Specialized Systems | حساسات عدّ وتحليل | People Counting Sensors | `people-counting-sensors.webp` |
| 33 | Specialized Systems | محطات رصد جوي | Weather Stations | `weather-stations.webp` |

## Files already on disk (D-058) — kept, currently unlinked

`public/media/products/` still holds the 18 `-2026.webp` delivery files
and the 11 earlier ones (29 in total). Nothing was deleted at D-060; the
homepage stage (`src/content/products.ts`) keeps serving its four.
