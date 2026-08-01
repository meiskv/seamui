import { Textarea } from "@/registry/seam/ui/textarea"

export default function TextareaGhost() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <span className="text-muted-foreground text-xs">Default — a well</span>
        <Textarea placeholder="Leave a note…" />
      </div>
      <div className="grid gap-1.5">
        <span className="text-muted-foreground text-xs">
          Ghost — composes in place
        </span>
        <Textarea
          variant="ghost"
          defaultValue="Ships the whole flow: the sheet, the confirm, and the receipt."
        />
      </div>
    </div>
  )
}
