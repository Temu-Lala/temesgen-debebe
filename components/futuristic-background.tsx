"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function FuturisticBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<any[]>([])
  const dataStreamsRef = useRef<any[]>([])
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()

  // Mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring physics for mouse movement
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
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

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current

    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const { width, height } = container.getBoundingClientRect()
      canvas.width = width
      canvas.height = height

      // Regenerate particles and data streams on resize
      generateParticles()
      generateDataStreams()
    }

    // Generate floating particles
    const generateParticles = () => {
      if (!canvas) return

      const { width, height } = canvas
      const particleCount = Math.floor((width * height) / 15000) // Adjust density

      particlesRef.current = Array.from({ length: particleCount }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: getParticleColor(),
      }))
    }

    // Generate data streams (vertical lines of data)
    const generateDataStreams = () => {
      if (!canvas) return

      const { width, height } = canvas
      const streamCount = Math.floor(width / 100) // One stream every ~100px

      dataStreamsRef.current = Array.from({ length: streamCount }).map(() => {
        const x = Math.random() * width
        const speed = Math.random() * 2 + 1
        const segments = Math.floor(Math.random() * 10) + 5

        return {
          x,
          segments: Array.from({ length: segments }).map(() => ({
            y: Math.random() * height,
            length: Math.random() * 30 + 10,
            speed,
            opacity: Math.random() * 0.7 + 0.3,
          })),
        }
      })
    }

    const getParticleColor = () => {
      // Futuristic colors: cyan, blue, purple
      const colors = [
        "0, 200, 255", // Cyan
        "0, 100, 255", // Blue
        "150, 100, 255", // Purple
      ]

      return colors[Math.floor(Math.random() * colors.length)]
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const animate = (time: number) => {
      if (previousTimeRef.current === undefined) {
        previousTimeRef.current = time
      }

      const deltaTime = time - previousTimeRef.current
      previousTimeRef.current = time

      if (!ctx || !canvas) return

      const { width, height } = canvas

      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, "rgba(10, 20, 40, 0.8)")
      gradient.addColorStop(1, "rgba(5, 10, 30, 0.8)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Get current mouse position
      const mouseXPos = springX.get()
      const mouseYPos = springY.get()

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Apply mouse influence
        const dx = mouseXPos * width - particle.x
        const dy = mouseYPos * height - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 200

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 0.02
          particle.x += dx * force
          particle.y += dy * force
        }

        // Update position
        particle.x += particle.speedX * deltaTime * 0.1
        particle.y += particle.speedY * deltaTime * 0.1

        // Wrap around edges
        if (particle.x < 0) particle.x = width
        if (particle.x > width) particle.x = 0
        if (particle.y < 0) particle.y = height
        if (particle.y > height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`
        ctx.fill()

        // Add glow effect
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity * 0.3})`
        ctx.fill()
      })

      // Update and draw data streams
      dataStreamsRef.current.forEach((stream) => {
        stream.segments.forEach((segment) => {
          // Update position
          segment.y += segment.speed * deltaTime * 0.05
          if (segment.y > height) {
            segment.y = 0 - segment.length
            segment.opacity = Math.random() * 0.7 + 0.3
          }

          // Draw segment
          ctx.beginPath()
          ctx.moveTo(stream.x, segment.y)
          ctx.lineTo(stream.x, segment.y + segment.length)

          const gradient = ctx.createLinearGradient(stream.x, segment.y, stream.x, segment.y + segment.length)
          gradient.addColorStop(0, `rgba(0, 200, 255, 0)`)
          gradient.addColorStop(0.5, `rgba(0, 200, 255, ${segment.opacity})`)
          gradient.addColorStop(1, `rgba(0, 200, 255, 0)`)

          ctx.strokeStyle = gradient
          ctx.lineWidth = 1
          ctx.stroke()
        })
      })

      // Request next frame
      requestRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    mouseX.set(0.5)
    mouseY.set(0.5)
    requestRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </motion.div>
  )
}

