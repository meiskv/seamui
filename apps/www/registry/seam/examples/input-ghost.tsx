import { Input } from "@/registry/seam/ui/input"

export default function InputGhost() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <span className="text-muted-foreground text-xs">Default — a well</span>
        <Input placeholder="m@example.com" />
      </div>
      <div className="grid gap-1.5">
        <span className="text-muted-foreground text-xs">
          Ghost — edits in place
        </span>
        {/* No well and no stroke until focus, for editing inside a toolbar,
            a table cell, or a title row. */}
        <Input variant="ghost" defaultValue="Untitled project" />
      </div>
    </div>
  )
}
