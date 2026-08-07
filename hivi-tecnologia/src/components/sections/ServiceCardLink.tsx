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
      className={`mt-auto flex w-full items-center justify-center gap-2 rounded-[10px] px-4 py-[11px] text-sm font-semibold transition-colors focus-visible:outline-2 ${
        isFeatured
          ? 'bg-white text-[#1d4ed8] hover:bg-[#eef4ff] focus-visible:outline-white'
          : 'border border-[#dbe6f7] bg-white text-[#1d4ed8] hover:border-[#2563eb] focus-visible:outline-[#2563eb]'
      }`}
    >
      {label}
      <ArrowRight size={14} aria-hidden="true" />
    </Link>
  );
}
