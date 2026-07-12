import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ChecksPanelDemo from "@/registry/seam/examples/checks-panel-demo"
import ChecksPanelFailure from "@/registry/seam/examples/checks-panel-failure"

export const metadata: Metadata = {
  title: "Checks Panel — seamui",
  description:
    "CI checks list with expandable failure logs and a merge button that names its method.",
}

export default function ChecksPanelDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Checks Panel</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        CI, deploys, and reviews as a pass/fail list on a raised card — failed
        logs one disclosure away, and a merge button that says what it will do
        (&ldquo;Squash and merge&rdquo;, not just &ldquo;Merge&rdquo;).
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <ChecksPanelDemo />,
            code: exampleSource("checks-panel-demo"),
          },
          {
            key: "failure",
            title: "Failure with log",
            component: <ChecksPanelFailure />,
            code: exampleSource("checks-panel-failure"),
          },
        ]}
      />

      <Install name="checks-panel" />

      <Notes>
        <li>
          Rows sit flat in the card (telemetry, not keys); a row with children
          becomes a disclosure exposing its log in a carved-in well. The trigger
          dogfoods <code>buttonVariants</code> with the motion press render —
          the composite-safe path from <code>tool</code>.
        </li>
        <li>
          Monochrome rule: <code>fail</code> is the one hue; every status also
          reads by icon shape and announces as text (&ldquo;typecheck
          failed&rdquo;). <code>running</code> is the shared{" "}
          <code>Spinner</code>.
        </li>
        <li>
          No CI-provider coupling: rows are composition, <code>onMerge</code>{" "}
          comes off the <code>MergeButton</code> (<code>method</code>:{" "}
          <code>merge</code> / <code>squash</code> / <code>rebase</code>).
          Disable it while checks are red — as the examples do.
        </li>
      </Notes>
    </main>
  )
}
