"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { PowerBar } from "@/components/game-effects"
import { CustomCursor } from "@/components/custom-cursor"

const rarityColors = {
  rare: { bg: "#4a9eff", text: "#4a9eff", glow: "rgba(74, 158, 255, 0.4)" },
  epic: { bg: "#9c27b0", text: "#c77dff", glow: "rgba(156, 39, 176, 0.4)" },
  legendary: { bg: "#F8AA40", text: "#F8AA40", glow: "rgba(248, 170, 64, 0.5)" }
}

interface Project {
  id: string
  title: string
  subtitle: string
  hook: string
  tag: string
  tagColor: string
  tagBg: string
  year: string
  difficulty: number
  rarity: "rare" | "epic" | "legendary"
}

const projects: Record<string, Project> = {
  "city-peak": {
    id: "city-peak",
    title: "City Peak",
    subtitle: "Playable Game Website",
    hook: "What if a website felt like taking a breath — not consuming content, but actually playing?",
    tag: "Game UI/UX",
    tagColor: "#F8AA40",
    tagBg: "rgba(248,170,64,.12)",
    year: "2025",
    difficulty: 90,
    rarity: "legendary"
  },
  "hephaestus-gun": {
    id: "hephaestus-gun",
    title: "Hephaestus Gun",
    subtitle: "Myth-Inspired Weapon Design",
    hook: "A weapon should tell its story before it's ever fired — through material, form, and myth.",
    tag: "Concept Art",
    tagColor: "#F8AA40",
    tagBg: "rgba(248,170,64,.12)",
    year: "2025",
    difficulty: 85,
    rarity: "epic"
  },
  "card-battles": {
    id: "card-battles",
    title: "Card Battles",
    subtitle: "Strategic Type-Based Gameplay",
    hook: "Luck is lazy design. Every card in this system demands that you think.",
    tag: "Game Design",
    tagColor: "#F8AA40",
    tagBg: "rgba(248,170,64,.12)",
    year: "2025",
    difficulty: 80,
    rarity: "rare"
  }
}

