import { BellRing } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/seam/ui/card"
import { Switch } from "@/registry/seam/ui/switch"

export default function CardNotification() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BellRing className="size-4" />
          Notifications
        </CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <label className="flex items-center justify-between text-sm">
          Push notifications
          <Switch defaultChecked />
        </label>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Mark all as read</Button>
      </CardFooter>
    </Card>
  )
}
