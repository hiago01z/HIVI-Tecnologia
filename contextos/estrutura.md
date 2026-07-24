# Estrutura do Projeto — HIVI Tecnologia

---

## 1. Visão Geral da Arquitetura

O projeto é um monorepo com duas camadas principais:

```
hiago01z/HIVI-Tecnologia/
│
├── contextos/                             # Documentação viva do projeto
│   ├── projeto.md
│   ├── regras.md
│   ├── designe.md
│   ├── estrutura.md
│   └── diario.md
│
├── hivi-tecnologia/                       # Aplicação Web (Next.js)
│   ├── messages/                          # Traduções (i18n)
│   │   ├── pt-br.json                     # Português — PADRÃO
│   │   ├── en.json                        # Inglês
│   │   └── es.json                        # Espanhol
│   │
│   ├── public/
│   │   └── images/ icons/ favicon.ico
│   │
│   ├── src/
│   │   ├── i18n/
│   │   │   ├── request.ts                 # Configuração do next-intl (server)
│   │   │   └── routing.ts                 # Definição de locales e locale padrão
│   │   │
│   │   ├── app/
│   │   │   ├── [locale]/                  # Rota dinâmica de locale
│   │   │   │   ├── (site)/            # Route group — site público
│   │   │   │   │   ├── layout.tsx     # Layout com Header + Footer
│   │   │   │   │   ├── page.tsx       # / — Home
│   │   │   │   │   ├── servicos/
│   │   │   │   │   │   └── page.tsx   # /servicos
│   │   │   │   │   ├── sobre/
│   │   │   │   │   │   └── page.tsx   # /sobre
│   │   │   │   │   ├── privacidade/
│   │   │   │   │   │   └── page.tsx   # /privacidade
│   │   │   │   │   └── blog/
│   │   │   │   │       ├── page.tsx   # /blog
│   │   │   │   │       └── [slug]/
│   │   │   │   │           └── page.tsx # /blog/[slug]
│   │   │   │   │
│   │   │   │   ├── admin/             # Route group — painel privado
│   │   │   │   │   ├── layout.tsx     # Layout admin (verifica sessão)
│   │   │   │   │   ├── page.tsx       # /admin — Tela de login
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   │   └── page.tsx   # /admin/dashboard
│   │   │   │   │   └── posts/
│   │   │   │   │       ├── page.tsx   # /admin/posts
│   │   │   │   │       ├── novo/
│   │   │   │   │       │   └── page.tsx
│   │   │   │   │       └── [id]/
│   │   │   │   │           └── page.tsx
│   │   │   │   │
│   │   │   │   ├── layout.tsx         # Layout raiz com locale
│   │   │   │   └── not-found.tsx      # 404 traduzida
│   │   │   │
│   │   │   ├── api/               # API Routes (sem locale — internas)
│   │   │   │   ├── contato/route.ts
│   │   │   │   └── eventos/route.ts
│   │   │   │
│   │   │   ├── layout.tsx             # Layout HTML raiz
│   │   │   └── globals.css
│   │   │
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   └── LanguageSwitcher.tsx   # Botão de troca de idioma
│   │   │   ├── layout/            # Header, Footer, Navigation
│   │   │   ├── sections/          # Hero, Services, Stats, CTA...
│   │   │   ├── blog/
│   │   │   └── admin/
│   │   │
│   │   ├── middleware.ts              # i18n (locale) + auth (admin)
│   │   ├── lib/
│   │   │   ├── supabase/
│   │   │   │   ├── client.ts
│   │   │   │   └── server.ts
│   │   │   └── utils.ts
│   │   ├── types/
│   │   │   ├── blog.ts
│   │   │   └── contato.ts
│   │   └── constants/
│   │       ├── services.ts            # Chaves i18n dos serviços (não texto)
│   │       └── navigation.ts          # Chaves i18n da navegação
│   │
│   ├── .env.local
│   ├── .env.example
│   ├── .gitignore
│   ├── next.config.ts             # Inclui plugin do next-intl
│   ├── eslint.config.mjs
│   ├── postcss.config.mjs
│   ├── tsconfig.json
│   └── package.json
│
└── README.md
```

> **Nota:** A pasta da aplicação é `hivi-tecnologia/` (kebab-case — exigência do npm).

---

## 2. Stack Tecnológica