const projectDetails: Record<string, {
  overview: string
  contributed: string
  tools: string
  impact: string
  why: string
  howSolved: string
  overviewLong: string
  reflections: string[]
  images: string[]
  uiAssets?: {
    teamCards?: string
    zomboyButton?: string
    retryButton?: string
    mainMenuOrange?: string
    mainMenuGray?: string
    nextLevelButton?: string
    nextButton?: string
    restartButton?: string
    backButtonOrange?: string
    backButtonRed?: string
  }
}> = {
  "city-peak": {
    overview: "I Created a Playable Game website with an immersive storyline",
    contributed: "UI/UX Designer, Team Lead, Game Concept Designer & Story Writer",
    tools: "Game UI Design, UX Design, Figma, Adobe Photoshop, Adobe Illustrator",
    impact: "Improved user engagement through simple, low-friction gameplay",
    why: "Despite increased screen time, websites rarely incorporate playful or relaxing interactions, resulting in monotonous user experiences and reduced engagement.",
    howSolved: "City Peak introduces a casual game environment where players can interact with simple game mechanics that are easy to understand and enjoyable to play. The design prioritizes accessibility and minimal complexity to encourage quick engagement and relaxation.",
    overviewLong: "Traditional websites are primarily designed for information consumption, offering static and task-focused experiences. This results in low engagement and fails to provide users with opportunities for quick mental breaks or stress relief during digital usage. Instead of designing another content-driven website, I reimagined the platform as an interactive experience by integrating casual gameplay and simplifying the interface to ensure effortless interaction and accessibility. This resulted in a web platform that enhances user engagement while providing a simple and effective way for users to relax, demonstrating how interactive design can transform passive browsing into meaningful experiences.",
    reflections: [
      "Learned how to design for low cognitive load, ensuring users can interact without confusion or effort.",
      "Understood the importance of simplicity in game design, especially for casual and stress-relief experiences.",
      "Improved my ability to combine interaction design with user experience, rather than treating them separately.",
      "Realized that websites can go beyond information delivery and become engaging, interactive environments."
    ],
    images: ["/icons/HomePage.png"],
    uiAssets: {
      teamCards: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2094%20%281%29-3dy64dwhJSQVxxUvIkSUIRMuXfoT2U.jpg",
      nextButton: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%20100-feH4IejjrqSBnGEHiRTBJ8w8anwAU1.png",
      restartButton: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Restart-KnAkaQA9oodvwmb7AvP09un0s87fTk.png",
      retryButton: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2098-WLR3Ig7Mx9sYcxRLKshvwpJqdvMSJ0.png",
      nextLevelButton: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2096-IQDvqMQckPpp4gIsM8JGjFAMun2K0e.png",
      mainMenuOrange: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2099-S2oPLgDmzkz82lHuqzK9vKh4e0bffw.png",
      mainMenuGray: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2095-vKLuUMElzbCWUQWUMF4U5uLOIIQVpU.png",
      zomboyButton: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2097-EdVaKwSmacPO0A4RBH1ueXWbA1BN7V.png",
      backButtonOrange: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Component%2015-F7hwtm5ABwz7bsuTAV8Agg7DrMYOj9.png",
      backButtonRed: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Component%2014-BEeF4v6oWQ2JxC8kgaMKN6Wh3mQl52.png"
    }
  },
  "hephaestus-gun": {
    overview: "Designing a Myth-Inspired Weapon Through Material Storytelling",
    contributed: "Concept Designer, Weapon Designer",
    tools: "Concept Design, Material Design, Adobe Illustrator",
    impact: "Created a narrative-driven weapon design combining mythology and modern aesthetics",
    why: "Many fictional weapon designs focus only on appearance without communicating material purpose or narrative context.",
    howSolved: "The final concept integrates three main elements: a metallic alloy structure, a leather grip for comfort, and a gemstone core representing the weapon's power source. These components create a visually distinctive and narratively meaningful design.",
    overviewLong: "Many concept designs focus only on visual appeal without conveying story or functional logic. Instead of designing purely for aesthetics, I developed a weapon concept where materials, form, and structure reflect both narrative inspiration and usability. This resulted in a design that communicates both visual identity and functional intent, highlighting the importance of storytelling in concept art.",
    reflections: [
      "This project helped me understand the importance of designing with intention rather than just aesthetics.",
      "I learned how to use elements such as materials, structure, and form to communicate a deeper narrative.",
      "The integration of mythological inspiration with modern design pushed me to think more critically about how visuals can convey meaning beyond appearance.",
      "Overall, this project improved my ability to approach design as a combination of storytelling, function, and visual clarity."
    ],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digitalization%20with%20description-chIb4H7RVY0KXCWqqQT5lS0H4Zibmg.png"
    ]
  },
  "card-battles": {
    overview: "Designing Strategy Through Type-Based Gameplay",
    contributed: "Game Designer, Visual Designer, Game Mechanic Designer",
    tools: "Game Mechanics Design, UI Design, Figma",
    impact: "Created a balanced system emphasizing strategy over randomness",
    why: "Many simple card games rely heavily on luck rather than player decision-making. This can reduce long-term engagement because players feel they have limited control over the outcome.",
    howSolved: "Instead of relying on randomness, I designed a type-based system where each card interacts strategically with others, requiring players to think and plan their moves. This resulted in a more engaging and skill-based gameplay experience, demonstrating how mechanics and visual design can work together.",
    overviewLong: "Many traditional card games rely heavily on chance, limiting player control and long-term engagement. Instead of relying on randomness, I designed a type-based system where each card interacts strategically with others, requiring players to think and plan their moves. This resulted in a more engaging and skill-based gameplay experience, demonstrating how mechanics and visual design can work together.",
    reflections: [
      "This project strengthened my understanding of how game mechanics and visual design work together to create engaging experiences.",
      "I learned the importance of balancing simplicity and strategy, ensuring that the game is easy to understand while still offering meaningful player decisions.",
      "Designing the type-based system also helped me think more about user interaction and decision-making.",
      "This project improved my ability to design systems that are not only visually clear but also functionally engaging and strategically meaningful."
    ],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Property%201%3DDefault-wIkeF3UYEFei8Psfa6lLCLfO9spK39.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Property%201%3DGame%20Battle%20Screen%20%28Forest%29%20%281%29%201-WjjGm5aDKTq0ULcHiUrd4s5Z0v0TeR.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Property%201%3DIntro%202%201-b4Pm0nbvXKUOQ7gI9rK1udmftWMJt1.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Property%201%3DUpgrade%2013%201-cXdeQg3ecOghZ8tVKn3O8jud5upfub.png"
    ]
  }
}


