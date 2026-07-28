import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { SolutionsSection } from '@/components/sections/SolutionsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { ContactSection } from '@/components/sections/ContactSection';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  return {
    title: 'HIVI Tecnologia',
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: { 'x-default': '/pt-BR', 'pt-BR': '/pt-BR', en: '/en', es: '/es' },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <SolutionsSection />
      <AboutSection />
      <CtaBanner />
      <ContactSection />
    </>
  );
}
