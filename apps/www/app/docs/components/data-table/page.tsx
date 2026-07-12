import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import DataTableDemo from "@/registry/seam/examples/data-table-demo"
import DataTableEditable from "@/registry/seam/examples/data-table-editable"
import DataTablePaginationExample from "@/registry/seam/examples/data-table-pagination"
import DataTableSorting from "@/registry/seam/examples/data-table-sorting"

export const metadata: Metadata = {
  title: "Data Table — seamui",
  description:
    "TanStack Table in the seam language: filtering, pagination, sorting, selection, inline edit, and row actions.",
}

export default function DataTableDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Data Table</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A headless{" "}
        <a className="underline" href="https://tanstack.com/table">
          TanStack Table
        </a>{" "}
        engine rendered through the seam <code>Table</code> primitives. It owns
        all table state; you supply <code>columns</code> and <code>data</code>{" "}
        and compose the rest — badges, an inline-edit cell, an in-cell select, a
        row-actions menu — from foundation components.
      </p>

      <VariantPreview
        variants={[
          {
            key: "demo",
            title: "Everything",
            component: <DataTableDemo />,
            code: exampleSource("data-table-demo"),
          },
          {
            key: "sorting",
            title: "Sorting + selection",
            component: <DataTableSorting />,
            code: exampleSource("data-table-sorting"),
          },
          {
            key: "pagination",
            title: "Pagination",
            component: <DataTablePaginationExample />,
            code: exampleSource("data-table-pagination"),
          },
          {
            key: "editable",
            title: "Inline edit",
            component: <DataTableEditable />,
            code: exampleSource("data-table-editable"),
          },
        ]}
      />

      <Install name="data-table" />

      <ApiTable
        rows={[
          {
            prop: "columns",
            type: "ColumnDef<TData, TValue>[]",
            desc: "TanStack column definitions. Header/cell renderers compose seam components.",
          },
          {
            prop: "data",
            type: "TData[]",
            desc: "The rows. Keep it in state and update it from onDataChange for editable cells.",
          },
          {
            prop: "getRowId",
            type: "(row, index) => string",
            desc: "Stable row identity so selection and edits survive sort/filter/paginate.",
          },
          {
            prop: "onDataChange",
            type: "(rowIndex, columnId, value) => void",
            desc: "Commit hook for inline edits; reachable from any cell via table.options.meta.updateData.",
          },
          {
            prop: "toolbar",
            type: "(table) => ReactNode",
            desc: "Filter input, faceted filters, view options — receives the live table instance.",
          },
          {
            prop: "pagination",
            type: "boolean",
            default: "true",
            desc: "Show the pagination footer and page the rows.",
          },
          {
            prop: "pageSize",
            type: "number",
            default: "10",
            desc: "Initial rows per page.",
          },
          {
            prop: "label",
            type: "string",
            desc: "Accessible name for the scrollable table region.",
          },
        ]}
        footer={
          <>
            Ships <code>DataTableColumnHeader</code>,{" "}
            <code>DataTableToolbar</code>, <code>DataTablePagination</code>,{" "}
            <code>DataTableEditableCell</code>, and{" "}
            <code>DataTableRowActions</code> as composable parts.
          </>
        }
      />

      <Notes>
        <li>
          The body fades on every reflow (page, sort, filter) with{" "}
          <code>fades.fast</code> — rows never spring their positions, so
          content reflow can&apos;t bounce.
        </li>
        <li>
          The sort indicator springs when it flips ascending⇄descending and
          jumps instantly under reduced motion; the <code>&lt;th&gt;</code>{" "}
          carries <code>aria-sort</code>.
        </li>
        <li>
          <code>DataTableEditableCell</code>: Enter commits, Escape reverts and
          returns focus to the cell. A rejected commit shakes (opacity flash
          under reduced motion) with the error haptic; a good commit ticks.
        </li>
        <li>
          Every control inside — sort headers, pagination keys, the row-actions
          trigger — is a seam <code>Button</code>; the filter and edit fields
          are debossed <code>Input</code> wells. No styling is hand-rolled.
        </li>
      </Notes>
    </main>
  )
}
