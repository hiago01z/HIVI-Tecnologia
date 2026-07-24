# Estrutura do Projeto — HIVI Tecnologia

---

## 1. Visão Geral da Arquitetura

O projeto é um monorepo com duas camadas principais:

```
hiago01z/HIVI-Tecnologia/
│
├── contextos/                         # Documentação viva do projeto
│   ├── projeto.md
│   ├── regras.md
│   ├── designe.md
│   ├── estrutura.md
│   └── diario.md
│
├── hivi-tecnologia/                   # Aplicação Web (Next.js)
│   ├── public/
│   │   └── images/ icons/ favicon.ico
│   │
│   ├── src/
│   │   ├── app/
│   │   │   │
│   │   │   ├── (site)/                # Route group — site público
│   │   │   │   ├── layout.tsx         # Layout com Header + Footer
│   │   │   │   ├── page.tsx           # / — Home
│   │   │   │   ├── servicos/page.tsx  # /servicos
│   │   │   │   ├── sobre/page.tsx     # /sobre
│   │   │   │   ├── privacidade/page.tsx
│   │   │   │   └── blog/
│   │   │   │       ├── page.tsx       # /blog
│   │   │   │       └── [slug]/page.tsx # /blog/[slug]
│   │   │   │
│   │   │   ├── admin/                 # Route group — painel privado
│   │   │   │   ├── layout.tsx         # Layout do admin (verifica sessão)
│   │   │   │   ├── page.tsx           # /admin — Tela de login
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx       # /admin/dashboard
│   │   │   │   └── posts/
│   │   │   │       ├── page.tsx       # /admin/posts
│   │   │   │       ├── novo/page.tsx  # /admin/posts/novo
│   │   │   │       └── [id]/page.tsx  # /admin/posts/[id]
│   │   │   │
│   │   │   ├── api/
│   │   │   │   ├── contato/route.ts   # POST /api/contato
│   │   │   │   └── eventos/route.ts   # POST /api/eventos (analytics)
│   │   │   │
│   │   │   ├── layout.tsx             # Layout raiz
│   │   │   └── globals.css
│   │   │
│   │   ├── components/
│   │   │   ├── ui/                    # Button, Card, Input, Badge...
│   │   │   ├── layout/                # Header, Footer, Navigation
│   │   │   ├── sections/              # Hero, Services, Stats, CTA...
│   │   │   ├── blog/                  # PostCard, PostList, PostContent
│   │   │   └── admin/                 # Sidebar, StatCard, PostEditor...
│   │   │
│   │   ├── lib/
│   │   │   ├── supabase/
│   │   │   │   ├── client.ts          # Browser client
│   │   │   │   └── server.ts          # Server client (SSR)
│   │   │   └── utils.ts
│   │   │
│   │   ├── middleware.ts              # Proteção de rotas /admin/*
│   │   ├── types/
│   │   │   ├── blog.ts
│   │   │   └── contato.ts
│   │   └── constants/
│   │       ├── services.ts
│   │       └── navigation.ts
│   │
│   ├── .env.local                     # NÃO versionar
│   ├── .env.example
│   ├── .gitignore
│   ├── middleware.ts                  # Intercepta requisições a /admin/*
│   ├── next.config.ts
│   ├── eslint.config.mjs
│   ├── postcss.config.mjs
│   ├── tsconfig.json
│   └── package.json
│
└── README.md
```

> **Nota:** A pasta da aplicação é `hivi-tecnologia/` (kebab-case) pois o npm não aceita letras maiúsculas em nomes de pacote.

---

## 2. Stack Tecnológica

