import { SearchX } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateMedia,
  EmptyStateTitle,
} from "@/registry/seam/ui/empty-state"

export default function EmptyStateSearch() {
  return (
    <EmptyState className="max-w-md">
      <EmptyStateMedia>
        <SearchX />
      </EmptyStateMedia>
      <EmptyStateTitle>No results for &quot;seamles&quot;</EmptyStateTitle>
      <EmptyStateDescription>
        Check the spelling or try a broader term.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button variant="outline" size="sm">
          Clear filters
        </Button>
      </EmptyStateActions>
    </EmptyState>
  )
}
