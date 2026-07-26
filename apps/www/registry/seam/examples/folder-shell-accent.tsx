import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/seam/ui/card"
import { FolderShell } from "@/registry/seam/ui/folder-shell"

const FOLDERS = [
  { title: "Work", meta: "56 documents", fill: "var(--color-violet-400)" },
  { title: "Books", meta: "12 titles", fill: "var(--color-green-500)" },
]

export default function FolderShellAccent() {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-6">
      {FOLDERS.map((folder) => (
        // one custom property colours the whole shell
        <FolderShell
          key={folder.title}
          style={{ ["--folder-fill" as string]: folder.fill }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{folder.title}</CardTitle>
              <CardDescription>{folder.meta}</CardDescription>
            </CardHeader>
          </Card>
        </FolderShell>
      ))}
    </div>
  )
}
