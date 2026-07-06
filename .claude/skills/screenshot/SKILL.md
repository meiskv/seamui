---
name: screenshot
description: >-
  Capture a seamui component as a single 1080×1920 portrait image for mobile PR
  review — light theme on top, dark theme on bottom. Use whenever the user asks
  for "a screenshot" of a component (especially to attach to a PR or review on a
  phone). Drives the local docs site with agent-browser, forces each theme, and
  stitches the two shots with PIL.
---

# Mobile light/dark component screenshot

Produce one **1080×1920** portrait image — **top = light theme, bottom = dark
theme** — of the component the user is working on, cropped to its live preview.
This is the default whenever the user asks for "a screenshot" in this repo.

## One command

```bash
bash .claude/skills/screenshot/capture.sh \
  "http://localhost:3000/docs/components/<name>" \
  "<scratchpad>/<name>-preview.png"
```

Then `Read` the output PNG to show the user and print its path so they can
attach it to the PR. Pass a third arg (a CSS selector) to crop to a specific
element instead of the first `ComponentPreview` box.

`capture.sh` does the whole flow: mobile viewport (430×932 @2×, so the docs
render in their phone layout), force light → screenshot, force dark →
screenshot, then `stitch.py` crops each viewport shot to the preview and stacks
them into 1080×1920 with a hairline seam. Letterbox fill is sampled from each
shot's own background, so it stays correct in both themes.

## Before running

- **Dev server** must be up at `http://localhost:3000`. If not, start it:
  `bun run dev` from the repo root; wait for "Ready". A blank/untitled page
  usually means the Next dev server's CSS detached after edits — restart it
  clean (`rm -rf apps/www/.next` then `bun run dev`).
- **Pick the component.** Default to the one just worked on. If ambiguous, ask.

## If a screenshot hangs

agent-browser's screenshot can wedge if processes pile up (`capture.sh` prints
`HUNG: ...` and exits 1). Recover with:

```bash
pkill -9 -f agent-browser
```

then re-run `capture.sh` — the fresh `agent-browser open` re-establishes the
browser.

## Why it's built this way (don't "simplify" these away)

- **Viewport shot + PIL crop, not an element screenshot.** agent-browser
  element screenshots return a blank box of the right size. Cropping the
  reliable viewport shot is the workaround.
- **Theme is a `.dark` class** on `<html>` (docs `layout.tsx` sets it pre-paint
  from `localStorage`/system). Toggling the class needs no reload.
- **The rect eval returns double-encoded JSON** — `capture.sh` decodes twice.
