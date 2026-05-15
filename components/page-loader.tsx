"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const loadingTexts = [
  "Initializing game assets...",
  "Loading UI components...",
  "Calibrating health bars...",
  "Spawning particles...",
  "Ready to play!"
]

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [textIndex, setTextIndex] = useState(0)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 15
        return next > 100 ? 100 : next
      })
    }, 100)

    const textInterval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % loadingTexts.length)
    }, 400)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2200)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-dark flex items-center justify-center overflow-hidden"
          exit={{ 
            clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Scanlines */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.1) 2px,
                rgba(255,255,255,0.1) 4px
              )`
            }}
          />

          {/* Grid background */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(228,102,61,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(228,102,61,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px"
            }}
          />

          <div className="flex flex-col items-center gap-8 relative z-10">
            {/* Animated logo */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Rotating outer ring */}
              <motion.div
                className="absolute -inset-8 border-2 border-dark/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-12 border border-coral/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Main logo */}
              <div className="font-serif text-5xl font-black text-cream relative">
                <motion.span 
                  className="text-coral inline-block"
                  animate={{ 
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  aria-hidden="true"
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" className="inline-block -mb-1">
                    <path d="M16 4L18 14L28 16L18 18L16 28L14 18L4 16L14 14Z" fill="currentColor"/>
                  </svg>
                </motion.span>{" "}
                <span className="relative">
                  Tandin
                  <motion.span
                    className="absolute inset-0 text-coral"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    aria-hidden="true"
                  >
                    Tandin
                  </motion.span>
                </span>
                <span className="text-coral">.TGL</span>
              </div>
            </motion.div>

            {/* Power bar style loading */}
            <div className="w-64 space-y-2">
              <div className="h-4 bg-dark border-2 border-dark/30 rounded overflow-hidden relative">
                {/* Background pattern */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      -45deg,
                      transparent,
                      transparent 5px,
                      rgba(228,102,61,0.3) 5px,
                      rgba(228,102,61,0.3) 10px
                    )`
                  }}
                />
                
                {/* Progress fill */}
                <motion.div
                  className="h-full bg-amber relative"
                  style={{ width: `${progress}%` }}
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                  />
                </motion.div>

                {/* Segment lines */}
                {[20, 40, 60, 80].map(pos => (
                  <div
                    key={pos}
                    className="absolute top-0 bottom-0 w-px bg-dark/50"
                    style={{ left: `${pos}%` }}
                  />
                ))}
              </div>

              {/* Progress text */}
              <div className="flex justify-between items-center">
                <motion.span
                  key={textIndex}
                  className="text-xs text-cream/60 tracking-[2px] uppercase"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {loadingTexts[textIndex]}
                </motion.span>
                <span className="text-xs text-dark font-mono font-bold">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            {/* Press any key hint */}
            <motion.div
              className="text-[10px] text-cream/40 tracking-[4px] uppercase"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading Experience
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-8 left-8 flex gap-2">
              {["HP", "MP", "XP"].map((stat, i) => (
                <motion.div
                  key={stat}
                  className="px-2 py-1 bg-dark border border-dark/20 text-[9px] text-dark/50 tracking-[2px]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  {stat}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="absolute bottom-8 right-8 text-[10px] text-cream/30 font-mono"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              v2.0.24
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
