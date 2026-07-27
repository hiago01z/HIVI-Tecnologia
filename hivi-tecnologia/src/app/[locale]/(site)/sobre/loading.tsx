export default function SobreLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-[#F0F7FF] to-[#C8DFFF] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto h-4 w-24 rounded-full bg-[#1565C0]/20" />
          <div className="mx-auto mt-4 h-10 w-56 rounded-lg bg-[#162268]/15" />
          <div className="mx-auto mt-4 h-5 w-80 rounded-md bg-[#162268]/10" />
        </div>
      </div>

      {/* About section skeleton */}
      <div className="bg-[#EBF3FF] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="h-4 w-24 rounded-full bg-[#1565C0]/20" />
              <div className="h-8 w-48 rounded-lg bg-[#162268]/15" />
              <div className="h-4 w-full rounded-md bg-[#162268]/10" />
              <div className="h-4 w-5/6 rounded-md bg-[#162268]/10" />
              <div className="h-4 w-4/5 rounded-md bg-[#162268]/10" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl bg-white p-5">
                  <div className="h-8 w-8 rounded-lg bg-[#1565C0]/20" />
                  <div className="mt-3 h-5 w-24 rounded-md bg-[#162268]/15" />
                  <div className="mt-2 h-4 w-full rounded-md bg-[#162268]/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact form skeleton */}
      <div className="bg-[#EBF3FF] py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="mx-auto h-7 w-40 rounded-lg bg-[#162268]/15" />
            <div className="mt-6 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-12 w-full rounded-lg bg-[#EBF3FF]" />
              ))}
              <div className="h-32 w-full rounded-lg bg-[#EBF3FF]" />
              <div className="h-12 w-full rounded-lg bg-[#1565C0]/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
