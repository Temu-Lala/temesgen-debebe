"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useVelocity,
  useAnimationControls,
  AnimatePresence,
} from "framer-motion"

export function Advanced3DTime() {
  const [date, setDate] = useState(new Date())
  const containerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [particles, setParticles] = useState<
    { x: number; y: number; char: string; targetX: number; targetY: number }[]
  >([])
  const [isGlitching, setIsGlitching] = useState(false)
  const [quantumState, setQuantumState] = useState(0)

  // Animation controls for coordinated animations
  const controls = useAnimationControls()

  // Mouse tracking with advanced physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Scroll position for parallax
  const { scrollYProgress } = useScroll()
  const scrollVelocity = useVelocity(scrollYProgress)

  // Spring physics with custom damping/stiffness
  const springX = useSpring(mouseX, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  const springY = useSpring(mouseY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Complex transformations based on mouse and scroll
  const rotateX = useTransform(springY, [-500, 500], [25, -25])
  const rotateY = useTransform(springX, [-500, 500], [-25, 25])
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 10])

  // Parallax depth effect based on scroll and mouse
  const depth = useTransform([springX, springY, scrollYProgress], ([latestX, latestY, latestScroll]) => {
    return -100 - (latestX as number) * 0.05 - (latestY as number) * 0.05 - (latestScroll as number) * 50
  })

  // Scale based on scroll velocity
  const scale = useTransform(scrollVelocity, [-1000, 0, 1000], [0.8, 1, 0.8])

  // Glitch intensity based on scroll velocity
  const glitchIntensity = useTransform(scrollVelocity, [-1000, 0, 1000], [1, 0, 1])

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())

      // Occasionally trigger glitch effect
      if (Math.random() > 0.7) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 500)
      }

      // Occasionally change quantum state
      if (Math.random() > 0.8) {
        setQuantumState(Math.floor(Math.random() * 3))
      }
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  // Initialize audio context for visualization
  useEffect(() => {
    if (audioEnabled && !audioRef.current) {
      audioRef.current = new Audio("/assets/ambient.mp3")
      audioRef.current.loop = true
      audioRef.current.volume = 0.1
      audioRef.current.play().catch((e) => console.log("Audio play prevented:", e))
    } else if (!audioEnabled && audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
  }, [audioEnabled])

  // Generate particles for time digits
  useEffect(() => {
    if (!containerRef.current) return

    const { width, height } = containerRef.current.getBoundingClientRect()
    const centerX = width / 2
    const centerY = height / 2

    // Format time
    const timeString = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })

    // Create particles for each character
    const newParticles = []
    const chars = timeString.split("")

    for (let i = 0; i < 200; i++) {
      const charIndex = Math.floor(Math.random() * chars.length)
      const char = chars[charIndex]

      // Calculate target position (arranged in time format)
      const charPosition = charIndex - chars.length / 2
      const targetX = centerX + charPosition * 80
      const targetY = centerY

      // Random starting position
      const x = Math.random() * width
      const y = Math.random() * height

      newParticles.push({
        x,
        y,
        char,
        targetX,
        targetY,
      })
    }

    setParticles(newParticles)

    // Animate particles to form time
    controls.start("assemble")
  }, [date, controls])

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate distance from center
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)

    // Trigger ripple effect on significant mouse movement
    if (Math.abs(e.movementX) > 20 || Math.abs(e.movementY) > 20) {
      controls.start("ripple")
    }
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
  const milliseconds = date.getMilliseconds().toString().padStart(3, "0")

  // Particle animation variants
  const particleVariants = {
    initial: (i: number) => ({
      opacity: 0,
      scale: 0,
      x: (i: any) => i.x,
      y: (i: any) => i.y,
    }),
    assemble: (i: number) => ({
      opacity: [0, 0.8, 0.4],
      scale: [0, 1.2, 1],
      x: (i: any) => i.targetX + (Math.random() * 10 - 5),
      y: (i: any) => i.targetY + (Math.random() * 10 - 5),
      transition: {
        duration: 2,
        delay: Math.random() * 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }),
    ripple: (i: number) => ({
      x: (i: any) => i.targetX + (Math.random() * 40 - 20),
      y: (i: any) => i.targetY + (Math.random() * 40 - 20),
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    }),
    exit: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.5 },
    },
  }

  // Digital rain effect variants
  const rainVariants = {
    initial: {
      opacity: 0,
      y: -100,
    },
    animate: (i: number) => ({
      opacity: [0, 1, 0],
      y: [0, window.innerHeight],
      transition: {
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    }),
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  }

  // Quantum state variants (multiple time states)
  const quantumVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)",
    },
    animate: (i: number) => ({
      opacity: [0, 0.3, 0],
      scale: [0.8, 1, 0.8],
      filter: ["blur(10px)", "blur(2px)", "blur(10px)"],
      transition: {
        duration: 3,
        delay: i * 0.2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    }),
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5 },
    },
  }

  // Generate alternative time states for quantum effect
  const generateAlternateTime = (offset: number) => {
    const altDate = new Date(date.getTime() + offset * 1000)
    return {
      hours: altDate.getHours().toString().padStart(2, "0"),
      minutes: altDate.getMinutes().toString().padStart(2, "0"),
      seconds: altDate.getSeconds().toString().padStart(2, "0"),
    }
  }

  const altTime1 = generateAlternateTime(60) // 1 minute in the future
  const altTime2 = generateAlternateTime(-60) // 1 minute in the past

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "2000px" }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black" />

      {/* Audio toggle button */}
      <button
        onClick={() => setAudioEnabled(!audioEnabled)}
        className="absolute top-4 right-4 z-50 pointer-events-auto bg-black/30 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/30 text-xs font-mono"
      >
        {audioEnabled ? "MUTE AMBIENT" : "ENABLE AMBIENT"}
      </button>

      {/* 3D Time Container with advanced transformations */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          rotateX,
          rotateY,
          rotateZ,
          scale,
          z: depth,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Particle effect time display */}
        <AnimatePresence>
          {particles.map((particle, index) => (
            <motion.div
              key={`particle-${index}`}
              custom={particle}
              variants={particleVariants}
              initial="initial"
              animate={controls}
              exit="exit"
              className="absolute text-cyan-400 font-bold text-xl"
              style={{
                textShadow: "0 0 10px rgba(0, 200, 255, 0.8)",
                transformStyle: "preserve-3d",
              }}
            >
              {particle.char}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Main time display with 3D effect */}
        <motion.div
          className="relative flex items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
          style={{
            transformStyle: "preserve-3d",
            filter: isGlitching ? "url(#glitch)" : "none",
          }}
        >
          {/* Hours */}
          <TimeDigit digit={hours[0]} depth={-200 + Math.sin(Date.now() * 0.001) * 20} isGlitching={isGlitching} />
          <TimeDigit digit={hours[1]} depth={-180 + Math.cos(Date.now() * 0.001) * 20} isGlitching={isGlitching} />

          {/* Separator */}
          <motion.div
            className="text-[20vw] font-bold text-cyan-400 mx-[-2vw]"
            style={{
              textShadow: "0 0 20px rgba(0, 200, 255, 0.8)",
              transform: "translateZ(-190px)",
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              rotateY: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            :
          </motion.div>

          {/* Minutes */}
          <TimeDigit digit={minutes[0]} depth={-220 + Math.sin(Date.now() * 0.0015) * 20} isGlitching={isGlitching} />
          <TimeDigit digit={minutes[1]} depth={-240 + Math.cos(Date.now() * 0.0015) * 20} isGlitching={isGlitching} />

          {/* Separator */}
          <motion.div
            className="text-[20vw] font-bold text-cyan-400 mx-[-2vw]"
            style={{
              textShadow: "0 0 20px rgba(0, 200, 255, 0.8)",
              transform: "translateZ(-230px)",
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              rotateY: [0, -180, -360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 0.5,
            }}
          >
            :
          </motion.div>

          {/* Seconds */}
          <TimeDigit digit={seconds[0]} depth={-260 + Math.sin(Date.now() * 0.002) * 20} isGlitching={isGlitching} />
          <TimeDigit digit={seconds[1]} depth={-280 + Math.cos(Date.now() * 0.002) * 20} isGlitching={isGlitching} />

          {/* Milliseconds (smaller) */}
          <motion.div
            className="text-[5vw] font-bold text-cyan-400 self-end mb-[5vw]"
            style={{
              textShadow: "0 0 10px rgba(0, 200, 255, 0.8)",
              transform: "translateZ(-250px)",
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 0.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            .{milliseconds}
          </motion.div>
        </motion.div>

        {/* Digital rain effect (Matrix-style) */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, index) => (
            <motion.div
              key={`rain-${index}`}
              custom={index}
              variants={rainVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute text-cyan-500/30 font-mono text-sm"
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
          ))}
        </div>

        {/* Quantum time effect (multiple time states) */}
        {quantumState > 0 && (
          <>
            <motion.div
              className="absolute flex items-center justify-center gap-8"
              style={{
                transformStyle: "preserve-3d",
                transform: "translateZ(-150px) translateX(50px) translateY(-30px)",
              }}
              variants={quantumVariants}
              custom={0}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="text-[15vw] font-bold text-red-400/30">
                {altTime1.hours}:{altTime1.minutes}:{altTime1.seconds}
              </div>
            </motion.div>

            <motion.div
              className="absolute flex items-center justify-center gap-8"
              style={{
                transformStyle: "preserve-3d",
                transform: "translateZ(-150px) translateX(-50px) translateY(30px)",
              }}
              variants={quantumVariants}
              custom={1}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="text-[15vw] font-bold text-blue-400/30">
                {altTime2.hours}:{altTime2.minutes}:{altTime2.seconds}
              </div>
            </motion.div>
          </>
        )}

        {/* Holographic grid overlay with distortion */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(0,200,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.03) 1px, transparent 1px)",
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

        {/* Audio visualization rings */}
        {audioEnabled && (
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.div
                key={`ring-${index}`}
                className="absolute rounded-full border border-cyan-500/30"
                style={{
                  width: `${(index + 1) * 20}vw`,
                  height: `${(index + 1) * 20}vw`,
                  transform: "translateZ(-100px)",
                }}
                animate={{
                  scale: [1, 1 + Math.random() * 0.2, 1],
                  opacity: [0.1, 0.3, 0.1],
                  borderWidth: ["1px", "2px", "1px"],
                }}
                transition={{
                  duration: 2 + index,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              />
            ))}
          </div>
        )}

        {/* Scanning line effect with advanced animation */}
        <motion.div className="absolute inset-0 overflow-hidden" style={{ transform: "translateZ(-40px)" }}>
          <motion.div
            className="absolute left-0 right-0 h-[2px]"
            style={{
              background: "linear-gradient(to right, transparent, rgba(0, 200, 255, 0.8), transparent)",
              boxShadow: "0 0 20px rgba(0, 200, 255, 0.8), 0 0 40px rgba(0, 200, 255, 0.4)",
            }}
            animate={{
              top: ["0%", "100%", "0%"],
              scaleX: [0.5, 1.5, 0.5],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              times: [0, 0.5, 1],
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
          <feOffset dx={isGlitching ? Math.random() * 10 - 5 : 0} dy={isGlitching ? Math.random() * 10 - 5 : 0} />
          <feGaussianBlur stdDeviation={isGlitching ? Math.random() * 5 : 0} />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
          />
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
  const glitchRotate = useMotionValue(0)

  // Update glitch values when glitching state changes
  useEffect(() => {
    if (isGlitching) {
      glitchX.set(Math.random() * 10 - 5)
      glitchY.set(Math.random() * 10 - 5)
      glitchRotate.set(Math.random() * 5 - 2.5)
    } else {
      glitchX.set(0)
      glitchY.set(0)
      glitchRotate.set(0)
    }
  }, [isGlitching, glitchX, glitchY, glitchRotate])

  return (
    <motion.div
      className="relative"
      style={{
        transformStyle: "preserve-3d",
        x: glitchX,
        y: glitchY,
        rotate: glitchRotate,
      }}
    >
      <motion.div
        className="text-[20vw] font-bold text-cyan-400"
        style={{
          textShadow: "0 0 20px rgba(0, 200, 255, 0.8)",
          transform: `translateZ(${depth}px)`,
        }}
        key={digit}
        initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
        animate={{
          opacity: 0.8,
          scale: 1,
          rotateY: 0,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
          },
        }}
        exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      >
        {digit}
      </motion.div>

      {/* 3D extrusion effect */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`extrude-${i}`}
          className="absolute inset-0 text-[20vw] font-bold text-cyan-400/10"
          style={{
            transform: `translateZ(${depth - i * 5}px)`,
          }}
        >
          {digit}
        </motion.div>
      ))}

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

      {/* Holographic glitch effects */}
      <motion.div
        className="absolute inset-0 text-[20vw] font-bold text-red-400/10 hidden sm:block"
        style={{
          transform: `translateZ(${depth}px) translateX(5px)`,
        }}
        animate={{
          opacity: isGlitching ? [0, 0.8, 0] : [0, 0.2, 0],
          x: isGlitching ? [0, 10, 0] : [0, 3, 0],
        }}
        transition={{
          duration: isGlitching ? 0.1 : 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          repeatDelay: isGlitching ? 0.05 : Math.random() * 5 + 5,
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
          opacity: isGlitching ? [0, 0.8, 0] : [0, 0.2, 0],
          x: isGlitching ? [0, -10, 0] : [0, -3, 0],
        }}
        transition={{
          duration: isGlitching ? 0.1 : 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          repeatDelay: isGlitching ? 0.05 : Math.random() * 5 + 5,
        }}
      >
        {digit}
      </motion.div>

      {/* Floating particles around digits */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-cyan-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: "0 0 5px rgba(0, 200, 255, 0.8)",
          }}
          animate={{
            x: [0, Math.random() * 30 - 15, 0],
            y: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 1, 0],
            scale: [0, Math.random() + 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </motion.div>
  )
}

