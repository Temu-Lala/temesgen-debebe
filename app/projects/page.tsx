"use client"

import { motion } from "framer-motion"
import { Smooth3DTime } from "@/components/smooth-3d-time"
import { FuturisticGrid } from "@/components/futuristic-grid"
import { CursorEffects } from "@/components/cursor-effects"
import { HolographicCard } from "@/components/holographic-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: 1,
    title: "Happy Cafe and restaurant",
    description:
      " A website that allows users to view the menu, make reservations, and order food online. Built with Next.js, Tailwind CSS. ",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Food menu", " drinks menu", "Order food online"],
    github: "https://github.com/Temu-Lala/happy",
    demo: "https://happy-seven-mu.vercel.app/",
    color: "0, 200, 255", // Cyan
  },
  {
    id: 2,
    title: "AllDay Cafe and restaurant",
    description:
      " A website that allows users to view the menu, make reservations, and order food online. Built with Next.js, Tailwind CSS. ",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Food menu", " drinks menu", "Order food online"],
    github: "https://github.com/Temu-Lala/happy",
    demo: "https://allday-sable.vercel.app/",
    color: "150, 100, 255", // Purple
  },
  {
    id: 3,
    title: "Hulu General Commissons",
    description:
      " a company that deals with general commissons. Built with Next.js, Tailwind CSS. ",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Detailed Descriptions", " servicess", " its location"],
    github: "https://github.com/Temu-Lala/hulugeneral-commission",
    demo: "https://hulugeneral-commissions.vercel.app/",
    color: "0, 200, 255", // Cyan
  },
  {
    id: 4,
    title: " Communi Tech",
    description:
      " A website that talks about Communi Tech it is a technology company portfolio. Built with Next.js, Tailwind CSS. ",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Detailed Descriptions", " servicess", " its Solutions"],
    github: "https://github.com/Temu-Lala/Communi-Tech",
    demo: "https://www.communipress.com/",
    color: "150, 100, 255", // Purple
  },
  {
    id: 5,
    title: "Hulu Desktop App",
    description:
      " A desktop app that allows  CRM (Customer Relationship Management)  it's  manage customer interactions, users, and communications,  . Built with Electron, , Tailwind CSS.,Django ",
    image: "/placeholder.svg?height=200&width=400",
    tags: [" CRM ", "customer interactions", "Django"],
    github: "https://github.com/Temu-Lala",
    demo: "https://github.com/Temu-Lala",
    color: "0, 200, 255", // Cyan
  },
  {
    id: 6,
    title: "car rental",
    description:
      " car rental website that allows users to view the cars, make reservations, and order cars online. Built with Next.js, Tailwind CSS. ",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["car", "order cars online", " make reservations"],
    github: "#",
    demo: "#",
    color: "150, 100, 255", // Purple
  },
  {
    id: 7,
    title: "Tallent Markets ",
    description:
      " E-commerce works by showing products to customers online, letting them choose what they want to buy, providing a way to pay securely, and then recording and managing their orders so that the seller can ship the products to them. The website handles all these steps using product pages, shopping carts, secure payments, and order management features. using next,js , tailwind css  , framer motions  ",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["Tallent", "sell products", "open your shope "],
    github: "https://talentmarketcom.vercel.app/",
    demo: "https://talentmarketcom.vercel.app/",
    color: "150, 100, 255",
  },
  {
    id: 8,
    title: "Lala Tools ",
    description:
      "LALA ToolKit – A suite of 50+ simple, useful tools | Toggle theme – Instantly switch between light and dark mode | QR Code Generator – Generate QR codes from text or URLs | Barcode Generator – Create barcodes from text or numbers | Calculator – Perform basic math operations | Stopwatch/Timer – Track time with a stopwatch or countdown | Weather Widget – View real-time weather updates | To-Do List – Organize your tasks in a simple list | Color Picker – Pick and copy color codes easily | Password Generator – Generate strong random passwords | Unit Converter – Convert between units like length, weight, etc. | Markdown Previewer – Write and preview Markdown live | Tip Calculator – Calculate tips and split bills | Countdown Timer – Countdown to events and deadlines | Dice Roller – Roll animated virtual dice | Random Quote Generator – Get random inspirational quotes | Pomodoro Timer – Focus using the Pomodoro technique | Image Carousel – Create and preview image slideshows | Drawing Canvas – Draw and sketch on a digital canvas | BMI Calculator – Calculate your Body Mass Index | Dark Mode Toggle – Toggle between light and dark themes | Text Encryption – Encrypt and decrypt text messages | Expense Tracker – Track your income and expenses | Typing Speed Test – Test your typing speed and accuracy | Rock Paper Scissors – Play the classic game digitally | Morse Code Translator – Convert text to/from Morse code | HTML/CSS Playground – Write and see HTML/CSS live | Notes App – Create and organize sticky notes | Pie Chart Generator – Make professional pie charts | File Converter – Convert images and text files | Audio Visualizer – Visualize audio in real time | Fake Telegram Chat – Generate fake Telegram chats | Image to Base64 Converter – Convert images to Base64 format | Excel File Viewer – Open and view Excel files | Calendar Converter – Convert between calendar systems | Text Differencer – Compare two blocks of text | Secure Notes – Write encrypted private notes | Shortcut Keys – View useful Git and app shortcuts | Bg Remover – Remove image backgrounds automatically",
    image: "/placeholder.svg?height=200&width=400",
    tags: ["qr generater ", " Barcode Generator ", "Text Encryption "],
    github: "https://github.com/Temu-Lala/lalatools/",
    demo: "https://lalatools.vercel.app/",
    color: "150, 100, 255",
  },
  {
    id: 9,
    title: "Lala AI ",
    description:
      "**LALA AI** is a personal AI assistant that chats, takes notes, and answers questions based on user context. you can see the screenshots below. It uses advanced AI models to understand and respond to user queries, making it a versatile tool for productivity and information retrieval. LALA AI can be integrated into various applications, providing users with a seamless experience in managing their tasks and accessing information quickly.",
    image: "/lalaai.png?height=200&width=400",
    tags: ["Lala AI", "takes notes", " Code Generations"],
    github: "https://github.com/Temu-Lala/lalatools/",
    demo: "#",
    color: "150, 100, 255", // Purple
  },
];

export default function ProjectsPage() {
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
          PROJECTS
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <HolographicCard
                className="bg-black/40 backdrop-blur-md border border-cyan-900/50 overflow-hidden h-full flex flex-col"
                glowColor={project.color}
                depth={30}
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 z-10"
                    style={{
                      background: `linear-gradient(to bottom, rgba(${project.color}, 0.2) 0%, transparent 100%)`,
                    }}
                  />

                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Scan line effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: "linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.05) 50%)",
                      backgroundSize: "100% 4px",
                      opacity: 0.3,
                    }}
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

                <div className="p-4 flex-grow">
                  <h3 className="text-cyan-300 text-lg font-bold mb-2 font-mono">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-cyan-900/40 text-cyan-200 border border-cyan-500/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between border-t border-cyan-900/30 p-4">
                  <Link href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-cyan-800 text-cyan-300 hover:bg-cyan-900/20">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                  </Link>
                  <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-cyan-800 text-cyan-300 hover:bg-cyan-900/20">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </Button>
                  </Link>
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}