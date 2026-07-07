import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import TooltipDemo from "@/registry/seam/examples/tooltip-demo"

export const metadata: Metadata = {
  title: "Tooltip — seamui",
  description: "Tooltip built on Base UI; the surface rises with overlay depth.",
}

export default function TooltipDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Tooltip</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A popup that shows on hover or focus. It rises toward you with overlay
        depth — the canonical seam pattern for floating surfaces.
      </p>

      <ComponentPreview code={exampleSource("tooltip-demo")}>
        <TooltipDemo />
      </ComponentPreview>

      <Install name="tooltip" />

      <Section title="Usage">
        <CodeBlock>{`import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"`}</CodeBlock>
        <CodeBlock>{`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button>Hover</Button>} />
    <TooltipContent>Label</TooltipContent>
  </Tooltip>
</TooltipProvider>`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          On open the popup animates from <code>depth.overlay.initial</code>{" "}
          (opacity 0, scale 0.96, offset) to rest with{" "}
          <code>springs.surface</code> — the surface rising toward the user.
          Base UI owns positioning and mount; motion owns the entrance. Honors{" "}
          <code>prefers-reduced-motion</code>.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Wrap your app (or a subtree) in <code>TooltipProvider</code> to share
          delay and coordinate open state. Shows on hover and keyboard focus;
          dismisses on blur and Escape.
        </p>
      </Section>
    </main>
  )
}
