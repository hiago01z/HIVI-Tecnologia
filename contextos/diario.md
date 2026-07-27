# Diário de Implementação — HIVI Tecnologia

> Registro cronológico de todas as implementações. Manter atualizado é obrigatório.

---

## Legenda de Status

| Ícone | Status |
|-------|--------|
| ✅ | Concluído |
| 🔄 | Em Progresso |
| 📋 | Na Fila |
| ❌ | Bloqueado |
| 🔁 | Em Revisão |

---

## Implementações Recentes

### 2026-07-24 — Fase 1: Fundação Completa

**Responsável:** Claude Code (Agente IA) | **Branch:** `main`

#### ✅ Documentação base (`contextos/`)
- 5 documentos criados: `projeto.md`, `regras.md`, `designe.md`, `estrutura.md`, `diario.md`
- 9 regras formais: LGPD, qualidade, admin, i18n e instruções para agentes de IA

#### ✅ Contato e redes via variáveis de ambiente
- `NEXT_PUBLIC_TELEFONE`, `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_EMAIL_CONTATO`, redes sociais

#### ✅ Design system (imagens de referência)
- Paleta: Azul Marinho `#162268`, Azul Primário `#1565C0`, Degrâdê Hero `#F0F7FF → #C8DFFF`
- Layouts: hero split, seções alternadas, barra de stats, cards, footer

#### ✅ Projeto Next.js inicializado
- `create-next-app@latest` com TypeScript + Tailwind CSS 4 + ESLint + App Router + `src/`
- Pasta: `hivi-tecnologia/` (npm exige kebab-case)
- Estrutura de pastas e `.env.example` configurados

#### ✅ Arquitetura do painel admin definida
- Rotas: `/[locale]/admin`, `/admin/dashboard`, `/admin/posts`, `/admin/posts/novo|[id]`
- Auth: Supabase Auth + cookie `HttpOnly; Secure; SameSite=Strict` + `proxy.ts`
- Analytics: tabela `eventos` sem dados pessoais (LGPD)
- Regra 8: medidas de segurança completas documentadas

#### ✅ Arquitetura i18n definida
- Biblioteca: `next-intl`
- Locales: `pt-BR` (padrão), `en`, `es`
- Rotas com `[locale]` dinâmico: `/pt-BR/...`, `/en/...`, `/es/...`
- Detecção automática: cookie → geolocalização Vercel → `Accept-Language` → pt-BR
- `LanguageSwitcher` no Header (sem link para `/admin` no site público)
- Tabela `posts` com campos traduzidos em `jsonb` por locale
- Tabela `eventos` com campo `locale`
- Regra 9: zero strings hardcoded, tudo via `messages/*.json`

---

### 2026-07-24 — Fase 2: Setup Técnico Completo

**Responsável:** Claude Code (Agente IA) | **Branch:** `main`

#### ✅ Dependências instaladas
- `next-intl@4.13.4`, `@supabase/ssr`, `lucide-react`, `react-hook-form`, `zod`

#### ✅ Adaptação para Next.js 16
- **Descoberta crítica:** Next.js 16 renomeia `middleware.ts` → `proxy.ts` e a função de `middleware` para `proxy`
- `src/proxy.ts` criado (em vez de `middleware.ts`) com i18n + auth

#### ✅ Configuração next-intl
- `src/i18n/routing.ts` — `defineRouting()` com locales `['pt-BR', 'en', 'es']` e `defaultLocale: 'pt-BR'`
- `src/i18n/request.ts` — `getRequestConfig()` para server-side (carrega mensagens por locale)
- `next.config.ts` — plugin `withNextIntl`, headers de segurança (`X-Frame-Options`, `X-Content-Type-Options`, etc.)

#### ✅ Arquivos de tradução criados
- `messages/pt-BR.json` — Português Brasil (padrão)
- `messages/en.json` — English
- `messages/es.json` — Español
- Chaves: `nav`, `hero`, `stats`, `services`, `about`, `contact`, `blog`, `footer`, `privacy`, `notFound`, `admin`, `languageSwitcher`
- 100% sem strings hardcoded (Regra 9 ✅)

#### ✅ Reestruturação `src/app/`
- `app/layout.tsx` e `app/page.tsx` removidos (padrão Next.js 16 para i18n)
- `app/[locale]/layout.tsx` — root layout com `<html lang={locale}>` e `NextIntlClientProvider`
- `app/[locale]/(site)/layout.tsx` — layout site público (Header + Footer virão na Fase 3)
- `app/[locale]/(site)/page.tsx` — Home (placeholder)
- `app/[locale]/(site)/servicos/page.tsx` — Serviços (placeholder)
- `app/[locale]/(site)/sobre/page.tsx` — Sobre (placeholder)
- `app/[locale]/(site)/privacidade/page.tsx` — Privacidade (placeholder)
- `app/[locale]/(site)/blog/page.tsx` — Blog (placeholder)
- `app/[locale]/(site)/blog/[slug]/page.tsx` — Post individual (placeholder)
- `app/[locale]/admin/page.tsx` — Login admin (placeholder seguro)
- `app/[locale]/admin/dashboard/page.tsx` — Dashboard (placeholder)
- `app/[locale]/admin/posts/page.tsx` — Lista de posts (placeholder)
- `app/[locale]/admin/posts/novo/page.tsx` — Criar post (placeholder)
- `app/[locale]/admin/posts/[id]/page.tsx` — Editar post (placeholder)
- `app/[locale]/not-found.tsx` — Página 404 traduzida

