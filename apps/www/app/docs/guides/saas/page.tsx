import type { Metadata } from "next"
import Link from "next/link"

import { Section } from "@/components/docs/section"
import { VariantPreview } from "@/components/docs/variant-preview"
import { exampleSource } from "@/lib/registry-source"
import AuthBlock from "@/registry/seam/examples/auth-block"
import SettingsBlock from "@/registry/seam/examples/settings-block"
import TeamBlock from "@/registry/seam/examples/team-block"
import BillingBlock from "@/registry/seam/examples/billing-block"
import NotificationsBlock from "@/registry/seam/examples/notifications-block"

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
        The pages every SaaS product ships — sign-in, settings, team, billing,
        notifications — composed from the seam foundation. Pick a block below:
        each is a copyable recipe where <strong>Field</strong> +{" "}
        <strong>Form</strong> carry the validation, the debossed/embossed
        language carries the design, and the error signal (shake + haptic) is
        the same one everywhere.
      </p>

      <VariantPreview
        variants={[
          {
            key: "auth",
            title: "Auth",
            component: <AuthBlock />,
            code: exampleSource("auth-block"),
            description: (
              <>
                A Card holding a validated Form; submitting steps into 2FA on{" "}
                <Link
                  className="hover:text-foreground underline"
                  href="/docs/components/otp-field"
                >
                  OTP Field
                </Link>
                , which shakes and buzzes on a rejected code (the demo code is
                123456). The step swap is motion-owned — overlay depth,
                opacity-only under reduced motion.
              </>
            ),
          },
          {
            key: "settings",
            title: "Settings",
            component: <SettingsBlock />,
            code: exampleSource("settings-block"),
            description: (
              <>
                Tabs hold the sections: a validated General form (Field + Input
                + Field-wrapped Select), Switch rows that tick as they commit,
                and a danger zone pairing a destructive{" "}
                <Link
                  className="hover:text-foreground underline"
                  href="/docs/components/alert"
                >
                  Alert
                </Link>{" "}
                with an AlertDialog so deletion takes two deliberate steps.
              </>
            ),
          },
          {
            key: "team",
            title: "Team",
            component: <TeamBlock />,
            code: exampleSource("team-block"),
            description: (
              <>
                A Data Table of members with per-row DropdownMenu actions and an
                invite Dialog pairing a validated email Field with a{" "}
                <Link
                  className="hover:text-foreground underline"
                  href="/docs/components/combobox"
                >
                  Combobox
                </Link>{" "}
                role picker; invitees land as &quot;Invited&quot;.
              </>
            ),
          },
          {
            key: "billing",
            title: "Billing",
            component: <BillingBlock />,
            code: exampleSource("billing-block"),
            description: (
              <>
                Plan Cards with a monthly/annual ToggleGroup — the embossed key
                slides between cycles — and usage rows on{" "}
                <Link
                  className="hover:text-foreground underline"
                  href="/docs/components/meter"
                >
                  Meter
                </Link>{" "}
                that turn destructive past 90% of the limit.
              </>
            ),
          },
          {
            key: "notifications",
            title: "Notifications",
            component: <NotificationsBlock />,
            code: exampleSource("notifications-block"),
            description: (
              <>
                A bell with a Badge count opens a Popover feed grouped by day.
                Reading an item clears its dot; clearing everything lands on{" "}
                <Link
                  className="hover:text-foreground underline"
                  href="/docs/components/empty-state"
                >
                  Empty State
                </Link>
                .
              </>
            ),
          },
        ]}
      />

      <Section title="Where to go from here">
        <p className="text-muted-foreground text-sm">
          Every block is a registry example — install one with{" "}
          <code>bunx --bun @seamui/cli@latest add auth-block</code> (or{" "}
          <code>settings-block</code>, <code>team-block</code>,{" "}
          <code>billing-block</code>, <code>notifications-block</code>) and its
          whole component stack comes with it. The pieces are documented under
          Forms, Overlay, and Data in the sidebar; motion and accessibility
          policy live on{" "}
          <Link className="hover:text-foreground underline" href="/docs/motion">
            Motion
          </Link>{" "}
          and{" "}
          <Link
            className="hover:text-foreground underline"
            href="/docs/haptics"
          >
            Haptics
          </Link>
          .
        </p>
      </Section>
    </main>
  )
}
