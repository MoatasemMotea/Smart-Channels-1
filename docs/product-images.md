# Product catalogue imagery — intake sheet (D-060)

The categorised catalogue (`src/content/product-catalog.ts`, D-059) is
currently **unlinked from all imagery**: every product type's `image` is
`""` and every card renders the neutral placeholder. This sheet is the
working list for the next photography batch. Fill the last column as
files arrive; linking a photograph is then a one-field edit on the
type's row in `TYPES` (the image follows the TYPE, never the brand — all
cards of one type share one file).

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
| 1 | Networking | راوترات 5G | 5G Routers | |
| 2 | Networking | محوّلات أساسية | Core Switches | |
| 3 | Networking | محوّلات شبكة | Switches | |
| 4 | Networking | مقويات إشارة | Wi-Fi Extenders | |
| 5 | Networking | نقاط وصول لاسلكية | Access Points | |
| 6 | Networking | وصلات نقطة لنقطة | Point-to-Point | |
| 7 | Fiber Optics | محوّلات وسائط | Media Converters | |
| 8 | Fiber Optics | موسّعات HDMI عبر الألياف | HDMI over Fiber Extenders | |
| 9 | Fiber Optics | وحدات SFP | SFP Modules | |
| 10 | Cybersecurity | جدران حماية | Firewalls | |
| 11 | Surveillance | أجهزة التعرّف على الوجه | Face Recognition Terminals | |
| 12 | Surveillance | حوامل كاميرات | Camera Mounts | |
| 13 | Surveillance | كاميرات مراقبة | CCTV Cameras | |
| 14 | Surveillance | مسجّلات شبكية | NVRs | |
| 15 | Surveillance | وحدات فك ترميز | Decoders | |
| 16 | AV & Display | أجهزة تحكّم شاشات | Display Remotes | |
| 17 | AV & Display | شاشات فيديو وول | Video Wall Displays | |
| 18 | AV & Display | موزّعات HDMI | HDMI Splitters | |
| 19 | AV & Display | موزّعات Y | Y-Splitters | |
| 20 | AV & Display | موسّعات HDMI | HDMI Extenders | |
| 21 | AV & Display | وحدات تحكّم فيديو وول | Video Wall Controllers | |
| 22 | AV & Display | وصلات HD | HD Cables | |
| 23 | AV & Display | وصلات VGA | VGA Cables | |
| 24 | End-User Devices | أجهزة لوحية | Tablets | |
| 25 | End-User Devices | أجهزة مكتبية | Desktop PCs | |
| 26 | End-User Devices | شاشات | Monitors | |
| 27 | End-User Devices | طابعات | Printers | |
| 28 | End-User Devices | فأرات | Mice | |
| 29 | End-User Devices | لابتوب | Laptops | |
| 30 | End-User Devices | لوحات مفاتيح | Keyboards | |
| 31 | Data Storage | أقراص تخزين | Hard Drives | |
| 32 | Data Storage | ذاكرات فلاش | Flash Memory | |
| 33 | Two-Way Radio | أجهزة اتصال لاسلكي PTT | PTT Radios | |
| 34 | Two-Way Radio | شواحن متعددة القنوات | Multi-Bay Chargers | |
| 35 | Specialized Systems | حساسات عدّ وتحليل | People Counting Sensors | |
| 36 | Specialized Systems | محطات رصد جوي | Weather Stations | |

## Files already on disk (D-058) — kept, currently unlinked

`public/media/products/` still holds the 18 `-2026.webp` delivery files
and the 11 earlier ones (29 in total). Nothing was deleted at D-060; the
homepage stage (`src/content/products.ts`) keeps serving its four.
