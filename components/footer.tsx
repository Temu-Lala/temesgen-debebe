"use client"

import { motion } from "framer-motion"
import { Heart, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <motion.footer
      className="relative z-10 border-t border-cyan-900/30 bg-black/80 backdrop-blur-md py-6 mt-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-cyan-400 text-sm font-mono">
              © {new Date().getFullYear()} TEMESGEN DEBEBE • ALL SYSTEMS OPERATIONAL
            </p>
            <p className="text-cyan-600 text-xs mt-1 font-mono">
              POWERED BY TEMESGEN DEBEBE USING NEXT.JS WIT FRAMER MOTIONS <Heart className="inline-block h-3 w-3 text-cyan-500 mx-1" /> v2.8.0
            </p>
          </div>

          <div className="flex space-x-6">
            <motion.a href="#" className="text-cyan-400 hover:text-cyan-300 text-sm font-mono" whileHover={{ y: -2 }}>
              PRIVACY
            </motion.a>
            <motion.a href="#" className="text-cyan-400 hover:text-cyan-300 text-sm font-mono" whileHover={{ y: -2 }}>
              TERMS
            </motion.a>
            <motion.a href="/contact" className="text-cyan-400 hover:text-cyan-300 text-sm font-mono" whileHover={{ y: -2 }}>
              CONTACT
            </motion.a>
          </div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              className="rounded-full border-cyan-800 text-cyan-400 hover:bg-cyan-900/20 hover:text-cyan-300"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
}

