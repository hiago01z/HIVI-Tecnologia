import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import type { ContatoPayload } from '@/types/contato';
import { checkRateLimit } from '@/lib/rateLimiter';
import { z } from 'zod';

const contatoSchema = z.object({
  nome: z.string().min(2).max(120),
  email: z.string().email().max(255),
  telefone: z.string().max(30).optional(),
  mensagem: z.string().min(10).max(2000),
  locale: z.string().max(10),
  consentimento_lgpd: z.literal(true),
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1';
    const { allowed } = checkRateLimit(`contato:${ip}`);
    if (!allowed) {
      return NextResponse.json({ error: 'Muitas tentativas. Tente mais tarde.' }, { status: 429 });
    }

    const body: ContatoPayload = await request.json();

    const parsed = contatoSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 422 });
    }

    const supabase = await createAdminClient();

    const { error } = await supabase.from('contatos').insert({
      nome: parsed.data.nome,
      email: parsed.data.email,
      telefone: parsed.data.telefone ?? null,
      mensagem: parsed.data.mensagem,
      locale: parsed.data.locale,
      consentimento_lgpd: parsed.data.consentimento_lgpd,
    });

    if (error) {
      console.error('[/api/contato] supabase insert error:', error.message, error.code);
      return NextResponse.json({ error: 'Erro ao salvar', detail: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
