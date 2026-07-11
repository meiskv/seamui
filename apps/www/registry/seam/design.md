# design.md — the seamui design contract

This file was installed into your project alongside your first seamui
component (via `npx shadcn add https://seamui.dev/r/<name>.json` or
`seamui add <name>`). seamui follows the shadcn distribution model — **you own
the code** — so the design language has to travel with the code. This file is
that contract.

**If you are an AI coding agent working in this repo:** treat this file as the
styling and motion contract for everything under `components/ui/` and for any
new UI you build next to it. When you extend or restyle a seamui component, or
build a new control that sits beside one, follow the rules here — do not fall
back to stock shadcn/Radix/Material idioms.

What seamui put in your project:

```
components/ui/<name>.tsx   # the components — yours to edit
lib/utils.ts               # cn()
lib/motion.ts              # ALL motion tokens (springs, depth, fades, condense, reduced)
lib/haptics.tsx            # HapticsProvider + useHaptics (if a component needed it)
app/globals.css            # theme tokens: colors, radii, the depth shadow scale, `squircle`
```

Components are built on **Base UI** (`@base-ui/react`, not Radix) and animated
with **motion.dev** (`motion`), styled with Tailwind v4 + CSS variables + `cva`.

---

## 1. The three pillars

Everything animated expresses these. They are the reason seamui looks and
feels the way it does.

### Springs, not durations
Physics, not clocks. Every transform/position transition is a **spring from
`@/lib/motion`**. Plain duration tweens are allowed in exactly two places:
opacity fades (`fades.*`) and layout dimensions that can't spring cleanly
(height/width). Never write an inline spring config or an ad-hoc
`duration: 0.3` — if you need a new feel, retune the personality in
`lib/motion.ts` (see §4) so the whole library changes together.

### Touch feedback
Every interactive control reacts to press **in ≤1 frame** and settles springy
on release. Press means the control recedes *into* the surface
(`depth.pressed`, a subtle scale-down). Feedback also fires on keyboard
activation, and it never blocks the click.

### Depth
The UI is a stack of surfaces on a virtual z-axis:

- **Press** → recedes into the surface (`depth.pressed`).
- **Overlay enter** (popover, dropdown, tooltip, select) → rises toward the user.
- **Modal enter** (dialog, drawer) → rises to the top of the stack; the backdrop dims what's below.
- **Dismiss** → falls back and fades.

---

## 2. The debossed/embossed rule (seamui's signature)

Apply it to every control that has a container-plus-selection shape:

> The **container/track the user acts *into*** is **debossed** — carved into
> the surface with the inset `shadow-well`, on a `bg-muted` background. The
> **thing the user selects, types, or activates** is **embossed** — a raised
> key with `shadow-resting` on a light (`--secondary`/`--primary`) surface.

Worked examples of the same one idea:

- **Radio** — debossed ring (`bg-muted shadow-well`), embossed dot (`bg-primary shadow-resting`).
- **Checkbox** — debossed box unchecked; checked becomes an embossed primary key.
- **Tabs / Toggle Group** — debossed well holding embossed active key(s).
- **Input / OTP / Select trigger** — debossed entry wells you type or pick into.

If you can't tell which half is which, ask: *is this the slot, or the token in
the slot?* Slot → debossed. Token → embossed.

---

## 3. The design language

seamui's canvas is a **warm light-gray**, and controls are **raised white
keys** with soft diffuse shadows and **squircle** corners. Think physical,
tactile, iOS-control-center — not flat Material.

- **Canvas** = `bg-background` (warm gray). Never pure white.
- **Keys / surfaces** = `bg-card` / `bg-popover` / `bg-secondary` (near-white) + `shadow-resting` or `shadow-raised`.
- **Wells** = `bg-muted` + `shadow-well` (inset). Grouped-control tracks *and* entry fields both read as recessed.
- **Embossed active state** = white bg + `shadow-resting`, sitting inside the well.
- **Corners** = the `squircle` utility (defined in globals.css) on keys, wells, pills, inputs, menus, dialogs — **not** on true circles (avatars, switch thumbs, radio dots stay `rounded-full`).
- **Generous padding** — default control height is `h-10`, wells use `p-1.5`. When in doubt, add breathing room.

### The depth shadow scale (in globals.css, light + dark)

| Token | Use |
|---|---|
| `shadow-pressed` | controls sitting slightly *in* the surface |
| `shadow-resting` | a key at rest on the canvas |
| `shadow-raised` | hover / lifted key |
| `shadow-overlay` | floating surfaces (popover, dropdown, tooltip) |
| `shadow-modal` | top-of-stack surfaces (dialog, drawer) |
| `shadow-well` | **inset** — the debossed container keys sit in |

Restyle by editing the CSS variables in `globals.css` — the components read
tokens, so they follow automatically, in both light and dark.

---

## 4. Motion — `lib/motion.ts` is the single source of truth

Import from `@/lib/motion`. Never inline springs or durations in components.

- **`personalities`** — the one-line feel dial: `seam` / `brisk` / `relaxed` /
  `playful`. `springs` just picks one (`export const springs =
  personalities.seam`), so you retune the entire library by swapping the pick
  or editing the numbers — no component files to touch.
