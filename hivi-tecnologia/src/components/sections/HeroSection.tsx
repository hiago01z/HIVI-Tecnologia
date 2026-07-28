import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CheckCircle, ArrowRight, Shield, TrendingUp } from 'lucide-react';

const CHECK_ITEMS_KEYS = [
  'hero.check1',
  'hero.check2',
  'hero.check3',
  'hero.check4',
] as const;

const METRIC_ITEMS = [
  { valueKey: 'stats.uptimeValue', labelKey: 'hero.mockup.statUptime', color: '#F0FDF4', accent: '#22C55E' },
  { valueKey: 'stats.supportValue', labelKey: 'hero.mockup.statSupport', color: '#EBF3FF', accent: '#1565C0' },
  { valueKey: 'stats.responseValue', labelKey: 'hero.mockup.statResponse', color: '#FFF7ED', accent: '#F59E0B' },
] as const;

export function HeroSection() {
  const t = useTranslations();

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F0F7FF 0%, #C8DFFF 60%, #9EC8FF 100%)',
      }}
      aria-label="Hero"
    >
      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center gap-12 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        {/* Left — Text */}
        <div className="flex-1 text-left">
          <p className="text-xs font-semibold uppercase tracking-[2px] text-[#1565C0]">
            {t('hero.eyebrow')}
          </p>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-[#0D1117] sm:text-4xl lg:text-5xl xl:text-[56px]">
            {t('hero.title')}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-[#4B5563]">
            {t('hero.description')}
          </p>

          <ul className="mt-8 space-y-3" role="list">
            {CHECK_ITEMS_KEYS.map((key) => (
              <li key={key} className="flex items-start gap-3">
                <CheckCircle
                  size={20}
                  className="mt-0.5 shrink-0 text-[#22C55E]"
                  aria-hidden="true"
                />
                <span className="text-[#4B5563]">{t(key)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/sobre#contato"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1565C0] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#1976D2] focus-visible:outline-2 focus-visible:outline-[#1565C0]"
            >
              {t('hero.ctaPrimary')}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/servicos"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-[#1565C0] px-7 py-3.5 text-sm font-semibold text-[#1565C0] transition-colors hover:bg-[#EBF3FF] focus-visible:outline-2 focus-visible:outline-[#1565C0]"
            >
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </div>

        {/* Right — Dashboard mockup */}
        <div className="flex flex-1 items-center justify-center" aria-hidden="true">
          <div className="relative w-full max-w-md">
            <div className="rounded-2xl bg-white shadow-2xl overflow-hidden border border-white/80">
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 bg-[#F8FAFC] px-4 py-3 border-b border-[#E2E8F0]">
                <span className="h-3 w-3 rounded-full bg-[#EF4444]" />
                <span className="h-3 w-3 rounded-full bg-[#F59E0B]" />
                <span className="h-3 w-3 rounded-full bg-[#22C55E]" />
                <span className="ml-4 flex-1 rounded bg-[#E2E8F0] h-4" />
              </div>

              <div className="p-5 bg-[#F8FAFC] space-y-4">
                {/* Service commitment metrics */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-2">
                    {t('hero.mockup.serviceCommitments')}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {METRIC_ITEMS.map((item) => (
                      <div
                        key={item.labelKey}
                        className="rounded-xl p-3"
                        style={{ backgroundColor: item.color }}
                      >
                        <p className="text-base font-extrabold leading-none" style={{ color: item.accent }}>
                          {t(item.valueKey)}
                        </p>
                        <p className="text-[10px] text-[#4B5563] mt-1">{t(item.labelKey)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Growth trend chart */}
                <div className="rounded-xl bg-white border border-[#E2E8F0] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-3">
                    {t('hero.mockup.growthChart')}
                  </p>
                  <svg
                    viewBox="0 0 240 72"
                    fill="none"
                    className="w-full"
                    aria-hidden="true"
                  >
                    {/* Horizontal grid lines */}
                    <line x1="0" y1="56" x2="240" y2="56" stroke="#E2E8F0" strokeWidth="1" />
                    <line x1="0" y1="38" x2="240" y2="38" stroke="#E2E8F0" strokeWidth="1" />
                    <line x1="0" y1="20" x2="240" y2="20" stroke="#E2E8F0" strokeWidth="1" />
                    {/* Gradient fill under the line */}
                    <path
                      d="M0 65 C50 60, 90 52, 130 42 C170 32, 200 20, 240 10 L240 72 L0 72 Z"
                      fill="#1565C0"
                      fillOpacity="0.08"
                    />
                    {/* Trend line - upward curve */}
                    <path
                      d="M0 65 C50 60, 90 52, 130 42 C170 32, 200 20, 240 10"
                      stroke="#1565C0"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* Data points */}
                    <circle cx="0" cy="65" r="3" fill="#1565C0" />
                    <circle cx="60" cy="54" r="3" fill="#1565C0" />
                    <circle cx="120" cy="43" r="3" fill="#1565C0" />
                    <circle cx="180" cy="25" r="3" fill="#1565C0" />
                    <circle cx="240" cy="10" r="4" fill="#1565C0" />
                  </svg>
                </div>

                {/* Satisfaction row */}
                <div className="flex items-center gap-2.5 rounded-xl bg-white border border-[#E2E8F0] px-4 py-3">
                  <div className="flex gap-0.5 text-[#F59E0B]" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} viewBox="0 0 14 14" width="14" height="14" fill="currentColor">
                        <path d="M7 1l1.545 3.131L12 4.635l-2.5 2.436.59 3.438L7 8.877l-3.09 1.632.59-3.438L2 4.635l3.455-.504L7 1z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-[#4B5563]">{t('hero.mockup.satisfaction')}</p>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -left-6 top-8 rounded-xl bg-[#162268] px-3 py-2 shadow-lg hidden lg:flex items-center gap-2">
              <Shield size={13} className="text-white shrink-0" aria-hidden="true" />
              <p className="text-xs font-bold text-white">{t('hero.mockup.badgeSecurity')}</p>
            </div>
            <div className="absolute -right-6 bottom-12 rounded-xl bg-[#22C55E] px-3 py-2 shadow-lg hidden lg:flex items-center gap-2">
              <TrendingUp size={13} className="text-white shrink-0" aria-hidden="true" />
              <p className="text-xs font-bold text-white">{t('hero.mockup.badgeGrowth')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
