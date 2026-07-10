import { Progress } from "@/registry/seam/ui/progress"

export default function ProgressLabeled() {
  return (
    <div className="w-64 space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Uploading…</span>
        <span className="text-muted-foreground tabular-nums">66%</span>
      </div>
      <Progress value={66} />
    </div>
  )
}