| Camada | Tecnologia | Versão | Função |
|--------|-----------|--------|--------|
| Framework | Next.js | 15+ (App Router) | SSR/SSG/ISR, API Routes, Middleware |
| Linguagem | TypeScript | 5+ | Tipagem estática |
| Estilização | Tailwind CSS | 4+ | Utility-first |
| Backend/DB | Supabase | latest | PostgreSQL, Auth, Storage |
| Autenticação | Supabase Auth | latest | E-mail + senha, sessão server-side |
| Hospedagem | Vercel | — | CI/CD via Git |
| Ícones | Lucide React | latest | Ícones SVG |
| Formulários | React Hook Form + Zod | latest | Validação client + server |

**Inicializado com:** `create-next-app@latest` (TypeScript + Tailwind + ESLint + App Router + src/)

---

## 3. Rotas da Aplicação

### Site Público

| Rota | Método | Descrição | Status |
|------|--------|-----------|--------|
| `/` | GET | Home institucional | Na Fila |
| `/servicos` | GET | Listagem de serviços | Na Fila |
| `/sobre` | GET | Sobre a empresa | Na Fila |
| `/blog` | GET | Listagem de posts | Na Fila |
| `/blog/[slug]` | GET | Post individual | Na Fila |
| `/privacidade` | GET | Política de Privacidade | Na Fila |
| `/api/contato` | POST | Envio de formulário | Na Fila |
| `/api/eventos` | POST | Registro de eventos de analytics | Na Fila |

### Painel Administrativo (Autenticado)

| Rota | Método | Descrição | Proteção | Status |
|------|--------|-----------|----------|--------|
| `/admin` | GET | Tela de login | Pública (redireciona se autenticado) | Na Fila |
| `/admin/dashboard` | GET | Dashboard de métricas | Middleware Auth | Na Fila |
| `/admin/posts` | GET | Listagem de posts | Middleware Auth | Na Fila |
| `/admin/posts/novo` | GET | Criar novo post | Middleware Auth | Na Fila |
| `/admin/posts/[id]` | GET | Editar post existente | Middleware Auth | Na Fila |

> **Visibilidade:** A rota `/admin` não possui link, botão ou menção em nenhuma parte do site público. Acesso exclusivamente por URL digitada manualmente.

---

## 4. Banco de Dados — Supabase

### Tabela `posts` (Blog)

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | uuid | PK, gen random | Identificador único |
| `titulo` | text | NOT NULL | Título do post |
| `slug` | text | UNIQUE, NOT NULL | URL amigável |
| `resumo` | text | — | Descrição curta |
| `conteudo` | text | NOT NULL | Corpo do post |
| `imagem_url` | text | — | Capa do post |
| `publicado` | boolean | default false | Visibilidade pública |
| `criado_em` | timestamptz | default now() | Data de criação |
| `atualizado_em` | timestamptz | default now() | Última atualização |

**RLS:** Leitura pública apenas para `publicado = true`. Escrita restrita a usuários autenticados com `role = 'admin'`.

### Tabela `contatos` (Formulário — LGPD)

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | uuid | PK, gen random | Identificador único |
| `nome` | text | NOT NULL | Nome |
| `email` | text | NOT NULL | E-mail |
| `telefone` | text | — | Telefone (opcional) |
| `mensagem` | text | NOT NULL | Mensagem |
| `consentimento_lgpd` | boolean | NOT NULL | Aceite da LGPD |
| `criado_em` | timestamptz | default now() | Data de envio |

**RLS:** Inserção pública (via API Route server-side). Leitura restrita a admin.

### Tabela `eventos` (Analytics)

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | uuid | PK, gen random | Identificador único |
| `tipo` | text | NOT NULL | Tipo do evento: `page_view`, `click_contato`, `click_whatsapp`, `click_servico` |
| `pagina` | text | — | Rota da página onde ocorreu |
| `metadados` | jsonb | — | Dados adicionais (ex.: nome do serviço clicado) |
| `criado_em` | timestamptz | default now() | Data e hora do evento |

**RLS:** Inserção pública (anônima, sem dados pessoais). Leitura restrita a admin.

> **Privacidade:** A tabela `eventos` **não armazena IP, cookies de identificação ou qualquer dado pessoal**, garantindo conformidade com a LGPD.

