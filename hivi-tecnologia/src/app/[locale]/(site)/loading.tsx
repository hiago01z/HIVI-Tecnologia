export default function HomeLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-[#F0F7FF] to-[#C8DFFF] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="h-4 w-80 rounded-full bg-[#1565C0]/20" />
              <div className="mt-4 h-12 w-3/4 rounded-lg bg-[#162268]/15" />
              <div className="mt-2 h-12 w-1/2 rounded-lg bg-[#162268]/15" />
              <div className="mt-4 h-5 w-full rounded-md bg-[#162268]/10" />
              <div className="mt-2 h-5 w-4/5 rounded-md bg-[#162268]/10" />
              <div className="mt-8 flex gap-4">
                <div className="h-12 w-36 rounded-full bg-[#1565C0]/30" />
                <div className="h-12 w-36 rounded-full bg-[#162268]/15" />
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="h-80 w-full rounded-2xl bg-[#1565C0]/10" />
            </div>
          </div>
        </div>
      </div>

      {/* Clients strip skeleton */}
      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 h-4 w-48 rounded-md bg-[#EBF3FF]" />
          <div className="flex gap-8 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 w-32 shrink-0 rounded-md bg-[#EBF3FF]" />
            ))}
          </div>
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="bg-[#162268] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto h-10 w-24 rounded-md bg-white/20" />
                <div className="mx-auto mt-2 h-4 w-32 rounded-md bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services skeleton */}
      <div className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 text-center">
            <div className="mx-auto h-8 w-48 rounded-md bg-[#EBF3FF]" />
            <div className="mx-auto mt-3 h-4 w-72 rounded-md bg-[#EBF3FF]" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-[#EBF3FF] p-6">
                <div className="h-10 w-10 rounded-lg bg-[#1565C0]/20" />
                <div className="mt-4 h-5 w-3/4 rounded-md bg-[#162268]/15" />
                <div className="mt-2 h-4 w-full rounded-md bg-[#162268]/10" />
                <div className="mt-1 h-4 w-5/6 rounded-md bg-[#162268]/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
