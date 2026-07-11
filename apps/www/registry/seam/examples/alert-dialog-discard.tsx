import { Button } from "@/registry/seam/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/seam/ui/alert-dialog"

export default function AlertDialogDiscard() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="outline">Discard changes</Button>}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Discard changes?</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved edits. If you leave now, they will be lost and
            cannot be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel render={<Button variant="ghost">Cancel</Button>} />
          <AlertDialogAction render={<Button>Discard</Button>} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
