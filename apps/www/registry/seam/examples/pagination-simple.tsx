"use client"

import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/seam/ui/pagination"

// Prev/next only — the compact shape for feeds and mobile lists.
export default function PaginationSimple() {
  const [page, setPage] = React.useState(1)
  const last = 5

  return (
    <div className="flex flex-col items-center gap-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              disabled={page === 1}
              onClick={(e) => {
                e.preventDefault()
                setPage((p) => Math.max(1, p - 1))
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              disabled={page === last}
              onClick={(e) => {
                e.preventDefault()
                setPage((p) => Math.min(last, p + 1))
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <p className="text-muted-foreground text-sm" aria-live="polite">
        Page {page} of {last}
      </p>
    </div>
  )
}
