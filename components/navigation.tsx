"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ["home", "work", "about", "contact"]
      let current = "home"

      sections.forEach((id) => {
        const el = document.getElementById(id)

        if (el && el.getBoundingClientRect().top < 120) {
          current = id
        }
      })

      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    })

    setMobileOpen(false)
  }, [])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[500] flex items-center px-8 h-[56px]"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          background: scrolled
            ? "rgba(0,0,0,0.97)"
            : "rgba(0,0,0,0.85)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex-1">
          {/* TGL Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2 group"
            aria-label="Go to top"
          >
            <svg width="28" height="28" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <rect x="2" y="2" width="76" height="76" rx="5" fill="#000000" />
              <polygon points="40,5 75,40 40,75 5,40" fill="none" stroke="#F8AA40" strokeWidth="2.5" />
              <line x1="24" y1="27" x2="38" y2="27" stroke="#F8AA40" strokeWidth="3.2" strokeLinecap="round"/>
              <line x1="31" y1="27" x2="31" y2="42" stroke="#F8AA40" strokeWidth="3.2" strokeLinecap="round"/>
              <path d="M43 35 Q43 26 51 26 Q58 26 58 31 L52.5 31" fill="none" stroke="#F8AA40" strokeWidth="3.2" strokeLinecap="round"/>
              <line x1="52.5" y1="31" x2="52.5" y2="36.5" stroke="#F8AA40" strokeWidth="3.2" strokeLinecap="round"/>
              <line x1="49" y1="36.5" x2="52.5" y2="36.5" stroke="#F8AA40" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="24" y1="46" x2="24" y2="57" stroke="#F8AA40" strokeWidth="3.2" strokeLinecap="round"/>
              <line x1="24" y1="57" x2="36" y2="57" stroke="#F8AA40" strokeWidth="3.2" strokeLinecap="round"/>
            </svg>
            <span className="hidden sm:block text-[11px] font-bold tracking-[0.12em] uppercase text-amber/80 group-hover:text-amber transition-colors">TGL</span>
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-[11px] font-medium tracking-[0.08em] uppercase px-4 py-1.5 rounded transition-all duration-200 ${
                activeSection === item.id
                  ? "text-amber bg-white/10"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex-1 flex justify-end">
          {/* CTA */}
          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:block text-[11px] font-bold tracking-[0.1em] uppercase bg-amber text-dark px-4 py-2 hover:opacity-85 transition-opacity"
          >
            Hire Me
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed top-[56px] left-0 right-0 z-[499] bg-dark/98 border-b border-white/10 py-4 px-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              backdropFilter: "blur(12px)",
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`block w-full text-left text-[13px] font-medium tracking-[0.08em] uppercase py-3 border-b border-white/5 last:border-none ${
                  activeSection === item.id
                    ? "text-amber"
                    : "text-white/60"
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => scrollTo("contact")}
              className="mt-3 w-full text-[11px] font-bold tracking-[0.1em] uppercase bg-amber text-dark py-3"
            >
              Hire Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}