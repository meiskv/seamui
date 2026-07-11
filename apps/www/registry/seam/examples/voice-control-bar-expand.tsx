"use client"

import * as React from "react"
import { MessageSquare } from "lucide-react"

import {
  VoiceControlBar,
  VoiceControlBarActions,
  VoiceControlBarPanel,
  VoiceControlBarTrigger,
  VoiceControlBarEnd,
} from "@/registry/seam/ui/voice-control-bar"
import {
  Composer,
  ComposerTextarea,
  ComposerToolbar,
  ComposerSubmit,
} from "@/registry/seam/ui/composer"
import { MediaToggle } from "@/registry/seam/ui/media-toggle"

// Toggle the chat key and the pill morphs — the panel grows a composer while
// the container squares off from a pill into a rounded card. It's controlled
// here so the demo can start open; leave `expanded` off to self-manage.
export default function VoiceControlBarExpand() {
  const [open, setOpen] = React.useState(true)

  return (
    <VoiceControlBar
      expanded={open}
      onExpandedChange={setOpen}
      className="w-full max-w-sm"
    >
      <VoiceControlBarPanel>
        <Composer onSubmit={(e) => e.preventDefault()} className="shadow-none">
          <ComposerTextarea placeholder="Message the agent…" />
          <ComposerToolbar>
            <ComposerSubmit />
          </ComposerToolbar>
        </Composer>
      </VoiceControlBarPanel>
      <VoiceControlBarActions className="justify-center">
        <MediaToggle kind="mic" defaultPressed />
        <MediaToggle kind="camera" />
        <VoiceControlBarTrigger>
          <MessageSquare className="size-4" />
        </VoiceControlBarTrigger>
        <VoiceControlBarEnd />
      </VoiceControlBarActions>
    </VoiceControlBar>
  )
}
