import { BranchChip } from "@/registry/seam/ui/branch-chip"

export default function BranchChipPr() {
  return (
    <div className="flex flex-col items-start gap-2">
      <BranchChip
        branch="feat/agent-status"
        ahead={2}
        pr={{ number: 69, state: "open" }}
      />
      <BranchChip branch="feat/diff-view" pr={{ number: 72, state: "draft" }} />
      <BranchChip
        branch="fix/toast-stacking"
        pr={{ number: 58, state: "merged" }}
      />
      <BranchChip
        branch="experiment/webgpu"
        pr={{ number: 41, state: "closed" }}
      />
    </div>
  )
}
