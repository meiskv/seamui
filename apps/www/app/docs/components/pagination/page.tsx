import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import PaginationDemo from "@/registry/seam/examples/pagination-demo"
import PaginationLinks from "@/registry/seam/examples/pagination-links"
import PaginationSimple from "@/registry/seam/examples/pagination-simple"

export const metadata: Metadata = {
  title: "Pagination — seamui",
  description:
    "Page navigation as a debossed well; the active page is an embossed key that springs between links.",
}

export default function PaginationDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Pagination</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Page navigation in the seam grouped-control language: links sit in a
        debossed well and the current page rises as an embossed key, springing
        to whichever page you pick.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <PaginationDemo />,
            code: exampleSource("pagination-demo"),
            description:
              "Click a page — the embossed key springs to it (an instant jump under reduced motion).",
          },
          {
            key: "links",
            title: "Links",
            component: <PaginationLinks />,
            code: exampleSource("pagination-links"),
          },
          {
            key: "simple",
            title: "Prev / next",
            component: <PaginationSimple />,
            code: exampleSource("pagination-simple"),
          },
        ]}
      />

      <Install name="pagination" />

      <ApiTable
        rows={[
          {
            prop: "isActive",
            type: "boolean",
            desc: 'On PaginationLink — the current page: embossed key, aria-current="page".',
          },
          {
            prop: "disabled",
            type: "boolean",
            desc: "On any link — non-navigable prev/next at the range ends (aria-disabled, unfocusable).",
          },
          {
            prop: "size",
            type: '"icon" | "default"',
            default: '"icon"',
            desc: "On PaginationLink — square page key, or a wide key for labelled prev/next.",
          },
        ]}
        footer={
          <>
            Links are plain <code>&lt;a&gt;</code> elements — pass{" "}
            <code>href</code> for real navigation or <code>onClick</code> for
            controlled state.
          </>
        }
      />

      <Notes>
        <li>
          The tabs/toggle-group idea again: a debossed well (
          <code>shadow-well</code>) holds the keys and the active page is
          embossed (<code>shadow-resting</code>), springing between links via a
          shared layout animation — a static jump under reduced motion.
        </li>
        <li>
          Page keys are links, not buttons — they wear{" "}
          <code>buttonVariants</code> directly so the pagination nav keeps real
          link semantics (<code>aria-current</code>, native navigation).
        </li>
        <li>
          Committing a page change fires the <code>tick</code> haptic;
          re-clicking the active page doesn&apos;t.
        </li>
        <li>
          For table pagination wired to TanStack state, Data Table ships its own
          footer — this component is for page-level navigation.
        </li>
      </Notes>
    </main>
  )
}
