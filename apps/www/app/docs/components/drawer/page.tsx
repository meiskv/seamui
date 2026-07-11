import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import DrawerDemo from "@/registry/seam/examples/drawer-demo"
import DrawerMenu from "@/registry/seam/examples/drawer-menu"
import DrawerForm from "@/registry/seam/examples/drawer-form"

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

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <DrawerDemo />, code: exampleSource("drawer-demo") },
          { key: "menu", title: "Action sheet", component: <DrawerMenu />, code: exampleSource("drawer-menu"), description: "A list of actions — the mobile share-sheet pattern." },
          { key: "form", title: "Form", component: <DrawerForm />, code: exampleSource("drawer-form"), description: "Collect input without leaving the sheet." },
        ]}
      />

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
          Swipe-to-dismiss stays Base UI&apos;s native drag — a 1:1 gesture from
          the grab handle with a backdrop that dims in proportion to the drag.
          The non-gesture open and close now use the seam <code>condense</code>{" "}
          sheet from <code>@/lib/motion</code>: keyed to Base UI&apos;s{" "}
          <code>data-starting-style</code> / <code>data-ending-style</code>, it
          slides up from off-screen and fades in, then falls back down and fades
          on dismiss. The slide rides the standalone <code>translate</code>{" "}
          property since Base UI owns <code>transform</code> for the drag, and it
          self-suppresses mid-swipe so the gesture stays 1:1. Under{" "}
          <code>prefers-reduced-motion</code> it fades only.
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
