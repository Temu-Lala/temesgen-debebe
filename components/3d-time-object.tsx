"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion"

export function ThreeDTimeObject() {
  const [date, setDate] = useState(new Date())
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring physics for mouse movement
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  // Transform mouse position to rotation values
  const rotateX = useTransform(springY, [-300, 300], [15, -15])
  const rotateY = useTransform(springX, [-300, 300], [-15, 15])

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate distance from center
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Format time components
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  const seconds = date.getSeconds().toString().padStart(2, "0")
  const milliseconds = Math.floor(date.getMilliseconds() / 10)
    .toString()
    .padStart(2, "0")

  // Create digit arrays for flip animation
  const hourDigits = hours.split("")
  const minuteDigits = minutes.split("")
  const secondDigits = seconds.split("")

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center h-[40vh] w-full z-10 my-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transformPerspective: "1200px",
        }}
      >
        {/* 3D Time Container */}
        <motion.div
          className="relative flex items-center justify-center gap-4"
          initial={{ opacity: 0, z: -100 }}
          animate={{ opacity: 1, z: 0 }}
          transition={{ duration: 1 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Hours */}
          <TimeUnit digits={hourDigits} label="HOURS" />

          {/* Minutes */}
          <TimeUnit digits={minuteDigits} label="MINUTES" />

          {/* Seconds */}
          <TimeUnit digits={secondDigits} label="SECONDS" />

          {/* Milliseconds - smaller display */}
          <div className="relative flex flex-col items-center" style={{ transform: "translateZ(20px)" }}>
            <div className="text-xs text-cyan-400 mb-1 font-mono tracking-wider">MS</div>
            <div className="bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-md px-2 py-1 text-cyan-300 font-mono text-lg">
              {milliseconds}
            </div>
          </div>
        </motion.div>

        {/* Holographic projection effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(0, 200, 255, 0.1) 0%, transparent 70%)",
            boxShadow: "0 0 40px rgba(0, 200, 255, 0.2)",
            transform: "translateZ(-50px)",
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Scanning line effect */}
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ transform: "translateZ(30px)" }}
        >
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-cyan-400/50"
            animate={{
              top: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              boxShadow: "0 0 10px rgba(0, 200, 255, 0.8)",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

// Component for each time unit (hours, minutes, seconds)
function TimeUnit({ digits, label }: { digits: string[]; label: string }) {
  return (
    <div className="relative flex flex-col items-center">
      <div className="text-xs text-cyan-400 mb-1 font-mono tracking-wider">{label}</div>
      <div className="relative flex">
        {digits.map((digit, index) => (
          <motion.div
            key={`${label}-${index}`}
            className="relative w-12 h-20 mx-1"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Main digit display */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={digit}
                initial={{ opacity: 0, rotateX: -90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: 90 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-md text-cyan-300 font-mono text-4xl"
                style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
              >
                {digit}
              </motion.div>
            </AnimatePresence>

            {/* Reflection */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent rounded-md"
              style={{ transform: "translateZ(1px)" }}
            />

            {/* Glowing edges */}
            <div
              className="absolute inset-0 rounded-md"
              style={{
                boxShadow: "0 0 5px rgba(0, 200, 255, 0.5)",
                transform: "translateZ(2px)",
              }}
            />

            {/* Grid overlay */}
            <div
              className="absolute inset-0 rounded-md opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(0deg, rgba(0,200,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.1) 1px, transparent 1px)",
                backgroundSize: "5px 5px",
                transform: "translateZ(3px)",
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

