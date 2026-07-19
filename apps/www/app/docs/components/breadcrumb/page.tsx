import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import BreadcrumbDemo from "@/registry/seam/examples/breadcrumb-demo"
import BreadcrumbEllipsisExample from "@/registry/seam/examples/breadcrumb-ellipsis"

export const metadata: Metadata = {
  title: "Breadcrumb — seamui",
  description: "Navigation hierarchy showing the current page's location.",
}

export default function BreadcrumbDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Breadcrumb</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Shows the current page's place in the site hierarchy. Collapse long
        trails with an ellipsis.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <BreadcrumbDemo />,
            code: exampleSource("breadcrumb-demo"),
          },
          {
            key: "ellipsis",
            title: "Collapsed",
            component: <BreadcrumbEllipsisExample />,
            code: exampleSource("breadcrumb-ellipsis"),
          },
        ]}
      />

      <Install name="breadcrumb" />

      <Notes>
        <li>
          Renders a labelled <code>&lt;nav&gt;</code>; the current page uses{" "}
          <code>BreadcrumbPage</code> with <code>aria-current="page"</code>.
        </li>
        <li>
          <code>BreadcrumbLink</code> renders an <code>&lt;a&gt;</code> by
          default — pass <code>render</code> to swap in a framework Link.
        </li>
      </Notes>
    </main>
  )
}
