import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateTitle,
} from "@/registry/seam/ui/empty-state"

// Media and actions are optional — title + description alone stay centered.
export default function EmptyStatePlain() {
  return (
    <EmptyState className="max-w-md py-8">
      <EmptyStateTitle>No notifications</EmptyStateTitle>
      <EmptyStateDescription>You&apos;re all caught up.</EmptyStateDescription>
    </EmptyState>
  )
}
