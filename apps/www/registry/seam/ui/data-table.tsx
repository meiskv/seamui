"use client"

import * as React from "react"
import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type Table as TanstackTable,
  type TableOptions,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { motion, useAnimate, useReducedMotion } from "motion/react"
import {
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { fades, reduced, shake, springs } from "@/lib/motion"
import { useHaptics } from "@/lib/haptics"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import { Button, buttonVariants } from "./button"
import { Input } from "./input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu"

// Let column cell renderers reach a commit hook for inline edits. TanStack
// threads `meta` from useReactTable to every cell context, so a `cell:`
// renderer can call `table.options.meta?.updateData(...)`.
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData?: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

// The body fades on every reflow (page / sort / filter) rather than springing
// row positions — reflowing content must never bounce (same rule as Response).
// A remount keyed to the reflow signature replays the opacity-only entrance;
// under reduced motion `fades.fast` is already opacity-only, so it stays alive.
const MotionTableBody = motion.create(TableBody)

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  /** Stable row identity (survives sort/filter/paginate for selection + edits). */
  getRowId?: (row: TData, index: number) => string
  /** Fires when an editable cell commits; wired into `meta.updateData`. */
  onDataChange?: (rowIndex: number, columnId: string, value: unknown) => void
  /** Toolbar (filter input, faceted filters); receives the live table instance. */
  toolbar?: (table: TanstackTable<TData>) => React.ReactNode
  /** Show the pagination footer. */
  pagination?: boolean
  /** Initial rows per page. */
  pageSize?: number
  /** Accessible name for the scrollable table region. */
  label?: string
  className?: string
  /**
   * Escape hatch merged into `useReactTable`. Pass controlled `state` +
   * `on*Change`, `manualPagination`/`manualSorting`/`manualFiltering` with
   * `pageCount`/`rowCount` for server-side data, or any other TanStack option.
   * A `state` here shallow-merges over the built-in slices, and an
   * `on*Change` overrides the matching built-in setter, so you can control one
   * slice (e.g. sorting) and leave the rest internal.
   */
  options?: Partial<TableOptions<TData>>
}

function DataTable<TData, TValue>({
  columns,
  data,
  getRowId,
  onDataChange,
  toolbar,
  pagination = true,
  pageSize = 10,
  label,
  className,
  options,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const table = useReactTable({
    getRowId,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    initialState: { pagination: { pageSize } },
    // Consumer options override the framework defaults above…
    ...options,
    // …but data/columns/state/setters/meta stay controlled here, merging any
    // slice the consumer chose to take over.
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
      ...options?.state,
    },
    onSortingChange: options?.onSortingChange ?? setSorting,
    onColumnFiltersChange: options?.onColumnFiltersChange ?? setColumnFilters,
    onRowSelectionChange: options?.onRowSelectionChange ?? setRowSelection,
    onColumnVisibilityChange:
      options?.onColumnVisibilityChange ?? setColumnVisibility,
    meta: { updateData: onDataChange, ...options?.meta },
  })

  const rows = table.getRowModel().rows
  const columnCount = table.getVisibleFlatColumns().length
  const tableState = table.getState()
  // Signature of what's on screen — changing it refades the body. Read from
  // the live table state so it tracks reflows in controlled mode too.
  const reflowKey = `${tableState.pagination.pageIndex}:${JSON.stringify(
    tableState.sorting
  )}:${JSON.stringify(tableState.columnFilters)}`

  return (
    <div
      data-slot="data-table"
      className={cn("flex flex-col gap-3", className)}
    >
      {toolbar?.(table)}
      <Table aria-label={label}>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  aria-sort={ariaSort(header.column)}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <MotionTableBody
          key={reflowKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={fades.fast}
        >
          {rows.length ? (
            rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columnCount}
                className="text-muted-foreground h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </MotionTableBody>
      </Table>
      {pagination ? <DataTablePagination table={table} /> : null}
    </div>
  )
}

/** aria-sort for a header cell, absent unless the column is actually sortable. */
function ariaSort<TData, TValue>(
  column: Column<TData, TValue>
): React.AriaAttributes["aria-sort"] {
  if (!column.getCanSort()) return undefined
  const sorted = column.getIsSorted()
  if (sorted === "asc") return "ascending"
  if (sorted === "desc") return "descending"
  return "none"
}

/**
 * Sortable header. Dogfoods the seam `Button` (ghost) so it presses and gives a
 * haptic like every other key. The indicator springs when it flips asc⇄desc and
 * jumps instantly under reduced motion — never a dead sort.
 */
function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  align = "left",
  className,
}: {
  column: Column<TData, TValue>
  title: string
  align?: "left" | "right"
  className?: string
}) {
  if (!column.getCanSort()) {
    return (
      <span
        className={cn(
          "text-muted-foreground text-xs font-medium",
          align === "right" && "block text-right",
          className
        )}
      >
        {title}
      </span>
    )
  }

  const sorted = column.getIsSorted()
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => column.toggleSorting(sorted === "asc")}
      className={cn(
        "text-muted-foreground hover:text-foreground -mx-2.5 h-8 gap-1.5 px-2.5 text-xs font-medium",
        sorted && "text-foreground",
        align === "right" && "ml-auto",
        className
      )}
    >
      {title}
      <SortIndicator sorted={sorted} />
    </Button>
  )
}