| Camada | Tecnologia | Versão | Função |
|--------|-----------|--------|--------|
| Framework | Next.js | 15+ (App Router) | SSR/SSG/ISR, Middleware, API Routes |
| Linguagem | TypeScript | 5+ | Tipagem estática |
| Estilização | Tailwind CSS | 4+ | Utility-first |
| i18n | next-intl | latest | Internalização (pt-BR, en, es) |
| Backend/DB | Supabase | latest | PostgreSQL, Auth, Storage |
| Autenticação | Supabase Auth | latest | E-mail + senha, server-side |
| Hospedagem | Vercel | — | CI/CD via Git + geolocalização |
| Ícones | Lucide React | latest | Ícones SVG |
| Formulários | React Hook Form + Zod | latest | Validação |

---

## 3. Internacionalização (i18n)

### Idiomas Suportados

| Locale | Idioma | Padrão |
|--------|--------|--------|
| `pt-BR` | Português (Brasil) | ✅ Sim |
| `en` | Inglês | — |
| `es` | Espanhol | — |

### Estrutura de Rotas com Locale

| URL | Locale | Página |
|-----|--------|--------|
| `/pt-br` | pt-BR | Home (português) |
| `/en` | en | Home (inglês) |
| `/es` | es | Home (espanhol) |
| `/pt-br/servicos` | pt-BR | Serviços |
| `/en/services` | en | Serviços |
| `/es/servicios` | es | Serviços |
| `/pt-br/admin` | pt-BR | Login Admin |

> **Nota:** Os slugs de rotas também são traduzidos via configuração do `next-intl` (`pathnames`).

### Detecção Automática de Locale

O `middleware.ts` detecta o locale do usuário pela seguinte ordem de prioridade:

1. **Preferência salva** — cookie `NEXT_LOCALE` (salvo ao trocar idioma manualmente)
2. **Geolocalização Vercel** — header `x-vercel-ip-country` (disponivel em produção na Vercel)
3. **Header do navegador** — `Accept-Language` (preferência configurada no browser)
4. **Fallback** — `pt-BR`

```
Requisição do usuário
       ↓
┌─────────────────────────────┐
│        middleware.ts         │
│                             │
│  1. Cookie NEXT_LOCALE?     │ → usa o locale salvo
│  2. x-vercel-ip-country?    │ → mapeia país → locale
│  3. Accept-Language?        │ → interpreta preferência
│  4. Fallback: pt-BR         │
└─────────────────────────────┘
       ↓
  Redirect para /{locale}/...
```

### Mapeamento País → Locale (geolocalização)

| Países | Locale |
|--------|--------|
| BR | `pt-BR` |
| US, GB, CA, AU e outros de língua inglesa | `en` |
| ES, MX, AR, CO, CL, PE e outros hispano-falantes | `es` |
| Outros | `pt-BR` (fallback) |

### Estrutura dos Arquivos de Tradução

```json
// messages/pt-br.json (exemplo de estrutura)
{
  "nav": {
    "home": "Início",
    "services": "Serviços",
    "about": "Sobre Nós",
    "blog": "Blog",
    "contact": "Entrar em Contato"
  },
  "hero": {
    "eyebrow": "Soluções Inteligentes para Negócios de Sucesso",
    "title": "Empresa de Consultoria em Tecnologia",
    "description": "Transformamos sua empresa com soluções tecnológicas estratégicas.",
    "cta_primary": "Entrar em Contato",
    "cta_secondary": "Conhecer Serviços"
  },
  "services": { ... },
  "about": { ... },
  "footer": { ... },
  "privacy": { ... },
  "contact_form": { ... },
  "blog": { ... }
}
```

### Componente LanguageSwitcher

- Localizado no **Header**, sempre visível
- Exibe o idioma atual e um dropdown com as opções: `PT | EN | ES`
- Ao selecionar: salva cookie `NEXT_LOCALE` e faz redirect para a mesma página no novo locale
- Design: botão discreto, sem chamar mais atenção que o CTA principal

---

## 4. Rotas da Aplicação

### Site Público (prefixo `/{locale}`)

| Rota (pt-BR) | Rota (en) | Descrição | Status |
|-------------|-----------|-----------|--------|
| `/pt-br` | `/en` | Home | Na Fila |
| `/pt-br/servicos` | `/en/services` | Serviços | Na Fila |
| `/pt-br/sobre` | `/en/about` | Sobre | Na Fila |
| `/pt-br/blog` | `/en/blog` | Blog | Na Fila |
| `/pt-br/blog/[slug]` | `/en/blog/[slug]` | Post | Na Fila |
| `/pt-br/privacidade` | `/en/privacy` | LGPD | Na Fila |

### Painel Admin

