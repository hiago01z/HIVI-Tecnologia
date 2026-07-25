import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CheckCircle, ArrowRight } from 'lucide-react';

const CHECK_ITEMS_KEYS = [
  'hero.check1',
  'hero.check2',
  'hero.check3',
  'hero.check4',
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

        {/* Right — Illustration */}
        <div className="flex flex-1 items-center justify-center" aria-hidden="true">
          <div className="relative w-full max-w-md">
            {/* Dashboard mockup */}
            <div className="rounded-2xl bg-white shadow-2xl overflow-hidden border border-white/80">
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 bg-[#F8FAFC] px-4 py-3 border-b border-[#E2E8F0]">
                <span className="h-3 w-3 rounded-full bg-[#EF4444]" />
                <span className="h-3 w-3 rounded-full bg-[#F59E0B]" />
                <span className="h-3 w-3 rounded-full bg-[#22C55E]" />
                <span className="ml-4 flex-1 rounded bg-[#E2E8F0] h-4" />
              </div>
              {/* Dashboard content */}
              <div className="p-6 bg-[#F8FAFC]">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {([
                    { value: '150+', labelKey: 'hero.mockup.statClients', color: '#EBF3FF', accent: '#1565C0' },
                    { value: '99.9%', labelKey: 'hero.mockup.statUptime', color: '#F0FDF4', accent: '#22C55E' },
                    { value: '300+', labelKey: 'hero.mockup.statProjects', color: '#EBF3FF', accent: '#1565C0' },
                    { value: '24/7', labelKey: 'hero.mockup.statSupport', color: '#FFF7ED', accent: '#F59E0B' },
                  ] as const).map((stat) => (
                    <div
                      key={stat.labelKey}
                      className="rounded-xl p-4"
                      style={{ backgroundColor: stat.color }}
                    >
                      <p className="text-xl font-extrabold" style={{ color: stat.accent }}>
                        {stat.value}
                      </p>
                      <p className="text-xs text-[#4B5563] mt-0.5">{t(stat.labelKey)}</p>
                    </div>
                  ))}
                </div>
                {/* Fake chart bars */}
                <div className="rounded-xl bg-white p-4 border border-[#E2E8F0]">
                  <p className="text-xs font-semibold text-[#4B5563] mb-3">{t('hero.mockup.chartLabel')}</p>
                  <div className="flex items-end gap-2 h-16">
                    {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                          height: `${h}%`,
                          backgroundColor: i === 5 ? '#1565C0' : '#EBF3FF',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -left-6 top-8 rounded-xl bg-[#22C55E] px-3 py-2 shadow-lg hidden lg:block">
              <p className="text-xs font-bold text-white">{t('hero.mockup.badgeDelivered')}</p>
            </div>
            <div className="absolute -right-6 bottom-12 rounded-xl bg-[#1565C0] px-3 py-2 shadow-lg hidden lg:block">
              <p className="text-xs font-bold text-white">{t('hero.mockup.badgeProductivity')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
