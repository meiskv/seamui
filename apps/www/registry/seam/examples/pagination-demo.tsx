"use client"

import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/seam/ui/pagination"

// Controlled pagination: the embossed key springs to the page you pick.
export default function PaginationDemo() {
  const [page, setPage] = React.useState(2)
  const last = 12

  const go = (p: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    setPage(p)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            disabled={page === 1}
            onClick={go(page - 1)}
          />
        </PaginationItem>
        {[1, 2, 3].map((p) => (
          <PaginationItem key={p}>
            <PaginationLink href="#" isActive={p === page} onClick={go(p)}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive={page === last} onClick={go(last)}>
            {last}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            disabled={page === last}
            onClick={go(page === last ? page : page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
