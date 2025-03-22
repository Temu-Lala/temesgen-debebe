"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Components
import { Smooth3DTime } from "@/components/smooth-3d-time";
import { FuturisticBackground } from "@/components/futuristic-background";
import { FuturisticGrid } from "@/components/futuristic-grid";
import { NeuralNetwork } from "@/components/neural-network";
import { HudElements } from "@/components/hud-elements";
import { HolographicUI } from "@/components/holographic-ui";
import { CursorEffects } from "@/components/cursor-effects";
import { TypingEffect } from "@/components/typing-effect";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* ----- Background Layers ----- */}
      <Smooth3DTime />
      <FuturisticBackground />
      <FuturisticGrid />
      <NeuralNetwork />

      {/* ----- Cursor Effect ----- */}
      <CursorEffects />

      {/* ----- HUD Elements ----- */}
      <HudElements />

      {/* ----- Main Content ----- */}
      <motion.div
        className="z-10 text-center space-y-6 px-4 py-10 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >

        {/* ---- Header Section ---- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mb-8"
        >
          <TypingEffect
            text="WELCOME TO THE FUTURE"
            speed={80}
            className="text-sm text-cyan-400 tracking-widest mb-2"
          />

          <h1 className="text-4xl md:text-6xl font-bold text-white mt-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Temesgen Debebe
            </span>
          </h1>

          <TypingEffect
            text="Software Engineer and Graphics Designer"
            speed={40}
            delay={1500}
            className="text-xl md:text-2xl text-cyan-300 mt-2"
          />
        </motion.div>

        {/* ---- About Section ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 3 }}
          className="bg-black/30 backdrop-blur-md border border-cyan-500/20 rounded-lg p-6 max-w-2xl mx-auto"
        >
          <p className="text-cyan-100 mb-4 text-lg">
            I’m <span className="text-cyan-500">Temesgen Debebe</span>, a passionate <span className="text-cyan-500">Software Engineer</span> and <span className="text-cyan-500">Graphics Designer</span> skilled in Website, Mobile, and Desktop App Development. I work with <span className="text-cyan-500">React</span>, <span className="text-cyan-500">Next.js</span>, <span className="text-cyan-500">Node.js</span>, <span className="text-cyan-500">Django</span>, <span className="text-cyan-500">Flutter</span>, and <span className="text-cyan-500">Electron</span>, and create stunning designs using <span className="text-cyan-500">Figma</span> and <span className="text-cyan-500">Photoshop</span>. Focused on building responsive UIs, powerful backends, and creative visuals. Always learning and delivering high-quality solutions.
          </p>

          <div className="pt-4">
            <Link href="/about">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white border border-cyan-400/20">
                EXPLORE PORTFOLIO <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* ----- Holographic UI ----- */}
      <HolographicUI />
      
    </main>
  );
}
