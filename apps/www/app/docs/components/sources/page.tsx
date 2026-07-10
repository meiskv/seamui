import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import SourcesDemo from "@/registry/seam/examples/sources-demo"
import InlineCitationDemo from "@/registry/seam/examples/inline-citation-demo"

export const metadata: Metadata = {
  title: "Sources — seamui",
  description:
    "Grounded-answer sources list and hoverable inline citations.",
}

export default function SourcesDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Sources</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Grounding for an answer: a collapsible list of the sources used, and{" "}
        <code>InlineCitation</code> — a superscript chip in running text that
        previews its source on hover or focus.
      </p>

      <ComponentPreview code={exampleSource("sources-demo")}>
        <SourcesDemo />
      </ComponentPreview>

      <Install name="sources" />

      <Section title="Usage">
        <CodeBlock>{`import {
  Sources,
  SourcesTrigger,
  SourcesContent,
  Source,
  InlineCitation,
} from "@/components/ui/sources"`}</CodeBlock>
        <CodeBlock>{`<Sources>
  <SourcesTrigger count={sources.length} />
  <SourcesContent>
    {sources.map((s, i) => (
      <Source key={s.href} href={s.href} title={s.title} index={i + 1} />
    ))}
  </SourcesContent>
</Sources>`}</CodeBlock>
      </Section>

      <Section title="Examples">
        <h3 className="text-muted-foreground/80 mt-4 text-xs font-medium">
          Inline citations
        </h3>
        <ComponentPreview code={exampleSource("inline-citation-demo")}>
          <InlineCitationDemo />
        </ComponentPreview>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          The citation preview rises at overlay depth (<code>springs.surface</code>,
          inherited from Preview Card); the sources list eases its height open
          and snaps under reduced motion. The trigger presses with{" "}
          <code>depth.pressed</code>, dogfooded via <code>buttonVariants</code>{" "}
          since Collapsible owns the trigger ref. Under reduced motion the
          preview fades in instead of rising.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Citation chips and source rows are real links — focusable, and the
          preview opens on focus as well as hover. The favicon dogfoods Avatar
          with a numeric fallback, so a missing favicon still shows the
          citation number rather than a blank.
        </p>
      </Section>
    </main>
  )
}
