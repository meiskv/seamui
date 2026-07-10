import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/seam/ui/accordion"

// multiple={false} — opening one item closes the others.
export default function AccordionSingle() {
  return (
    <Accordion multiple={false} defaultValue={["item-1"]} className="w-80">
      <AccordionItem value="item-1">
        <AccordionTrigger>What are springs?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Physics-based motion that reacts to velocity, not a fixed clock.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What is depth?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          A virtual z-axis: presses recede, overlays rise.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What is touch feedback?</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">
          Every control reacts to press within a frame and settles springy.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
