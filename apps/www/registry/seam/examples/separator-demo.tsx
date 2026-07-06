import { Separator } from "@/registry/seam/ui/separator"

export default function SeparatorDemo() {
  return (
    <div className="w-full max-w-xs">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">seamui</h4>
        <p className="text-muted-foreground text-sm">Components you own.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
        <Separator orientation="vertical" />
        <span>Motion</span>
      </div>
    </div>
  )
}
