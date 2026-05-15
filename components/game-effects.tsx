"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"

// Scanlines overlay - CRT monitor effect
export function Scanlines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.3) 2px,
            rgba(0,0,0,0.3) 4px
          )`
        }}
      />
      {/* Subtle vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(26,8,0,0.15) 100%)`
        }}
      />
    </div>
  )
}

// Click spark/explosion effect
let sparkIdCounter = 0
export function ClickSparks() {
  const [sparks, setSparks] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = ++sparkIdCounter
      setSparks(prev => [...prev, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => {
        setSparks(prev => prev.filter(s => s.id !== id))
      }, 600)
    }

    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[9990]">
      <AnimatePresence>
        {sparks.map(spark => (
          <SparkBurst key={spark.id} x={spark.x} y={spark.y} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function SparkBurst({ x, y }: { x: number; y: number }) {
  // Use deterministic values based on index to avoid hydration issues
  const particles = Array.from({ length: 8 }, (_, i) => ({
    angle: (i * 45) * (Math.PI / 180),
    distance: 30 + ((i * 7) % 20),
    size: 3 + ((i * 3) % 4)
  }))

  return (
    <>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber"
          style={{
            left: x,
            top: y,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ scale: 1, opacity: 1, x: 0, y: 0 }}
          animate={{
            x: Math.cos(particle.angle) * particle.distance,
            y: Math.sin(particle.angle) * particle.distance,
            scale: 0,
            opacity: 0
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      ))}
      {/* Center flash */}
      <motion.div
        className="absolute rounded-full bg-amber"
        style={{ left: x - 10, top: y - 10 }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </>
  )
}

// Glitch text component
export function GlitchText({ 
  children, 
  className = "" 
}: { 
  children: string
  className?: string 
}) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 3000 + Math.random() * 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      {isGlitching && (
        <>
          <span 
            className="absolute inset-0 text-[#ff0000] z-20 opacity-70"
            style={{ 
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
              transform: "translate(-2px, 0)"
            }}
          >
            {children}
          </span>
          <span 
            className="absolute inset-0 text-[#00ffff] z-20 opacity-70"
            style={{ 
              clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
              transform: "translate(2px, 0)"
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  )
}

// Achievement popup
interface Achievement {
  id: number
  title: string
  description: string
  icon: string
}

let achievementIdCounter = 0
export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  
  const unlock = useCallback((title: string, description: string, icon: string = "trophy") => {
    const id = ++achievementIdCounter
    setAchievements(prev => [...prev, { id, title, description, icon }])
    setTimeout(() => {
      setAchievements(prev => prev.filter(a => a.id !== id))
    }, 4000)
  }, [])

  return { achievements, unlock }
}

export function AchievementPopups({ achievements }: { achievements: Achievement[] }) {
  return (
    <div className="fixed top-20 right-6 z-[9995] flex flex-col gap-3">
      <AnimatePresence>
        {achievements.map(achievement => (
          <motion.div
            key={achievement.id}
            className="bg-dark text-cream px-4 py-3 rounded border-l-4 border-amber shadow-lg flex items-center gap-3 min-w-[280px]"
            initial={{ x: 300, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 300, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <span className="text-2xl">{achievement.icon}</span>
            <div>
              <div className="text-[10px] tracking-[2px] uppercase text-amber mb-0.5">Achievement Unlocked</div>
              <div className="font-serif font-bold text-sm">{achievement.title}</div>
              <div className="text-xs text-cream/60">{achievement.description}</div>
            </div>
            {/* XP bar animation */}
            <motion.div 
              className="absolute bottom-0 left-0 h-0.5 bg-amber/50"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 4, ease: "linear" }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// Screen shake hook
export function useScreenShake() {
  const controls = useAnimation()
  
  const shake = useCallback(() => {
    controls.start({
      x: [0, -5, 5, -5, 5, 0],
      y: [0, 3, -3, 3, -3, 0],
      transition: { duration: 0.4 }
    })
  }, [controls])

  return { controls, shake }
}

// Power/XP bar with animation
export function PowerBar({ 
  value, 
  max, 
  color = "#E4663D",
  label,
  showPulse = true
}: { 
  value: number
  max: number
  color?: string
  label?: string
  showPulse?: boolean
}) {
  const percentage = (value / max) * 100

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1 text-[10px] tracking-[1px] uppercase text-brown/80">
          <span>{label}</span>
          <span>{value}/{max}</span>
        </div>
      )}
      <div className="h-3 bg-dark/20 rounded-full overflow-hidden border border-brown/20 relative">
        <motion.div
          className="h-full rounded-full relative"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {showPulse && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: color }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.div>
        {/* Tick marks */}
        {[25, 50, 75].map(tick => (
          <div
            key={tick}
            className="absolute top-0 bottom-0 w-px bg-dark/30"
            style={{ left: `${tick}%` }}
          />
        ))}
      </div>
    </div>
  )
}

// Skill icon mapping
const skillIcons: Record<string, React.ReactNode> = {
  design: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  react: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(0 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)"/>
    </svg>
  ),
  gameui: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
      <circle cx="8" cy="12" r="2" fill="currentColor"/>
      <path d="M14 10H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 14H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  scalable: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 7V13M7 10H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  mobile: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="2"/>
      <line x1="12" y1="18" x2="12" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  animation: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="16" r="1" fill="currentColor"/>
    </svg>
  ),
}

// Animated skill node
export function SkillNode({ 
  icon, 
  label, 
  unlocked, 
  onClick,
  connectedTo = [],
  color,
  inProgress = false,
  progressLevel = 0
}: { 
  icon: string
  label: string
  unlocked: boolean
  onClick?: () => void
  connectedTo?: string[]
  color?: string
  inProgress?: boolean
  progressLevel?: number
}) {
  const iconElement = skillIcons[icon] || <span className="font-bold text-lg">{icon}</span>
  
  return (
    <motion.button
      className={`relative w-14 h-14 rounded-full border-2 flex items-center justify-center
        ${unlocked 
          ? "border-amber text-cream shadow-[0_0_20px_rgba(228,102,61,0.5)]" 
          : inProgress 
            ? "bg-dark/30 border-amber/50 text-dark/70 overflow-hidden"
            : "bg-dark/20 border-brown/40 text-brown/40 overflow-hidden"
        }`}
      style={unlocked ? { backgroundColor: color || "#E4663D" } : undefined}
      whileHover={unlocked ? { scale: 1.1, boxShadow: "0 0 30px rgba(228,102,61,0.8)" } : { scale: 1.05 }}
      whileTap={unlocked ? { scale: 0.95 } : { scale: 0.98 }}
      onClick={onClick}
      data-cursor={unlocked ? label.toLowerCase() : inProgress ? "in-progress" : "locked"}
    >
      {iconElement}
      {unlocked && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-amber"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      {/* In progress XP bar effect */}
      {!unlocked && inProgress && (
        <>
          {/* Circular progress indicator */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="rgba(228,102,61,0.2)"
              strokeWidth="3"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="#E4663D"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={163}
              initial={{ strokeDashoffset: 163 }}
              animate={{ strokeDashoffset: 163 - (163 * progressLevel / 100) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          {/* Pulsing glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ 
              boxShadow: [
                "0 0 5px rgba(228,102,61,0.3)",
                "0 0 15px rgba(228,102,61,0.5)",
                "0 0 5px rgba(228,102,61,0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* XP text */}
          <motion.div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] text-dark font-bold whitespace-nowrap"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {progressLevel}% XP
          </motion.div>
        </>
      )}
      {/* Locked shimmer effect */}
      {!unlocked && !inProgress && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-coral/20 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      )}
      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] tracking-[1px] uppercase whitespace-nowrap text-brown">
        {label}
      </span>
      {/* Lock indicator - only for fully locked */}
      {!unlocked && !inProgress && (
        <motion.div 
          className="absolute -top-1 -right-1 w-4 h-4 bg-dark rounded-full flex items-center justify-center border border-brown/40"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" className="text-brown/60">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </motion.div>
      )}
    </motion.button>
  )
}

// Combo counter
export function ComboCounter({ count }: { count: number }) {
  return (
    <AnimatePresence mode="wait">
      {count > 1 && (
        <motion.div
          key={count}
          className="fixed top-1/2 right-12 -translate-y-1/2 text-right"
          initial={{ x: 50, opacity: 0, scale: 0.5 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -50, opacity: 0, scale: 1.5 }}
        >
          <div className="font-serif text-6xl font-black text-dark drop-shadow-lg">
            {count}x
          </div>
          <div className="text-xs tracking-[4px] uppercase text-dark/60">Combo</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Sound wave visualizer (decorative)
export function SoundWave({ className = "" }: { className?: string }) {
  const bars = 12

  return (
    <div className={`flex items-end gap-0.5 h-8 ${className}`}>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-amber/60 rounded-t"
          animate={{
            height: [8, 20 + Math.random() * 12, 8],
          }}
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.05
          }}
        />
      ))}
    </div>
  )
}

// Radar sweep animation
export function RadarSweep({ size = 100 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Circles */}
      {[1, 0.66, 0.33].map((scale, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border border-teal/30"
          style={{ transform: `scale(${scale})` }}
        />
      ))}
      {/* Sweep */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left"
          style={{
            background: "linear-gradient(90deg, #4a6a60 0%, transparent 100%)"
          }}
        />
      </motion.div>
      {/* Blips */}
      {[
        { x: 30, y: 20 },
        { x: 60, y: 45 },
        { x: 25, y: 70 },
      ].map((blip, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-teal rounded-full"
          style={{ left: `${blip.x}%`, top: `${blip.y}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
        />
      ))}
    </div>
  )
}

// Floating damage numbers
export function DamageNumber({ 
  value, 
  x, 
  y, 
  critical = false 
}: { 
  value: number
  x: number
  y: number
  critical?: boolean
}) {
  return (
    <motion.div
      className={`fixed pointer-events-none font-serif font-black ${critical ? "text-dark text-3xl" : "text-dark text-xl"}`}
      style={{ left: x, top: y }}
      initial={{ opacity: 1, y: 0, scale: critical ? 1.5 : 1 }}
      animate={{ opacity: 0, y: -50, scale: critical ? 2 : 1.2 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {critical && "CRIT! "}
      -{value}
    </motion.div>
  )
}

// Loading spinner - game style
export function GameSpinner() {
  return (
    <div className="relative w-12 h-12">
      <motion.div
        className="absolute inset-0 border-3 border-amber/30 rounded-full"
      />
      <motion.div
        className="absolute inset-0 border-3 border-transparent border-t-coral rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-2 border-2 border-transparent border-b-teal rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

// Tooltip with game styling - fixed to not cause cursor jumping
export function GameTooltip({ 
  children, 
  content,
  position = "top"
}: { 
  children: React.ReactNode
  content: React.ReactNode
  position?: "top" | "bottom" | "left" | "right"
}) {
  const [isVisible, setIsVisible] = useState(false)

  const positionStyles: Record<string, React.CSSProperties> = {
    top: { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "8px" },
    bottom: { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: "8px" },
    left: { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: "8px" },
    right: { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: "8px" },
  }

  return (
    <span 
      className="relative inline"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.span
            className="absolute z-50 pointer-events-none"
            style={positionStyles[position]}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <span className="bg-dark text-cream text-xs px-3 py-2 rounded border border-amber/40 shadow-lg whitespace-nowrap block">
              {content}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

// Keyboard key visual
export function KeyboardKey({ char, pressed = false }: { char: string; pressed?: boolean }) {
  const isLongKey = char.length > 2
  return (
    <motion.div
      className={`inline-flex items-center justify-center h-7 rounded border-2 font-mono text-[10px] font-bold
        ${isLongKey ? "px-2 min-w-[45px]" : "w-7"}
        ${pressed 
          ? "bg-amber border-amber text-cream translate-y-0.5" 
          : "bg-cream border-brown/40 text-dark shadow-[0_2px_0_#7a3c00]"
        }`}
      animate={pressed ? { y: 2, boxShadow: "none" } : { y: 0 }}
    >
      {char}
    </motion.div>
  )
}

// Level indicator
export function LevelBadge({ level }: { level: number }) {
  return (
    <motion.div
      className="relative inline-flex items-center justify-center w-12 h-12"
      whileHover={{ scale: 1.1 }}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0">
        <polygon
          points="24,2 44,14 44,34 24,46 4,34 4,14"
          fill="#1a0800"
          stroke="#E4663D"
          strokeWidth="2"
        />
      </svg>
      <span className="relative font-serif font-black text-cream text-lg">{level}</span>
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber text-cream text-[8px] font-bold flex items-center justify-center"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        LV
      </motion.div>
    </motion.div>
  )
}
