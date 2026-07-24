import { useTranslations } from 'next-intl';
import { Target, Eye, Heart, CheckCircle } from 'lucide-react';

export function AboutSection() {
  const t = useTranslations('about');
  const values = t.raw('valuesItems') as string[];

  return (
    <section className="bg-[#EBF3FF] py-24" aria-label={t('sectionTitle')}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0D1117] lg:text-4xl">
            {t('sectionTitle')}
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1565C0]" aria-hidden="true" />
          <p className="mx-auto mt-5 max-w-xl text-[#4B5563]">
            {t('sectionSubtitle')}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left — description */}
          <div>
            <p className="text-[#4B5563] leading-relaxed">{t('description1')}</p>
            <p className="mt-4 text-[#4B5563] leading-relaxed">{t('description2')}</p>

            {/* Values list */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-[#0D1117]">{t('values')}</h3>
              <ul className="mt-4 space-y-2" role="list">
                {Array.isArray(values) &&
                  values.map((value: string) => (
                    <li key={value} className="flex items-center gap-3">
                      <CheckCircle
                        size={18}
                        className="shrink-0 text-[#22C55E]"
                        aria-hidden="true"
                      />
                      <span className="text-[#4B5563]">{value}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Right — mission / vision cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-sm border border-[#E2E8F0]">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1565C0]/10">
                <Target size={22} className="text-[#1565C0]" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-[#0D1117]">{t('mission')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
                {t('missionText')}
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm border border-[#E2E8F0]">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1565C0]/10">
                <Eye size={22} className="text-[#1565C0]" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-[#0D1117]">{t('vision')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">
                {t('visionText')}
              </p>
            </div>

            <div className="rounded-xl bg-[#162268] p-6 sm:col-span-2 lg:col-span-1 xl:col-span-2">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
                <Heart size={22} className="text-white" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-white">{t('values')}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {Array.isArray(values) &&
                  values.map((value: string) => (
                    <span
                      key={value}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white"
                    >
                      {value}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
