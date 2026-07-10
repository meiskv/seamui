import { Button } from "@/registry/seam/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/seam/ui/dropdown-menu"

export default function DropdownMenuSubmenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">Actions</Button>} />
      <DropdownMenuContent className="w-44">
        <DropdownMenuItem>New tab</DropdownMenuItem>
        <DropdownMenuItem>New window</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Email link</DropdownMenuItem>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
            <DropdownMenuItem>Message</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Print…</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
