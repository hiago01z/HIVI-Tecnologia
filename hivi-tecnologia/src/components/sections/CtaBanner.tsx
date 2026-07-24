import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

export function CtaBanner() {
  const t = useTranslations();

  return (
    <section className="bg-[#1565C0] py-12" aria-label="Call to action">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-center text-lg font-semibold text-white sm:text-left">
          {t('contact.ctaText')}
        </p>
        <Link
          href="/sobre#contato"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-bold text-[#1565C0] transition-colors hover:bg-[#EBF3FF] focus-visible:outline-2 focus-visible:outline-white"
        >
          {t('nav.contact')}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
