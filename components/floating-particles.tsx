"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  xOffset: number
}

interface FloatingIcon {
  id: number
  type: 'rock' | 'paper' | 'scissors'
  x: number
  y: number
  size: number
  duration: number
  delay: number
  rotation: number
  xOffset: number
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const newParticles: Particle[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      xOffset: Math.random() * 50 - 25,
    }))
    setParticles(newParticles)

    // Create floating RPS icons
    const iconTypes: ('rock' | 'paper' | 'scissors')[] = ['rock', 'paper', 'scissors']
    const newIcons: FloatingIcon[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      type: iconTypes[i % 3],
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      size: Math.random() * 30 + 40,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 8,
      rotation: Math.random() * 360,
      xOffset: Math.random() * 40 - 20,
    }))
    setFloatingIcons(newIcons)
  }, [])

  // Don't render anything on server to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Regular particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-coral/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ opacity: 0.2 }}
          animate={{
            y: [0, -100, 0],
            x: [0, particle.xOffset, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating RPS icons */}
      {floatingIcons.map((icon) => (
        <motion.div
          key={`icon-${icon.id}`}
          className="absolute"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            width: icon.size,
            height: icon.size,
          }}
          initial={{ opacity: 0.15 }}
          animate={{
            y: [0, -80, 0],
            x: [0, icon.xOffset, 0],
            opacity: [0.15, 0.35, 0.15],
            rotate: [icon.rotation, icon.rotation + 360, icon.rotation],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: icon.duration,
            delay: icon.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src={`/icons/${icon.type}.svg`}
            alt=""
            width={icon.size}
            height={icon.size}
            className="w-full h-full object-contain"
          />
        </motion.div>
      ))}
    </div>
  )
}
