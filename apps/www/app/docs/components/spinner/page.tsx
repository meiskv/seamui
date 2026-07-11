import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import SpinnerDemo from "@/registry/seam/examples/spinner-demo"
import ButtonLoading from "@/registry/seam/examples/button-loading"

export const metadata: Metadata = {
  title: "Spinner — seamui",
  description: "Loading indicator with a reduced-motion opacity fallback.",
}

export default function SpinnerDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Spinner</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        An indeterminate loading indicator. Sized and colored by the text
        context it sits in, so it drops into buttons, fields, and empty states
        unchanged.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <SpinnerDemo />,
            code: exampleSource("spinner-demo"),
          },
          {
            key: "button",
            title: "In a button",
            component: <ButtonLoading />,
            code: exampleSource("button-loading"),
          },
        ]}
      />

      <Install name="spinner" />

      <Notes>
        <li>
          Under reduced motion the continuous rotation swaps for an opacity
          pulse, so loading feedback never disappears.
        </li>
        <li>
          Carries <code>role=&quot;status&quot;</code> and a default{" "}
          <code>aria-label</code> of &ldquo;Loading&rdquo;; override the label
          to describe what is loading when several spinners can be on screen.
        </li>
      </Notes>
    </main>
  )
}