export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const project = projects[id]
  const details = projectDetails[id]

  const handleBackToHome = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("gameStarted", "true")
    }
    router.push("/")
  }

  if (!project || !details) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#000" }}>
        <CustomCursor />
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold mb-4" style={{ color: "#F8AA40" }}>Project Not Found</h1>
          <button onClick={handleBackToHome} className="underline" style={{ color: "#F8AA40" }}>Back to Work</button>
        </div>
      </div>
    )
  }

  const rarity = rarityColors[project.rarity]

  return (
    <main className="min-h-screen" style={{ background: "#000000", color: "#FFFFFF" }}>
      <CustomCursor />

      {/* NAV BAR — matches home nav exactly */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center px-8 h-[56px]"
        style={{
          background: "rgba(0,0,0,0.97)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Empty left spacer — mirrors home nav */}
        <div className="flex-1" />

        {/* Centre: current project label */}
        <div className="hidden md:flex items-center gap-1">
          <span className="text-[11px] font-medium tracking-[0.08em] uppercase px-4 py-1.5 text-amber bg-white/10 rounded">
            {project.title}
          </span>
        </div>

        {/* Right: Hire Me — identical to home nav */}
        <div className="flex-1 flex justify-end">
          <button
            onClick={handleBackToHome}
            className="hidden md:block text-[11px] font-bold tracking-[0.1em] uppercase bg-amber text-dark px-4 py-2 hover:opacity-85 transition-opacity"
            style={{ color: "#000", background: "#F8AA40" }}
          >
            Hire Me
          </button>

          {/* Mobile */}
          <button
            onClick={handleBackToHome}
            className="md:hidden text-[11px] font-bold tracking-[0.1em] uppercase bg-amber text-dark px-4 py-2"
            style={{ color: "#000", background: "#F8AA40" }}
          >
            Hire Me
          </button>
        </div>
      </motion.header>

      {/* HERO / HOOK SECTION */}
      <section className="pt-14 min-h-[70vh] flex flex-col justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(248,170,64,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(248,170,64,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 relative z-10">

          <motion.div
            className="flex items-center gap-4 mb-8 text-[10px] tracking-[2.5px] uppercase font-bold"
            style={{ color: "rgba(248,170,64,0.6)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span>{project.year}</span>
            <span style={{ color: "#F8AA40" }}>◆</span>
            <span>{project.subtitle}</span>
          </motion.div>

          <motion.h1
            className="font-serif font-black mb-8 leading-none"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "#FFFFFF", letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >{project.title}</motion.h1>

          {/* THE HOOK — gold, large, clearly visible */}
          <motion.div
            className="relative pl-6 mb-10"
            style={{ borderLeft: "3px solid #F8AA40" }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <p
              className="font-serif italic leading-snug"
              style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.65rem)", color: "#F8AA40", maxWidth: "680px" }}
            >"{project.hook}"</p>
            <span className="block mt-2 text-[9px] tracking-[2.5px] uppercase font-bold" style={{ color: "rgba(248,170,64,0.45)" }}>
              The Hook
            </span>
          </motion.div>

          {/* The Book — overview */}
          <motion.p
            className="text-lg leading-relaxed max-w-2xl"
            style={{ color: "rgba(255,255,255,0.6)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >{details.overview}</motion.p>
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(248,170,64,0.3), transparent)" }} />

      {/* INFO GRID */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: "rgba(248,170,64,0.12)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { label: "What I Contributed", value: details.contributed },
            { label: "Tools Used", value: details.tools },
            { label: "Impact", value: details.impact },
          ].map((item, i) => (
            <div key={i} className="p-8" style={{ background: "#0a0a0a" }}>
              <div className="text-[9px] tracking-[2.5px] uppercase font-bold mb-3" style={{ color: "#F8AA40" }}>{item.label}</div>
              <div className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{item.value}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* WHY */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <div className="flex items-center gap-4 mb-6">
            <span className="w-9 h-9 rounded-full flex items-center justify-center font-serif font-black text-sm" style={{ background: "#F8AA40", color: "#000" }}>?</span>
            <h2 className="font-serif text-2xl font-bold" style={{ color: "#FFFFFF" }}>Why This Project</h2>
          </div>
          <p className="text-base leading-relaxed max-w-3xl" style={{ color: "rgba(255,255,255,0.6)" }}>{details.why}</p>
        </motion.div>
      </section>

      {/* HOW I SOLVED */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div className="flex items-center gap-4 mb-6">
            <span className="w-9 h-9 rounded-full flex items-center justify-center font-serif font-black text-sm" style={{ background: "#1a1a1a", color: "#F8AA40", border: "1.5px solid #F8AA40" }}>!</span>
            <h2 className="font-serif text-2xl font-bold" style={{ color: "#FFFFFF" }}>How I Solved It</h2>
          </div>
          <div className="space-y-6 max-w-3xl">
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{details.howSolved}</p>
            <blockquote
              className="p-6 italic text-base leading-relaxed"
              style={{ borderLeft: "3px solid rgba(248,170,64,0.5)", background: "rgba(248,170,64,0.05)", color: "rgba(255,255,255,0.65)" }}
            >{details.overviewLong}</blockquote>
          </div>
        </motion.div>
      </section>

      {/* REFLECTIONS */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <div className="flex items-center gap-4 mb-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#F8AA40"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
            <h2 className="font-serif text-2xl font-bold" style={{ color: "#FFFFFF" }}>Reflections</h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {details.reflections.map((reflection, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-4 p-5 text-sm leading-relaxed"
                style={{ background: "#0d0d0d", border: "1px solid rgba(248,170,64,0.1)", color: "rgba(255,255,255,0.7)" }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
              >
                <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#F8AA40" }} />
                {reflection}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* PROJECT SHOWCASE — images moved to bottom */}
      {details.images && details.images.length > 0 && (
        <section style={{ background: "#050505", borderTop: "1px solid rgba(248,170,64,0.15)" }}>
          <div className="max-w-5xl mx-auto px-6 md:px-10 py-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <div className="text-[9px] tracking-[3px] uppercase font-bold mb-3" style={{ color: "rgba(248,170,64,0.5)" }}>Project Showcase</div>
              <h2 className="font-serif text-3xl font-bold mb-12" style={{ color: "#FFFFFF" }}>Visual Work</h2>
              <div className="space-y-8">
                {details.images.map((img, i) => (
                  <motion.div
                    key={i}
                    className="relative overflow-hidden"
                    style={{ border: "1px solid rgba(248,170,64,0.15)" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75 + i * 0.1 }}
                  >
                    <img
                      src={img}
                      alt={`${project.title} showcase ${i + 1}`}
                      className="w-full h-auto object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/1200x675/0a0a0a/F8AA40?text=Image+Loading" }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)" }} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* UI ASSETS */}
      {details.uiAssets && (
        <section style={{ background: "#050505" }}>
          <div className="max-w-5xl mx-auto px-6 md:px-10 pb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
              <div className="text-[9px] tracking-[3px] uppercase font-bold mb-3" style={{ color: "rgba(248,170,64,0.5)" }}>Design System</div>
              <h2 className="font-serif text-3xl font-bold mb-12" style={{ color: "#FFFFFF" }}>UI Assets</h2>
              <div className="space-y-12">
                {details.uiAssets.teamCards && (
                  <div className="p-8" style={{ background: "#0a0a0a", border: "1px solid rgba(248,170,64,0.12)" }}>
                    <div className="text-[9px] tracking-[2.5px] uppercase font-bold mb-2" style={{ color: "#F8AA40" }}>Character Identity</div>
                    <h3 className="text-base font-bold mb-6" style={{ color: "#FFF" }}>Team Character Cards</h3>
                    <img src={details.uiAssets.teamCards} alt="Team character cards" className="w-full h-auto object-contain" />
                    <p className="mt-4 text-xs italic text-center" style={{ color: "rgba(255,255,255,0.3)" }}>Featuring Tandin, Lepcha, and Yangki</p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8" style={{ background: "#0a0a0a", border: "1px solid rgba(248,170,64,0.12)" }}>
                    <div className="text-[9px] tracking-[2.5px] uppercase font-bold mb-6" style={{ color: "#F8AA40" }}>Action Components</div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { img: details.uiAssets.nextButton, label: "Next" },
                        { img: details.uiAssets.restartButton, label: "Restart" },
                        { img: details.uiAssets.retryButton, label: "Retry" },
                        { img: details.uiAssets.nextLevelButton, label: "Next Level" },
                      ].map((btn, i) => btn.img && (
                        <div key={i} className="text-center">
                          <div className="p-4" style={{ background: "#111", border: "1px solid rgba(248,170,64,0.08)" }}>
                            <img src={btn.img} alt={btn.label} className="w-full h-auto" />
                          </div>
                          <div className="mt-2 text-[8px] tracking-[1.5px] uppercase font-bold" style={{ color: "rgba(248,170,64,0.4)" }}>{btn.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-8" style={{ background: "#0a0a0a", border: "1px solid rgba(248,170,64,0.12)" }}>
                    <div className="text-[9px] tracking-[2.5px] uppercase font-bold mb-6" style={{ color: "#F8AA40" }}>Navigation</div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { img: details.uiAssets.mainMenuOrange, label: "Menu (Outline)" },
                          { img: details.uiAssets.mainMenuGray, label: "Menu (Solid)" },
                        ].map((btn, i) => btn.img && (
                          <div key={i} className="text-center">
                            <div className="p-4" style={{ background: "#111", border: "1px solid rgba(248,170,64,0.08)" }}>
                              <img src={btn.img} alt={btn.label} className="w-full h-auto" />
                            </div>
                            <div className="mt-2 text-[8px] tracking-[1px] uppercase font-bold" style={{ color: "rgba(248,170,64,0.3)" }}>{btn.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { img: details.uiAssets.backButtonOrange, label: "Back (Gold)" },
                          { img: details.uiAssets.backButtonRed, label: "Back (Red)" },
                        ].map((btn, i) => btn.img && (
                          <div key={i} className="text-center">
                            <div className="p-4 flex justify-center" style={{ background: "#111", border: "1px solid rgba(248,170,64,0.08)" }}>
                              <img src={btn.img} alt={btn.label} className="h-10 w-auto" />
                            </div>
                            <div className="mt-2 text-[8px] tracking-[1px] uppercase font-bold" style={{ color: "rgba(248,170,64,0.3)" }}>{btn.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* COMPLEXITY BAR */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-16" style={{ borderTop: "1px solid rgba(248,170,64,0.1)" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <PowerBar value={project.difficulty} max={100} color="#F8AA40" label="Project Complexity" showPulse={true} />
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center" style={{ background: "#000", borderTop: "1px solid rgba(248,170,64,0.15)" }}>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleBackToHome}
            className="text-[10px] tracking-[2px] uppercase font-bold px-6 py-2.5 transition-all duration-200"
            style={{ background: "#F8AA40", color: "#000" }}
            onMouseEnter={e => ((e.target as HTMLElement).style.opacity = "0.85")}
            onMouseLeave={e => ((e.target as HTMLElement).style.opacity = "1")}
          >← View All Projects</button>
        </div>
      </footer>
    </main>
  )
}
