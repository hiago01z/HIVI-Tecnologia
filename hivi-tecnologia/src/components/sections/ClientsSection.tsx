import { useTranslations } from 'next-intl';
import { CLIENT_LOGOS } from '@/constants/clients';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

export function ClientsSection() {
  const t = useTranslations('clients');

  return (
    <section className="bg-white py-16" aria-label={t('sectionTitle')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#0D1117]">{t('sectionTitle')}</h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1565C0]" aria-hidden="true" />
            <p className="mx-auto mt-4 max-w-lg text-sm text-[#4B5563]">{t('sectionSubtitle')}</p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={150}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {CLIENT_LOGOS.map((name) => (
              <span
                key={name}
                className="cursor-default select-none rounded-xl border border-[#E2E8F0] px-6 py-3 text-sm font-bold tracking-wide text-[#162268] opacity-40 grayscale transition-all duration-300 hover:border-[#1565C0]/40 hover:opacity-100 hover:grayscale-0"
              >
                {name}
              </span>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
