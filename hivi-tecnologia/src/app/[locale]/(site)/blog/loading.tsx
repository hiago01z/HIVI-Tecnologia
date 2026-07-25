export default function BlogLoading() {
  return (
    <main className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading skeleton */}
        <div className="animate-pulse text-center">
          <div className="mx-auto h-9 w-24 rounded-md bg-[#EBF3FF]" />
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1565C0]/30" />
          <div className="mx-auto mt-5 h-5 w-80 rounded-md bg-[#EBF3FF]" />
        </div>

        {/* Cards grid skeleton */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-[#E2E8F0]">
              <div className="h-48 bg-[#EBF3FF]" />
              <div className="p-6">
                <div className="h-4 w-24 rounded bg-[#EBF3FF]" />
                <div className="mt-3 h-6 w-3/4 rounded bg-[#EBF3FF]" />
                <div className="mt-2 h-4 w-full rounded bg-[#EBF3FF]" />
                <div className="mt-1 h-4 w-5/6 rounded bg-[#EBF3FF]" />
                <div className="mt-6 h-4 w-28 rounded bg-[#1565C0]/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
