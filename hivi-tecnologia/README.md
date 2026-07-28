# HIVI Tecnologia — Site Institucional

Site institucional multilíngue da HIVI Tecnologia, com blog, painel administrativo e analytics LGPD-compliant.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS v4 |
| Internacionalização | next-intl 4 (pt-BR, en, es) |
| Banco de dados | Supabase (PostgreSQL + Storage + Auth) |
| Formulários | react-hook-form + Zod |
| Deploy | Vercel |

---

## Pré-requisitos

- Node.js 20+
- Conta no [Supabase](https://supabase.com)
- (Opcional) Conta no [Vercel](https://vercel.com) para deploy

---

## Configuração local

### 1. Clonar e instalar dependências

```bash
git clone <repo-url>
cd hivi-tecnologia
npm install
```

### 2. Variáveis de ambiente

Copie o arquivo de exemplo e preencha com seus valores:

```bash
cp .env.example .env.local
```

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave pública (anon) do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave secreta service_role — **nunca expor ao cliente** |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (ex: `https://hivi.com.br`) |
| `NEXT_PUBLIC_TELEFONE` | Telefone de contato |
| `NEXT_PUBLIC_WHATSAPP` | Número WhatsApp sem formatação (ex: `5511999999999`) |
| `NEXT_PUBLIC_EMAIL_CONTATO` | E-mail de contato |
| `NEXT_PUBLIC_INSTAGRAM` | URL do Instagram (opcional) |
| `NEXT_PUBLIC_LINKEDIN` | URL do LinkedIn (opcional) |
| `NEXT_PUBLIC_FACEBOOK` | URL do Facebook (opcional) |
| `NEXT_PUBLIC_YOUTUBE` | URL do YouTube (opcional) |

### 3. Banco de dados (Supabase)

Execute o schema completo no **SQL Editor** do Supabase:

```
supabase/schema.sql
```

Este arquivo cria todas as tabelas (`blog_posts`, `profiles`, `contatos`, `eventos`), índices, triggers, políticas RLS e o bucket de Storage `avatars` de uma só vez.

> Se o banco já existir com versões anteriores do schema, use os arquivos em `supabase/migrations/` para aplicar apenas as diferenças incrementais.

### 4. Criar usuário administrador

No Supabase Dashboard → **Authentication → Users** → **Invite user**, crie o usuário que terá acesso ao painel `/admin`.

### 5. Rodar o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Painel Administrativo

O painel está disponível em `/{locale}/admin` (ex: `/pt-BR/admin`).

> O endereço do painel **não é linkado em nenhuma parte do site público** por segurança.

| Seção | Descrição |
|---|---|
| **Dashboard** | Métricas de eventos (page views, cliques) e total de contatos |
| **Posts** | Criar, editar, publicar e excluir artigos do blog |
| **Contatos** | Visualizar e excluir mensagens recebidas pelo formulário |
| **Perfil** | Editar nome e foto do administrador (exibidos nos artigos) |

---

## Arquitetura

### Middleware (`src/proxy.ts`)

O arquivo `src/proxy.ts` exporta `proxy` e `config` — é o middleware do Next.js 16, que substitui o `middleware.ts` padrão. Responsável por:

- Detecção automática de locale por cookie → IP geolocation → `accept-language`
- Redirecionamento de rotas sem prefixo de locale
- Proteção das rotas `/admin/*` verificando cookies de sessão Supabase
- Adição de headers de segurança em todas as respostas

### Banco de dados multilíngue

Os campos `titulo`, `slug`, `resumo` e `conteudo` de `blog_posts` são colunas `jsonb` com chaves por locale:

```json
{ "pt-BR": "Conteúdo em português", "en": "English content", "es": "Contenido en español" }
```

Isso elimina a necessidade de tabelas separadas por idioma.

### Autenticação

- **Usuários públicos** usam `createClient()` (anon key + RLS do Supabase)
- **Operações administrativas** usam `createAdminClient()` (service_role key, bypassa RLS)
- O `createAdminClient()` retorna cookies vazios intencionalmente para impedir que o JWT do usuário sobreponha a service_role key

### Analytics LGPD-compliant

A tabela `eventos` registra apenas: tipo de evento, URL da página e locale. Nenhum IP, cookie ou dado pessoal é armazenado.

---

## Internacionalização

- Locales suportados: `pt-BR` (padrão), `en`, `es`
- Arquivos de tradução: `messages/{locale}.json`
- Detecção automática por: cookie `NEXT_LOCALE` → header `x-vercel-ip-country` → `accept-language`
- Troca de idioma salva o locale escolhido no cookie `NEXT_LOCALE`

---

## Segurança

- Rate limiting no login: 5 tentativas/min por IP, bloqueio de 15 min
- Rate limiting no formulário de contato: mesmo padrão
- RLS habilitado em todas as tabelas do Supabase
- `SUPABASE_SERVICE_ROLE_KEY` nunca exposto ao cliente
- Headers HTTP: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy`
- Consentimento LGPD explícito no formulário de contato
- Painel admin não referenciado em nenhuma rota pública, sitemap ou meta tag

> **Nota**: O rate limiter usa um `Map` em memória (in-process). Em produção no Vercel (funções serverless), o estado não persiste entre instâncias. Para produção de alta escala, substitua por Redis (ex: Upstash).

---

## Deploy (Vercel)

1. Conecte o repositório no Vercel
2. Adicione todas as variáveis de ambiente listadas acima nas configurações do projeto
3. O build roda automaticamente com `next build`

---

## Estrutura de diretórios

```
src/
├── app/
│   ├── api/                  # Route Handlers (contato, eventos, admin)
│   └── [locale]/
│       ├── (site)/           # Páginas públicas (home, blog, serviços, sobre)
│       └── admin/            # Painel administrativo (protegido)
├── components/
│   ├── admin/                # Componentes do painel admin
│   ├── layout/               # Header, Footer, navegação
│   ├── sections/             # Seções da home e páginas internas
│   └── ui/                   # Componentes reutilizáveis
├── lib/
│   ├── blog.ts               # Funções de acesso aos posts
│   ├── rateLimiter.ts        # Rate limiting in-memory
│   ├── analytics.ts          # Helper para disparar eventos
│   └── supabase/             # Clientes Supabase (server + client)
├── types/                    # Tipos TypeScript
├── constants/                # Navegação, serviços, clientes
├── i18n/                     # Configuração next-intl
└── proxy.ts                  # Middleware (locale, auth, segurança)

messages/                     # Traduções (pt-BR.json, en.json, es.json)
supabase/
├── schema.sql                # Schema completo (banco zerado)
└── migrations/               # Migrações incrementais
```
