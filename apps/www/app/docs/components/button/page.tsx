import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
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
    <main className="prose-neutral mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Button</h1>
      <p className="text-muted-foreground mt-2 text-lg">
        Displays a button. Built on Base UI, animated with seam depth motion.
      </p>

      <ComponentPreview code={exampleSource("button-demo")}>
        <ButtonDemo />
      </ComponentPreview>

      <Section title="Installation">
        <p className="text-muted-foreground text-sm">With the seamui CLI:</p>
        <CodeBlock>{`bunx --bun seamui@latest add button`}</CodeBlock>
        <p className="text-muted-foreground text-sm">Or the shadcn CLI:</p>
        <CodeBlock>{`bunx --bun shadcn@latest add @seamui/button`}</CodeBlock>
      </Section>

      <Section title="Usage">
        <CodeBlock>{`import { Button } from "@/components/ui/button"`}</CodeBlock>
        <CodeBlock>{`<Button variant="outline" size="lg">Button</Button>`}</CodeBlock>
      </Section>

      <Section title="Examples">
        <h3 className="mt-6 text-lg font-medium">Variants</h3>
        <ComponentPreview code={exampleSource("button-variants")}>
          <ButtonVariants />
        </ComponentPreview>

        <h3 className="mt-6 text-lg font-medium">Sizes</h3>
        <ComponentPreview code={exampleSource("button-sizes")}>
          <ButtonSizes />
        </ComponentPreview>

        <h3 className="mt-6 text-lg font-medium">Loading</h3>
        <ComponentPreview code={exampleSource("button-loading")}>
          <ButtonLoading />
        </ComponentPreview>

        <h3 className="mt-6 text-lg font-medium">As a link</h3>
        <p className="text-muted-foreground text-sm">
          Use Base UI&apos;s <code>render</code> prop (replaces Radix{" "}
          <code>asChild</code>):
        </p>
        <ComponentPreview code={exampleSource("button-link")}>
          <ButtonLink />
        </ComponentPreview>
      </Section>

      <Section title="API Reference">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b text-left">
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
        <p className="text-muted-foreground mt-3 text-sm">
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

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-10">
      <h2 className="border-b pb-2 text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="bg-card overflow-x-auto rounded-lg border p-3 text-sm">
      <code>{children}</code>
    </pre>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="py-2 pr-4 font-medium">{children}</th>
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
    <tr className="border-b align-top">
      <td className="py-2 pr-4 font-mono text-xs">{prop}</td>
      <td className="py-2 pr-4 font-mono text-xs">{type}</td>
      <td className="py-2 pr-4 font-mono text-xs">{def}</td>
      <td className="text-muted-foreground py-2">{desc}</td>
    </tr>
  )
}
