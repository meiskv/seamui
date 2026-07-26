import type * as React from "react"
import { BookMarked, FlaskConical } from "lucide-react"

import {
  FolderShell,
  FolderShellDescription,
  FolderShellTitle,
} from "@/registry/seam/ui/folder-shell"

const FOLDERS = [
  {
    title: "Books",
    meta: "Fiction, mystery, and a little poetry",
    icon: <BookMarked />,
    fill: "var(--color-green-600)",
  },
  {
    title: "Research",
    meta: "744 items across twelve threads",
    icon: <FlaskConical />,
    fill: "var(--color-violet-500)",
  },
]

export default function FolderShellAccent() {
  return (
    <div className="grid w-full max-w-lg grid-cols-2 gap-5">
      {FOLDERS.map((folder) => (
        // fill and foreground travel together, so the label keeps its contrast
        <FolderShell
          key={folder.title}
          icon={folder.icon}
          style={
            {
              "--folder-fill": folder.fill,
              "--folder-foreground": "var(--color-white)",
            } as React.CSSProperties
          }
        >
          <FolderShellTitle>{folder.title}</FolderShellTitle>
          <FolderShellDescription>{folder.meta}</FolderShellDescription>
        </FolderShell>
      ))}
    </div>
  )
}
