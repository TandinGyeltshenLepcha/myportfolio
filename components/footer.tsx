"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SoundWave } from "./game-effects"

const swatches = [
  { color: "#d4b896", name: "Sand" },
  { color: "#a07850", name: "Muted" },
  { color: "#E4663D", name: "Coral" },
  { color: "#4a6a60", name: "Teal" },
  { color: "#fffbe6", name: "Cream" },
]

const stats = [
  { label: "Components Built", value: "40+" },
  { label: "Happy Players", value: "10K+" },
  { label: "Pixels Pushed", value: "999K+" },
]

const secretCodes = ["↑", "↑", "↓", "↓", "←", "→", "←", "→"]

export function Footer() {
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null)
  const [showSecret, setShowSecret] = useState(false)
  const [codeProgress, setCodeProgress] = useState(0)
  const [sessionTime, setSessionTime] = useState(0)

  // Session time counter
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Konami code detector
  useEffect(() => {
    const keyMap: Record<string, string> = {
      ArrowUp: "↑",
      ArrowDown: "↓",
      ArrowLeft: "←",
      ArrowRight: "→"
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = keyMap[e.key]
      if (key && key === secretCodes[codeProgress]) {
        const newProgress = codeProgress + 1
        setCodeProgress(newProgress)
        if (newProgress === secretCodes.length) {
          setShowSecret(true)
          setTimeout(() => setShowSecret(false), 5000)
          setCodeProgress(0)
        }
      } else {
        setCodeProgress(0)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [codeProgress])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <motion.footer 
      className="bg-dark px-10 py-10 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(228,102,61,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(228,102,61,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px"
        }}
      />

      {/* Secret message */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-coral/90 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center text-dark">
              <motion.div 
                className="mb-4 flex justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1 }}
              >
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <rect x="8" y="24" width="48" height="24" rx="4" fill="#1a0800"/>
                  <circle cx="20" cy="36" r="6" fill="#fffbe6"/>
                  <circle cx="44" cy="36" r="6" fill="#fffbe6"/>
                  <rect x="28" y="20" width="8" height="8" rx="2" fill="#1a0800"/>
                </svg>
              </motion.div>
              <div className="font-serif text-3xl font-black">Secret Found!</div>
              <div className="text-sm mt-2">You know your classics.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main footer content */}
      <div className="max-w-[1200px] mx-auto relative z-1">
        {/* Top row */}
        <div className="flex flex-wrap justify-between items-start gap-8 mb-8 pb-8 border-b border-cream/10">
          {/* Logo and tagline */}
          <div>
            <motion.div 
              className="font-serif text-2xl font-black text-cream flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <motion.svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20"
                className="text-coral"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <path d="M10 2L11 8L18 10L11 12L10 18L9 12L2 10L9 8Z" fill="#E4663D"/>
              </motion.svg>
              <span aria-hidden="true">TGL</span>
              <span className="sr-only">Tandin Gyeltshen Lepcha</span>
            </motion.div>
            <p className="text-cream/40 text-sm mt-2 max-w-[200px]">
              Scalable UI systems for AAA games.
            </p>
          </div>

          {/* Mini stats */}
          <div className="flex gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-coral font-serif text-xl font-bold">{stat.value}</div>
                <div className="text-cream/30 text-[9px] tracking-[1px] uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Sound wave */}
          <div className="flex items-center gap-3">
            <SoundWave />
            <span className="text-cream/30 text-[10px] tracking-[1px] uppercase">Now Playing</span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          {/* Session info */}
          <div className="flex items-center gap-4">
            <div className="text-cream/30 text-[10px] tracking-[1px]">
              SESSION: <span className="text-coral font-mono">{formatTime(sessionTime)}</span>
            </div>
            <div className="h-3 w-px bg-cream/20" />
            <motion.div 
              className="flex items-center gap-1.5 text-cream/30 text-[10px]"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              ONLINE
            </motion.div>
          </div>

          {/* Copyright */}
          <div className="font-sans text-[11px] text-cream/30 tracking-[2px] uppercase">
            <span aria-label="Copyright 2026 Tandin Gyeltshen Lepcha">@2026 Tandin Gyeltshen Lepcha</span>
          </div>

          {/* Color swatches */}
          <div className="flex gap-2 items-center">
            <span className="text-cream/30 text-[9px] tracking-[1px] uppercase mr-2">Palette</span>
            {swatches.map((swatch, i) => (
              <motion.div
                key={i}
                className="relative"
                onMouseEnter={() => setHoveredSwatch(i)}
                onMouseLeave={() => setHoveredSwatch(null)}
              >
                <motion.div
                  className="w-4 h-4 rounded-full border border-cream/20 cursor-pointer"
                  style={{ background: swatch.color }}
                  whileHover={{ scale: 1.4, y: -4 }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                />
                <AnimatePresence>
                  {hoveredSwatch === i && (
                    <motion.div
                      className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-cream text-dark px-2 py-1 rounded text-[9px] font-bold whitespace-nowrap"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                    >
                      {swatch.name}
                      <div 
                        className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                        style={{
                          borderLeft: "4px solid transparent",
                          borderRight: "4px solid transparent",
                          borderTop: "4px solid #fffbe6"
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Secret hint - accessible keyboard pattern */}
        <motion.div
          className="mt-6 text-center text-cream/20 text-[9px] tracking-[2px] uppercase flex items-center justify-center gap-1"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          aria-hidden="true"
        >
          <svg className="w-3 h-3" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2L10 8H2L6 2Z" fill="currentColor"/></svg>
          <svg className="w-3 h-3" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2L10 8H2L6 2Z" fill="currentColor"/></svg>
          <svg className="w-3 h-3" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 10L2 4H10L6 10Z" fill="currentColor"/></svg>
          <svg className="w-3 h-3" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 10L2 4H10L6 10Z" fill="currentColor"/></svg>
          <svg className="w-3 h-3" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 6L8 2V10L2 6Z" fill="currentColor"/></svg>
          <svg className="w-3 h-3" viewBox="0 0 12 12" aria-hidden="true"><path d="M10 6L4 10V2L10 6Z" fill="currentColor"/></svg>
          <svg className="w-3 h-3" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 6L8 2V10L2 6Z" fill="currentColor"/></svg>
          <svg className="w-3 h-3" viewBox="0 0 12 12" aria-hidden="true"><path d="M10 6L4 10V2L10 6Z" fill="currentColor"/></svg>
        </motion.div>
      </div>
    </motion.footer>
  )
}
