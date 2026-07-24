import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const SPANISH_SPEAKING_COUNTRIES = new Set([
  'ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU',
  'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'GQ',
]);

const ENGLISH_SPEAKING_COUNTRIES = new Set([
  'US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA', 'JM', 'TT', 'BZ',
]);

function detectLocale(request: NextRequest): string {
  const savedLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (savedLocale && routing.locales.includes(savedLocale as typeof routing.locales[number])) {
    return savedLocale;
  }

  const country = request.headers.get('x-vercel-ip-country');
  if (country) {
    if (country === 'BR') return 'pt-BR';
    if (SPANISH_SPEAKING_COUNTRIES.has(country)) return 'es';
    if (ENGLISH_SPEAKING_COUNTRIES.has(country)) return 'en';
  }

  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferred = acceptLanguage.split(',')[0].trim().toLowerCase();
    if (preferred.startsWith('pt')) return 'pt-BR';
    if (preferred.startsWith('es')) return 'es';
    if (preferred.startsWith('en')) return 'en';
  }

  return routing.defaultLocale;
}

function isAdminRoute(pathname: string): boolean {
  return /^\/[^/]+\/admin\//.test(pathname);
}

function isAdminLoginRoute(pathname: string): boolean {
  return /^\/[^/]+\/admin$/.test(pathname);
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const sessionCookie = request.cookies.get('sb-access-token')?.value
    ?? request.cookies.get('sb-auth-token')?.value;
  return Boolean(sessionCookie);
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (pathname === '/' || !routing.locales.some(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  )) {
    const locale = detectLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url);
  }

  if (isAdminRoute(pathname)) {
    const authenticated = await isAuthenticated(request);
    if (!authenticated) {
      const locale = pathname.split('/')[1] ?? routing.defaultLocale;
      const loginUrl = new URL(`/${locale}/admin`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = intlMiddleware(request);

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};
