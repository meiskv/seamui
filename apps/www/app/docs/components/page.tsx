import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Components — seamui",
}

const COMPONENTS = [
  { name: "button", title: "Button", desc: "Pressable action with depth motion." },
  { name: "toggle", title: "Toggle", desc: "Two-state button." },
  { name: "input", title: "Input", desc: "Field-aware text input." },
  { name: "avatar", title: "Avatar", desc: "Image with fade-in and fallback." },
  { name: "separator", title: "Separator", desc: "Divider in any orientation." },
  { name: "switch", title: "Switch", desc: "Thumb springs between states." },
  { name: "checkbox", title: "Checkbox", desc: "Mark pops in with a spring." },
  { name: "radio-group", title: "Radio Group", desc: "Single-choice with spring dot." },
  { name: "slider", title: "Slider", desc: "Thumb swells when grabbed." },
]

export default function ComponentsIndex() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Components</h1>
      <p className="text-muted-foreground mt-2 text-lg">
        Beautifully animated components you own — Base UI primitives with a
        motion.dev depth layer.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {COMPONENTS.map((c) => (
          <li key={c.name}>
            <Link
              href={`/docs/components/${c.name}`}
              className="bg-card hover:shadow-raised block rounded-xl border p-4 shadow-resting"
            >
              <div className="font-medium">{c.title}</div>
              <div className="text-muted-foreground mt-1 text-sm">{c.desc}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
