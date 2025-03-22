"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function FuturisticGrid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number>()

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
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Grid parameters
    const gridSize = 40
    const perspectiveStrength = 0.3

    const drawGrid = () => {
      if (!ctx || !canvas) return

      const width = canvas.width
      const height = canvas.height

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Get current mouse position
      const mouseXPos = springX.get()
      const mouseYPos = springY.get()

      // Calculate perspective vanishing point based on mouse
      const vpX = width * mouseXPos
      const vpY = height * mouseYPos

      // Draw horizontal grid lines
      for (let y = 0; y <= height; y += gridSize) {
        // Calculate perspective distortion
        const distFromCenter = y / height - 0.5
        const perspectiveX = vpX + width * distFromCenter * perspectiveStrength * (mouseXPos - 0.5)

        // Line intensity based on distance from mouse
        const distFromMouse = Math.abs(y / height - mouseYPos)
        const intensity = Math.max(0.1, 1 - distFromMouse * 2)

        // Draw line
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.strokeStyle = `rgba(0, 180, 255, ${intensity * 0.3})`
        ctx.lineWidth = intensity
        ctx.stroke()

        // Add glow effect for lines near mouse
        if (intensity > 0.5) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(width, y)
          ctx.strokeStyle = `rgba(0, 220, 255, ${intensity * 0.1})`
          ctx.lineWidth = intensity * 5
          ctx.stroke()
        }
      }

      // Draw vertical grid lines
      for (let x = 0; x <= width; x += gridSize) {
        // Calculate perspective distortion
        const distFromCenter = x / width - 0.5
        const perspectiveY = vpY + height * distFromCenter * perspectiveStrength * (mouseYPos - 0.5)

        // Line intensity based on distance from mouse
        const distFromMouse = Math.abs(x / width - mouseXPos)
        const intensity = Math.max(0.1, 1 - distFromMouse * 2)

        // Draw line
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.strokeStyle = `rgba(0, 180, 255, ${intensity * 0.3})`
        ctx.lineWidth = intensity
        ctx.stroke()

        // Add glow effect for lines near mouse
        if (intensity > 0.5) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, height)
          ctx.strokeStyle = `rgba(0, 220, 255, ${intensity * 0.1})`
          ctx.lineWidth = intensity * 5
          ctx.stroke()
        }
      }

      // Draw mouse highlight
      const mouseHighlightRadius = 100
      const gradient = ctx.createRadialGradient(vpX, vpY, 0, vpX, vpY, mouseHighlightRadius)
      gradient.addColorStop(0, "rgba(0, 220, 255, 0.2)")
      gradient.addColorStop(1, "rgba(0, 220, 255, 0)")

      ctx.beginPath()
      ctx.arc(vpX, vpY, mouseHighlightRadius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Request next frame
      requestRef.current = requestAnimationFrame(drawGrid)
    }

    // Start animation
    mouseX.set(0.5)
    mouseY.set(0.5)
    requestRef.current = requestAnimationFrame(drawGrid)

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
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-indigo-950/20 to-black/90" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </motion.div>
  )
}

