#!/usr/bin/env python3
"""Stack a light-theme and dark-theme screenshot into one mobile image.

Usage:
    stitch.py <top_light.png> <bottom_dark.png> <out.png> \
        [--crop X Y W H] [--size WIDTH HEIGHT]

Both inputs are full-viewport screenshots. With --crop (coordinates in the
screenshots' OWN pixels, i.e. CSS px x devicePixelRatio) each is cropped to the
component region first — element screenshots in agent-browser can come back
blank, so we crop the reliable viewport shot instead.

Each crop is then scaled to fit its half of the output (default 1080x1920 =>
two 1080x960 halves), preserving aspect ratio and centered, letterboxed with the
screenshot's own corner colour (the page background) so it reads intentionally in
both themes. A hairline divider marks the seam. Top = light, bottom = dark.
"""
import sys

from PIL import Image

args = sys.argv[1:]
crop = None
size = (1080, 1920)


def take(flag, n):
    global args
    if flag in args:
        i = args.index(flag)
        vals = [int(v) for v in args[i + 1 : i + 1 + n]]
        args = args[:i] + args[i + 1 + n :]
        return vals
    return None


crop = take("--crop", 4)
sz = take("--size", 2)
if sz:
    size = (sz[0], sz[1])

top_path, bottom_path, out_path = args[0], args[1], args[2]
W, H = size
half = H // 2


def fit(path: str) -> Image.Image:
    img = Image.open(path).convert("RGB")
    if crop:
        x, y, w, h = crop
        x, y = max(0, x), max(0, y)
        img = img.crop((x, y, min(img.width, x + w), min(img.height, y + h)))
    fill = img.getpixel((min(3, img.width - 1), min(3, img.height - 1)))
    scale = min(W / img.width, half / img.height)
    nw, nh = max(1, round(img.width * scale)), max(1, round(img.height * scale))
    resized = img.resize((nw, nh), Image.LANCZOS)
    canvas = Image.new("RGB", (W, half), fill)
    canvas.paste(resized, ((W - nw) // 2, (half - nh) // 2))
    return canvas


out = Image.new("RGB", (W, H), (0, 0, 0))
out.paste(fit(top_path), (0, 0))
out.paste(fit(bottom_path), (0, half))
out.paste(Image.new("RGB", (W, 2), (140, 140, 140)), (0, half - 1))
out.save(out_path)
print(out_path)
