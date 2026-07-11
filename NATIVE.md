# NATIVE.md — the seamui → Expo/React Native porting contract

This is the durable, model-agnostic contract for any agent (or human) building
the **native variant of seamui** (epic
[#52](https://github.com/meiskv/seamui/issues/52)). It is the native
counterpart to `CLAUDE.md`: read that first — everything there about the
pillars, the design language, dogfooding, and reduced motion still governs.
This file defines how those rules **translate to Expo**, and where the
translation inverts a web rule, it says so explicitly.

Status: **planning/porting**. Grounded in a full-codebase audit and ecosystem
research verified 2026-07-11. Version pins below were checked against npm; if
you are reading this much later, re-verify before bumping majors.

---

## 0. What seamui native is (in one breath)

The same product — shadcn's distribution model (you own the code, installed via
the registry), the same design language (springs, touch feedback, depth;
debossed wells / embossed keys; squircles) — **reimplemented on the native
stack** so it feels native: Reanimated springs on the UI thread, real haptics
via expo-haptics, platform shadows, `Pressable` semantics.

One thing is decided and must not be relitigated per-component: **native
components are parallel implementations, not shared code.** Web and native
share token *values* (colors, radii, spring constants, haptic presets) and the
behavioral *contract* (anatomy, props, a11y, motion spec). They do not share
component source. Do not attempt a universal `.tsx` that renders on both; do
not build the native variant on react-native-web.

---

## 1. The locked stack (and why)

| Concern | Web | Native | Why / notes |
|---|---|---|---|
| Runtime | Next.js | **Expo SDK 57+** (RN 0.86, React 19.2) | New Architecture ONLY — the Bridge was removed in RN 0.85. Never add a legacy-arch dependency. |
| Headless primitives | Base UI (`@base-ui/react/*`) | **`@rn-primitives/*`** (≥1.5) | Same Root/Trigger/Portal/Content anatomy as Base UI, so seamui wrapper structure maps 1:1. De-facto standard (react-native-reusables builds on it). |
| Styling | Tailwind v4 `@theme` + CSS vars | **Uniwind** (≥1.10) | The only *stable* Tailwind-v4/`@theme`/CSS-variables engine on native today. Same `className` API — `cva`, `tailwind-merge`, and `cn()` survive verbatim. NativeWind v5 targets the same surface but is still pre-release; keep classnames engine-agnostic so a NativeWind registry can be added later (react-native-reusables ships one registry per engine — copy that shape). |
| Motion | motion.dev (`motion/react`) | **Reanimated 4.5+** + `react-native-worklets` | motion.dev has **no** RN support. Moti is dormant (Reanimated-3-era). Reanimated's `withSpring` is the same damped-harmonic-oscillator model — `personalities` configs port **verbatim** (§3). |
| Haptics | `web-haptics` | **`expo-haptics`** | A strict upgrade. Same `HapticsProvider`/`useHaptics()`/preset contract; only the engine swaps (§4). |
| Icons | lucide-react | `lucide-react-native` | 1:1 names. |

Deliberately **rejected**:

- **`@expo/ui`** (SwiftUI/Jetpack Compose components) as the base — it renders
  the *platform's* look; seamui's embossed/debossed language is custom-drawn.
  It remains an allowed implementation detail behind surfaces where a platform
  sheet is genuinely better UX (e.g. select on iOS), never as the visible skin.
- **Moti / motion.dev / CSS-in-JS animation shims** — Reanimated only.
- **react-native-web reunification** — out of scope, permanently until decided
  otherwise at the epic level.

---

## 2. The three pillars, translated

### Springs, not durations → `withSpring`, not `withTiming`

Every transform/position transition is a spring from the native motion lib
(`@/lib/motion`, native build — §3). `withTiming` is allowed in exactly the
same two places as web: **opacity fades** (`fades.*`) and **layout dimensions**
that can't spring cleanly. Never write an inline `withSpring({ stiffness, … })`
or an ad-hoc `withTiming(x, { duration: 300 })` in a component — tokens only.
The `motion-contract-native` gate (§8) bans this mechanically.

One engine-level upgrade: every Reanimated config accepts
`reduceMotion: ReduceMotion.System`. Bake it into the exported tokens so the
system setting is honored even if a component forgets to branch — the explicit
`reduced.*` variant branch (§6) is still required for feedback parity.

### Touch feedback → `Pressable` + UI-thread scale + real haptics

Press = `onPressIn` drives a shared value to `depth.pressed` with
`springs.press`; `onPressOut` settles with `springs.snappy`. The animation runs
on the UI thread (worklet), which is what satisfies "reacts in ≤1 frame" — a
JS-thread `Animated` fallback does not. `Pressable` fires press events for
keyboard and screen-reader activation too; never add a parallel touch-only
path. Haptics fire alongside per the same wiring rules as web (§4).

### Depth → layered `boxShadow` (yes, including inset)

RN's New-Architecture `boxShadow` style prop takes multiple comma-separated
shadows **and `inset`** — so the debossed/embossed rule survives intact:

> The container/track the user acts *into* is **debossed** (`bg-muted` +
> inset well shadow). The thing the user selects, types, or activates is
> **embossed** (raised key shadow on a light surface).

Caveats you must design around:
- Inset shadows need **Android 10+**; outset need Android 9+. Below that,
  fall back to a 1px border + background tint that still reads as a well.
  Test the fallback; don't let old Android see flat gray boxes.
- Android rasterizes blur differently from iOS — re-tune the six shadow tokens
  per platform by eye on real devices, don't transliterate the CSS values
  numerically and call it done.
- **Squircles**: default = `borderRadius` + `borderCurve: "continuous"` (core;
  iOS-only effect, harmless on Android). A true Figma-squircle lib
  (e.g. `expo-squircle-view`) is reserved for hero surfaces (cards, dialogs)
  where the cost of an extra native view is justified — never on list items.
  As on web: circles (avatars, thumbs, dots) stay true circles.

---

## 3. `lib/motion` on native — the token translation

The native motion lib is a **peer of the web one, same export names, same
semantics**, registry-shipped the same way. Consumers retune the whole library
by swapping `personalities` picks, exactly like web.

| Web export | Native translation |
|---|---|
| `personalities` / `springs` | Port the `{ stiffness, damping, mass }` numbers **verbatim** into `withSpring` configs — the physics model is identical. Two gotchas: (a) Reanimated 4's *default* spring changed (a stiff "Gentle" config) — always pass explicit configs, never rely on defaults; (b) motion's `restDelta`/`restSpeed` become Reanimated's single `energyThreshold` — tune once in the lib, not per component. Add `reduceMotion: ReduceMotion.System` to every exported config. |
| `fades` | `withTiming` configs with the same durations (0.12s / 0.2s → ms). Opacity-only, as on web. |
| `depth` | Same scalars (`pressed: 0.97`, etc.). `overlay`/`modal` become **Reanimated enter/exit definitions** (see `condense` row). |
| `condense` | **Does not port — and the rule inverts.** `condense` exists on web only because Base UI awaits CSS transitions before unmount. On native, Reanimated owns mount/unmount (`entering`/`exiting`, or Reanimated CSS transitions), so **spring exits are allowed — and expected — on native overlays.** Overlay enter = rise + fade on `springs.surface`; modal = rise higher; exit = fall back + fade, slightly quicker. Do not recreate a CSS-string workaround; if you find yourself porting `data-starting-style`, stop. |
| `shake` | A worklet keyframe sequence on translateX, same amplitudes/duration. Pair with `reduced.flash`. |
| `reduced` | Same four variants (`pressed` dim, `fadeIn`, `instant`, `flash`), expressed as Reanimated configs/targets. Mandatory branch in every animated component (§6). |

Detection: use Reanimated's `useReducedMotion()` (reads the OS setting) where
web uses `motion/react`'s hook. Same name, same branching pattern.

---

## 4. `lib/haptics` on native

The provider/hook/preset contract is **unchanged**: `<HapticsProvider>` →
`useHaptics()` → `trigger(preset)`; silent no-op without a provider; never
throws, never blocks, never gates on reduced motion. Only the engine swaps:

| Preset | Web (`web-haptics`) | Native (`expo-haptics`) |
|---|---|---|
| `tap` | vibrate light | `impactAsync(ImpactFeedbackStyle.Light)` |
| `tick` | vibrate light | `selectionAsync()` (on Android, `performAndroidHapticsAsync(AndroidHaptics.SegmentTick)` where finer grain is wanted, e.g. slider) |
| `success` | vibrate pattern | `notificationAsync(NotificationFeedbackType.Success)` |
| `error` | vibrate pattern | `notificationAsync(NotificationFeedbackType.Error)` |

Wiring rules are identical to web (CLAUDE.md §3b): `Button`/`Toggle` fire
`tap` on press-in with a `haptic` prop escape hatch; state controls fire `tick`
on commit; OTP fires `error` on invalid. All calls fire-and-forget
(`void trigger(...)` with a swallow) — an awaited haptic is a blocked press.

---

## 5. Component patterns (the native §5)

### Pattern A — pressable controls

No `render`-prop dance is needed on native (no native-`<button>` constraint).
The foundation `Button` is: `Pressable` + `Animated.View` (or an animated
Pressable) with press-in/out springs on a shared value, `cva` variants via
Uniwind classnames, `accessibilityRole="button"`, disabled handling, haptic
`tap`. **Everything button-shaped dogfoods it** — same rule as web: render the
native `Button`, or reuse `buttonVariants(...)` classes when a primitive owns
the pressable (composite focus parents), never paste the base class string or
an inline press spring.

### State styling — props, not data attributes

RN has no `data-*` attribute selectors. State reaches styles two ways, and
components must use both:

1. **Visual**: branch `cva` variants on the state prop/context rn-primitives
   exposes (`checked`, `pressed`, `open`, `disabled`) — the web
   `data-[checked]:…` selector becomes a JS ternary into `cn()`/`cva`.
2. **Assistive**: pass `accessibilityState={{ checked, disabled, expanded }}`
   (rn-primitives handles most of this — verify per part, don't assume).

If a classname contains `data-[` in a native component, it's a bug.

### Overlays

rn-primitives portals + Reanimated enter/exit per §3's `condense` row. Modal
backdrops dim on the same clock as the surface. Additional touch-first
redesigns (these are *product* decisions, already made — implement, don't
re-debate):

- **tooltip / preview-card**: hover doesn't exist → long-press to open,
  release/tap-away to dismiss.
- **context-menu**: right-click → long-press.
- **select / combobox**: the popup list may render as a bottom sheet on small
  screens — the trigger stays a seamui debossed well either way.
- **drawer**: gesture-driven sheet (`react-native-gesture-handler` +
  Reanimated); respect the platform back gesture on Android.

### Entry wells

Inputs, OTP slots, number-field groups, select triggers are **debossed wells,
not keys** — same as web. `TextInput` styled with the well tokens; no press
scale on wells. Composer submit maps `form.requestSubmit()`/`isComposing` →
`onSubmitEditing` + `submitBehavior`.

---

## 6. Reduced motion — still a variant, never a kill switch

CLAUDE.md §5b applies word-for-word. Native specifics:

- Branch with Reanimated's `useReducedMotion()`; swap movement for opacity
  (`reduced.pressed` dim on press, `reduced.fadeIn` entrances,
  `reduced.instant` layout jumps, `reduced.flash` errors).
- Every exported motion token also carries `ReduceMotion.System` as
  defense-in-depth — but that alone yields *no* feedback (animation snaps to
  end state), so the explicit `reduced.*` branch is still mandatory for
  press/enter feedback.
- Anti-pattern to grep for and delete on sight, same as web:
  `reduceMotion ? undefined : …` on a feedback animation.
- Haptics are not motion — they never gate on the setting.

---

## 7. Repo layout, registry, CLI

```
apps/www/registry/seam-native/     # native product sources (peer of registry/seam)
  lib/{motion,haptics,utils}       # native builds of the foundation libs
  theme/                           # generated native tokens (see tokens rule)
  ui/<name>.tsx                    # one file per component, RN imports only
apps/www/registry-native.json      # native registry index
apps/www/public/r/native/*.json    # build output — never hand-edit
apps/native/                       # Expo showcase app (the verification surface)
packages/seamui/                   # CLI grows a --platform axis
```

- **Tokens rule (replaces the web two-file rule):** one canonical
  platform-neutral token source generates *both* `theme/theme.css` (web) and
  the native theme (colors precomputed from oklch to hex — RN doesn't parse
  oklch; shadows as `boxShadow` strings; radii as numbers). Edit the source,
  regenerate both, and the drift gate verifies. Never hand-edit a generated
  theme file.
- **Registry:** standard shadcn item schema, unchanged. Native items list RN
  npm deps (`react-native-reanimated`, `@rn-primitives/*`, `expo-haptics`, …)
  and `registryDependencies` pointing at `…/r/native/*.json` URLs. Build with
  the same `shadcn build` pipeline; commit the JSON; drift-checked in CI.
- **CLI:** `seamui init --platform native` scaffolds/configures an Expo app
  (Uniwind, worklets/reanimated config, foundation install:
  `theme,utils,motion,haptics`); `add` resolves against the native registry
  when the project is native. Stay a thin wrapper over `shadcn` — never
  reimplement the protocol.
- **Dark mode:** `useColorScheme()` + theme provider (Uniwind themes), not a
  `.dark` class. Tokens must flip; depth must still read.
- **Monorepo:** Expo ≥52 auto-configures Metro for bun workspaces — do NOT
  hand-set `watchFolders`/`nodeModulesPaths`. Keep exactly one hoisted version
  of react/react-native.

---

## 8. Quality gates (native)

Web gates keep running untouched. Native adds siblings, same philosophy:

- **`motion-contract-native`** — over `registry/seam-native/ui/`: bans inline
  `stiffness:`/`damping:`/`mass:` outside the lib, inline `duration:` outside
  the lib (allowlist file with justifications, as on web), and
  `reduceMotion ? undefined` kill switches. Add to `bun run verify`.
- **Drift** — `registry:build` covers `public/r/native/**`; the token
  generator's outputs (web CSS + native theme) are diff-checked.
- **The four gates, on device/simulator** (compilation proves nothing about
  motion — CLAUDE.md §6 applies): ① **touch** — press-in visibly scales within
  a frame and haptic fires; ② **assistive activation** — screen-reader/keyboard
  activation triggers the same feedback and action; ③ **reduced motion** — flip
  the OS setting: feedback *changes to opacity*, never disappears; ④ **dark
  mode + both platforms** — tokens flip, debossed/embossed still reads on iOS
  *and* Android (including the <Android 10 inset fallback). Verify in the
  `apps/native` showcase app before declaring any component done.

---

## 9. Building a native component — the mechanical checklist

For any native `<name>` (mirror of CLAUDE.md §4):

1. **Read the web component first** — `registry/seam/ui/<name>.tsx` is the
   spec: anatomy, props, variants, motion spec, a11y. The native variant keeps
   the same exported names, `data-slot` equivalents (`testID`/slot props), and
   prop surface unless a platform reason forces a divergence — document any
   divergence in the file header comment.
2. **Read the rn-primitives docs** for the part; note what state it exposes via
   context/props and what `accessibilityState` it already sets.
3. **Create** `registry/seam-native/ui/<name>.tsx`: RN imports only, Uniwind
   classnames via `cva`/`cn`, motion tokens from the native `@/lib/motion`,
   haptics per §4, reduced-motion branch per §6, well/key mapping per §2.
4. **Register** in `registry-native.json` (npm deps + native registry URLs) and
   run `bun run registry:build`.
5. **Showcase screen** in `apps/native` exercising every variant.
6. **Verify the four native gates (§8) on iOS and Android** before declaring
   done.

---

## Non-negotiables recap

- Parallel implementation; shared tokens + contract, never shared component code.
- Reanimated only. No motion.dev, no Moti, no inline spring/duration configs.
- Spring exits are **allowed** on native overlays (the web `condense` rule is web-only).
- Press feedback on the UI thread + expo-haptics behind the unchanged `useHaptics()` contract.
- Debossed/embossed via layered/inset `boxShadow`, with a tested <Android 10 fallback.
- No `data-[` selectors on native — state styles branch on props.
- Reduced motion is a variant, never a kill switch; haptics never gate on it.
- Edit token sources, regenerate, commit the JSON; never hand-edit `public/r/native/**`.
- Verify on both platforms in the showcase app before declaring done.
