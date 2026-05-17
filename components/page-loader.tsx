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
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          style={{ background: "#F8AA40" }}
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
                rgba(0,0,0,0.08) 2px,
                rgba(0,0,0,0.08) 4px
              )`
            }}
          />

          {/* Grid background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)
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
                className="absolute -inset-12 border border-dark/15 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              
              {/* TGL Diamond Logo — Gold on Black */}
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                  {/* Diamond enclosure */}
                  <rect x="4" y="4" width="72" height="72" rx="4" fill="#000000" />
                  <polygon points="40,6 74,40 40,74 6,40" fill="none" stroke="#F8AA40" strokeWidth="2.5" />
                  {/* T stroke */}
                  <line x1="26" y1="28" x2="40" y2="28" stroke="#F8AA40" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="33" y1="28" x2="33" y2="42" stroke="#F8AA40" strokeWidth="3" strokeLinecap="round"/>
                  {/* G stroke */}
                  <path d="M44 34 Q44 26 52 26 Q58 26 58 31 L53 31" fill="none" stroke="#F8AA40" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="53" y1="31" x2="53" y2="36" stroke="#F8AA40" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="50" y1="36" x2="53" y2="36" stroke="#F8AA40" strokeWidth="2.5" strokeLinecap="round"/>
                  {/* L stroke */}
                  <line x1="26" y1="46" x2="26" y2="56" stroke="#F8AA40" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="26" y1="56" x2="37" y2="56" stroke="#F8AA40" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </motion.div>
            </motion.div>

            <div className="w-64 space-y-2">
              <div className="h-4 border-2 border-dark/30 rounded overflow-hidden relative" style={{ background: "rgba(0,0,0,0.12)" }}>
                {/* Background pattern */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      -45deg,
                      transparent,
                      transparent 5px,
                      rgba(0,0,0,0.15) 5px,
                      rgba(0,0,0,0.15) 10px
                    )`
                  }}
                />
                
                {/* Progress fill */}
                <motion.div
                  className="h-full relative"
                  style={{ width: `${progress}%`, background: "#000000" }}
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                  />
                </motion.div>

                {/* Segment lines */}
                {[20, 40, 60, 80].map(pos => (
                  <div
                    key={pos}
                    className="absolute top-0 bottom-0 w-px bg-dark/30"
                    style={{ left: `${pos}%` }}
                  />
                ))}
              </div>

              {/* Progress text */}
              <div className="flex justify-between items-center">
                <motion.span
                  key={textIndex}
                  className="text-xs text-dark/60 tracking-[2px] uppercase"
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
              className="text-[10px] text-dark/50 tracking-[4px] uppercase"
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
                  className="px-2 py-1 border border-dark/25 text-[9px] text-dark/60 tracking-[2px]"
                  style={{ background: "rgba(0,0,0,0.08)" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  {stat}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="absolute bottom-8 right-8 text-[10px] text-dark/40 font-mono"
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
