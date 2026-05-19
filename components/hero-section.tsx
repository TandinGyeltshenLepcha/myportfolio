"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { HealthBarsSvg, SettingsButtonsSvg } from "./svg-components"

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
      className="min-h-screen bg-amber relative flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.6) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <motion.div
        className="max-w-[1100px] mx-auto px-8 pt-16 pb-4 w-full sm:pt-20 sm:pb-6 flex-1 flex flex-col justify-center"
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
            className="w-[6px] h-[6px] rounded-full bg-dark"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-dark">
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
              <span className="text-white italic" style={{ WebkitTextStroke: "1px #000000" }}>
                {typedText}
                <motion.span
                  className="inline-block w-[3px] h-[0.9em] bg-dark ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                />
              </span>
              <br />
              that feels alive.
            </motion.h1>

            <motion.p
              className="text-[17px] text-dark/70 leading-[1.75] max-w-[460px] mb-8 font-light"
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
                className="relative flex items-center gap-2 px-7 py-3.5 rounded-none bg-dark text-amber text-[12px] font-medium tracking-[0.1em] uppercase overflow-hidden"
                style={{ boxShadow: "4px 4px 0 rgba(0,0,0,0.3)" }}
                whileHover={{ x: -2, y: -2, boxShadow: "6px 6px 0 rgba(0,0,0,0.3)" }}
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
                className="px-7 py-3.5 rounded-none border-2 border-dark text-dark text-[12px] font-medium tracking-[0.1em] uppercase"
                whileHover={{ backgroundColor: "#000000", color: "#f8aa40" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                Get in Touch
              </motion.button>
            </motion.div>
          </div>

          {/* Right: floating cards with actual SVG graphics */}
          <div className="relative h-[420px] hidden lg:block">
            <FloatingCard
              className="top-[30px] left-[5%]"
              delay={0.4}
              rotation={-2}
              shadowColor="rgba(0,0,0,0.25)"
            >
              <div className="bg-white p-3 w-[260px]">
                <div className="text-[9px] tracking-[3px] uppercase text-dark/40 font-sans mb-2">Status Bars</div>
                <HealthBarsSvg />
              </div>
            </FloatingCard>

            <FloatingCard
              className="bottom-[60px] right-0"
              delay={0.6}
              rotation={2}
              shadowColor="rgba(0,0,0,0.2)"
            >
              <div className="bg-white p-3 w-[190px]">
                <div className="text-[9px] tracking-[3px] uppercase text-dark/40 font-sans mb-2">Settings Menu</div>
                <SettingsButtonsSvg />
              </div>
            </FloatingCard>

          </div>
        </div>
      </motion.div>

      {/* Stats strip — no "100% Gamified" */}
      <StatStrip />
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
  // Removed "100% Gamified"
  const stats = [
    { target: 40, label: "Components", suffix: "+" },
    { target: 3, label: "Game Projects", suffix: "" },
    { target: 3, label: "Years Exp", suffix: "" },
  ]

  return (
    <motion.div
      ref={ref}
      className="border-t border-dark/10 grid grid-cols-3 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          className="text-center py-4 md:py-6 border-r border-dark/10 last:border-r-0 relative"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.08 }}
          whileHover={{ backgroundColor: "rgba(10,10,10,0.04)" }}
        >
          <div className="font-serif text-[clamp(24px,2.8vw,38px)] font-black text-dark">
            <Counter target={stat.target} suffix={stat.suffix} isInView={isInView} />
          </div>
          <div className="text-[10px] text-dark/50 tracking-[0.2em] uppercase mt-1">{stat.label}</div>
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
