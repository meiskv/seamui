"use client"

import { Checkbox } from "@/registry/seam/ui/checkbox"
import { CheckboxGroup } from "@/registry/seam/ui/checkbox-group"
import { Label } from "@/registry/seam/ui/label"

const SCOPES = ["read", "write", "deploy"]

// `allValues` + a `parent` checkbox = select-all with an indeterminate
// middle state, managed entirely by Base UI.
export default function CheckboxGroupParent() {
  return (
    <CheckboxGroup
      defaultValue={["read"]}
      allValues={SCOPES}
      aria-label="API scopes"
    >
      <Label className="font-semibold">
        <Checkbox parent />
        All scopes
      </Label>
      <div className="flex flex-col gap-2.5 pl-6">
        <Label>
          <Checkbox name="read" />
          Read
        </Label>
        <Label>
          <Checkbox name="write" />
          Write
        </Label>
        <Label>
          <Checkbox name="deploy" />
          Deploy
        </Label>
      </div>
    </CheckboxGroup>
  )
}