| Rota | Descrição | Proteção | Status |
|------|-----------|----------|--------|
| `/pt-br/admin` | Login | Pública | Na Fila |
| `/pt-br/admin/dashboard` | Dashboard | Middleware Auth | Na Fila |
| `/pt-br/admin/posts` | Posts | Middleware Auth | Na Fila |
| `/pt-br/admin/posts/novo` | Criar post | Middleware Auth | Na Fila |
| `/pt-br/admin/posts/[id]` | Editar post | Middleware Auth | Na Fila |

### API Routes (sem locale)

| Rota | Método | Descrição |
|------|--------|----------|
| `/api/contato` | POST | Envio de formulário |
| `/api/eventos` | POST | Analytics |

---

## 5. Banco de Dados — Supabase

### Tabela `posts`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | uuid | PK | Identificador |
| `titulo` | jsonb | NOT NULL | `{ "pt-BR": "...", "en": "...", "es": "..." }` |
| `slug` | jsonb | UNIQUE, NOT NULL | `{ "pt-BR": "...", "en": "...", "es": "..." }` |
| `resumo` | jsonb | — | Traduzido por locale |
| `conteudo` | jsonb | NOT NULL | Traduzido por locale |
| `imagem_url` | text | — | Única (sem tradução) |
| `publicado` | boolean | default false | Visibilidade |
| `criado_em` | timestamptz | default now() | — |
| `atualizado_em` | timestamptz | default now() | — |

> **i18n no banco:** Campos de texto do blog são armazenados como `jsonb` contendo um objeto com chaves de locale. O admin permite editar o conteúdo em cada idioma.

**RLS:** Leitura pública (`publicado = true`). Escrita restrita a `role = 'admin'`.

### Tabela `contatos` (LGPD)

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | uuid | PK | — |
| `nome` | text | NOT NULL | — |
| `email` | text | NOT NULL | — |
| `telefone` | text | — | — |
| `mensagem` | text | NOT NULL | — |
| `locale` | text | — | Idioma usado no envio |
| `consentimento_lgpd` | boolean | NOT NULL | — |
| `criado_em` | timestamptz | default now() | — |

### Tabela `eventos` (Analytics)

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | uuid | PK |
| `tipo` | text | `page_view`, `click_contato`, `click_whatsapp`, `click_servico` |
| `pagina` | text | Rota com locale |
| `locale` | text | Idioma ativo no momento do evento |
| `metadados` | jsonb | Dados adicionais (sem dados pessoais) |
| `criado_em` | timestamptz | — |

**RLS:** Inserção anônima. Leitura restrita a admin.

---

## 6. Arquitetura do Middleware (i18n + Auth)

```
Requisição
    ↓
┌─────────────────────────────────────┐
│           middleware.ts              │
│                                     │
│  ┌─────────────────────────────┐    │
│  │   i18n (next-intl)           │    │
│  │   Detecta locale             │    │
│  │   Redireciona para /{locale} │    │
│  └─────────────────────────────┘    │
│              ↓                      │
│  ┌─────────────────────────────┐    │
│  │   Auth (admin routes only)   │    │
│  │   Verifica cookie de sessão  │    │
│  │   Redireciona se inválido    │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
    ↓
  Página renderizada
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
NEXT_PUBLIC_DEFAULT_LOCALE=pt-BR

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

---

## 8. Convenções de Nomenclatura

| Elemento | Convenção | Exemplo |
|----------|----------|---------|
| Componentes | PascalCase | `HeroSection.tsx`, `LanguageSwitcher.tsx` |
| Hooks | camelCase + `use` | `useLocale.ts` |
| Utilitários | camelCase | `slugify.ts` |
| Tipos | camelCase | `blog.ts` |
| Constantes | UPPER_SNAKE_CASE | `SUPPORTED_LOCALES` |
| Chaves i18n | camelCase aninhado | `hero.title`, `nav.contact` |
| Arquivos de tradução | kebab-case | `pt-br.json`, `en.json`, `es.json` |

---

## 9. Políticas de Segurança

- `NEXT_PUBLIC_*` apenas dados não sensíveis
- `SUPABASE_SERVICE_ROLE_KEY` exclusivo a Server Components e API Routes
- RLS em todas as tabelas
- Middleware valida sessão em toda rota `/[locale]/admin/*`
- Cookies admin: `HttpOnly; Secure; SameSite=Strict`
- Headers: `X-Frame-Options`, `X-Content-Type-Options`, `CSP`, `Referrer-Policy`
- Rate limiting no login
- Rota `/admin` nunca linkada no site público
