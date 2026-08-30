# Solutions media — owner mapping manifest (D-050 media population)

**Status: INTEGRATED — all 7/7 owner-approved Solution videos staged
(uploads 1+2 of 2, 2026-08-30) and implemented per the owner's
SOLUTIONS CINEMATIC MEDIA INTEGRATION directive (same day). Public
delivery lives under public/media/solutions/ (files 01/03/05 as
lighter serving derivatives, 02/04/06/07 as byte-copies) + reviewed
posters under public/media/solutions/posters/; the records live on
solutionFamilies[].media in src/content/solutions.ts.** Files here
are the owner-supplied
web-optimized derivatives, archived UNTOUCHED (byte-identical to the
uploads — no recompression, per owner instruction). Nothing is served
until derivatives/records are created at implementation time
(Amendment 3: media-source ≠ published; no public/ derivatives exist).

## Owner mapping (exact, binding — one video per canonical family)

| File | Solution family | Family slug (src/content/solutions.ts) |
|---|---|---|
| 01-infrastructure-data-centre-web.mp4 | Infrastructure & Data Centre | infrastructure-data-centre |
| 02-networking-connectivity-web.mp4 | Networking & Connectivity | networking-connectivity |
| 03-security-technology-solutions-web.mp4 | Security Technology Solutions | security-solutions |
| 04-biometrics-access-control-web.mp4 | Biometrics & Access Control | biometrics-access-control |
| 05-audio-visual-solutions-web.mp4 | Audio & Visual Solutions | audio-visual-solutions |
| 06-unified-communications-smart-buildings-web.mp4 | Unified Communications & Smart Buildings | unified-communications-smart-buildings |
| 07-video-surveillance-ai-solutions-web.mp4 | Video Surveillance & AI Solutions | video-surveillance-ai |

## Integrity (SHA-256 of the staged files = the uploads, verified)

```text
868a229245f1350e4231ea016c8969918d5d784cde3d99577ed03a0807000c17  01-infrastructure-data-centre-web.mp4
888e0d45e645cf292eacf7fd1e35726e4ab4a8554656dc118d0fcb99e2829daa  02-networking-connectivity-web.mp4
9b87c1036d30ecfa2c145fdf4926e6e772f1d69d10bb96a2a87510457ebdd479  03-security-technology-solutions-web.mp4
99dedff10b248524026661fee922e2744004d42f20aaaa117c0199de4380aea5  04-biometrics-access-control-web.mp4
ab21cfc21f038395bfb7eaf2164da1d2dcbb55927a98dc357d5c585f5087dec7  05-audio-visual-solutions-web.mp4
053e3a7534dab8e318b0a394ef47484b83e7c664abfe507d5d4202feabc3bf9f  06-unified-communications-smart-buildings-web.mp4
af803aeb9c7d5e6f6106e6497c915be5863d30ce2d359a3a08f78ca2bf3561c1  07-video-surveillance-ai-solutions-web.mp4
```

## Technical inventory (probed, informational)

| File | Codec | Resolution | FPS | Duration | Bitrate | Audio |
|---|---|---|---|---|---|---|
| 01 infrastructure | H.264 | 3840×2160 (16:9) | 24 | 9.4 s | ≈22.3 Mbps | AAC track present |
| 02 networking | H.264 | 1920×1080 (16:9) | 30 | 30.0 s | ≈4.6 Mbps | none |
| 03 security | H.264 | 2160×3840 (PORTRAIT 9:16) | 25 | 16.2 s | ≈9.1 Mbps | none |
| 04 biometrics | H.264 | 1920×1080 (16:9) | 25 | 19.2 s | ≈4.4 Mbps | none |
| 05 audio-visual | H.264 | 2160×3840 (PORTRAIT 9:16) | 30 | 8.4 s | ≈19.8 Mbps | none |
| 06 unified-comms | H.264 | 1920×1080 (16:9) | 30 | 17.5 s | ≈3.5 Mbps | none |
| 07 surveillance-ai | H.264 | 1920×1080 (16:9) | 25 | 10.2 s | ≈4.9 Mbps | none |

## Flags for the owner (no action taken — D-050 honesty)

- **Bitrate/size:** files 01 (4K @ ≈22 Mbps, 26 MB) and 05 (portrait @
  ≈20 Mbps, 21 MB) are heavier than typical web-inline video
  (~4–8 Mbps). Staged untouched as instructed; if page-weight targets
  require lighter inline derivatives at implementation time, that will
  be proposed first — never done silently. Files 02/04/06/07 are
  genuinely web-weight.
- **Orientation mix:** 03 and 05 are portrait (9:16); the other five
  are landscape (16:9). The Solutions presentation needs
  per-orientation art direction — to be designed in the authorized
  integration round.
- **Audio:** 01 carries an AAC audio track. Site policy (§40 D-050: no
  welcome audio; ambient media plays muted) means inline playback is
  muted regardless; whether to strip the track in a derivative is an
  implementation-time decision.
- **Duration spread:** 8.4–30 s loops; loop-seam smoothness to be
  reviewed visually during integration.
