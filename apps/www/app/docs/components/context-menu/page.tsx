import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ContextMenuDemo from "@/registry/seam/examples/context-menu-demo"

export const metadata: Metadata = {
  title: "Context Menu — seamui",
  description: "Right-click menu built on Base UI with seam overlay-depth entrance.",
}

export default function ContextMenuDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Context Menu</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A menu opened by right-click (or long-press), anchored to the pointer.
        Same overlay depth as the dropdown menu.
      </p>

      <ComponentPreview code={exampleSource("context-menu-demo")}>
        <ContextMenuDemo />
      </ComponentPreview>

      <Install name="context-menu" />

      <Section title="Usage">
        <CodeBlock>{`import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu"`}</CodeBlock>
        <CodeBlock>{`<ContextMenu>
  <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Reload</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Shares the menu&apos;s overlay entrance: <code>depth.overlay</code>{" "}
          with <code>springs.surface</code>, anchored to the cursor position by
          Base UI. Honors <code>prefers-reduced-motion</code>.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Opens on <code>contextmenu</code> and long-press; full keyboard
          navigation once open; dismisses on Escape and outside interaction.
        </p>
      </Section>
    </main>
  )
}
