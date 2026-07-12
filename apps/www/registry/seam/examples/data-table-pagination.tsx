"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/registry/seam/ui/data-table"

type Order = {
  id: string
  customer: string
  city: string
  total: string
}

const CUSTOMERS = [
  "Ava Bradley",
  "Noah Chen",
  "Mia Torres",
  "Liam Novak",
  "Zoe Patel",
  "Ethan Cole",
  "Lily Sato",
  "Owen Reyes",
  "Emma Diaz",
  "Kai Nguyen",
]
const CITIES = ["Lisbon", "Osaka", "Austin", "Berlin", "Nairobi", "Bogotá"]

const DATA: Order[] = Array.from({ length: 48 }, (_, i) => ({
  id: `ord_${1000 + i}`,
  customer: CUSTOMERS[i % CUSTOMERS.length],
  city: CITIES[i % CITIES.length],
  total: `$${(60 + ((i * 53) % 940)).toFixed(2)}`,
}))

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.original.id}</span>
    ),
  },
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "city", header: "City" },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{row.original.total}</div>
    ),
  },
]

export default function DataTablePaginationExample() {
  return (
    <DataTable
      columns={columns}
      data={DATA}
      getRowId={(row) => row.id}
      pageSize={10}
      label="Orders, paginated"
    />
  )
}
