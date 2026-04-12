"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { WavesSvg, BeeSvg, HealthBarsSvg, SettingsButtonsSvg } from "./svg-components"
import { GlitchText, PowerBar, SoundWave, RadarSweep, LevelBadge, GameTooltip } from "./game-effects"

const words = ["Game UI", "Components", "HUD Systems", "Interfaces", "Pixel Art"]

export function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showSecretMessage, setShowSecretMessage] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  // Typewriter effect
  useEffect(() => {
    const currentWord = words[wordIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentWord.length) {
          setTypedText(currentWord.slice(0, typedText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(typedText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 45 : 85)

    return () => clearTimeout(timeout)
  }, [typedText, isDeleting, wordIndex])

  // Easter egg
  const handleStampClick = () => {
    setClickCount(prev => prev + 1)
    if (clickCount >= 4) {
      setShowSecretMessage(true)
      setTimeout(() => setShowSecretMessage(false), 3000)
      setClickCount(0)
    }
  }

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="min-h-screen bg-amber relative flex flex-col justify-center overflow-hidden"
    >
      {/* Animated grid background */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(26,8,0,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,8,0,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      {/* Decorative corner elements */}
      <div className="absolute top-4 left-4 flex gap-1">
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-coral/40"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
      <div className="absolute top-4 right-4">
        <SoundWave />
      </div>
      <div className="absolute bottom-24 left-4">
        <RadarSweep size={60} />
      </div>

      {/* Accent bars */}
      <motion.div 
        className="absolute top-[70px] right-0 w-[14px] h-[90px] bg-teal"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{ transformOrigin: "top" }}
      />
      <motion.div 
        className="absolute bottom-[70px] left-[100px] w-[70px] h-[12px] bg-[#2d2a20]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        style={{ transformOrigin: "left" }}
      />

      {/* Waves */}
      <motion.div 
        className="absolute top-20 left-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ y: y1 }}
      >
        <WavesSvg />
      </motion.div>
      <motion.div 
        className="absolute bottom-[50px] right-[50px]"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{ y: y2 }}
      >
        <WavesSvg flip />
      </motion.div>

      {/* Interactive Stamp */}
      <motion.div 
        className="absolute top-[88px] left-[200px]"
        initial={{ opacity: 0, rotate: -45 }}
        animate={{ opacity: 0.4, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        whileTap={{ scale: 0.9, rotate: 10 }}
        onClick={handleStampClick}
        data-cursor="click me"
      >
        <div className="w-20 h-20 border-2 border-brown/50 rounded flex items-center justify-center relative overflow-hidden">
          <div className="w-[62px] h-[62px] border border-brown/60 flex flex-col items-center justify-center text-[9px] tracking-[1px] text-brown text-center leading-[1.8] font-medium">
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="mb-0.5">
              <path d="M6 1L7 5L11 6L7 7L6 11L5 7L1 6L5 5Z" fill="currentColor"/>
            </svg>
            <span>GAME</span>
            <span>UI</span>
          </div>
          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
            whileHover={{ translateX: "100%" }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Secret message */}
      <AnimatePresence>
        {showSecretMessage && (
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-dark text-coral px-6 py-4 rounded-lg border-2 border-coral"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
          >
            <div className="text-xl font-serif font-bold">[SECRET] Easter Egg Found!</div>
            <div className="text-sm text-cream/60">You discovered a secret!</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bee with path animation */}
      <motion.div 
        className="absolute top-[22%] right-[15%]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 0.7, 
          scale: 1,
          x: [0, 20, 0, -20, 0],
          y: [0, -10, 0, -10, 0]
        }}
        transition={{ 
          opacity: { duration: 0.5, delay: 1 },
          x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <BeeSvg />
      </motion.div>

      {/* Hero Grid */}
      <motion.div 
        className="max-w-[1200px] mx-auto px-10 pt-24 pb-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10"
        style={{ opacity, scale }}
      >
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Level badge */}
          <div className="flex items-center gap-4 mb-4">
            <LevelBadge level={20} />
            <div className="flex-1">
              <PowerBar value={8500} max={10000} color="#4a6a60" label="Design XP" />
            </div>
          </div>

          <motion.div 
            className="inline-block text-[11px] tracking-[5px] text-coral font-medium uppercase bg-coral/10 px-4 py-1 rounded-full border border-coral/40 mb-5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(228,102,61,0.3)" }}
          >
            <motion.svg
              width="8" height="8" viewBox="0 0 8 8"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              aria-hidden="true"
              className="inline-block"
            >
              <path d="M4 0L8 4L4 8L0 4Z" fill="currentColor"/>
            </motion.svg>
            {" "}UI Component Designer{" "}
            <motion.svg
              width="8" height="8" viewBox="0 0 8 8"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
              aria-hidden="true"
              className="inline-block"
            >
              <path d="M4 0L8 4L4 8L0 4Z" fill="currentColor"/>
            </motion.svg>
          </motion.div>

          <h1 id="hero-heading" className="font-serif text-[clamp(40px,5vw,72px)] font-black leading-none text-dark mb-2">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlitchText>Designing</GlitchText>
            </motion.span>
            <br />
            <span className="text-coral italic relative">
              {typedText}
              <motion.span 
                className="text-coral inline-block w-[3px] h-[1em] bg-coral ml-1 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              />
            </span>
          </h1>

          <motion.p 
            className="text-base text-brown leading-[1.9] max-w-[420px] my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            I craft game UI components — health bars, weapon grids, HUDs, menus — that feel <GameTooltip content="Responsive, satisfying interactions"><span className="text-coral underline decoration-dotted cursor-help">tactile</span></GameTooltip> and alive. Every pixel in service of play.
          </motion.p>

          <motion.div 
            className="flex gap-3 flex-wrap mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GameButton onClick={scrollToWork} variant="primary">
              See the Work
            </GameButton>
            <GameButton onClick={scrollToContact} variant="secondary">
              Get in Touch
            </GameButton>
          </motion.div>

          {/* Interactive color swatches */}
          <motion.div 
            className="flex gap-1.5 items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { color: "#d4b896", height: 68, name: "Sand" },
              { color: "#a07850", height: 54, name: "Muted" },
              { color: "#E4663D", height: 80, name: "Coral" },
              { color: "#4a6a60", height: 60, name: "Teal" },
              { color: "#fffbe6", height: 72, border: true, name: "Cream" },
            ].map((swatch, i) => (
              <GameTooltip key={i} content={swatch.name} position="bottom">
                <motion.div
                  className="w-[34px] rounded relative overflow-hidden group"
                  style={{ 
                    height: swatch.height, 
                    background: swatch.color,
                    border: swatch.border ? "1px solid #a07850" : "none"
                  }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.1,
                    boxShadow: `0 8px 20px ${swatch.color}60`
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ height: 0 }}
                  animate={{ height: swatch.height }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                  data-cursor={swatch.name.toLowerCase()}
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </GameTooltip>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Collage of real SVG components */}
        <div className="relative h-[500px] hidden lg:block">
          {/* Card 1: Health bars */}
          <HeroCard
            className="top-2.5 left-[5%]"
            delay={0.4}
            rotation={-2}
            shadowColor="rgba(228,102,61,.8)"
            floatDuration={7}
          >
            <div className="bg-cream p-2.5 pb-6 w-[280px]">
              <div className="text-[9px] tracking-[3px] uppercase text-muted font-sans mb-2 flex items-center gap-2">
                <motion.span
                  className="w-2 h-2 bg-coral rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                Status Bars
              </div>
              <HealthBarsSvg />
            </div>
          </HeroCard>

          {/* Card 2: Settings buttons */}
          <HeroCard
            className="top-[50px] right-0"
            delay={0.6}
            rotation={2}
            shadowColor="#1a0800"
            floatDuration={6}
            floatDelay={1.5}
          >
            <div className="bg-cream p-2.5 pb-3.5 w-[200px]">
              <div className="text-[9px] tracking-[3px] uppercase text-muted font-sans mb-2 flex items-center gap-2">
                <motion.svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="6" cy="6" r="2" fill="#a07850" />
                  <circle cx="6" cy="6" r="5" fill="none" stroke="#a07850" strokeWidth="1" strokeDasharray="2 2" />
                </motion.svg>
                Settings Menu
              </div>
              <SettingsButtonsSvg />
            </div>
          </HeroCard>

          {/* Card 3: Rock Paper Scissors */}
          <HeroCard
            className="bottom-[50px] left-[3%]"
            delay={0.8}
            rotation={-1}
            shadowColor="#4a6a60"
            floatDuration={8}
            floatDelay={0.8}
          >
            <div className="bg-cream p-2.5 pb-3.5 w-[220px]">
              <div className="text-[9px] tracking-[3px] uppercase text-muted font-sans mb-2 flex items-center gap-2">
                <motion.svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  animate={{ scale: [1, 0.8, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <polygon points="6,0 12,6 6,12 0,6" fill="#4a6a60" />
                  <polygon points="6,3 9,6 6,9 3,6" fill="#fffbe6" />
                </motion.svg>
                Rock Paper Scissors
              </div>
              <div className="flex justify-center items-center gap-3 py-2">
                <motion.img 
                  src="/icons/rock.svg" 
                  alt="Rock" 
                  className="w-14 h-14 object-contain"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                />
                <motion.img 
                  src="/icons/paper.svg" 
                  alt="Paper" 
                  className="w-14 h-14 object-contain"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />
                <motion.img 
                  src="/icons/scissors.svg" 
                  alt="Scissors" 
                  className="w-14 h-14 object-contain"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                />
              </div>
            </div>
          </HeroCard>
        </div>
      </motion.div>

      {/* Stat strip */}
      <StatStrip />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] tracking-[3px] uppercase text-brown/60">Scroll</span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-brown/40 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-coral"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Game-style button component
function GameButton({ 
  children, 
  onClick, 
  variant = "primary" 
}: { 
  children: React.ReactNode
  onClick: () => void
  variant?: "primary" | "secondary"
}) {
  const isPrimary = variant === "primary"

  return (
    <motion.button
      onClick={onClick}
      className={`relative px-8 py-3.5 rounded font-sans text-xs font-medium tracking-[2px] uppercase overflow-hidden
        ${isPrimary 
          ? "bg-coral text-cream shadow-[4px_4px_0_#1a0800]" 
          : "bg-transparent text-dark border-2 border-dark"
        }`}
      data-cursor={isPrimary ? "work" : "contact"}
      whileHover={{ 
        x: isPrimary ? -2 : 0, 
        y: isPrimary ? -2 : 0, 
        boxShadow: isPrimary ? "6px 6px 0 #1a0800" : undefined,
        backgroundColor: isPrimary ? undefined : "#1a0800",
        color: isPrimary ? undefined : "#fffbe6"
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
        whileHover={{ translateX: "100%" }}
        transition={{ duration: 0.5 }}
      />
      
      <span className="relative z-10">{children}</span>
      
      {/* Arrow icon for primary */}
      {isPrimary && (
        <motion.svg
          width="14" height="14" viewBox="0 0 16 16"
          className="inline-block ml-2"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          aria-hidden="true"
        >
          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </motion.svg>
      )}
    </motion.button>
  )
}

// Hero card with floating animation - NOW DRAGGABLE
function HeroCard({
  children,
  className,
  delay,
  rotation,
  shadowColor,
  floatDuration,
  floatDelay = 0
}: {
  children: React.ReactNode
  className: string
  delay: number
  rotation: number
  shadowColor: string
  floatDuration: number
  floatDelay?: number
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [hasBeenDragged, setHasBeenDragged] = useState(false)
  
  return (
    <motion.div
      className={`absolute cursor-grab active:cursor-grabbing ${className}`}
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => {
        setIsDragging(true)
        setHasBeenDragged(true)
      }}
      onDragEnd={() => setIsDragging(false)}
      initial={{ opacity: 0, y: 50, rotate: rotation * 2 }}
      animate={{ 
        opacity: 1, 
        y: hasBeenDragged ? 0 : [0, -10, 0], 
        rotate: isDragging ? 0 : rotation,
        scale: isDragging ? 1.05 : 1,
        boxShadow: isDragging 
          ? `12px 12px 0 ${shadowColor}` 
          : `6px 6px 0 ${shadowColor}`
      }}
      transition={{ 
        opacity: { duration: 0.6, delay },
        y: hasBeenDragged ? { duration: 0.3 } : { duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
        rotate: { duration: 0.3 },
        scale: { duration: 0.2 },
        boxShadow: { duration: 0.2 }
      }}
      whileHover={{ 
        rotate: 0, 
        scale: 1.05, 
        boxShadow: `8px 8px 0 ${shadowColor}`
      }}
      style={{ touchAction: "none" }}
      data-cursor="drag"
    >
      {/* Hover glow */}
      <motion.div
        className="absolute -inset-2 rounded-lg opacity-0"
        style={{ background: `radial-gradient(circle, ${shadowColor}40 0%, transparent 70%)` }}
        whileHover={{ opacity: 1 }}
      />
      <div className="relative">{children}</div>
      
      {/* Drag hint */}
      {!hasBeenDragged && (
        <motion.div 
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] tracking-[1px] uppercase text-brown/50 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: delay + 1 }}
        >
          drag me
        </motion.div>
      )}
    </motion.div>
  )
}

function StatStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { target: 40, label: "Components", suffix: "+" },
    { target: 3, label: "Game Projects", suffix: "" },
    { target: 3, label: "Years Exp", suffix: "" },
    { value: "100%", label: "Gamified" },
  ]

  return (
    <motion.div 
      ref={ref}
      className="border-t border-brown/20 grid grid-cols-2 md:grid-cols-4 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          className="text-center py-6 border-r border-brown/15 last:border-r-0 relative group"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1 }}
          whileHover={{ backgroundColor: "rgba(228,102,61,0.05)" }}
          data-cursor={stat.label.toLowerCase().replace(" ", "-")}
        >
          {/* Hover indicator */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral origin-left scale-x-0 group-hover:scale-x-100"
            transition={{ duration: 0.3 }}
          />
          <div className="font-serif text-[clamp(26px,3vw,40px)] font-black text-dark">
            {stat.value ? stat.value : <Counter target={stat.target} suffix={stat.suffix || ""} isInView={isInView} />}
          </div>
          <div className="text-[10px] text-brown tracking-[3px] uppercase mt-1">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}

function Counter({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    
    let current = 0
    const increment = Math.ceil(target / 40)
    const interval = setInterval(() => {
      current = Math.min(current + increment, target)
      setCount(current)
      if (current >= target) clearInterval(interval)
    }, 30)

    return () => clearInterval(interval)
  }, [isInView, target])

  return <>{count}{suffix}</>
}
