"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"

export function ThreeDTimeBackground() {
  const [date, setDate] = useState(new Date())
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring physics for mouse movement
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // Transform mouse position to rotation values
  const rotateX = useTransform(springY, [-500, 500], [10, -10])
  const rotateY = useTransform(springX, [-500, 500], [-10, 10])
  const translateZ = useTransform(springX, [-500, 0, 500], [-20, 0, -20])

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

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1500px" }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black" />

      {/* 3D Time Container */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          rotateX,
          rotateY,
          z: translateZ,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Giant 3D time display */}
        <motion.div
          className="relative flex items-center justify-center gap-8 opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Hours */}
          <TimeDigit digit={hours[0]} depth={-100} />
          <TimeDigit digit={hours[1]} depth={-80} />

          {/* Separator */}
          <motion.div
            className="text-[20vw] font-bold text-cyan-400 mx-[-2vw]"
            style={{
              textShadow: "0 0 20px rgba(0, 200, 255, 0.8)",
              transform: "translateZ(-90px)",
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            :
          </motion.div>

          {/* Minutes */}
          <TimeDigit digit={minutes[0]} depth={-120} />
          <TimeDigit digit={minutes[1]} depth={-140} />

          {/* Separator */}
          <motion.div
            className="text-[20vw] font-bold text-cyan-400 mx-[-2vw]"
            style={{
              textShadow: "0 0 20px rgba(0, 200, 255, 0.8)",
              transform: "translateZ(-130px)",
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 0.5,
            }}
          >
            :
          </motion.div>

          {/* Seconds */}
          <TimeDigit digit={seconds[0]} depth={-160} />
          <TimeDigit digit={seconds[1]} depth={-180} />
        </motion.div>

        {/* Holographic grid overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(0,200,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            transform: "translateZ(-50px) rotateX(80deg)",
            transformOrigin: "center bottom",
          }}
        />

        {/* Scanning line effect */}
        <motion.div className="absolute inset-0 overflow-hidden" style={{ transform: "translateZ(-40px)" }}>
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-cyan-400/20"
            animate={{
              top: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              boxShadow: "0 0 10px rgba(0, 200, 255, 0.8), 0 0 20px rgba(0, 200, 255, 0.4)",
            }}
          />
        </motion.div>

        {/* Holographic projection circles */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: "radial-gradient(circle at center, rgba(0, 200, 255, 0.2) 0%, transparent 70%)",
            transform: "translateZ(-30px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </motion.div>
    </div>
  )
}

// Component for each time digit
function TimeDigit({ digit, depth }: { digit: string; depth: number }) {
  return (
    <motion.div className="relative" style={{ transformStyle: "preserve-3d" }}>
      <motion.div
        className="text-[20vw] font-bold text-cyan-400"
        style={{
          textShadow: "0 0 20px rgba(0, 200, 255, 0.8)",
          transform: `translateZ(${depth}px)`,
        }}
        key={digit}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.8, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {digit}
      </motion.div>

      {/* Reflection */}
      <motion.div
        className="absolute inset-0 text-[20vw] font-bold text-cyan-400/30"
        style={{
          transform: `translateZ(${depth - 5}px) rotateX(180deg) translateY(-5%)`,
          transformOrigin: "center bottom",
          filter: "blur(2px)",
        }}
      >
        {digit}
      </motion.div>

      {/* Holographic glitch effect */}
      <motion.div
        className="absolute inset-0 text-[20vw] font-bold text-red-400/10 hidden sm:block"
        style={{
          transform: `translateZ(${depth}px) translateX(5px)`,
        }}
        animate={{
          opacity: [0, 0.5, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          repeatDelay: Math.random() * 5 + 5,
        }}
      >
        {digit}
      </motion.div>

      <motion.div
        className="absolute inset-0 text-[20vw] font-bold text-blue-400/10 hidden sm:block"
        style={{
          transform: `translateZ(${depth}px) translateX(-5px)`,
        }}
        animate={{
          opacity: [0, 0.5, 0],
          x: [0, -5, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          repeatDelay: Math.random() * 5 + 5,
        }}
      >
        {digit}
      </motion.div>
    </motion.div>
  )
}

