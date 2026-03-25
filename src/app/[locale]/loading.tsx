// Global loading state for the locale layout
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030014]">
      <div className="flex flex-col items-center gap-6">
        {/* Spinning logo indicator */}
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 opacity-20 animate-ping" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 shadow-lg shadow-brand-500/25 animate-pulse">
            <svg
              className="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 8V4H8" />
              <rect width="16" height="12" x="4" y="8" rx="2" />
              <path d="M2 14h2" />
              <path d="M20 14h2" />
              <path d="M15 13v2" />
              <path d="M9 13v2" />
            </svg>
          </div>
        </div>
        {/* Pulsing bar */}
        <div className="h-1 w-24 overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full w-1/2 animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-brand-500 to-accent-500" />
        </div>
      </div>
    </div>
  );
}
