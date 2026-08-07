import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { CtaBanner } from '@/components/sections/CtaBanner';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return {
    title: t('sectionTitle'),
    description: t('sectionSubtitle'),
  };
}

export default async function ServicosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ServicesPageHero />
      <ServicesSection showHeading={false} />
      <CtaBanner />
    </>
  );
}

function ServicesPageHero() {
  const t = useTranslations('services');
  return (
    <section
      className="py-24"
      style={{ background: 'linear-gradient(135deg, #F0F7FF 0%, #C8DFFF 60%, #9EC8FF 100%)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold text-[#0D1117] lg:text-5xl">
          {t('sectionTitle')}
        </h1>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#1565C0]" aria-hidden="true" />
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#4B5563]">
          {t('sectionSubtitle')}
        </p>
      </div>
    </section>
  );
}
