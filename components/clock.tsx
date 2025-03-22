"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Clock() {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })
  }

  const formatYear = (date: Date) => {
    return date.getFullYear().toString()
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <motion.div
        className="text-4xl md:text-5xl font-bold text-blue-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={formatTime(date)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {formatTime(date)}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="text-xl text-blue-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {formatDate(date)}
      </motion.div>

      <motion.div
        className="text-lg text-blue-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {formatYear(date)}
      </motion.div>
    </div>
  )
}

