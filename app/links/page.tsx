"use client"

import { motion } from "framer-motion"
import { Smooth3DTime } from "@/components/smooth-3d-time"
import { FuturisticGrid } from "@/components/futuristic-grid"
import { CursorEffects } from "@/components/cursor-effects"
import { HolographicCard } from "@/components/holographic-card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Mail, Globe, Youtube, Instagram, FileText } from "lucide-react"

const links = [
  {
    id: 1,
    title: "GITHUB",
    url: "https://github.com/Temu-Lala/",
    icon: <Github className="h-5 w-5" />,
    color: "bg-gray-900 hover:bg-gray-800",
    glowColor: "0, 200, 255", // Cyan
  },
  {
    id: 2,
    title: "LINKEDIN",
    url: "https://t.me/TD_lala",
    icon: <Linkedin className="h-5 w-5" />,
    color: "bg-blue-700 hover:bg-blue-600",
    glowColor: "150, 100, 255", // Purple
  },
  {
    id: 3,
    title: "TWITTER",
    url: "https://github.com/Temu-Lala/",
    icon: <Twitter className="h-5 w-5" />,
    color: "bg-sky-500 hover:bg-sky-400",
    glowColor: "0, 200, 255", // Cyan
  },
  {
    id: 4,
    title: "PERSONAL SITE",
    url: "https://github.com/Temu-Lala/",
    icon: <Globe className="h-5 w-5" />,
    color: "bg-purple-700 hover:bg-purple-600",
    glowColor: "150, 100, 255", // Purple
  },
  {
    id: 5,
    title: "YOUTUBE",
    url: "https://github.com/Temu-Lala/",
    icon: <Youtube className="h-5 w-5" />,
    color: "bg-red-600 hover:bg-red-500",
    glowColor: "0, 200, 255", // Cyan
  },
  {
    id: 6,
    title: "INSTAGRAM",
    url: "https://t.me/TD_lala",
    icon: <Instagram className="h-5 w-5" />,
    color: "bg-pink-600 hover:bg-pink-500",
    glowColor: "150, 100, 255", // Purple
  },
  {
    id: 7,
    title: "EMAIL",
    url: "temesgendebebe1921@gmail.com",
    icon: <Mail className="h-5 w-5" />,
    color: "bg-green-600 hover:bg-green-500",
    glowColor: "0, 200, 255", // Cyan
  },
  {
    id: 8,
    title: "RESUME",
    url: "https://t.me/TD_lala",
    icon: <FileText className="h-5 w-5" />,
    color: "bg-amber-600 hover:bg-amber-500",
    glowColor: "150, 100, 255", // Purple
  },
]

export default function LinksPage() {
  return (
    <div className="relative min-h-screen pt-20 pb-10">
      <Smooth3DTime />
      <FuturisticGrid />
      <CursorEffects />

      <div className="container mx-auto px-4 z-10 relative max-w-2xl">
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-8 text-center text-cyan-300 font-mono"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          LINKS
        </motion.h1>

        <HolographicCard className="bg-black/40 backdrop-blur-md border border-cyan-900/50 p-6 rounded-xl">
          <div className="space-y-4">
            {links.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="w-full"
              >
                <HolographicCard
                  className={`w-full ${link.color} rounded-lg overflow-hidden`}
                  glowColor={link.glowColor}
                  depth={10}
                >
                  <Button
                    variant="default"
                    className="w-full justify-start text-white bg-transparent hover:bg-white/10"
                    asChild
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <span className="flex items-center">
                        <span className="mr-3">{link.icon}</span>
                        <span className="font-mono">{link.title}</span>
                      </span>
                    </a>
                  </Button>
                </HolographicCard>
              </motion.div>
            ))}
          </div>
        </HolographicCard>
      </div>
    </div>
  )
}

