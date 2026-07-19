import { Checkbox } from "@/registry/seam/ui/checkbox"
import { CheckboxGroup } from "@/registry/seam/ui/checkbox-group"
import { Label } from "@/registry/seam/ui/label"

export default function CheckboxGroupDisabled() {
  return (
    <CheckboxGroup disabled defaultValue={["logs"]} aria-label="Plan features">
      <Label>
        <Checkbox name="logs" />
        Audit logs
      </Label>
      <Label>
        <Checkbox name="sso" />
        SSO
      </Label>
    </CheckboxGroup>
  )
}
