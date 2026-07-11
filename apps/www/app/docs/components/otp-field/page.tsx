import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import OTPFieldDemo from "@/registry/seam/examples/otp-field-demo"
import OTPFieldFour from "@/registry/seam/examples/otp-field-four"
import OTPFieldDisabled from "@/registry/seam/examples/otp-field-disabled"
import OTPFieldInvalid from "@/registry/seam/examples/otp-field-invalid"

export const metadata: Metadata = {
  title: "OTP Field — seamui",
  description: "One-time-code input built on Base UI.",
}

export default function OTPFieldDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">OTP Field</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A segmented input for one-time codes, with paste-to-fill and per-slot
        focus handled by Base UI.
      </p>

      <VariantPreview
        variants={[
          {
            key: "default",
            title: "Six digits",
            component: <OTPFieldDemo />,
            code: exampleSource("otp-field-demo"),
          },
          {
            key: "four",
            title: "Four digits",
            component: <OTPFieldFour />,
            code: exampleSource("otp-field-four"),
          },
          {
            key: "disabled",
            title: "Disabled",
            component: <OTPFieldDisabled />,
            code: exampleSource("otp-field-disabled"),
          },
          {
            key: "invalid",
            title: "Invalid",
            component: <OTPFieldInvalid />,
            code: exampleSource("otp-field-invalid"),
            description:
              "Flip invalid after a rejected code — destructive slots plus an error shake.",
          },
        ]}
      />

      <Install name="otp-field" />

      <ApiTable
        rows={[
          {
            prop: "length",
            type: "number",
            default: "6",
            desc: "Number of slots.",
          },
          {
            prop: "invalid",
            type: "boolean",
            desc: "Paints destructive slots, shakes the group, and fires the error haptic when flipped on.",
          },
          {
            prop: "value / defaultValue",
            type: "string",
            desc: "Controlled / uncontrolled code.",
          },
          {
            prop: "onValueChange",
            type: "(value, eventDetails) => void",
            desc: "Fires as digits land or are deleted.",
          },
          {
            prop: "onValueComplete",
            type: "(value, eventDetails) => void",
            desc: "Fires once all slots are filled — the usual submit hook.",
          },
        ]}
        footer={
          <>
            Plus all Base UI <code>OTPField.Root</code> props.
          </>
        }
      />

      <Notes>
        <li>
          Slots are entry wells, so they don&apos;t press — but each slot pops
          as its digit lands, and flipping <code>invalid</code> shakes the group
          (an opacity flash under reduced motion; the destructive border carries
          the state either way).
        </li>
        <li>
          The caret is the browser&apos;s own — every slot is a real{" "}
          <code>&lt;input&gt;</code>, so nothing fake needs to blink.
        </li>
        <li>
          Uses <code>autoComplete=&quot;one-time-code&quot;</code> for OS
          autofill, moves focus between slots on input, and supports pasting a
          full code.
        </li>
      </Notes>
    </main>
  )
}
