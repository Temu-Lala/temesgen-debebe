"use client"

import type React from "react"
import { Geist_Mono as GeistMono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/components/language-provider"
import { useEffect } from "react"

const geistMono = GeistMono({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Preload ambient sound for better user experience
  useEffect(() => {
    const preloadAudio = new Audio("/assets/ambient.mp3")
    preloadAudio.preload = "auto"

    // Don't actually play it, just load it
    preloadAudio.load()

    return () => {
      preloadAudio.src = ""
    }
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add preload for audio */}
        <link rel="preload" href="/assets/ambient.mp3" as="audio" />
      </head>
      <body className={`${geistMono.className} bg-black text-white flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <LanguageProvider>
            <Navigation />
            <div className="flex-1 flex flex-col">{children}</div>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

