import { LogOut, Settings, User } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/registry/seam/ui/dropdown-menu"

export default function DropdownMenuShortcuts() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">My Account</Button>} />
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>Signed in as m@example.com</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User />
          Profile
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings />
          Settings
          <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive [&_svg]:text-destructive">
          <LogOut />
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
