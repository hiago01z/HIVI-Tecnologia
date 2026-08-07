import { useTranslations } from 'next-intl';
import { Target, Eye } from 'lucide-react';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

export function AboutSection() {
  const t = useTranslations('about');
  const values = t.raw('valuesItems') as string[];

  return (
    <section className="bg-[#eef4ff] py-[88px]" aria-label={t('sectionTitle')}>
      <div className="mx-auto max-w-[1160px] px-6 sm:px-8">
        {/* Heading */}
        <AnimateOnScroll>
          <div className="mb-[52px] text-center">
            <h2 className="text-[42px] font-extrabold tracking-[-1px] text-[#0f1b2d]">
              {t('sectionTitle')}
            </h2>
            <div className="mx-auto mt-3.5 mb-[18px] h-1 w-16 rounded-full bg-[#2563eb]" aria-hidden="true" />
            <p className="mx-auto max-w-[640px] text-[17px] text-[#64748b]">
              {t('sectionSubtitle')}
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          {/* Left — description + values */}
          <AnimateOnScroll delay={100}>
            <p className="text-[16px] leading-[1.7] text-[#475569]">
              {t('description1')}
            </p>
            <p className="mt-[18px] text-[16px] leading-[1.7] text-[#475569]">
              {t('description2')}
            </p>

            <div className="mt-7">
              <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[1px] text-[#2563eb]">
                {t('values')}
              </p>
              <div className="flex flex-wrap gap-2.5" role="list">
                {Array.isArray(values) &&
                  values.map((value: string) => (
                    <span
                      key={value}
                      role="listitem"
                      className="inline-flex items-center gap-2 rounded-full border border-[#dbe6f7] bg-white px-[15px] py-[9px] text-[14px] font-semibold text-[#1e3a8a]"
                    >
                      <span className="font-extrabold text-[#16a34a]" aria-hidden="true">✓</span>
                      {value}
                    </span>
                  ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right — Mission + Vision cards */}
          <AnimateOnScroll delay={200}>
            <div className="flex flex-col gap-5">
              <div
                className="rounded-[18px] border border-[#dbe6f7] bg-white p-[26px]"
                style={{ boxShadow: '0 16px 34px -22px rgba(30,58,138,.4)' }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-[#eaf1ff] text-[#2563eb]">
                    <Target size={22} aria-hidden="true" strokeWidth={1.8} />
                  </span>
                  <h3 className="text-[19px] font-extrabold text-[#0f1b2d]">{t('mission')}</h3>
                </div>
                <p className="text-[15px] leading-[1.65] text-[#475569]">{t('missionText')}</p>
              </div>

              <div
                className="rounded-[18px] border border-[#dbe6f7] bg-white p-[26px]"
                style={{ boxShadow: '0 16px 34px -22px rgba(30,58,138,.4)' }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-[#eafaf0] text-[#16a34a]">
                    <Eye size={22} aria-hidden="true" strokeWidth={1.8} />
                  </span>
                  <h3 className="text-[19px] font-extrabold text-[#0f1b2d]">{t('vision')}</h3>
                </div>
                <p className="text-[15px] leading-[1.65] text-[#475569]">{t('visionText')}</p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
