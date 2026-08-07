import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '@/app/globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hivi.com.br';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  const description = t('description');
  const keywords = t('keywords').split(',').map((k: string) => k.trim());

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: 'HIVI Tecnologia',
      template: '%s | HIVI Tecnologia',
    },
    description,
    keywords,
    authors: [{ name: 'HIVI Tecnologia', url: siteUrl }],
    openGraph: {
      siteName: 'HIVI Tecnologia',
      title: 'HIVI Tecnologia',
      description,
      locale: locale.replace('-', '_'),
      type: 'website',
      url: siteUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'HIVI Tecnologia',
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    name: 'HIVI Tecnologia',
    url: siteUrl,
    description:
      'Consultoria, gestão de TI, infraestrutura e desenvolvimento web para empresas de todos os portes.',
    areaServed: { '@type': 'Country', name: 'Brazil' },
    knowsLanguage: ['pt-BR', 'en', 'es'],
    serviceType: [
      'Consultoria de TI',
      'Gestão de Projetos de TI',
      'Infraestrutura e Cloud',
      'Segurança da Informação',
      'Desenvolvimento Web',
      'Business Intelligence',
    ],
    ...(process.env.NEXT_PUBLIC_EMAIL_CONTATO
      ? { email: process.env.NEXT_PUBLIC_EMAIL_CONTATO }
      : {}),
    ...(process.env.NEXT_PUBLIC_TELEFONE
      ? { telephone: process.env.NEXT_PUBLIC_TELEFONE }
      : {}),
    sameAs: [
      process.env.NEXT_PUBLIC_LINKEDIN,
      process.env.NEXT_PUBLIC_INSTAGRAM,
      process.env.NEXT_PUBLIC_FACEBOOK,
    ].filter(Boolean),
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'HIVI Tecnologia',
    url: siteUrl,
  };

  return (
    <html lang={locale} className={plusJakartaSans.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
