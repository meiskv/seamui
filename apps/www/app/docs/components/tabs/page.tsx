import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import TabsDemo from "@/registry/seam/examples/tabs-demo"

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

      <ComponentPreview code={exampleSource("tabs-demo")}>
        <TabsDemo />
      </ComponentPreview>

      <Install name="tabs" />

      <Section title="Usage">
        <CodeBlock>{`import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"`}</CodeBlock>
        <CodeBlock>{`<Tabs defaultValue="a">
  <TabsList>
    <TabsTrigger value="a">A</TabsTrigger>
    <TabsTrigger value="b">B</TabsTrigger>
  </TabsList>
  <TabsContent value="a">…</TabsContent>
  <TabsContent value="b">…</TabsContent>
</Tabs>`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          The indicator is a shared-layout <code>motion.span</code> (
          <code>layoutId</code>) rendered inside the active tab. When selection
          changes, motion springs it to the new tab with{" "}
          <code>springs.snappy</code> — no CSS transitions, fully interruptible.
          Each Tabs instance scopes its own <code>layoutId</code> so multiple
          groups never fight. Honors <code>prefers-reduced-motion</code>.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Full <code>role="tablist"</code> semantics with arrow-key navigation
          and automatic activation. Controlled via <code>value</code> /{" "}
          <code>onValueChange</code>, or uncontrolled via{" "}
          <code>defaultValue</code>.
        </p>
      </Section>
    </main>
  )
}
