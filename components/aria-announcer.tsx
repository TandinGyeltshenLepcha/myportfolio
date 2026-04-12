"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"

interface AnnouncerContextType {
  announce: (message: string, priority?: "polite" | "assertive") => void
}

const AnnouncerContext = createContext<AnnouncerContextType | null>(null)

export function useAnnouncer() {
  const context = useContext(AnnouncerContext)
  if (!context) {
    throw new Error("useAnnouncer must be used within AriaAnnouncerProvider")
  }
  return context
}

export function AriaAnnouncerProvider({ children }: { children: ReactNode }) {
  const [politeMessage, setPoliteMessage] = useState("")
  const [assertiveMessage, setAssertiveMessage] = useState("")

  const announce = useCallback((message: string, priority: "polite" | "assertive" = "polite") => {
    if (priority === "assertive") {
      setAssertiveMessage("")
      // Small delay to ensure screen readers pick up the change
      setTimeout(() => setAssertiveMessage(message), 100)
    } else {
      setPoliteMessage("")
      setTimeout(() => setPoliteMessage(message), 100)
    }
  }, [])

  return (
    <AnnouncerContext.Provider value={{ announce }}>
      {children}
      {/* ARIA Live Regions */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {politeMessage}
      </div>
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {assertiveMessage}
      </div>
    </AnnouncerContext.Provider>
  )
}
