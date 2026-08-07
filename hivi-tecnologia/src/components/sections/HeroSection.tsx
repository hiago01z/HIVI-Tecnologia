import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { HeroCard } from './HeroCard';

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
      style={{ background: 'linear-gradient(135deg, #eef4ff 0%, #dbe8fc 45%, #b6d0f7 100%)' }}
      aria-label="Hero"
    >
      {/* Animated blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="blob-drift-1 absolute rounded-full"
          style={{
            width: '640px', height: '640px',
            left: '-140px', top: '-180px',
            background: 'radial-gradient(circle at 35% 35%, rgba(37,99,235,.42), rgba(37,99,235,0) 70%)',
            filter: 'blur(28px)',
          }}
        />
        <div
          className="blob-drift-2 absolute rounded-full"
          style={{
            width: '560px', height: '560px',
            left: '32%', bottom: '-220px',
            background: 'radial-gradient(circle at 50% 50%, rgba(22,163,74,.34), rgba(22,163,74,0) 70%)',
            filter: 'blur(30px)',
          }}
        />
        <div
          className="blob-drift-3 absolute rounded-full"
          style={{
            width: '600px', height: '600px',
            right: '-160px', top: '-120px',
            background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,.40), rgba(59,130,246,0) 70%)',
            filter: 'blur(30px)',
          }}
        />
        <div
          className="blob-drift-4 absolute rounded-full"
          style={{
            width: '480px', height: '480px',
            right: '8%', bottom: '-180px',
            background: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,.22), rgba(245,158,11,0) 70%)',
            filter: 'blur(34px)',
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 mx-auto grid w-full max-w-[1360px] grid-cols-1 items-center gap-16 px-6 py-14 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-11 lg:py-14"
        style={{ minHeight: 'calc(100vh - 72px)' }}
      >
        {/* Left — Text */}
        <div>
          <p className="mb-[22px] text-[13px] font-bold uppercase tracking-[1.4px] text-[#2563eb]">
            {t('hero.eyebrow')}
          </p>

          <h1 className="mb-[26px] text-4xl font-extrabold leading-[1.02] tracking-[-1.5px] text-[#0f1b2d] text-balance sm:text-5xl lg:text-[56px] xl:text-[66px]">
            {t('hero.title')}
          </h1>

          <p className="mb-[30px] max-w-[460px] text-[18px] leading-[1.6] text-[#475569]">
            {t('hero.description')}
          </p>

          <ul className="mb-9 flex flex-col gap-3.5" role="list">
            {CHECK_ITEMS_KEYS.map((key) => (
              <li key={key} className="flex items-center gap-3 text-[16px] text-[#334155]">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-[13px] font-extrabold text-white"
                  aria-hidden="true"
                >
                  ✓
                </span>
                {t(key)}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/sobre#contato"
              className="inline-flex items-center gap-2.5 rounded-xl px-7 py-4 text-[16px] font-bold text-white transition-shadow hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-[#2563eb]"
              style={{
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                boxShadow: '0 16px 30px -10px rgba(37,99,235,.65)',
              }}
            >
              {t('hero.ctaPrimary')}
              <span aria-hidden="true" className="text-[18px]">→</span>
            </Link>
            <Link
              href="/servicos"
              className="inline-flex items-center gap-2.5 rounded-xl px-7 py-4 text-[16px] font-bold text-[#1e3a8a] transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-[#1e3a8a]"
              style={{
                background: 'rgba(255,255,255,.7)',
                border: '1.5px solid rgba(30,58,138,.25)',
              }}
            >
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </div>

        {/* Right — Interactive challenges card */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl">
            <HeroCard />
          </div>
        </div>
      </div>
    </section>
  );
}
