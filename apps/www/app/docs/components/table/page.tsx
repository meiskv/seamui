import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import TableDemo from "@/registry/seam/examples/table-demo"

export const metadata: Metadata = {
  title: "Table — seamui",
  description: "Styled semantic table primitives on a raised seam surface.",
}

export default function TableDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Table</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Structural table primitives — no logic, just the seam surface. The table
        is a raised key resting on the canvas; the header is a quiet label rail;
        rows are separated by hairlines and tint on select. For a data grid with
        sorting, filtering, pagination and inline edit, use{" "}
        <a className="underline" href="/docs/components/data-table">
          Data Table
        </a>
        .
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Default",
            component: <TableDemo />,
            code: exampleSource("table-demo"),
          },
        ]}
      />

      <Install name="table" />

      <ApiTable
        rows={[
          {
            prop: "containerClassName",
            type: "string",
            desc: "Classes for the scrollable region wrapper (the raised surface), separate from the <table>.",
          },
          {
            prop: "aria-label",
            type: "string",
            desc: "Names the scroll region so keyboard users landing on it know what it is.",
          },
        ]}
        footer={
          <>
            Exports <code>Table</code>, <code>TableHeader</code>,{" "}
            <code>TableBody</code>, <code>TableFooter</code>,{" "}
            <code>TableRow</code>, <code>TableHead</code>,{" "}
            <code>TableCell</code>, and <code>TableCaption</code> — each
            carrying a <code>data-slot</code> and forwarding all native props.
          </>
        }
      />

      <Notes>
        <li>
          When the table is wider than its container the wrapper becomes a
          focusable <code>role=&quot;region&quot;</code> so it can be scrolled
          by keyboard, not just pointer — a table that fits adds no extra tab
          stop.
        </li>
        <li>
          Set <code>data-state=&quot;selected&quot;</code> on a{" "}
          <code>TableRow</code> to tint it — the row tints rather than embosses,
          keeping the checkbox as the one embossed token.
        </li>
        <li>
          These primitives are static (no motion of their own). Animation lives
          in Data Table, which composes them.
        </li>
      </Notes>
    </main>
  )
}
