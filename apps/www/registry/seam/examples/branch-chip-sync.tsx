import { BranchChip } from "@/registry/seam/ui/branch-chip"

// Ahead/behind counts read as quiet telemetry next to the name. The second
// chip is static (copyable={false}) — for rows that are themselves clickable.
export default function BranchChipSync() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <BranchChip branch="feat/model-picker" ahead={3} behind={1} />
      <BranchChip branch="main" behind={12} copyable={false} />
    </div>
  )
}
