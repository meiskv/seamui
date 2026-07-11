import { Button } from "@/registry/seam/ui/button"
import { Input } from "@/registry/seam/ui/input"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/registry/seam/ui/drawer"

export default function DrawerForm() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline">Add contact</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add contact</DrawerTitle>
          <DrawerDescription>
            Save a new contact to your address book.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="drawer-form-name" className="text-sm font-medium">
              Name
            </label>
            <Input id="drawer-form-name" placeholder="Ada Lovelace" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="drawer-form-email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="drawer-form-email"
              type="email"
              placeholder="ada@example.com"
            />
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="ghost">Cancel</Button>} />
          <DrawerClose render={<Button>Save</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
