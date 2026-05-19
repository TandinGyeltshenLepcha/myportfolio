"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

const projectTypes = ["Game UI", "HUD System", "Full Redesign", "Mobile Game", "Concept Art"]

export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle")
  const [selected, setSelected] = useState("Game UI")
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")
    setTimeout(() => setFormState("success"), 1500)
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="bg-dark py-24 relative overflow-hidden"
    >
      <div className="max-w-[1100px] mx-auto px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-cream/60">Get in touch</span>
              <div className="w-12 h-px bg-white/10" />
            </div>
            <h2 className="font-serif text-[clamp(32px,4vw,54px)] font-black leading-[1.05] text-cream mb-5">
              Got a project?<br />
              <span className="text-amber italic">Let's talk.</span>
            </h2>
            <p className="text-[15px] leading-[1.75] text-cream/50 font-light mb-8 max-w-[400px]">
              Whether you need a full HUD system or a single component polished to perfection — reach out and let's make it happen.
            </p>

            <div className="space-y-3">
              {[
                { icon: "✉", label: "Email", value: "tandingyeltshenlepcha@gmail.com", href: "mailto:tandingyeltshenlepcha@gmail.com" },
                { icon: "⬡", label: "LinkedIn", value: "linkedin.com/in/tandingyeltshenlepcha", href: "https://www.linkedin.com/in/tandingyeltshenlepcha" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? "_blank" : undefined}
                  rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-md border border-white/10 flex items-center justify-center text-cream/40 text-[14px] group-hover:border-cream/25 group-hover:text-cream/70 transition-all">
                    {link.icon}
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.12em] uppercase text-cream/60">{link.label}</div>
                    <div className="text-[13px] text-cream/55 group-hover:text-cream/80 transition-colors">{link.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {formState === "success" ? (
              <motion.div
                className="h-full flex flex-col items-center justify-center text-center py-12"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-14 h-14 rounded-full bg-teal/30 border border-teal flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="font-serif text-[24px] font-bold text-cream mb-2">Message Sent!</div>
                <p className="text-[14px] text-cream/50">I'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-medium tracking-[0.12em] uppercase text-cream/60 mb-2">Name</label>
                    <input
                      type="text" required placeholder="Your name"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-md px-3.5 py-2.5 text-[14px] text-white placeholder-white/50 focus:outline-none focus:border-amber/60 transition-colors caret-amber"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium tracking-[0.12em] uppercase text-cream/60 mb-2">Email</label>
                    <input
                      type="email" required placeholder="your@email.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-md px-3.5 py-2.5 text-[14px] text-white placeholder-white/50 focus:outline-none focus:border-amber/60 transition-colors caret-amber"
                    />
                  </div>
                </div>

                {/* Project type */}
                <div>
                  <label className="block text-[10px] font-medium tracking-[0.12em] uppercase text-cream/60 mb-2">Project Type</label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type} type="button"
                        onClick={() => setSelected(type)}
                        className={`text-[11px] font-medium tracking-[0.08em] uppercase px-3.5 py-2 rounded border transition-all
                          ${selected === type
                            ? "bg-coral border-coral text-cream"
                            : "border-white/10 text-cream/40 hover:border-white/25 hover:text-cream/70"
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10px] font-medium tracking-[0.12em] uppercase text-cream/60 mb-2">Message</label>
                  <textarea
                    required rows={4} placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-md px-3.5 py-2.5 text-[14px] text-white placeholder-white/50 focus:outline-none focus:border-amber/60 transition-colors resize-none caret-amber"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="flex items-center gap-2 text-[12px] font-medium tracking-[0.1em] uppercase bg-coral text-cream px-7 py-3.5 rounded-none"
                  style={{ boxShadow: "4px 4px 0 #d68a1a" }}
                  whileHover={{ x: -2, y: -2, boxShadow: "6px 6px 0 #d68a1a" }}
                  whileTap={{ scale: 0.97 }}
                >
                  {formState === "submitting" ? "Sending…" : "Send Message"}
                  {formState !== "submitting" && (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12"/>
                    </svg>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
