"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { WavesSvg } from "./svg-components"
import { PowerBar, GameSpinner, KeyboardKey } from "./game-effects"

const projectTypes = [
  { 
    label: "Game UI", 
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ), 
    xp: 100, 
    color: "#E4663D" 
  },
  { 
    label: "HUD System", 
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
        <path d="M8 14h8"/>
      </svg>
    ), 
    xp: 150, 
    color: "#4a6a60" 
  },
  { 
    label: "Full Redesign", 
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ), 
    xp: 200, 
    color: "#F7A840" 
  },
  { 
    label: "Mobile Game", 
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ), 
    xp: 120, 
    color: "#9c27b0" 
  },
]

export function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  })
  const [selectedType, setSelectedType] = useState<number | null>(null)
  const [charCount, setCharCount] = useState(0)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Calculate form completion
  const completionFields = [
    formData.name.length > 0,
    formData.email.length > 0,
    selectedType !== null,
    formData.message.length > 10
  ]
  const completionPercentage = (completionFields.filter(Boolean).length / completionFields.length) * 100

  useEffect(() => {
    setCharCount(formData.message.length)
  }, [formData.message])

  const handleSubmit = () => {
    if (completionPercentage === 100 && formState !== "submitting") {
      setFormState("submitting")
      setTimeout(() => setFormState("success"), 1500)
    }
  }

  // Handle Enter key press to submit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey && completionPercentage === 100 && formState === "idle") {
        // Don't submit if user is in textarea (allow new lines with Enter)
        if (document.activeElement?.tagName === "TEXTAREA") return
        e.preventDefault()
        handleSubmit()
      }
    }
    
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [completionPercentage, formState])

  return (
    <section 
      ref={ref}
      id="contact" 
      className="bg-amber py-24 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-brown/20" />
      
      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-20 left-20 opacity-40"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          {/* Chat bubble icon */}
          <rect x="4" y="6" width="32" height="24" rx="4" fill="#E4663D"/>
          <path d="M8 28L4 34L12 30" fill="#E4663D"/>
          <circle cx="14" cy="18" r="2" fill="#fffbe6"/>
          <circle cx="20" cy="18" r="2" fill="#fffbe6"/>
          <circle cx="26" cy="18" r="2" fill="#fffbe6"/>
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-10 opacity-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <rect x="2" y="4" width="20" height="14" rx="2" fill="#4a6a60"/>
          <circle cx="7" cy="16" r="2" fill="#4a6a60"/>
        </svg>
      </motion.div>
      
      {/* Accent bar */}
      <motion.div 
        className="absolute top-3.5 right-3.5 w-3.5 h-20 bg-teal"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.6 }}
        style={{ transformOrigin: "top" }}
      />

      {/* Waves decoration */}
      <motion.div 
        className="absolute bottom-10 right-10"
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <WavesSvg flip />
      </motion.div>

      <div className="max-w-[700px] mx-auto px-10 relative z-10">
        {/* Quest banner */}
        <motion.div
          className="bg-dark text-cream p-4 rounded-t flex items-center justify-between mb-0"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-full bg-coral flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M4 3h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" fill="#fffbe6"/>
                <path d="M6 7h8M6 10h8M6 13h4" stroke="#1a0800" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </motion.div>
            <div>
              <div className="font-serif font-bold">New Quest Available</div>
              <div className="text-[10px] text-coral tracking-[2px] uppercase">Contact Form</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-cream/60 tracking-[1px]">Reward</div>
            <div className="text-coral font-bold">+500 XP</div>
          </div>
        </motion.div>

        {/* Stamp */}
        <motion.div 
          className="flex justify-center my-5"
          initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
          animate={isInView ? { opacity: 0.4, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.6, type: "spring" }}
          whileHover={{ opacity: 1, scale: 1.1, rotate: 10 }}
          data-cursor="stamp"
        >
          <div className="w-20 h-20 border-2 border-brown/50 rounded flex items-center justify-center relative overflow-hidden">
            <div className="w-[62px] h-[62px] border border-brown/60 flex flex-col items-center justify-center text-[9px] tracking-[1px] text-brown text-center leading-[1.8] font-medium">
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="mb-0.5">
                <path d="M6 1L7 5L11 6L7 7L6 11L5 7L1 6L5 5Z" fill="currentColor"/>
              </svg>
              <span>{"LET'S"}</span>
              <span>BUILD</span>
            </div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
              whileHover={{ translateX: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        <motion.span 
          className="text-[11px] tracking-[5px] uppercase text-coral font-medium flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {/* Paper plane / send icon */}
            <path d="M22 2L11 13" stroke="#E4663D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#E4663D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
          Contact
        </motion.span>

        <motion.h2 
          className="font-serif text-[clamp(28px,4vw,52px)] font-black text-dark text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          Got a game that needs
          <br />
          <motion.em 
            className="text-coral"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            a real UI?
          </motion.em>
        </motion.h2>

        <motion.p 
          className="font-sans text-[15px] text-brown leading-[1.8] text-center mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          New project? HUD from scratch? Redesigning a live game? Let&apos;s talk.
        </motion.p>

        {/* Form completion progress */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <PowerBar 
            value={completionPercentage} 
            max={100} 
            color={completionPercentage === 100 ? "#27ae60" : "#E4663D"}
            label="Quest Progress"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {formState !== "success" ? (
            <motion.div
              key="form"
              className="bg-cream p-10 rounded shadow-[8px_8px_0_rgba(122,60,0,.55)] relative overflow-hidden"
              initial={{ opacity: 0, y: 30, rotate: -0.4 }}
              animate={{ opacity: 1, y: 0, rotate: -0.4 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ transform: "rotate(-0.4deg)" }}
            >
              {/* Field labels */}
              <AnimatePresence>
                {focusedField && (
                  <motion.div
                    className="absolute top-2 right-2 bg-dark text-cream px-2 py-1 rounded text-[9px] tracking-[1px] uppercase"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    Editing: {focusedField}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Project type selector - game style */}
              <div className="mb-4">
                <div className="text-[10px] tracking-[2px] uppercase text-brown/60 mb-2">Select Quest Type</div>
                <div className="grid grid-cols-2 gap-2">
                  {projectTypes.map((type, i) => (
                    <motion.button
                      key={i}
                      onClick={() => {
                        setSelectedType(i)
                        setFormData({ ...formData, project: type.label })
                      }}
                      className={`p-3 rounded border-2 text-left transition-all ${
                        selectedType === i 
                          ? "bg-coral/10 border-coral" 
                          : "bg-amber/30 border-brown/20 hover:border-brown/40"
                      }`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span 
                          className="w-8 h-8 rounded-full flex items-center justify-center text-cream"
                          style={{ backgroundColor: type.color }}
                        >
                          {type.icon}
                        </span>
                        {selectedType === i && (
                  <motion.svg
                    width="16" height="16" viewBox="0 0 16 16"
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    aria-hidden="true"
                  >
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </motion.svg>
                        )}
                      </div>
                      <div className="text-sm font-bold text-dark mt-1">{type.label}</div>
                      <div className="text-[9px] text-teal">+{type.xp} XP</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
                <div className="relative">
                  <label htmlFor="contact-name" className="sr-only">Your name</label>
                  <motion.input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    aria-required="true"
                    className={`w-full bg-amber/35 border-[1.5px] rounded px-3.5 py-3 text-dark font-sans text-sm outline-none transition-all ${
                      focusedField === "name" ? "border-coral bg-amber/50" : "border-brown/35"
                    }`}
                    whileFocus={{ scale: 1.02 }}
                  />
                  {formData.name.length > 0 && (
                    <motion.span 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      aria-label="Valid"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                        <path d="M3 7L6 10L11 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.span>
                  )}
                </div>
                <div className="relative">
                  <label htmlFor="contact-email" className="sr-only">Email address</label>
                  <motion.input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    aria-required="true"
                    className={`w-full bg-amber/35 border-[1.5px] rounded px-3.5 py-3 text-dark font-sans text-sm outline-none transition-all ${
                      focusedField === "email" ? "border-coral bg-amber/50" : "border-brown/35"
                    }`}
                    whileFocus={{ scale: 1.02 }}
                  />
                  {formData.email.includes("@") && (
                    <motion.span 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      aria-label="Valid email"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                        <path d="M3 7L6 10L11 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.span>
                  )}
                </div>
              </div>

              <div className="relative mb-4">
                <label htmlFor="contact-message" className="sr-only">Project message</label>
                <motion.textarea
                  id="contact-message"
                  placeholder="Tell me about the game..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  aria-required="true"
                  aria-describedby="char-count"
                  className={`w-full bg-amber/35 border-[1.5px] rounded px-3.5 py-3 text-dark font-sans text-sm outline-none transition-all min-h-[110px] resize-y ${
                    focusedField === "message" ? "border-coral bg-amber/50" : "border-brown/35"
                  }`}
                  whileFocus={{ scale: 1.01 }}
                />
                <div id="char-count" className="absolute bottom-2 right-2 text-[10px] text-brown/50" aria-live="polite">
                  <span className="sr-only">{charCount} of 500 characters used</span>
                  <span aria-hidden="true">{charCount}/500</span>
                </div>
              </div>

              {/* Submit button with keyboard hint */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <motion.button
                  onClick={handleSubmit}
                  className={`px-8 py-3.5 text-cream border-none rounded font-sans text-xs font-medium tracking-[2px] uppercase shadow-[4px_4px_0_#1a0800] flex items-center gap-2 ${
                    completionPercentage === 100 ? "bg-coral" : "bg-brown/40 cursor-not-allowed"
                  }`}
                  data-cursor={completionPercentage === 100 ? "send" : "locked"}
                  whileHover={completionPercentage === 100 ? { x: -2, y: -2, boxShadow: "6px 6px 0 #1a0800" } : {}}
                  whileTap={completionPercentage === 100 ? { scale: 0.98 } : {}}
                  disabled={formState === "submitting" || completionPercentage < 100}
                >
                  {formState === "submitting" ? (
                    <>
                      <GameSpinner />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Quest</span>
                      <motion.svg
                        width="14" height="14" viewBox="0 0 14 14"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        aria-hidden="true"
                      >
                        <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      </motion.svg>
                    </>
                  )}
                </motion.button>

                <div className="flex items-center gap-2 text-[10px] text-brown/50">
                  <span>or press</span>
                  <KeyboardKey char="Enter" />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className="p-10 bg-dark text-cream rounded text-center relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Confetti effect */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: ["#E4663D", "#F7A840", "#4a6a60", "#fffbe6"][i % 4],
                    left: `${Math.random() * 100}%`,
                    top: 0
                  }}
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: 300, opacity: 0, rotate: Math.random() * 360 }}
                  transition={{ duration: 2, delay: i * 0.05 }}
                />
              ))}

              <motion.div 
                className="mb-4 flex justify-center"
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.3, 1.3, 1]
                }}
                transition={{ duration: 0.6 }}
              >
                <svg width="56" height="56" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="24" fill="#E4663D"/>
                  <path d="M20 28L26 34L38 22" fill="none" stroke="#fffbe6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
              
              <div className="flex items-center justify-center gap-2 mb-2">
                <motion.div
                  className="text-coral text-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                >
                  +500 XP
                </motion.div>
              </div>

              <h3 className="font-serif text-2xl font-bold">Quest Complete!</h3>
              <p className="font-sans text-sm text-cream/70 mt-2">
                Message received! I&apos;ll be in touch shortly.
              </p>

              <motion.div
                className="mt-4 text-[10px] text-cream/50 tracking-[2px] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Achievement Unlocked: First Contact
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
