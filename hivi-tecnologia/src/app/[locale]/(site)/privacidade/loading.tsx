export default function PrivacidadeLoading() {
  return (
    <div className="animate-pulse mx-auto max-w-3xl px-4 py-20 sm:px-6">
      {/* Header skeleton */}
      <div className="mb-12">
        <div className="h-10 w-72 rounded-lg bg-[#EBF3FF]" />
        <div className="mt-3 h-1 w-16 rounded-full bg-[#1565C0]/30" />
        <div className="mt-4 h-4 w-40 rounded-md bg-[#EBF3FF]" />
      </div>

      {/* Intro box skeleton */}
      <div className="mb-10 rounded-xl bg-[#EBF3FF] p-6">
        <div className="h-4 w-full rounded-md bg-[#1565C0]/10" />
        <div className="mt-2 h-4 w-5/6 rounded-md bg-[#1565C0]/10" />
        <div className="mt-2 h-4 w-4/5 rounded-md bg-[#1565C0]/10" />
      </div>

      {/* Sections skeleton */}
      <div className="space-y-8">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i}>
            <div className="h-6 w-48 rounded-md bg-[#162268]/15" />
            <div className="mt-3 h-4 w-full rounded-md bg-[#EBF3FF]" />
            <div className="mt-2 h-4 w-5/6 rounded-md bg-[#EBF3FF]" />
          </div>
        ))}
      </div>
    </div>
  );
}
