export default function ContatosLoading() {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="h-8 w-52 rounded-lg bg-[#EBF3FF]" />
      <div className="mt-1 h-4 w-36 rounded bg-[#EBF3FF]" />

      {/* Contact cards */}
      <div className="mt-8 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="h-5 w-40 rounded bg-[#EBF3FF]" />
                <div className="h-4 w-52 rounded bg-[#EBF3FF]" />
                <div className="h-4 w-36 rounded bg-[#EBF3FF]" />
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-16 rounded-full bg-[#EBF3FF]" />
                <div className="h-6 w-20 rounded-full bg-[#EBF3FF]" />
                <div className="h-4 w-24 rounded bg-[#EBF3FF]" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full rounded bg-[#EBF3FF]" />
              <div className="h-4 w-5/6 rounded bg-[#EBF3FF]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
