'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { checkRateLimit } from '@/lib/rateLimiter';

async function makeClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (list) => list.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
      },
    },
  );
}

const VALID_LOCALES = ['pt-BR', 'en', 'es'] as const;
type ValidLocale = (typeof VALID_LOCALES)[number];
function sanitizeLocale(raw: string | null): ValidLocale {
  return VALID_LOCALES.includes(raw as ValidLocale) ? (raw as ValidLocale) : 'pt-BR';
}

export async function loginAction(
  _prevState: { error: 'rateLimited' | 'invalid' } | null,
  formData: FormData,
): Promise<{ error: 'rateLimited' | 'invalid' } | null> {
  const headerStore = await headers();
  const ip = headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1';
  const locale = sanitizeLocale(formData.get('locale') as string | null);

  const { allowed } = checkRateLimit(`login:${ip}`);
  if (!allowed) {
    return { error: 'rateLimited' as const };
  }

  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const password = (formData.get('password') as string | null) ?? '';

  if (!email || !password) {
    return { error: 'invalid' as const };
  }

  let loginOk = false;
  try {
    const supabase = await makeClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) loginOk = true;
  } catch {
    return { error: 'invalid' as const };
  }

  if (!loginOk) {
    return { error: 'invalid' as const };
  }

  redirect(`/${locale}/admin/dashboard`);
}

export async function logoutAction(formData: FormData) {
  const locale = sanitizeLocale(formData.get('locale') as string | null);
  const supabase = await makeClient();
  // scope: 'global' revokes the refresh token server-side, invalidating all sessions for this user.
  await supabase.auth.signOut({ scope: 'global' });
  redirect(`/${locale}/admin`);
}
