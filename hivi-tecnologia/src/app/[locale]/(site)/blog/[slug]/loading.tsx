export default function BlogPostLoading() {
  return (
    <main className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          {/* Back link skeleton */}
          <div className="mb-10 h-4 w-28 rounded bg-[#EBF3FF]" />

          {/* Date skeleton */}
          <div className="h-4 w-36 rounded bg-[#EBF3FF]" />

          {/* Title skeleton */}
          <div className="mt-4 h-10 w-full rounded bg-[#EBF3FF]" />
          <div className="mt-2 h-10 w-3/4 rounded bg-[#EBF3FF]" />

          {/* Cover image skeleton */}
          <div className="mt-8 h-72 w-full rounded-2xl bg-[#EBF3FF]" />

          {/* Content skeleton */}
          <div className="mt-10 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-4 rounded bg-[#EBF3FF]"
                style={{ width: `${85 + Math.floor((i * 17) % 15)}%` }}
              />
            ))}
            <div className="mt-6 h-4 w-full rounded bg-[#EBF3FF]" />
            <div className="h-4 w-4/5 rounded bg-[#EBF3FF]" />
            <div className="h-4 w-11/12 rounded bg-[#EBF3FF]" />
          </div>
        </div>
      </div>
    </main>
  );
}
