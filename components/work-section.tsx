"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { WavesSvg } from "./svg-components"
import { PowerBar } from "./game-effects"

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  tag: string
  tagColor: string
  tagBg: string
  year: string
  rotation: number
  hoverShadow: string
  icon: React.ReactNode
  difficulty: number
  rarity: "rare" | "epic" | "legendary"
}

const rarityColors = {
  rare: { bg: "#4a9eff", text: "#2563eb", glow: "rgba(74, 158, 255, 0.5)" },
  epic: { bg: "#9c27b0", text: "#7b1fa2", glow: "rgba(156, 39, 176, 0.5)" },
  legendary: { bg: "#ff9800", text: "#f57c00", glow: "rgba(255, 152, 0, 0.5)" }
}

const projects: Project[] = [
  {
    id: "city-peak",
    title: "City Peak",
    subtitle: "Playable Game Website",
    description: "A casual browser-based game platform designed for quick, relaxing gaming experiences with compelling storyline.",
    tag: "Game UI/UX",
    tagColor: "#27ae60",
    tagBg: "rgba(39,174,96,.15)",
    year: "2025",
    rotation: -1.8,
    hoverShadow: "8px 8px 0 #27ae60",
    icon: <CityPeakIcon />,
    difficulty: 90,
    rarity: "legendary"
  },
  {
    id: "hephaestus-gun",
    title: "Hephaestus Gun",
    subtitle: "Myth-Inspired Weapon Design",
    description: "A concept weapon design combining mythological craftsmanship with futuristic materials and visual storytelling.",
    tag: "Concept Art",
    tagColor: "#e67e22",
    tagBg: "rgba(230,126,34,.15)",
    year: "2025",
    rotation: 1.2,
    hoverShadow: "8px 8px 0 #e67e22",
    icon: <HephaestusIcon />,
    difficulty: 85,
    rarity: "epic"
  },
  {
    id: "card-battles",
    title: "Card Battles",
    subtitle: "Strategic Type-Based Gameplay",
    description: "A strategic card game where outcomes are determined by card types and their interactions, balancing simplicity with strategy.",
    tag: "Game Design",
    tagColor: "#c0392b",
    tagBg: "rgba(192,57,43,.15)",
    year: "2025",
    rotation: -0.7,
    hoverShadow: "8px 8px 0 #c0392b",
    icon: <CardBattlesIcon />,
    difficulty: 80,
    rarity: "rare"
  },
]

