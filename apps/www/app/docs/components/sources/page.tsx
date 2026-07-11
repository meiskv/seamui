import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import SourcesDemo from "@/registry/seam/examples/sources-demo"
import InlineCitationDemo from "@/registry/seam/examples/inline-citation-demo"

export const metadata: Metadata = {
  title: "Sources — seamui",
  description: "Grounded-answer sources list and hoverable inline citations.",
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

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <SourcesDemo />,
            code: exampleSource("sources-demo"),
          },
          {
            key: "inline-citations",
            title: "Inline citations",
            component: <InlineCitationDemo />,
            code: exampleSource("inline-citation-demo"),
          },
        ]}
      />

      <Install name="sources" />

      <Notes>
        <li>
          The citation preview rises at overlay depth (
          <code>springs.surface</code>, inherited from Preview Card) and fades
          in instead of rising under reduced motion; the sources list eases its
          height open and snaps under reduced motion.
        </li>
        <li>
          The trigger presses with <code>depth.pressed</code>, dogfooded via{" "}
          <code>buttonVariants</code> since Collapsible owns the trigger ref.
        </li>
        <li>
          Citation chips and source rows are real links — focusable, and the
          preview opens on focus as well as hover.
        </li>
        <li>
          The favicon dogfoods Avatar with a numeric fallback, so a missing
          favicon still shows the citation number rather than a blank.
        </li>
      </Notes>
    </main>
  )
}
