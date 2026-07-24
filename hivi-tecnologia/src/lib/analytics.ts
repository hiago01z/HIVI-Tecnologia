import type { EventoPayload } from '@/types/contato';

export async function fireEvent(
  payload: EventoPayload,
): Promise<void> {
  try {
    await fetch('/api/eventos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Analytics is best-effort — never block UI on failure
  }
}
