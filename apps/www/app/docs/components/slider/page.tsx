import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import SliderDemo from "@/registry/seam/examples/slider-demo"
import SliderSteps from "@/registry/seam/examples/slider-steps"
import SliderDisabled from "@/registry/seam/examples/slider-disabled"

export const metadata: Metadata = {
  title: "Slider — seamui",
  description: "Slider built on Base UI; the thumb swells when grabbed.",
}

export default function SliderDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Slider</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        An input for choosing a value from a range. The thumb swells slightly
        when grabbed, so touch targets feel tactile.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <SliderDemo />, code: exampleSource("slider-demo") },
          { key: "steps", title: "Steps", component: <SliderSteps />, code: exampleSource("slider-steps") },
          { key: "disabled", title: "Disabled", component: <SliderDisabled />, code: exampleSource("slider-disabled") },
        ]}
      />

      <Install name="slider" />

      <Section title="Usage">
        <CodeBlock>{`import { Slider } from "@/components/ui/slider"`}</CodeBlock>
        <CodeBlock>{`<Slider defaultValue={50} max={100} step={1} />`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          On press/drag the thumb rises to <code>depth.raised</code> with{" "}
          <code>springs.snappy</code> — a physical &ldquo;grab&rdquo; cue that
          settles on release. Honors <code>prefers-reduced-motion</code>.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Renders with <code>role="slider"</code> and full keyboard support
          (arrows, Home/End). Controlled via <code>value</code> /{" "}
          <code>onValueChange</code>, or uncontrolled via{" "}
          <code>defaultValue</code>.
        </p>
      </Section>
    </main>
  )
}
