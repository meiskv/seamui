import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/seam/ui/tabs"

export default function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-80">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsContent
        value="account"
        className="text-muted-foreground pt-2 text-sm"
      >
        Manage your account. The indicator springs between tabs.
      </TabsContent>
      <TabsContent
        value="password"
        className="text-muted-foreground pt-2 text-sm"
      >
        Change your password here.
      </TabsContent>
      <TabsContent value="team" className="text-muted-foreground pt-2 text-sm">
        Invite and manage your team.
      </TabsContent>
    </Tabs>
  )
}
