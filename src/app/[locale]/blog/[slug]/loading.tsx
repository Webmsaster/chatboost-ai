// Blog article skeleton with title + text block placeholders
export default function BlogArticleLoading() {
  return (
    <div className="min-h-screen bg-[#030014]">
      {/* Reading progress bar placeholder */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-white/[0.04]" />

      {/* Navbar skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-white/[0.03] backdrop-blur-xl py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-white/[0.06] animate-pulse" />
            <div className="h-5 w-28 rounded bg-white/[0.06] animate-pulse" />
          </div>
          <div className="h-8 w-28 rounded-lg bg-white/[0.06] animate-pulse" />
        </div>
      </div>

      <main className="relative pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          {/* Category badge */}
          <div className="mb-4 h-6 w-24 rounded-full bg-white/[0.06] animate-pulse" />

          {/* Title skeleton */}
          <div className="h-10 w-full rounded-lg bg-white/[0.06] animate-pulse" />
          <div className="mt-3 h-10 w-3/4 rounded-lg bg-white/[0.06] animate-pulse" />

          {/* Description */}
          <div className="mt-4 h-6 w-full rounded bg-white/[0.04] animate-pulse" />
          <div className="mt-2 h-6 w-2/3 rounded bg-white/[0.04] animate-pulse" />

          {/* Meta info row */}
          <div className="mt-6 flex items-center gap-4">
            <div className="h-4 w-24 rounded bg-white/[0.06] animate-pulse" />
            <div className="h-4 w-20 rounded bg-white/[0.06] animate-pulse" />
          </div>

          {/* Divider */}
          <div className="mt-8 h-px bg-white/[0.06]" />

          {/* Content skeleton blocks */}
          <div className="mt-10 space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-3">
                {i % 3 === 0 && (
                  <div
                    className="h-7 w-2/3 rounded bg-white/[0.06] animate-pulse"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                )}
                <div
                  className="h-4 w-full rounded bg-white/[0.04] animate-pulse"
                  style={{ animationDelay: `${i * 100 + 50}ms` }}
                />
                <div
                  className="h-4 w-full rounded bg-white/[0.04] animate-pulse"
                  style={{ animationDelay: `${i * 100 + 100}ms` }}
                />
                <div
                  className="h-4 w-5/6 rounded bg-white/[0.04] animate-pulse"
                  style={{ animationDelay: `${i * 100 + 150}ms` }}
                />
              </div>
            ))}
          </div>

          {/* CTA skeleton */}
          <div className="mt-16 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
            <div className="mx-auto h-6 w-64 rounded bg-white/[0.06] animate-pulse" />
            <div className="mx-auto mt-3 h-4 w-48 rounded bg-white/[0.04] animate-pulse" />
            <div className="mx-auto mt-6 h-11 w-52 rounded-full bg-white/[0.06] animate-pulse" />
          </div>
        </div>
      </main>
    </div>
  );
}
