import { MoreVertical } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import {
  FolderShell,
  FolderShellDescription,
  FolderShellTitle,
} from "@/registry/seam/ui/folder-shell"

export default function FolderShellDemo() {
  return (
    <FolderShell
      className="w-full max-w-xs"
      action={
        <Button
          variant="ghost"
          size="icon"
          aria-label="Folder options"
          className="-mt-1 -mr-1 size-8 hover:bg-white/20"
        >
          <MoreVertical />
        </Button>
      }
      footer="Last added Oct 13, 2025"
    >
      <FolderShellTitle>Designs</FolderShellTitle>
      <FolderShellDescription>318 images</FolderShellDescription>
    </FolderShell>
  )
}
