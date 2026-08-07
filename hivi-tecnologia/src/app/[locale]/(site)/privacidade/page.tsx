import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return {
    title: t('title'),
    description: t('intro'),
  };
}

export default async function PrivacidadePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacidadeContent />;
}

const SECTION_KEYS = [
  'dataController',
  'dataCollected',
  'purpose',
  'retention',
  'rights',
  'security',
  'subprocessors',
  'contact',
] as const;

function PrivacidadeContent() {
  const t = useTranslations('privacy');
  const email = process.env.NEXT_PUBLIC_EMAIL_CONTATO;

  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-[#0D1117]">{t('title')}</h1>
        <div className="mt-3 h-1 w-16 rounded-full bg-[#1565C0]" aria-hidden="true" />
        <p className="mt-4 text-sm text-[#4B5563]">
          {t('lastUpdated')}: 2026-08-07
        </p>
      </header>

      <p className="mb-10 rounded-xl bg-[#EBF3FF] p-6 text-[#4B5563] leading-relaxed">
        {t('intro')}
      </p>

      <div className="space-y-8">
        {SECTION_KEYS.map((key) => (
          <section key={key} aria-labelledby={`section-${key}`}>
            <h2
              id={`section-${key}`}
              className="text-xl font-semibold text-[#162268]"
            >
              {t(`sections.${key}.title`)}
            </h2>
            <p className="mt-3 leading-relaxed text-[#4B5563]">
              {t(`sections.${key}.content`)}
              {key === 'contact' && email && (
                <a
                  href={`mailto:${email}`}
                  className="ml-1 font-medium text-[#1565C0] underline hover:no-underline"
                >
                  {email}
                </a>
              )}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