// Animated project icons
function CityPeakIcon() {
  return (
    <motion.svg
      width="120"
      height="100"
      viewBox="0 0 120 100"
      className="drop-shadow-lg"
    >
      {/* City skyline */}
      <motion.rect
        x="10" y="50" width="15" height="40" rx="2"
        fill="#2D4A42"
        initial={{ height: 0, y: 90 }}
        animate={{ height: 40, y: 50 }}
        transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
      />
      <motion.rect
        x="28" y="35" width="18" height="55" rx="2"
        fill="#1a0800"
        initial={{ height: 0, y: 90 }}
        animate={{ height: 55, y: 35 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
      />
      <motion.rect
        x="50" y="20" width="20" height="70" rx="2"
        fill="#C94A26"
        initial={{ height: 0, y: 90 }}
        animate={{ height: 70, y: 20 }}
        transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
      />
      <motion.rect
        x="75" y="40" width="15" height="50" rx="2"
        fill="#2D4A42"
        initial={{ height: 0, y: 90 }}
        animate={{ height: 50, y: 40 }}
        transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
      />
      <motion.rect
        x="95" y="55" width="15" height="35" rx="2"
        fill="#1a0800"
        initial={{ height: 0, y: 90 }}
        animate={{ height: 35, y: 55 }}
        transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
      />
      
      {/* Sun */}
      <motion.circle
        cx="100" cy="15" r="8"
        fill="#E89820"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [1, 0.8, 1]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Windows */}
      {[52, 56, 60, 64].map((y, i) => (
        <motion.rect
          key={i}
          x="54" y={y} width="4" height="3"
          fill="#E89820"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </motion.svg>
  )
}

function HephaestusIcon() {
  return (
    <motion.svg
      width="120"
      height="100"
      viewBox="0 0 120 100"
      className="drop-shadow-lg"
    >
      {/* Gun body */}
      <motion.path
        d="M20 50 L80 50 L90 45 L100 50 L100 60 L90 65 L80 60 L20 60 Z"
        fill="#5C2D00"
        stroke="#E89820"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Handle */}
      <motion.path
        d="M30 60 L35 85 L50 85 L45 60 Z"
        fill="#3d2a1c"
        stroke="#1a0800"
        strokeWidth="1"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
      
      {/* Gem core */}
      <motion.circle
        cx="60" cy="55"
        r="8"
        fill="#9c27b0"
        animate={{ 
          boxShadow: ["0 0 10px #9c27b0", "0 0 20px #9c27b0", "0 0 10px #9c27b0"],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle
        cx="60" cy="55"
        r="12"
        fill="none"
        stroke="#9c27b0"
        strokeWidth="1"
        strokeOpacity="0.5"
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      
      {/* Barrel details */}
      <motion.rect
        x="85" y="47"
        width="12" height="16"
        fill="none"
        stroke="#E89820"
        strokeWidth="1"
        strokeDasharray="2 2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      />
      
      {/* Flame from forge */}
      <motion.path
        d="M5 70 Q10 50 15 70 Q20 40 25 70"
        fill="none"
        stroke="#e67e22"
        strokeWidth="3"
        animate={{ 
          d: [
            "M5 70 Q10 50 15 70 Q20 40 25 70",
            "M5 70 Q10 45 15 70 Q20 35 25 70",
            "M5 70 Q10 50 15 70 Q20 40 25 70"
          ],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </motion.svg>
  )
}

function CardBattlesIcon() {
  return (
    <motion.svg
      width="120"
      height="100"
      viewBox="0 0 120 100"
      className="drop-shadow-lg"
    >
      {/* Back card */}
      <motion.rect
        x="25" y="15"
        width="45" height="65"
        rx="4"
        fill="#2D4A42"
        stroke="#1a0800"
        strokeWidth="2"
        initial={{ rotate: -15, x: -20 }}
        animate={{ rotate: -15, x: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      />
      
      {/* Middle card */}
      <motion.rect
        x="40" y="15"
        width="45" height="65"
        rx="4"
        fill="#E89820"
        stroke="#1a0800"
        strokeWidth="2"
        initial={{ rotate: 0, scale: 0.8 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
      />
      
      {/* Front card */}
      <motion.g
        initial={{ rotate: 15, x: 20 }}
        animate={{ rotate: 15, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
      >
        <rect
          x="55" y="15"
          width="45" height="65"
          rx="4"
          fill="#C94A26"
          stroke="#1a0800"
          strokeWidth="2"
        />
        {/* Card symbol */}
        <motion.path
          d="M77 35 L85 50 L77 65 L69 50 Z"
          fill="#fffbe6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.g>
      
      {/* Battle sparks */}
      {[0, 1, 2].map(i => (
        <motion.circle
          key={i}
          cx={60 + i * 10}
          cy={85}
          r="3"
          fill="#ff9800"
          animate={{ 
            y: [0, -10, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            delay: i * 0.2 
          }}
        />
      ))}
    </motion.svg>
  )
}

function ProjectCard({ 
  project, 
  index
}: { 
  project: Project
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => router.push(`/project/${project.id}`)}
    >
      <motion.div
        className="bg-cream p-3 pb-6 flex flex-col group cursor-pointer relative overflow-hidden"
        data-cursor="view"
        initial={{ opacity: 0, y: 80, rotate: project.rotation * 2 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0, 
          rotate: project.rotation,
          boxShadow: "4px 4px 0 rgba(122,60,0,.6)"
        } : {}}
        whileHover={{ 
          rotate: 0, 
          scale: 1.03,
          boxShadow: project.hoverShadow,
          y: -12
        }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.15,
          type: "spring",
          stiffness: 200
        }}
      >
        {/* Rarity indicator with glow */}
        <motion.div
          className="absolute top-3 right-3 px-2.5 py-1 text-[9px] font-bold tracking-[1px] uppercase rounded z-20"
          style={{ 
            background: rarityColors[project.rarity].bg,
            color: "white",
            boxShadow: `0 0 15px ${rarityColors[project.rarity].glow}`
          }}
          initial={{ scale: 0, rotate: 0 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.4, type: "spring" }}
          whileHover={{ scale: 1.1 }}
        >
          {project.rarity}
        </motion.div>

        {/* Browser chrome bar */}
        <div className="bg-amber p-2 flex gap-2 items-center rounded-t border-b border-brown/15 relative">
          <motion.div 
            className="w-2.5 h-2.5 rounded-full bg-[#e74c3c]" 
            whileHover={{ scale: 1.4 }}
          />
          <motion.div 
            className="w-2.5 h-2.5 rounded-full bg-[#f39c12]"
            whileHover={{ scale: 1.4 }}
          />
          <motion.div 
            className="w-2.5 h-2.5 rounded-full bg-[#2ecc71]"
            whileHover={{ scale: 1.4 }}
          />
          <div className="ml-2 h-2.5 flex-1 bg-brown/10 rounded" />
          
          {/* Hover label */}
          <AnimatePresence>
            {isHovered && (
              <motion.span
                className="text-[9px] tracking-[2px] uppercase text-coral font-bold"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                View Project
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Preview area with icon */}
        <div className="bg-amber/25 p-6 min-h-[180px] border border-brown/10 flex items-center justify-center overflow-hidden relative">
          {/* Animated background grid */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(to right, #1a0800 1px, transparent 1px),
                               linear-gradient(to bottom, #1a0800 1px, transparent 1px)`,
              backgroundSize: "20px 20px"
            }}
          />
          
          {/* Scan line effect on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-coral/60 to-transparent"
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Project icon */}
          <motion.div
            animate={isHovered ? { scale: 1.08, y: -5 } : { scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.icon}
          </motion.div>
          
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-coral/30" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-coral/30" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-coral/30" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-coral/30" />
        </div>

        {/* Meta */}
        <div className="px-2 pt-4">
          <div className="flex justify-between items-center">
            <motion.span 
              className="text-[10px] px-3 py-1 rounded-full tracking-[1px] uppercase font-medium"
              style={{ 
                background: project.tagBg, 
                color: project.tagColor,
                border: `1px solid ${project.tagColor}40`
              }}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              {project.tag}
            </motion.span>
            <span className="text-[10px] text-muted tracking-[1px]">{project.year}</span>
          </div>
          
          <h3 className="font-serif text-xl font-bold text-dark mt-3 mb-1">{project.title}</h3>
          <p className="text-[11px] text-coral tracking-[1px] uppercase mb-2">{project.subtitle}</p>
          
          {/* Complexity bar */}
          <div className="mt-3 mb-2">
            <PowerBar 
              value={project.difficulty} 
              max={100} 
              color={project.tagColor}
              label="Complexity"
              showPulse={isHovered}
            />
          </div>

          {/* Description appears on hover */}
          <motion.p 
            className="font-sans text-xs text-brown leading-relaxed overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={isHovered ? { height: "auto", opacity: 1, marginTop: 12 } : { height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.description}
          </motion.p>
        </div>

        {/* Interactive border glow */}
        <motion.div
          className="absolute inset-0 rounded pointer-events-none"
          style={{ 
            border: `2px solid ${project.tagColor}`,
            opacity: isHovered ? 1 : 0
          }}
          animate={isHovered ? { 
            boxShadow: `0 0 25px ${project.tagColor}50, inset 0 0 25px ${project.tagColor}15`
          } : {}}
          transition={{ duration: 0.3 }}
        />
        
        {/* Click prompt */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute bottom-3 right-3 flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-dark flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3L9 7L5 11" stroke="#fffbe6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export function WorkSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" })

  return (
    <>
      <section id="work" className="bg-amber py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-brown/20" />
        
        {/* Decorative floating elements */}
        <motion.div
          className="absolute top-20 left-10 opacity-20"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <svg width="50" height="50" viewBox="0 0 50 50">
            <polygon points="25,5 45,20 40,45 10,45 5,20" fill="#C94A26" opacity="0.6"/>
          </svg>
        </motion.div>
        <motion.div
          className="absolute bottom-40 right-20 opacity-20"
          animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="15" fill="none" stroke="#2D4A42" strokeWidth="3"/>
            <circle cx="20" cy="20" r="8" fill="#2D4A42" opacity="0.5"/>
          </svg>
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/4 opacity-10"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100">
            <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="#E89820"/>
          </svg>
        </motion.div>
        
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          {/* Header */}
          <motion.div 
            ref={headerRef}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="text-[11px] tracking-[5px] uppercase text-coral font-medium mb-4 flex items-center justify-center gap-3"
              initial={{ opacity: 0, y: -20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <motion.svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <path d="M7 0L8.5 5L14 7L8.5 9L7 14L5.5 9L0 7L5.5 5Z" fill="#C94A26"/>
              </motion.svg>
              Featured Projects
              <motion.svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <path d="M7 0L8.5 5L14 7L8.5 9L7 14L5.5 9L0 7L5.5 5Z" fill="#C94A26"/>
              </motion.svg>
            </motion.span>
            <h2 className="font-serif text-[clamp(32px,5vw,56px)] font-black text-dark mb-4">
              <motion.span
                initial={{ opacity: 0 }}
                animate={isHeaderInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
              >
                Select Your
              </motion.span>
              <br />
              <motion.em 
                className="text-coral"
                initial={{ opacity: 0 }}
                animate={isHeaderInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                Quest
              </motion.em>
            </h2>
            <motion.p
              className="text-brown/70 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={isHeaderInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              Click on a project card to explore the full case study
            </motion.p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            layout
          >
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          </motion.div>
        </div>

        {/* Waves decoration */}
        <div className="flex justify-end px-10 pt-12">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <WavesSvg flip />
          </motion.div>
        </div>
      </section>

    </>
  )
}
