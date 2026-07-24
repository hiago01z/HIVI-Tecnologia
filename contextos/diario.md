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
- Auth: Supabase Auth + cookie `HttpOnly; Secure; SameSite=Strict` + `middleware.ts`
- Analytics: tabela `eventos` sem dados pessoais (LGPD)
- Regra 8: medidas de segurança completas documentadas

#### ✅ Arquitetura i18n definida
- Biblioteca: `next-intl`
- Locales: `pt-BR` (padrão), `en`, `es`
- Rotas com `[locale]` dinâmico: `/pt-br/...`, `/en/...`, `/es/...`
- Detecção automática: cookie → geolocalização Vercel → `Accept-Language` → pt-BR
- `LanguageSwitcher` no Header (sem link para `/admin` no site público)
- Tabela `posts` com campos traduzidos em `jsonb` por locale
- Tabela `eventos` com campo `locale`
- Regra 9: zero strings hardcoded, tudo via `messages/*.json`

---

## Próximas Implementações

### Fase 2 — Setup Técnico (Alta Prioridade)

| # | Tarefa | Dependência | Status |
|---|--------|------------|--------|
| 1 | Instalar: `next-intl`, `@supabase/ssr`, Lucide, React Hook Form, Zod | — | 📋 Na Fila |
| 2 | Configurar `next-intl`: routing.ts, request.ts, next.config.ts | Tarefa 1 | 📋 Na Fila |
| 3 | Criar arquivos de tradução: `pt-br.json`, `en.json`, `es.json` | Tarefa 2 | 📋 Na Fila |
| 4 | Reestruturar `src/app/` para `src/app/[locale]/` | Tarefa 2 | 📋 Na Fila |
| 5 | Implementar `middleware.ts` (i18n + auth) | Tarefa 2 | 📋 Na Fila |
| 6 | Configurar clientes Supabase (`client.ts` e `server.ts`) | Tarefa 1 | 📋 Na Fila |
| 7 | Preencher `.env.local` | Credenciais | 📋 Na Fila |

### Fase 3 — Site Público

| # | Tarefa | Status |
|---|--------|--------|
| 8 | Header com LanguageSwitcher | 📋 Na Fila |
| 9 | Footer | 📋 Na Fila |
| 10 | Página Home | 📋 Na Fila |
| 11 | Página Serviços | 📋 Na Fila |
| 12 | Página Sobre Nós | 📋 Na Fila |
| 13 | Política de Privacidade (LGPD) | 📋 Na Fila |
| 14 | Formulário de contato com LGPD | 📋 Na Fila |

### Fase 4 — Blog Público

| # | Tarefa | Status |
|---|--------|--------|
| 15 | Listagem de posts | 📋 Na Fila |
| 16 | Post individual | 📋 Na Fila |
| 17 | SEO por locale (meta tags, Open Graph, hreflang) | 📋 Na Fila |

### Fase 5 — Analytics

| # | Tarefa | Status |
|---|--------|--------|
| 18 | Rastreamento de eventos (cliques, visitas) | 📋 Na Fila |

### Fase 6 — Painel Admin

| # | Tarefa | Status |
|---|--------|--------|
| 19 | Login com rate limiting | 📋 Na Fila |
| 20 | Dashboard de métricas | 📋 Na Fila |
| 21 | Gestão de posts (editor multilingual) | 📋 Na Fila |
| 22 | Visualização de contatos | 📋 Na Fila |

### Fase 7 — Qualidade e Launch

| # | Tarefa | Status |
|---|--------|--------|
| 23 | Responsividade completa | 📋 Na Fila |
| 24 | Auditoria LGPD | 📋 Na Fila |
| 25 | Performance (Core Web Vitals) | 📋 Na Fila |
| 26 | Deploy na Vercel + domínio | 📋 Na Fila |

---

## Observações e Pendências

- ⚠️ **Credenciais Supabase:** Preencher no `.env.local` e na Vercel antes de qualquer integração com banco.
- ⚠️ **Usuário admin:** Criar diretamente no painel Supabase Auth (nunca via código). Definir `role = 'admin'` nos metadados.
- ⚠️ **RLS:** Configurar políticas no Supabase antes de implementar qualquer funcionalidade do admin.
- ⚠️ **Reestruturação de rotas:** A pasta `src/app/` criada pelo `create-next-app` será reestruturada para `src/app/[locale]/` ao configurar o `next-intl` (Fase 2, Tarefa 4).
- ⚠️ **Domínio:** Adquirir antes do deploy final.
