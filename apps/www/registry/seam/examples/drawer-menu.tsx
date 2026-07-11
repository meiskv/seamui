import { Copy, Star, Code, Flag } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/registry/seam/ui/drawer"

export default function DrawerMenu() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline">Share</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Share</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-1">
          <DrawerClose
            render={
              <Button variant="ghost" className="w-full justify-start">
                <Copy />
                Copy link
              </Button>
            }
          />
          <DrawerClose
            render={
              <Button variant="ghost" className="w-full justify-start">
                <Star />
                Add to favorites
              </Button>
            }
          />
          <DrawerClose
            render={
              <Button variant="ghost" className="w-full justify-start">
                <Code />
                Embed
              </Button>
            }
          />
          <DrawerClose
            render={
              <Button variant="ghost" className="w-full justify-start">
                <Flag />
                Report
              </Button>
            }
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
