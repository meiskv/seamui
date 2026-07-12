import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import ModelPickerDemo from "@/registry/seam/examples/model-picker-demo"
import ModelPickerConnection from "@/registry/seam/examples/model-picker-connection"
import ModelPickerFooter from "@/registry/seam/examples/model-picker-footer"

export const metadata: Metadata = {
  title: "Model Picker — seamui",
  description:
    "Provider-grouped model select with connection dots — a recipe over Select for composer footers.",
}

export default function ModelPickerDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Model Picker</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The composer-footer model dropdown: models grouped by provider, each
        group carrying a connection dot, each model a name plus a muted
        description and context-size chip. A recipe over Select — the popup
        keeps its debossed tray and the chosen model rises as the embossed key.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <ModelPickerDemo />,
            code: exampleSource("model-picker-demo"),
          },
          {
            key: "connection",
            title: "Connection states",
            component: <ModelPickerConnection />,
            code: exampleSource("model-picker-connection"),
          },
          {
            key: "footer",
            title: "Composer footer",
            component: <ModelPickerFooter />,
            code: exampleSource("model-picker-footer"),
          },
        ]}
      />

      <Install name="model-picker" />

      <Notes>
        <li>
          Pure Select semantics: <code>value</code>/<code>onValueChange</code>{" "}
          with string ids; metadata lives in the item markup. Per-thread
          persistence is your state, not the component&apos;s.
        </li>
        <li>
          Connection dots follow the monochrome rule — connected is filled
          primary, error is destructive, off is faint — and each announces as
          text (&ldquo;connected&rdquo;, &ldquo;connection error&rdquo;).
        </li>
        <li>
          Effort/thinking tiers aren&apos;t baked in: put a{" "}
          <code>mode-selector</code> next to the picker (the composer-footer
          example shows the composed row).
        </li>
      </Notes>
    </main>
  )
}
