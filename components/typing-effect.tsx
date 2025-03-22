"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypingEffectProps {
  text: string
  speed?: number
  delay?: number
  className?: string
}

export function TypingEffect({ text, speed = 50, delay = 0, className = "" }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // Initial delay before starting to type
    const initialDelay = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    if (isTyping && currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)
    }

    return () => {
      clearTimeout(initialDelay)
      clearTimeout(timeout)
    }
  }, [text, speed, delay, currentIndex, isTyping])

  return (
    <motion.div
      className={`font-mono ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayedText}
      {isTyping && currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
          className="inline-block w-2 h-4 bg-cyan-400 ml-1"
        />
      )}
    </motion.div>
  )
}

