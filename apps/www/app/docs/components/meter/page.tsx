import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import MeterDemo from "@/registry/seam/examples/meter-demo"
import MeterLevels from "@/registry/seam/examples/meter-levels"

export const metadata: Metadata = {
  title: "Meter — seamui",
  description: "Meter (static measurement) built on Base UI.",
}

export default function MeterDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Meter</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Displays a measurement within a known range — like disk usage or a
        score. Unlike Progress, it represents a static value, not task progress.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <MeterDemo />, code: exampleSource("meter-demo") },
          { key: "levels", title: "Levels", component: <MeterLevels />, code: exampleSource("meter-levels") },
        ]}
      />

      <Install name="meter" />

      <Notes>
        <li>
          Exposes <code>role="meter"</code> with value/min/max —
          announced as a measurement, not task progress — and associates{" "}
          <code>MeterLabel</code> for a readable name.
        </li>
      </Notes>
    </main>
  )
}
