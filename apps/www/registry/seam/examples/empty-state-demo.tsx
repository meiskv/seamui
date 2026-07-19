import { FolderPlus } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateMedia,
  EmptyStateTitle,
} from "@/registry/seam/ui/empty-state"

export default function EmptyStateDemo() {
  return (
    <EmptyState className="max-w-md">
      <EmptyStateMedia>
        <FolderPlus />
      </EmptyStateMedia>
      <EmptyStateTitle>No projects yet</EmptyStateTitle>
      <EmptyStateDescription>
        Projects keep your team&apos;s work in one place. Create your first one
        to get started.
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button>New project</Button>
        <Button variant="ghost">Import</Button>
      </EmptyStateActions>
    </EmptyState>
  )
}
