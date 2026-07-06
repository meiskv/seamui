#!/usr/bin/env bash
# Capture a seamui component as a 1080x1920 mobile image: light theme on top,
# dark theme on bottom, cropped to the component preview.
#
# Usage: capture.sh <url> <out.png> [css-selector]
#   selector defaults to the first docs ComponentPreview box.
#
# Notes baked in from testing:
#   - agent-browser ELEMENT screenshots come back blank, so we shoot the
#     viewport and crop with PIL.
#   - screenshots can hang if the browser wedges; a watchdog kills+reports so
#     the caller can retry (re-running re-opens a fresh browser).
#   - the eval JSON comes back double-encoded; python decodes twice.

URL="$1"; OUT="$2"; SEL="${3:-main .rounded-xl.border}"
DIR="$(cd "$(dirname "$0")" && pwd)"
TMP="$(dirname "$OUT")"
AB=agent-browser

shot() { # $1=path — run screenshot with a 20s watchdog
  ( $AB screenshot "$1" >/dev/null 2>&1 ) & local pid=$!
  for _ in $(seq 1 20); do sleep 1; kill -0 "$pid" 2>/dev/null || return 0; done
  kill -9 "$pid" 2>/dev/null; return 1
}

$AB set viewport 430 932 2 >/dev/null 2>&1
$AB open "$URL" >/dev/null 2>&1
sleep 5

# Light theme + scroll the preview into view, then read its device-px rect.
$AB eval "document.documentElement.classList.remove('dark'); document.querySelector(\"$SEL\")?.scrollIntoView({block:'center'}); 'ok'" >/dev/null 2>&1
sleep 1
$AB eval "(()=>{const el=document.querySelector(\"$SEL\");if(!el)return 'null';const r=el.getBoundingClientRect(),d=window.devicePixelRatio,p=14;return JSON.stringify({x:Math.round((r.x-p)*d),y:Math.round((r.y-p)*d),w:Math.round((r.width+p*2)*d),h:Math.round((r.height+p*2)*d)});})()" > "$TMP/_rect.json" 2>/dev/null

shot "$TMP/_light.png" || { echo "HUNG: kill agent-browser procs and retry"; exit 1; }

$AB eval "document.documentElement.classList.add('dark'); 'ok'" >/dev/null 2>&1
sleep 1
shot "$TMP/_dark.png" || { echo "HUNG: kill agent-browser procs and retry"; exit 1; }

# Restore light so continued browsing isn't stuck in dark.
$AB eval "document.documentElement.classList.remove('dark'); 'ok'" >/dev/null 2>&1

read CX CY CW CH < <(python3 -c "
import json
raw=open('$TMP/_rect.json').read().strip()
try:
    d=json.loads(raw)
    if isinstance(d,str): d=json.loads(d)
    print(d['x'],d['y'],d['w'],d['h'])
except Exception:
    print('')
")

if [ -n "${CX:-}" ]; then
  python3 "$DIR/stitch.py" "$TMP/_light.png" "$TMP/_dark.png" "$OUT" --crop "$CX" "$CY" "$CW" "$CH"
else
  python3 "$DIR/stitch.py" "$TMP/_light.png" "$TMP/_dark.png" "$OUT"
fi
