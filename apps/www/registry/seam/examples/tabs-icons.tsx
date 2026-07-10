import { Bell, CreditCard, User } from "lucide-react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/seam/ui/tabs"

export default function TabsIcons() {
  return (
    <Tabs defaultValue="profile" className="w-80">
      <TabsList>
        <TabsTrigger value="profile">
          <User />
          Profile
        </TabsTrigger>
        <TabsTrigger value="billing">
          <CreditCard />
          Billing
        </TabsTrigger>
        <TabsTrigger value="alerts">
          <Bell />
          Alerts
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="text-muted-foreground pt-2 text-sm">
        Your public profile.
      </TabsContent>
      <TabsContent value="billing" className="text-muted-foreground pt-2 text-sm">
        Manage billing and invoices.
      </TabsContent>
      <TabsContent value="alerts" className="text-muted-foreground pt-2 text-sm">
        Notification preferences.
      </TabsContent>
    </Tabs>
  )
}
