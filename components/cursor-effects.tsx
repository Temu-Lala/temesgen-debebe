"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CursorEffects() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const trailsRef = useRef<HTMLDivElement[]>([])
  const [isPointer, setIsPointer] = useState(false)

  // Mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring physics for cursor movement
  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 })
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 })

  // Smooth spring physics for cursor ring (follows with delay)
  const ringX = useSpring(mouseX, { stiffness: 200, damping: 40 })
  const ringY = useSpring(mouseY, { stiffness: 200, damping: 40 })

  // Create trail elements
  const trailCount = 8
  const trailDelays = Array.from({ length: trailCount }).map((_, i) => i * 0.05)

  // Initialize trail spring values outside the useEffect
  const trailX = useRef(
    trailDelays.map((delay) =>
      useSpring(0, { stiffness: 100, damping: 30, restDelta: 0.001, restSpeed: 0.001, delay }),
    ),
  ).current
  const trailY = useRef(
    trailDelays.map((delay) =>
      useSpring(0, { stiffness: 100, damping: 30, restDelta: 0.001, restSpeed: 0.001, delay }),
    ),
  ).current

  const trails = Array.from({ length: trailCount }).map((_, i) => ({
    x: trailX[i],
    y: trailY[i],
    opacity: 1 - i / trailCount,
  }))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // Update trail spring values on mouse move
      trailX.forEach((spring, i) => {
        spring.set(mouseX.get())
      })
      trailY.forEach((spring, i) => {
        spring.set(mouseY.get())
      })

      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.style.cursor === "pointer" ||
        window.getComputedStyle(target).cursor === "pointer"

      setIsPointer(isClickable)
    }

    const handleMouseDown = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = "translate(-50%, -50%) scale(0.8)"
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = "translate(-50%, -50%) scale(1.5)"
      }
    }

    const handleMouseUp = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = "translate(-50%, -50%) scale(1)"
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = "translate(-50%, -50%) scale(1)"
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    // Hide default cursor
    document.body.style.cursor = "none"

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)

      // Restore default cursor
      document.body.style.cursor = "auto"
    }
  }, [])

  return (
    <>
      {/* Cursor trails */}
      {trails.map((trail, index) => (
        <motion.div
          key={`trail-${index}`}
          ref={(el) => {
            if (el) trailsRef.current[index] = el
          }}
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[100]"
          style={{
            x: trail.x,
            y: trail.y,
            opacity: trail.opacity * 0.6,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Cursor ring */}
      <motion.div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[100] transition-transform duration-200 ${
          isPointer ? "border-2 border-cyan-400 scale-150" : "border border-cyan-500/50"
        }`}
        style={{
          x: ringX,
          y: ringY,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Cursor dot */}
      <motion.div
        ref={cursorRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[100] transition-transform duration-200 ${
          isPointer ? "w-1 h-1 bg-cyan-400" : "w-2 h-2 bg-cyan-500"
        }`}
        style={{
          x: springX,
          y: springY,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 10px rgba(0, 200, 255, 0.8)",
        }}
      />
    </>
  )
}

