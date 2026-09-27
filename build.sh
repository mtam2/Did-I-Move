#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="$SCRIPT_DIR/dist"
OUT_FILE="$OUT_DIR/did-i-move.html"

mkdir -p "$OUT_DIR"

# Inline every illustration as a data URI so the standalone file has no
# external references. app.js reads window.DIM_IMAGES before falling back
# to images/<name>.webp.
IMAGES_JS="$(mktemp)"
trap 'rm -f "$IMAGES_JS"' EXIT
{
  printf 'window.DIM_IMAGES = {\n'
  for img in "$SCRIPT_DIR"/images/*.webp; do
    [ -e "$img" ] || continue
    name="$(basename "$img" .webp)"
    printf '  "%s": "data:image/webp;base64,%s",\n' "$name" "$(base64 -w0 "$img")"
  done
  printf '};\n'
} > "$IMAGES_JS"

awk -v dir="$SCRIPT_DIR" -v images="$IMAGES_JS" '
  /href="style.css"/ {
    print "    <style>"
    while ((getline line < (dir "/style.css")) > 0) print line
    print "    </style>"
    next
  }
  /src="app.js"/ {
    print "    <script>"
    while ((getline line < images) > 0) print line
    print "    </script>"
    print "    <script>"
    while ((getline line < (dir "/app.js")) > 0) print line
    print "    </script>"
    next
  }
  { print }
' "$SCRIPT_DIR/index.html" > "$OUT_FILE"

echo "Built $OUT_FILE"
