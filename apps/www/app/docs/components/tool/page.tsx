import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
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

      <ComponentPreview code={exampleSource("tool-demo")}>
        <ToolDemo />
      </ComponentPreview>

      <Install name="tool" />

      <Section title="Usage">
        <CodeBlock>{`import {
  Tool,
  ToolHeader,
  ToolStatus,
  ToolContent,
  Reasoning,
  ReasoningTrigger,
  ReasoningContent,
} from "@/components/ui/tool"`}</CodeBlock>
        <CodeBlock>{`<Tool defaultOpen>
  <ToolHeader title="search_docs" status="done" />
  <ToolContent>
    <CodeBlock code={result} language="json" />
  </ToolContent>
</Tool>`}</CodeBlock>
        <p className="text-muted-foreground text-sm">
          <code>status</code> is one of <code>pending</code>,{" "}
          <code>running</code>, <code>done</code>, or <code>error</code> — it
          maps onto the AI SDK&apos;s tool-part states without depending on them.
        </p>
      </Section>

      <Section title="Examples">
        <h3 className="text-muted-foreground/80 mt-4 text-xs font-medium">
          Error
        </h3>
        <ComponentPreview code={exampleSource("tool-error")}>
          <ToolError />
        </ComponentPreview>

        <h3 className="text-muted-foreground/80 mt-4 text-xs font-medium">
          Reasoning
        </h3>
        <ComponentPreview code={exampleSource("reasoning-demo")}>
          <ReasoningDemo />
        </ComponentPreview>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Expanding eases the panel height (the one thing seamui animates with a
          duration, like opacity) and snaps instantly under reduced motion. The
          trigger presses with <code>depth.pressed</code> — dogfooded via{" "}
          <code>buttonVariants</code> and a motion render, since Collapsible owns
          the trigger&apos;s ref. The status <code>Spinner</code> carries its own
          reduced-motion pulse.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Built on Base UI Collapsible, so the trigger exposes{" "}
          <code>aria-expanded</code> and the panel is properly associated. The
          status chip is a polite live region, so a state change is announced
          without re-reading the whole row.
        </p>
      </Section>
    </main>
  )
}
