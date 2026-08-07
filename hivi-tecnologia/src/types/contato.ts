export interface ContatoPayload {
  nome: string;
  email: string;
  telefone?: string;
  mensagem: string;
  locale: string;
  consentimento_lgpd: true;
}

export interface EventoPayload {
  tipo: 'page_view' | 'click_contato' | 'click_whatsapp' | 'click_servico';
  pagina: string;
  locale: string;
  metadados?: Record<string, string | number | boolean>;
}
