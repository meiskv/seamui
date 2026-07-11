import type { Metadata } from "next"

import { VariantPreview } from "@/components/docs/variant-preview"
import { Section, CodeBlock, Install } from "@/components/docs/section"
import { exampleSource } from "@/lib/registry-source"
import DeviceSelectorDemo from "@/registry/seam/examples/device-selector-demo"
import DeviceSelectorSplit from "@/registry/seam/examples/device-selector-split"
import DeviceSelectorLive from "@/registry/seam/examples/device-selector-live"

export const metadata: Metadata = {
  title: "Device Selector — seamui",
  description:
    "Mic/camera/output picker on DropdownMenu, with an owned useMediaDevices hook.",
}

export default function DeviceSelectorDocs() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Device Selector</h1>
      <p className="text-muted-foreground mt-1.5 text-[0.9375rem]">
        Choose which microphone, camera, or speaker a call uses. It composes
        Dropdown Menu — a radio group of devices with the active one checked —
        and docks against a Media Toggle as a split control.
      </p>

      <VariantPreview
        variants={[
          { key: "default", title: "Default", component: <DeviceSelectorDemo />, code: exampleSource("device-selector-demo") },
          { key: "split", title: "Split control", component: <DeviceSelectorSplit />, code: exampleSource("device-selector-split"), description: "Mute is one press; picking the device is the small key beside it." },
          { key: "live", title: "Live devices", component: <DeviceSelectorLive />, code: exampleSource("device-selector-live"), description: "Enumerates real hardware — click to grant permission." },
        ]}
      />

      <Install name="device-selector" />

      <Section title="Usage">
        <CodeBlock>{`import {
  DeviceSelector,
  DeviceSelectorTrigger,
  DeviceSelectorContent,
} from "@/components/ui/device-selector"`}</CodeBlock>
        <CodeBlock>{`<DeviceSelector kind="audioinput" value={id} onValueChange={setId}>
  <DeviceSelectorTrigger />
  <DeviceSelectorContent />
</DeviceSelector>`}</CodeBlock>
        <p className="text-muted-foreground text-sm">
          Pass a <code>devices</code> array to control the list, or omit it and
          the owned <code>useMediaDevices</code> hook enumerates real hardware
          and re-lists on <code>devicechange</code>. The shape maps onto the
          LiveKit <code>useMediaDeviceSelect</code> hook with no dependency.
        </p>
      </Section>

      <Section title="Motion">
        <p className="text-muted-foreground text-sm">
          No new motion — everything is inherited: the trigger presses via the
          dogfooded Button, and the menu rises at overlay depth
          (<code>springs.surface</code>, fading in under reduced motion) from
          Dropdown Menu.
        </p>
      </Section>

      <Section title="Accessibility">
        <p className="text-muted-foreground text-sm">
          Full menu semantics from Base UI (roving focus, typeahead, a checked
          radio item for the active device). The trigger carries an{" "}
          <code>aria-label</code>. Device labels are empty until mic/camera
          permission is granted, so the hook falls back to
          &ldquo;Microphone 2&rdquo;-style names until then.
        </p>
      </Section>
    </main>
  )
}
