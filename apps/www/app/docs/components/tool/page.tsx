import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ToolDemo from "@/registry/seam/examples/tool-demo"
import ToolError from "@/registry/seam/examples/tool-error"
import ReasoningDemo from "@/registry/seam/examples/reasoning-demo"

export const metadata: Metadata = {
  title: "Tool — seamui",
  description:
    "Agentic step disclosure — status chip, collapsible result. Includes Reasoning.",
}

export default function ToolDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Tool</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A disclosure for what the model is doing — a tool call or a step of
        reasoning. The row is telemetry, not a key: a quiet debossed strip with
        a status chip; the result opens in the well below. <code>Reasoning</code>{" "}
        is the same shape for chain-of-thought.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <ToolDemo />, code: exampleSource("tool-demo") },
          { key: "error", title: "Error", component: <ToolError />, code: exampleSource("tool-error") },
          { key: "reasoning", title: "Reasoning", component: <ReasoningDemo />, code: exampleSource("reasoning-demo") },
        ]}
      />

      <Install name="tool" />

      <Notes>
        <li>
          <code>status</code> is one of <code>pending</code>,{" "}
          <code>running</code>, <code>done</code>, or <code>error</code> — it
          maps onto the AI SDK&apos;s tool-part states without depending on
          them.
        </li>
        <li>
          Expanding eases the panel height (the one thing seamui animates with
          a duration, like opacity) and snaps instantly under reduced motion;
          the status <code>Spinner</code> carries its own reduced-motion pulse.
        </li>
        <li>
          The trigger presses with <code>depth.pressed</code> — dogfooded via{" "}
          <code>buttonVariants</code> and a motion render, since Collapsible
          owns the trigger&apos;s ref.
        </li>
        <li>
          Built on Base UI Collapsible: the trigger exposes{" "}
          <code>aria-expanded</code> and the panel is properly associated. The
          status chip is a polite live region, so a state change is announced
          without re-reading the whole row.
        </li>
      </Notes>
    </main>
  )
}
