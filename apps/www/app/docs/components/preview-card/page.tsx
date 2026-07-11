import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import PreviewCardDemo from "@/registry/seam/examples/preview-card-demo"
import PreviewCardUser from "@/registry/seam/examples/preview-card-user"
import PreviewCardImage from "@/registry/seam/examples/preview-card-image"

export const metadata: Metadata = {
  title: "Preview Card — seamui",
  description: "Preview card built on Base UI with seam overlay-depth entrance.",
}

export default function PreviewCardDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Preview Card</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A rich preview shown when hovering a link. Rises with overlay depth,
        just like Tooltip and Popover.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <PreviewCardDemo />, code: exampleSource("preview-card-demo") },
          { key: "user", title: "Profile", component: <PreviewCardUser />, code: exampleSource("preview-card-user"), description: "The classic hovercard — a user profile on link hover." },
          { key: "image", title: "Link preview", component: <PreviewCardImage />, code: exampleSource("preview-card-image"), description: "A richer preview with a thumbnail." },
        ]}
      />

      <Install name="preview-card" />

      <Section title="Usage">
        <CodeBlock>{`import {
  PreviewCard,
  PreviewCardTrigger,
  PreviewCardContent,
} from "@/components/ui/preview-card"`}</CodeBlock>
        <CodeBlock>{`<PreviewCard>
  <PreviewCardTrigger render={<a href="…">Base UI</a>} />
  <PreviewCardContent>…</PreviewCardContent>
</PreviewCard>`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Overlay-depth entrance from <code>depth.overlay.initial</code> with{" "}
          <code>springs.surface</code>. Opens on hover with a delay; Base UI
          handles positioning and dismissal. Honors{" "}
          <code>prefers-reduced-motion</code>.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Opens on hover and focus of the trigger link; content is
          non-interactive-safe and dismisses on blur and Escape.
        </p>
      </Section>
    </main>
  )
}
