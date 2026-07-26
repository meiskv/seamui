import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/seam/ui/card"
import { FolderShell } from "@/registry/seam/ui/folder-shell"

export default function FolderShellDemo() {
  return (
    <FolderShell className="w-full max-w-xs">
      <Card>
        <CardHeader>
          <CardTitle>Work</CardTitle>
          <CardDescription>56 documents</CardDescription>
        </CardHeader>
      </Card>
    </FolderShell>
  )
}
