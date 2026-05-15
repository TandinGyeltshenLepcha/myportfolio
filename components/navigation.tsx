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
        className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-8 h-[56px]"
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
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="font-serif text-[18px] font-black text-cream tracking-tight"
          aria-label="Go to top"
        >
          TG
        </button>

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

        {/* CTA */}
        <button
          onClick={() => scrollTo("contact")}
          className="hidden md:block text-[11px] font-medium tracking-[0.1em] uppercase bg-dark text-amber px-4 py-2 rounded hover:opacity-85 transition-opacity"
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
          >
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
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
              className="mt-3 w-full text-[11px] font-medium tracking-[0.1em] uppercase bg-coral text-cream py-3 rounded"
            >
              Hire Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}