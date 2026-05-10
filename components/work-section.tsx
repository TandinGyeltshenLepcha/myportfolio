"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, useInView } from "framer-motion"

const projects = [
  {
    id: "city-peak",
    title: "City Peak",
    subtitle: "Playable Game Website",
    description: "A casual browser-based game platform designed for quick, relaxing gaming experiences with a compelling storyline.",
    tag: "Game UI/UX",
    tagColor: "#1a7040",
    tagBg: "rgba(39,174,96,0.12)",
    year: "2025",
    span: 2,
    thumbBg: "linear-gradient(135deg, #1a2e28 0%, #2D4A42 100%)",
    accent: "#27ae60",
  },
  {
    id: "hephaestus-gun",
    title: "Hephaestus Gun",
    subtitle: "Myth-Inspired Weapon Design",
    description: "Concept weapon combining mythological craftsmanship with futuristic materials and visual storytelling.",
    tag: "Concept Art",
    tagColor: "#a05010",
    tagBg: "rgba(230,126,34,0.12)",
    year: "2025",
    span: 1,
    thumbBg: "linear-gradient(135deg, #3d1a00 0%, #7a3c00 100%)",
    accent: "#e67e22",
  },
  {
    id: "card-battles",
    title: "Card Battles",
    subtitle: "Strategic Type-Based Gameplay",
    description: "A strategic card game where outcomes hinge on card type interactions — simple to learn, deep to master.",
    tag: "Game Design",
    tagColor: "#8b2010",
    tagBg: "rgba(192,57,43,0.12)",
    year: "2025",
    span: 1,
    thumbBg: "linear-gradient(135deg, #1a0020 0%, #3d0050 100%)",
    accent: "#c0392b",
  },
  {
    id: "card-battles",
    title: "Rock Paper Scissors",
    subtitle: "Browser Mini-Game",
    description: "A polished take on the classic with custom SVG illustrations and snappy game-feel animations.",
    tag: "Mini Game",
    tagColor: "#1a3a5c",
    tagBg: "rgba(74,158,255,0.12)",
    year: "2025",
    span: 2,
    thumbBg: "linear-gradient(135deg, #0d1f3c 0%, #1a3a6b 100%)",
    accent: "#4a9eff",
  },
]

export function WorkSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const router = useRouter()

  return (
    <section
      ref={ref}
      id="work"
      className="bg-cream py-24 relative overflow-hidden"
    >
      <div className="max-w-[1100px] mx-auto px-8">

        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.div
              className="flex items-center gap-4 mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
            >
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted">Selected Work</span>
              <div className="w-16 h-px bg-brown/15" />
            </motion.div>
            <motion.h2
              className="font-serif text-[clamp(30px,3.5vw,46px)] font-black leading-[1.05] text-dark"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              Projects that <span className="text-coral italic">ship.</span>
            </motion.h2>
          </div>
          <motion.button
            className="hidden md:flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] uppercase text-muted hover:text-dark transition-colors"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            View All
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 8H13M13 8L9 4M13 8L9 12"/>
            </svg>
          </motion.button>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.article
              key={`${project.id}-${i}`}
              className={`group bg-white border border-dark/[0.06] rounded-lg overflow-hidden cursor-pointer
                ${project.span === 2 ? "md:col-span-2" : "md:col-span-1"}`}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -4, boxShadow: `0 16px 40px rgba(26,8,0,0.1)` }}
              onClick={() => router.push(`/project/${project.id}`)}
            >
              {/* Thumbnail */}
              <div
                className="h-44 flex items-center justify-center relative overflow-hidden"
                style={{ background: project.thumbBg }}
              >
                <ProjectIcon projectId={project.id} accent={project.accent} />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at center, ${project.accent}15 0%, transparent 70%)` }}
                />
              </div>

              {/* Body */}
              <div className="p-5">
                <span
                  className="inline-block text-[10px] font-medium tracking-[0.1em] uppercase px-2.5 py-1 rounded-full mb-3"
                  style={{ background: project.tagBg, color: project.tagColor }}
                >
                  {project.tag}
                </span>
                <h3 className="font-serif text-[19px] font-bold text-dark mb-1.5">{project.title}</h3>
                <p className="text-[13px] text-muted leading-[1.6] mb-4">{project.description}</p>
                <div className="flex items-center justify-between pt-3.5 border-t border-dark/[0.06]">
                  <span className="text-[11px] font-medium text-muted">{project.year}</span>
                  <motion.div
                    className="w-7 h-7 rounded-full bg-dark flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12"/>
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectIcon({ projectId, accent }: { projectId: string; accent: string }) {
  if (projectId === "city-peak") {
    return (
      <svg width="110" height="85" viewBox="0 0 120 90">
        <rect x="10" y="52" width="14" height="38" rx="2" fill="#2D4A42"/>
        <rect x="28" y="32" width="17" height="58" rx="2" fill="rgba(255,251,230,0.13)"/>
        <rect x="49" y="20" width="21" height="70" rx="2" fill="#2D4A42"/>
        <rect x="74" y="38" width="15" height="52" rx="2" fill="rgba(255,251,230,0.1)"/>
        <rect x="93" y="46" width="13" height="44" rx="2" fill="#2D4A42"/>
        <rect x="54" y="26" width="4" height="4" fill="#E89820"/>
        <rect x="61" y="32" width="3" height="3" fill="#E89820" opacity="0.55"/>
        <rect x="32" y="40" width="4" height="4" fill="rgba(255,251,230,0.35)"/>
      </svg>
    )
  }
  if (projectId === "hephaestus-gun") {
    return (
      <svg width="100" height="80" viewBox="0 0 100 80">
        <g transform="rotate(-35, 50, 40)">
          <ellipse cx="50" cy="40" rx="30" ry="9" fill={`${accent}25`}/>
          <rect x="22" y="35" width="40" height="10" rx="3" fill={accent}/>
          <rect x="58" y="28" width="18" height="8" rx="2" fill="#d35400"/>
          <circle cx="24" cy="53" r="5" fill={`${accent}50`}/>
        </g>
      </svg>
    )
  }
  if (projectId === "card-battles") {
    return (
      <svg width="110" height="80" viewBox="0 0 110 80">
        <rect x="15" y="12" width="44" height="60" rx="5" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
        <rect x="28" y="8" width="44" height="60" rx="5" fill={`${accent}55`} stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
        <rect x="52" y="16" width="44" height="60" rx="5" fill={`${accent}80`} stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
        <text x="68" y="52" fontSize="22" textAnchor="middle" fill="white" fontFamily="serif">♠</text>
      </svg>
    )
  }
  return (
    <svg width="110" height="80" viewBox="0 0 110 80">
      <rect x="20" y="25" width="30" height="40" rx="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      <rect x="42" y="20" width="30" height="40" rx="6" fill={`${accent}60`} stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      <rect x="62" y="28" width="30" height="40" rx="6" fill={`${accent}90`} stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
    </svg>
  )
}
