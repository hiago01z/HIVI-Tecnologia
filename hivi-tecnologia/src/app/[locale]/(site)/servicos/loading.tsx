export default function ServicosLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-[#F0F7FF] to-[#C8DFFF] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto h-4 w-32 rounded-full bg-[#1565C0]/20" />
          <div className="mx-auto mt-4 h-10 w-64 rounded-lg bg-[#162268]/15" />
          <div className="mx-auto mt-4 h-5 w-96 rounded-md bg-[#162268]/10" />
        </div>
      </div>

      {/* Cards grid skeleton */}
      <div className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-[#EBF3FF] p-6">
                <div className="h-10 w-10 rounded-lg bg-[#1565C0]/20" />
                <div className="mt-4 h-6 w-3/4 rounded-md bg-[#162268]/15" />
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
