#!/bin/sh
# Render meme3.html to the 1024x1024 meme3.png for gta6-meme-x-01.
# Same pattern as render2.sh: headless Chromium screenshot of the page,
# then crop to the top 1024x1024 square with Pillow. The page itself is
# exactly 1024px tall, so the crop only removes whatever extra strip the
# browser window adds below it. No network is needed: the ghost is an
# inline base64 data URI and all fonts come from the system fontconfig set.
#
# Usage: ./render3.sh   (run from this directory; writes meme3.png here)

set -eu

DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$DIR"

BROWSER="${CHROME:-$HOME/.cache/ms-playwright/chromium-1148/chrome-linux/chrome}"

CAPTURE=$(mktemp --suffix=.png /tmp/gmeme3-capture-XXXXXX)

"$BROWSER" \
  --headless=new \
  --no-sandbox \
  --disable-gpu \
  --hide-scrollbars \
  --force-device-scale-factor=1 \
  --virtual-time-budget=5000 \
  --window-size=1024,1111 \
  --screenshot="$CAPTURE" \
  "file://$DIR/meme3.html"

python3 - "$CAPTURE" "$DIR/meme3.png" <<'PYEOF'
import sys
from PIL import Image

capture_path, out_path = sys.argv[1], sys.argv[2]
with Image.open(capture_path) as shot:
    print("captured size:", shot.size)
    square = shot.crop((0, 0, 1024, 1024))
    square.save(out_path)
with Image.open(out_path) as finished:
    print("meme size:", finished.size, "->", out_path)
PYEOF

rm -f "$CAPTURE"
