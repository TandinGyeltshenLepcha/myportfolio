"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [showControls, setShowControls] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

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
            // Autoplay blocked - user needs to interact first
          })
      }
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Lo-fi / ambient music - using a reliable royalty-free lofi track */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onCanPlayThrough={() => setIsLoaded(true)}
        onError={() => setIsLoaded(false)}
      >
        <source src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3" type="audio/mpeg" />
        <source src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" type="audio/mp3" />
      </audio>
      
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Volume slider - stays open when hovering the whole container */}
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
              {/* Sound wave animation */}
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
            transition={{ delay: 3 }}
          >
            Click to play Lo-fi BGM
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
