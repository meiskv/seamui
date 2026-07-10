import { Checkbox } from "@/registry/seam/ui/checkbox"

export default function CheckboxWithText() {
  return (
    <label className="flex max-w-xs items-start gap-2.5">
      <Checkbox defaultChecked className="mt-0.5" />
      <div className="grid gap-1 text-sm leading-none">
        <span className="font-medium">Email notifications</span>
        <span className="text-muted-foreground">
          Get notified when someone replies to your thread.
        </span>
      </div>
    </label>
  )
}
