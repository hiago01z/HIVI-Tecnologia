import { useTranslations } from 'next-intl';
import { Activity, Headphones, Timer } from 'lucide-react';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

const STATS = [
  { valueKey: 'stats.uptimeValue', labelKey: 'stats.uptime', Icon: Activity },
  { valueKey: 'stats.responseValue', labelKey: 'stats.response', Icon: Timer },
  { valueKey: 'stats.supportValue', labelKey: 'stats.support', Icon: Headphones },
] as const;

export function StatsSection() {
  const t = useTranslations();

  return (
    <section className="bg-[#162268] py-20" aria-label={t('common.statsSection')}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STATS.map(({ valueKey, labelKey, Icon }, index) => (
            <AnimateOnScroll key={valueKey} delay={index * 100}>
              <div className="flex flex-col items-center rounded-xl border border-white/15 bg-white/7 p-8 text-center">
                <Icon
                  size={40}
                  className="text-white/70"
                  aria-hidden="true"
                  strokeWidth={1.5}
                />
                <p className="mt-4 text-4xl font-extrabold text-white lg:text-5xl">
                  {t(valueKey)}
                </p>
                <p className="mt-2 text-sm text-[#CBD5E1]">{t(labelKey)}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
