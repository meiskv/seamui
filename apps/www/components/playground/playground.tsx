"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import { DEFAULT_SPEC_ID, findSpec, SPECS } from "@/lib/playground/registry"
import {
  decodeState,
  defaultsFor,
  deletePreset,
  encodeState,
  loadPresets,
  randomState,
  savePreset,
  type Preset,
} from "@/lib/playground/state"
import type { KnobState, KnobValue } from "@/lib/playground/types"
import { ComponentList } from "./component-list"
import { ControlPanel } from "./control-panel"
import {
  DEFAULT_ENV,
  EnvironmentPanel,
  type StageEnv,
} from "./environment-panel"
import { PresetBar } from "./preset-bar"
import { Stage } from "./stage"

/**
 * The playground: pick a component (left), tune it (right), read the result
 * (middle) as a live preview or as source you can paste into your app.
 *
 * Knob state lives in the URL rather than in `useSearchParams` so the route
 * stays statically rendered — the same `history.replaceState` approach the
 * docs VariantPreview uses for its variant hash.
 */
export function Playground() {
  const [specId, setSpecId] = React.useState(DEFAULT_SPEC_ID)
  const spec = findSpec(specId) ?? SPECS[0]

  const [state, setState] = React.useState<KnobState>(() => defaultsFor(spec))
  const [presets, setPresets] = React.useState<Preset[]>([])
  // Stage environment (motion + haptics) is deliberately separate from knob
  // state: it survives switching components and never reaches the codegen.
  const [env, setEnv] = React.useState<StageEnv>(DEFAULT_ENV)

  // Honor a deep link on mount: ?c=<component>&<knob>=<value>.
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const linked = findSpec(params.get("c"))
    if (linked) {
      setSpecId(linked.id)
      setState(decodeState(linked, params))
    }
  }, [])

  // Presets are per component, and only exist on this device.
  React.useEffect(() => {
    setPresets(loadPresets(specId))
  }, [specId])

  /** Reflect state in the URL without scrolling or pushing history entries. */
  const syncUrl = React.useCallback((next: KnobState, id: string) => {
    const target = findSpec(id)
    if (!target) return
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${encodeState(target, next)}`
    )
  }, [])

  const commit = React.useCallback(
    (next: KnobState) => {
      setState(next)
      syncUrl(next, specId)
    },
    [specId, syncUrl]
  )

  const selectSpec = (id: string) => {
    const next = findSpec(id)
    if (!next) return
    const defaults = defaultsFor(next)
    setSpecId(id)
    setState(defaults)
    syncUrl(defaults, id)
  }

  // Rendered on the server too, so guard `window` rather than assume it.
  const shareUrl =
    typeof window === "undefined"
      ? ""
      : `${window.location.origin}${window.location.pathname}?${encodeState(spec, state)}`

  return (
    <div className="mx-auto flex w-full max-w-[110rem] flex-col lg:flex-row">
      {/* Left: the component list. */}
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto border-r p-4 lg:block">
        <ComponentList activeId={specId} onSelect={selectSpec} />
      </aside>

      {/* Middle: the stage. */}
      <main className="min-w-0 flex-1 p-4 md:p-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              {spec.title}
            </h1>
            <p className="text-muted-foreground max-w-prose text-sm">
              {spec.blurb}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            render={<Link href={`/docs/components/${spec.id}`} />}
            className="text-muted-foreground"
          >
            Docs
            <ArrowUpRight />
          </Button>
        </div>

        <Stage
          spec={spec}
          preview={spec.render(state)}
          code={spec.code(state)}
          env={env}
        />
      </main>

      {/* Right: the controls. Below the stage until there's room beside it. */}
      <aside className="bg-card w-full shrink-0 border-t p-4 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:w-72 lg:overflow-y-auto lg:border-t-0 lg:border-l">
        <ControlPanel
          spec={spec}
          state={state}
          onChange={(id: string, value: KnobValue) =>
            commit({ ...state, [id]: value })
          }
          onShuffle={() => commit(randomState(spec))}
        />
        <div className="mt-5">
          <EnvironmentPanel env={env} onChange={setEnv} />
        </div>
        <div className="mt-5">
          <PresetBar
            presets={presets}
            shareUrl={shareUrl}
            onSave={(name) => setPresets(savePreset(specId, name, state))}
            onApply={(preset) =>
              commit({ ...defaultsFor(spec), ...preset.state })
            }
            onDelete={(name) => setPresets(deletePreset(specId, name))}
            onReset={() => commit(defaultsFor(spec))}
          />
        </div>
      </aside>
    </div>
  )
}
