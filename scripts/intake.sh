#!/usr/bin/env bash
set -euo pipefail
SRC="$(cd "$(dirname "$0")/.." && pwd)/media-source/images"
DEST="$SRC/products-intake"

NAMES=(
  routers-5g core-switches switches poe-switches network-racks rack-servers storage-arrays access-points point-to-point wifi-extenders
  media-converters hdmi-over-fiber sfp-modules
  firewalls
  cctv-cameras nvr decoders face-recognition camera-mounts
  video-wall-displays hdmi-splitters hdmi-extenders
  laptops desktop-pcs monitors tablets printers keyboards mice
  hard-drives flash-memory
  ptt-radios multi-bay-chargers
  people-counting-sensors weather-stations
)

mkdir -p "$DEST"
moved=0
for n in "${NAMES[@]}"; do
  for ext in webp png jpg jpeg avif; do
    f="$SRC/$n.$ext"
    [ -f "$f" ] || continue
    mv "$f" "$DEST/"
    echo "  ✓ $n.$ext"
    moved=$((moved+1))
  done
done

echo
echo "نُقل: $moved"
echo
echo "في مجلد الاستلام:"
ls "$DEST" 2>/dev/null | sed 's/^/  /' || echo "  (فارغ)"
echo
echo "ما زال بلا صورة:"
for n in "${NAMES[@]}"; do
  found=0
  for ext in webp png jpg jpeg avif; do
    [ -f "$DEST/$n.$ext" ] && found=1
  done
  [ $found -eq 0 ] && echo "  · $n"
done
