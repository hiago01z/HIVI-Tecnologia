export default function PostsLoading() {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-40 rounded-lg bg-[#EBF3FF]" />
        <div className="h-10 w-28 rounded-lg bg-[#EBF3FF]" />
      </div>

      {/* Post rows */}
      <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-[#F1F5F9] px-6 py-4 last:border-0"
          >
            <div className="flex-1 space-y-2">
              <div className="h-5 w-2/3 rounded bg-[#EBF3FF]" />
              <div className="h-3 w-32 rounded bg-[#EBF3FF]" />
            </div>
            <div className="ml-4 flex items-center gap-3">
              <div className="h-6 w-20 rounded-full bg-[#EBF3FF]" />
              <div className="h-8 w-16 rounded-lg bg-[#EBF3FF]" />
              <div className="h-8 w-16 rounded-lg bg-[#EBF3FF]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
