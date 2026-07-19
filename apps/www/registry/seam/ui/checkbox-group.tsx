import type * as React from "react"
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group"

import { cn } from "@/lib/utils"

// Shared state for a series of seam Checkboxes: give each child Checkbox a
// `name`, control membership with `value`/`defaultValue`, and pass
// `allValues` to wire a select-all parent (a Checkbox with `parent`).
// Each checkbox fires its own tick haptic, so the group adds none.
function CheckboxGroup({
  className,
  ...props
}: React.ComponentProps<typeof BaseCheckboxGroup>) {
  return (
    <BaseCheckboxGroup
      data-slot="checkbox-group"
      className={cn(
        "flex flex-col items-start gap-2.5",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { CheckboxGroup }
