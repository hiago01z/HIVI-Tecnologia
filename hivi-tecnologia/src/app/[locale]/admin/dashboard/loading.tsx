export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="h-8 w-36 rounded-lg bg-[#EBF3FF]" />
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-9 w-28 rounded-lg bg-[#EBF3FF]" />
          ))}
        </div>
      </div>

      {/* Metric cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-4 h-11 w-11 rounded-xl bg-[#EBF3FF]" />
            <div className="h-4 w-32 rounded bg-[#EBF3FF]" />
            <div className="mt-2 h-8 w-16 rounded bg-[#EBF3FF]" />
          </div>
        ))}
      </div>
    </div>
  );
}
