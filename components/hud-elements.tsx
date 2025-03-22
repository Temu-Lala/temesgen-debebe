"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function HudElements() {
  const [systemStatus, setSystemStatus] = useState("ONLINE")
  const [cpuUsage, setCpuUsage] = useState(0)
  const [memoryUsage, setMemoryUsage] = useState(0)
  const [networkStatus, setNetworkStatus] = useState("CONNECTED")
  const [securityLevel, setSecurityLevel] = useState("MAXIMUM")
  const [notifications, setNotifications] = useState<string[]>([])

  // Simulate changing system metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 10)
      setMemoryUsage(Math.floor(Math.random() * 40) + 30)

      // Occasionally add notifications
      if (Math.random() > 0.7) {
        const newNotification = getRandomNotification()
        setNotifications((prev) => [newNotification, ...prev].slice(0, 3))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getRandomNotification = () => {
    const notifications = [
      "System scan complete. No threats detected.",
      "Neural network optimization complete.",
      "Quantum encryption keys refreshed.",
      "Biometric authentication verified.",
      "Holographic projection calibrated.",
      "AI assistant updated to latest version.",
      "Augmented reality modules synchronized.",
    ]

    return notifications[Math.floor(Math.random() * notifications.length)]
  }

  return (
    <>
      {/* Top-left HUD element */}
      <motion.div
        className="absolute top-4 left-4 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-lg p-3 text-cyan-300 font-mono text-xs">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse" />
            <div>SYSTEM STATUS: {systemStatus}</div>
          </div>

          <div className="  pt-20">
            <div className="flex justify-between mb-1">
              <span>CPU</span>
              <span>{cpuUsage}%</span>
            </div>
            <div className="w-40 h-1 bg-cyan-950 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyan-500"
                animate={{ width: `${cpuUsage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>MEMORY</span>
              <span>{memoryUsage}%</span>
            </div>
            <div className="w-40 h-1 bg-cyan-950 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyan-500"
                animate={{ width: `${memoryUsage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top-right HUD element */}
      <motion.div
        className="absolute top-4 right-4 z-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="bg-black/40 backdrop-blur-md border pt-20 border-cyan-500/30 rounded-lg p-3 text-cyan-300 font-mono text-xs">
          <div className="flex items-center justify-end mb-2">
            <div>NETWORK: {networkStatus}</div>
            <div className="w-2 h-2 rounded-full bg-cyan-400 ml-2 animate-pulse" />
          </div>

          <div className="flex items-center justify-end mb-2">
            <div>SECURITY: {securityLevel}</div>
            <div className="w-2 h-2 rounded-full bg-green-400 ml-2" />
          </div>

          <div className="flex items-center justify-end">
            <div>{new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </motion.div>

      {/* Bottom notifications */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-md">
        <AnimatePresence>
          {notifications.map((notification, index) => (
            <motion.div
              key={notification + index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-lg p-2 mb-2 text-cyan-300 font-mono text-xs"
            >
              <div className="flex items-center">
                <div className="w-1 h-1 rounded-full bg-cyan-400 mr-2 animate-pulse" />
                <div>{notification}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}

