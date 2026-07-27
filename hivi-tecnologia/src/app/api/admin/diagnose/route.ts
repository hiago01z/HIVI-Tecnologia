import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

// Rota temporária de diagnóstico — REMOVER APÓS RESOLVER O LOGIN
// Protegida pelo token derivado da service role key (nunca exposta)
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('t');
  const expectedToken = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? '').slice(-12);

  if (!token || token !== expectedToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results: Record<string, unknown> = {};

  results.envVars = {
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    urlPrefix: process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 30),
    hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  };

  try {
    const admin = await createAdminClient();

    const { data: listData, error: listError } = await admin.auth.admin.listUsers({ perPage: 50 });

    if (listError) {
      results.adminApi = { error: listError.message };
    } else {
      const target = listData.users.find((u) => u.email === 'hiagoalmeida852@gmail.com');
      results.adminApi = { totalUsers: listData.users.length };

      if (!target) {
        results.user = { found: false };
      } else {
        results.user = {
          found: true,
          id: target.id.slice(0, 8) + '…',
          emailConfirmed: !!target.email_confirmed_at,
          confirmedAt: target.email_confirmed_at,
          lastSignIn: target.last_sign_in_at,
          createdAt: target.created_at,
          appMetadata: target.app_metadata,
          identities: target.identities?.map((i) => ({ provider: i.provider })),
        };
      }
    }
  } catch (e) {
    results.adminApi = { exception: String(e) };
  }

  return NextResponse.json(results);
}
