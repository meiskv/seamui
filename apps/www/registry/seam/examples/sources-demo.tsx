import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/registry/seam/ui/sources"

const SOURCES = [
  {
    title: "Base UI — Collapsible",
    href: "https://base-ui.com/react/components/collapsible",
  },
  {
    title: "motion.dev — Springs",
    href: "https://motion.dev/docs/react-transitions",
  },
  {
    title: "Tailwind CSS v4",
    href: "https://tailwindcss.com/blog/tailwindcss-v4",
  },
]

export default function SourcesDemo() {
  return (
    <div className="w-full max-w-md">
      <Sources>
        <SourcesTrigger count={SOURCES.length} />
        <SourcesContent>
          {SOURCES.map((s, i) => (
            <Source key={s.href} href={s.href} title={s.title} index={i + 1} />
          ))}
        </SourcesContent>
      </Sources>
    </div>
  )
}
