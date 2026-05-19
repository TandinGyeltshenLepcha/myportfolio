// Minimal loading state — keeps the black bg visible instead of a jarring flash
export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[9999]"
      style={{ background: "#000000" }}
      aria-hidden="true"
    />
  )
}
