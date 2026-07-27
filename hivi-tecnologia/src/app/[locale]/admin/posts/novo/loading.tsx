export default function NovoPostLoading() {
  return (
    <div className="animate-pulse">
      <div className="mb-8 h-8 w-48 rounded-lg bg-[#162268]/15" />

      <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-[#E2E8F0] pb-4">
          {['pt-BR', 'en', 'es'].map((locale) => (
            <div key={locale} className="h-9 w-16 rounded-lg bg-[#EBF3FF]" />
          ))}
        </div>

        {/* Form fields */}
        <div className="space-y-5">
          <div>
            <div className="mb-1.5 h-4 w-16 rounded bg-[#EBF3FF]" />
            <div className="h-11 w-full rounded-lg bg-[#EBF3FF]" />
          </div>
          <div>
            <div className="mb-1.5 h-4 w-10 rounded bg-[#EBF3FF]" />
            <div className="h-11 w-full rounded-lg bg-[#EBF3FF]" />
          </div>
          <div>
            <div className="mb-1.5 h-4 w-16 rounded bg-[#EBF3FF]" />
            <div className="h-24 w-full rounded-lg bg-[#EBF3FF]" />
          </div>
          <div>
            <div className="mb-1.5 h-4 w-20 rounded bg-[#EBF3FF]" />
            <div className="h-64 w-full rounded-lg bg-[#EBF3FF]" />
          </div>
          <div>
            <div className="mb-1.5 h-4 w-24 rounded bg-[#EBF3FF]" />
            <div className="h-11 w-full rounded-lg bg-[#EBF3FF]" />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <div className="h-10 w-28 rounded-lg bg-[#EBF3FF]" />
          <div className="h-10 w-28 rounded-lg bg-[#162268]/20" />
        </div>
      </div>
    </div>
  );
}
