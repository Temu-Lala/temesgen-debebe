"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"

export function GalaxyBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<any[]>([])
  const dustParticlesRef = useRef<any[]>([])
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring physics for mouse movement
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // Galaxy parameters
  const galaxyRadius = 0.4 // Radius of the galaxy (normalized)
  const galaxyRotationSpeed = 0.00002 // Speed of rotation

  // Galaxy center position with parallax effect
  const galaxyCenterX = useTransform(springX, [-dimensions.width / 2, dimensions.width / 2], [0.45, 0.55])

  const galaxyCenterY = useTransform(springY, [-dimensions.height / 2, dimensions.height / 2], [0.45, 0.55])

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

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  useEffect(() => {
    const generateStars = () => {
      if (!containerRef.current || !canvasRef.current) return

      const { width, height } = containerRef.current.getBoundingClientRect()
      canvasRef.current.width = width
      canvasRef.current.height = height

      const centerX = width * 0.5
      const centerY = height * 0.5
      const maxRadius = Math.min(width, height) * galaxyRadius

      // Generate stars with spiral pattern
      const starCount = Math.floor((width * height) / 500) // Adjust density
      starsRef.current = Array.from({ length: starCount }).map(() => {
        // Use polar coordinates for spiral galaxy
        const armCount = 5 // Number of spiral arms
        const armOffset = Math.random() * Math.PI * 2
        const distance = Math.random() * maxRadius
        const angle = armOffset + distance * 0.01 + (Math.floor(Math.random() * armCount) * Math.PI * 2) / armCount

        // Convert to cartesian coordinates
        const x = centerX + Math.cos(angle) * distance
        const y = centerY + Math.sin(angle) * distance

        // Star properties
        return {
          x,
          y,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          color: getStarColor(),
          angle,
          distance,
          rotationSpeed: galaxyRotationSpeed * (0.8 + Math.random() * 0.4),
          parallaxFactor: Math.random() * 0.3 + 0.7, // How much this star moves with mouse
        }
      })

      // Generate dust particles (smaller, more numerous)
      const dustCount = Math.floor((width * height) / 200)
      dustParticlesRef.current = Array.from({ length: dustCount }).map(() => {
        const armCount = 5 // Number of spiral arms
        const armOffset = Math.random() * Math.PI * 2
        const distance = Math.random() * maxRadius * 1.2 // Slightly larger than star field
        const angle = armOffset + distance * 0.02 + (Math.floor(Math.random() * armCount) * Math.PI * 2) / armCount

        const x = centerX + Math.cos(angle) * distance
        const y = centerY + Math.sin(angle) * distance

        return {
          x,
          y,
          size: Math.random() * 1 + 0.1,
          opacity: Math.random() * 0.5 + 0.1,
          color: getDustColor(),
          angle,
          distance,
          rotationSpeed: galaxyRotationSpeed * (0.6 + Math.random() * 0.8),
          parallaxFactor: Math.random() * 0.5 + 0.5, // How much this particle moves with mouse
        }
      })
    }

    const getStarColor = () => {
      // Star colors: white, blue, yellow, orange
      const colors = [
        "255, 255, 255", // White
        "155, 176, 255", // Blue
        "255, 230, 155", // Yellow
        "255, 170, 100", // Orange
      ]

      // Bias toward white/blue stars
      const rand = Math.random()
      if (rand < 0.6) return colors[0]
      if (rand < 0.8) return colors[1]
      if (rand < 0.9) return colors[2]
      return colors[3]
    }

    const getDustColor = () => {
      // Dust colors: blue, purple, pink
      const colors = [
        "100, 120, 255", // Blue
        "150, 100, 255", // Purple
        "255, 100, 200", // Pink
      ]

      return colors[Math.floor(Math.random() * colors.length)]
    }

    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        canvasRef.current.width = width
        canvasRef.current.height = height
      }
      generateStars()
    }

    generateStars()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const animate = (time: number) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time
    }

    const deltaTime = time - previousTimeRef.current
    previousTimeRef.current = time

    if (!containerRef.current || !canvasRef.current) return

    const { width, height } = containerRef.current.getBoundingClientRect()
    const ctx = canvasRef.current.getContext("2d")

    // Get current galaxy center position from motion values
    const centerX = width * galaxyCenterX.get()
    const centerY = height * galaxyCenterY.get()

    if (ctx) {
      // Clear canvas with a gradient background
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.8)
      gradient.addColorStop(0, "rgba(10, 15, 30, 1)")
      gradient.addColorStop(0.5, "rgba(5, 10, 20, 1)")
      gradient.addColorStop(1, "rgba(0, 0, 10, 1)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw dust particles first (they're behind stars)
      dustParticlesRef.current.forEach((particle) => {
        // Update particle position by rotating around center
        particle.angle += particle.rotationSpeed * deltaTime

        // Calculate base position from rotation
        const baseX = centerX + Math.cos(particle.angle) * particle.distance
        const baseY = centerY + Math.sin(particle.angle) * particle.distance

        // Apply parallax effect based on mouse position
        const parallaxX = springX.get() * 0.02 * particle.parallaxFactor
        const parallaxY = springY.get() * 0.02 * particle.parallaxFactor

        particle.x = baseX + parallaxX
        particle.y = baseY + parallaxY

        // Draw particle
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw stars
      starsRef.current.forEach((star) => {
        // Update star position by rotating around center
        star.angle += star.rotationSpeed * deltaTime

        // Calculate base position from rotation
        const baseX = centerX + Math.cos(star.angle) * star.distance
        const baseY = centerY + Math.sin(star.angle) * star.distance

        // Apply parallax effect based on mouse position
        const parallaxX = springX.get() * 0.03 * star.parallaxFactor
        const parallaxY = springY.get() * 0.03 * star.parallaxFactor

        star.x = baseX + parallaxX
        star.y = baseY + parallaxY

        // Draw star
        ctx.globalAlpha = star.opacity

        // Star glow
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3)
        gradient.addColorStop(0, `rgba(${star.color}, ${star.opacity})`)
        gradient.addColorStop(1, `rgba(${star.color}, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Star core
        ctx.fillStyle = `rgba(${star.color}, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Reset global alpha
      ctx.globalAlpha = 1
    }

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Additional nebula effects with parallax */}
      <motion.div
        className="absolute inset-0 opacity-30 mix-blend-screen"
        style={{
          background: "radial-gradient(ellipse at 30% 40%, rgba(100, 120, 255, 0.3), transparent 70%)",
          x: useTransform(springX, [-dimensions.width / 2, dimensions.width / 2], [20, -20]),
          y: useTransform(springY, [-dimensions.height / 2, dimensions.height / 2], [20, -20]),
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-20 mix-blend-screen"
        style={{
          background: "radial-gradient(ellipse at 70% 60%, rgba(150, 100, 255, 0.3), transparent 70%)",
          x: useTransform(springX, [-dimensions.width / 2, dimensions.width / 2], [30, -30]),
          y: useTransform(springY, [-dimensions.height / 2, dimensions.height / 2], [30, -30]),
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-15 mix-blend-screen"
        style={{
          background: "radial-gradient(ellipse at 40% 70%, rgba(255, 100, 150, 0.2), transparent 70%)",
          x: useTransform(springX, [-dimensions.width / 2, dimensions.width / 2], [40, -40]),
          y: useTransform(springY, [-dimensions.height / 2, dimensions.height / 2], [40, -40]),
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 5,
        }}
      />
    </motion.div>
  )
}

