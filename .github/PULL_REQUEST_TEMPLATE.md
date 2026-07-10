## What

<!-- One or two sentences: what does this PR add or change? -->

## Why

<!-- Link the issue this closes, or explain the motivation. -->

Closes #

## Checklist

<!-- Check what applies; mark N/A with a reason. See CONTRIBUTING.md. -->

- [ ] Edited `registry/seam/**` only — `public/r/**` changes are regenerated output (`bun run registry:build`), committed
- [ ] Motion uses `@/lib/motion` tokens only (no inline springs/durations)
- [ ] Reduced motion is a **variant**, not a kill switch — every interaction still gives feedback
- [ ] Dogfoods the foundation (`Button`/`buttonVariants`, `toggleVariants`, Input-style wells) instead of re-rolling it
- [ ] Follows the debossed/embossed rule (slot → well, token → key) and the squircle/depth language
- [ ] `data-slot` on every exported wrapper; shadcn-style naming
- [ ] Examples added/updated in `registry/seam/examples/`
- [ ] Docs page follows the template (… → Motion → Accessibility) and is listed in `nav-items.ts` **and** the components overview grid
- [ ] Theme edits made in `registry/seam/theme/theme.css` with `app/globals.css` regenerated
- [ ] `npx tsc --noEmit` passes in `apps/www`

## The four gates (verified in a real browser)

- [ ] **Pointer** — press recedes into the surface, springs back, never blocks the click
- [ ] **Keyboard** — same feedback on keyboard activation; roving focus intact in composites
- [ ] **Reduced motion** — emulated `prefers-reduced-motion: reduce`; feedback still present (opacity), nothing dead
- [ ] **Dark mode** — tokens flip, depth still reads

## Screenshots

<!-- Light + dark for anything visual. -->
