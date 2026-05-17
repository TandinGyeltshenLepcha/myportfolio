"use client"

import { motion } from "framer-motion"

// Waves decoration
export function WavesSvg({ flip = false, className = "" }: { flip?: boolean; className?: string }) {
  return (
    <svg
      className={`${flip ? "rotate-180" : ""} opacity-30 ${className}`}
      width="200"
      height="84"
      viewBox="0 0 200 84"
    >
      <path d="M0 12 Q25 2 50 12 Q75 22 100 12 Q125 2 150 12 Q175 22 200 12" fill="none" stroke="#d68a1a" strokeWidth="1.8" />
      <path d="M0 30 Q25 20 50 30 Q75 40 100 30 Q125 20 150 30 Q175 40 200 30" fill="none" stroke="#d68a1a" strokeWidth="1.8" />
      <path d="M0 48 Q25 38 50 48 Q75 58 100 48 Q125 38 150 48 Q175 58 200 48" fill="none" stroke="#d68a1a" strokeWidth="1.8" />
      <path d="M0 66 Q25 56 50 66 Q75 76 100 66 Q125 56 150 66 Q175 76 200 66" fill="none" stroke="#d68a1a" strokeWidth="1.8" />
    </svg>
  )
}

// Bee floating animation
export function BeeSvg() {
  return (
    <motion.div
      animate={{ y: [0, -14, 0], rotate: [-10, 5, -10] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="opacity-70"
    >
      <svg width="36" height="22" viewBox="0 0 40 28">
        <ellipse cx="20" cy="14" rx="14" ry="9" fill="#f0c020" />
        <rect x="8" y="10" width="6" height="8" rx="2" fill="#1a1000" opacity=".75" />
        <rect x="16" y="10" width="6" height="8" rx="2" fill="#1a1000" opacity=".75" />
        <rect x="24" y="10" width="6" height="8" rx="2" fill="#1a1000" opacity=".75" />
        <ellipse cx="16" cy="5" rx="10" ry="5" fill="rgba(255,255,255,.5)" />
        <ellipse cx="26" cy="6" rx="9" ry="4" fill="rgba(255,255,255,.45)" />
      </svg>
    </motion.div>
  )
}

// Health bars
export function HealthBarsSvg() {
  return (
    <div className="flex flex-col gap-1 w-full">
      <motion.svg 
        width="100%" 
        height="14" 
        viewBox="0 0 1552 14" 
        preserveAspectRatio="none"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{ transformOrigin: "left" }}
      >
        <rect width="1552" height="14" fill="#07F102" />
      </motion.svg>
      <motion.svg 
        width="100%" 
        height="14" 
        viewBox="0 0 1552 14" 
        preserveAspectRatio="none"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ transformOrigin: "left" }}
      >
        <rect width="1552" height="14" fill="#97CA2D" />
        <rect x="1114" width="438" height="14" fill="#ADADAD" />
      </motion.svg>
      <motion.svg 
        width="100%" 
        height="14" 
        viewBox="0 0 1552 14" 
        preserveAspectRatio="none"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ transformOrigin: "left" }}
      >
        <rect width="1552" height="14" fill="#FF002E" />
        <rect x="591" width="961" height="14" fill="#ADADAD" />
      </motion.svg>
      <motion.svg 
        width="100%" 
        height="14" 
        viewBox="0 0 1552 14" 
        preserveAspectRatio="none"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ transformOrigin: "left" }}
      >
        <rect width="1552" height="14" fill="#ACACAC" />
      </motion.svg>
    </div>
  )
}

// Settings buttons
export function SettingsButtonsSvg() {
  return (
    <div className="flex flex-col gap-1 w-full">
      {[0, 1, 2].map((i) => (
        <motion.svg 
          key={i}
          width="100%" 
          viewBox="0 0 449 75" 
          height="22"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          whileHover={{ scale: 1.02, x: 5 }}
        >
          <rect x="5.5" y="1.5" width="438" height="71" fill="#f8aa40" stroke="white" strokeWidth="3" />
        </motion.svg>
      ))}
    </div>
  )
}

