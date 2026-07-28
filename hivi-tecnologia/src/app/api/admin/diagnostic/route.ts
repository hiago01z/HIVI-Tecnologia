import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export async function GET() {
  const result: Record<string, unknown> = {};

  // Verifica variáveis de ambiente (mascaradas)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

  result.env = {
    supabase_url: supabaseUrl ? `${supabaseUrl.slice(0, 30)}...` : 'NÃO CONFIGURADA',
    anon_key_prefix: anonKey ? `${anonKey.slice(0, 20)}...` : 'NÃO CONFIGURADA',
    service_key_prefix: serviceKey ? `${serviceKey.slice(0, 20)}...` : 'NÃO CONFIGURADA',
    anon_equals_service: anonKey === serviceKey,
  };

  // Testa auth (createClient com anon key)
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    result.auth = {
      ok: !error,
      user: data?.user?.email ?? null,
      error: error?.message ?? null,
    };
  } catch (err) {
    result.auth = { ok: false, error: String(err) };
  }

  // Testa admin client (service role key)
  try {
    const admin = await createAdminClient();
    const { error } = await admin.from('contatos').select('id').limit(1);
    result.admin_select = {
      ok: !error,
      error: error?.message ?? null,
      code: error?.code ?? null,
    };
  } catch (err) {
    result.admin_select = { ok: false, error: String(err) };
  }

  // Testa insert de contato
  try {
    const admin = await createAdminClient();
    const { error } = await admin.from('contatos').insert({
      nome: 'Diagnóstico',
      email: 'diagnostico@hivi.com.br',
      mensagem: 'Teste automático de diagnóstico',
      locale: 'pt-BR',
      consentimento_lgpd: true,
    });
    result.admin_insert = {
      ok: !error,
      error: error?.message ?? null,
      code: error?.code ?? null,
    };
    // Remove o registro de teste se inseriu
    if (!error) {
      await admin.from('contatos').delete().eq('email', 'diagnostico@hivi.com.br');
    }
  } catch (err) {
    result.admin_insert = { ok: false, error: String(err) };
  }

  return NextResponse.json(result, { status: 200 });
}
