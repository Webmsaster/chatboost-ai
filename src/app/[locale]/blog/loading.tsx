// Blog list page skeleton with card placeholders
export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-[#030014]">
      {/* Navbar skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-white/[0.03] backdrop-blur-xl py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-white/[0.06] animate-pulse" />
            <div className="h-5 w-28 rounded bg-white/[0.06] animate-pulse" />
          </div>
          <div className="h-8 w-20 rounded-lg bg-white/[0.06] animate-pulse" />
        </div>
      </div>

      <main className="relative pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header skeleton */}
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-20 rounded-full bg-white/[0.06] animate-pulse" />
            <div className="mx-auto h-12 w-72 rounded-lg bg-white/[0.06] animate-pulse" />
            <div className="mx-auto mt-4 h-5 w-96 max-w-full rounded bg-white/[0.06] animate-pulse" />
          </div>

          {/* Category filter skeleton */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-20 rounded-full bg-white/[0.06] animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>

          {/* Card grid skeleton */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-1 w-full bg-white/[0.06]" />
                <div className="p-6">
                  <div className="mb-4 h-6 w-24 rounded-full bg-white/[0.06] animate-pulse" />
                  <div className="mb-3 h-6 w-full rounded bg-white/[0.06] animate-pulse" />
                  <div className="mb-2 h-4 w-full rounded bg-white/[0.04] animate-pulse" />
                  <div className="mb-6 h-4 w-3/4 rounded bg-white/[0.04] animate-pulse" />
                  <div className="border-t border-white/[0.06] pt-4 flex gap-4">
                    <div className="h-4 w-20 rounded bg-white/[0.06] animate-pulse" />
                    <div className="h-4 w-16 rounded bg-white/[0.06] animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
