'use client';

import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { fireEvent } from '@/lib/analytics';

interface Props {
  serviceKey: string;
  label: string;
  isFeatured: boolean;
}

export function ServiceCardLink({ serviceKey, label, isFeatured }: Props) {
  const locale = useLocale();

  const handleClick = () => {
    fireEvent({
      tipo: 'click_servico',
      pagina: window.location.pathname,
      locale,
      metadados: { servico: serviceKey },
    });
  };

  return (
    <Link
      href="/sobre#contato"
      onClick={handleClick}
      className={`mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 ${
        isFeatured
          ? 'bg-white text-[#1565C0] hover:bg-[#EBF3FF] focus-visible:outline-white'
          : 'bg-[#1565C0] text-white hover:bg-[#1976D2] focus-visible:outline-[#1565C0]'
      }`}
    >
      {label}
      <ArrowRight size={14} aria-hidden="true" />
    </Link>
  );
}