#### ✅ Proxy (src/proxy.ts)
- Detecção automática de locale: cookie NEXT_LOCALE → `x-vercel-ip-country` → `Accept-Language` → pt-BR
- Mapeamento de países para locales (BR → pt-BR, países hispânicos → es, ingleses → en)
- Proteção de rotas `/[locale]/admin/*` — redireciona para login se não autenticado
- Matcher configurado para excluir assets estáticos

#### ✅ Clientes Supabase
- `src/lib/supabase/client.ts` — Browser client (anon key)
- `src/lib/supabase/server.ts` — SSR client (anon key) + `createAdminClient()` (service role key)

#### ✅ API Routes
- `src/app/api/contato/route.ts` — POST com validação Zod, inserção na tabela `contatos`
- `src/app/api/eventos/route.ts` — POST para analytics, inserção na tabela `eventos`

#### ✅ Tipos TypeScript
- `src/types/blog.ts` — `BlogPost`, `BlogPostPreview`, `LocalizedText`
- `src/types/contato.ts` — `ContatoPayload`, `EventoPayload`

#### ✅ Constantes
- `src/constants/services.ts` — chaves i18n dos serviços
- `src/constants/navigation.ts` — chaves i18n da navegação

#### ✅ Build verificado
- `next build` — 100% sucesso, zero erros TypeScript
- Todas as rotas compiladas com static generation e dynamic rendering

---

---

### 2026-07-24 — Fase 3: Site Público Completo

**Responsável:** Claude Code (Agente IA) | **Branch:** `claude/hivi-projeto-setup-wm45y3`

#### ✅ Componentes de Layout
- `Header.tsx` — sticky, logo "HIVI.", nav, LanguageSwitcher, CTA
- `Footer.tsx` — 4 colunas, ícones sociais via SVG inline (lucide-react não tem brand icons)
- `MobileMenu.tsx` — hamburger client component
- `LanguageSwitcher.tsx` — dropdown com cookie `NEXT_LOCALE`
- `src/i18n/navigation.ts` — `createNavigation` para links locale-aware

#### ✅ Seções
- `HeroSection.tsx` — split layout com mockup CSS e checklist (4 itens)
- `StatsSection.tsx` — dark navy, 4 métricas com Lucide icons
- `ServicesSection.tsx` — 11 serviços, grid 3 colunas, cards featured em azul
- `AboutSection.tsx` — valores, Missão/Visão/Valores
- `CtaBanner.tsx` — faixa azul com CTA
- `ContactSection.tsx` — form LGPD react-hook-form + zod, sucesso state

#### ✅ Páginas completas com generateMetadata
- `/servicos` — hero + ServicesSection + CtaBanner
- `/sobre` — hero + AboutSection + ContactSection
- `/privacidade` — artigo LGPD com 7 seções iteradas

#### ✅ Fix técnico
- `z.literal(true, errorMap)` → `z.literal(true, t('..'))` (Zod v4 API)
- Ícones sociais: substituídos por SVGs inline (Instagram, LinkedIn, Facebook, YouTube)

---

### 2026-07-24 — Fase 4: Blog Público

**Responsável:** Claude Code (Agente IA) | **Branch:** `claude/hivi-projeto-setup-wm45y3`

#### ✅ Data layer
- `src/lib/blog.ts` — `getPublishedPosts(locale)`, `getPostBySlug(locale, slug)`, `getAllSlugsForLocale`

#### ✅ Páginas
- `/blog` — hero + grid responsivo de cards (imagem, data formatada, resumo, link)
- `/blog/[slug]` — artigo completo, Open Graph, `alternates.languages` hreflang
- Posts renderizados sob demanda (SSR) — sem `generateStaticParams` por não poder usar cookies

#### ✅ Dependência
- `@tailwindcss/typography` instalado e registrado via `@plugin "@tailwindcss/typography"` no `globals.css`

---

### 2026-07-24 — Fase 5: Analytics LGPD-compliant

**Responsável:** Claude Code (Agente IA) | **Branch:** `claude/hivi-projeto-setup-wm45y3`

