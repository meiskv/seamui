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

export default function AlertDialogSignout() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="ghost">Sign out</Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out of this device?</AlertDialogTitle>
          <AlertDialogDescription>
            You will need to sign in again to pick up where you left off.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel render={<Button variant="ghost">Cancel</Button>} />
          <AlertDialogAction
            render={<Button variant="secondary">Sign out</Button>}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
