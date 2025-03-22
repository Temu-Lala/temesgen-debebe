"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function ThreeDTimeDisplay() {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  const seconds = date.getSeconds().toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()

  return (
    <div className="w-full flex flex-col items-center justify-center my-8 perspective">
      {/* Time Display */}
      <motion.div
        className="flex space-x-2 md:space-x-4 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Hours */}
        <motion.div
          className="relative text-5xl md:text-7xl lg:text-9xl font-bold text-blue-300"
          style={{
            textShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateX: [0, 5, 0],
            rotateY: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          {hours}
        </motion.div>

        {/* Separator */}
        <motion.div
          className="text-5xl md:text-7xl lg:text-9xl font-bold text-blue-400"
          animate={{
            opacity: [1, 0.3, 1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          :
        </motion.div>

        {/* Minutes */}
        <motion.div
          className="relative text-5xl md:text-7xl lg:text-9xl font-bold text-blue-300"
          style={{
            textShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateX: [0, -5, 0],
            rotateY: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 0.5,
          }}
        >
          {minutes}
        </motion.div>

        {/* Separator */}
        <motion.div
          className="text-5xl md:text-7xl lg:text-9xl font-bold text-blue-400"
          animate={{
            opacity: [1, 0.3, 1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          :
        </motion.div>

        {/* Seconds */}
        <motion.div
          className="relative text-5xl md:text-7xl lg:text-9xl font-bold text-blue-300"
          style={{
            textShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateX: [0, 5, 0],
            rotateY: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        >
          {seconds}
        </motion.div>
      </motion.div>

      {/* Date Display */}
      <motion.div
        className="flex space-x-2 text-2xl md:text-3xl text-blue-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          textShadow: "0 0 5px rgba(59, 130, 246, 0.3)",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.span
          animate={{
            rotateY: [0, 10, 0],
            z: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          {day}
        </motion.span>
        <span>/</span>
        <motion.span
          animate={{
            rotateY: [0, -10, 0],
            z: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 0.5,
          }}
        >
          {month}
        </motion.span>
        <span>/</span>
        <motion.span
          animate={{
            rotateY: [0, 10, 0],
            z: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        >
          {year}
        </motion.span>
      </motion.div>
    </div>
  )
}

