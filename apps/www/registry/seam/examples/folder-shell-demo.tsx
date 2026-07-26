import { Folder } from "lucide-react"

import {
  FolderShell,
  FolderShellDescription,
  FolderShellTitle,
} from "@/registry/seam/ui/folder-shell"

export default function FolderShellDemo() {
  return (
    <FolderShell icon={<Folder />} className="w-full max-w-xs">
      <FolderShellTitle>Work</FolderShellTitle>
      <FolderShellDescription>
        56 documents, last opened Tuesday
      </FolderShellDescription>
    </FolderShell>
  )
}
