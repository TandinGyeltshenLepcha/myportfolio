export default function Loading() {
  return (
    <div 
      className="fixed inset-0 bg-amber flex items-center justify-center z-[9999]"
      role="progressbar"
      aria-label="Loading content"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo */}
        <div className="relative">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            className="text-coral animate-pulse"
          >
            <path
              d="M30 6L33 24L51 30L33 36L30 54L27 36L9 30L27 24Z"
              fill="currentColor"
            />
          </svg>
          <div className="absolute inset-0 border-2 border-coral/30 rounded-full animate-ping" />
        </div>
        
        {/* Loading text */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] tracking-[4px] uppercase text-brown/60 font-sans">
            Loading
          </span>
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 bg-coral rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  )
}
