import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
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
          { key: "default", title: "Six digits", component: <OTPFieldDemo />, code: exampleSource("otp-field-demo") },
          { key: "four", title: "Four digits", component: <OTPFieldFour />, code: exampleSource("otp-field-four") },
          { key: "disabled", title: "Disabled", component: <OTPFieldDisabled />, code: exampleSource("otp-field-disabled") },
          { key: "invalid", title: "Invalid", component: <OTPFieldInvalid />, code: exampleSource("otp-field-invalid"), description: "Flip invalid after a rejected code — destructive slots plus an error shake." },
        ]}
      />

      <Install name="otp-field" />

      <Section title="Usage">
        <CodeBlock>{`import { OTPField } from "@/components/ui/otp-field"`}</CodeBlock>
        <CodeBlock>{`<OTPField length={6} onValueComplete={submit} invalid={rejected} />`}</CodeBlock>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          Slots are entry wells, so they don&apos;t press — but they react:
          each slot pops as its digit lands (<code>springs.snappy</code>,
          opacity-only under reduced motion), and flipping <code>invalid</code>{" "}
          shakes the group (the <code>shake</code> token; reduced motion swaps
          it for an opacity flash — the destructive border carries the state
          either way). The caret is the browser&apos;s own: every slot is a
          real input, so nothing fake needs to blink.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Uses <code>autoComplete="one-time-code"</code> for OS autofill, moves
          focus between slots on input, and supports paste of a full code.{" "}
          <code>onValueComplete</code> fires when all slots are filled.
        </p>
      </Section>
    </main>
  )
}
