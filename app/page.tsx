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
import { GameStartScreen } from "@/components/game-start-screen"
import { AchievementPopups, useAchievements } from "@/components/game-effects"

export default function Home() {
  const { achievements, unlock } = useAchievements()
  const [gameStarted, setGameStarted] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("gameStarted") === "true"
    }
    return false
  })

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

  useEffect(() => {
    if (!gameStarted) return
    const timer = setTimeout(() => unlock("Welcome", "Thanks for visiting!", "[HI]"), 3000)
    return () => clearTimeout(timer)
  }, [unlock, gameStarted])

  const handleGameStart = () => {
    setGameStarted(true)
    if (typeof window !== "undefined") sessionStorage.setItem("gameStarted", "true")
  }

  return (
    <>
      <GameStartScreen onStart={handleGameStart} />

      {gameStarted && (
        <>
          <AchievementPopups achievements={achievements} />
          <main id="main-content" className="relative" role="main">
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
