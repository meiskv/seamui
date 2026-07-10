"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { springs, fades, depth, reduced } from "@/lib/motion"
import { Button } from "./button"

type StickToBottom = {
  scrollRef: React.RefObject<HTMLDivElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
  isAtBottom: boolean
  scrollToBottom: (behavior?: ScrollBehavior) => void
}

const ConversationContext = React.createContext<StickToBottom | null>(null)

function useConversation() {
  const ctx = React.useContext(ConversationContext)
  if (!ctx) {
    throw new Error("Conversation parts must be used within <Conversation>.")
  }
  return ctx
}

// Owned stick-to-bottom: the viewport follows new content while the user is at
// the bottom, releases the moment they scroll up, and re-arms when they return.
// No dependency — you own this code.
function useStickToBottom(threshold = 24): StickToBottom {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const stuckRef = React.useRef(true)
  const [isAtBottom, setIsAtBottom] = React.useState(true)
  const reduceMotion = useReducedMotion()

  const scrollToBottom = React.useCallback(
    (behavior?: ScrollBehavior) => {
      const el = scrollRef.current
      if (!el) return
      el.scrollTo({
        top: el.scrollHeight,
        // Explicit jumps are smooth; reduced motion never animates position.
        behavior: behavior ?? (reduceMotion ? "auto" : "smooth"),
      })
    },
    [reduceMotion]
  )

  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const atBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight <= threshold
      stuckRef.current = atBottom
      setIsAtBottom(atBottom)
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => el.removeEventListener("scroll", onScroll)
  }, [threshold])

  React.useEffect(() => {
    const el = scrollRef.current
    const content = contentRef.current
    if (!el || !content) return
    // While stuck, pin to bottom instantly as content grows — an animated
    // follow would lag behind streamed tokens and read as jank.
    const obs = new ResizeObserver(() => {
      if (stuckRef.current) el.scrollTop = el.scrollHeight
    })
    obs.observe(content)
    return () => obs.disconnect()
  }, [])

  return { scrollRef, contentRef, isAtBottom, scrollToBottom }
}

function Conversation({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const stick = useStickToBottom()

  return (
    <ConversationContext.Provider value={stick}>
      <div
        data-slot="conversation"
        className={cn("relative flex min-h-0 flex-1 flex-col", className)}
        {...props}
      >
        <div
          ref={stick.scrollRef}
          data-slot="conversation-viewport"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          tabIndex={0}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain outline-none"
        >
          {children}
        </div>
      </div>
    </ConversationContext.Provider>
  )
}

function ConversationContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { contentRef } = useConversation()
  return (
    <div
      ref={contentRef}
      data-slot="conversation-content"
      className={cn("mx-auto flex w-full max-w-2xl flex-col gap-1 p-4", className)}
      {...props}
    />
  )
}

// Floating "jump to latest" key — an embossed control rising at overlay depth,
// shown only when the viewport is released from the bottom.
function ConversationScrollButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { isAtBottom, scrollToBottom } = useConversation()
  const reduceMotion = useReducedMotion()

  return (
    // Center horizontally with flex so motion's transform (y + scale) doesn't
    // fight a Tailwind translate on the animated element.
    <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center">
      <AnimatePresence>
        {!isAtBottom && (
          <motion.div
            data-slot="conversation-scroll-button"
            className="pointer-events-auto"
            initial={
              reduceMotion ? reduced.fadeIn.initial : depth.overlay.initial
            }
            animate={depth.overlay.animate}
            exit={reduceMotion ? reduced.fadeIn.exit : depth.overlay.exit}
            transition={reduceMotion ? fades.normal : springs.surface}
          >
            <Button
              variant="secondary"
              size="icon"
              className={cn("rounded-full shadow-overlay", className)}
              onClick={() => scrollToBottom()}
              aria-label="Scroll to latest"
              {...props}
            >
              <ArrowDown />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
  useConversation,
}
