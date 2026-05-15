"use client"

import { motion } from "framer-motion"

export function Footer() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <footer className="bg-dark border-t border-white/[0.06] py-8">
      <div className="max-w-[1100px] mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => scrollTo("home")}
          className="font-serif text-[16px] font-black text-cream hover:text-amber transition-colors"
        >
          G<span className="text-amber">.</span>UI
        </button>

        <div className="flex items-center gap-1">
          {["Home", "Work", "About", "Contact"].map((label, i) => (
            <button
              key={label}
              onClick={() => scrollTo(label.toLowerCase())}
              className="text-[11px] tracking-[0.08em] uppercase text-cream/30 hover:text-cream/60 px-3 py-1 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-end gap-1">
          <a 
            href="mailto:tandingyeltshenlepcha@gmail.com" 
            className="text-[12px] text-cream/40 hover:text-amber transition-colors"
          >
            tandingyeltshenlepcha@gmail.com
          </a>
          <a 
            href="https://www.linkedin.com/in/tandingyeltshenlepcha" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[12px] text-cream/40 hover:text-amber transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
