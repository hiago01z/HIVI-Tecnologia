'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations('common');

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label={t('backToTop')}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-20 right-5 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-[#162268] text-white shadow-lg transition-all hover:bg-[#1565C0] focus-visible:outline-2 focus-visible:outline-[#1565C0] sm:bottom-8 sm:right-8"
    >
      <ChevronUp size={20} aria-hidden="true" />
    </button>
  );
}
