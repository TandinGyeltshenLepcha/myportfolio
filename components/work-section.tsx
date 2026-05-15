"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"

const projects = [
  {
    id: "city-peak",
    title: "City Peak",
    subtitle: "Playable Game Website",
    description: "A casual browser-based game platform designed for quick, relaxing gaming experiences with a compelling storyline.",
    tag: "Game UI/UX",
    tagColor: "#14532d",
    tagBg: "rgba(20,83,45,0.10)",
    year: "2025",
    thumbBg: "linear-gradient(135deg, #0f2820 0%, #1E3D36 100%)",
    accent: "#f8aa40",
    featured: true,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-05%20131454-e0vTj9ZkLpZ7xRz9jX5Q6g3fJ7w5Y7.png",
    code: "OBJ_01"
  },
  {
    id: "hephaestus-gun",
    title: "Hephaestus Gun",
    subtitle: "Myth-Inspired Weapon Design",
    description: "Concept weapon combining mythological craftsmanship with futuristic materials and visual storytelling.",
    tag: "Concept Art",
    tagColor: "#7c2d12",
    tagBg: "rgba(124,45,18,0.10)",
    year: "2025",
    thumbBg: "linear-gradient(135deg, #2d1000 0%, #5a2a00 100%)",
    accent: "#f8aa40",
    featured: false,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digitalization%20with%20description-chIb4H7RVY0KXCWqqQT5lS0H4Zibmg.png",
    code: "OBJ_02"
  },
  {
    id: "card-battles",
    title: "Card Battles",
    subtitle: "Strategic Type-Based Gameplay",
    description: "A strategic card game where outcomes hinge on card type interactions — simple to learn, deep to master.",
    tag: "Game Design",
    tagColor: "#7c0a02",
    tagBg: "rgba(124,10,2,0.10)",
    year: "2025",
    thumbBg: "linear-gradient(135deg, #160018 0%, #350040 100%)",
    accent: "#f8aa40",
    featured: false,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Property%201%3DGame%20Battle%20Screen%20%28Forest%29%20%281%29%201-WjjGm5aDKTq0ULcHiUrd4s5Z0v0TeR.png",
    code: "OBJ_03"
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
      className="py-24 relative overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--dark) 1px, transparent 1px), linear-gradient(90deg, var(--dark) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-[1100px] mx-auto px-8 relative z-10">

        {/* Section header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <motion.div
              className="flex items-center gap-4 mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
            >
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: "var(--dark)", opacity: 0.6 }}>Selected Work</span>
              <div className="w-16 h-px" style={{ background: "var(--brown)", opacity: 0.15 }} />
            </motion.div>
            <motion.h2
              className="font-serif text-[clamp(30px,3.5vw,46px)] font-black leading-[1.05]"
              style={{ color: "var(--dark)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              Projects that <span className="italic" style={{ color: "var(--dark)" }}>ship.</span>
            </motion.h2>
          </div>
        </div>

        {/* Projects: featured large + two smaller */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Featured project — full width */}
          {projects.filter(p => p.featured).map((project, i) => (
            <ProjectCard key={project.id} project={project} className="md:col-span-2" />
          ))}

          {/* Secondary projects */}
          {projects.filter(p => !p.featured).map((project, i) => (
            <ProjectCard key={project.id} project={project} />
          ))}

        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, className = "" }: { project: any; className?: string }) {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative perspective-1000 ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => router.push(`/project/${project.id}`)}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="bg-white border border-dark/10 overflow-hidden cursor-pointer transition-shadow duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
      >
        <div className={`grid ${project.featured ? "md:grid-cols-2" : "grid-cols-1"}`}>
          {/* Thumbnail with HUD elements */}
          <div className={`relative overflow-hidden bg-dark/5 ${project.featured ? "aspect-square md:aspect-auto" : "aspect-video"}`}>
            {/* HUD Brackets */}
            <div className="absolute inset-4 pointer-events-none z-20 transition-opacity duration-300 group-hover:opacity-100 opacity-40">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-coral" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-coral" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-coral" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-coral" />
            </div>

            {/* Scanning Line */}
            <motion.div 
              className="absolute left-0 right-0 h-[2px] bg-coral/30 z-10 pointer-events-none"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Technical Metadata */}
            <div className="absolute bottom-6 left-6 z-20 font-mono text-[8px] text-coral/60 uppercase tracking-widest pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-coral rounded-full animate-pulse" />
                {project.code} // STABLE_DATA
              </div>
            </div>

            <img 
              src={project.image} 
              alt={project.title}
              className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
              style={{ transform: "translateZ(20px)" }}
            />
            
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at center, ${project.accent}10 0%, transparent 70%)` }}
            />
          </div>

          {/* Body */}
          <div className="p-8 flex flex-col justify-between" style={{ transform: "translateZ(40px)" }}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span
                  className="inline-block text-[10px] font-semibold tracking-[0.12em] uppercase px-3 py-1 bg-dark text-white"
                >
                  {project.tag}
                </span>
                <span className="font-mono text-[10px] text-dark/30">{project.year}</span>
              </div>
              <h3 className="font-serif text-[28px] font-black mb-3 text-dark">{project.title}</h3>
              <p className="text-[14px] leading-[1.7] text-dark/60 font-light">{project.description}</p>
            </div>
            
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-dark/5">
              <div className="flex gap-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-4 h-1 bg-coral/20 group-hover:bg-coral transition-colors" style={{ transitionDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <motion.div
                className="flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-dark"
                whileHover={{ x: 4 }}
              >
                Access Data
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12"/>
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}

function ProjectIcon({ projectId, accent, large = false }: { projectId: string; accent: string; large?: boolean }) {
  const scale = large ? 1.3 : 1
  if (projectId === "city-peak") {
    return (
      <svg width={110 * scale} height={85 * scale} viewBox="0 0 120 90">
        <rect x="10" y="52" width="14" height="38" rx="2" fill="#1E3D36"/>
        <rect x="28" y="32" width="17" height="58" rx="2" fill="rgba(255,251,230,0.13)"/>
        <rect x="49" y="20" width="21" height="70" rx="2" fill="#1E3D36"/>
        <rect x="74" y="38" width="15" height="52" rx="2" fill="rgba(255,251,230,0.1)"/>
        <rect x="93" y="46" width="13" height="44" rx="2" fill="#1E3D36"/>
        <rect x="54" y="26" width="4" height="4" fill="#E89820"/>
        <rect x="61" y="32" width="3" height="3" fill="#E89820" opacity="0.55"/>
        <rect x="32" y="40" width="4" height="4" fill="rgba(255,251,230,0.35)"/>
      </svg>
    )
  }
  if (projectId === "hephaestus-gun") {
    return (
      <svg width={100 * scale} height={80 * scale} viewBox="0 0 100 80">
        <g transform="rotate(-35, 50, 40)">
          <ellipse cx="50" cy="40" rx="30" ry="9" fill={`${accent}25`}/>
          <rect x="22" y="35" width="40" height="10" rx="3" fill={accent}/>
          <rect x="58" y="28" width="18" height="8" rx="2" fill="#8a3a10"/>
          <circle cx="24" cy="53" r="5" fill={`${accent}50`}/>
        </g>
      </svg>
    )
  }
  if (projectId === "card-battles") {
    return (
      <svg width={110 * scale} height={80 * scale} viewBox="0 0 110 80">
        <rect x="15" y="12" width="44" height="60" rx="5" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
        <rect x="28" y="8" width="44" height="60" rx="5" fill={`${accent}55`} stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
        <rect x="52" y="16" width="44" height="60" rx="5" fill={`${accent}80`} stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
        <text x="68" y="52" fontSize="22" textAnchor="middle" fill="white" fontFamily="serif">♠</text>
      </svg>
    )
  }
  return (
    <svg width={110 * scale} height={80 * scale} viewBox="0 0 110 80">
      <rect x="20" y="25" width="30" height="40" rx="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      <rect x="42" y="20" width="30" height="40" rx="6" fill={`${accent}60`} stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      <rect x="62" y="28" width="30" height="40" rx="6" fill={`${accent}90`} stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
    </svg>
  )
}
