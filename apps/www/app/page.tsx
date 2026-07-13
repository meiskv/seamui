import Link from "next/link"
import { Bot, HelpCircle, ListTodo } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import { Switch } from "@/registry/seam/ui/switch"
import { Checkbox } from "@/registry/seam/ui/checkbox"
import { MediaToggle } from "@/registry/seam/ui/media-toggle"
import { AgentStatus } from "@/registry/seam/ui/agent-status"
import { BranchChip } from "@/registry/seam/ui/branch-chip"
import { ModeOption, ModeSelector } from "@/registry/seam/ui/mode-selector"
import { Fig } from "@/components/site/fig"
import { FigPresence } from "@/components/site/fig-presence"
import { ThemeToggle } from "@/components/site/theme-toggle"

export default function HomePage() {
  return (
    <>
      <header className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <span className="text-sm font-semibold tracking-tight">
          seamui<span className="text-primary">.</span>
        </span>
        <nav className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            render={<Link href="/docs/components" />}
          >
            Docs
          </Button>
          <Button
            variant="ghost"
            size="sm"
            render={<Link href="/docs/guides/chat" />}
          >
            Guides
          </Button>
          <ThemeToggle />
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-20">
        {/* hero */}
        <section className="py-16 sm:py-20">
          <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
            {"//"} components you own
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            UI that feels physical.
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl text-lg text-pretty">
            shadcn&apos;s distribution model, rebuilt on Base UI with a
            motion.dev feel layer — springs, touch feedback, depth. The code
            lands in your repo; edit it like you wrote it.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button render={<Link href="/docs/components" />}>
              Browse components
            </Button>
            <Button
              variant="secondary"
              render={<Link href="/docs/guides/chat" />}
            >
              Building a chat app →
            </Button>
          </div>
        </section>

        {/* specimens — every one is live; press them */}
        <section
          aria-label="Live specimens"
          className="grid gap-4 md:grid-cols-3"
        >
          <Fig
            n="01"
            label="Touch feedback"
            desc="Every control recedes into the surface on press and springs back — with a haptic click on devices that can."
            prop={'whileTap = depth.pressed · haptic = "tap"'}
            href="/docs/components/button"
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="secondary">Press me</Button>
              <Switch defaultChecked aria-label="Demo switch" />
              <Checkbox defaultChecked aria-label="Demo checkbox" />
              <MediaToggle kind="mic" defaultPressed />
            </div>
          </Fig>

          <Fig
            n="02"
            label="Agent presence"
            desc="State-driven motion for voice agents — dots that breathe with the audio level and never go dead."
            prop={'state = "listening" · level = 0.42'}
            href="/docs/components/voice-visualizer"
          >
            <FigPresence />
          </Fig>

          <Fig
            n="03"
            label="Built for agents"
            desc="A whole workbench tier — status, git, mode — in the same springs, depth, and squircle language you own."
            prop={'status = "working" · pr.state = "open"'}
            href="/docs/components/agent-status"
          >
            <div className="flex flex-col items-center gap-3">
              <AgentStatus status="working" />
              <ModeSelector defaultValue={["agent"]}>
                <ModeOption value="agent" aria-label="Agent mode">
                  <Bot className="size-3.5" /> Agent
                </ModeOption>
                <ModeOption value="plan" aria-label="Plan mode">
                  <ListTodo className="size-3.5" /> Plan
                </ModeOption>
                <ModeOption value="ask" aria-label="Ask mode">
                  <HelpCircle className="size-3.5" /> Ask
                </ModeOption>
              </ModeSelector>
              <BranchChip
                branch="feat/agent-status"
                ahead={2}
                pr={{ number: 69, state: "open" }}
              />
            </div>
          </Fig>
        </section>

        {/* install — wherever your stack lives */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight">
            Wherever your stack lives.
          </h2>
          <div className="mt-6 border-t">
            <InstallRow
              label="seamui"
              cmd="bunx --bun @seamui/cli@latest add button"
            />
            <InstallRow
              label="shadcn"
              cmd="bunx --bun shadcn@latest add @seamui/button"
            />
            <InstallRow
              label="registry"
              cmd="https://seamui.dev/r/button.json"
            />
          </div>
          <p className="text-muted-foreground mt-5 text-sm">
            Then open{" "}
            <code className="text-foreground">components/ui/button.tsx</code> —
            it&apos;s yours. Retune every spring from one line in{" "}
            <Link className="underline underline-offset-4" href="/docs/motion">
              lib/motion.ts
            </Link>
            ; give it all a click and a buzz with{" "}
            <Link className="underline underline-offset-4" href="/docs/haptics">
              one provider
            </Link>
            .
          </p>
        </section>

        {/* footer */}
        <footer className="text-muted-foreground mt-20 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-sm">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link className="hover:text-foreground" href="/docs/guides/chat">
              Guides
            </Link>
            <Link className="hover:text-foreground" href="/docs/motion">
              Motion
            </Link>
            <Link className="hover:text-foreground" href="/docs/haptics">
              Haptics
            </Link>
            <a
              className="hover:text-foreground"
              href="https://github.com/meiskv/seamui"
            >
              GitHub
            </a>
          </div>
          <p className="font-mono text-xs">
            <span className="bg-secondary text-secondary-foreground shadow-resting squircle mr-2 inline-flex rounded px-1.5 py-0.5 text-[0.625rem] font-semibold tracking-wide uppercase">
              WIP
            </span>
            Expo / React Native port — the seam feel with on-device haptics
          </p>
        </footer>
      </main>
    </>
  )
}

function InstallRow({ label, cmd }: { label: string; cmd: string }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b py-3.5 sm:grid-cols-[8rem_1fr]">
      <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
        {label}
      </span>
      <code className="overflow-x-auto font-mono text-sm whitespace-nowrap">
        <span aria-hidden className="text-primary">
          ${" "}
        </span>
        {cmd}
      </code>
    </div>
  )
}
