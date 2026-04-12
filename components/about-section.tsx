"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { WavesSvg } from "./svg-components"
import { SkillNode, PowerBar, GameTooltip } from "./game-effects"

const skills = [
  { icon: "design", label: "Design", unlocked: true, level: 95, color: "#E4663D" },
  { icon: "react", label: "React", unlocked: true, level: 90, color: "#61dafb" },
  { icon: "gameui", label: "Game UI", unlocked: true, level: 98, color: "#4a6a60" },
  { icon: "scalable", label: "Scalable", unlocked: true, level: 85, color: "#F7A840" },
  { icon: "animation", label: "Animation", unlocked: false, level: 65, color: "#7a3c00", inProgress: true },
]



export function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeSkill, setActiveSkill] = useState<number | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingsPage, setSettingsPage] = useState(0)

  return (
    <section 
      ref={ref}
      id="about" 
      className="bg-cream py-24 relative overflow-hidden"
    >
      {/* Animated background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, #E4663D 1px, transparent 1px),
            radial-gradient(circle at 80% 50%, #E4663D 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      {/* Waves decoration */}
      <motion.div 
        className="absolute top-10 left-10"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <WavesSvg />
      </motion.div>

      {/* Interactive Stamp */}
      <motion.div 
        className="absolute top-[60px] right-[60px]"
        initial={{ opacity: 0, rotate: -45 }}
        animate={isInView ? { opacity: 0.4, rotate: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        whileHover={{ opacity: 1, scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        data-cursor="stamp"
      >
        <div className="w-20 h-20 border-2 border-brown/50 rounded flex items-center justify-center relative overflow-hidden">
          <div className="w-[62px] h-[62px] border border-brown/60 flex flex-col items-center justify-center text-[9px] tracking-[1px] text-brown text-center leading-[1.8] font-medium">
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="mb-0.5">
              <path d="M6 1L7 5L11 6L7 7L6 11L5 7L1 6L5 5Z" fill="currentColor"/>
            </svg>
            <span>THE</span>
            <span>WORK</span>
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
            whileHover={{ translateX: "100%" }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      <div className="max-w-[1200px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Player card header */}
            <motion.div
              className="bg-dark text-cream p-4 rounded-t mb-0 flex items-center justify-between"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-12 h-12 rounded-full bg-coral flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" fill="#fffbe6"/>
                  </svg>
                </motion.div>
                <div>
                  <div className="font-serif font-bold text-lg">Game UI Designer</div>
                  <div className="text-[10px] text-cream/60 tracking-[2px] uppercase">Level 20 Artist</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-coral tracking-[2px] uppercase">Status</div>
                <motion.div 
                  className="flex items-center gap-1.5"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-xs text-green-400">Available</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.span 
              className="text-[11px] tracking-[5px] uppercase text-coral font-medium mb-2.5 mt-6 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <motion.svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <polygon points="6,0 12,6 6,12 0,6" fill="#E4663D"/>
              </motion.svg>
              About
            </motion.span>
            
            <h2 className="font-serif text-[clamp(28px,4vw,52px)] font-black text-dark mb-0">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                I make the UI
              </motion.span>
              <br />
              <motion.em 
                className="text-coral"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                your players feel
              </motion.em>
            </h2>

            <motion.div 
              className="w-[60px] h-[3px] bg-coral my-6"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.4 }}
              style={{ transformOrigin: "left" }}
            />

            <motion.p 
              className="text-[15px] text-brown leading-[1.9] mb-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              Game UI is different. Players don&apos;t read it — they <GameTooltip content="Instant recognition without thinking"><span className="text-coral underline decoration-dotted cursor-help">feel</span></GameTooltip> it. A health bar that pulses at 20%, a button that resists just enough, a name tag that tells you who the boss is before you read the text.
            </motion.p>

            <motion.p 
              className="text-[15px] text-brown leading-[1.9]"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
            >
              Three years building game components across mobile and PC. Every component I ship is interactive, accessible, and built to survive the chaos of a live game session.
            </motion.p>

            {/* Skill tree */}
            <motion.div
              className="mt-8 p-4 pb-8 bg-amber/50 rounded border border-brown/20 relative z-10"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div className="text-[10px] tracking-[3px] uppercase text-brown/60 mb-6 flex items-center justify-between">
                <span>Skill Tree</span>
                <span className="text-coral">4/5 Unlocked</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    className="relative flex justify-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.9 + i * 0.1, type: "spring" }}
                  >
                    <SkillNode
                      icon={skill.icon}
                      label={skill.label}
                      unlocked={skill.unlocked}
                      color={skill.color}
                      inProgress={'inProgress' in skill ? skill.inProgress : false}
                      progressLevel={skill.level}
                      onClick={() => setActiveSkill(activeSkill === i ? null : i)}
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Skill detail panel - shown below the grid */}
              <AnimatePresence>
                {activeSkill !== null && (
                  <motion.div
                    className="mt-4 bg-dark text-cream p-3 rounded"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold text-sm">{skills[activeSkill].label}</div>
                      <button 
                        onClick={() => setActiveSkill(null)}
                        className="text-cream/50 hover:text-cream text-xs"
                      >
                        Close
                      </button>
                    </div>
                    <PowerBar value={skills[activeSkill].level} max={100} color={skills[activeSkill].color} showPulse />
                    <div className="text-[10px] text-cream/60 mt-2">
                      Proficiency: {skills[activeSkill].level}%
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </motion.div>

          {/* Collage with real SVGs */}
          <div className="flex flex-col gap-6">
            {/* Interactive Settings Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 10 }}
              animate={isInView ? { 
                opacity: 1, 
                x: 0, 
                rotate: -1.5
              } : {}}
              transition={{ 
                opacity: { duration: 0.6, delay: 0.4 },
                x: { duration: 0.6, delay: 0.4 },
                rotate: { duration: 0.6, delay: 0.4 }
              }}
              whileHover={{ rotate: 0, scale: 1.02, boxShadow: "10px 10px 0 #E4663D" }}
              style={{ boxShadow: "6px 6px 0 #E4663D" }}
              data-cursor="settings"
            >
              <div className="bg-cream p-4 border border-brown/10 relative overflow-hidden min-h-[200px]">
                <div className="text-[9px] tracking-[3px] uppercase text-muted font-sans mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <circle cx="6" cy="6" r="2" fill="#a07850" />
                      <circle cx="6" cy="6" r="5" fill="none" stroke="#a07850" strokeWidth="1" strokeDasharray="2 2" />
                    </motion.svg>
                    Settings Menu
                  </div>
                  <span className="text-coral">Page {settingsPage + 1}/3</span>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={settingsPage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {settingsPage === 0 && (
                      <div className="space-y-2">
                        <div className="text-sm font-bold text-dark mb-2">Audio Settings</div>
                        {['Master Volume', 'Music', 'SFX'].map((item, i) => (
                          <motion.div
                            key={item}
                            className="flex items-center justify-between p-2 bg-amber/50 rounded cursor-pointer"
                            whileHover={{ x: 4, backgroundColor: 'rgba(228,102,61,0.2)' }}
                          >
                            <span className="text-xs text-brown">{item}</span>
                            <div className="w-20 h-2 bg-brown/20 rounded overflow-hidden">
                              <motion.div 
                                className="h-full bg-coral" 
                                initial={{ width: 0 }}
                                animate={{ width: `${80 - i * 15}%` }}
                                transition={{ delay: i * 0.1 }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    {settingsPage === 1 && (
                      <div className="space-y-2">
                        <div className="text-sm font-bold text-dark mb-2">Display Settings</div>
                        {['Brightness', 'Contrast', 'Resolution'].map((item, i) => (
                          <motion.div
                            key={item}
                            className="flex items-center justify-between p-2 bg-amber/50 rounded cursor-pointer"
                            whileHover={{ x: 4, backgroundColor: 'rgba(228,102,61,0.2)' }}
                          >
                            <span className="text-xs text-brown">{item}</span>
                            <span className="text-[10px] text-coral uppercase">{['Medium', 'High', '1080p'][i]}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    {settingsPage === 2 && (
                      <div className="space-y-2">
                        <div className="text-sm font-bold text-dark mb-2">Controls</div>
                        {['Keyboard', 'Mouse Sens', 'Invert Y'].map((item, i) => (
                          <motion.div
                            key={item}
                            className="flex items-center justify-between p-2 bg-amber/50 rounded cursor-pointer"
                            whileHover={{ x: 4, backgroundColor: 'rgba(228,102,61,0.2)' }}
                          >
                            <span className="text-xs text-brown">{item}</span>
                            <span className="text-[10px] text-teal uppercase">{['WASD', '50%', 'OFF'][i]}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                
                {/* Navigation buttons */}
                <div className="flex gap-2 mt-4">
                  <motion.button
                    onClick={() => setSettingsPage(p => Math.max(0, p - 1))}
                    className="flex-1 py-2 bg-dark text-cream text-xs rounded disabled:opacity-30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={settingsPage === 0}
                  >
                    Back
                  </motion.button>
                  <motion.button
                    onClick={() => setSettingsPage(p => Math.min(2, p + 1))}
                    className="flex-1 py-2 bg-coral text-cream text-xs rounded disabled:opacity-30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={settingsPage === 2}
                  >
                    Next
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Back button demo */}
            <motion.div
              className="self-end"
              initial={{ opacity: 0, x: 50, rotate: -10 }}
              animate={isInView ? { 
                opacity: 1, 
                x: 0, 
                rotate: 1.5
              } : {}}
              transition={{ 
                opacity: { duration: 0.6, delay: 0.6 },
                x: { duration: 0.6, delay: 0.6 },
                rotate: { duration: 0.6, delay: 0.6 }
              }}
              whileHover={{ rotate: 0, scale: 1.02, boxShadow: "8px 8px 0 #1a0800" }}
              style={{ boxShadow: "5px 5px 0 #1a0800" }}
              data-cursor="navigation"
            >
              <div className="bg-cream p-4 border border-brown/10">
                <div className="text-[9px] tracking-[3px] uppercase text-muted font-sans mb-2 flex items-center gap-2">
                  <motion.svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    animate={{ x: [-2, 2, -2] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <path d="M8 2L4 6L8 10" fill="none" stroke="#a07850" strokeWidth="2" strokeLinecap="round"/>
                  </motion.svg>
                  Navigation Demo
                </div>
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setSettingsPage(0)}
                    className="px-4 py-2 border-2 border-coral text-coral text-xs font-bold rounded"
                    whileHover={{ x: -3, backgroundColor: '#E4663D', color: '#fffbe6' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reset
                  </motion.button>
                  <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="px-4 py-2 border-2 border-dark text-dark text-xs font-bold rounded"
                    whileHover={{ x: -3, backgroundColor: '#1a0800', color: '#fffbe6' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    To Top
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Mini game tip */}
            <motion.div
              className="mt-4 p-4 bg-dark/5 border border-dashed border-brown/30 rounded"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
            >
              <div className="text-[10px] tracking-[2px] uppercase text-brown/60 mb-2 flex items-center gap-2">
                <motion.svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <circle cx="6" cy="4" r="3" fill="#F7A840"/>
                  <rect x="4" y="7" width="4" height="3" rx="1" fill="#F7A840"/>
                </motion.svg>
                Pro Tip
              </div>
              <p className="text-xs text-brown/80">
                Try clicking around the page quickly for a surprise! Click the game nodes to see detailed stats.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
