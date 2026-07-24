# Estrutura do Projeto — HIVI Tecnologia

---

## 1. Visão Geral da Arquitetura

O projeto é um monorepo com duas camadas principais:

```
hiago01z/HIVI-Tecnologia/
│
├── contextos/                     # Documentação viva do projeto
│   ├── projeto.md                 # Escopo, serviços e planejamento
│   ├── regras.md                  # Regras de desenvolvimento
│   ├── designe.md                 # Design system
│   ├── estrutura.md               # Este documento
│   └── diario.md                  # Registro de implementações
│
├── hivi-tecnologia/               # Aplicação Web (Next.js)
│   ├── public/                    # Assets públicos (servidos diretamente)
│   │   ├── images/                # Imagens estáticas
│   │   ├── icons/                 # Ícones SVG customizados
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── app/                   # Next.js App Router
│   │   │   ├── (site)/            # Route group — site público
│   │   │   │   ├── layout.tsx     # Layout do site (Header + Footer)
│   │   │   │   ├── page.tsx       # / — Página Home
│   │   │   │   ├── servicos/
│   │   │   │   │   └── page.tsx   # /servicos
│   │   │   │   ├── sobre/
│   │   │   │   │   └── page.tsx   # /sobre
│   │   │   │   ├── blog/
│   │   │   │   │   ├── page.tsx   # /blog
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx # /blog/[slug]
│   │   │   │   └── privacidade/
│   │   │   │       └── page.tsx   # /privacidade
│   │   │   │
│   │   │   ├── api/               # API Routes Next.js
│   │   │   │   └── contato/
│   │   │   │       └── route.ts   # POST /api/contato
│   │   │   │
│   │   │   ├── layout.tsx         # Layout raiz (HTML, metadata global)
│   │   │   └── globals.css        # Estilos globais + Tailwind imports
│   │   │
│   │   ├── components/            # Componentes React reutilizáveis
│   │   │   ├── ui/                # Componentes base (Button, Card, Input, Badge...)
│   │   │   ├── layout/            # Header, Footer, Navigation, MobileMenu
│   │   │   ├── sections/          # Seções de página (Hero, Services, CTA, About...)
│   │   │   └── blog/              # PostCard, PostList, PostContent
│   │   │
│   │   ├── lib/                   # Utilitários e integrações
│   │   │   ├── supabase/
│   │   │   │   ├── client.ts      # Cliente Supabase — uso no browser
│   │   │   │   └── server.ts      # Cliente Supabase — uso no servidor (SSR)
│   │   │   └── utils.ts           # Funções auxiliares gerais
│   │   │
│   │   ├── types/                 # Interfaces e tipos TypeScript
│   │   │   ├── blog.ts            # Post, Author, Category
│   │   │   └── contato.ts         # ContatoForm, ContatoPayload
│   │   │
│   │   └── constants/             # Dados e constantes estáticas
│   │       ├── services.ts        # Lista de serviços da empresa
│   │       └── navigation.ts      # Links da navegação
│   │
│   ├── .env.local                 # Variáveis de ambiente (NÃO versionar)
│   ├── .env.example               # Template de variáveis (versionar)
│   ├── .gitignore
│   ├── next.config.ts
│   ├── eslint.config.mjs
│   ├── postcss.config.mjs
│   ├── tailwind.config.ts         # Gerado automaticamente pelo preset
│   ├── tsconfig.json
│   └── package.json
│
└── README.md
```

> **Nota de nomenclatura:** A pasta da aplicação é `hivi-tecnologia/` (kebab-case) pois o npm não aceita letras maiúsculas em nomes de projeto.

---

## 2. Stack Tecnológica

| Camada | Tecnologia | Versão | Função |
|--------|-----------|--------|--------|
| Framework | Next.js | 15+ (App Router) | SSR/SSG/ISR, API Routes |
| Linguagem | TypeScript | 5+ | Tipagem estática em todo o projeto |
| Estilização | Tailwind CSS | 4+ | Utility-first, responsividade nativa |
| Backend/DB | Supabase | latest | PostgreSQL, Auth, Storage |
| Hospedagem | Vercel | — | CI/CD automático via Git |
| Ícones | Lucide React | latest | Biblioteca de ícones SVG |
| Formulários | React Hook Form | latest | Gerenciamento de estado de formulários |
| Validação | Zod | latest | Schema validation client + server |

**Inicializado com:** `create-next-app@latest` (preset padrão: TypeScript + Tailwind + ESLint + App Router + src/)

---

## 3. Rotas da Aplicação

| Rota | Método | Tipo | Descrição | Status |
|------|--------|------|-----------|--------|
| `/` | GET | Página | Home institucional | Na Fila |
| `/servicos` | GET | Página | Listagem de serviços | Na Fila |
| `/sobre` | GET | Página | Sobre a empresa | Na Fila |
| `/blog` | GET | Página | Listagem de posts | Na Fila |
| `/blog/[slug]` | GET | Página | Post individual | Na Fila |
| `/privacidade` | GET | Página | Política de Privacidade (LGPD) | Na Fila |
| `/api/contato` | POST | API | Envio de formulário de contato | Na Fila |

---

## 4. Banco de Dados — Supabase

