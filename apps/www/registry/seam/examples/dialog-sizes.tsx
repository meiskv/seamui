import { Button } from "@/registry/seam/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/seam/ui/dialog"

const SIZES = [
  {
    size: "sm" as const,
    label: "Small",
    body: "A confirm, and not much else.",
  },
  {
    size: "default" as const,
    label: "Default",
    body: "The everyday modal — a form, a set of choices.",
  },
  {
    size: "lg" as const,
    label: "Large",
    body: "Room for a table, a diff, or a two-column layout.",
  },
]

export default function DialogSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {SIZES.map(({ size, label, body }) => (
        <Dialog key={size}>
          <DialogTrigger render={<Button variant="outline">{label}</Button>} />
          <DialogContent size={size}>
            <DialogHeader>
              <DialogTitle>{label} dialog</DialogTitle>
              <DialogDescription>{body}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="ghost">Cancel</Button>} />
              <DialogClose render={<Button>Save</Button>} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
