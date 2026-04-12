"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { id: "home", label: "Home", key: "H", numKey: "1" },
  { id: "work", label: "Work", key: "W", numKey: "2" },
  { id: "about", label: "About", key: "A", numKey: "3" },
  { id: "contact", label: "Contact", key: "C", numKey: "4" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [showKeyHints, setShowKeyHints] = useState(false)
  const [lastKeyPressed, setLastKeyPressed] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ["home", "work", "about", "contact"]
      let current = "home"
      let currentIndex = 0
      
      sections.forEach((id, index) => {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top < 200) {
          current = id
          currentIndex = index
        }
      })
      
      setActiveSection(current)
      setSelectedIndex(currentIndex)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      setLastKeyPressed(e.key.toUpperCase())
      setTimeout(() => setLastKeyPressed(null), 200)

      // Arrow keys / WASD for sequential navigation
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key.toLowerCase() === "s" || e.key.toLowerCase() === "d") {
        e.preventDefault()
        const nextIndex = Math.min(selectedIndex + 1, navItems.length - 1)
        setSelectedIndex(nextIndex)
        scrollTo(navItems[nextIndex].id)
      }
      
      if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key.toLowerCase() === "w" || e.key.toLowerCase() === "a") {
        e.preventDefault()
        const prevIndex = Math.max(selectedIndex - 1, 0)
        setSelectedIndex(prevIndex)
        scrollTo(navItems[prevIndex].id)
      }

      // Direct section keys (H, W, A, C)
      const directNav = navItems.find(n => n.key.toLowerCase() === e.key.toLowerCase())
      if (directNav && e.altKey) {
        e.preventDefault()
        scrollTo(directNav.id)
      }

      // Number keys (1-4)
      const numNav = navItems.find(n => n.numKey === e.key)
      if (numNav) {
        scrollTo(numNav.id)
      }

      // Show hints on Shift
      if (e.key === "Shift") {
        setShowKeyHints(true)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setShowKeyHints(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [selectedIndex, scrollTo])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-10 h-[60px] transition-all duration-400"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: scrolled ? "rgba(26,8,0,0.95)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(228,102,61,0.3)" : "none",
          backdropFilter: scrolled ? "blur(10px)" : "none",
        }}
      >
        {/* Logo */}
        <motion.button 
          className={`font-serif text-xl font-black flex items-center gap-2 ${scrolled ? "text-cream" : "text-dark"} focus:outline-none`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-cursor="home"
          onClick={() => scrollTo("home")}
          aria-label="Tandin Gyeltshen Lepcha - Go to home"
        >
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="text-coral"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <path
              d="M10 2L11 8L18 10L11 12L10 18L9 12L2 10L9 8Z"
              fill="currentColor"
            />
          </motion.svg>
          <span className="hidden sm:inline">Tandin</span>
          <span className="text-coral">.TGL</span>
          
          {/* Status badge */}
          <motion.div
            className="ml-2 px-1.5 py-0.5 bg-coral/20 rounded text-[8px] text-coral tracking-[1px] font-sans"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            aria-label="Available for hire"
          >
            OPEN
          </motion.div>
        </motion.button>

        {/* Nav items - Game menu style */}
        <nav className="flex items-center gap-1" role="navigation" aria-label="Main navigation">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id
            const isHovered = hoverIndex === index
            const isSelected = selectedIndex === index

            return (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                className={`relative px-5 py-2.5 font-sans text-xs tracking-[3px] uppercase transition-all ${
                  scrolled 
                    ? isActive ? "text-coral" : "text-cream/70 hover:text-cream"
                    : isActive ? "text-coral" : "text-brown/80 hover:text-dark"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                data-cursor={item.label.toLowerCase()}
                whileHover={{ y: -2 }}
              >
                {/* Selection bracket indicators */}
                <AnimatePresence>
                  {(isSelected || isHovered) && (
                    <>
                      <motion.span
                        className={`absolute left-0 top-1/2 -translate-y-1/2 font-mono text-sm ${isActive ? "text-coral" : scrolled ? "text-cream/50" : "text-dark/50"}`}
                        initial={{ opacity: 0, x: 5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 5 }}
                      >
                        {"["}
                      </motion.span>
                      <motion.span
                        className={`absolute right-0 top-1/2 -translate-y-1/2 font-mono text-sm ${isActive ? "text-coral" : scrolled ? "text-cream/50" : "text-dark/50"}`}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                      >
                        {"]"}
                      </motion.span>
                    </>
                  )}
                </AnimatePresence>

                {/* Number key indicator */}
                <span className={`absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-mono ${scrolled ? "text-cream/30" : "text-dark/30"}`}>
                  {item.numKey}
                </span>

                {item.label}
                
                {/* Keyboard hint overlay */}
                <AnimatePresence>
                  {showKeyHints && (
                    <motion.span
                      className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-dark text-coral text-[9px] rounded font-mono border border-coral/30"
                      initial={{ opacity: 0, y: -5, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.9 }}
                    >
                      Alt+{item.key}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Active indicator - power bar style */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-2 right-2 h-[3px] bg-coral overflow-hidden"
                      layoutId="activeSection"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover glow */}
                <div
                  className={`absolute inset-0 rounded -z-10 transition-colors duration-200 ${isHovered ? "bg-coral/10" : "bg-coral/0"}`}
                />
              </motion.button>
            )
          })}
        </nav>

        {/* Control hints & status */}
        <div className="flex items-center gap-4">
          {/* Navigation keys visual */}
          <motion.div
            className={`hidden md:flex items-center gap-1 text-[9px] ${scrolled ? "text-cream/40" : "text-dark/40"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="mr-1">NAV</span>
            <KeyVisual char="W" scrolled={scrolled} pressed={lastKeyPressed === "W"} />
            <KeyVisual char="A" scrolled={scrolled} pressed={lastKeyPressed === "A"} />
            <KeyVisual char="S" scrolled={scrolled} pressed={lastKeyPressed === "S"} />
            <KeyVisual char="D" scrolled={scrolled} pressed={lastKeyPressed === "D"} />
          </motion.div>

          {/* Divider */}
          <div className={`hidden md:block h-4 w-px ${scrolled ? "bg-cream/20" : "bg-dark/20"}`} />

          {/* Mini status */}
          <AnimatePresence>
            {scrolled && (
              <motion.div
                className="hidden md:flex items-center gap-3 text-[10px] text-cream/50"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="flex items-center gap-1.5">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-green-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span>Online</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Side progress dots - RPG menu style */}
      <motion.div
        className="fixed right-4 top-1/2 -translate-y-1/2 z-[499] hidden lg:flex flex-col gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        {/* Arrow up indicator */}
        <motion.button
          onClick={() => {
            const prevIndex = Math.max(selectedIndex - 1, 0)
            scrollTo(navItems[prevIndex].id)
          }}
          className="flex justify-center mb-2 text-brown/30 hover:text-coral transition-colors"
          whileHover={{ y: -2 }}
          data-cursor="up"
        >
          <svg width="12" height="8" viewBox="0 0 12 8">
            <path d="M6 0L12 8H0L6 0Z" fill="currentColor" />
          </svg>
        </motion.button>

        {navItems.map((item, index) => {
          const isActive = activeSection === item.id
          
          return (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="group relative flex items-center justify-end gap-2"
              data-cursor={item.label.toLowerCase()}
              whileHover={{ x: -4 }}
            >
              {/* Label on hover */}
              <motion.span
                className="text-[9px] tracking-[2px] uppercase text-brown/60 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity"
              >
                {item.label}
              </motion.span>

              {/* Dot with selection state */}
              <div className="relative">
                <motion.div
                  className={`w-2.5 h-2.5 rounded-sm transition-all ${
                    isActive 
                      ? "bg-coral rotate-45" 
                      : "bg-brown/30 hover:bg-brown/50"
                  }`}
                  animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                />
                {isActive && (
                  <motion.div
                    className="absolute -inset-1 border border-coral/50 rounded-sm rotate-45"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Number key */}
              <span className="absolute -right-4 text-[8px] font-mono text-brown/30">
                {item.numKey}
              </span>
            </motion.button>
          )
        })}

        {/* Arrow down indicator */}
        <motion.button
          onClick={() => {
            const nextIndex = Math.min(selectedIndex + 1, navItems.length - 1)
            scrollTo(navItems[nextIndex].id)
          }}
          className="flex justify-center mt-2 text-brown/30 hover:text-coral transition-colors"
          whileHover={{ y: 2 }}
          data-cursor="down"
        >
          <svg width="12" height="8" viewBox="0 0 12 8">
            <path d="M6 8L0 0H12L6 8Z" fill="currentColor" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Keyboard shortcut overlay - shows on Shift */}
      <AnimatePresence>
        {showKeyHints && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[500] bg-dark/95 border border-coral/30 rounded-lg px-6 py-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="text-[10px] text-cream/40 tracking-[2px] uppercase mb-3 text-center">Keyboard Controls</div>
            <div className="flex gap-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-cream/60">
                  <div className="flex gap-1">
                    <KeyVisual char="W" scrolled pressed={lastKeyPressed === "W"} />
                    <KeyVisual char="S" scrolled pressed={lastKeyPressed === "S"} />
                  </div>
                  <span>Navigate Up/Down</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-cream/60">
                  <div className="flex gap-1">
                    <KeyVisual char="1" scrolled pressed={lastKeyPressed === "1"} />
                    <span className="text-cream/30">-</span>
                    <KeyVisual char="4" scrolled pressed={lastKeyPressed === "4"} />
                  </div>
                  <span>Jump to Section</span>
                </div>
              </div>
              <div className="w-px bg-cream/10" />
              <div className="flex flex-col gap-2">
                {navItems.map(item => (
                  <div key={item.id} className="flex items-center gap-2 text-xs text-cream/60">
                    <KeyVisual char={`Alt+${item.key}`} scrolled wide pressed={lastKeyPressed === item.key} />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function KeyVisual({ 
  char, 
  scrolled = true, 
  pressed = false,
  wide = false 
}: { 
  char: string
  scrolled?: boolean
  pressed?: boolean
  wide?: boolean
}) {
  return (
    <motion.div
      className={`inline-flex items-center justify-center ${wide ? "px-2" : "w-5"} h-5 rounded text-[8px] font-mono font-bold transition-all
        ${pressed 
          ? "bg-coral border-coral text-cream translate-y-0.5" 
          : scrolled 
            ? "bg-cream/10 border border-cream/20 text-cream/50" 
            : "bg-dark/10 border border-dark/20 text-dark/50"
        }`}
      animate={pressed ? { scale: 0.9 } : { scale: 1 }}
    >
      {char}
    </motion.div>
  )
}