function SortIndicator({ sorted }: { sorted: false | "asc" | "desc" }) {
  const reduceMotion = useReducedMotion()

  if (!sorted) {
    return <ArrowUpDown className="size-3.5 opacity-50" aria-hidden />
  }
  return (
    <motion.span
      className="flex"
      initial={false}
      // One arrow springs 180° between ascending (points up) and descending
      // (points down) — a single token flipping, so the two states never look
      // alike. Jumps instantly under reduced motion.
      animate={{ rotate: sorted === "desc" ? 180 : 0 }}
      transition={reduceMotion ? reduced.instant : springs.snappy}
      aria-hidden
    >
      <ArrowUp className="size-3.5" />
    </motion.span>
  )
}

/** Toolbar shell — a flex row for a filter input, faceted filters, view options. */
function DataTableToolbar({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      data-slot="data-table-toolbar"
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {children}
    </div>
  )
}

const PAGE_SIZES = [10, 20, 30, 50] as const

function DataTablePagination<TData>({
  table,
  className,
  ...props
}: {
  table: TanstackTable<TData>
} & Omit<React.ComponentProps<"div">, "children">) {
  const { pageIndex, pageSize } = table.getState().pagination
  const pageCount = Math.max(table.getPageCount(), 1)
  const selected = table.getFilteredSelectedRowModel().rows.length
  const total = table.getFilteredRowModel().rows.length
  // Always include the active pageSize so the trigger never renders blank when
  // a consumer passes a value outside the default set.
  const sizeOptions = Array.from(new Set([...PAGE_SIZES, pageSize])).sort(
    (a, b) => a - b
  )

  return (
    <div
      data-slot="data-table-pagination"
      className={cn(
        "flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}
    >
      <p className="text-muted-foreground text-sm" aria-live="polite">
        {selected > 0
          ? `${selected} of ${total} row${total === 1 ? "" : "s"} selected`
          : `${total} row${total === 1 ? "" : "s"}`}
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Rows per page</span>
          <Select
            value={String(pageSize)}
            onValueChange={(value: unknown) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-[4.5rem]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="text-muted-foreground text-sm" aria-live="polite">
          Page {pageIndex + 1} of {pageCount}
        </p>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            aria-label="Go to first page"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
          >
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            aria-label="Go to previous page"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            aria-label="Go to next page"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            aria-label="Go to last page"
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(pageCount - 1)}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}

/**
 * Inline-editable cell. Display mode is a flat, keyboard-reachable trigger; on
 * activate it becomes a debossed entry well (`Input`) — the slot/token rule at
 * cell scale. Enter commits, Escape reverts and returns focus to the trigger.
 * A rejected commit shakes (opacity flash under reduced motion) and fires the
 * error haptic; a good commit ticks. Blur commits, or silently reverts if the
 * draft is invalid (clicking away shouldn't trap focus).
 */
function DataTableEditableCell({
  value,
  onCommit,
  validate,
  align = "left",
  type = "text",
  label,
  className,
}: {
  value: string | number
  onCommit: (value: string) => void
  /** Return false to reject the draft on Enter (shake + error haptic). */
  validate?: (value: string) => boolean
  align?: "left" | "right"
  type?: "text" | "number"
  /** Accessible name for the edit input. */
  label?: string
  className?: string
}) {
  const original = String(value)
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(original)
  const [invalid, setInvalid] = React.useState(false)
  const reduceMotion = useReducedMotion()
  const { trigger } = useHaptics()
  const [scope, animate] = useAnimate()
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  function begin() {
    setDraft(original)
    setInvalid(false)
    setEditing(true)
  }

  function refocusTrigger() {
    // let the trigger remount before focusing it.
    requestAnimationFrame(() => triggerRef.current?.focus())
  }

  // `refocus` only when the user ended the edit by keyboard (Enter/Escape) —
  // returning focus to the cell is right there. On blur the user is *leaving*
  // for somewhere else (Tab, a click), so stealing focus back would fight them.
  function cancel(refocus: boolean) {
    setInvalid(false)
    setEditing(false)
    if (refocus) refocusTrigger()
  }

  function commit(fromBlur: boolean) {
    const next = draft.trim()
    if (validate && !validate(next)) {
      // Blur shouldn't trap the user in an invalid cell — revert, let focus go.
      if (fromBlur) {
        cancel(false)
        return
      }
      setInvalid(true)
      trigger("error")
      animate(
        scope.current,
        reduceMotion ? reduced.flash.animate : shake.animate,
        reduceMotion ? reduced.flash.transition : shake.transition
      )
      return
    }
    if (next !== original) {
      trigger("tick")
      onCommit(next)
    }
    setInvalid(false)
    setEditing(false)
    if (!fromBlur) refocusTrigger()
  }

  if (!editing) {
    return (
      <button
        ref={triggerRef}
        type="button"
        data-slot="data-table-edit-trigger"
        onClick={begin}
        // Dogfoods the foundation's ghost button (base classes + focus ring) on
        // the native element — the cell owns triggerRef for refocus, so it stays
        // a plain <button> rather than the Button component (§5A option 2).
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "hover:bg-muted/60 h-8 w-full justify-start px-2 font-normal",
          align === "right" && "justify-end text-right",
          className
        )}
      >
        {original || <span className="text-muted-foreground">—</span>}
      </button>
    )
  }

  return (
    <motion.div
      ref={scope}
      className={cn("flex", align === "right" && "justify-end")}
    >
      <Input
        // entering edit mode should land the cursor in the field immediately.
        autoFocus
        type={type}
        value={draft}
        aria-label={label}
        aria-invalid={invalid || undefined}
        onChange={(event) => {
          setDraft(event.target.value)
          if (invalid) setInvalid(false)
        }}
        onBlur={() => commit(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault()
            commit(false)
          } else if (event.key === "Escape") {
            event.preventDefault()
            cancel(true)
          }
        }}
        className={cn(
          "h-8 py-0",
          align === "right" && "text-right",
          invalid && "border-destructive ring-2 ring-destructive/30"
        )}
      />
    </motion.div>
  )
}

/**
 * Row action menu — a ghost icon key opening a DropdownMenu. Pass the menu
 * items as children; every row's trigger takes a distinct label.
 */
function DataTableRowActions({
  children,
  label = "Open row actions",
}: {
  children: React.ReactNode
  label?: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground data-[popup-open]:bg-accent size-8"
            aria-label={label}
          >
            <MoreHorizontal className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="min-w-36">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export {
  DataTable,
  DataTableColumnHeader,
  DataTableToolbar,
  DataTablePagination,
  DataTableEditableCell,
  DataTableRowActions,
  type DataTableProps,
}
