import { ModeOption, ModeSelector } from "@/registry/seam/ui/mode-selector"

// Same control, permission-mode vocabulary — the chips Paseo pins on a draft.
export default function ModeSelectorPermission() {
  return (
    <ModeSelector defaultValue={["ask"]}>
      <ModeOption value="ask">Ask first</ModeOption>
      <ModeOption value="auto-edit">Auto-edit</ModeOption>
      <ModeOption value="full-auto">Full auto</ModeOption>
    </ModeSelector>
  )
}
