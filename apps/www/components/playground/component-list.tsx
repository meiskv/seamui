"use client"

import * as React from "react"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/seam/ui/button"
import { Input } from "@/registry/seam/ui/input"
import { groupedSpecs } from "@/lib/playground/specs"
import type { PlaygroundSpec } from "@/lib/playground/types"

export function ComponentList({
  specs,
  activeId,
  onSelect,
  className,
}: {
  specs: readonly PlaygroundSpec[]
  activeId: string
  onSelect: (spec: PlaygroundSpec) => void
  className?: string
}) {
  const [query, setQuery] = React.useState("")

  const groups = React.useMemo(() => {
    const needle = query.trim().toLowerCase()
    const matching = needle
      ? specs.filter((s) => s.title.toLowerCase().includes(needle))
      : specs
    return groupedSpecs(matching)
  }, [specs, query])

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="relative">
        <Search className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search components"
          aria-label="Search components"
          className="h-9 pl-9"
        />
      </div>

      <nav aria-label="Playground components" className="space-y-4">
        {groups.map((group) => (
          <div key={group.title} className="space-y-0.5">
            <p className="text-muted-foreground px-2 pb-1 text-xs font-medium">
              {group.title}
            </p>
            {group.specs.map((spec) => (
              <Button
                key={spec.id}
                variant={spec.id === activeId ? "secondary" : "ghost"}
                size="sm"
                aria-current={spec.id === activeId ? "page" : undefined}
                onClick={() => onSelect(spec)}
                className="w-full justify-start font-normal"
              >
                {spec.title}
              </Button>
            ))}
          </div>
        ))}

        {groups.length === 0 ? (
          <p className="text-muted-foreground px-2 text-sm">
            No components match “{query}”.
          </p>
        ) : null}
      </nav>
    </div>
  )
}
