# HIVI Tecnologia — Documento de Projeto

## Identificação

- **Nome:** HIVI Tecnologia
- **Segmento:** Consultoria • Gestão de TI • Infraestrutura • Desenvolvimento Web
- **Missão:** Entregar soluções tecnológicas estratégicas que potencializam negócios, reduzem custos e impulsionam a transformação digital de empresas de todos os portes.

---

## Ideia Central

Site empresarial da HIVI Tecnologia para apresentar a empresa, seus serviços, portfólio e contato. O site deve transmitir profissionalismo, credibilidade e inovação.

**Recursos principais:**
- Site público multilíngue (pt-BR, en, es) com detecção automática por geolocalização
- Painel administrativo privado (`/admin`) para gestão de conteúdo e métricas

---

## Público-Alvo

- Empresas e empreendedores em busca de consultoria tecnológica
- Gestores de TI buscando parceiros estratégicos
- Pequenas e médias empresas em processo de transformação digital

---

## Páginas do Site Público

Todas as páginas são traduzidas e acessíveis em pt-BR, en e es.

| Página | Rota (pt-BR) | Descrição |
|--------|-------------|----------|
| Home | `/pt-br` | Apresentação institucional, proposta de valor e CTA |
| Serviços | `/pt-br/servicos` | Listagem de todos os serviços |
| Sobre Nós | `/pt-br/sobre` | História, missão, visão e equipe |
| Blog | `/pt-br/blog` | Posts sobre trabalhos e novidades |
| Política de Privacidade | `/pt-br/privacidade` | Termos LGPD |

## Painel Administrativo (Privado)

| Página | Rota | Descrição |
|--------|------|-----------|
| Login | `/pt-br/admin` | Autenticação via Supabase Auth |
| Dashboard | `/pt-br/admin/dashboard` | Métricas: cliques, visitas, contatos |
| Posts | `/pt-br/admin/posts` | Listagem e gestão dos posts |
| Novo Post | `/pt-br/admin/posts/novo` | Editor com suporte a todos os locales |
| Editar Post | `/pt-br/admin/posts/[id]` | Edição com suporte a todos os locales |

> **Segurança:** Sem links no site público. Acesso apenas por URL digitada.

---

## Internacionalização (i18n)

| Locale | Idioma | Padrão | Detecção automática |
|--------|--------|--------|--------------------|
| `pt-BR` | Português (Brasil) | ✅ | Brasil e fallback |
| `en` | Inglês | — | Países de língua inglesa |
| `es` | Espanhol | — | Países hispano-falantes |

**Nenhuma string de texto deve ser hardcoded no código.** Tudo via arquivos `messages/*.json`.

---

## Serviços Oferecidos

| Serviço | Descrição |
|---------|----------|
| Diagnóstico de Infraestrutura de TI | Análise da estrutura atual e identificação de melhorias |
| Planejamento Estratégico de TI | Evolução tecnológica alinhada aos objetivos da empresa |
| Projetos de Infraestrutura Tecnológica | Redes, equipamentos, servidores, Wi-Fi |
| Consultoria para Novas Empresas | Apoio na escolha de tecnologias e estrutura inicial |
| Implantação e Gestão de Sistemas | ERPs, CRMs, sistemas financeiros e de produtividade |
| Consultoria em Segurança da Informação | Políticas de segurança, backup e controle de acesso |
| Transformação Digital | Modernização e digitalização de operações |
| Automação de Processos | Redução de tarefas manuais e aumento de produtividade |
| Treinamentos Corporativos | Capacitação em tecnologia e ferramentas empresariais |
| Desenvolvimento de Sites | Sites institucionais, landing pages, portfólios e blogs |
| Relatórios e Auditorias de TI | Inventário, avaliação de riscos e recomendações |

---

## Posicionamento

> **Consultoria • Gestão de TI • Infraestrutura • Desenvolvimento Web**

---

## Stack Tecnológica

| Camada | Tecnologia | Descrição |
|--------|-----------|----------|
| Framework | Next.js 15+ (App Router) | SSR, SSG, Middleware |
| Linguagem | TypeScript | Tipagem estática |
| Estilização | Tailwind CSS 4+ | Utility-first |
| i18n | next-intl | Multilíngue (pt-BR, en, es) |
| Backend/DB | Supabase | PostgreSQL, Auth, Storage |
| Hospedagem | Vercel | CI/CD + geolocalização |

---

## Planejamento por Fases

### Fase 1 — Fundação ✅
- [x] Documentação base (`contextos/`)
- [x] Design system (imagens de referência)
- [x] Projeto Next.js inicializado
- [x] Arquitetura admin definida
- [x] Arquitetura i18n definida

### Fase 2 — Setup Técnico ✅
- [x] Instalar dependências: `next-intl`, Lucide, React Hook Form, Zod, `@supabase/ssr`
- [x] Configurar `next-intl` (routing, middleware, messages)
- [x] Criar arquivos de tradução: `pt-BR.json`, `en.json`, `es.json`
- [x] Configurar clientes Supabase
- [x] Implementar `proxy.ts` (i18n + auth — Next.js 16)
- [x] Configurar `.env.example`

### Fase 3 — Site Público ✅
- [x] Header com `LanguageSwitcher`
- [x] Footer (ícones sociais via SVG inline)
- [x] MobileMenu (hamburger responsivo)
- [x] Página Home completa
- [x] Página Serviços completa
- [x] Página Sobre Nós completa
- [x] Página Política de Privacidade (LGPD)
- [x] Formulário de contato (react-hook-form + zod + consentimento LGPD)

### Fase 4 — Blog Público ✅
- [x] Listagem de posts (grid de cards com imagem, data, resumo)
- [x] Post individual com prose typography e Open Graph
- [x] SEO e meta tags por locale (hreflang, canonical)
- [x] `@tailwindcss/typography` instalado

### Fase 5 — Analytics ✅
- [x] Rastreamento de eventos (sem dados pessoais — Regra 6)
- [x] `page_view` por rota via `PageViewTracker`
- [x] `click_contato`, `click_whatsapp`, `click_servico`
- [x] Armazenamento no Supabase com locale

### Fase 6 — Painel Admin ✅
- [x] Login seguro com Server Action + rate limiting (5/min, bloqueio 15min)
- [x] Layout admin com navbar (Dashboard / Posts / Sair)
- [x] Dashboard de métricas (7/30/90 dias) via API protegida
- [x] Gestão de posts (listar, publicar, despublicar, excluir)
- [x] Editor multilingual (pt-BR / en / es) com auto-slug

### Fase 7 — Qualidade e Launch ✅
- [x] `robots.txt` gerado por Next.js (bloqueia /admin e /api)
- [x] `sitemap.xml` com todas as rotas públicas e hreflang
- [x] `generateMetadata` com `metadataBase`, title template e OpenGraph
- [x] 404 locale-aware com link traduzido
- [ ] Deploy na Vercel (pendente credenciais Supabase + domínio)
- [ ] Configuração de domínio
