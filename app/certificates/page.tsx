"use client"

import { motion } from "framer-motion";
import { Smooth3DTime } from "@/components/smooth-3d-time";
import { FuturisticGrid } from "@/components/futuristic-grid";
import { CursorEffects } from "@/components/cursor-effects";
import { HolographicCard } from "@/components/holographic-card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";

const certificates = [
  {
    id: 1,
    title: "Cisco Networking Essentials",
    issuer: "Cisco Networking Academy",
    date: "June 2023",
    image: "/assets/cisco.jpg",
    link: "#",
    color: "0, 200, 255", // Cyan
  },
  {
    id: 2,
    title: "Ethio Coders Full Stack Development",
    issuer: "Ethio Coders",
    date: "April 2023",
    image: "/assets/frontend.jpg",
    link: "#",
    color: "150, 100, 255", // Purple
  },
  {
    id: 3,
    title: "Responsive Web Design",
    issuer: "Free Code Camp",
    date: "May 2023",
    image: "/assets/webdesign.jpg",
    link: "#",
    color: "0, 200, 255", // Cyan
  },
  {
    id: 4,
    title: "JavaScript Algorithms and Data Structures",
    issuer: "Free Code Camp",
    date: "August 2023",
    image: "/assets/datas.jpg",
    link: "#",
    color: "150, 100, 255", // Purple
  },
  {
    id: 5,
    title: "Python for Data Science",
    issuer: "IBM Data Science Academy",
    date: "July 2023",
    image: "/assets/datasa.png",
    link: "#",
    color: "0, 200, 255", // Cyan
  },
  {
    id: 6,
    title: "Machine Learning with Python",
    issuer: "Free Code Camp",
    date: "September 2023",
    image: "/assets/ml.jpg",
    link: "#",
    color: "150, 100, 255", // Purple
  },
];

export default function CertificatesPage() {
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
          CERTIFICATES
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <HolographicCard
                className="bg-black/40 backdrop-blur-md border border-cyan-900/50 overflow-hidden h-full flex flex-col"
                glowColor={certificate.color}
                depth={20}
              >
                <div className="relative h-40 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 z-10"
                    style={{
                      background: `linear-gradient(to bottom, rgba(${certificate.color}, 0.2) 0%, transparent 100%)`,
                    }}
                  />

                  <motion.img
                    src={certificate.image}
                    alt={certificate.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 to-transparent"
                    initial={{ top: "0%" }}
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "linear" }}
                    style={{ height: "10px" }}
                  />
                </div>

                <div className="p-4 flex-grow">
                  <h3 className="text-cyan-300 text-lg font-bold mb-1 font-mono">{certificate.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{certificate.issuer}</p>

                  <div className="flex items-center text-cyan-200 text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{certificate.date}</span>
                  </div>
                </div>

                <div className="border-t border-cyan-900/30 p-4">
                  <Button variant="outline" className="w-full border-cyan-800 text-cyan-300 hover:bg-cyan-900/20">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Certificate
                  </Button>
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
