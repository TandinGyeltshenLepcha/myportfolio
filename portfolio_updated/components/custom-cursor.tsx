"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion"

interface TrailPoint {
  x: number
  y: number
  id: number
}

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [cursorLabel, setCursorLabel] = useState("")
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [isClicking, setIsClicking] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const trailIdRef = useRef(0)
  
  const springConfig = { damping: 25, stiffness: 400 }
  const ringX = useSpring(cursorX, springConfig)
  const ringY = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Detect touch/mobile devices — hide custom cursor on them
    const hasTouchScreen =
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches
    setIsTouchDevice(hasTouchScreen)
  }, [])

  useEffect(() => {
    if (isTouchDevice) return

    let lastX = 0
    let lastY = 0

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Add trail point if moved enough
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      if (Math.sqrt(dx * dx + dy * dy) > 15) {
        lastX = e.clientX
        lastY = e.clientY
        trailIdRef.current++
        setTrail(prev => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id: trailIdRef.current }])
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const cursorElement = target.closest("[data-cursor]") as HTMLElement
      if (cursorElement) {
        setIsHovering(true)
        setCursorLabel(cursorElement.dataset.cursor || "")
      } else {
        setIsHovering(false)
        setCursorLabel("")
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    // Clear old trail points
    const trailInterval = setInterval(() => {
      setTrail(prev => prev.slice(-6))
    }, 100)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      clearInterval(trailInterval)
    }
  }, [cursorX, cursorY, isTouchDevice])

  // Don't render custom cursor on touch/mobile devices
  if (isTouchDevice) return null

  return (
    <>
      {/* Trail */}
      {trail.map((point, i) => (
        <motion.div
          key={point.id}
          className="fixed top-0 left-0 pointer-events-none z-[9996]"
          style={{ x: point.x, y: point.y }}
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 16 16"
            className="-ml-1 -mt-1"
          >
            <path
              d="M8 0L8.8 7L16 8L8.8 9L8 16L7.2 9L0 8L7.2 7Z"
              fill={`rgba(0, 0, 0, ${0.3 + (i * 0.1)})`}
            />
          </svg>
        </motion.div>
      ))}

      {/* Crosshair (when hovering) */}
      <AnimatePresence>
        {isHovering && (
          <>
            <motion.div
              className="fixed pointer-events-none z-[9997]"
              style={{ x: cursorX, y: cursorY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Horizontal line */}
              <motion.div 
                className="absolute h-px bg-coral/50 top-0"
                style={{ left: -30, width: 20 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
              />
              <motion.div 
                className="absolute h-px bg-coral/50 top-0"
                style={{ left: 10, width: 20 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
              />
              {/* Vertical line */}
              <motion.div 
                className="absolute w-px bg-coral/50 left-0"
                style={{ top: -30, height: 20 }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
              />
              <motion.div 
                className="absolute w-px bg-coral/50 left-0"
                style={{ top: 10, height: 20 }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main cursor - Animated star */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className="-ml-2.5 -mt-2.5"
          animate={{ 
            rotate: isClicking ? 180 : isHovering ? 45 : 0,
            scale: isClicking ? 0.8 : isHovering ? 1.3 : 1
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {/* Outer glow */}
          <motion.circle
            cx="10"
            cy="10"
            r="8"
            fill="none"
            stroke="#000000"
            strokeWidth="1"
            animate={{ 
              r: isHovering ? [8, 10, 8] : 8,
              opacity: isHovering ? [0.3, 0.6, 0.3] : 0.3
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          {/* Star shape */}
          <motion.path
            d="M10 2L11 8L18 10L11 12L10 18L9 12L2 10L9 8Z"
            fill="#000000"
            animate={{ 
              fill: isClicking ? "#333333" : "#000000"
            }}
          />
          {/* Center dot */}
          <circle cx="10" cy="10" r="2" fill="#000000" />
        </motion.svg>
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="rounded-full border-[1.5px]"
          animate={{
            width: isClicking ? 24 : isHovering ? 64 : 40,
            height: isClicking ? 24 : isHovering ? 64 : 40,
            marginLeft: isClicking ? -12 : isHovering ? -32 : -20,
            marginTop: isClicking ? -12 : isHovering ? -32 : -20,
            borderColor: isHovering ? "#000000" : "#000000",
            backgroundColor: isHovering ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0)",
            rotate: isHovering ? 45 : 0,
            borderRadius: isHovering ? "8px" : "50%"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </motion.div>

      {/* Label */}
      <AnimatePresence>
        {cursorLabel && (
          <motion.div
            key="cursor-label"
            className="fixed pointer-events-none z-[9997] font-sans text-[10px] font-bold tracking-[2px] uppercase bg-dark text-amber px-3 py-1.5 border border-amber/40"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            style={{ 
              left: 0, 
              top: 0,
              x: ringX, 
              y: ringY,
              marginLeft: 30,
              marginTop: -8
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" className="inline-block mr-1 text-amber" aria-hidden="true"><path d="M2 1L8 5L2 9V1Z" fill="currentColor"/></svg>
            {cursorLabel}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click ripple effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="fixed pointer-events-none z-[9995]"
            style={{ x: cursorX, y: cursorY }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-8 h-8 -ml-4 -mt-4 rounded-full border-2 border-amber" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