### Tabela `posts` (Blog)

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | uuid | PK, default gen | Identificador único |
| `titulo` | text | NOT NULL | Título do post |
| `slug` | text | UNIQUE, NOT NULL | URL amigável |
| `resumo` | text | — | Descrição curta (SEO + listagem) |
| `conteudo` | text | NOT NULL | Corpo do post em Markdown |
| `imagem_url` | text | — | URL da imagem de capa |
| `publicado` | boolean | default false | Controla visibilidade pública |
| `criado_em` | timestamptz | default now() | Data de criação |
| `atualizado_em` | timestamptz | default now() | Última atualização |

### Tabela `contatos` (Formulário — LGPD)

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | uuid | PK, default gen | Identificador único |
| `nome` | text | NOT NULL | Nome do solicitante |
| `email` | text | NOT NULL | E-mail do solicitante |
| `telefone` | text | — | Telefone (opcional) |
| `mensagem` | text | NOT NULL | Mensagem enviada |
| `consentimento_lgpd` | boolean | NOT NULL | Aceite explícito da LGPD |
| `criado_em` | timestamptz | default now() | Data e hora do envio |

> **LGPD:** A coluna `consentimento_lgpd` é obrigatória. Nenhum contato pode ser armazenado sem consentimento registrado.

---

## 5. Diagrama Visual das Páginas

```
┌────────────────────────────────────────────────────────┐
│                        HEADER                          │
│  [Logo HIVI]   Home | Serviços | Sobre | Blog   [CTA]  │
└────────────────────────────────────────────────────────┘
         │
         ├─── /  (HOME)
         │    ├── [Hero] — Título + subtítulo + CTA (layout split)
         │    ├── [Clientes] — Logos de empresas parceiras
         │    ├── [Stats] — Números (fundo marinho)
         │    ├── [Serviços] — Cards (3 colunas)
         │    ├── [Faixa CTA] — Banner azul com chamada
         │    ├── [Destaque Produto] — Mockup + features
         │    └── [Contato] — Formulário
         │
         ├─── /servicos
         │    ├── [Header da Página]
         │    ├── [Grid de Serviços] — Cards com ícone e descrição
         │    └── [CTA]
         │
         ├─── /sobre
         │    ├── [Missão, Visão e Valores]
         │    ├── [História da Empresa]
         │    └── [CTA]
         │
         ├─── /blog
         │    ├── [Grid de Posts]
         │    └── [Paginação]
         │
         ├─── /blog/[slug]
         │    ├── [Capa e Metadados]
         │    ├── [Conteúdo do Post]
         │    └── [Posts Relacionados]
         │
         └─── /privacidade
              └── [Conteúdo Completo LGPD]

┌────────────────────────────────────────────────────────┐
│                        FOOTER                          │
│  [Logo]  Links do Site  Redes Sociais  [Privacidade]   │
│               © HIVI Tecnologia                        │
└────────────────────────────────────────────────────────┘
```

---

## 6. Variáveis de Ambiente

Todas as informações de contato e redes sociais são configuradas via variáveis de ambiente — **nenhum dado de contato ou link de rede social deve ser escrito diretamente no código.**

```env
# hivi-tecnologia/.env.example

# -------------------------------------------------------------------
# Supabase — obtidos no dashboard do projeto Supabase
# -------------------------------------------------------------------
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
SUPABASE_SERVICE_ROLE_KEY=xxxx        # Nunca expor no frontend

# -------------------------------------------------------------------
# Site
# -------------------------------------------------------------------
NEXT_PUBLIC_SITE_URL=https://hivi.com.br

# -------------------------------------------------------------------
# Contato
# -------------------------------------------------------------------
NEXT_PUBLIC_TELEFONE=+55 (XX) XXXX-XXXX
NEXT_PUBLIC_WHATSAPP=5500000000000    # Somente números, com DDI
NEXT_PUBLIC_EMAIL_CONTATO=contato@hivi.com.br

# -------------------------------------------------------------------
# Redes Sociais
# -------------------------------------------------------------------
NEXT_PUBLIC_INSTAGRAM=https://instagram.com/hivi
NEXT_PUBLIC_LINKEDIN=https://linkedin.com/company/hivi
NEXT_PUBLIC_FACEBOOK=https://facebook.com/hivi
NEXT_PUBLIC_YOUTUBE=https://youtube.com/@hivi
```

> **Segurança:** O arquivo `.env.local` nunca deve ser versionado. Apenas `.env.example` (sem valores reais) vai para o repositório.

---

## 7. Convenções de Nomenclatura

| Elemento | Convenção | Exemplo |
|----------|----------|---------|
| Componentes React | PascalCase | `HeroSection.tsx`, `ServiceCard.tsx` |
| Hooks customizados | camelCase com `use` | `useScrollPosition.ts` |
| Funções utilitárias | camelCase | `formatDate.ts`, `slugify.ts` |
| Arquivos de tipo | camelCase | `blog.ts`, `contato.ts` |
| Constantes | UPPER_SNAKE_CASE | `MAX_POSTS_PER_PAGE` |
| Pastas | kebab-case | `route-groups/`, `ui-components/` |
| Variáveis CSS/Tailwind | conforme config | Classes Tailwind nativas |

---

## 8. Políticas de Segurança

- Variáveis com `NEXT_PUBLIC_` são expostas ao cliente — usar apenas dados não sensíveis
- `SUPABASE_SERVICE_ROLE_KEY` apenas em Server Components ou API Routes
- Row Level Security (RLS) habilitado em todas as tabelas do Supabase
- Inputs de formulários validados com Zod no client e no server
- Headers de segurança configurados no `next.config.ts`
