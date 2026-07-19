import { Checkbox } from "@/registry/seam/ui/checkbox"
import { CheckboxGroup } from "@/registry/seam/ui/checkbox-group"
import { Label } from "@/registry/seam/ui/label"

export default function CheckboxGroupDemo() {
  return (
    <CheckboxGroup defaultValue={["replies"]} aria-label="Notifications">
      <Label>
        <Checkbox name="replies" />
        Replies to my threads
      </Label>
      <Label>
        <Checkbox name="mentions" />
        Direct mentions
      </Label>
      <Label>
        <Checkbox name="digest" />
        Weekly digest
      </Label>
    </CheckboxGroup>
  )
}