---

## 5. Arquitetura de Autenticação do Admin

```
Navegador                Next.js Middleware            Supabase Auth
   │                          │                           │
   ├── GET /admin/dashboard ─→ │                           │
   │                          ├── verifica cookie ──────→ │
   │                          │  de sessão (JWT)          │
   │                          │ ── válido ────────────── │
   │ ── 200 + página ────────── │                           │
   │                          │ ── inválido ─────────── │
   │ ── redirect /admin ────── │                           │
```

**Fluxo de login:**
1. Usuário acessa `/admin` e preenche e-mail + senha
2. Requisição Server Action chama `supabase.auth.signInWithPassword()`
3. Supabase valida e retorna token JWT
4. Token é armazenado em cookie `HttpOnly; Secure; SameSite=Strict`
5. Middleware Next.js valida o cookie em cada requisição a `/admin/*`
6. Se inválido ou expirado: redirect para `/admin`

---

## 6. Diagrama Visual das Páginas

```
┌────────────────────────────────────────────────────────┐
│                     SITE PÚBLICO                       │
│   Header | Home | Serviços | Sobre | Blog | Footer     │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│               PAINEL ADMIN (PRIVADO)                   │
│                                                        │
│  /admin           → Tela de Login                      │
│  /admin/dashboard → [Sidebar] Métricas / Cards de stat  │
│  /admin/posts     → [Sidebar] Listagem de posts         │
│  /admin/posts/novo→ [Sidebar] Editor (criar)            │
│  /admin/posts/[id]→ [Sidebar] Editor (editar)           │
│                                                        │
│  Acesso: URL digitada manualmente. Sem links no site.  │
└────────────────────────────────────────────────────────┘
```

---

## 7. Variáveis de Ambiente

```env
# hivi-tecnologia/.env.example

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
SUPABASE_SERVICE_ROLE_KEY=xxxx

# Site
NEXT_PUBLIC_SITE_URL=https://hivi.com.br

# Contato
NEXT_PUBLIC_TELEFONE=+55 (XX) XXXX-XXXX
NEXT_PUBLIC_WHATSAPP=5500000000000
NEXT_PUBLIC_EMAIL_CONTATO=contato@hivi.com.br

# Redes Sociais
NEXT_PUBLIC_INSTAGRAM=https://instagram.com/hivi
NEXT_PUBLIC_LINKEDIN=https://linkedin.com/company/hivi
NEXT_PUBLIC_FACEBOOK=https://facebook.com/hivi
NEXT_PUBLIC_YOUTUBE=https://youtube.com/@hivi
```

> O `.env.local` nunca deve ser versionado. As variáveis de produção são configuradas no painel da Vercel.

---

## 8. Convenções de Nomenclatura

| Elemento | Convenção | Exemplo |
|----------|----------|---------|
| Componentes | PascalCase | `HeroSection.tsx`, `PostEditor.tsx` |
| Hooks | camelCase + `use` | `useSession.ts` |
| Utilitários | camelCase | `slugify.ts` |
| Tipos | camelCase | `blog.ts`, `eventos.ts` |
| Constantes | UPPER_SNAKE_CASE | `MAX_POSTS_PER_PAGE` |
| Pastas | kebab-case | `post-editor/` |

---

## 9. Políticas de Segurança

- `NEXT_PUBLIC_*` exposto ao cliente — apenas dados não sensíveis
- `SUPABASE_SERVICE_ROLE_KEY` exclusivamente em Server Components e API Routes
- RLS habilitado em todas as tabelas
- Middleware intercepta e valida sessão em toda rota `/admin/*`
- Cookies do admin: `HttpOnly; Secure; SameSite=Strict`
- Headers de segurança: `X-Frame-Options`, `X-Content-Type-Options`, `CSP` no `next.config.ts`
- Rate limiting na rota de login para prevenir ataques de força bruta
