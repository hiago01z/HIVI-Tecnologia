import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import '@/app/globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hivi.com.br';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: 'HIVI Tecnologia',
      template: '%s | HIVI Tecnologia',
    },
    description: t('description'),
    openGraph: {
      siteName: 'HIVI Tecnologia',
      locale: locale.replace('-', '_'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
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
    '@type': 'Organization',
    name: 'HIVI Tecnologia',
    url: siteUrl,
    description:
      'Consultoria, gestão de TI, infraestrutura e desenvolvimento web para empresas de todos os portes.',
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
    <html lang={locale} className={inter.variable}>
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
      </body>
    </html>
  );
}