// Life tokens (Rock, Paper, Scissors style)
export function LifeTokensSvg() {
  return (
    <div className="flex gap-2 items-center">
      {/* Rock */}
      <motion.svg 
        width="50" 
        height="62" 
        viewBox="0 0 121 122"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <rect x="0.007" y="11.2" width="120" height="109.9" rx="54.95" fill="#000000" />
        <path d="M50.938 16.408L83.434 1.964C83.769 1.815 84.113 1.696 84.458 1.583C81.963.765 79.169.884 76.715 1.969L44.22 16.413C41.084 17.826 39.082 20.755 39.084 23.946L39.124 77L45.842 76.995L45.803 23.942C45.8 20.75 47.802 17.821 50.938 16.408Z" fill="#F8AA40" />
        <rect x="29.983" y="76.545" width="56.446" height="21.732" rx="3.716" fill="#F8AA40" stroke="#000000" strokeWidth="1.858" />
        <rect x="36.337" y="77.469" width="49.164" height="19.875" rx="2.322" fill="#000000" />
      </motion.svg>
      
      {/* Paper */}
      <motion.svg 
        width="50" 
        height="77" 
        viewBox="0 0 121 150"
        whileHover={{ scale: 1.1, rotate: -5 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <rect x=".028" y="38.16" width="120" height="111.164" rx="55.582" fill="#000000" />
        <rect x="32.027" y="106.621" width="56.446" height="21.96" rx="3.716" fill="#F8AA40" stroke="#000000" strokeWidth="1.858" />
        <rect x="38.381" y="107.543" width="49.164" height="20.102" rx="2.322" fill="#000000" />
      </motion.svg>
      
      {/* Scissors */}
      <motion.svg 
        width="50" 
        height="72" 
        viewBox="0 0 121 139"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <rect x=".027" y="36.205" width="120" height="101.878" rx="50.939" fill="#000000" />
        <rect x="29.293" y="97.007" width="56.446" height="20.28" rx="3.716" fill="#F8AA40" stroke="#000000" strokeWidth="1.858" />
        <rect x="35.648" y="97.932" width="49.164" height="18.423" rx="2.322" fill="#000000" />
      </motion.svg>
    </div>
  )
}

// Button variations
export function ButtonLibrarySvg() {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Restart: dark rounded */}
      <motion.svg 
        width="100%" 
        viewBox="0 0 580 104" 
        height="32"
        whileHover={{ scale: 1.02 }}
      >
        <rect width="580" height="104" rx="16" fill="#212121" />
      </motion.svg>
      
      {/* Next level: red fill */}
      <motion.svg 
        width="100%" 
        viewBox="0 0 519 159" 
        height="26"
        whileHover={{ scale: 1.02 }}
      >
        <rect width="519" height="159" fill="#A80404" />
      </motion.svg>
      
      {/* Orange outline button */}
      <motion.svg 
        width="100%" 
        viewBox="0 0 553 193" 
        height="30"
        whileHover={{ scale: 1.02 }}
      >
        <rect x="17" y="13" width="519" height="159" fill="#f8aa40" />
        <rect x="10.5" y="6.5" width="532" height="172" stroke="#f8aa40" strokeWidth="13" fill="none" />
      </motion.svg>
    </div>
  )
}

