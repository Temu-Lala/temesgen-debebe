"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TypingEffect } from "./typing-effect"

export function HolographicUI() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [systemStatus, setSystemStatus] = useState("ONLINE")
  const [notifications, setNotifications] = useState<string[]>([])
  const [scanProgress, setScanProgress] = useState(0)
  const [isScanning, setIsScanning] = useState(false)

  // Sections data
  const sections = [
    {
      id: "profile",
      title: "PROFILE",
      content:
"Hi, I'm a passionate Software Developer and Graphics Designer with a strong commitment to delivering high-quality digital solutions. I specialize in building modern, responsive web applications and crafting visually appealing graphic designs that enhance user experiences. Whether it's coding a full-stack application or designing a brand's identity, I focus on creativity, functionality, and client satisfaction. Let's bring your ideas to life!"    },
    {
      id: "skills",
      title: "SKILLS",
      content:
"Full-Stack Web Development,Frontend Development (React, Next.js, HTML, CSS, JavaScript, Tailwind CSS, Material UI),Backend Development (Node.js, Django, Django REST Framework),Database Management (PostgreSQL, MySQL, MongoDB),API Integration & Development,Authentication & Security (JWT, OAuth, Role-based Access),Version Control (Git, GitHub, GitLab),Problem-Solving & Debugging"    },
    {
      id: "projects",
      title: "PROJECTS",
      content:
"I am a passionate and versatile Software Developer and Graphics Designer with strong expertise in building modern web applications, backend systems, and creative designs. I have worked on various impactful projects, including UniConnect Ethiopia, a social media platform that combines the features of Facebook and LinkedIn for university students, and an Ethiopian Sign Language Detection system using AI and Python to assist communication. My portfolio also includes a Book Rental Application with role-based authentication, an advanced Admin Dashboard for data visualization, and a Real Estate Web App (Blue Homes Sell) that enables users to buy and sell properties easily. I have developed customer support platforms during internships and designed responsive e-commerce product listings and photo editing tools using React and Fabric.js. I specialize in full-stack development with React, Next.js, Django, Node.js, and PostgreSQL, and I ensure seamless user experiences through responsive UI/UX design using Material UI, Tailwind CSS, and Figma. Additionally, I am skilled in creating logos, brand designs, posters, and social media content with tools like Photoshop and Canva. My commitment to quality, attention to detail, and problem-solving abilities enable me to deliver professional and user-friendly digital solutions that meet client goals." },
  ]

  // Simulate system activity
  useEffect(() => {
    // Random notifications
    const notificationInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newNotification = getRandomNotification()
        setNotifications((prev) => [newNotification, ...prev].slice(0, 3))
      }
    }, 5000)

    // Random scanning
    const scanInterval = setInterval(() => {
      if (!isScanning && Math.random() > 0.8) {
        setIsScanning(true)
        setScanProgress(0)
      }
    }, 10000)

    return () => {
      clearInterval(notificationInterval)
      clearInterval(scanInterval)
    }
  }, [isScanning])

  // Progress scanning animation
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isScanning) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          const newProgress = prev + 1
          if (newProgress >= 100) {
            setIsScanning(false)
            setNotifications((prev) => ["System scan complete. No anomalies detected.", ...prev].slice(0, 3))
            return 0
          }
          return newProgress
        })
      }, 50)
    }

    return () => clearInterval(interval)
  }, [isScanning])

  const getRandomNotification = () => {
    const notifications = [
      "Neural network optimization complete.",
      "Quantum encryption keys refreshed.",
      "Biometric authentication verified.",
      "Holographic projection calibrated.",
      "AI assistant updated to latest version.",
      "Augmented reality modules synchronized.",
      "Molecular computing simulation completed.",
      "Neural interface connection established.",
      "Quantum state coherence maintained.",
    ]

    return notifications[Math.floor(Math.random() * notifications.length)]
  }

  return (
    <div className="fixed bottom-20 right-8 z-20 w-80">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4"
        style={{ boxShadow: "0 0 20px rgba(0, 200, 255, 0.2)" }}
      >
        {/* Header with system status */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan-400 mr-2"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
            <div className="text-cyan-300 text-xs font-mono">SYSTEM: {systemStatus}</div>
          </div>

          {isScanning && (
            <div className="flex items-center">
              <div className="text-cyan-300 text-xs font-mono mr-2">SCANNING</div>
              <div className="w-20 h-1 bg-cyan-950 rounded-full overflow-hidden">
                <motion.div className="h-full bg-cyan-500" style={{ width: `${scanProgress}%` }} />
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mb-4">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              className={`text-xs font-mono px-3 py-1 rounded ${
                activeSection === section.id
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50"
                  : "text-cyan-400 border border-cyan-500/10 hover:border-cyan-500/30"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {section.title}
            </motion.button>
          ))}
        </div>

        {/* Content area */}
        <div className="relative min-h-[100px] border border-cyan-500/20 rounded bg-black/30 p-3">
          {/* Holographic projection effect */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                background: "radial-gradient(circle at center, rgba(0, 200, 255, 0.5) 0%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            {/* Scan lines */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.05) 50%)",
                backgroundSize: "100% 4px",
                opacity: 0.2,
              }}
            />
          </div>

          <AnimatePresence mode="wait">
            {activeSection ? (
              <motion.div
                key={activeSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TypingEffect
                  text={sections.find((s) => s.id === activeSection)?.content || ""}
                  speed={20}
                  className="text-cyan-300 text-xs leading-relaxed"
                />
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col justify-center items-center"
              >
                {notifications.length > 0 ? (
                  <div className="w-full">
                    <div className="text-cyan-400 text-xs mb-2 font-mono">LATEST NOTIFICATIONS:</div>
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={`notification-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-cyan-300 text-xs mb-2 font-mono flex"
                      >
                        <span className="text-cyan-500 mr-2">{">"}</span>
                        <span>{notification}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-cyan-400 text-xs font-mono">SELECT SECTION TO VIEW DATA</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-cyan-500/20 flex justify-between items-center">
          <div className="text-cyan-400 text-xs font-mono">ID: TD-2080</div>
          <motion.div
            className="text-cyan-300 text-xs font-mono"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {new Date().toLocaleTimeString()}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

