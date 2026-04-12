"use client"

import { useState, useEffect } from "react"
import { CustomCursor } from "@/components/custom-cursor"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { WorkSection } from "@/components/work-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ScrollProgress } from "@/components/scroll-progress"
import { FloatingParticles } from "@/components/floating-particles"
import { GameStartScreen } from "@/components/game-start-screen"
import { Scanlines, ClickSparks, AchievementPopups, useAchievements, ComboCounter } from "@/components/game-effects"

export default function Home() {
  const { achievements, unlock } = useAchievements()
  const [clickCombo, setClickCombo] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)
  const [gameStarted, setGameStarted] = useState(() => {
    // Check if game was already started in this session
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('gameStarted') === 'true'
    }
    return false
  })

  // Click combo system
  useEffect(() => {
    if (!gameStarted) return

    const handleClick = () => {
      const now = Date.now()
      if (now - lastClickTime < 500) {
        setClickCombo(prev => {
          const newCombo = prev + 1
          // Achievement triggers
          if (newCombo === 5) unlock("Speed Demon", "5x click combo!", ">>>")
          if (newCombo === 10) unlock("Click Master", "10x combo achieved!", "***")
          return newCombo
        })
      } else {
        setClickCombo(1)
      }
      setLastClickTime(now)
    }

    // Reset combo after timeout
    const timeout = setTimeout(() => {
      if (Date.now() - lastClickTime > 1000) {
        setClickCombo(0)
      }
    }, 1000)

    window.addEventListener("click", handleClick)
    return () => {
      window.removeEventListener("click", handleClick)
      clearTimeout(timeout)
    }
  }, [lastClickTime, unlock, gameStarted])

  // Scroll achievement
  useEffect(() => {
    if (!gameStarted) return

    let hasScrolled = false
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 500) {
        hasScrolled = true
        unlock("Explorer", "Started scrolling the page", "[MAP]")
      }
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 100) {
        unlock("Completionist", "Reached the bottom!", "[+++]")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [unlock, gameStarted])

  // Welcome achievement
  useEffect(() => {
    if (!gameStarted) return

    const timer = setTimeout(() => {
      unlock("Welcome", "Thanks for visiting!", "[HI]")
    }, 3000)
    return () => clearTimeout(timer)
  }, [unlock, gameStarted])

  const handleGameStart = () => {
    setGameStarted(true)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('gameStarted', 'true')
    }
  }

  return (
    <>
      <GameStartScreen onStart={handleGameStart} />
      
      {gameStarted && (
        <>
          <Scanlines />
          <ClickSparks />
          <AchievementPopups achievements={achievements} />
          <ComboCounter count={clickCombo} />
          
          <main id="main-content" className="relative" role="main">
            <FloatingParticles />
            <ScrollProgress />
            <CustomCursor />
            <Navigation />
            <HeroSection />
            <WorkSection />
            <AboutSection />
            <ContactSection />
            <Footer />
          </main>
        </>
      )}
    </>
  )
}
