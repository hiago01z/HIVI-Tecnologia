import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient, createClient } from '@/lib/supabase/server';
import { buildCorsHeaders, handlePreflight, NO_CACHE } from '@/lib/cors';

export async function OPTIONS(request: NextRequest) {
  return handlePreflight(request.headers.get('origin'));
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin');
  const corsHeaders = buildCorsHeaders(origin);

  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data?.user ?? null;
  } catch {
    user = null;
  }
  if (!user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401, headers: corsHeaders });
  }

  const since = request.nextUrl.searchParams.get('since');
  if (!since || isNaN(Date.parse(since))) {
    return NextResponse.json({ error: 'Parâmetro inválido' }, { status: 400, headers: corsHeaders });
  }

  try {
    const admin = await createAdminClient();
    const { data, error } = await admin
      .from('eventos')
      .select('tipo')
      .gte('criado_em', since);

    if (error) {
      console.error('[/api/admin/metrics] eventos error:', error.code);
      return NextResponse.json({ error: 'Erro interno' }, { status: 500, headers: corsHeaders });
    }

    const counts = {
      page_view: 0,
      click_contato: 0,
      click_whatsapp: 0,
      click_servico: 0,
    };

    (data ?? []).forEach(({ tipo }: { tipo: string }) => {
      if (tipo in counts) counts[tipo as keyof typeof counts]++;
    });

    const { count: totalContacts, error: contactError } = await admin
      .from('contatos')
      .select('*', { count: 'exact', head: true });

    if (contactError) {
      console.error('[/api/admin/metrics] contatos error:', contactError.code);
      return NextResponse.json({ error: 'Erro interno' }, { status: 500, headers: corsHeaders });
    }

    return NextResponse.json({ ...counts, totalContacts: totalContacts ?? 0 }, { headers: { ...corsHeaders, ...NO_CACHE } });
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500, headers: corsHeaders });
  }
}
