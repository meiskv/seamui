import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/seam/ui/card"
import { FolderShell } from "@/registry/seam/ui/folder-shell"

export default function FolderShellStacked() {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-6">
      <FolderShell layers={2}>
        <Card>
          <CardHeader>
            <CardTitle>Archive</CardTitle>
            <CardDescription>2 folders</CardDescription>
          </CardHeader>
        </Card>
      </FolderShell>

      {/* One custom property accents the whole stack — the layers tint
          themselves off it with color-mix. */}
      <FolderShell
        layers={3}
        className="[--folder-fill:var(--color-violet-400)]"
      >
        <Card>
          <CardHeader>
            <CardTitle>Research</CardTitle>
            <CardDescription>744 items</CardDescription>
          </CardHeader>
        </Card>
      </FolderShell>
    </div>
  )
}