- **`springs`** — `press` (instant press-down), `snappy` (release/settle/state
  changes), `surface` (overlays), `bouncy` (accents, sparingly).
- **`fades`** — `fast` / `normal`, opacity-only durations.
- **`depth`** — `pressed` / `resting` / `raised` scalars plus `overlay` /
  `modal` enter/exit objects. Only for elements motion.dev controls end to end
  (things under `AnimatePresence`) — **not** Base UI popups.
- **`condense`** — the overlay motion as **CSS classes** (`surface` /
  `backdrop` / `sheet`), keyed to Base UI's `data-starting-style` /
  `data-ending-style`. Base UI awaits CSS transitions (never motion's rAF
  springs) before unmounting a popup — a motion exit gets cut off instantly.
  All Base UI overlays use `condense`.
- **`shake`** — error feedback; pair with `reduced.flash` under reduced motion.
- **`reduced`** — the reduced-motion fallbacks (§6).

### Haptics — `lib/haptics.tsx`

Mount `<HapticsProvider>` once near your app root to enable it; without a
provider every trigger is a silent no-op, so components are safe either way.
Buttons/toggles fire `tap` on pointerdown (opt out or override via the
`haptic` prop); state controls (switch, checkbox, radio, slider, OTP) fire
`tick` on commit. New controls you build should follow the same shape via
`useHaptics()`.

---

## 5. Extending — building new UI that belongs

### Compose the foundation, don't fork it

`Button` (and its exported `buttonVariants`), `Toggle` (`toggleVariants`), and
`Input` are the single source of truth for how those shapes look, size, focus,
and give feedback. Anything button-shaped you build — a trigger, a close "✕",
an icon button, a pressable chip — should either:

1. **Render the `Button` component**, ideally through a Base UI part's `render`
   prop: `<Something.Close render={<Button variant="ghost" size="icon" />}>`; or
2. **Reuse `buttonVariants(...)` classes** on the element itself when a
   wrapper component would break the part (Base UI composite widgets like
   Tabs/Toolbar/Menu manage roving focus through the child's ref — an extra
   wrapper kills arrow-key navigation).

Never paste a copy of the button's base classes or an inline
`whileTap={{ scale: … }}` — that forks the foundation.

Entry wells (inputs, select triggers, OTP slots) are **not** buttons — they
follow the debossed rule (§2), not `buttonVariants`.

### The two animation patterns for Base UI parts

**Pattern A — interactive controls (button-like parts):** keep the Base UI
part and pass a `motion.button` through its `render` prop. Never
`motion.create()` a Base UI button — it breaks native-button semantics and
swallows the `render` prop.

```tsx
<BaseToggle
  render={
    <motion.button
      whileTap={reduceMotion ? reduced.pressed : depth.pressed}
      transition={reduceMotion ? fades.fast : springs.press}
    />
  }
/>
```

**Pattern B — non-button parts (thumbs, dots, indicators):** pass
`render={<motion.div … />}` or `motion.create()` the part.

**Overlays (popover/menu/dialog/drawer popups):** never a `motion.div` — use
the `condense` CSS classes (§4), or the exit animation dies. `cn("…surface
classes…", condense.surface, className)` on the popup; `condense.backdrop` on
backdrops; `condense.sheet` on bottom sheets.

---

## 6. Reduced motion is a variant, never a kill switch

`prefers-reduced-motion` swaps *movement* for *opacity* — it never removes
feedback. A control that goes dead under reduced motion is a bug.

```tsx
whileTap={reduceMotion ? undefined : depth.pressed}          // ❌ dead on press
whileTap={reduceMotion ? reduced.pressed : depth.pressed}    // ✅ still gives feedback
```

- Press → `reduced.pressed` (brief dim) instead of a scale.
- Entrances → `reduced.fadeIn` (opacity only) instead of scale+translate.
- Layout/position (thumbs, indicators) → `reduced.instant` (zero-duration jump).
- CSS-transition components → pair with `motion-reduce:transition-none` or an
  opacity-only reduced transition.

`condense` already carries its `motion-reduce:` branch — keep it when you
extend those class strings.

---

## 7. Adding more seamui components

```bash
npx shadcn add https://seamui.dev/r/<name>.json
# or, with the seamui CLI
npx seamui add <name>
```

Installed components are yours: edit them freely, but keep the contract above
so the surface stays coherent. The full catalog and docs live at
https://seamui.dev.

### Quick checklist for any new UI in this project

- [ ] Motion only from `@/lib/motion` — no inline springs/durations.
- [ ] Press feedback on everything interactive (pointer *and* keyboard).
- [ ] Debossed slot / embossed token where a container holds a selection.
- [ ] `squircle` + depth shadows, roomy padding, tokens (never hard-coded colors).
- [ ] Base UI buttons animated via `render` (Pattern A); overlays via `condense`.
- [ ] Reduced-motion fallback present (a variant, not an off switch).
- [ ] Works in dark mode (use tokens and the depth scale, both flip automatically).
