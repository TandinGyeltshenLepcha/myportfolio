"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { WavesSvg } from "./svg-components"

const skills = [
  { label: "Game UI", level: 98, color: "#C94A26" },
  { label: "React", level: 90, color: "#61dafb" },
  { label: "Design Systems", level: 95, color: "#2D4A42" },
  { label: "Animation", level: 85, color: "#F7A840" },
  { label: "Concept Art", level: 80, color: "#9c27b0" },
]

const process = [
  { num: "01", title: "Discovery", desc: "Understanding gameplay loops and player needs" },
  { num: "02", title: "Wireframe & Prototype", desc: "Low-fi to interactive mockup, fast iteration cycles" },
  { num: "03", title: "Visual Design", desc: "Pixel-level craft, motion, and system coherence" },
  { num: "04", title: "Handoff & Ship", desc: "Dev-ready assets, specs, and live component builds" },
]

export function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      id="about"
      className="bg-amber py-24 relative overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div
        className="absolute top-10 left-8 opacity-20"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 0.2, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <WavesSvg />
      </motion.div>

      <div className="max-w-[1100px] mx-auto px-8">

        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted">About</span>
          <div className="flex-1 h-px bg-brown/15" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: bio + skills */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="font-serif text-[clamp(30px,3.5vw,46px)] font-black leading-[1.05] text-dark mb-6">
              Turning ideas into<br />
              <span className="text-coral italic">experiences.</span>
            </h2>

            <div className="space-y-4 text-[16px] leading-[1.8] text-muted font-light mb-8">
              <p>
                I'm a UI Component Designer specialising in game interfaces — the screens, overlays, and systems players interact with every session.
              </p>
              <p>
                With <strong className="text-dark font-medium">3 years</strong> building everything from health bars to full HUD systems, I bring both craft and strategy to every pixel.
              </p>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <div className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted mb-4">Skill Set</div>
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.label}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07 }}
                >
                  <div className="text-[13px] font-medium text-dark w-32 shrink-0">{skill.label}</div>
                  <div className="flex-1 h-[4px] bg-brown/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: skill.color }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ delay: 0.3 + i * 0.07, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <div className="text-[12px] text-muted w-8 text-right">{skill.level}%</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: availability + process */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Availability card */}
            <div className="bg-dark text-cream rounded-lg p-6 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <motion.span
                  className="w-[6px] h-[6px] rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-cream/40">
                  Currently Available
                </span>
              </div>
              <div className="font-serif text-[22px] font-bold mb-2">Let's build something together.</div>
              <p className="text-[14px] leading-[1.65] text-cream/55 mb-5">
                Open to freelance projects, collaborations, and full-time roles in game UI design.
              </p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="text-[11px] font-medium tracking-[0.1em] uppercase bg-coral text-cream px-5 py-2.5 rounded hover:opacity-85 transition-opacity"
              >
                Start a Conversation
              </button>
            </div>

            {/* Process */}
            <div>
              <div className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted mb-4">My Process</div>
              <div className="divide-y divide-brown/10">
                {process.map((step, i) => (
                  <motion.div
                    key={step.num}
                    className="flex gap-4 py-4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    <span className="font-serif text-[11px] font-bold text-coral min-w-[24px] pt-0.5">{step.num}</span>
                    <div>
                      <div className="text-[14px] font-medium text-dark">{step.title}</div>
                      <div className="text-[13px] text-muted mt-0.5 leading-[1.5]">{step.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
