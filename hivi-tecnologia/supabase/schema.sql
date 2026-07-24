-- =============================================================
-- HIVI Tecnologia — Schema Supabase
-- Execute este arquivo no SQL Editor do Supabase
-- =============================================================

-- Extensão para geração de UUIDs (ativa por padrão no Supabase)
create extension if not exists "pgcrypto";

-- =============================================================
-- TABELA: blog_posts
-- Campos de texto são jsonb multilíngue: { "pt-BR": "...", "en": "...", "es": "..." }
-- =============================================================
create table if not exists public.blog_posts (
  id            uuid        primary key default gen_random_uuid(),
  titulo        jsonb       not null default '{}',
  slug          jsonb       not null default '{}',
  resumo        jsonb       not null default '{}',
  conteudo      jsonb       not null default '{}',
  imagem_url    text,
  publicado     boolean     not null default false,
  criado_em     timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

comment on table public.blog_posts is 'Posts do blog com conteúdo multilíngue (pt-BR, en, es)';
comment on column public.blog_posts.titulo     is 'Título por locale: {"pt-BR": "...", "en": "...", "es": "..."}';
comment on column public.blog_posts.slug       is 'Slug único por locale: {"pt-BR": "...", "en": "...", "es": "..."}';
comment on column public.blog_posts.resumo     is 'Resumo por locale';
comment on column public.blog_posts.conteudo   is 'Conteúdo HTML por locale';

-- =============================================================
-- TABELA: contatos (LGPD)
-- Sem IP nem dados de rastreamento — apenas dados fornecidos pelo usuário
-- =============================================================
create table if not exists public.contatos (
  id                  uuid        primary key default gen_random_uuid(),
  nome                text        not null,
  email               text        not null,
  telefone            text,
  mensagem            text        not null,
  locale              text        not null default 'pt-BR',
  consentimento_lgpd  boolean     not null,
  criado_em           timestamptz not null default now()
);

comment on table public.contatos is 'Formulários de contato com consentimento LGPD explícito';
comment on column public.contatos.consentimento_lgpd is 'Consentimento obrigatório — nunca inserir false';

-- =============================================================
-- TABELA: eventos (Analytics LGPD-compliant)
-- Sem IP, cookies, user-agent ou qualquer dado pessoal
-- =============================================================
create table if not exists public.eventos (
  id          uuid        primary key default gen_random_uuid(),
  tipo        text        not null,
  pagina      text        not null default '/',
  locale      text        not null default 'pt-BR',
  metadados   jsonb       not null default '{}',
  criado_em   timestamptz not null default now(),

  constraint eventos_tipo_check
    check (tipo in ('page_view', 'click_contato', 'click_whatsapp', 'click_servico'))
);

comment on table public.eventos is 'Analytics de eventos — sem dados pessoais (LGPD, Regra 6)';
comment on column public.eventos.metadados is 'Metadados extras sem PII. Ex: {"servico": "consultoria"}';

-- =============================================================
-- TRIGGER: atualiza atualizado_em automaticamente em blog_posts
-- =============================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$;

drop trigger if exists trg_blog_posts_updated_at on public.blog_posts;
create trigger trg_blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- =============================================================
-- INDEXES — performance de consultas frequentes
-- =============================================================
create index if not exists idx_blog_posts_publicado_em
  on public.blog_posts (publicado, criado_em desc);

create index if not exists idx_blog_posts_slug
  on public.blog_posts using gin (slug);

create index if not exists idx_eventos_tipo
  on public.eventos (tipo);

create index if not exists idx_eventos_criado_em
  on public.eventos (criado_em desc);

create index if not exists idx_contatos_criado_em
  on public.contatos (criado_em desc);

-- =============================================================
-- ROW LEVEL SECURITY
-- =============================================================

-- Habilitar RLS em todas as tabelas (Regra 8)
alter table public.blog_posts enable row level security;
alter table public.contatos   enable row level security;
alter table public.eventos    enable row level security;

-- -----------------------
-- blog_posts
-- -----------------------
-- Qualquer visitante pode ler posts publicados (anon key)
create policy "blog_posts_leitura_publica"
  on public.blog_posts
  for select
  to anon, authenticated
  using (publicado = true);

-- Escrita exclusiva via service_role (admin client — bypassa RLS automaticamente)
-- Não é necessário policy de escrita para anon/authenticated

-- -----------------------
-- contatos
-- -----------------------
-- Sem policy para anon: inserção ocorre via API com service_role (bypassa RLS)
-- Leitura e escrita exclusivas para service_role (admin)

-- -----------------------
-- eventos
-- -----------------------
-- Inserção permitida para anon (analytics — API usa service_role, mas RLS define intenção)
create policy "eventos_insercao_anon"
  on public.eventos
  for insert
  to anon, authenticated
  with check (
    tipo in ('page_view', 'click_contato', 'click_whatsapp', 'click_servico')
  );

-- Leitura exclusiva para service_role (dashboard admin)

-- =============================================================
-- VERIFICAÇÃO FINAL — confirma que as tabelas foram criadas
-- =============================================================
do $$
begin
  assert (select count(*) from information_schema.tables
          where table_schema = 'public'
          and table_name in ('blog_posts', 'contatos', 'eventos')) = 3,
         'Erro: nem todas as tabelas foram criadas';
  raise notice 'Schema HIVI Tecnologia criado com sucesso!';
end;
$$;
