import type { Locale } from '@/i18n/routing';

export type LocalizedText = Record<Locale, string>;

export interface PostAutor {
  nome: string;
  foto_url: string | null;
}

export interface BlogPost {
  id: string;
  titulo: LocalizedText;
  slug: LocalizedText;
  resumo: LocalizedText;
  conteudo: LocalizedText;
  imagem_url: string | null;
  publicado: boolean;
  criado_em: string;
  atualizado_em: string;
  autor_id: string | null;
  autor?: PostAutor | null;
}

export interface BlogPostPreview {
  id: string;
  titulo: string;
  slug: string;
  resumo: string;
  imagem_url: string | null;
  publicado: boolean;
  criado_em: string;
  autor?: PostAutor | null;
}
