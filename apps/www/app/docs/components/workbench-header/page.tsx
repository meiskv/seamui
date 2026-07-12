import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import WorkbenchHeaderDemo from "@/registry/seam/examples/workbench-header-demo"
import WorkbenchShell from "@/registry/seam/examples/workbench-shell"

export const metadata: Metadata = {
  title: "Workbench Header — seamui",
  description:
    "The bar over the thread — session identity left, telemetry and actions right.",
}

export default function WorkbenchHeaderDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">
        Workbench Header
      </h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The frame over an agent session: title and branch on the left, live
        telemetry and actions on the right. Deliberately thin — the value is the
        consistent slots where <code>agent-status</code>,{" "}
        <code>branch-chip</code>, <code>context-meter</code>, and pickers snap
        in.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <WorkbenchHeaderDemo />,
            code: exampleSource("workbench-header-demo"),
          },
          {
            key: "shell",
            title: "The full shell",
            component: <WorkbenchShell />,
            code: exampleSource("workbench-shell"),
          },
        ]}
      />

      <Install name="workbench-header" />

      <Notes>
        <li>
          Canvas, not key: the bar is flat <code>bg-background</code> with a
          hairline border, so the embossed chips inside it carry the depth.
          Nothing in the frame animates.
        </li>
        <li>
          <code>WorkbenchHeaderTitle</code> renders a semantic{" "}
          <code>&lt;h1&gt;</code> (override via className/props as needed) and
          truncates; the bar is a <code>&lt;header&gt;</code> landmark.
        </li>
        <li>
          The &ldquo;full shell&rdquo; example is the v0 workbench skeleton —
          sidebar + header composed entirely from seamui parts, with the thread
          and review pane left as slots.
        </li>
      </Notes>
    </main>
  )
}
