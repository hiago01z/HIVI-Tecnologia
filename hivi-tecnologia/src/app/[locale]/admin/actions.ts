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

export async function loginAction(
  _prevState: { error: 'rateLimited' | 'invalid' } | null,
  formData: FormData,
): Promise<{ error: 'rateLimited' | 'invalid' } | null> {
  const headerStore = await headers();
  const ip = headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1';
  const locale = (formData.get('locale') as string) || 'pt-BR';

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
    if (error) {
      console.error('[HIVI admin login] auth error:', error.code, error.message);
    }
    if (!error) loginOk = true;
  } catch (e) {
    console.error('[HIVI admin login] exception:', e);
    return { error: 'invalid' as const };
  }

  if (!loginOk) {
    return { error: 'invalid' as const };
  }

  redirect(`/${locale}/admin/dashboard`);
}

export async function logoutAction(formData: FormData) {
  const locale = (formData.get('locale') as string) || 'pt-BR';
  const supabase = await makeClient();
  await supabase.auth.signOut();
  redirect(`/${locale}/admin`);
}
