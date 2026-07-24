import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import type { EventoPayload } from '@/types/contato';

export async function POST(request: NextRequest) {
  try {
    const body: EventoPayload = await request.json();

    const allowedTypes = ['page_view', 'click_contato', 'click_whatsapp', 'click_servico'];
    if (!allowedTypes.includes(body.tipo)) {
      return NextResponse.json({ error: 'Tipo inválido' }, { status: 400 });
    }

    const supabase = await createAdminClient();

    const { error } = await supabase.from('eventos').insert({
      tipo: body.tipo,
      pagina: body.pagina?.slice(0, 255) ?? '/',
      locale: body.locale?.slice(0, 10) ?? 'pt-BR',
      metadados: body.metadados ?? {},
    });

    if (error) {
      return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
