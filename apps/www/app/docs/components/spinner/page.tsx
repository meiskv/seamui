import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import SpinnerDemo from "@/registry/seam/examples/spinner-demo"
import ButtonLoading from "@/registry/seam/examples/button-loading"

export const metadata: Metadata = {
  title: "Spinner — seamui",
  description: "Loading indicator with a reduced-motion opacity fallback.",
}

export default function SpinnerDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Spinner</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        An indeterminate loading indicator. Sized and colored by the text
        context it sits in, so it drops into buttons, fields, and empty states
        unchanged.
      </p>

      <ComponentPreview code={exampleSource("spinner-demo")}>
        <SpinnerDemo />
      </ComponentPreview>

      <Install name="spinner" />

      <Section title="Usage">
        <CodeBlock>{`import { Spinner } from "@/components/ui/spinner"`}</CodeBlock>
        <CodeBlock>{`<Spinner />`}</CodeBlock>
      </Section>

      <Section title="Examples">
        <h3 className="text-muted-foreground/80 mt-4 text-xs font-medium">
          In a button
        </h3>
        <ComponentPreview code={exampleSource("button-loading")}>
          <ButtonLoading />
        </ComponentPreview>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Spins continuously while visible. Under reduced motion the rotation
          is swapped for an opacity pulse — per seamui&apos;s reduced-motion
          policy, feedback is never removed, it just stops traveling.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Carries <code>role=&quot;status&quot;</code> and a default{" "}
          <code>aria-label</code> of &ldquo;Loading&rdquo;; override the label
          to describe what is loading when several spinners can be on screen.
        </p>
      </Section>
    </main>
  )
}
