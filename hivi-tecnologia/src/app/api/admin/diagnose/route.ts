import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Rota temporária de diagnóstico — REMOVER APÓS RESOLVER O LOGIN
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('t');
  const expectedToken = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? '').slice(-12);

  if (!token || token !== expectedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

  const results: Record<string, unknown> = {
    envVars: {
      hasUrl: !!url,
      urlPrefix: url.slice(0, 35),
      hasAnonKey: !!anonKey,
      anonKeyPrefix: anonKey.slice(0, 20),
      hasServiceKey: !!serviceKey,
    },
  };

  // Testar conexão com anon key
  try {
    const anonClient = createServerClient(url, anonKey, {
      cookies: { getAll: () => [], setAll: () => {} },
    });
    const { error: pingError } = await anonClient.from('blog_posts').select('id').limit(1);
    results.anonKeyTest = pingError
      ? { ok: false, error: pingError.message, code: pingError.code }
      : { ok: true };
  } catch (e) {
    results.anonKeyTest = { ok: false, exception: String(e) };
  }

  // Testar conexão com service key e verificar usuário
  try {
    const adminClient = createServerClient(url, serviceKey, {
      cookies: { getAll: () => [], setAll: () => {} },
    });
    const { data, error } = await adminClient.auth.admin.listUsers({ perPage: 10 });
    if (error) {
      results.serviceKeyTest = { ok: false, error: error.message };
    } else {
      const target = data.users.find((u) => u.email === 'hiagoalmeida852@gmail.com');
      results.serviceKeyTest = { ok: true, totalUsers: data.users.length };
      results.user = target
        ? {
            found: true,
            emailConfirmed: !!target.email_confirmed_at,
            lastSignIn: target.last_sign_in_at,
            provider: target.app_metadata?.provider,
            identities: target.identities?.map((i) => i.provider),
          }
        : { found: false };
    }
  } catch (e) {
    results.serviceKeyTest = { ok: false, exception: String(e) };
  }

  return NextResponse.json(results);
}
