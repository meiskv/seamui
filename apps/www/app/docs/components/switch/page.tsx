import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Install, ApiTable, Notes } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import SwitchDemo from "@/registry/seam/examples/switch-demo"
import SwitchSettings from "@/registry/seam/examples/switch-settings"
import SwitchDisabled from "@/registry/seam/examples/switch-disabled"

export const metadata: Metadata = {
  title: "Switch — seamui",
  description: "Switch built on Base UI; the thumb springs between states.",
}

export default function SwitchDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Switch</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        A control that toggles between on and off. The thumb springs across the
        track with real physics.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <SwitchDemo />, code: exampleSource("switch-demo") },
          { key: "settings", title: "Settings list", component: <SwitchSettings />, code: exampleSource("switch-settings") },
          { key: "disabled", title: "Disabled", component: <SwitchDisabled />, code: exampleSource("switch-disabled") },
        ]}
      />

      <Install name="switch" />

      <ApiTable
        rows={[
          { prop: "checked", type: "boolean", desc: "Controlled on/off state." },
          { prop: "defaultChecked", type: "boolean", default: "false", desc: "Initial state when uncontrolled." },
          { prop: "onCheckedChange", type: "(checked, eventDetails) => void", desc: "Fires as the state commits (also triggers the haptic tick)." },
          { prop: "disabled", type: "boolean", default: "false", desc: "Disables the switch." },
        ]}
        footer={
          <>Plus all Base UI <code>Switch.Root</code> props (e.g. <code>name</code>, <code>required</code> for forms).</>
        }
      />

      <Notes>
        <li>
          While pressed the thumb <em>stretches</em> toward the far side (the
          iOS feel) and snaps across on release.
        </li>
        <li>
          The thumb is a <code>layout</code> element — the crossing spring is
          interruptible mid-flight.
        </li>
      </Notes>
    </main>
  )
}
