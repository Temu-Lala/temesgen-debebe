"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Smooth3DTime } from "@/components/smooth-3d-time";
import { FuturisticGrid } from "@/components/futuristic-grid";
import { CursorEffects } from "@/components/cursor-effects";
import { HolographicCard } from "@/components/holographic-card";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const skills = {
  frontend: [
    { name: "React.js", level: 90 },
    { name: "Next.js", level: 88 },
    { name: "JavaScript (ES6+)", level: 92 },
    { name: "TypeScript", level: 85 },
    { name: "Tailwind CSS", level: 87 },
    { name: "Material-UI (MUI)", level: 85 },
    { name: "Chakra UI", level: 80 },
    { name: "Framer Motion (Animations)", level: 78 },
    { name: "Redux / Zustand / Context API", level: 80 },
    { name: "Responsive Web Design", level: 90 },
    { name: "Figma (UI/UX Design)", level: 77 },
    { name: "SEO Basics", level: 70 },
  ],
  backend: [
    { name: "Node.js", level: 82 },
    { name: "Express.js", level: 80 },
    { name: "Python", level: 90 },
    { name: "Django", level: 88 },
    { name: "Django REST Framework", level: 85 },
    { name: "Socket.IO", level: 75 },
    { name: "JWT Authentication", level: 80 },
    { name: "RESTful API Design", level: 85 },
    { name: "GraphQL", level: 70 },
    { name: "Prisma ORM", level: 72 },
    { name: "WebSockets", level: 75 },
    { name: "API Integration", level: 85 },
    { name: "CMS (Strapi, Sanity)", level: 70 },
  ],
  database: [
    { name: "PostgreSQL", level: 83 },
    { name: "MongoDB", level: 78 },
    { name: "MySQL", level: 76 },
    { name: "SQL", level: 82 },
    { name: "Firebase (Basic)", level: 75 },
  ],
  tools: [
    { name: "Git & GitHub", level: 92 },
    { name: "Agile / Scrum Methodologies", level: 80 },
    { name: "Project Management Tools (Trello, Jira)", level: 75 },
    { name: "Unit & Integration Testing (Jest, React Testing Library)", level: 72 },
    { name: "Linux / Ubuntu", level: 75 },
    { name: "Software Documentation", level: 78 },
  ],
  softSkills: [
    { name: "Problem Solving", level: 88 },
    { name: "Team Collaboration", level: 85 },
    { name: "Debugging & Testing", level: 82 },
    { name: "Data Structures & Algorithms", level: 80 },
  ],
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen pt-20 pb-10">
      <Smooth3DTime />
      <FuturisticGrid />
      <CursorEffects />

      <div className="container mx-auto px-4 z-10 relative">
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-8 text-center text-cyan-300 font-mono"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ABOUT ME
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Profile Section */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HolographicCard className="mb-6 p-4 bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-xl">
              <div className="relative">
                <motion.div
                  className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-400"
                  animate={{ rotate: [0, 90, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                />
                <motion.div
                  className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-400"
                  animate={{ rotate: [0, -90, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                />
                <motion.div
                  className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-cyan-400"
                  animate={{ rotate: [0, -90, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                />
                <motion.div
                  className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-400"
                  animate={{ rotate: [0, 90, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                />

                <div className="relative">
                  <Image
                    src="https://avatars.githubusercontent.com/u/153545745?v=4"
                    alt="John Doe"
                    width={300}
                    height={300}
                    className="rounded-xl border-2 border-cyan-500/30"
                  />

                  {/* Holographic scan effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 to-transparent"
                    initial={{ top: "0%" }}
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "linear" }}
                    style={{ height: "10px" }}
                  />
                </div>
              </div>
            </HolographicCard>

            <h2 className="text-2xl font-bold text-white mb-2 font-mono">Temesgen Debebe</h2>
            <p className="text-cyan-300 mb-4 font-mono">Software Engineer and Graphics Designer</p>
            <p className="text-cyan-100 mb-4 text-lg">
              I’m <span className="text-cyan-500">Temesgen Debebe</span>, a passionate <span className="text-cyan-500">Software Engineer</span> and <span className="text-cyan-500">Graphics Designer</span> skilled in Website, Mobile, and Desktop App Development. I work with <span className="text-cyan-500">React</span>, <span className="text-cyan-500">Next.js</span>, <span className="text-cyan-500">Node.js</span>, <span className="text-cyan-500">Django</span>, <span className="text-cyan-500">Flutter</span>, and <span className="text-cyan-500">Electron</span>, and create stunning designs using <span className="text-cyan-500">Figma</span> and <span className="text-cyan-500">Photoshop</span>. Focused on building responsive UIs, powerful backends, and creative visuals. Always learning and delivering high-quality solutions.
            </p>

            <div className="flex space-x-3">
              <motion.div whileHover={{ y: -5 }}>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full border-cyan-700 text-cyan-400 hover:bg-cyan-900/20"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ y: -5 }}>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full border-cyan-700 text-cyan-400 hover:bg-cyan-900/20"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ y: -5 }}>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full border-cyan-700 text-cyan-400 hover:bg-cyan-900/20"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ y: -5 }}>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full border-cyan-700 text-cyan-400 hover:bg-cyan-900/20"
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 font-mono">SKILLS</h2>

            {Object.entries(skills).map(([category, skillsList]) => (
              <div key={category} className="mb-8">
                <h3 className="text-xl font-bold text-cyan-300 mb-4 font-mono">{category.toUpperCase()}</h3>
                <div className="grid grid-cols-1 gap-4">
                  {skillsList.map((skill, index) => (
                    <HolographicCard
                      key={skill.name}
                      className="bg-black/40 backdrop-blur-md p-4 rounded-lg border border-cyan-900/50"
                      glowColor={index % 2 === 0 ? "0, 200, 255" : "150, 100, 255"}
                      depth={10}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-white font-mono text-sm">{skill.name}</span>
                        <span className="text-cyan-300 font-mono text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-cyan-950/50 rounded-full h-2.5">
                        <motion.div
                          className="bg-cyan-500 h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.5 + 0.05 * index }}
                          style={{
                            boxShadow: "0 0 10px rgba(0, 200, 255, 0.8)",
                          }}
                        />
                      </div>
                    </HolographicCard>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}