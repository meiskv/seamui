import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import KbdDemo from "@/registry/seam/examples/kbd-demo"

export const metadata: Metadata = {
  title: "Kbd — seamui",
  description: "Keyboard shortcut rendered as a tiny embossed keycap.",
}

export default function KbdDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Kbd</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A keyboard key rendered literally in the seam language: a tiny
        embossed keycap resting on the surface.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <KbdDemo />, code: exampleSource("kbd-demo") },
        ]}
      />

      <Install name="kbd" />

      <Notes>
        <li>
          Static by design — a Kbd depicts a key, it isn&apos;t one; no press
          feedback, not focusable or clickable.
        </li>
        <li>
          Renders a native <code>&lt;kbd&gt;</code> element, announced as
          keyboard input; prefer full key names (&ldquo;Shift&rdquo;) or an{" "}
          <code>aria-label</code> when a symbol alone (⇧) could be ambiguous.
        </li>
      </Notes>
    </main>
  )
}
