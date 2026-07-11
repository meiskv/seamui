import { VoiceAvatar } from "@/registry/seam/ui/voice-avatar"

// No image — the initials fallback shows, and the speaking halo still reads.
export default function VoiceAvatarFallback() {
  return <VoiceAvatar name="Grace Hopper" speaking className="size-16" />
}