#### ✅ Implementações
- `src/lib/analytics.ts` — `fireEvent()` com `fetch keepalive`, fallback silencioso
- `PageViewTracker.tsx` — client component, `useEffect` detecta mudança de rota, dispara `page_view`
- `ContactSection.tsx` — `click_contato` (submit) e `click_whatsapp` (clique no link)
- `ServiceCardLink.tsx` — client wrapper isolado para `click_servico` com `metadados.servico`
- Layout (site) — `<PageViewTracker />` montado em todas as páginas públicas

---

### 2026-07-24 — Fase 6: Painel Admin

**Responsável:** Claude Code (Agente IA) | **Branch:** `claude/hivi-projeto-setup-wm45y3`

#### ✅ Autenticação e Segurança
- `src/lib/rateLimiter.ts` — in-memory, 5 tentativas/60s, bloqueio 15min por IP
- `admin/actions.ts` — `loginAction(prevState, formData)` + `logoutAction`; erros genéricos
- Login page — client component com `useActionState`, `useFormStatus`, hidden locale field

#### ✅ Layout Admin
- `admin/layout.tsx` — verifica sessão via `supabase.auth.getUser()`; mostra navbar apenas para autenticados
- Navbar: Dashboard / Posts / Sair (form action para logout seguro)

#### ✅ Dashboard
- `admin/dashboard/page.tsx` — client component, period selector 7/30/90 dias
- `/api/admin/metrics` — endpoint protegido por sessão, conta eventos por tipo

#### ✅ Gestão de Posts
- `admin/posts/page.tsx` — tabela com status, data, ações (editar / publicar / excluir)
- `admin/posts/actions.ts` — `deletePostAction`, `togglePublishAction`, `savePostAction`
- `components/admin/PostEditor.tsx` — tabs pt-BR/en/es, auto-slug, textarea HTML, preview de imagem

---

### 2026-07-24 — Fase 9: Qualidade de Produto — Contatos Admin, WhatsApp e Animações

**Responsável:** Claude Code (Agente IA) | **Branch:** `main`

#### ✅ Admin — Página de Contatos (`/admin/contatos`)
- `src/app/[locale]/admin/contatos/page.tsx` — lista todos os formulários recebidos
- Exibe: nome, e-mail (linkado), telefone, mensagem, locale, data, badge LGPD
- Protegida por autenticação (redirect para login se não autenticado)
- Navbar admin atualizada com link "Contatos" (traduzido nos 3 locales)
- Chaves `admin.contatos.*` adicionadas em `pt-BR.json`, `en.json`, `es.json`
- Chave `admin.nav.contatos` adicionada nos 3 arquivos de mensagem

#### ✅ Botão WhatsApp flutuante (`WhatsAppButton`)
- `src/components/ui/WhatsAppButton.tsx` — componente client fixo bottom-right
- Só renderiza se `NEXT_PUBLIC_WHATSAPP` estiver configurado
- Ícone SVG do WhatsApp (inline), cor `#25D366`
- Aciona analytics `click_whatsapp` ao clicar
- Adicionado ao `(site)/layout.tsx` — presente em todas as páginas públicas
- Acessível: `aria-label`, `focus-visible` ring verde

#### ✅ Animações de scroll (Intersection Observer)
- `src/components/ui/AnimateOnScroll.tsx` — wrapper client com IntersectionObserver
- Efeito fade-up (400ms ease-out) ou fade simples; prop `delay` para stagger
- Respeita `prefers-reduced-motion: reduce` (mostra conteúdo imediatamente)
- Aplicado em:
  - `StatsSection` — cada card com delay escalonado (0/100/200/300ms)
  - `ServicesSection` — heading da seção
  - `AboutSection` — heading + colunas de texto e cards (delay 100ms/200ms)

---

### 2026-07-24 — Fase 8: Infraestrutura Supabase + Ajustes de Produção

**Responsável:** Claude Code (Agente IA) | **Branch:** `claude/hivi-projeto-setup-wm45y3`

