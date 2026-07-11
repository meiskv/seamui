import { MediaToggle } from "@/registry/seam/ui/media-toggle"

export default function MediaToggleDemo() {
  return (
    <div className="flex items-center gap-2">
      <MediaToggle kind="mic" defaultPressed />
      <MediaToggle kind="camera" defaultPressed={false} />
      <MediaToggle kind="screen-share" defaultPressed />
    </div>
  )
}
