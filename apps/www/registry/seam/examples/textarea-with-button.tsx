import { Button } from "@/registry/seam/ui/button"
import { Textarea } from "@/registry/seam/ui/textarea"

export default function TextareaWithButton() {
  return (
    <div className="grid w-full max-w-sm gap-2.5">
      <Textarea placeholder="Share your feedback…" />
      <Button>Send message</Button>
    </div>
  )
}
