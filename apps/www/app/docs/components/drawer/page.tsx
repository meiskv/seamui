import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import DrawerDemo from "@/registry/seam/examples/drawer-demo"

export const metadata: Metadata = {
  title: "Drawer — seamui",
  description: "Mobile bottom-sheet built on Base UI's native swipe engine.",
}

export default function DrawerDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Drawer</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A bottom sheet that slides up and dismisses with a downward swipe — the
        most mobile-native surface in seamui.
      </p>

      <ComponentPreview code={exampleSource("drawer-demo")}>
        <DrawerDemo />
      </ComponentPreview>

      <Install name="drawer" />

      <Section title="Usage">
        <CodeBlock>{`import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"`}</CodeBlock>
        <CodeBlock>{`<Drawer>
  <DrawerTrigger render={<Button>Open</Button>} />
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Title</DrawerTitle>
      <DrawerDescription>Description</DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Unlike the other overlays, the Drawer defers entirely to Base UI&apos;s
          native drawer engine: a spring-based slide-up, drag-to-dismiss from the
          grab handle, and a backdrop that dims in proportion to the drag. That
          physics <em>is</em> the seam mobile-depth philosophy, so seamui styles
          it and stays out of the way — no <code>motion</code> wrapper needed.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Traps focus and locks scroll like Dialog. Fully keyboard operable;
          swipe is an enhancement, not the only way to dismiss (Escape and
          backdrop click work too).
        </p>
      </Section>
    </main>
  )
}
