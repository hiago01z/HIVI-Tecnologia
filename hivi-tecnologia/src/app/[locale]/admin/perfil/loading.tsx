export default function PerfilLoading() {
  return (
    <div className="max-w-lg space-y-6">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-[#E2E8F0]" />
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="mb-6 flex items-center gap-5">
          <div className="h-20 w-20 animate-pulse rounded-full bg-[#E2E8F0]" />
          <div className="space-y-2">
            <div className="h-4 w-32 animate-pulse rounded bg-[#E2E8F0]" />
            <div className="h-3 w-24 animate-pulse rounded bg-[#E2E8F0]" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-10 animate-pulse rounded-lg bg-[#E2E8F0]" />
          <div className="h-10 animate-pulse rounded-lg bg-[#E2E8F0]" />
        </div>
        <div className="mt-6 h-10 w-32 animate-pulse rounded-lg bg-[#E2E8F0]" />
      </div>
    </div>
  );
}
