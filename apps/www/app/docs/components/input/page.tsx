import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import InputDemo from "@/registry/seam/examples/input-demo"
import InputDisabled from "@/registry/seam/examples/input-disabled"
import InputInvalid from "@/registry/seam/examples/input-invalid"
import InputFile from "@/registry/seam/examples/input-file"

export const metadata: Metadata = {
  title: "Input — seamui",
  description: "Text input built on Base UI, Field-aware.",
}

export default function InputDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Input</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A text input built on Base UI. Works automatically with Base UI Field
        for labels, validation, and messages.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <InputDemo />,
            code: exampleSource("input-demo"),
          },
          {
            key: "disabled",
            title: "Disabled",
            component: <InputDisabled />,
            code: exampleSource("input-disabled"),
          },
          {
            key: "invalid",
            title: "Invalid",
            component: <InputInvalid />,
            code: exampleSource("input-invalid"),
          },
          {
            key: "file",
            title: "File",
            component: <InputFile />,
            code: exampleSource("input-file"),
          },
        ]}
      />

      <Install name="input" />

      <Notes>
        <li>
          Stays still by design — text entry is calm; the focus ring is the
          feedback, and depth animation is reserved for pressable and floating
          surfaces.
        </li>
        <li>
          Pair with seamui&apos;s{" "}
          <a
            className="hover:text-foreground underline"
            href="/docs/components/field"
          >
            Field
          </a>{" "}
          for labels, descriptions, and shaking error messages; invalid state
          flows in via <code>data-[invalid]</code> (see the Invalid example).
        </li>
        <li>
          File inputs center their row through a line-height tied to the default{" "}
          <code>h-10</code>; if you resize one, override it with the same{" "}
          <code>[&amp;[type=file]]:leading-*</code> variant.
        </li>
      </Notes>
    </main>
  )
}
