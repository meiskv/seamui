import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/seam/ui/tabs"

export default function TabsSmall() {
  return (
    <Tabs defaultValue="preview" size="sm" className="w-72">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="text-muted-foreground pt-2 text-sm">
        A compact tab set — the well and keys shrink with size=&quot;sm&quot;.
      </TabsContent>
      <TabsContent value="code" className="text-muted-foreground pt-2 text-sm">
        Same spring indicator, tighter footprint.
      </TabsContent>
    </Tabs>
  )
}
