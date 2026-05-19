"use client"

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MusicContextType {
  isPlaying: boolean
  togglePlay: () => void
  volume: number
  setVolume: (volume: number) => void
  isLoaded: boolean
}

const MusicContext = createContext<MusicContextType | null>(null)

export function useMusicContext() {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error("useMusicContext must be used within a MusicProvider")
  }
  return context
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.3)
  const [isLoaded, setIsLoaded] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Check if game was started
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkGameStarted = () => {
        const started = sessionStorage.getItem('gameStarted') === 'true'
        setGameStarted(started)
      }
      checkGameStarted()
      
      // Listen for storage changes
      const handleStorageChange = () => checkGameStarted()
      window.addEventListener('storage', handleStorageChange)
      
      // Also check on focus in case sessionStorage changed in same tab
      const interval = setInterval(checkGameStarted, 500)
      
      return () => {
        window.removeEventListener('storage', handleStorageChange)
        clearInterval(interval)
      }
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3")
      audioRef.current.loop = true
      audioRef.current.volume = volume
      audioRef.current.preload = "auto"
      
      audioRef.current.addEventListener('canplaythrough', () => setIsLoaded(true))
      audioRef.current.addEventListener('error', () => setIsLoaded(false))
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch(() => {
            // Autoplay blocked
          })
      }
    }
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume)
  }

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlay, volume, setVolume, isLoaded }}>
      {children}
      {gameStarted && <MusicControls />}
    </MusicContext.Provider>
  )
}

function MusicControls() {
  const { isPlaying, togglePlay, volume, setVolume, isLoaded } = useMusicContext()
  const [showControls, setShowControls] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Volume slider */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              className="flex items-center gap-2 bg-dark/90 backdrop-blur px-3 py-2 rounded-full"
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-cream/60">
                <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor"/>
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1.5 bg-cream/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-coral [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <span className="text-[10px] text-cream/60 w-8 text-right">{Math.round(volume * 100)}%</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play/Pause button */}
        <motion.button
          onClick={togglePlay}
          className={`w-12 h-12 rounded-full bg-dark/90 backdrop-blur flex items-center justify-center border transition-colors group ${
            isLoaded ? 'border-cream/10 hover:border-coral/50' : 'border-cream/5 opacity-50'
          }`}
          whileHover={isLoaded ? { scale: 1.05 } : {}}
          whileTap={isLoaded ? { scale: 0.95 } : {}}
          title={isPlaying ? "Pause BGM" : "Play BGM"}
          disabled={!isLoaded}
        >
          {isPlaying ? (
            <motion.div
              className="flex items-center gap-0.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-coral rounded-full"
                  animate={{
                    height: [8, 16, 8],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-cream/60 group-hover:text-coral transition-colors ml-0.5">
              <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
            </svg>
          )}
        </motion.button>
      </motion.div>
      
      {/* Tooltip */}
      <AnimatePresence>
        {!isPlaying && isLoaded && (
          <motion.div
            className="absolute bottom-full right-0 mb-2 bg-dark text-cream text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ delay: 1 }}
          >
            Click to play Lo-fi BGM
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
