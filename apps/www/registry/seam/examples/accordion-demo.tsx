import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/seam/ui/accordion"

export default function AccordionDemo() {
  return (
    <Accordion defaultValue={["item-1"]} className="w-80">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Yes. It follows WAI-ARIA and is fully keyboard operable.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          The panel height eases between 0 and its measured size.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
