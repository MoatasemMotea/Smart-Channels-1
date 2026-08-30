# media-source/ — source-media archive (ownership layer)

This directory is the **untouched archive** of owner-supplied source media
(Q-P3-7). Files here are **never served by the website** and are never
modified by tooling.

**Committing a file here is NOT publication** (Amendment 3):

```text
media-source asset  ≠  approved Gallery record  ≠  published website media
```

Public exposure happens only when:
1. an optimized derivative is generated into `public/media/` by
   `npm run media`, AND
2. a content record in `src/content/` references it with
   `published: true` (gallery) or a public `display` state (projects).

Derivatives for unpublished/candidate records are intentionally NOT
generated — nothing under `public/` may exist for media the owner has not
approved, so no unapproved file is ever publicly reachable by URL.

## Adding new media (owner workflow)

1. Copy the original photo/video into the right subfolder here
   (lowercase-kebab filenames, content-descriptive).
2. When the item is approved for the site: run `npm run media` — it
   generates optimized web derivatives and video posters into
   `public/media/`.
3. Add one metadata entry in `src/content/gallery.ts` (or a `media` entry
   on a project record) and set its publish state.
4. `npm run build`. No component changes, ever.

## Contents

- `brand/` — master logo extraction (from the approved Company Profile
  PDF, with alpha). The authoritative identity per D-001.
- `documents/` — approved Company Profile 2026 (EN). The public download
  copy lives at `public/docs/`.
- `video/` — the three owner-supplied videos (originals, untouched):
  `event-network-build-2025.mp4` (848×464, 79s),
  `event-environment-night.mp4` (464×848, 25s),
  `hospitality-walkway-night.mp4` (464×848, 31s).
  Gallery classification/publication awaits owner approval (O-008/O-012).
- `video/solutions/` — the seven owner-approved Solution films
  (untouched web-optimized uploads, 2026-08-30) with their binding
  MAPPING.md manifest (D-050 Solutions integration). Delivery
  derivatives live under public/media/solutions/.

## Git size policy (Q-P3-7 / Amendment 7)

No Git LFS now. Revisit when repository growth, clone performance,
individual file sizes (GitHub hard limit: 100 MB/file) or future media
volume make it worthwhile; weigh Git LFS against external asset storage at
that point and record the decision in docs/decision-log.md. Migration is
mechanical (`git lfs migrate import --include="media-source/**"`) and can
be done later without changing the website.
