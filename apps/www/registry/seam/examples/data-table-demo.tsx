"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { Avatar, AvatarFallback } from "@/registry/seam/ui/avatar"
import { Badge } from "@/registry/seam/ui/badge"
import { Checkbox } from "@/registry/seam/ui/checkbox"
import { Input } from "@/registry/seam/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/seam/ui/select"
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/registry/seam/ui/dropdown-menu"
import {
  DataTable,
  DataTableColumnHeader,
  DataTableEditableCell,
  DataTableRowActions,
  DataTableToolbar,
} from "@/registry/seam/ui/data-table"

type Status = "active" | "pending" | "suspended"
type Role = "Owner" | "Admin" | "Member" | "Viewer"

type Member = {
  id: string
  name: string
  email: string
  status: Status
  role: Role
  amount: number
}

const STATUS_VARIANT: Record<Status, "default" | "muted" | "destructive"> = {
  active: "default",
  pending: "muted",
  suspended: "destructive",
}

const NAMES = [
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
  "Ruby Hale",
  "Leo Fisher",
  "Isla Moon",
  "Finn Park",
  "Nora Wells",
]
const STATUSES: Status[] = ["active", "pending", "suspended"]
const ROLES: Role[] = ["Owner", "Admin", "Member", "Viewer"]

// deterministic ~42-row seed so pagination is real.
const SEED: Member[] = Array.from({ length: 42 }, (_, i) => {
  const name = NAMES[i % NAMES.length]
  const handle = name.toLowerCase().replace(/\s+/g, ".")
  return {
    id: `usr_${(1042 + i).toString(36)}`,
    name:
      i < NAMES.length ? name : `${name} ${Math.floor(i / NAMES.length) + 1}`,
    email: `${handle}@example.com`,
    status: STATUSES[i % STATUSES.length],
    role: ROLES[i % ROLES.length],
    amount: 40 + ((i * 37) % 960),
  }
})

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
}

export default function DataTableDemo() {
  const [data, setData] = React.useState<Member[]>(SEED)

  const updateCell = React.useCallback(
    (rowIndex: number, columnId: string, value: unknown) => {
      setData((prev) =>
        prev.map((row, i) =>
          i === rowIndex
            ? {
                ...row,
                [columnId]:
                  columnId === "amount" ? Number(value) : (value as string),
              }
            : row
        )
      )
    },
    []
  )

  const deleteRow = React.useCallback((id: string) => {
    setData((prev) => prev.filter((row) => row.id !== id))
  }, [])

  const columns = React.useMemo<ColumnDef<Member>[]>(
    () => [
      {
        id: "select",
        enableSorting: false,
        enableHiding: false,
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={
              table.getIsSomePageRowsSelected() &&
              !table.getIsAllPageRowsSelected()
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(Boolean(value))
            }
            aria-label="Select all rows on this page"
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
          <DataTableColumnHeader column={column} title="Member" />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarFallback className="text-xs">
                {initials(row.original.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{row.original.name}</span>
              <span className="text-muted-foreground text-xs">
                {row.original.email}
              </span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        filterFn: (row, id, value) => row.getValue(id) === value,
        cell: ({ row }) => {
          const status = row.original.status
          return (
            <Badge variant={STATUS_VARIANT[status]} className="capitalize">
              {status}
            </Badge>
          )
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row, table }) => (
          <Select
            value={row.original.role}
            onValueChange={(value: unknown) =>
              table.options.meta?.updateData?.(row.index, "role", value)
            }
          >
            <SelectTrigger
              variant="ghost"
              className="-ml-2 h-8"
              aria-label={`Role for ${row.original.name}`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ),
      },
      {
        accessorKey: "amount",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Amount ($)"
            align="right"
          />
        ),
        cell: ({ row, table }) => (
          <DataTableEditableCell
            align="right"
            className="tabular-nums"
            value={row.original.amount}
            label={`Amount for ${row.original.name}`}
            validate={(value) => /^\d+(\.\d{1,2})?$/.test(value)}
            onCommit={(value) =>
              table.options.meta?.updateData?.(row.index, "amount", value)
            }
          />
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => (
          <div className="flex justify-end">
            <DataTableRowActions label={`Actions for ${row.original.name}`}>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard?.writeText(row.original.id)}
              >
                Copy member ID
              </DropdownMenuItem>
              <DropdownMenuItem>View profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => deleteRow(row.original.id)}
              >
                Delete
              </DropdownMenuItem>
            </DataTableRowActions>
          </div>
        ),
      },
    ],
    [deleteRow]
  )

  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        onDataChange={updateCell}
        label="Team members"
        toolbar={(table) => (
          <DataTableToolbar>
            <Input
              placeholder="Filter members…"
              aria-label="Filter members by name"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="h-9 w-full sm:w-56"
            />
            <Select
              value={
                (table.getColumn("status")?.getFilterValue() as string) ?? "all"
              }
              onValueChange={(value: unknown) =>
                table
                  .getColumn("status")
                  ?.setFilterValue(value === "all" ? undefined : value)
              }
            >
              <SelectTrigger className="h-9 w-40" aria-label="Filter by status">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </DataTableToolbar>
        )}
      />
    </div>
  )
}
