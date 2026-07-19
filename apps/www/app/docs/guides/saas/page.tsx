import type { Metadata } from "next"
import Link from "next/link"

import { Section } from "@/components/docs/section"
import { CodeBlock } from "@/registry/seam/ui/code-block"
import { exampleSource } from "@/lib/registry-source"
import AuthBlock from "@/registry/seam/examples/auth-block"

export const metadata: Metadata = {
  title: "Building a SaaS app — seamui",
  description:
    "Compose the SaaS suite — auth with 2FA, settings, team, billing — from the seam foundation.",
}

export default function SaasGuide() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">
        Building a SaaS app
      </h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        The pages every SaaS product ships — sign-in, settings, team, billing —
        composed from the seam foundation. Each block below is a copyable
        recipe: <strong>Field</strong> + <strong>Form</strong> carry the
        validation, the debossed/embossed language carries the design, and the
        error signal (shake + haptic) is the same one everywhere.
      </p>

      <Section title="Auth — sign in with a second factor">
        <p className="text-muted-foreground text-sm">
          A Card holding a validated Form; submitting steps into a 2FA screen on{" "}
          <Link
            className="hover:text-foreground underline"
            href="/docs/components/otp-field"
          >
            OTP Field
          </Link>
          , which shakes and buzzes on a rejected code — the same rejected-input
          signal Field errors use. The step swap is motion-owned
          (AnimatePresence + overlay depth; opacity-only under reduced motion).
        </p>
        <div className="squircle bg-background my-4 flex justify-center rounded-xl border p-6">
          <AuthBlock />
        </div>
        <CodeBlock code={exampleSource("auth-block")} language="tsx" />
      </Section>

      <Section title="Coming next">
        <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
          <li>
            <strong>Settings</strong> — Tabs + Field/Form + Switch + Select,
            with an AlertDialog danger zone.
          </li>
          <li>
            <strong>Team members</strong> — Data Table + row actions + an invite
            Dialog.
          </li>
          <li>
            <strong>Billing &amp; usage</strong> — plan Cards, a monthly/annual
            Toggle Group, usage meters.
          </li>
          <li>
            <strong>Notifications</strong> — a Popover feed with a Badge dot.
          </li>
        </ul>
        <p className="text-muted-foreground/80 text-xs">
          Tracked in{" "}
          <a
            className="hover:text-foreground underline"
            href="https://github.com/meiskv/seamui/issues/90"
          >
            the SaaS-suite issue
          </a>
          .
        </p>
      </Section>
    </main>
  )
}
