"use client"

import * as React from "react"
import {
  Mic,
  MicOff,
  Monitor,
  MonitorOff,
  Video,
  VideoOff,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Toggle } from "./toggle"

type MediaKind = "mic" | "camera" | "screen-share"

const ICONS: Record<MediaKind, { on: LucideIcon; off: LucideIcon; label: string }> = {
  mic: { on: Mic, off: MicOff, label: "Microphone" },
  camera: { on: Video, off: VideoOff, label: "Camera" },
  "screen-share": { on: Monitor, off: MonitorOff, label: "Share screen" },
}

// A round call-control key that dogfoods Toggle. `pressed` means the track is
// *enabled* (on); unpressed means muted/off. The two states read very
// differently on purpose: enabled is a neutral embossed key, muted is a
// destructive-tinted key with a slashed icon — muting is a state you should
// notice, not an absence. Circles stay rounded-full (never squircle).
function MediaToggle({
  kind = "mic",
  iconOn,
  iconOff,
  className,
  "aria-label": ariaLabel,
  ...props
}: React.ComponentProps<typeof Toggle> & {
  kind?: MediaKind
  iconOn?: LucideIcon
  iconOff?: LucideIcon
}) {
  const preset = ICONS[kind]
  const OnIcon = iconOn ?? preset.on
  const OffIcon = iconOff ?? preset.off

  return (
    <Toggle
      data-slot="media-toggle"
      aria-label={ariaLabel ?? preset.label}
      defaultPressed
      className={cn(
        "group/media size-10 rounded-full p-0",
        // muted (unpressed) → destructive-tinted key + slashed icon
        "bg-destructive/15 text-destructive shadow-resting hover:bg-destructive/20 hover:text-destructive",
        // enabled (pressed) → neutral embossed key
        "data-[pressed]:bg-secondary data-[pressed]:text-secondary-foreground data-[pressed]:shadow-resting data-[pressed]:hover:bg-secondary",
        className
      )}
      {...props}
    >
      {/* Both icons share a cell; the tint + which icon is visible crossfade on
          toggle (opacity only, so identical under reduced motion). */}
      <span className="relative grid place-items-center [&>svg]:col-start-1 [&>svg]:row-start-1">
        <OnIcon className="opacity-0 transition-opacity duration-150 group-data-[pressed]/media:opacity-100 motion-reduce:transition-none" />
        <OffIcon className="opacity-100 transition-opacity duration-150 group-data-[pressed]/media:opacity-0 motion-reduce:transition-none" />
      </span>
    </Toggle>
  )
}

export { MediaToggle }
