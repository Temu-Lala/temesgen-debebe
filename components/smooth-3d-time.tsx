"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, useMotionValue, useTransform, useSpring, useAnimationControls } from "framer-motion"

export function Smooth3DTime() {
  const [date, setDate] = useState(new Date())
  const containerRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>()
  const [isGlitching, setIsGlitching] = useState(false)

  // Animation controls for coordinated animations
  const controls = useAnimationControls()

  // Mouse tracking with advanced physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics with custom damping/stiffness for smoother motion
  const springX = useSpring(mouseX, {
    stiffness: 50, // Lower stiffness for smoother motion
    damping: 25,
    restDelta: 0.001,
  })
  const springY = useSpring(mouseY, {
    stiffness: 50,
    damping: 25,
    restDelta: 0.001,
  })

  // Complex transformations based on mouse
  const rotateX = useTransform(springY, [-500, 500], [15, -15])
  const rotateY = useTransform(springX, [-500, 500], [-15, 15])
  const translateZ = useTransform([springX, springY], ([x, y]) => {
    const distance = Math.sqrt(Math.pow(x as number, 2) + Math.pow(y as number, 2))
    return -100 - distance / 10
  })

  // Update time every second with performance optimization
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())

      // Occasionally trigger glitch effect (less frequently for better performance)
      if (Math.random() > 0.9) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 300)
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  // Handle mouse movement with useCallback for better performance
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate distance from center
      mouseX.set((e.clientX - centerX) * 0.5) // Reduced multiplier for smoother motion
      mouseY.set((e.clientY - centerY) * 0.5)

      // Trigger ripple effect on significant mouse movement (less frequently)
      if (Math.abs(e.movementX) > 30 || Math.abs(e.movementY) > 30) {
        controls.start("ripple")
      }
    },
    [mouseX, mouseY, controls],
  )

  // Reset position when mouse leaves
  const handleMouseLeave = useCallback(() => {
    // Use spring animation to return to center for smoother transition
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  // Format time components - memoized to prevent unnecessary recalculations
  const timeComponents = useMemo(() => {
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")
    const milliseconds = date.getMilliseconds().toString().padStart(3, "0")

    return { hours, minutes, seconds, milliseconds }
  }, [date])

  // Digital rain effect variants - memoized
  const rainVariants = useMemo(
    () => ({
      initial: {
        opacity: 0,
        y: -100,
      },
      animate: (i: number) => ({
        opacity: [0, 0.3, 0], // Reduced opacity for subtler effect
        y: [0, window.innerHeight],
        transition: {
          duration: 3 + Math.random() * 3,
          delay: Math.random() * 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear", // Linear easing for smoother motion
        },
      }),
      exit: {
        opacity: 0,
        transition: { duration: 0.5 },
      },
    }),
    [],
  )

  // Generate rain characters - memoized
  const rainElements = useMemo(() => {
    return Array.from({ length: 15 }).map((_, index) => (
      <motion.div
        key={`rain-${index}`}
        custom={index}
        variants={rainVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="absolute text-cyan-500/20 font-mono text-sm"
        style={{
          left: `${Math.random() * 100}%`,
          transform: "translateZ(-100px)",
        }}
      >
        {Array.from({ length: Math.floor(Math.random() * 10) + 5 }).map((_, i) => (
          <div key={i} style={{ opacity: 1 - i * 0.1 }}>
            {Math.random() > 0.5 ? "1" : "0"}
          </div>
        ))}
      </motion.div>
    ))
  }, [rainVariants])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "2000px" }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />

      {/* 3D Time Container with advanced transformations */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          rotateX,
          rotateY,
          z: translateZ,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Main time display with 3D effect */}
        <motion.div
          className="relative flex items-center justify-center gap-4 md:gap-8"
          style={{
            transformStyle: "preserve-3d",
            filter: isGlitching ? "url(#glitch)" : "none",
          }}
        >
          {/* Hours */}
          <TimeDigit digit={timeComponents.hours[0]} depth={-200} isGlitching={isGlitching} />
          <TimeDigit digit={timeComponents.hours[1]} depth={-180} isGlitching={isGlitching} />

          {/* Separator */}
          <motion.div
            className="text-[15vw] md:text-[20vw] font-bold text-cyan-400/30 mx-[-1vw] md:mx-[-2vw]"
            style={{
              textShadow: "0 0 20px rgba(0, 200, 255, 0.5)",
              transform: "translateZ(-190px)",
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            :
          </motion.div>

          {/* Minutes */}
          <TimeDigit digit={timeComponents.minutes[0]} depth={-220} isGlitching={isGlitching} />
          <TimeDigit digit={timeComponents.minutes[1]} depth={-240} isGlitching={isGlitching} />

          {/* Separator */}
          <motion.div
            className="text-[15vw] md:text-[20vw] font-bold text-cyan-400/30 mx-[-1vw] md:mx-[-2vw]"
            style={{
              textShadow: "0 0 20px rgba(0, 200, 255, 0.5)",
              transform: "translateZ(-230px)",
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            :
          </motion.div>

          {/* Seconds */}
          <TimeDigit digit={timeComponents.seconds[0]} depth={-260} isGlitching={isGlitching} />
          <TimeDigit digit={timeComponents.seconds[1]} depth={-280} isGlitching={isGlitching} />
        </motion.div>

        {/* Digital rain effect (Matrix-style) - optimized */}
        <div className="absolute inset-0 overflow-hidden opacity-50">{rainElements}</div>

        {/* Holographic grid overlay with distortion */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(0,200,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.02) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            transform: "translateZ(-50px) rotateX(80deg)",
            transformOrigin: "center bottom",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          }}
        />

        {/* Scanning line effect with advanced animation */}
        <motion.div className="absolute inset-0 overflow-hidden" style={{ transform: "translateZ(-40px)" }}>
          <motion.div
            className="absolute left-0 right-0 h-[1px]"
            style={{
              background: "linear-gradient(to right, transparent, rgba(0, 200, 255, 0.5), transparent)",
              boxShadow: "0 0 10px rgba(0, 200, 255, 0.5), 0 0 20px rgba(0, 200, 255, 0.3)",
            }}
            animate={{
              top: ["0%", "100%", "0%"],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </motion.div>
      </motion.div>

      {/* SVG Filters for advanced effects */}
      <svg className="absolute -z-10" width="0" height="0">
        <filter id="glitch">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
          />
          <feOffset dx={isGlitching ? Math.random() * 5 - 2.5 : 0} dy={isGlitching ? Math.random() * 5 - 2.5 : 0} />
          <feGaussianBlur stdDeviation={isGlitching ? Math.random() * 2 : 0} />
        </filter>
      </svg>
    </div>
  )
}

// Enhanced TimeDigit component with advanced animations
function TimeDigit({ digit, depth, isGlitching }: { digit: string; depth: number; isGlitching: boolean }) {
  // Random values for glitch effect
  const glitchX = useMotionValue(0)
  const glitchY = useMotionValue(0)

  // Update glitch values when glitching state changes
  useEffect(() => {
    if (isGlitching) {
      glitchX.set(Math.random() * 5 - 2.5) // Reduced range for subtler effect
      glitchY.set(Math.random() * 5 - 2.5)
    } else {
      glitchX.set(0)
      glitchY.set(0)
    }
  }, [isGlitching, glitchX, glitchY])

  return (
    <motion.div
      className="relative"
      style={{
        transformStyle: "preserve-3d",
        x: glitchX,
        y: glitchY,
      }}
    >
      <motion.div
        className="text-[15vw] md:text-[20vw] font-bold text-cyan-400/30"
        style={{
          textShadow: "0 0 20px rgba(0, 200, 255, 0.5)",
          transform: `translateZ(${depth}px)`,
        }}
        key={digit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 0.3,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
          },
        }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        {digit}
      </motion.div>

      {/* 3D extrusion effect - optimized */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`extrude-${i}`}
          className="absolute inset-0 text-[15vw] md:text-[20vw] font-bold text-cyan-400/5"
          style={{
            transform: `translateZ(${depth - i * 10}px)`,
          }}
        >
          {digit}
        </motion.div>
      ))}

      {/* Holographic glitch effects - optimized */}
      <motion.div
        className="absolute inset-0 text-[15vw] md:text-[20vw] font-bold text-red-400/5 hidden sm:block"
        style={{
          transform: `translateZ(${depth}px) translateX(3px)`,
        }}
        animate={{
          opacity: isGlitching ? [0, 0.3, 0] : [0, 0.1, 0],
          x: isGlitching ? [0, 5, 0] : [0, 2, 0],
        }}
        transition={{
          duration: isGlitching ? 0.1 : 0.5,
          repeat: isGlitching ? 3 : 0,
          repeatType: "mirror",
        }}
      >
        {digit}
      </motion.div>

      <motion.div
        className="absolute inset-0 text-[15vw] md:text-[20vw] font-bold text-blue-400/5 hidden sm:block"
        style={{
          transform: `translateZ(${depth}px) translateX(-3px)`,
        }}
        animate={{
          opacity: isGlitching ? [0, 0.3, 0] : [0, 0.1, 0],
          x: isGlitching ? [0, -5, 0] : [0, -2, 0],
        }}
        transition={{
          duration: isGlitching ? 0.1 : 0.5,
          repeat: isGlitching ? 3 : 0,
          repeatType: "mirror",
        }}
      >
        {digit}
      </motion.div>
    </motion.div>
  )
}

