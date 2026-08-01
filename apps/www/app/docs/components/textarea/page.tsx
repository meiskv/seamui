import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import TextareaDemo from "@/registry/seam/examples/textarea-demo"
import TextareaWithButton from "@/registry/seam/examples/textarea-with-button"
import TextareaDisabled from "@/registry/seam/examples/textarea-disabled"
import TextareaGhost from "@/registry/seam/examples/textarea-ghost"

export const metadata: Metadata = {
  title: "Textarea — seamui",
  description: "Auto-growing multiline text field styled as a seam entry well.",
}

export default function TextareaDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Textarea</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A multiline text field carved into the surface as a debossed entry well.
        Grows with its content via <code>field-sizing</code> — no auto-resize
        JavaScript.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <TextareaDemo />,
            code: exampleSource("textarea-demo"),
          },
          {
            key: "with-button",
            title: "With button",
            component: <TextareaWithButton />,
            code: exampleSource("textarea-with-button"),
          },
          {
            key: "disabled",
            title: "Disabled",
            component: <TextareaDisabled />,
            code: exampleSource("textarea-disabled"),
          },
          {
            key: "ghost",
            title: "Ghost",
            component: <TextareaGhost />,
            code: exampleSource("textarea-ghost"),
            description:
              "Composes in place, with the same variant name Input and SelectTrigger use.",
          },
        ]}
      />

      <Install name="textarea" />

      <Notes>
        <li>
          Growth is native <code>field-sizing: content</code> — the well expands
          with the text instead of scrolling, no resize JavaScript.
        </li>
        <li>
          Base UI has no Textarea part; inside a Base UI <code>Field</code>,
          pass it through{" "}
          <code>
            &lt;Field.Control render=&#123;&lt;Textarea /&gt;&#125; /&gt;
          </code>{" "}
          to get label and validation wiring.
        </li>
      </Notes>
    </main>
  )
}
