import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import OTPFieldDemo from "@/registry/seam/examples/otp-field-demo"

export const metadata: Metadata = {
  title: "OTP Field — seamui",
  description: "One-time-code input built on Base UI.",
}

export default function OTPFieldDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">OTP Field</h1>
      <p className="text-muted-foreground mt-2 text-lg">
        A segmented input for one-time codes, with paste-to-fill and per-slot
        focus handled by Base UI.
      </p>

      <ComponentPreview code={exampleSource("otp-field-demo")}>
        <OTPFieldDemo />
      </ComponentPreview>

      <Install name="otp-field" />

      <Section title="Usage">
        <CodeBlock>{`import { OTPField } from "@/components/ui/otp-field"`}</CodeBlock>
        <CodeBlock>{`<OTPField length={6} onValueComplete={submit} />`}</CodeBlock>
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
