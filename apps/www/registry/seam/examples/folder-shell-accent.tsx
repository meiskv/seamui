import type * as React from "react"

import {
  FolderShell,
  FolderShellDescription,
  FolderShellTitle,
} from "@/registry/seam/ui/folder-shell"

const FOLDERS = [
  {
    title: "Books",
    meta: "12 titles",
    footer: "Last added Sep 2, 2025",
    fill: "var(--color-green-600)",
  },
  {
    title: "Research",
    meta: "744 items",
    footer: "Last added Oct 13, 2025",
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
          footer={folder.footer}
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
