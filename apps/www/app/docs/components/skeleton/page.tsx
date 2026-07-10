import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import SkeletonDemo from "@/registry/seam/examples/skeleton-demo"

export const metadata: Metadata = {
  title: "Skeleton — seamui",
  description: "Loading placeholder well with an opacity-only pulse.",
}

export default function SkeletonDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Skeleton</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A placeholder for loading content — a shallow well carved into the
        surface where the real element will land, pulsing gently while it
        waits.
      </p>

      <ComponentPreview code={exampleSource("skeleton-demo")}>
        <SkeletonDemo />
      </ComponentPreview>

      <Install name="skeleton" />

      <Section title="Usage">
        <CodeBlock>{`import { Skeleton } from "@/components/ui/skeleton"`}</CodeBlock>
        <CodeBlock>{`<Skeleton className="h-4 w-40" />`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          The pulse is opacity-only — the one kind of animation seamui runs on
          a plain duration — so it stays on under reduced motion. Loading
          feedback never goes dead; it just doesn&apos;t travel.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Renders a plain <code>&lt;div&gt;</code> with no announced content.
          Set <code>aria-busy</code> on the loading region and announce
          completion there, rather than labeling individual skeletons.
        </p>
      </Section>
    </main>
  )
}
