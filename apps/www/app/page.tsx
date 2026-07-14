import Link from "next/link"
import { Bot, HelpCircle, ListTodo } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"
import { Switch } from "@/registry/seam/ui/switch"
import { Checkbox } from "@/registry/seam/ui/checkbox"
import { MediaToggle } from "@/registry/seam/ui/media-toggle"
import { AgentStatus } from "@/registry/seam/ui/agent-status"
import { BranchChip } from "@/registry/seam/ui/branch-chip"
import { ModeOption, ModeSelector } from "@/registry/seam/ui/mode-selector"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/seam/ui/popover"
import { CopyButton } from "@/components/site/copy-button"
import { Fig } from "@/components/site/fig"
import { SeamMark } from "@/components/site/logo"
import { ReducedMotionNotice } from "@/components/site/reduced-motion-notice"
import { FigPresence } from "@/components/site/fig-presence"
import { ThemeToggle } from "@/components/site/theme-toggle"

export default function HomePage() {
  return (
    <>
      <header className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <SeamMark className="size-5" />
          seamui<span className="text-primary">.</span>
        </Link>
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
        {/* Tell Reduce-Motion visitors why the specimens fade instead of spring. */}
        <ReducedMotionNotice />

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
            motion.dev feel layer — springs, touch feedback, depth.
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
          className="grid gap-4 sm:grid-cols-2"
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

          <Fig
            n="04"
            label="The condense"
            desc="Overlays rise out of their trigger and fall back on dismiss — one motion, both directions, backdrop in sync."
            prop="condense.surface"
            href="/docs/motion"
          >
            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>
                Open overlay
              </PopoverTrigger>
              <PopoverContent className="w-52">
                <p className="text-sm">
                  Overlay depth — dismiss me and I fall back where I came from.
                </p>
              </PopoverContent>
            </Popover>
          </Fig>
        </section>

        {/* install — one command to set up, then add anything */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight">
            Start in one command.
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl text-pretty">
            <code className="text-foreground">init</code> scaffolds — or wires
            up — your app: the theme tokens, the depth shadows, and the
            foundation. Then add any component. Next.js, Vite, or Remix;
            Tailwind v4.
          </p>
          <div className="mt-6 border-t">
            <InstallRow
              label="setup"
              cmd="bunx --bun @seamui/cli@latest init"
            />
            <InstallRow
              label="add"
              cmd="bunx --bun @seamui/cli@latest add button"
            />
          </div>
          <p className="text-muted-foreground mt-6 text-sm">
            Prefer no extra CLI? Every component installs straight from the
            registry — the shadcn CLI or the raw URL:
          </p>
          <div className="mt-4 border-t">
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
          <div className="flex items-center gap-1">
            <a
              href="https://linkedin.com/in/miksvillamor/"
              className="hover:text-foreground hover:bg-secondary hover:shadow-resting squircle inline-flex size-8 items-center justify-center rounded-lg transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="size-4"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>
            <a
              href="https://github.com/meiskv/"
              className="hover:text-foreground hover:bg-secondary hover:shadow-resting squircle inline-flex size-8 items-center justify-center rounded-lg transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="size-4"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
        </footer>
      </main>
    </>
  )
}

function InstallRow({ label, cmd }: { label: string; cmd: string }) {
  return (
    <div className="grid grid-cols-[5rem_1fr_auto] items-center gap-3 border-b py-2.5 sm:grid-cols-[8rem_1fr_auto]">
      <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
        {label}
      </span>
      <code className="min-w-0 overflow-x-auto font-mono text-sm whitespace-nowrap">
        <span aria-hidden className="text-primary">
          ${" "}
        </span>
        {cmd}
      </code>
      <CopyButton text={cmd} />
    </div>
  )
}
