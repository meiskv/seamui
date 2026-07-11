import { Volume2, VolumeX } from "lucide-react"

import { MediaToggle } from "@/registry/seam/ui/media-toggle"

// Pass iconOn / iconOff for controls beyond the mic/camera/screen presets.
export default function MediaToggleCustomIcons() {
  return (
    <MediaToggle
      iconOn={Volume2}
      iconOff={VolumeX}
      aria-label="Speaker"
      defaultPressed
    />
  )
}
