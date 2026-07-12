"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable, DataTableEditableCell } from "@/registry/seam/ui/data-table"

type Item = {
  id: string
  sku: string
  name: string
  price: number
}

const SEED: Item[] = [
  { id: "1", sku: "SKU-100", name: "Spring washer", price: 4.5 },
  { id: "2", sku: "SKU-101", name: "Depth gauge", price: 28 },
  { id: "3", sku: "SKU-102", name: "Squircle jig", price: 12.75 },
  { id: "4", sku: "SKU-103", name: "Haptic coil", price: 60 },
]

export default function DataTableEditable() {
  const [data, setData] = React.useState<Item[]>(SEED)

  const updateCell = React.useCallback(
    (rowIndex: number, columnId: string, value: unknown) => {
      setData((prev) =>
        prev.map((row, i) =>
          i === rowIndex
            ? {
                ...row,
                [columnId]:
                  columnId === "price" ? Number(value) : (value as string),
              }
            : row
        )
      )
    },
    []
  )

  const columns = React.useMemo<ColumnDef<Item>[]>(
    () => [
      {
        accessorKey: "sku",
        header: "SKU",
        cell: ({ row }) => (
          <span className="font-mono text-xs">{row.original.sku}</span>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        // Free-text edit: any non-empty value commits.
        cell: ({ row, table }) => (
          <DataTableEditableCell
            value={row.original.name}
            label={`Name for ${row.original.sku}`}
            validate={(value) => value.length > 0}
            onCommit={(value) =>
              table.options.meta?.updateData?.(row.index, "name", value)
            }
          />
        ),
      },
      {
        accessorKey: "price",
        header: () => <div className="text-right">Price ($)</div>,
        // Validated edit: a non-numeric value shakes and keeps you in the cell.
        cell: ({ row, table }) => (
          <DataTableEditableCell
            align="right"
            className="tabular-nums"
            value={row.original.price}
            label={`Price for ${row.original.sku}`}
            validate={(value) => /^\d+(\.\d{1,2})?$/.test(value)}
            onCommit={(value) =>
              table.options.meta?.updateData?.(row.index, "price", value)
            }
          />
        ),
      },
    ],
    []
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      getRowId={(row) => row.id}
      onDataChange={updateCell}
      pagination={false}
      label="Inventory, editable"
    />
  )
}
