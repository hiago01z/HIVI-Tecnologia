import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { buildCorsHeaders, handlePreflight, NO_CACHE } from '@/lib/cors';
import { z } from 'zod';

const updateSchema = z.object({
  nome: z.string().min(1).max(120),
  foto_url: z.string().url().max(2048).startsWith('https://').nullable().optional(),
});

export async function OPTIONS(request: NextRequest) {
  return handlePreflight(request.headers.get('origin'));
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin');
  const corsHeaders = buildCorsHeaders(origin);

  try {
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401, headers: corsHeaders });
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('id, nome, foto_url')
      .eq('id', authData.user.id)
      .maybeSingle();

    if (error) {
      console.error('[/api/admin/profile] GET error:', error.code);
      return NextResponse.json({ error: 'Erro interno' }, { status: 500, headers: corsHeaders });
    }

    return NextResponse.json(data ?? { id: authData.user.id, nome: '', foto_url: null }, { headers: { ...corsHeaders, ...NO_CACHE } });
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500, headers: corsHeaders });
  }
}

export async function PATCH(request: NextRequest) {
  const origin = request.headers.get('origin');
  const corsHeaders = buildCorsHeaders(origin);

  try {
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401, headers: corsHeaders });
    }

    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 422, headers: corsHeaders });
    }

    const { nome, foto_url } = parsed.data;

    const { error } = await supabase
      .from('profiles')
      .upsert(
        { id: authData.user.id, nome, foto_url: foto_url ?? null, atualizado_em: new Date().toISOString() },
        { onConflict: 'id' },
      );

    if (error) {
      console.error('[/api/admin/profile] PATCH error:', error.code);
      return NextResponse.json({ error: 'Erro ao salvar perfil.' }, { status: 500, headers: corsHeaders });
    }

    return NextResponse.json({ ok: true }, { headers: { ...corsHeaders, ...NO_CACHE } });
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500, headers: corsHeaders });
  }
}
