import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import AccordionDemo from "@/registry/seam/examples/accordion-demo"
import AccordionSingle from "@/registry/seam/examples/accordion-single"
import AccordionDisabled from "@/registry/seam/examples/accordion-disabled"

export const metadata: Metadata = {
  title: "Accordion — seamui",
  description: "Accordion built on Base UI with eased height animation.",
}

export default function AccordionDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Accordion</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Stacked sections that expand one panel at a time. Panels grow and shrink
        with a measured height animation.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <AccordionDemo />, code: exampleSource("accordion-demo") },
          { key: "single", title: "Single", component: <AccordionSingle />, code: exampleSource("accordion-single") },
          { key: "disabled", title: "Disabled item", component: <AccordionDisabled />, code: exampleSource("accordion-disabled") },
        ]}
      />

      <Install name="accordion" />

      <Section title="Usage">
        <CodeBlock>{`import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"`}</CodeBlock>
        <CodeBlock>{`<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question</AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
</Accordion>`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Base UI measures each panel&apos;s natural height into{" "}
          <code>--accordion-panel-height</code>; seamui eases the height between
          0 and that value. Height is the one property seamui animates with a
          duration rather than a transform spring (like opacity fades), because
          it&apos;s a layout dimension. The chevron rotates in sync, and the
          trigger row recedes on press like every other button-shaped control
          (<code>depth.pressed</code>; a dim under reduced motion).
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Proper header/button/region semantics and keyboard support. Set{" "}
          <code>openMultiple</code> on the root to allow several panels open at
          once.
        </p>
      </Section>
    </main>
  )
}
