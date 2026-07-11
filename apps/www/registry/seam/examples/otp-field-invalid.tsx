"use client"

import * as React from "react"

import { OTPField } from "@/registry/seam/ui/otp-field"

// Completing the field with the wrong code flips `invalid`: the slots go
// destructive and the group shakes (an opacity flash under reduced motion).
// Editing again clears it.
export default function OTPFieldInvalid() {
  const [value, setValue] = React.useState("")
  const [invalid, setInvalid] = React.useState(false)

  return (
    <div className="flex flex-col items-center gap-3">
      <OTPField
        length={4}
        value={value}
        invalid={invalid}
        onValueChange={(v) => {
          setValue(v)
          setInvalid(v.length === 4 && v !== "1234")
        }}
      />
      <p className="text-muted-foreground text-xs">
        The code is <code>1234</code> — try a wrong one first.
      </p>
    </div>
  )
}
