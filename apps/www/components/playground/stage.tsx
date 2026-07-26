"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/docs/code-block"
import { Switch } from "@/registry/seam/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/seam/ui/tabs"
import type { PlaygroundSpec } from "@/lib/playground/types"
import { InspectLayer } from "./inspect-layer"

/**
 * The middle pane: the live component over drafting-dot paper, with the
 * generated source one tab away. Inspect rides in the header because it
 * applies to the preview, not the code.
 */
export function Stage({
  spec,
  preview,
  code,
}: {
  spec: PlaygroundSpec
  preview: React.ReactNode
  code: string
}) {
  const [inspect, setInspect] = React.useState(false)

  return (
    <Tabs defaultValue="preview" size="sm" className="gap-3">
      <div className="flex items-center justify-between gap-3">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <label className="text-muted-foreground flex items-center gap-2 text-sm">
          <Switch
            checked={inspect}
            onCheckedChange={setInspect}
            aria-label="Inspect slots"
          />
          Inspect
        </label>
      </div>

      <TabsContent value="preview">
        <div className="squircle bg-card relative overflow-hidden rounded-xl border shadow-resting">
          <div
            aria-hidden
            className="text-border/70 pointer-events-none absolute inset-0 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:18px_18px]"
          />
          <InspectLayer active={inspect}>
            <div
              className={cn(
                "relative flex min-h-[26rem] items-center justify-center p-8",
                spec.stageClassName
              )}
            >
              {preview}
            </div>
          </InspectLayer>
        </div>
      </TabsContent>

      <TabsContent value="code">
        <CodeBlock>{code}</CodeBlock>
        <p className="text-muted-foreground mt-2 text-xs">
          Import paths assume a fresh <code>seamui add</code> install (
          <code>@/components/ui/…</code>).
        </p>
      </TabsContent>
    </Tabs>
  )
}
