# Products media — owner mapping & provenance manifest (D-052)

**Rounds:** owner delivery 1 (`4e4d7ae`, 2026-08-31) and delivery 2
(`aee014b`, 2026-08-31, integrated per the owner's decision message the
same day). Sources are never served; public delivery derivatives live
under public/media/products/ (WebP, metadata-stripped, aspect ratios
preserved, **never upscaled**, no AI enhancement/regeneration, no
product manipulation, no branding edits).

## Owner mapping (exact, binding)

| Source file (archive) | Product category | Slug | Public delivery | Art direction |
|---|---|---|---|---|
| 01-switch.jpg | Switch | switch | 01-switch.webp (500×270) | contain · white plate (low-res source, never cropped) |
| 02-access-points.jpg | Access Points | access-points | 02-access-points.webp (1600×1067) | cover · focus 62% 30% |
| 03-camera.jpg | Camera | camera | 03-camera.webp (1365×2048) | cover · native portrait |
| firewall-interim.jpg | Firewall | firewall | firewall-interim.webp (1200×1804) | cover · focus 50% 62% · **provisional** |
| laptop.jpg | Laptop | laptop | laptop.webp (1200×1800) | cover · focus 58% 56% |
| core-switch.webp | Core Switch | core-switch | core-switch.webp (900×600) | contain · light plate (transparent cutout) |
| sfp.jpg | SFP | sfp | sfp.webp (1600×1065) | cover · focus 48% 46% |
| tablet.jpg | Tablet | tablet | tablet.webp (1600×1067) | cover · focus 45% 48% |
| printers.jpg | Printers | printers | printers.webp (1600×1066) | cover · focus 34% 55% |
| multi-charger-t60.png | **Multi Charger** | multi-charger | multi-charger-t60.webp (500×500) | contain · white plate |
| multi-charger-t60.png | **T60** | t60 | multi-charger-t60.webp (500×500) | contain · white plate |
| nvr.png | NVR | nvr | nvr.webp (800×800) | contain · white plate |

### Binding notes

- **Multi Charger + T60 SHARE one combined product photograph** (owner
  decision). The media is referenced twice — never duplicated, never
  split into fabricated separate images.
- **NVR** — the visible HIKVISION branding in this photograph is
  **explicitly accepted by the owner**. It must NEVER be removed,
  blurred, cropped out, recoloured or regenerated to hide it.
- **Firewall (PRODUCT-MEDIA-01, OPEN)** — `firewall-interim.jpg` is the
  owner-approved **INTERIM** visual: real data-centre hardware, **not a
  physical firewall appliance**. The record stays flagged `provisional`
  and the presentation never implies a specific product. The superseded
  conceptual visual is retained unused at
  `04-firewall-conceptual-superseded.jpg`. The interim visual is served
  from its OWN delivery path (`firewall-interim.webp`) rather than
  reusing the superseded one's — replacing bytes under a stable path
  makes image-optimizer/CDN caches serve the old picture.
- **Switch (PRODUCT-MEDIA-02, OPEN)** — the source is 500×270; it is
  presented whole on a plate rather than upscaled or cropped.

## Provenance / rights status

**OWNER-SUPPLIED — PUBLICATION RIGHTS TO BE CONFIRMED BEFORE FINAL
LAUNCH** (open item **PRODUCT-MEDIA-RIGHTS**), for every file above.
No license is asserted or invented; no source attribution is added
because no verified source is known.

## Integrity (SHA-256 of the archived sources)

```text
2e45d46fb97a4643380614af909151918a849024ca438ee94148948fbe782140  01-switch.jpg
d946752b6515ab4a9af9830541bf1ca19b4e819a529bea1f9818b3109775bc1a  02-access-points.jpg
231131036033929b6a1c88e94de3d1b1ff77711e9ea02316621b73f11dc54d53  03-camera.jpg
61d3210da2937299ceb97448ce313fdfee2c3c8df8454efa3acf05bdcce1c2bc  firewall-interim.jpg
76dadc8838d633dec87d45a541c77e5bc7c843ffb9bacf2c23c36370f7d499a9  04-firewall-conceptual-superseded.jpg
f849a3eab147933f43158ecc72fd5280ab3e619caef83ef4d06bd3195eaf67d0  laptop.jpg
77e40025bcd0c279186905b747443106ad5e39ffb0a5fe80ff026eb4a069cb32  core-switch.webp
7fdf890e0e3d7fa152b6500111cd37b43bb76b29d66f1205ebbd73fac721cf47  sfp.jpg
9344035922de7b7ddf4658365ab854b9d4d3ffd1acca50c5751de1f268510091  tablet.jpg
5249cbd0ebff58e2f7196e81d48937d7f5c83fddcea787d7a964e1592d4a349f  printers.jpg
b4994b957e9a007d15a764fec4c9ccf9a55de51ab7cce6e0208ba713462bc78e  multi-charger-t60.png
72e1e7b5c865fe51bc6ac2f9900a3a724ebe2fe448d8f5e598743d48a177b6b8  nvr.png
```

## Source inventory & known concerns

| File | Source dimensions | Size | Known concern |
|---|---|---|---|
| 01-switch.jpg | 500×270 | 18.7 KB | LOW RESOLUTION (PRODUCT-MEDIA-02) |
| 02-access-points.jpg | 2998×2000 | 457 KB | shallow depth of field; editorial rather than catalogue style |
| 03-camera.jpg | 1365×2048 | 440 KB | portrait orientation |
| firewall-interim.jpg | 4024×6048 | 3.0 MB | generic data-centre environment, NOT a firewall appliance (PRODUCT-MEDIA-01) |
| laptop.jpg | 4051×6077 | 807 KB | editorial styling (flowers/pedestal); no visible logo |
| core-switch.webp | 900×600 | 13 KB | moderate resolution; transparent-background cutout |
| sfp.jpg | 4256×2832 | 612 KB | hand visible (no identifiable person) |
| tablet.jpg | 5472×3648 | 2.0 MB | hand visible; faint, barely legible bezel marking |
| printers.jpg | 5894×3929 | 1.0 MB | person's torso/hands visible — **no identifiable face** |
| multi-charger-t60.png | 500×500 | 265 KB | LOW RESOLUTION; combined two-category photograph |
| nvr.png | 800×800 | 20 KB | **`.png` extension but JPEG data**; visible HIKVISION branding (owner-accepted) |

## Categories awaiting approved imagery (designed fallback state)

Held this round by owner decision — supplied media rejected for cause:
**Router** (prominent operator branding), **UPS** (manufacturer brand +
model number, low resolution), **Monitor** (manufacturer + third-party
software UI), **PC** (supplied photo shows a laptop), **HDMI Extender**
(supplied photo shows a cable, not an extender), **Face Recognition
Terminals** (insufficient quality, on-screen demo face/error text).

No approved imagery yet: **Hard Disk**, **Decoder**, **AC Adapter**,
**Media Converter**.

## Held / never published

`media-source/images/` retains the second-round files that are NOT
product imagery. **`Point of contact.jpg` must remain unpublished**
(identifiable person). The infrastructure/technical images may be
considered for a future owner-authorized Solutions-support round; they
must NEVER be presented as Gallery/project evidence. `Printers.jpg`
(the weaker composition) is retained unused; `Printers1.jpg` was the
approved choice and is archived here as `printers.jpg`.
