import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { checkRateLimit } from '@/lib/rateLimiter';
import { buildCorsHeaders, handlePreflight } from '@/lib/cors';
import type { EventoPayload } from '@/types/contato';

export async function OPTIONS(request: NextRequest) {
  return handlePreflight(request.headers.get('origin'));
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const corsHeaders = buildCorsHeaders(origin);

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1';
  const { allowed, retryAfter } = checkRateLimit(`eventos:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: 'Muitas requisições.' }, {
      status: 429,
      headers: { ...corsHeaders, 'Retry-After': String(retryAfter ?? 60) },
    });
  }

  try {
    const body: EventoPayload = await request.json();

    const allowedTypes = ['page_view', 'click_contato', 'click_whatsapp', 'click_servico'];
    if (!allowedTypes.includes(body.tipo)) {
      return NextResponse.json({ error: 'Tipo inválido' }, { status: 400, headers: corsHeaders });
    }

    const supabase = await createAdminClient();

    const { error } = await supabase.from('eventos').insert({
      tipo: body.tipo,
      pagina: body.pagina?.slice(0, 255) ?? '/',
      locale: body.locale?.slice(0, 10) ?? 'pt-BR',
      metadados: body.metadados ?? {},
    });

    if (error) {
      console.error('[/api/eventos] insert error:', error.code);
      return NextResponse.json({ error: 'Erro interno' }, { status: 500, headers: corsHeaders });
    }

    return NextResponse.json({ ok: true }, { headers: corsHeaders });
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500, headers: corsHeaders });
  }
}
