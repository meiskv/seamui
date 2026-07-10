import { Skeleton } from "@/registry/seam/ui/skeleton"

export default function SkeletonDemo() {
  return (
    <div className="flex w-full max-w-sm items-center gap-3.5">
      <Skeleton className="size-11 shrink-0 rounded-full" />
      <div className="grid w-full gap-2">
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
