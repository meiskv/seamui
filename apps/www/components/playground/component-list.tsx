"use client"

import * as React from "react"

import { Button } from "@/registry/seam/ui/button"
import { Input } from "@/registry/seam/ui/input"
import { specsByGroup } from "@/lib/playground/registry"

/**
 * The left rail: every component the playground can tune, grouped exactly as
 * the docs nav groups them. The active entry is an embossed key; the rest are
 * ghosts, so the selection reads as raised out of the list.
 */
export function ComponentList({
  activeId,
  onSelect,
}: {
  activeId: string
  onSelect: (id: string) => void
}) {
  const [query, setQuery] = React.useState("")

  const groups = React.useMemo(() => {
    const term = query.trim().toLowerCase()
    return specsByGroup()
      .map((group) => ({
        ...group,
        specs: term
          ? group.specs.filter((spec) =>
              spec.title.toLowerCase().includes(term)
            )
          : group.specs,
      }))
      .filter((group) => group.specs.length > 0)
  }, [query])

  return (
    <div className="space-y-4">
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search components"
        aria-label="Search components"
        className="h-9 text-sm"
      />

      {groups.map((group) => (
        <div key={group.group} className="space-y-1">
          <h2 className="text-muted-foreground px-2 text-xs font-medium">
            {group.group}
          </h2>
          {group.specs.map((spec) => (
            <Button
              key={spec.id}
              variant={spec.id === activeId ? "secondary" : "ghost"}
              size="sm"
              aria-current={spec.id === activeId ? "page" : undefined}
              onClick={() => onSelect(spec.id)}
              className="w-full justify-start font-normal"
            >
              {spec.title}
            </Button>
          ))}
        </div>
      ))}

      {groups.length === 0 ? (
        <p className="text-muted-foreground px-2 text-sm">No matches.</p>
      ) : null}
    </div>
  )
}
