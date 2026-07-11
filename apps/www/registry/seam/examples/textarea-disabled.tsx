import { Textarea } from "@/registry/seam/ui/textarea"

export default function TextareaDisabled() {
  return (
    <Textarea
      disabled
      placeholder="This field is disabled."
      className="max-w-sm"
    />
  )
}
