"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/registry/seam/ui/button"

export function ThemeToggle() {
  const [dark, setDark] = React.useState(false)

  React.useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggle() {
    const next = !document.documentElement.classList.contains("dark")
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {}
    setDark(next)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle theme"
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  )
}
