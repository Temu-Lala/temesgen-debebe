"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function NeuralNetwork() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<any[]>([])
  const connectionsRef = useRef<any[]>([])
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

      // Regenerate neural network on resize
      generateNetwork()
    }

    // Generate neural network nodes and connections
    const generateNetwork = () => {
      if (!canvas) return

      const { width, height } = canvas
      const nodeCount = 50 // Number of nodes

      // Create nodes
      nodesRef.current = Array.from({ length: nodeCount }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
        color: getNodeColor(),
      }))

      // Create connections between nodes
      connectionsRef.current = []

      for (let i = 0; i < nodeCount; i++) {
        // Connect each node to 2-5 other nodes
        const connectionCount = Math.floor(Math.random() * 3) + 2

        for (let j = 0; j < connectionCount; j++) {
          // Connect to a random node
          const targetIndex = Math.floor(Math.random() * nodeCount)

          // Avoid self-connections and duplicates
          if (
            targetIndex !== i &&
            !connectionsRef.current.some(
              (conn) => (conn.from === i && conn.to === targetIndex) || (conn.from === targetIndex && conn.to === i),
            )
          ) {
            connectionsRef.current.push({
              from: i,
              to: targetIndex,
              active: Math.random() > 0.7, // Some connections start active
              pulseSpeed: Math.random() * 0.01 + 0.005,
              pulseOffset: Math.random() * Math.PI * 2,
            })
          }
        }
      }
    }

    const getNodeColor = () => {
      // Neural network node colors
      const colors = [
        "0, 200, 255", // Cyan
        "100, 200, 255", // Light blue
        "150, 100, 255", // Purple
      ]

      return colors[Math.floor(Math.random() * colors.length)]
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const animate = (time: number) => {
      if (!ctx || !canvas) return

      const { width, height } = canvas

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Get current mouse position
      const mouseXPos = springX.get() * width
      const mouseYPos = springY.get() * height

      // Update and draw nodes
      nodesRef.current.forEach((node, index) => {
        // Update position
        node.x += node.speedX
        node.y += node.speedY

        // Apply mouse influence
        const dx = mouseXPos - node.x
        const dy = mouseYPos - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 0.05
          node.x += dx * force
          node.y += dy * force
        }

        // Wrap around edges
        if (node.x < 0) node.x = width
        if (node.x > width) node.x = 0
        if (node.y < 0) node.y = height
        if (node.y > height) node.y = 0

        // Calculate pulse (oscillating size)
        const pulse = Math.sin(time * node.pulseSpeed + node.pulseOffset) * 0.5 + 0.5
        const radius = node.radius * (1 + pulse * 0.5)

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${node.color}, ${0.5 + pulse * 0.5})`
        ctx.fill()

        // Add glow effect
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius * 2, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(node.x, node.y, radius, node.x, node.y, radius * 2)
        gradient.addColorStop(0, `rgba(${node.color}, 0.3)`)
        gradient.addColorStop(1, `rgba(${node.color}, 0)`)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Update and draw connections
      connectionsRef.current.forEach((connection) => {
        const fromNode = nodesRef.current[connection.from]
        const toNode = nodesRef.current[connection.to]

        // Calculate distance between nodes
        const dx = toNode.x - fromNode.x
        const dy = toNode.y - fromNode.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Only draw connections if nodes are within a certain distance
        if (distance < 150) {
          // Calculate pulse (oscillating opacity)
          const pulse = Math.sin(time * connection.pulseSpeed + connection.pulseOffset) * 0.5 + 0.5
          const opacity = 0.1 + pulse * 0.2

          // Draw connection line
          ctx.beginPath()
          ctx.moveTo(fromNode.x, fromNode.y)
          ctx.lineTo(toNode.x, toNode.y)
          ctx.strokeStyle = `rgba(0, 200, 255, ${opacity})`
          ctx.lineWidth = 0.5
          ctx.stroke()

          // Draw data pulse traveling along the connection
          if (connection.active) {
            const pulsePosition = (time * 0.001 * 50 + connection.pulseOffset * 10) % distance
            const pulseX = fromNode.x + (dx * pulsePosition) / distance
            const pulseY = fromNode.y + (dy * pulsePosition) / distance

            ctx.beginPath()
            ctx.arc(pulseX, pulseY, 1.5, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(0, 255, 255, ${0.7 + pulse * 0.3})`
            ctx.fill()
          }
        }
      })

      // Randomly activate connections
      if (Math.random() > 0.99) {
        const randomConnection = connectionsRef.current[Math.floor(Math.random() * connectionsRef.current.length)]
        randomConnection.active = !randomConnection.active
      }

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
      className="absolute inset-0 overflow-hidden z-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </motion.div>
  )
}

