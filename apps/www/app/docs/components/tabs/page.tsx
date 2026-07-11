import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import TabsDemo from "@/registry/seam/examples/tabs-demo"
import TabsSmall from "@/registry/seam/examples/tabs-small"
import TabsIcons from "@/registry/seam/examples/tabs-icons"

export const metadata: Metadata = {
  title: "Tabs — seamui",
  description: "Tabs built on Base UI; a motion indicator springs to the active tab.",
}

export default function TabsDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Tabs</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Switch between related panels. The active-tab indicator physically
        slides between tabs — seamui&apos;s layout-animation pattern.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <TabsDemo />, code: exampleSource("tabs-demo") },
          { key: "icons", title: "With icons", component: <TabsIcons />, code: exampleSource("tabs-icons") },
          { key: "small", title: "Small", component: <TabsSmall />, code: exampleSource("tabs-small") },
        ]}
      />

      <Install name="tabs" />

      <Notes>
        <li>
          The indicator is a shared-layout <code>motion.span</code> (
          <code>layoutId</code>) inside the active tab — selection change
          springs it to the new tab with <code>springs.snappy</code>, fully
          interruptible. Each Tabs instance scopes its own <code>layoutId</code>{" "}
          so multiple groups never fight.
        </li>
        <li>
          Triggers reuse <code>buttonVariants</code> classes on the
          composite-safe element (no <code>Button</code> wrapper) so Base
          UI&apos;s roving arrow-key focus keeps working.
        </li>
        <li>
          Full <code>role="tablist"</code> semantics with arrow-key navigation
          and automatic activation; controlled via <code>value</code> /{" "}
          <code>onValueChange</code>, or uncontrolled via{" "}
          <code>defaultValue</code>.
        </li>
      </Notes>
    </main>
  )
}
