import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import TooltipDemo from "@/registry/seam/examples/tooltip-demo"
import TooltipIcon from "@/registry/seam/examples/tooltip-icon"
import TooltipShortcut from "@/registry/seam/examples/tooltip-shortcut"

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

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <TooltipDemo />, code: exampleSource("tooltip-demo") },
          { key: "icon", title: "Icon button", component: <TooltipIcon />, code: exampleSource("tooltip-icon"), description: "The most common case — a label for an icon-only control." },
          { key: "shortcut", title: "With shortcut", component: <TooltipShortcut />, code: exampleSource("tooltip-shortcut"), description: "Pair the hint with its keyboard shortcut via Kbd." },
        ]}
      />

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
          On open the popup grows from its trigger and fades in via the shared{" "}
          <code>condense</code> token from <code>@/lib/motion</code> — CSS keyed
          to Base UI&apos;s <code>data-starting-style</code> /{" "}
          <code>data-ending-style</code>, on a spring-shaped bezier. It rides the
          standalone <code>scale</code> property (Base UI owns{" "}
          <code>transform</code> for positioning) and falls back and fades on
          dismiss, awaited by Base UI rather than cut. Under{" "}
          <code>prefers-reduced-motion</code> it fades only.
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
