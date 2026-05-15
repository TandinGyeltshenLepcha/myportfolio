"use client"

import { useState, useEffect, useRef } from "react"
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

  // Refs to ensure each achievement fires at most once per session
  const hasScrolledRef = useRef(false)
  const hasReachedBottomRef = useRef(false)
  const hasWelcomedRef = useRef(false)

  useEffect(() => {
    if (!gameStarted) return

    // Welcome achievement — fires once
    if (!hasWelcomedRef.current) {
      hasWelcomedRef.current = true
      const timer = setTimeout(() => unlock("Welcome", "Thanks for visiting!", "[HI]"), 3000)
      return () => clearTimeout(timer)
    }
  }, [unlock, gameStarted])

  useEffect(() => {
    if (!gameStarted) return
    const handleScroll = () => {
      if (!hasScrolledRef.current && window.scrollY > 500) {
        hasScrolledRef.current = true
        unlock("Explorer", "Started scrolling the page", "[MAP]")
      }
      if (
        !hasReachedBottomRef.current &&
        window.scrollY + window.innerHeight >= document.body.scrollHeight - 100
      ) {
        hasReachedBottomRef.current = true
        unlock("Completionist", "Reached the bottom!", "[+++]")
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [unlock, gameStarted])

  const handleGameStart = () => {
    setGameStarted(true)
    if (typeof window !== "undefined") sessionStorage.setItem("gameStarted", "true")
  }

  return (
    <>
      {!gameStarted && <GameStartScreen onStart={handleGameStart} />}

      {gameStarted && (
        <>
          <AchievementPopups achievements={achievements} />
          <main id="main-content" className="relative" role="main">
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
