-- =============================================================
-- HIVI Tecnologia — Schema Supabase (completo, estado atual)
-- Execute no SQL Editor do Supabase em um banco vazio.
-- Se já executou versões anteriores, use os arquivos em
-- supabase/migrations/ para aplicar apenas as diferenças.
-- =============================================================

create extension if not exists "pgcrypto";

-- =============================================================
-- TABELA: blog_posts
-- Campos de texto são jsonb multilíngue: {"pt-BR":"...","en":"...","es":"..."}
-- =============================================================
create table if not exists public.blog_posts (
  id            uuid        primary key default gen_random_uuid(),
  titulo        jsonb       not null default '{}',
  slug          jsonb       not null default '{}',
  resumo        jsonb       not null default '{}',
  conteudo      jsonb       not null default '{}',
  imagem_url    text,
  publicado     boolean     not null default false,
  autor_id      uuid,
  criado_em     timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

comment on table  public.blog_posts          is 'Posts do blog com conteúdo multilíngue (pt-BR, en, es)';
comment on column public.blog_posts.titulo   is 'Título por locale: {"pt-BR": "...", "en": "...", "es": "..."}';
comment on column public.blog_posts.slug     is 'Slug único por locale';
comment on column public.blog_posts.resumo   is 'Resumo por locale';
comment on column public.blog_posts.conteudo is 'Conteúdo HTML por locale';
comment on column public.blog_posts.autor_id is 'FK para profiles(id) — autor do post';

-- =============================================================
-- TABELA: profiles
-- Perfil dos usuários administradores (nome de exibição e avatar)
-- =============================================================
create table if not exists public.profiles (
  id            uuid        primary key references auth.users(id) on delete cascade,
  nome          text        not null default '',
  foto_url      text,
  criado_em     timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

comment on table public.profiles is 'Perfis dos administradores — exibidos como autor nos posts do blog';

-- FK de blog_posts → profiles (adicionada após a criação de ambas as tabelas)
do $$
begin
  if not exists (
    select 1 from information_schema.table_constraints
    where constraint_name = 'blog_posts_autor_id_fkey'
  ) then
    alter table public.blog_posts
      add constraint blog_posts_autor_id_fkey
      foreign key (autor_id) references public.profiles(id);
  end if;
end
$$;

-- =============================================================
-- TABELA: contatos (LGPD)
-- Sem IP nem dados de rastreamento — apenas dados fornecidos pelo usuário
-- =============================================================
create table if not exists public.contatos (
  id                 uuid        primary key default gen_random_uuid(),
  nome               text        not null,
  email              text        not null,
  telefone           text,
  mensagem           text        not null,
  locale             text        not null default 'pt-BR',
  consentimento_lgpd boolean     not null,
  criado_em          timestamptz not null default now()
);

comment on table  public.contatos                    is 'Formulários de contato com consentimento LGPD explícito';
comment on column public.contatos.consentimento_lgpd is 'Consentimento obrigatório — nunca inserir false';

-- =============================================================
-- TABELA: eventos (Analytics LGPD-compliant)
-- Sem IP, cookies, user-agent ou qualquer dado pessoal
-- =============================================================
create table if not exists public.eventos (
  id        uuid        primary key default gen_random_uuid(),
  tipo      text        not null,
  pagina    text        not null default '/',
  locale    text        not null default 'pt-BR',
  metadados jsonb       not null default '{}',
  criado_em timestamptz not null default now(),

  constraint eventos_tipo_check
    check (tipo in ('page_view', 'click_contato', 'click_whatsapp', 'click_servico'))
);

comment on table  public.eventos          is 'Analytics de eventos — sem dados pessoais (LGPD)';
comment on column public.eventos.metadados is 'Metadados extras sem PII. Ex: {"servico": "consultoria"}';

-- =============================================================
-- TRIGGER: atualiza atualizado_em automaticamente
-- =============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
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
-- INDEXES
-- =============================================================
create index if not exists idx_blog_posts_publicado_em on public.blog_posts (publicado, criado_em desc);
create index if not exists idx_blog_posts_slug         on public.blog_posts using gin (slug);
create index if not exists idx_blog_posts_autor        on public.blog_posts (autor_id);
create index if not exists idx_eventos_tipo            on public.eventos (tipo);
create index if not exists idx_eventos_criado_em       on public.eventos (criado_em desc);
create index if not exists idx_contatos_criado_em      on public.contatos (criado_em desc);

-- =============================================================
-- ROW LEVEL SECURITY
-- =============================================================
alter table public.blog_posts enable row level security;
alter table public.profiles   enable row level security;
alter table public.contatos   enable row level security;
alter table public.eventos    enable row level security;

-- blog_posts: leitura pública de posts publicados
create policy "blog_posts_leitura_publica"
  on public.blog_posts for select
  to anon, authenticated
  using (publicado = true);

-- profiles: leitura pública (necessário para exibir autor nos posts)
create policy "profiles_public_select"
  on public.profiles for select
  using (true);

-- profiles: cada usuário gerencia apenas o próprio perfil
create policy "profiles_own_update"
  on public.profiles for update to authenticated
  using (auth.uid() = id) with check (auth.uid() = id);

create policy "profiles_own_insert"
  on public.profiles for insert to authenticated
  with check (auth.uid() = id);

-- eventos: inserção permitida para visitantes (analytics)
create policy "eventos_insercao_anon"
  on public.eventos for insert
  to anon, authenticated
  with check (tipo in ('page_view', 'click_contato', 'click_whatsapp', 'click_servico'));

-- =============================================================
-- STORAGE: bucket avatars (fotos de perfil dos administradores)
-- =============================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars', 'avatars', true, 2097152,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

create policy "avatars_public_read" on storage.objects
  for select using (bucket_id = 'avatars');

create policy "avatars_auth_upload" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "avatars_auth_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "avatars_auth_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- =============================================================
-- VERIFICAÇÃO FINAL
-- =============================================================
do $$
begin
  assert (
    select count(*) from information_schema.tables
    where table_schema = 'public'
    and table_name in ('blog_posts', 'contatos', 'eventos', 'profiles')
  ) = 4, 'Erro: nem todas as tabelas foram criadas';
  raise notice 'Schema HIVI Tecnologia criado com sucesso!';
end;
$$;
