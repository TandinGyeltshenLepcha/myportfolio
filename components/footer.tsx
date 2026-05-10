"use client"

export function Footer() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <footer className="bg-dark border-t border-white/[0.06] py-8">
      <div className="max-w-[1100px] mx-auto px-8 flex items-center justify-center">
        <div className="flex items-center gap-1">
          {["Home", "Work", "About", "Contact"].map((label) => (
            <button
              key={label}
              onClick={() => scrollTo(label.toLowerCase())}
              className="text-[11px] tracking-[0.08em] uppercase text-cream/30 hover:text-cream/60 px-3 py-1 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}
