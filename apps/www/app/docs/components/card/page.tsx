import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import CardDemo from "@/registry/seam/examples/card-demo"

export const metadata: Metadata = {
  title: "Card — seamui",
  description: "A raised surface key with header, content, and footer.",
}

export default function CardDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Card</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A generic raised surface — a white key resting on the canvas — with
        header, content, and footer sections.
      </p>

      <ComponentPreview code={exampleSource("card-demo")}>
        <CardDemo />
      </ComponentPreview>

      <Install name="card" />

      <Section title="Usage">
        <CodeBlock>{`import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"`}</CodeBlock>
        <CodeBlock>{`<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
    <CardAction>Action</CardAction>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          A card is a static surface at <code>resting</code> depth — it never
          animates on its own. Depth motion belongs to the interactive keys
          placed inside it (buttons, inputs), and to overlays that rise above
          it.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Renders plain <code>&lt;div&gt;</code> structure with no implicit
          semantics. Use a heading element inside <code>CardTitle</code> (via
          its children) when the card titles a page section.
        </p>
      </Section>
    </main>
  )
}
