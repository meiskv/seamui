import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ModeSelectorDemo from "@/registry/seam/examples/mode-selector-demo"
import ModeSelectorPermission from "@/registry/seam/examples/mode-selector-permission"

export const metadata: Metadata = {
  title: "Mode Selector — seamui",
  description:
    "Agent/plan/ask segmented control — a compact recipe over Toggle Group for composer footers.",
}

export default function ModeSelectorDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Mode Selector</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The composer&apos;s mode toggle — agent / plan / ask, or permission
        modes — compacted to footer height. A thin recipe over Toggle Group: the
        debossed well with the active mode risen as the embossed key.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <ModeSelectorDemo />,
            code: exampleSource("mode-selector-demo"),
          },
          {
            key: "permission",
            title: "Permission modes",
            component: <ModeSelectorPermission />,
            code: exampleSource("mode-selector-permission"),
          },
        ]}
      />

      <Install name="mode-selector" />

      <Notes>
        <li>
          Base UI Toggle Group semantics: <code>{'value={["agent"]}'}</code> /{" "}
          <code>onValueChange</code>, single-select by default; arrow keys rove
          between options.
        </li>
        <li>
          Press feedback, haptics, and the reduced-motion variant all come from
          the <code>Toggle</code> foundation — this recipe only sets sizing.
        </li>
      </Notes>
    </main>
  )
}
