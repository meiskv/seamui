import type { Metadata } from "next"
import Link from "next/link"

import { Section } from "@/components/docs/section"
import { CodeBlock } from "@/registry/seam/ui/code-block"
import { exampleSource } from "@/lib/registry-source"
import AuthBlock from "@/registry/seam/examples/auth-block"
import SettingsBlock from "@/registry/seam/examples/settings-block"
import TeamBlock from "@/registry/seam/examples/team-block"

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

      <Section title="Settings — tabs, switches, and a danger zone">
        <p className="text-muted-foreground text-sm">
          Tabs hold the sections; the General tab is a validated Form (Field +
          Input + a Field-wrapped Select), Notifications are Switch rows that
          tick as they commit, and the danger zone pairs a destructive{" "}
          <Link
            className="hover:text-foreground underline"
            href="/docs/components/alert"
          >
            Alert
          </Link>{" "}
          with an AlertDialog so deletion takes two deliberate steps.
        </p>
        <div className="squircle bg-background my-4 flex justify-center rounded-xl border p-6">
          <SettingsBlock />
        </div>
        <CodeBlock code={exampleSource("settings-block")} language="tsx" />
      </Section>

      <Section title="Team — rows, actions, and an invite dialog">
        <p className="text-muted-foreground text-sm">
          A Data Table of members — Avatar identity, Badge roles and status —
          with a per-row DropdownMenu for role changes and removal. Inviting
          opens a Dialog whose Form pairs a validated email Field with a{" "}
          <Link
            className="hover:text-foreground underline"
            href="/docs/components/combobox"
          >
            Combobox
          </Link>{" "}
          role picker; the new row lands as &quot;Invited&quot;.
        </p>
        <div className="squircle bg-background my-4 flex justify-center rounded-xl border p-6">
          <TeamBlock />
        </div>
        <CodeBlock code={exampleSource("team-block")} language="tsx" />
      </Section>

      <Section title="Coming next">
        <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
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
