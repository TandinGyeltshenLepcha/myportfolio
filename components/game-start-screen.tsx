"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`"

function GlitchyText({ text, isActive }: { text: string; isActive: boolean }) {
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    if (!isActive) {
      setDisplayText(text)
      return
    }

    const interval = setInterval(() => {
      setDisplayText(prev =>
        text
          .split("")
          .map((char, i) =>
            Math.random() > 0.7 && char !== " "
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : char
          )
          .join("")
      )
    }, 50)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setDisplayText(text)
    }, 500)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [text, isActive])

  return <span>{displayText}</span>
}

export function GameStartScreen({ onStart }: { onStart: () => void }) {
  const [isVisible, setIsVisible] = useState(true)
  const [isGlitching, setIsGlitching] = useState(false)
  const [pressedKey, setPressedKey] = useState<string | null>(null)
  const [hoverStart, setHoverStart] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [bootSequence, setBootSequence] = useState<string[]>([])

  // Boot sequence messages
  const bootMessages = [
    "Initializing UI Engine...",
    "Loading component library...",
    "Calibrating design systems...",
    "Spawning particles...",
    "Compiling shaders...",
    "System ready."
  ]

  // Loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsLoaded(true)
          return 100
        }
        return prev + Math.random() * 8
      })
    }, 80)

    return () => clearInterval(interval)
  }, [])

  // Boot sequence
  useEffect(() => {
    bootMessages.forEach((msg, i) => {
      setTimeout(() => {
        setBootSequence(prev => [...prev, msg])
      }, i * 300)
    })
  }, [])

  // Keyboard handling
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    setPressedKey(e.key.toUpperCase())
    if ((e.key === "Enter" || e.key === " ") && isLoaded) {
      setIsGlitching(true)
      setTimeout(() => {
        setIsVisible(false)
        setTimeout(onStart, 600)
      }, 400)
    }
  }, [isLoaded, onStart])

  const handleKeyUp = useCallback(() => {
    setPressedKey(null)
  }, [])

  // Mouse click anywhere on loading screen triggers start
  const handleScreenClick = useCallback(() => {
    if (!isLoaded) return
    setIsGlitching(true)
    setTimeout(() => {
      setIsVisible(false)
      setTimeout(onStart, 600)
    }, 400)
  }, [isLoaded, onStart])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  const handleStart = () => {
    if (!isLoaded) return
    setIsGlitching(true)
    setTimeout(() => {
      setIsVisible(false)
      setTimeout(onStart, 600)
    }, 400)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-dark flex items-center justify-center overflow-hidden"
          onClick={handleScreenClick}
          style={{ cursor: isLoaded ? "pointer" : "wait" }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Animated grid background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(248,170,64,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(248,170,64,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* 3D Perspective Grid Floor */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[40%] overflow-hidden"
            style={{
              perspective: "500px",
              perspectiveOrigin: "center top",
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                transform: "rotateX(75deg)",
                transformOrigin: "top center",
                backgroundImage: `
                  linear-gradient(rgba(248,170,64,0.4) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(248,170,64,0.4) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
              animate={{
                backgroundPositionY: ["0px", "60px"],
              }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            {/* Horizon glow */}
            <div
              className="absolute top-0 left-0 right-0 h-32"
              style={{
                background: "linear-gradient(to bottom, rgba(248,170,64,0.3) 0%, transparent 100%)",
              }}
            />
          </div>

          {/* Floating 3D shapes */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Rotating cube outline */}
            <motion.div
              className="absolute top-[15%] left-[15%] w-20 h-20"
              style={{ perspective: "200px" }}
              animate={{ rotateY: 360, rotateX: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="w-full h-full border-2 border-amber/40"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(45deg) rotateZ(45deg)",
                }}
              />
            </motion.div>

            {/* Floating diamond */}
            <motion.div
              className="absolute top-[20%] right-[20%]"
              animate={{
                y: [0, -30, 0],
                rotateZ: [0, 180, 360],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40">
                <polygon
                  points="20,0 40,20 20,40 0,20"
                  fill="none"
                  stroke="#4a6a60"
                  strokeWidth="2"
                />
                <polygon
                  points="20,5 35,20 20,35 5,20"
                  fill="rgba(74,106,96,0.2)"
                  stroke="#4a6a60"
                  strokeWidth="1"
                />
              </svg>
            </motion.div>

            {/* Floating triangles */}
            {[
              { x: "10%", y: "60%", delay: 0, size: 30 },
              { x: "85%", y: "40%", delay: 2, size: 25 },
              { x: "70%", y: "70%", delay: 1, size: 35 },
            ].map((tri, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: tri.x, top: tri.y }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: tri.delay,
                  ease: "easeInOut",
                }}
              >
                <svg width={tri.size} height={tri.size} viewBox="0 0 30 30">
                  <polygon
                    points="15,0 30,30 0,30"
                    fill="none"
                    stroke="#f8aa40"
                    strokeWidth="1.5"
                  />
                </svg>
              </motion.div>
            ))}

            {/* Orbiting circles */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="relative w-[500px] h-[500px]">
                {[0, 120, 240].map((angle, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-coral/40"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `rotate(${angle}deg) translateX(250px) translateY(-50%)`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.1) 2px,
                rgba(255,255,255,0.1) 4px
              )`,
            }}
          />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Boot console */}
            <motion.div
              className="absolute -top-48 left-1/2 -translate-x-1/2 w-[400px] h-32 bg-dark/80 border border-amber/20 rounded p-3 overflow-hidden font-mono text-[10px] text-amber/60"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {bootSequence.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-2"
                >
                  <span className="text-teal">&gt;</span>
                  <span>{msg}</span>
                  {i === bootSequence.length - 1 && msg === "System ready." && (
                    <span className="text-green-400 ml-2">OK</span>
                  )}
                </motion.div>
              ))}
              <motion.span
                className="inline-block w-2 h-3 bg-coral/60 ml-3"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Logo with 3D effect */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.5, rotateX: -30 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              style={{ perspective: "1000px" }}
            >
              {/* Glowing rings */}
              <motion.div
                className="absolute -inset-16 border border-amber/20 rounded-full"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity } }}
              />
              <motion.div
                className="absolute -inset-24 border border-teal/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-32 border border-coral/10 rounded-full"
                animate={{ rotate: 180 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />

              {/* Main logo */}
              <motion.div
                className="font-serif text-7xl font-black text-cream relative"
                animate={isGlitching ? { x: [-2, 2, -2, 0], filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"] } : {}}
                transition={{ duration: 0.1, repeat: isGlitching ? 4 : 0 }}
              >
                <GlitchyText text="Tandin" isActive={isGlitching} />
                <span className="text-amber">.TGL</span>

                {/* 3D shadow layers */}
                <div className="absolute inset-0 -z-10 text-coral/20 translate-x-1 translate-y-1" aria-hidden="true">
                  <GlitchyText text="Tandin" isActive={isGlitching} />.TGL
                </div>
                <div className="absolute inset-0 -z-20 text-coral/10 translate-x-2 translate-y-2" aria-hidden="true">
                  <GlitchyText text="Tandin" isActive={isGlitching} />.TGL
                </div>
              </motion.div>

              {/* Tagline */}
              <motion.div
                className="text-center mt-4 text-sm tracking-[6px] uppercase text-cream/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Scalable UI Systems
              </motion.div>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="w-80 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="h-3 bg-dark border-2 border-amber/40 rounded overflow-hidden relative">
                <motion.div
                  className="h-full bg-amber relative"
                  style={{ width: `${Math.min(loadProgress, 100)}%` }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>
                {[20, 40, 60, 80].map(pos => (
                  <div
                    key={pos}
                    className="absolute top-0 bottom-0 w-px bg-dark/50"
                    style={{ left: `${pos}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] tracking-[2px] text-cream/40 uppercase">
                <span>{isLoaded ? "Ready" : "Loading..."}</span>
                <span className="font-mono text-coral">{Math.round(Math.min(loadProgress, 100))}%</span>
              </div>
            </motion.div>

            {/* Start button */}
            <AnimatePresence>
              {isLoaded && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.button
                    onClick={handleStart}
                    onMouseEnter={() => setHoverStart(true)}
                    onMouseLeave={() => setHoverStart(false)}
                    className="relative px-16 py-5 bg-dark text-amber font-sans text-sm font-bold tracking-[4px] uppercase overflow-hidden group"
                    style={{
                      clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: hoverStart
                        ? "0 0 40px rgba(248,170,64,0.6)"
                        : "0 0 20px rgba(248,170,64,0.3)",
                    }}
                  >
                    {/* Animated border */}
                    <motion.div
                      className="absolute inset-0 border-2 border-cream/30"
                      style={{
                        clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
                      }}
                      animate={{
                        borderColor: hoverStart ? "rgba(255,251,230,0.6)" : "rgba(255,251,230,0.3)",
                      }}
                    />

                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                      animate={hoverStart ? { translateX: "200%" } : {}}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Arrow animation */}
                    <motion.span
                      className="inline-block mr-3"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      &gt;
                    </motion.span>
                    <span className="relative z-10">Start Game</span>
                    <motion.span
                      className="inline-block ml-3"
                      animate={{ x: [0, -5, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      &lt;
                    </motion.span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Keyboard hint */}
            <motion.div
              className="flex items-center gap-4 text-cream/30 text-xs tracking-[3px] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0.3 }}
              transition={{ delay: 0.5 }}
            >
              <span>Press</span>
              <div className="flex gap-2">
                <KeyVisual char="ENTER" pressed={pressedKey === "ENTER"} wide />
                <span className="text-cream/20">or</span>
                <KeyVisual char="SPACE" pressed={pressedKey === " "} wide />
              </div>
              <span>to continue</span>
            </motion.div>

            {/* Controls hint */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-8 text-[10px] text-cream/20 tracking-[2px] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <span>Navigate</span>
                <div className="flex gap-1">
                  <KeyVisual char="W" pressed={pressedKey === "W"} />
                  <KeyVisual char="A" pressed={pressedKey === "A"} />
                  <KeyVisual char="S" pressed={pressedKey === "S"} />
                  <KeyVisual char="D" pressed={pressedKey === "D"} />
                </div>
              </div>
              <div className="h-4 w-px bg-cream/10" />
              <div className="flex items-center gap-2">
                <span>Sections</span>
                <div className="flex gap-1">
                  <KeyVisual char="H" pressed={pressedKey === "H"} />
                  <KeyVisual char="W" pressed={pressedKey === "W"} />
                  <KeyVisual char="A" pressed={pressedKey === "A"} />
                  <KeyVisual char="C" pressed={pressedKey === "C"} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 flex gap-2">
            {["HP", "MP", "XP"].map((stat, i) => (
              <motion.div
                key={stat}
                className="px-2 py-1 bg-dark border border-amber/30 text-[9px] text-amber/60 tracking-[2px]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                {stat}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="absolute bottom-6 right-6 text-[10px] text-cream/20 font-mono"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            v2.0.24
          </motion.div>

          <motion.div
            className="absolute top-6 right-6 text-[10px] text-cream/30 tracking-[2px] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Tandin Gyeltshen Lepcha
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function KeyVisual({ char, pressed = false, wide = false }: { char: string; pressed?: boolean; wide?: boolean }) {
  return (
    <motion.div
      className={`inline-flex items-center justify-center ${wide ? "px-3" : "w-6"} h-6 rounded border font-mono text-[10px] font-bold transition-all
        ${pressed
          ? "bg-coral border-coral text-cream translate-y-0.5 shadow-none"
          : "bg-dark/50 border-cream/20 text-cream/40 shadow-[0_2px_0_rgba(255,251,230,0.1)]"
        }`}
      animate={pressed ? { y: 2 } : { y: 0 }}
    >
      {char}
    </motion.div>
  )
}
