import { Button } from "@/registry/seam/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/seam/ui/dropdown-menu"

export default function DropdownMenuNested() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline">Move to</Button>}
      />
      <DropdownMenuContent>
        <DropdownMenuLabel>Workspace</DropdownMenuLabel>
        <DropdownMenuItem>Inbox</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Projects</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Backlog</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Design system</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Tokens</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Components</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Nested dropdown menu</DropdownMenuItem>
                    <DropdownMenuItem>Popover</DropdownMenuItem>
                    <DropdownMenuItem>Tooltip</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem>Icons</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem>Marketing site</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Archive</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
