import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

export function CtaBanner() {
  const t = useTranslations();

  return (
    <section
      className="py-16 text-center"
      aria-label="Call to action"
      style={{ background: 'linear-gradient(120deg, #1e3a8a, #1d4ed8)' }}
    >
      <div className="mx-auto max-w-[760px] px-6 sm:px-8">
        <h2 className="mb-3.5 text-[32px] font-extrabold tracking-[-0.6px] text-white">
          {t('contact.ctaTitle')}
        </h2>
        <p className="mb-7 text-[17px] leading-[1.6] text-white/90">
          {t('contact.ctaText')}
        </p>
        <Link
          href="/sobre#contato"
          className="inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-[16px] font-bold text-[#1d4ed8] transition-colors hover:bg-[#eef4ff] focus-visible:outline-2 focus-visible:outline-white"
          style={{ background: '#fff', boxShadow: '0 16px 30px -12px rgba(0,0,0,.4)' }}
        >
          {t('nav.contact')}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
