import type { Metadata } from "next"

import { HapticsProvider } from "@/lib/haptics"

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
      <head>
        {/* Set the theme before paint to avoid a flash of the wrong colors. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {/* Site-wide haptics + click audio — every component demo gives the
            same tactile feedback as the landing page. */}
        <HapticsProvider>{children}</HapticsProvider>
      </body>
    </html>
  )
}
