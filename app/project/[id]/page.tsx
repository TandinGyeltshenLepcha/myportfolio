"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { PowerBar } from "@/components/game-effects"
import { CustomCursor } from "@/components/custom-cursor"

const rarityColors = {
  rare: { bg: "#4a9eff", text: "#2563eb", glow: "rgba(74, 158, 255, 0.5)" },
  epic: { bg: "#9c27b0", text: "#7b1fa2", glow: "rgba(156, 39, 176, 0.5)" },
  legendary: { bg: "#ff9800", text: "#f57c00", glow: "rgba(255, 152, 0, 0.5)" }
}

interface Project {
  id: string
  title: string
  subtitle: string
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
    tag: "Game UI/UX",
    tagColor: "#27ae60",
    tagBg: "rgba(39,174,96,.15)",
    year: "2025",
    difficulty: 90,
    rarity: "legendary"
  },
  "hephaestus-gun": {
    id: "hephaestus-gun",
    title: "Hephaestus Gun",
    subtitle: "Myth-Inspired Weapon Design",
    tag: "Concept Art",
    tagColor: "#e67e22",
    tagBg: "rgba(230,126,34,.15)",
    year: "2025",
    difficulty: 85,
    rarity: "epic"
  },
  "card-battles": {
    id: "card-battles",
    title: "Card Battles",
    subtitle: "Strategic Type-Based Gameplay",
    tag: "Game Design",
    tagColor: "#c0392b",
    tagBg: "rgba(192,57,43,.15)",
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
    rockPaperScissors?: string
    settingsMenuOrange?: string
    settingsMenuRed?: string
    skillTreeIcons?: string
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
    overview: "Creating a Playable Game website with an immersive storyline",
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
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-17%20220608-2Y3Yl6zS6fL7xRz9jX5Q6g3fJ7w5Y7.png"],
    uiAssets: {
      rockPaperScissors: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%20131-X1orlNZH6vdbq6cmmKCyEf0vDgRsq6.png",
      settingsMenuOrange: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2016-AXt0PZSTE8Yk521N0gbA1FAfKUAqSq.png",
      settingsMenuRed: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2015-5PoYG1joQaGOAYKPKn5EQaUDJmMLX0.png",
      skillTreeIcons: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%20133-etx2Xd7auwZ52NlTnU7c0Za5SUeWTu.jpg",
      teamCards: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2094%20%281%29-3dy64dwhJSQVxxUvIkSUIRMuXfoT2U.jpg",
      zomboyButton: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2097-EdVaKwSmacPO0A4RBH1ueXWbA1BN7V.png",
      retryButton: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2098-WLR3Ig7Mx9sYcxRLKshvwpJqdvMSJ0.png",
      mainMenuOrange: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2099-S2oPLgDmzkz82lHuqzK9vKh4e0bffw.png",
      mainMenuGray: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2095-vKLuUMElzbCWUQWUMF4U5uLOIIQVpU.png",
      nextLevelButton: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2096-IQDvqMQckPpp4gIsM8JGjFAMun2K0e.png",
      nextButton: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%20100-feH4IejjrqSBnGEHiRTBJ8w8anwAU1.png",
      restartButton: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Restart-KnAkaQA9oodvwmb7AvP09un0s87fTk.png",
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
  
  const [expandedAsset, setExpandedAsset] = useState<string | null>(null)
  const [selectedRPS, setSelectedRPS] = useState<'rock' | 'paper' | 'scissors' | null>(null)
  const [cpuChoice, setCpuChoice] = useState<'rock' | 'paper' | 'scissors' | null>(null)
  const [gameResult, setGameResult] = useState<'win' | 'lose' | 'draw' | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playerScore, setPlayerScore] = useState(0)
  const [cpuScore, setCpuScore] = useState(0)
  
  const playRPS = (choice: 'rock' | 'paper' | 'scissors') => {
    if (isPlaying) return
    setIsPlaying(true)
    setSelectedRPS(choice)
    setCpuChoice(null)
    setGameResult(null)
    
    // Simulate CPU thinking
    setTimeout(() => {
      const choices: ('rock' | 'paper' | 'scissors')[] = ['rock', 'paper', 'scissors']
      const cpu = choices[Math.floor(Math.random() * 3)]
      setCpuChoice(cpu)
      
      // Determine winner
      let result: 'win' | 'lose' | 'draw'
      if (choice === cpu) {
        result = 'draw'
      } else if (
        (choice === 'rock' && cpu === 'scissors') ||
        (choice === 'paper' && cpu === 'rock') ||
        (choice === 'scissors' && cpu === 'paper')
      ) {
        result = 'win'
        setPlayerScore(prev => prev + 1)
      } else {
        result = 'lose'
        setCpuScore(prev => prev + 1)
      }
      setGameResult(result)
      setIsPlaying(false)
    }, 1000)
  }
  
  const resetRPS = () => {
    setSelectedRPS(null)
    setCpuChoice(null)
    setGameResult(null)
    setPlayerScore(0)
    setCpuScore(0)
  }
  
  const project = projects[id]
  const details = projectDetails[id]
  
  const handleBackToHome = () => {
    // Set the game started flag before navigating
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('gameStarted', 'true')
    }
    router.push('/')
  }
  
  if (!project || !details) {
    return (
      <div className="min-h-screen bg-amber flex items-center justify-center">
        <CustomCursor />
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold text-dark mb-4">Project Not Found</h1>
          <button 
            onClick={handleBackToHome} 
            className="text-coral underline cursor-pointer"
          >
            Back to Work
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-amber">
      <CustomCursor />
      
      {/* Floating Back Button */}
      <motion.button
        onClick={handleBackToHome}
        className="fixed bottom-8 left-8 z-50 flex items-center gap-3 px-5 py-3 bg-dark text-cream rounded-full shadow-lg hover:bg-coral transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05, x: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-sm font-medium tracking-wide">Back to Home</span>
      </motion.button>
      {/* Header */}
      <motion.div
        className="bg-cream border-b border-brown/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.button
            onClick={handleBackToHome}
            className="flex items-center gap-2 text-dark hover:text-coral transition-colors"
            whileHover={{ x: -4 }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium">Back to Work</span>
          </motion.button>
          
          <div className="flex items-center gap-2">
            <span 
              className="text-[10px] px-3 py-1 rounded-full tracking-[1px] uppercase font-bold"
              style={{ 
                background: rarityColors[project.rarity].bg,
                color: "white"
              }}
            >
              {project.rarity}
            </span>
            <span 
              className="text-[10px] px-3 py-1 rounded-full tracking-[1px] uppercase"
              style={{ 
                background: project.tagBg, 
                color: project.tagColor,
                border: `1px solid ${project.tagColor}40`
              }}
            >
              {project.tag}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Hero Image */}
      {(details.images.length > 0 || details.uiAssets) && (
        <motion.div
          className="w-full max-w-5xl mx-auto px-6 pt-12"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-4 border-dark/10 shadow-2xl bg-cream">
            {details.images.length > 0 ? (
              <img 
                src={details.images[0]} 
                alt={`${project.title} hero`}
                className="w-full h-full object-cover"
              />
            ) : details.uiAssets?.rockPaperScissors ? (
              <img 
                src={details.uiAssets.rockPaperScissors} 
                alt={`${project.title} hero`}
                className="w-full h-full object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Title Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="font-serif text-5xl md:text-6xl font-black text-dark mb-2">
            {project.title}
          </h1>
          <p className="text-coral text-lg tracking-[2px] uppercase">
            {details.overview}
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-brown">
            <span>{project.year}</span>
            <span className="w-1 h-1 bg-brown rounded-full" />
            <span>{project.subtitle}</span>
          </div>
        </motion.div>

        {/* UI Assets Section for City Peak */}
        {details.uiAssets && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <h2 className="font-serif text-2xl font-bold text-dark mb-6 flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-coral">
                <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor"/>
                <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor"/>
                <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor"/>
                <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor"/>
              </svg>
              Game UI Assets
            </h2>
            
            {/* Rock Paper Scissors - Playable Game */}
            {details.uiAssets.rockPaperScissors && (
              <motion.div
                className="bg-gradient-to-b from-purple-900 to-purple-950 p-6 rounded-lg border-2 border-purple-500/30 mb-6 overflow-hidden relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* Decorative background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-purple-400 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-400 rounded-full blur-3xl" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-[10px] tracking-[2px] uppercase text-orange-400 mb-1">Mini Game</div>
                      <div className="text-xl font-bold text-white">Rock Paper Scissors</div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-[9px] tracking-[1px] uppercase text-purple-300">You</div>
                        <div className="text-2xl font-bold text-white">{playerScore}</div>
                      </div>
                      <div className="text-purple-400">vs</div>
                      <div className="text-center">
                        <div className="text-[9px] tracking-[1px] uppercase text-purple-300">CPU</div>
                        <div className="text-2xl font-bold text-white">{cpuScore}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Game Area */}
                  <div className="flex justify-center items-center gap-8 py-8">
                    {/* Player Choice */}
                    <div className="text-center">
                      <div className="text-[9px] tracking-[2px] uppercase text-purple-300 mb-2">Your Choice</div>
                      <motion.div 
                        className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-purple-800/50 border-2 border-purple-500/50 flex items-center justify-center overflow-hidden"
                        animate={selectedRPS && !cpuChoice ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.3, repeat: selectedRPS && !cpuChoice ? Infinity : 0 }}
                      >
                        {selectedRPS ? (
                          <img 
                            src={`/icons/${selectedRPS}.svg`}
                            alt={selectedRPS}
                            className="w-16 h-16 md:w-20 md:h-20 object-contain"
                          />
                        ) : (
                          <span className="text-purple-400/50 text-3xl">?</span>
                        )}
                      </motion.div>
                    </div>
                    
                    {/* VS */}
                    <motion.div 
                      className="text-3xl font-bold text-orange-400"
                      animate={isPlaying ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
                      transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
                    >
                      VS
                    </motion.div>
                    
                    {/* CPU Choice */}
                    <div className="text-center">
                      <div className="text-[9px] tracking-[2px] uppercase text-purple-300 mb-2">CPU Choice</div>
                      <motion.div 
                        className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-purple-800/50 border-2 border-purple-500/50 flex items-center justify-center overflow-hidden"
                        animate={isPlaying ? { rotate: [0, 360] } : {}}
                        transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                      >
                        {cpuChoice ? (
                          <img 
                            src={`/icons/${cpuChoice}.svg`}
                            alt={cpuChoice}
                            className="w-16 h-16 md:w-20 md:h-20 object-contain"
                          />
                        ) : (
                          <motion.span 
                            className="text-purple-400/50 text-3xl"
                            animate={isPlaying ? { opacity: [0.5, 1, 0.5] } : {}}
                            transition={{ duration: 0.3, repeat: Infinity }}
                          >
                            {isPlaying ? '...' : '?'}
                          </motion.span>
                        )}
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Result */}
                  <AnimatePresence>
                    {gameResult && (
                      <motion.div
                        className="text-center py-4"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div 
                          className={`text-3xl font-black ${
                            gameResult === 'win' ? 'text-green-400' : 
                            gameResult === 'lose' ? 'text-red-400' : 
                            'text-yellow-400'
                          }`}
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.3 }}
                        >
                          {gameResult === 'win' ? 'YOU WIN!' : gameResult === 'lose' ? 'YOU LOSE!' : 'DRAW!'}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Selection Buttons using the actual SVG icons */}
                  <div className="mt-4">
                    <div className="text-center text-[9px] tracking-[2px] uppercase text-purple-300 mb-3">
                      {gameResult ? 'Play Again - Select Your Move' : 'Select Your Move'}
                    </div>
                    <div className="flex justify-center gap-4">
                      {(['rock', 'paper', 'scissors'] as const).map((choice) => (
                        <motion.button
                          key={choice}
                          onClick={() => playRPS(choice)}
                          disabled={isPlaying}
                          className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-3 transition-all ${
                            isPlaying ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                          } ${selectedRPS === choice && gameResult ? 'border-orange-400 ring-2 ring-orange-400/50' : 'border-purple-500 hover:border-orange-400'}`}
                          whileHover={!isPlaying ? { scale: 1.1, y: -5 } : {}}
                          whileTap={!isPlaying ? { scale: 0.95 } : {}}
                        >
                          <div className="w-full h-full bg-purple-800 flex items-center justify-center p-2">
                            <img 
                              src={`/icons/${choice}.svg`}
                              alt={choice}
                              className="w-12 h-12 md:w-16 md:h-16 object-contain"
                            />
                          </div>
                          <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 text-[8px] tracking-[1px] uppercase bg-purple-900 text-purple-200 px-2 py-0.5 rounded-t">
                            {choice}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Reset Button */}
                  {(playerScore > 0 || cpuScore > 0) && (
                    <motion.button
                      onClick={resetRPS}
                      className="mt-4 mx-auto block px-4 py-2 text-[10px] tracking-[1px] uppercase text-purple-300 border border-purple-500/50 rounded hover:bg-purple-500/20 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Reset Score
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}

            {/* Settings Menus - Interactive Toggle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {details.uiAssets.settingsMenuOrange && (
                <motion.div
                  className={`bg-cream p-6 rounded-lg border-2 transition-all cursor-pointer ${
                    expandedAsset === 'settingsOrange' ? 'border-coral shadow-lg' : 'border-brown/10 hover:border-coral/50'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  onClick={() => setExpandedAsset(expandedAsset === 'settingsOrange' ? null : 'settingsOrange')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[10px] tracking-[2px] uppercase text-coral">Settings Menu (Orange Theme)</div>
                    <motion.div
                      animate={{ rotate: expandedAsset === 'settingsOrange' ? 180 : 0 }}
                      className="text-coral"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </motion.div>
                  </div>
                  <motion.img 
                    src={details.uiAssets.settingsMenuOrange} 
                    alt="Settings menu orange theme"
                    className="w-full h-auto object-contain"
                    animate={{ 
                      scale: expandedAsset === 'settingsOrange' ? 1.05 : 1,
                      filter: expandedAsset === 'settingsOrange' ? 'brightness(1.05)' : 'brightness(1)'
                    }}
                  />
                </motion.div>
              )}
              {details.uiAssets.settingsMenuRed && (
                <motion.div
                  className={`bg-cream p-6 rounded-lg border-2 transition-all cursor-pointer ${
                    expandedAsset === 'settingsRed' ? 'border-coral shadow-lg' : 'border-brown/10 hover:border-coral/50'
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  onClick={() => setExpandedAsset(expandedAsset === 'settingsRed' ? null : 'settingsRed')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[10px] tracking-[2px] uppercase text-coral">Settings Menu (Red Theme)</div>
                    <motion.div
                      animate={{ rotate: expandedAsset === 'settingsRed' ? 180 : 0 }}
                      className="text-coral"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </motion.div>
                  </div>
                  <motion.img 
                    src={details.uiAssets.settingsMenuRed} 
                    alt="Settings menu red theme"
                    className="w-full h-auto object-contain"
                    animate={{ 
                      scale: expandedAsset === 'settingsRed' ? 1.05 : 1,
                      filter: expandedAsset === 'settingsRed' ? 'brightness(1.05)' : 'brightness(1)'
                    }}
                  />
                </motion.div>
              )}
            </div>

            {/* Skill Tree Icons */}
            {details.uiAssets.skillTreeIcons && (
              <motion.div
                className="bg-cream p-4 md:p-6 rounded-lg border border-brown/10 mb-6 overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-[10px] tracking-[2px] uppercase text-coral mb-2">Skill Tree Icons</div>
                <div className="text-xs text-brown mb-4">Weapons, abilities, and navigation icons with blood splatter effects</div>
                <div className="overflow-x-auto -mx-4 md:-mx-6 px-4 md:px-6 pb-2">
                  <img 
                    src={details.uiAssets.skillTreeIcons} 
                    alt="Skill tree icons"
                    className="w-full min-w-[600px] h-auto object-contain"
                  />
                </div>
              </motion.div>
            )}

            {/* Team Cards */}
            {details.uiAssets.teamCards && (
              <motion.div
                className="bg-cream p-6 rounded-lg border border-brown/10 mb-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 }}
              >
                <div className="text-[10px] tracking-[2px] uppercase text-coral mb-4">Character Cards</div>
                <img 
                  src={details.uiAssets.teamCards} 
                  alt="Team character cards - Tandin, Lepcha, Yangki"
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            )}

            {/* Buttons Grid - Interactive */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {details.uiAssets.nextButton && (
                <motion.button
                  className="bg-cream p-4 rounded-lg border-2 border-brown/10 text-center cursor-pointer hover:border-dark/30 hover:bg-dark/5 transition-all group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95, y: 0 }}
                >
                  <motion.img 
                    src={details.uiAssets.nextButton} 
                    alt="Next button" 
                    className="w-full h-auto object-contain mb-2"
                    whileHover={{ filter: 'brightness(1.1)' }}
                  />
                  <div className="text-[9px] tracking-[1px] uppercase text-brown/60 group-hover:text-dark transition-colors">Next</div>
                </motion.button>
              )}
              {details.uiAssets.restartButton && (
                <motion.button
                  className="bg-cream p-4 rounded-lg border-2 border-brown/10 text-center cursor-pointer hover:border-dark/30 hover:bg-dark/5 transition-all group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95, y: 0 }}
                >
                  <motion.img 
                    src={details.uiAssets.restartButton} 
                    alt="Restart button" 
                    className="w-full h-auto object-contain mb-2"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="text-[9px] tracking-[1px] uppercase text-brown/60 group-hover:text-dark transition-colors">Restart</div>
                </motion.button>
              )}
              {details.uiAssets.retryButton && (
                <motion.button
                  className="bg-cream p-4 rounded-lg border-2 border-brown/10 text-center cursor-pointer hover:border-coral/50 hover:bg-coral/5 transition-all group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95, y: 0 }}
                >
                  <motion.img 
                    src={details.uiAssets.retryButton} 
                    alt="Retry button" 
                    className="w-full h-auto object-contain mb-2"
                  />
                  <div className="text-[9px] tracking-[1px] uppercase text-brown/60 group-hover:text-coral transition-colors">Retry</div>
                </motion.button>
              )}
              {details.uiAssets.nextLevelButton && (
                <motion.button
                  className="bg-cream p-4 rounded-lg border-2 border-brown/10 text-center cursor-pointer hover:border-red-500/50 hover:bg-red-500/5 transition-all group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95, y: 0 }}
                >
                  <motion.img 
                    src={details.uiAssets.nextLevelButton} 
                    alt="Next Level button" 
                    className="w-full h-auto object-contain mb-2"
                  />
                  <div className="text-[9px] tracking-[1px] uppercase text-brown/60 group-hover:text-red-600 transition-colors">Next Level</div>
                </motion.button>
              )}
            </div>

            {/* Menu Buttons - Interactive */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {details.uiAssets.mainMenuOrange && (
                <motion.button
                  className="bg-cream p-4 rounded-lg border-2 border-brown/10 text-center cursor-pointer hover:border-orange-400/50 hover:shadow-md transition-all group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.img 
                    src={details.uiAssets.mainMenuOrange} 
                    alt="Main Menu orange" 
                    className="w-full h-auto object-contain mb-2"
                  />
                  <div className="text-[9px] tracking-[1px] uppercase text-brown/60 group-hover:text-orange-500 transition-colors">Main Menu (Outline)</div>
                </motion.button>
              )}
              {details.uiAssets.mainMenuGray && (
                <motion.button
                  className="bg-cream p-4 rounded-lg border-2 border-brown/10 text-center cursor-pointer hover:border-gray-400/50 hover:shadow-md transition-all group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.img 
                    src={details.uiAssets.mainMenuGray} 
                    alt="Main Menu gray" 
                    className="w-full h-auto object-contain mb-2"
                  />
                  <div className="text-[9px] tracking-[1px] uppercase text-brown/60 group-hover:text-gray-600 transition-colors">Main Menu (Solid)</div>
                </motion.button>
              )}
              {details.uiAssets.zomboyButton && (
                <motion.button
                  className="bg-cream p-4 rounded-lg border-2 border-brown/10 text-center cursor-pointer hover:border-orange-500/50 hover:shadow-md hover:bg-orange-50/50 transition-all group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.img 
                    src={details.uiAssets.zomboyButton} 
                    alt="Zomboy button" 
                    className="w-full h-auto object-contain mb-2"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="text-[9px] tracking-[1px] uppercase text-brown/60 group-hover:text-orange-500 transition-colors">Game Mode Button</div>
                </motion.button>
              )}
            </div>

            {/* Back Buttons - Interactive */}
            <div className="grid grid-cols-2 gap-4">
              {details.uiAssets.backButtonOrange && (
                <motion.button
                  className="bg-cream p-4 rounded-lg border-2 border-brown/10 flex items-center justify-center gap-4 cursor-pointer hover:border-orange-400/50 hover:bg-orange-50/30 transition-all group"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85 }}
                  whileHover={{ scale: 1.03, x: -4 }}
                  whileTap={{ scale: 0.98, x: 0 }}
                >
                  <motion.img 
                    src={details.uiAssets.backButtonOrange} 
                    alt="Back button orange" 
                    className="h-12 w-auto object-contain"
                    whileHover={{ x: -4 }}
                  />
                  <div className="text-[9px] tracking-[1px] uppercase text-brown/60 group-hover:text-orange-500 transition-colors">Back (Orange)</div>
                </motion.button>
              )}
              {details.uiAssets.backButtonRed && (
                <motion.button
                  className="bg-cream p-4 rounded-lg border-2 border-brown/10 flex items-center justify-center gap-4 cursor-pointer hover:border-red-400/50 hover:bg-red-50/30 transition-all group"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85 }}
                  whileHover={{ scale: 1.03, x: -4 }}
                  whileTap={{ scale: 0.98, x: 0 }}
                >
                  <motion.img 
                    src={details.uiAssets.backButtonRed} 
                    alt="Back button red" 
                    className="h-12 w-auto object-contain"
                    whileHover={{ x: -4 }}
                  />
                  <div className="text-[9px] tracking-[1px] uppercase text-brown/60 group-hover:text-red-500 transition-colors">Back (Red)</div>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* Info Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-cream p-6 rounded-lg border border-brown/10">
            <div className="text-[10px] tracking-[2px] uppercase text-coral mb-2">What I Contributed</div>
            <div className="text-dark font-medium">{details.contributed}</div>
          </div>
          <div className="bg-cream p-6 rounded-lg border border-brown/10">
            <div className="text-[10px] tracking-[2px] uppercase text-coral mb-2">Tools Used</div>
            <div className="text-dark font-medium">{details.tools}</div>
          </div>
          <div className="bg-cream p-6 rounded-lg border border-brown/10">
            <div className="text-[10px] tracking-[2px] uppercase text-coral mb-2">Impact</div>
            <div className="text-dark font-medium">{details.impact}</div>
          </div>
        </motion.div>

        {/* Why Section */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-serif text-2xl font-bold text-dark mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-coral text-cream flex items-center justify-center text-lg">?</span>
            Why
          </h2>
          <p className="text-brown leading-relaxed text-lg">{details.why}</p>
        </motion.div>

        {/* How Section */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-serif text-2xl font-bold text-dark mb-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-teal text-cream flex items-center justify-center text-lg">!</span>
            How I Solved
          </h2>
          <p className="text-brown leading-relaxed text-lg">{details.howSolved}</p>
        </motion.div>

        {/* Overview */}
        <motion.div
          className="mb-10 bg-cream p-8 rounded-lg border-l-4 border-coral"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="font-serif text-2xl font-bold text-dark mb-4">Overview</h2>
          <p className="text-brown leading-relaxed text-lg">{details.overviewLong}</p>
        </motion.div>

        {/* Reflections */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="font-serif text-2xl font-bold text-dark mb-6 flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-coral">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
            Reflections
          </h2>
          <ul className="space-y-4">
            {details.reflections.map((reflection, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-4 text-brown text-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <span className="w-2 h-2 rounded-full bg-coral mt-3 flex-shrink-0" />
                <span className="leading-relaxed">{reflection}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Complexity */}
        <motion.div
          className="pt-8 border-t border-brown/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <PowerBar 
            value={project.difficulty} 
            max={100} 
            color={project.tagColor}
            label="Project Complexity"
            showPulse={true}
          />
        </motion.div>


      </div>
    </main>
  )
}
