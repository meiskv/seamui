"use client"

import * as React from "react"
import Link from "next/link"
import {
  BookOpen,
  Check,
  Link2,
  RotateCcw,
  Save,
  Shuffle,
  Trash2,
} from "lucide-react"

import { useCopy } from "@/lib/use-copy"
import { Button } from "@/registry/seam/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/registry/seam/ui/drawer"
import { Input } from "@/registry/seam/ui/input"
import { SeamMark } from "@/components/site/logo"
import { ThemeToggle } from "@/components/site/theme-toggle"
import { findSpec, SPECS } from "@/lib/playground/specs"
import {
  configHref,
  decodeConfig,
  defaultValues,
  deletePreset,
  encodeConfig,
  loadPresets,
  randomValues,
  savePreset,
  type Preset,
} from "@/lib/playground/state"
import type {
  KnobValue,
  KnobValues,
  PlaygroundSpec,
} from "@/lib/playground/types"
import { ComponentList } from "./component-list"
import { ControlPanel } from "./control-panel"
import { PreviewPane } from "./preview-pane"

/** Saved-preset controls — the "save" half of the playground. */
function PresetBar({
  spec,
  presets,
  onApply,
  onSave,
  onDelete,
}: {
  spec: PlaygroundSpec
  presets: Preset[]
  onApply: (values: KnobValues) => void
  onSave: (name: string) => void
  onDelete: (name: string) => void
}) {
  const [name, setName] = React.useState("")

  return (
    <div className="space-y-2 border-t px-4 py-4">
      <p className="text-muted-foreground text-xs font-medium">
        Saved variants
      </p>

      {presets.length > 0 ? (
        <ul className="space-y-1">
          {presets.map((preset) => (
            <li key={preset.name} className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onApply(preset.values)}
                className="min-w-0 flex-1 justify-start font-normal"
              >
                <span className="truncate">{preset.name}</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Delete ${preset.name}`}
                onClick={() => onDelete(preset.name)}
                className="text-muted-foreground size-7 shrink-0"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground text-xs">
          Tune {spec.title.toLowerCase()}, then save the configuration to reuse
          it later on this device.
        </p>
      )}

      <form
        className="flex items-center gap-1.5 pt-1"
        onSubmit={(e) => {
          e.preventDefault()
          onSave(name)
          setName("")
        }}
      >
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name this variant"
          aria-label="Preset name"
          className="h-8 min-w-0 flex-1 text-sm"
        />
        <Button
          type="submit"
          variant="secondary"
          size="sm"
          disabled={name.trim().length === 0}
          aria-label="Save variant"
        >
          <Save className="size-3.5" />
          Save
        </Button>
      </form>

      {/* A saved variant is device-local; the link is how it travels. */}
      <p className="text-muted-foreground pt-1 text-xs">
        Presets stay on this device — use “Copy link” to share a configuration.
      </p>
    </div>
  )
}

export function PlaygroundApp() {
  const [spec, setSpec] = React.useState<PlaygroundSpec>(() => SPECS[0])
  const [values, setValues] = React.useState<KnobValues>(() =>
    defaultValues(SPECS[0])
  )
  const [presets, setPresets] = React.useState<Preset[]>([])
  const { copied, copy } = useCopy()

  // Hydrate from the URL once on mount. Reading `location` in an effect (not
  // during render) keeps SSR and the client's first paint identical, and
  // sidesteps the Suspense boundary `useSearchParams` would force on the page.
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const fromUrl = findSpec(params.get("c"))
    setSpec(fromUrl)
    setValues(decodeConfig(fromUrl, params.get("k") ?? ""))
    setPresets(loadPresets(fromUrl))
  }, [])

  // Keep the URL in step with the configuration so the address bar is always
  // the shareable link. replaceState (not push) so tuning a knob doesn't
  // stack dozens of history entries between the user and the page they came from.
  React.useEffect(() => {
    window.history.replaceState(null, "", configHref(spec, values))
  }, [spec, values])

  const selectSpec = (next: PlaygroundSpec) => {
    setSpec(next)
    setValues(defaultValues(next))
    setPresets(loadPresets(next))
  }

  const setKnob = (id: string, next: KnobValue) =>
    setValues((current) => ({ ...current, [id]: next }))

  const code = React.useMemo(() => spec.code(values), [spec, values])
  const pristine = encodeConfig(spec, values) === ""

  // The rail owns its own scrolling so Generate can sit in a pinned footer:
  // only the body between the header and the footer scrolls.
  const controls = (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <ControlPanel spec={spec} values={values} onChange={setKnob} />
        <PresetBar
          spec={spec}
          presets={presets}
          onApply={setValues}
          onSave={(name) => setPresets(savePreset(spec, name, values))}
          onDelete={(name) => setPresets(deletePreset(spec, name))}
        />
      </div>

      {/* Generate acts on every knob above, so it stays reachable at the
          bottom of the rail no matter how far the body has scrolled.
          `default` is the inverted key — near-black on light, white on dark. */}
      <div className="border-border/60 shrink-0 border-t p-4">
        <Button
          haptic="tick"
          className="w-full"
          title="Randomize every option above"
          onClick={() => setValues(randomValues(spec))}
        >
          <Shuffle />
          Generate
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen">
      <header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
        <div className="flex h-14 items-center gap-2 px-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-tight"
          >
            <SeamMark className="size-5" />
            seamui
          </Link>
          <span className="text-muted-foreground hidden text-sm sm:inline">
            / Playground
          </span>

          <div className="ml-auto flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                copy(`${window.location.origin}${configHref(spec, values)}`)
              }
            >
              {copied ? (
                <Check className="size-3.5" />
              ) : (
                <Link2 className="size-3.5" />
              )}
              <span className="hidden sm:inline">
                {copied ? "Copied" : "Copy link"}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={pristine}
              onClick={() => setValues(defaultValues(spec))}
            >
              <RotateCcw className="size-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              render={<Link href={`/docs/components/${spec.id}`} />}
              aria-label={`${spec.title} documentation`}
            >
              <BookOpen className="size-4" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left rail — the component picker. */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto border-r p-4 lg:block">
          <ComponentList
            specs={SPECS}
            activeId={spec.id}
            onSelect={selectSpec}
          />
        </aside>

        <main className="min-w-0 flex-1 p-4 lg:p-6">
          {/* Mobile: the two rails collapse into bottom sheets. */}
          <div className="mb-3 flex items-center gap-2 lg:hidden">
            <Drawer>
              <DrawerTrigger render={<Button variant="secondary" size="sm" />}>
                {spec.title}
              </DrawerTrigger>
              <DrawerContent className="max-h-[80vh]">
                <div className="overflow-y-auto p-4">
                  <ComponentList
                    specs={SPECS}
                    activeId={spec.id}
                    onSelect={selectSpec}
                  />
                </div>
              </DrawerContent>
            </Drawer>

            <Drawer>
              <DrawerTrigger render={<Button variant="secondary" size="sm" />}>
                Customize
              </DrawerTrigger>
              {/* A definite height (not max-h) gives the pinned footer inside
                  `controls` something to anchor to. */}
              <DrawerContent className="h-[80vh] gap-0 px-0 pb-0">
                <div className="min-h-0 flex-1">{controls}</div>
              </DrawerContent>
            </Drawer>
          </div>

          <PreviewPane spec={spec} values={values} code={code} />
        </main>

        {/* Right rail — the variant tuner. */}
        <aside className="bg-card sticky top-14 hidden h-[calc(100vh-3.5rem)] w-72 shrink-0 border-l xl:block">
          {controls}
        </aside>
      </div>
    </div>
  )
}
