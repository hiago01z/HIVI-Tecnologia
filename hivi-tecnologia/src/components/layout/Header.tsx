import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { NAV_LINKS } from '@/constants/navigation';

function HiviLogo() {
  return (
    <Link href="/" aria-label="HIVI Tecnologia — Página Inicial">
      <span className="text-2xl font-extrabold tracking-tight">
        <span className="text-[#162268]">HIVI</span>
        <span className="text-[#1565C0]">.</span>
      </span>
    </Link>
  );
}

export function Header() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <HiviLogo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
          {NAV_LINKS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="rounded-md px-3 py-2 text-sm font-medium text-[#4B5563] transition-colors hover:bg-[#EBF3FF] hover:text-[#1565C0]"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href="/sobre#contato"
            className="hidden rounded-lg bg-[#1565C0] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1976D2] focus-visible:outline-2 focus-visible:outline-[#1565C0] md:block"
          >
            {t('nav.contact')}
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