// Back arrows
export function BackArrowsSvg() {
  return (
    <div className="flex gap-4 items-center justify-center">
      {/* Red border back arrow */}
      <motion.svg 
        width="117" 
        height="90" 
        viewBox="0 0 117 90"
        whileHover={{ x: -5, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <rect x="4" y="4" width="109" height="82" fill="white" />
        <rect x="2" y="2" width="113" height="86" stroke="#A80403" strokeWidth="4" fill="none" />
        <path d="M82.256 40.406H43.991L61.567 22.624L57.102 18.139L31.948 43.587L57.102 69.035L61.536 64.55L43.991 46.768H82.256V40.406Z" fill="white" stroke="#A80403" strokeWidth="4" />
      </motion.svg>
      
      {/* Orange border back arrow */}
      <motion.svg 
        width="117" 
        height="90" 
        viewBox="0 0 117 90"
        whileHover={{ x: -5, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <rect x="4" y="4" width="109" height="82" fill="white" />
        <rect x="2" y="2" width="113" height="86" stroke="#f8aa40" strokeWidth="4" fill="none" />
        <path d="M85 42.188H44.687L63.204 23.671L58.5 19L32 45.5L58.5 72L63.171 67.329L44.687 48.813H85V42.188Z" fill="white" stroke="#f8aa40" strokeWidth="4" />
      </motion.svg>
    </div>
  )
}

// Settings menu (two column)
export function SettingsMenuSvg() {
  return (
    <div className="flex gap-3 w-full">
      {/* Orange column */}
      <div className="flex flex-col gap-1 flex-1">
        {[0, 1, 2, 3].map((i) => (
          <motion.svg 
            key={`orange-${i}`}
            width="100%" 
            viewBox="0 0 449 75" 
            height="18"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05, x: 3 }}
          >
            <rect x="5.5" y="1.5" width="438" height="71" fill="#f8aa40" stroke="white" strokeWidth="3" />
          </motion.svg>
        ))}
      </div>
      
      {/* Red column */}
      <div className="flex flex-col gap-1 flex-1">
        {[0, 1, 2, 3].map((i) => (
          <motion.svg 
            key={`red-${i}`}
            width="100%" 
            viewBox="0 0 449 75" 
            height="18"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 + 0.2 }}
            whileHover={{ scale: 1.05, x: 3 }}
          >
            <rect x="5.5" y="1.5" width="438" height="71" fill="#A80403" stroke="white" strokeWidth="3" />
          </motion.svg>
        ))}
      </div>
    </div>
  )
}

// Life tokens enlarged for project cards
export function LifeTokensLargeSvg() {
  return (
    <div className="flex gap-3 items-center justify-center">
      {/* Rock */}
      <motion.svg 
        width="70" 
        height="72" 
        viewBox="0 0 121 122"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <rect x="0.007" y="11.2" width="120" height="109.9" rx="54.95" fill="#000000" />
        <path d="M50.938 16.408L83.434 1.964C83.769 1.815 84.113 1.696 84.458 1.583C81.963.765 79.169.884 76.715 1.969L44.22 16.413C41.084 17.826 39.082 20.755 39.084 23.946L39.124 77L45.842 76.995L45.803 23.942C45.8 20.75 47.802 17.821 50.938 16.408Z" fill="white" />
        <rect x="29.983" y="76.545" width="56.446" height="21.732" rx="3.716" fill="#F8AA40" stroke="#000000" strokeWidth="1.858" />
        <rect x="36.337" y="77.469" width="49.164" height="19.875" rx="2.322" fill="#000000" />
      </motion.svg>
      
      {/* Paper */}
      <motion.svg 
        width="70" 
        height="86" 
        viewBox="0 0 121 150"
        whileHover={{ scale: 1.1, rotate: -5 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <rect x=".028" y="38.16" width="120" height="111.164" rx="55.582" fill="#000000" />
        <rect x="32.027" y="106.621" width="56.446" height="21.96" rx="3.716" fill="#F8AA40" stroke="#000000" strokeWidth="1.858" />
        <rect x="38.381" y="107.543" width="49.164" height="20.102" rx="2.322" fill="#000000" />
      </motion.svg>
      
      {/* Scissors */}
      <motion.svg 
        width="70" 
        height="84" 
        viewBox="0 0 121 139"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <rect x=".027" y="36.205" width="120" height="101.878" rx="50.939" fill="#000000" />
        <rect x="29.293" y="97.007" width="56.446" height="20.28" rx="3.716" fill="#F8AA40" stroke="#000000" strokeWidth="1.858" />
        <rect x="35.648" y="97.932" width="49.164" height="18.423" rx="2.322" fill="#000000" />
      </motion.svg>
    </div>
  )
}
