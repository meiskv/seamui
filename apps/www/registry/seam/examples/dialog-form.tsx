import { Button } from "@/registry/seam/ui/button"
import { Input } from "@/registry/seam/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/registry/seam/ui/dialog"

export default function DialogForm() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Edit profile</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your details. The surface rises to the top of the stack; the
            page dims behind it.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="dialog-form-name" className="text-sm font-medium">
              Name
            </label>
            <Input id="dialog-form-name" defaultValue="Ada Lovelace" />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="dialog-form-username"
              className="text-sm font-medium"
            >
              Username
            </label>
            <Input id="dialog-form-username" defaultValue="@ada" />
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost">Cancel</Button>} />
            <DialogClose render={<Button type="submit">Save</Button>} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
