"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

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

function RockSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 121 122" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.00683594" y="11.1992" width="120" height="109.906" rx="54.9532" transform="rotate(-0.0428927 0.00683594 11.1992)" fill="#9C27B0"/>
      <path d="M50.9382 16.4082L83.4335 1.964C83.7686 1.8153 84.1133 1.69554 84.458 1.58332C81.9629 0.764925 79.1691 0.884006 76.7153 1.96903L44.22 16.4132C41.0838 17.8258 39.0819 20.7548 39.0843 23.9465L39.124 77L45.8422 76.995L45.8025 23.9415C45.8001 20.7498 47.802 17.8208 50.9382 16.4082Z" fill="white"/>
      <path d="M80.112 76.9693L39.124 77L39.0843 23.9465C39.0819 20.7549 41.0838 17.8259 44.22 16.4132L76.7153 1.96905C79.9092 0.556378 83.6868 0.766181 86.6221 2.57307L95.457 7.99497C97.6942 9.34948 99.0036 11.6105 99.0054 14.0574L99.0109 21.4007L99.0191 32.4162C99.0213 35.3424 97.2514 38.0046 94.4049 39.31L75.3269 48.2112C72.6548 49.4637 69.4886 49.3592 66.9313 47.9785L55.016 41.4946C52.6332 40.2194 51.1782 37.8793 51.1763 35.3518C51.175 33.5427 51.9883 31.9192 53.2649 30.7206C54.5428 29.5497 56.343 28.83 58.2894 28.8285L63.5187 28.8246" stroke="#231F20" strokeWidth="2.09001" strokeMiterlimit="10"/>
      <rect x="29.9825" y="76.5445" width="56.4463" height="21.7323" rx="3.71557" transform="rotate(-0.0428927 29.9825 76.5445)" fill="white" stroke="#231F20" strokeWidth="1.85779"/>
      <rect x="36.3369" y="77.4688" width="49.1635" height="19.8745" rx="2.32223" transform="rotate(-0.0428927 36.3369 77.4688)" fill="#66CC99"/>
    </svg>
  )
}

function PaperSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 121 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.0283203" y="38.1602" width="120" height="111.164" rx="55.5818" transform="rotate(-0.0428927 0.0283203 38.1602)" fill="#9C27B0"/>
      <path d="M40.7042 124.217L40.6941 110.654C40.693 109.257 41.3477 108.015 42.3719 107.145L38.443 107.148C35.6252 107.15 33.332 109.277 33.3339 111.914L33.3441 125.477C33.3461 128.114 35.6425 130.239 38.4603 130.236L82.9931 130.203C84.3178 130.202 85.5155 129.719 86.4244 128.947L45.8209 128.978C43.0027 128.98 40.7062 126.855 40.7042 124.217Z" fill="white"/>
      <rect x="30.6191" y="107.148" width="56.4463" height="23.0977" rx="3.71557" transform="rotate(-0.0428927 30.6191 107.148)" fill="white" stroke="#231F20" strokeWidth="1.85779"/>
      <rect x="36.9736" y="108.074" width="49.1635" height="21.2408" rx="2.32223" transform="rotate(-0.0428927 36.9736 108.074)" fill="#66CC99"/>
    </svg>
  )
}

function ScissorsSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 121 139" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.0273438" y="36.2051" width="120" height="101.878" rx="50.9389" transform="rotate(-0.0428927 0.0273438 36.2051)" fill="#9C27B0"/>
      <path d="M91.1152 9.20606C93.3817 10.0428 94.6905 12.1141 94.1981 14.1856L84.788 55.4536L84.788 55.478L73.4838 50.4301C71.9148 49.7164 69.9979 50.2111 69.1273 51.519L68.0826 53.0976C67.7344 53.6168 67.5315 54.1837 67.4449 54.726L63.0294 54.804C63.029 54.3841 62.9706 53.9411 62.825 53.4969L57.3505 35.8675L50.3278 6.82031C50.2405 6.49968 50.2111 6.17901 50.2109 5.85832C50.2093 3.78606 51.7766 1.91089 54.1582 1.26772C57.295 0.426908 60.6078 2.02788 61.365 4.7398L73.1305 43.9698L83.884 12.1712C84.5216 10.1486 86.6993 8.83969 89.0233 8.83795C89.7205 8.83742 90.4177 8.96053 91.1152 9.20606Z" fill="#FFCC99"/>
      <path d="M40.5886 113.789L40.5793 101.31C40.5775 98.9169 42.8709 96.9677 45.6887 96.9656L41.8252 96.9685L36.9739 96.9721C34.1561 96.9742 31.8626 98.9234 31.8644 101.316L31.8737 113.795C31.8755 116.187 34.172 118.11 36.9897 118.108L45.7045 118.101C42.8867 118.103 40.5904 116.181 40.5886 113.789Z" fill="white"/>
      <rect x="29.8301" y="96.9648" width="56.4463" height="21.1504" rx="3.71557" transform="rotate(-0.0428927 29.8301 96.9648)" fill="white" stroke="#231F20" strokeWidth="1.85779"/>
      <rect x="36.1846" y="97.8896" width="49.1635" height="19.293" rx="2.32223" transform="rotate(-0.0428927 36.1846 97.8896)" fill="#66CC99"/>
    </svg>
  )
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

      {/* Floating RPS icons — inline SVG, no external image loading */}
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
          {icon.type === 'rock' && <RockSVG size={icon.size} />}
          {icon.type === 'paper' && <PaperSVG size={icon.size} />}
          {icon.type === 'scissors' && <ScissorsSVG size={icon.size} />}
        </motion.div>
      ))}
    </div>
  )
}
