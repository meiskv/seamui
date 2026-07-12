"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/registry/seam/ui/checkbox"
import { DataTable, DataTableColumnHeader } from "@/registry/seam/ui/data-table"

type Project = {
  id: string
  name: string
  owner: string
  stars: number
}

const DATA: Project[] = [
  { id: "1", name: "seamui", owner: "Ava", stars: 1284 },
  { id: "2", name: "motion-lab", owner: "Noah", stars: 342 },
  { id: "3", name: "base-kit", owner: "Mia", stars: 891 },
  { id: "4", name: "squircle", owner: "Liam", stars: 57 },
  { id: "5", name: "haptics-web", owner: "Zoe", stars: 623 },
]

const columns: ColumnDef<Project>[] = [
  {
    id: "select",
    enableSorting: false,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(Boolean(value))
        }
        aria-label="Select all rows"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
        aria-label={`Select ${row.original.name}`}
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project" />
    ),
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: "owner",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
  },
  {
    accessorKey: "stars",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stars" align="right" />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.original.stars.toLocaleString()}
      </div>
    ),
  },
]

export default function DataTableSorting() {
  return (
    <DataTable
      columns={columns}
      data={DATA}
      getRowId={(row) => row.id}
      pagination={false}
      label="Projects, sortable"
    />
  )
}