#### ✅ Schema SQL Supabase
- `hivi-tecnologia/supabase/schema.sql` — script completo para executar no SQL Editor do Supabase
- Tabela `blog_posts` — `jsonb` multilíngue (titulo, slug, resumo, conteudo), trigger `atualizado_em`
- Tabela `contatos` — LGPD: nome, email, telefone, mensagem, locale, consentimento_lgpd
- Tabela `eventos` — analytics sem PII: tipo, pagina, locale, metadados
- Trigger `set_updated_at()` — atualiza `atualizado_em` automaticamente no update
- Indexes: `idx_blog_posts_publicado_em`, `idx_blog_posts_slug` (GIN), `idx_eventos_tipo`, `idx_eventos_criado_em`, `idx_contatos_criado_em`
- RLS habilitado em todas as tabelas (Regra 8)
- Policy `blog_posts_leitura_publica` — anon/authenticated lê apenas posts publicados
- Policy `eventos_insercao_anon` — anon pode inserir eventos com tipo válido
- Constraint `eventos_tipo_check` — garante apenas tipos permitidos
- Bloco `DO $$ assert $$` — verifica criação das 3 tabelas após execução
- Credenciais Supabase (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_URL`) configuradas na Vercel pelo usuário

#### ✅ Fix — Footer oculta ícones sociais sem URL configurada
- `Footer.tsx` — `ALL_SOCIAL_LINKS` com `.filter(Boolean)` substitui o `?? '#'` anterior
- Ícones sociais só aparecem se a variável de ambiente estiver definida e não vazia

---

### 2026-07-24 — Fase 7: SEO e Qualidade

**Responsável:** Claude Code (Agente IA) | **Branch:** `claude/hivi-projeto-setup-wm45y3`

#### ✅ SEO
- `src/app/robots.ts` — bloqueia `/admin` e `/api/`, expõe sitemap
- `src/app/sitemap.ts` — 5 rotas × 3 locales = 15 entradas com `alternates.languages`
- `[locale]/layout.tsx` — `generateMetadata` com `metadataBase`, `title template`, OpenGraph, twitter card
- Home page — `generateMetadata` com `description` e `alternates.languages`
- `not-found.tsx` — Link corrigido para `@/i18n/navigation` (locale-aware)

---

### 2026-07-25 — Fase 10: Loading States, Error Boundaries e Contatos no Dashboard

**Responsável:** Claude Code (Agente IA) | **Branch:** `main`

#### ✅ Loading Skeletons (7 arquivos)
- `(site)/blog/loading.tsx` — grid de 6 cards skeleton com `animate-pulse`
- `(site)/blog/[slug]/loading.tsx` — skeleton de artigo (título, imagem, parágrafos)
- `admin/dashboard/loading.tsx` — 5 cards skeleton + seletor de período
- `admin/posts/loading.tsx` — tabela skeleton com 5 linhas
- `admin/contatos/loading.tsx` — 4 cards skeleton de contato

#### ✅ Error Boundaries (2 arquivos)
- `(site)/error.tsx` — client component com retry + link home (traduções `error.*`)
- `admin/error.tsx` — client component com retry + link Dashboard (traduções `adminError.*`)

#### ✅ Dashboard — 5º Card (Total de Contatos)
- `/api/admin/metrics` extendido para retornar `totalContacts` via `count: 'exact'` do Supabase
- `dashboard/page.tsx` — novo card roxo (`#7C3AED`) com ícone `Users`, sem filtro de período
- Grid alterado para `lg:grid-cols-5`
- Chave `admin.dashboard.totalContacts` adicionada nos 3 locales

#### ✅ Traduções novas
- `error.title`, `error.description`, `error.retry`, `error.backHome` (3 locales)
- `adminError.title`, `adminError.description`, `adminError.retry`, `adminError.backToDashboard` (3 locales)

---

### 2026-07-25 — Fase 11: Seções Faltantes do Design (Clientes e Depoimentos)

**Responsável:** Claude Code (Agente IA) | **Branch:** `main`

#### ✅ ClientsSection — Faixa de Clientes/Logos (designe.md §5.3)
- `src/components/sections/ClientsSection.tsx` — 6 logos tipográficos com efeito grayscale/opacity
- `src/constants/clients.ts` — `CLIENT_LOGOS` com 6 empresas parceiras
- Fundo branco `#FFFFFF`, posicionada entre Hero e Stats (conforme padrão de alternância designe.md §8)
- Efeito CSS: `opacity-40 grayscale` → `opacity-100 grayscale-0` no hover (300ms ease)
- Traduções `clients.sectionTitle`, `clients.sectionSubtitle` nos 3 locales

#### ✅ TestimonialsSection — Depoimentos (designe.md §8)
- `src/components/sections/TestimonialsSection.tsx` — 3 cards com estrelas, citação, avatar com iniciais
- Fundo branco, grid 1→3 colunas (mobile → desktop)
- Rating: 5 estrelas com `Star fill="currentColor"` (Lucide), cor `#F59E0B`
- Avatar: iniciais do nome em círculo `#162268` (sem fotos)
- Posicionada entre CtaBanner e ContactSection (conforme padrão designe.md §8)
- Traduções `testimonials.*` com 3 depoimentos nos 3 locales
- AnimateOnScroll com stagger 0/120/240ms

#### ✅ Home page — ordem de seções atualizada
```
Hero → Clients → Stats → Services → About → CtaBanner → Testimonials → Contact
```
Alinhada com o padrão de alternância visual do designe.md §8.

---

### 2026-07-25 — Auditoria de Segurança e Correção de Bugs

**Responsável:** Claude Code (Agente IA) | **Branch:** `claude/hivi-projeto-setup-wm45y3`

#### ✅ Bugs corrigidos (crashes em produção)
- `admin/layout.tsx` — try-catch em `supabase.auth.getUser()` (causa raiz do "server error")
- `admin/contatos/page.tsx` — try-catch em `supabase.auth.getUser()`
- `api/admin/metrics/route.ts` — try-catch em `supabase.auth.getUser()`
- `admin/posts/actions.ts` — `requireAuth()` com try-catch uniforme

#### ✅ Falhas de segurança corrigidas
- `proxy.ts` — **cookie names errados** (`sb-access-token`/`sb-auth-token` → padrão `sb-*-auth-token` do `@supabase/ssr`); impedia acesso ao admin após login
- `proxy.ts` — removido dead code (`isAdminLoginRoute` nunca chamada); função `proxy` tornou-se síncrona
- `next.config.ts` — adicionado header `Content-Security-Policy` (proteção XSS)
- `api/contato/route.ts` — rate limiting adicionado (5 req/min por IP, chave `contato:{ip}`)
- `admin/actions.ts` — chave do rate limiting prefixada `login:{ip}` (evita colisão entre endpoints)

---

### 2026-07-25 — Fase 12: Melhorias Pós-Deploy

**Responsável:** Claude Code (Agente IA) | **Branch:** `claude/hivi-projeto-setup-wm45y3`

#### ✅ Schema Supabase executado
- Usuário executou `supabase/schema.sql` no SQL Editor do Supabase
- Tabelas `blog_posts`, `contatos`, `eventos` criadas com RLS, indexes e triggers

#### ✅ HeroSection — Regra 9 cumprida (strings do mockup)
- Strings hardcoded em PT-BR no mockup do hero ("Clientes", "Projetos", "Suporte", "Performance", "Projeto entregue", "34% produtividade") extraídas para `messages/*.json`
- Chaves `hero.mockup.*` adicionadas nos 3 locales (pt-BR, en, es)
- HeroSection usa `t('hero.mockup.*')` para todas as strings visíveis da ilustração

#### ✅ Sitemap dinâmico com posts do blog
- `sitemap.ts` tornou-se async e consulta `blog_posts` publicados no Supabase
- Posts incluídos com URL por locale + `alternates.languages` hreflang correto
- Fallback seguro: se banco indisponível, retorna apenas rotas estáticas (try-catch)

---

### 2026-07-25 — Fix: Admin Crash e onSubmit em Server Component

**Responsável:** Claude Code (Agente IA) | **Branch:** `main` + `claude/hivi-projeto-setup-wm45y3`

#### ✅ `admin/layout.tsx` — `createClient()` dentro do try-catch
- `createClient()` era chamado fora do try-catch; se Supabase inacessível ou env vars ausentes, crashava com `ERROR 1472982161` na página de login
- Movido para dentro do try-catch: `user = null` silenciosamente em vez de crash

#### ✅ `admin/posts/page.tsx` — onSubmit removido do Server Component
- `onSubmit={(e) => { window.confirm(...) }}` em Server Component é ilegal no React 19
- Extraído para `DeletePostButton.tsx` (Client Component com `'use client'`)
- Comportamento de confirmação antes de deletar mantido

---

### 2026-07-25 — Fase 14: Home Page Completa — Ordem de Seções Correta

**Responsável:** Claude Code (Agente IA) | **Branch:** `main` + `claude/hivi-projeto-setup-wm45y3`

#### ✅ Restauração da ordem de seções da Home (designe.md §8)
- `StatsSection` restaurada entre `ClientsSection` e `ServicesSection`
- `TestimonialsSection` restaurada entre `CtaBanner` e `ContactSection`
- Ordem final alinhada ao padrão de alternância visual do design:

```
Hero (#F0F7FF→#C8DFFF) → Clients (#FFF) → Stats (#162268) → Services (#FFF)
→ About (#EBF3FF) → CtaBanner (#1565C0) → Testimonials (#FFF) → Contact (#EBF3FF)
```

---

### 2026-07-25 — Fase 13: Polimento Final

**Responsável:** Claude Code (Agente IA) | **Branch:** `claude/hivi-projeto-setup-wm45y3`

#### ✅ Regra 9 — cabeçalhos da tabela de posts traduzidos
- `admin/posts/page.tsx` tinha 4 strings hardcoded: "Título", "Status", "Data", "Ações"
- Chaves `admin.posts.colTitle`, `colStatus`, `colDate`, `colActions` adicionadas nos 3 locales
- Componente atualizado para usar `t('colTitle')`, `t('colStatus')`, `t('colDate')`, `t('colActions')`

#### ✅ Blog — `<img>` substituído por `<Image>` do Next.js
- `blog/page.tsx` — `<img>` → `<Image fill sizes="..." alt={post.titulo}>` com `relative` no container
- `blog/[slug]/page.tsx` — `<img>` → `<Image fill priority alt={titulo}>` com `relative` no container
- `alt` agora usa o título do post (antes era `alt=""`)

#### ✅ `next.config.ts` — `remotePatterns` para Supabase Storage
- Adicionado `images.remotePatterns` com hostname `**.supabase.co` e path `/storage/v1/object/public/**`
- Permite otimização automática de imagens de posts vindas do Supabase Storage via Next.js Image

---

### 2026-07-27 — Fase 18: SEO — Canonical URLs e x-default hreflang

**Responsável:** Claude Code (Agente IA) | **Branch:** `claude/hivi-projeto-setup-wm45y3`

#### ✅ Canonical URL e x-default hreflang
- `(site)/page.tsx` — `alternates.canonical = /${locale}` + `languages['x-default'] = '/pt-BR'`
- `blog/[slug]/page.tsx` — `alternates.canonical` aponta para o slug no locale atual; `languages['x-default']` aponta para slug pt-BR; todos os 3 locales mapeados via `routing.locales`
- Evita conteúdo duplicado no Google quando bots indexam múltiplos locales do mesmo conteúdo

---

### 2026-07-27 — Fase 17: SEO Avançado, UX Refinado e LGPD (Direito ao Apagamento)

**Responsável:** Claude Code (Agente IA) | **Branch:** `claude/hivi-projeto-setup-wm45y3`

#### ✅ Open Graph Image Dinâmica
- `src/app/[locale]/opengraph-image.tsx` — gerada via `next/og` ImageResponse (1200×630)
- Design: gradiente marinho→azul, logo "HIVI.", tagline e subtítulo de serviços
- Gerada estaticamente no build, herdada por todas as rotas sob `[locale]`

#### ✅ JSON-LD Structured Data (Schema.org)
- `[locale]/layout.tsx` — `Organization` (name, url, description, sameAs social links filtrados por env var) + `WebSite`
- `blog/[slug]/page.tsx` — `BlogPosting` (headline, description, datePublished, dateModified, author, publisher, image, url)
- Sanitização XSS: `.replace(/</g, '\\u003c')` em todos os JSON-LD (conforme docs Next.js 16)

#### ✅ UX — Navegação e Acessibilidade
- `MobileMenu.tsx` — `useEffect([pathname])` fecha menu automaticamente ao navegar (incluindo botão voltar do browser)
- `admin/layout.tsx` — logo admin agora tem `aria-label="HIVI Admin — Dashboard"`
- `globals.css` — `scroll-behavior: smooth` com `@media (prefers-reduced-motion: no-preference)`
- `BackToTop.tsx` — botão flutuante, aparece após 400px de scroll, `aria-label` via `t('common.backToTop')`
- `common.backToTop` adicionado em pt-BR, en, es (Regra 9)

#### ✅ LGPD — Direito ao Apagamento
- `admin/contatos/actions.ts` — `deleteContactAction` server action com auth check
- `admin/contatos/DeleteContactButton.tsx` — client component com confirmação
- `admin/contatos/page.tsx` — botão excluir em cada card de contato
- `admin.contatos.delete` e `confirmDelete` traduzidos nos 3 locales

---

### 2026-07-27 — Fase 16: UX — Link Ativo na Navegação e Loading States Completos

**Responsável:** Claude Code (Agente IA) | **Branch:** `claude/hivi-projeto-setup-wm45y3`

#### ✅ Navegação com link ativo (aria-current)

**`src/components/layout/NavLinks.tsx`** *(novo — Client Component)*
- `usePathname()` de `@/i18n/navigation` para detectar página atual sem prefixo de locale
- Lógica `isActive`: `/` → exact match; outros → `startsWith(href + '/')`
- Active: `bg-[#EBF3FF] text-[#1565C0]` + `aria-current="page"`
- `Header.tsx` atualizado para usar `<NavLinks />` em vez do loop estático

**`src/components/layout/MobileMenu.tsx`** *(atualizado)*
- `usePathname()` adicionado — mesmo destaque de link ativo para o menu mobile
- `aria-current="page"` no link ativo (acessibilidade)

**`src/components/admin/AdminNavLinks.tsx`** *(novo — Client Component)*
- Mesmo padrão: `usePathname()` + `isActive()` para os links Dashboard / Posts / Contatos
- Active: `bg-white/20 text-white` (contraste sobre fundo marinho `#162268`)
- `admin/layout.tsx` atualizado para usar `<AdminNavLinks />`

#### ✅ Loading skeletons completos (todas as páginas)

**Site público:**
- `(site)/servicos/loading.tsx` — hero + grid 9 cards com `animate-pulse`
- `(site)/sobre/loading.tsx` — hero + seção about + skeleton do formulário de contato

**Admin:**
- `admin/posts/novo/loading.tsx` — tabs pt-BR/en/es + campos do editor
- `admin/posts/[id]/loading.tsx` — mesmo skeleton do novo (edição)

---

### 2026-07-27 — Fase 15: Correção do Error Boundary no Login Admin e Hardening de Segurança

**Responsável:** Claude Code (Agente IA) | **Branch:** `claude/hivi-projeto-setup-wm45y3`

#### Problema Raiz Identificado — "Erro no painel" após login bem-sucedido
- Quando `loginAction` chama `redirect()`, o Next.js 16 transmite o RSC payload da rota de destino (`/admin/dashboard`) como parte da mesma resposta da Server Action.
- Esse streaming ocorre dentro de uma React transition (via `useActionState`). Se qualquer Server Component na rota de destino lança um erro, ele propaga pelo `startTransition` até o Error Boundary mais próximo — que é `admin/error.tsx`, o mesmo que envolve a página de login.
- Causa raiz: `getTranslations()` em `admin/layout.tsx` era chamada fora de try-catch; se lançava, o Error Boundary exibia "Erro no painel" mesmo o login sendo bem-sucedido.

#### ✅ Correções aplicadas

**`admin/layout.tsx`**
- `getTranslations()` envolvida em `.catch(() => null)` com guard `if (!t) return <>{children}</>`
- Garante que falha na tradução nunca propaga como erro não tratado durante o streaming RSC

**`admin/error.tsx`**
- Prop `reset: () => void` (API Next.js 13 — deprecated) substituída por `unstable_retry: () => void` (Next.js 16.2+)
- Botão "Tentar novamente" agora dispara re-fetch correto da rota em vez de apenas re-render do cliente

**`admin/dashboard/page.tsx`**
- `fetchMetrics()` no `useEffect` não tinha `.catch()` — rejeição não tratada podia estourar o Error Boundary
- Adicionado `.catch()` com fallback `{ page_view: 0, ... }` e `.finally()` para `setLoading(false)`

**`admin/posts/page.tsx`**
- Faltava verificação de autenticação (sem redirect para login se não autenticado)
- `createAdminClient()` chamado sem try-catch — crash se env var ausente ou Supabase inacessível
- Adicionado: auth check com redirect + try-catch completo

**`admin/contatos/page.tsx`**
- `createAdminClient()` chamado sem try-catch após auth check
- Adicionado: try-catch com fallback `contatos = null`

**`admin/posts/[id]/page.tsx`** *(vulnerabilidade encontrada na auditoria seguinte)*
- Sem auth check — qualquer usuário não autenticado podia acessar o editor de post por ID
- `createAdminClient()` sem try-catch — crash em caso de falha
- Adicionado: auth check com redirect + try-catch + fallback `notFound()`

**`admin/posts/novo/page.tsx`** *(vulnerabilidade encontrada na auditoria seguinte)*
- Sem auth check — qualquer usuário não autenticado podia acessar o formulário de criação
- Adicionado: auth check com redirect

#### ✅ Confirmação do usuário
- Usuário confirmou: "pronto. consertado" — fix do Error Boundary validado em produção

---

## Status Final das Implementações

| # | Tarefa | Status |
|---|--------|--------|
| 1 | Header com LanguageSwitcher | ✅ Concluído |
| 2 | Footer com redes sociais (SVG inline) | ✅ Concluído |
| 3 | Seção Hero (split layout + checklist) | ✅ Concluído |
| 4 | Seção Stats (barra de números) | ✅ Concluído |
| 5 | Seção Serviços (11 cards, 3 featured) | ✅ Concluído |
| 6 | Seção Sobre Nós | ✅ Concluído |
| 7 | Seção CTA + Formulário LGPD | ✅ Concluído |
| 8 | Página de Serviços completa | ✅ Concluído |
| 9 | Página Sobre Nós completa | ✅ Concluído |
| 10 | Página de Política de Privacidade | ✅ Concluído |
| 11 | Blog — listagem de posts | ✅ Concluído |
| 12 | Blog — post individual | ✅ Concluído |
| 13 | SEO por locale (meta tags, hreflang) | ✅ Concluído |
| 14 | Analytics LGPD (sem dados pessoais) | ✅ Concluído |
| 15 | Admin — login com rate limiting | ✅ Concluído |
| 16 | Admin — dashboard de métricas | ✅ Concluído |
| 17 | Admin — editor multilingual de posts | ✅ Concluído |
| 18 | robots.txt + sitemap.xml | ✅ Concluído |
| 19 | Auditoria LGPD (consentimento, privacidade) | ✅ Concluído |
| 20 | Deploy na Vercel | 🔄 Em progresso (keys Supabase configuradas) |
| 21 | Schema Supabase (tabelas + RLS) | 📋 Pendente (executar `supabase/schema.sql`) |
| 22 | Usuário admin no Supabase Auth | 📋 Pendente (criar no painel) |
| 23 | Configuração de domínio | 📋 Pendente |
| 24 | Admin — página Contatos | ✅ Concluído |
| 25 | Botão WhatsApp flutuante | ✅ Concluído |
| 26 | Animações de scroll (IntersectionObserver) | ✅ Concluído |
| 27 | Loading skeletons — blog e admin | ✅ Concluído |
| 28 | Error boundaries — site público e admin | ✅ Concluído |
| 29 | Dashboard — 5º card Total de Contatos | ✅ Concluído |
| 30 | ClientsSection — Faixa de Clientes/Logos | ✅ Concluído |
| 31 | TestimonialsSection — Depoimentos | ✅ Restaurada na home (Fase 14) |
| 32 | StatsSection — Barra de métricas | ✅ Restaurada na home (Fase 14) |
| 33 | Auditoria de segurança — crashes e vulnerabilidades | ✅ Concluído |
| 34 | Schema Supabase executado no banco | ✅ Concluído |
| 35 | HeroSection — strings do mockup traduzidas (Regra 9) | ✅ Concluído |
| 36 | Sitemap dinâmico com posts do blog | ✅ Concluído |
| 37 | Cabeçalhos da tabela de posts traduzidos (Regra 9) | ✅ Concluído |
| 38 | Blog — `<Image>` Next.js com alt e remotePatterns | ✅ Concluído |
| 39 | Admin — crash `createClient()` fora de try-catch | ✅ Concluído |
| 40 | Admin Posts — `onSubmit` ilegal em Server Component → `DeletePostButton` | ✅ Concluído |
| 41 | Home — StatsSection e TestimonialsSection restauradas (Fase 14) | ✅ Concluído |
| 42 | Admin — Error Boundary "Erro no painel" após login (Fase 15) | ✅ Concluído |
| 43 | Admin — `error.tsx` `reset` → `unstable_retry` (Next.js 16.2+) | ✅ Concluído |
| 44 | Admin — `dashboard/page.tsx` fetchMetrics sem `.catch()` | ✅ Concluído |
| 45 | Admin — `posts/page.tsx` sem auth check + try-catch | ✅ Concluído |
| 46 | Admin — `contatos/page.tsx` createAdminClient sem try-catch | ✅ Concluído |
| 47 | Admin — `posts/[id]/page.tsx` sem auth check nem try-catch | ✅ Concluído |
| 48 | Admin — `posts/novo/page.tsx` sem auth check | ✅ Concluído |
| 49 | Header/MobileMenu — link ativo com `usePathname()` (NavLinks client) | ✅ Concluído |
| 50 | Admin — link ativo na navbar (AdminNavLinks client) | ✅ Concluído |
| 51 | Loading skeletons — `servicos/loading.tsx` e `sobre/loading.tsx` | ✅ Concluído |
| 52 | Loading skeletons — `posts/novo/loading.tsx` e `posts/[id]/loading.tsx` | ✅ Concluído |
| 53 | Open Graph image dinâmica (1200×630, branded, `next/og`) | ✅ Concluído |
| 54 | MobileMenu — fecha automaticamente ao navegar (`useEffect` + `usePathname`) | ✅ Concluído |
| 55 | Scroll suave (`scroll-behavior: smooth`) com `prefers-reduced-motion` | ✅ Concluído |
| 56 | Botão "Voltar ao Topo" flutuante — traduzido nos 3 locales | ✅ Concluído |
| 57 | JSON-LD Organization + WebSite no `[locale]/layout.tsx` | ✅ Concluído |
| 58 | JSON-LD BlogPosting no `blog/[slug]/page.tsx` | ✅ Concluído |
| 59 | Admin — exclusão de contatos (LGPD direito ao apagamento) | ✅ Concluído |
| 60 | SEO — canonical + x-default hreflang na home e blog/[slug] | ✅ Concluído |

---

## Observações e Pendências

- ✅ **Credenciais Supabase:** Configuradas na Vercel pelo usuário (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_URL`).
- ✅ **Schema Supabase:** Executado com sucesso no SQL Editor do Supabase em 2026-07-25.
- ⚠️ **Usuário admin:** Criar diretamente no painel Supabase Auth > Authentication > Users (nunca via código).
- ⚠️ **Env vars opcionais:** `NEXT_PUBLIC_TELEFONE`, `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_EMAIL_CONTATO`, `NEXT_PUBLIC_INSTAGRAM`, `NEXT_PUBLIC_LINKEDIN`, `NEXT_PUBLIC_FACEBOOK`, `NEXT_PUBLIC_YOUTUBE` — configurar na Vercel para exibir dados de contato e ícones sociais.
- ⚠️ **Domínio:** Adquirir e configurar no painel Vercel antes do deploy final.
- ℹ️ **Next.js 16:** Usa `proxy.ts` em vez de `middleware.ts`. A função se chama `proxy`.
- ℹ️ **Rate limiting:** Implementado in-memory. Para múltiplas instâncias em produção, migrar para Upstash Redis ou tabela Supabase.
- ℹ️ **Editor de posts:** Aceita HTML diretamente no textarea. Em produção, considerar um editor WYSIWYG (ex.: TipTap) numa fase futura.
