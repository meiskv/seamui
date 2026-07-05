import type { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: "seamui",
  description:
    "Beautifully animated components you own — shadcn's model on Base UI, with motion.dev depth animation.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
