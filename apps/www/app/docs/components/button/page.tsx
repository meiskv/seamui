import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ButtonDemo from "@/registry/seam/examples/button-demo"
import ButtonVariants from "@/registry/seam/examples/button-variants"
import ButtonSizes from "@/registry/seam/examples/button-sizes"
import ButtonLoading from "@/registry/seam/examples/button-loading"
import ButtonLink from "@/registry/seam/examples/button-link"

export const metadata: Metadata = {
  title: "Button — seamui",
  description: "Button built on Base UI, animated with seam depth motion.",
}

export default function ButtonDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Button</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Displays a button. Built on Base UI, animated with seam depth motion.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <ButtonDemo />, code: exampleSource("button-demo") },
          { key: "variants", title: "Variants", component: <ButtonVariants />, code: exampleSource("button-variants") },
          { key: "sizes", title: "Sizes", component: <ButtonSizes />, code: exampleSource("button-sizes") },
          { key: "loading", title: "Loading", component: <ButtonLoading />, code: exampleSource("button-loading") },
          { key: "link", title: "As a link", component: <ButtonLink />, code: exampleSource("button-link") },
        ]}
      />

      <Install name="button" />

      <Section title="Usage">
        <CodeBlock>{`import { Button } from "@/components/ui/button"

<Button variant="outline" size="lg">Button</Button>`}</CodeBlock>
        <p className="text-muted-foreground text-sm">
          For the <strong>As a link</strong> variant, use Base UI&apos;s{" "}
          <code>render</code> prop (it replaces Radix&apos;s{" "}
          <code>asChild</code>).
        </p>
      </Section>

      <Section title="API Reference">
        <div className="squircle overflow-hidden rounded-lg border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground text-left text-xs">
                <Th>Prop</Th>
                <Th>Type</Th>
                <Th>Default</Th>
                <Th>Description</Th>
              </tr>
            </thead>
            <tbody>
              <Row
                prop="variant"
                type={`"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"`}
                def={`"default"`}
                desc="Visual style."
              />
              <Row
                prop="size"
                type={`"default" | "sm" | "lg" | "icon"`}
                def={`"default"`}
                desc="Dimensions."
              />
              <Row
                prop="render"
                type={`ReactElement | (props, state) => ReactElement`}
                def="—"
                desc="Render a different element (e.g. an <a>). From Base UI."
              />
              <Row
                prop="disabled"
                type="boolean"
                def="false"
                desc="Also accepts Base UI's focusableWhenDisabled."
              />
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground mt-2 text-sm">
          Plus all native <code>&lt;button&gt;</code> props and motion props (
          <code>whileTap</code> etc. can be overridden).
        </p>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Press recedes to <code>depth.pressed</code> (scale 0.97) with{" "}
          <code>springs.press</code>; release settles with a spring. The{" "}
          <code>ghost</code> and <code>link</code> variants stay flat. Honors{" "}
          <code>prefers-reduced-motion</code> — depth animation is disabled,
          everything else works.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Renders a native <code>&lt;button&gt;</code> by default. Keyboard
          activation (Space/Enter) triggers the same press feedback. Focus is
          visible via a <code>focus-visible</code> ring.{" "}
          <code>focusableWhenDisabled</code> keeps tab order stable when
          disabling mid-interaction.
        </p>
      </Section>
    </main>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2 font-medium">{children}</th>
}

function Row({
  prop,
  type,
  def,
  desc,
}: {
  prop: string
  type: string
  def: string
  desc: string
}) {
  return (
    <tr className="border-t align-top">
      <td className="px-3 py-2 font-mono text-xs">{prop}</td>
      <td className="px-3 py-2 font-mono text-xs">{type}</td>
      <td className="px-3 py-2 font-mono text-xs">{def}</td>
      <td className="text-muted-foreground px-3 py-2">{desc}</td>
    </tr>
  )
}
