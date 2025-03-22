"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"

interface HolographicCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  depth?: number
}

export function HolographicCard({
  children,
  className = "",
  glowColor = "0, 200, 255",
  depth = 20,
}: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse position relative to card
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  // Smooth spring physics for rotation
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  // Transform mouse position to rotation values (limited range)
  const rotateY = useTransform(springX, [0, 1], [5, -5])
  const rotateX = useTransform(springY, [0, 1], [-5, 5])

  // Transform for parallax elements inside card
  const translateX = useTransform(springX, [0, 1], [depth / 3, -depth / 3])
  const translateY = useTransform(springY, [0, 1], [depth / 3, -depth / 3])

  // Gradient position for holographic effect
  const gradientX = useTransform(springX, [0, 1], [0, 100])
  const gradientY = useTransform(springY, [0, 1], [0, 100])

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    mouseX.set(x)
    mouseY.set(y)
  }

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
        transformPerspective: "1000px",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Holographic overlay */}
      <motion.div
        className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
        style={{
          background: `linear-gradient(${gradientX}deg, rgba(${glowColor}, 0.5) 0%, rgba(255, 255, 255, 0.2) 25%, rgba(${glowColor}, 0.1) 50%, rgba(255, 255, 255, 0.2) 75%, rgba(${glowColor}, 0.5) 100%)`,
        }}
      />

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.05) 50%)",
          backgroundSize: "100% 4px",
          opacity: 0.2,
        }}
      />

      {/* Edge glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 20px rgba(${glowColor}, 0.3)`,
        }}
      />

      {/* Content with parallax effect */}
      <motion.div
        className="relative"
        style={{
          translateX,
          translateY,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>

      {/* Glitch effect (random) */}
      <motion.div
        className="absolute inset-0 bg-cyan-400/10 pointer-events-none"
        animate={{
          opacity: [0, 0.1, 0],
          x: [0, 2, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          repeatDelay: Math.random() * 5 + 5,
        }}
      />
    </motion.div>
  )
}

