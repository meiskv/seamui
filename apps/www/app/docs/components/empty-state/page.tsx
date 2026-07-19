import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import EmptyStateDemo from "@/registry/seam/examples/empty-state-demo"
import EmptyStateSearch from "@/registry/seam/examples/empty-state-search"
import EmptyStatePlain from "@/registry/seam/examples/empty-state-plain"

export const metadata: Metadata = {
  title: "Empty State — seamui",
  description:
    "Zero-data placeholder for lists, tables, and searches — a debossed well awaiting content.",
}

export default function EmptyStateDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Empty State</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The zero-data surface for lists, tables, searches, and inboxes: a
        debossed well where content will appear, with an optional icon key,
        copy, and actions.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <EmptyStateDemo />,
            code: exampleSource("empty-state-demo"),
          },
          {
            key: "search",
            title: "No results",
            component: <EmptyStateSearch />,
            code: exampleSource("empty-state-search"),
          },
          {
            key: "plain",
            title: "Plain",
            component: <EmptyStatePlain />,
            code: exampleSource("empty-state-plain"),
          },
        ]}
      />

      <Install name="empty-state" />

      <ApiTable
        rows={[
          {
            prop: "—",
            type: "composition",
            desc: "EmptyState wraps optional EmptyStateMedia (icon key), EmptyStateTitle, EmptyStateDescription, and EmptyStateActions.",
          },
        ]}
        footer={
          <>
            All parts are plain <code>div</code>s taking standard props — put
            seam <code>Button</code>s in <code>EmptyStateActions</code>.
          </>
        }
      />

      <Notes>
        <li>
          A slot awaiting content reads as carved into the surface — the well is
          debossed (<code>shadow-well</code>), and the icon rises from it on a
          small embossed key. The same one idea as inputs and tabs (§1).
        </li>
        <li>
          Deliberately still: persistent page state gets no entrance motion. The
          action Buttons bring their own press depth and haptics.
        </li>
        <li>
          Pairs with the AI suite too — an empty conversation list or a
          no-sources answer uses the same shape.
        </li>
      </Notes>
    </main>
  )
}
