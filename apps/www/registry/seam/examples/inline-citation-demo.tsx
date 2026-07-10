import { InlineCitation } from "@/registry/seam/ui/sources"

// Hover or focus a citation to preview its source at overlay depth.
export default function InlineCitationDemo() {
  return (
    <div className="w-full max-w-md">
      <p className="text-sm leading-relaxed">
        Springs carry velocity, so an interrupted animation redirects smoothly
        <InlineCitation
          index={1}
          title="motion.dev — Springs"
          href="https://motion.dev/docs/react-transitions"
        />
        , while durations run a fixed clock you have to fight
        <InlineCitation
          index={2}
          title="seamui — CLAUDE.md"
          href="https://seamui.dev/docs"
        />
        . That is why every transform in seamui is a spring.
      </p>
    </div>
  )
}
