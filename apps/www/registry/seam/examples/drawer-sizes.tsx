import { Button } from "@/registry/seam/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/seam/ui/drawer"

const SIZES = [
  { size: "sm" as const, label: "Small" },
  { size: "default" as const, label: "Default" },
  { size: "lg" as const, label: "Large" },
]

export default function DrawerSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {SIZES.map(({ size, label }) => (
        <Drawer key={size}>
          <DrawerTrigger render={<Button variant="outline">{label}</Button>} />
          <DrawerContent size={size}>
            <DrawerHeader>
              <DrawerTitle>{label} sheet</DrawerTitle>
              <DrawerDescription>
                Size caps the width once the viewport outgrows it — on a phone
                every sheet is full-bleed, and the height stays content-driven.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose render={<Button>Done</Button>} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  )
}
