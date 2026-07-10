import { Separator } from "@/registry/seam/ui/separator"

export default function SeparatorLabel() {
  return (
    <div className="flex w-full max-w-xs items-center gap-3">
      <Separator className="flex-1" />
      <span className="text-muted-foreground text-xs">OR</span>
      <Separator className="flex-1" />
    </div>
  )
}
