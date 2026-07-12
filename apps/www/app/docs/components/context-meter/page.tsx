import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ContextMeterDemo from "@/registry/seam/examples/context-meter-demo"
import ContextMeterSizes from "@/registry/seam/examples/context-meter-sizes"
import ContextMeterCritical from "@/registry/seam/examples/context-meter-critical"

export const metadata: Metadata = {
  title: "Context Meter — seamui",
  description:
    "Context-window usage ring on Base UI Meter; turns destructive past a critical threshold.",
}

export default function ContextMeterDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Context Meter</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A compact ring gauge of context-window usage, sized to sit inline in a
        composer footer or workbench header. Map tokens-used and window-size
        straight onto <code>value</code> and <code>max</code>.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <ContextMeterDemo />,
            code: exampleSource("context-meter-demo"),
          },
          {
            key: "sizes",
            title: "Sizes",
            component: <ContextMeterSizes />,
            code: exampleSource("context-meter-sizes"),
          },
          {
            key: "critical",
            title: "Critical threshold",
            component: <ContextMeterCritical />,
            code: exampleSource("context-meter-critical"),
          },
        ]}
      />

      <Install name="context-meter" />

      <Notes>
        <li>
          Built on Base UI <code>Meter</code>: it announces as a measurement (
          <code>role=&quot;meter&quot;</code>), not task progress — context
          usage is a level, not a loading bar. Pass{" "}
          <code>getAriaValueText</code> for a friendlier announcement (e.g.
          &ldquo;124k of 200k tokens&rdquo;).
        </li>
        <li>
          Past <code>criticalAt</code> (default 0.85) the arc and value turn
          destructive — the monochrome theme&apos;s one &ldquo;act now&rdquo;
          hue — and <code>data-critical</code> appears for styling hooks.
        </li>
        <li>
          Fill changes ease the dash offset (a layout dimension that can&apos;t
          spring cleanly, same rule as Meter&apos;s width) and stop animating
          under reduced motion via <code>motion-reduce:transition-none</code>.
        </li>
      </Notes>
    </main>
  )
}
