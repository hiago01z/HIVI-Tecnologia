import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { checkRateLimit } from '@/lib/rateLimiter';
import { buildCorsHeaders, handlePreflight } from '@/lib/cors';
import { z } from 'zod';

const eventoSchema = z.object({
  tipo: z.enum(['page_view', 'click_contato', 'click_whatsapp', 'click_servico']),
  pagina: z.string().max(255).optional(),
  locale: z.string().max(10).optional(),
  metadados: z
    .record(
      z.string().max(50),
      z.union([z.string().max(200), z.number(), z.boolean()]),
    )
    .refine((obj) => Object.keys(obj).length <= 10, 'Máximo 10 campos')
    .optional(),
});

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
    const body = await request.json();
    const parsed = eventoSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Payload inválido' }, { status: 400, headers: corsHeaders });
    }

    const supabase = await createAdminClient();

    const { error } = await supabase.from('eventos').insert({
      tipo: parsed.data.tipo,
      pagina: parsed.data.pagina ?? '/',
      locale: parsed.data.locale ?? 'pt-BR',
      metadados: parsed.data.metadados ?? {},
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
