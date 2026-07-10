import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/seam/ui/accordion"

export default function AccordionDisabled() {
  return (
    <Accordion defaultValue={["item-1"]} className="w-80">
      <AccordionItem value="item-1">
        <AccordionTrigger>Available section</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          This one opens and closes normally.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled section</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          You won&apos;t reach this — the trigger is disabled.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
