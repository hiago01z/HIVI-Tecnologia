import { useTranslations } from 'next-intl';

const STATS = [
  { valueKey: 'stats.uptimeValue', labelKey: 'stats.uptime', color: '#4ade80' },
  { valueKey: 'stats.responseValue', labelKey: 'stats.response', color: '#fbbf24' },
  { valueKey: 'stats.supportValue', labelKey: 'stats.support', color: '#60a5fa' },
] as const;

export function StatsSection() {
  const t = useTranslations();

  return (
    <section
      className="py-14"
      aria-label={t('common.statsSection')}
      style={{ background: 'linear-gradient(120deg, #1e3a8a 0%, #1d4ed8 55%, #1e293b 100%)' }}
    >
      <div className="mx-auto max-w-[1100px] px-6 sm:px-8">
        <div className="grid grid-cols-1 divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0 text-center">
          {STATS.map(({ valueKey, labelKey, color }) => (
            <div key={valueKey} className="py-10 sm:py-0 sm:px-8">
              <p
                className="text-[52px] font-extrabold leading-none tracking-[-1px]"
                style={{ color }}
              >
                {t(valueKey)}
              </p>
              <p className="mt-2.5 text-[15px] font-semibold tracking-[.4px] text-[#cbd5e1]">
                {t(labelKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
