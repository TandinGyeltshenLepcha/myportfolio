"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { WavesSvg, HealthBarsSvg, SettingsButtonsSvg } from "./svg-components"

const words = ["Game UI", "HUD Systems", "Components", "Interfaces"]

export function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 60])

  useEffect(() => {
    const currentWord = words[wordIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentWord.length) {
          setTypedText(currentWord.slice(0, typedText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2200)
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(typedText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 40 : 80)
    return () => clearTimeout(timeout)
  }, [typedText, isDeleting, wordIndex])

  const scrollToWork = () => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-screen bg-amber relative flex flex-col justify-center overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(26,8,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(26,8,0,0.6) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        className="max-w-[1100px] mx-auto px-8 pt-24 pb-12 w-full"
        style={{ opacity, y }}
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-2 mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="w-[6px] h-[6px] rounded-full bg-coral"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-coral">
            Available for projects
          </span>
        </motion.div>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <motion.h1
              id="hero-heading"
              className="font-serif text-[clamp(42px,5.5vw,76px)] font-black leading-[1.0] tracking-tight text-dark mb-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Designing<br />
              <span className="text-coral italic">
                {typedText}
                <motion.span
                  className="inline-block w-[3px] h-[0.9em] bg-coral ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                />
              </span>
              <br />
              that feels alive.
            </motion.h1>

            <motion.p
              className="text-[17px] text-muted leading-[1.75] max-w-[460px] mb-8 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              I craft <strong className="text-dark font-medium">HUDs, health bars, weapon grids, and menus</strong> that feel tactile and purposeful — every pixel in service of play.
            </motion.p>

            <motion.div
              className="flex gap-3 flex-wrap"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={scrollToWork}
                className="relative flex items-center gap-2 px-7 py-3.5 rounded bg-dark text-cream text-[12px] font-medium tracking-[0.1em] uppercase overflow-hidden"
                style={{ boxShadow: "4px 4px 0 #C94A26" }}
                whileHover={{ x: -2, y: -2, boxShadow: "6px 6px 0 #C94A26" }}
                whileTap={{ scale: 0.97 }}
              >
                See the Work
                <motion.svg
                  width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" />
                </motion.svg>
              </motion.button>

              <motion.button
                onClick={scrollToContact}
                className="px-7 py-3.5 rounded border-2 border-dark text-dark text-[12px] font-medium tracking-[0.1em] uppercase"
                whileHover={{ backgroundColor: "#1a0800", color: "#fffbe6" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                Get in Touch
              </motion.button>
            </motion.div>
          </div>

          {/* Right: floating cards - desktop only */}
          <div className="relative h-[420px] hidden lg:block">
            <FloatingCard
              className="top-0 left-[5%]"
              delay={0.4}
              rotation={-2}
              shadowColor="rgba(201,74,38,0.7)"
            >
              <div className="bg-cream p-3 w-[260px]">
                <div className="text-[9px] tracking-[3px] uppercase text-muted font-sans mb-2">Status Bars</div>
                <HealthBarsSvg />
              </div>
            </FloatingCard>

            <FloatingCard
              className="top-[40px] right-0"
              delay={0.6}
              rotation={2}
              shadowColor="rgba(26,8,0,0.5)"
            >
              <div className="bg-cream p-3 w-[190px]">
                <div className="text-[9px] tracking-[3px] uppercase text-muted font-sans mb-2">Settings Menu</div>
                <SettingsButtonsSvg />
              </div>
            </FloatingCard>

            <FloatingCard
              className="bottom-[30px] left-[3%]"
              delay={0.8}
              rotation={-1}
              shadowColor="rgba(45,74,66,0.6)"
            >
              <div className="bg-cream p-3 w-[200px]">
                <div className="text-[9px] tracking-[3px] uppercase text-muted font-sans mb-2">Rock Paper Scissors</div>
                <div className="flex justify-center items-center gap-3 py-2">
                  <motion.img src="/icons/rock.svg" alt="Rock" className="w-12 h-12 object-contain" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }} />
                  <motion.img src="/icons/paper.svg" alt="Paper" className="w-12 h-12 object-contain" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
                  <motion.img src="/icons/scissors.svg" alt="Scissors" className="w-12 h-12 object-contain" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </motion.div>

      {/* Stats strip */}
      <StatStrip />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] tracking-[3px] uppercase text-brown/50">Scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-brown/30 flex justify-center pt-1.5"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-1 rounded-full bg-coral"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

function FloatingCard({ children, className, delay, rotation, shadowColor }: {
  children: React.ReactNode; className: string; delay: number; rotation: number; shadowColor: string
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 40, rotate: rotation * 2 }}
      animate={{ opacity: 1, y: [0, -8, 0], rotate: rotation }}
      transition={{
        opacity: { duration: 0.5, delay },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 },
        rotate: { duration: 0.3 },
      }}
      style={{ boxShadow: `5px 5px 0 ${shadowColor}` }}
      whileHover={{ rotate: 0, scale: 1.04, boxShadow: `8px 8px 0 ${shadowColor}` }}
    >
      {children}
    </motion.div>
  )
}

function StatStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const stats = [
    { target: 40, label: "Components", suffix: "+" },
    { target: 3, label: "Game Projects", suffix: "" },
    { target: 3, label: "Years Exp", suffix: "" },
    { value: "100%", label: "Gamified" },
  ]

  return (
    <motion.div
      ref={ref}
      className="border-t border-brown/15 grid grid-cols-2 md:grid-cols-4 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          className="text-center py-6 border-r border-brown/10 last:border-r-0 relative"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.08 }}
          whileHover={{ backgroundColor: "rgba(201,74,38,0.04)" }}
        >
          <div className="font-serif text-[clamp(24px,2.8vw,38px)] font-black text-dark">
            {stat.value ? stat.value : <Counter target={stat.target!} suffix={stat.suffix || ""} isInView={isInView} />}
          </div>
          <div className="text-[10px] text-muted tracking-[0.2em] uppercase mt-1">{stat.label}</div>
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
    }, 28)
    return () => clearInterval(interval)
  }, [isInView, target])
  return <>{count}{suffix}</>
}
