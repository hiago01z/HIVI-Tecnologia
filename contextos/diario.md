# Diário de Implementação — HIVI Tecnologia

> Registro cronológico de todas as implementações realizadas no projeto. Manter este documento sempre atualizado é obrigatório conforme as Regras do Projeto.

---

## Legenda de Status

| Ícone | Status | Descrição |
|-------|--------|-----------|
| ✅ | **Concluído** | Implementação finalizada, revisada e documentada |
| 🔄 | **Em Progresso** | Atualmente sendo desenvolvido |
| 📋 | **Na Fila** | Planejado, aguardando início |
| ❌ | **Bloqueado** | Impedido por dependência externa ou problema identificado |
| 🔁 | **Em Revisão** | Aguardando revisão, teste ou aprovação |

---

## Implementações Recentes

### 2026-07-24 — Configuração Inicial do Projeto

**Responsável:** Claude Code (Agente IA)  
**Branch:** `main`

#### ✅ Criação da pasta `contextos/` e documentação base

- Criação da estrutura de documentação do projeto em `/contextos/`
- **`projeto.md`** — Escopo completo, descrição de todos os 11 serviços, planejamento em 4 fases e stack tecnológica definida
- **`regras.md`** — 7 regras formais de desenvolvimento, incluindo conformidade LGPD, padrões de qualidade e instruções para agentes de IA
- **`designe.md`** — Design system provisório com paleta de cores, tipografia (Inter), escala de espaçamento, especificações de componentes (botões, cards, header, footer) e diretrizes de acessibilidade WCAG AA
- **`estrutura.md`** — Arquitetura completa do projeto (Next.js App Router), stack tecnológica, diagrama visual das páginas, esquema do banco de dados Supabase e convenções de nomenclatura
- **`diario.md`** — Este documento

**Commit:** `docs(contextos): configuração inicial dos documentos do projeto HIVI Tecnologia`

#### ✅ Decisão de arquitetura: contato e redes sociais via variáveis de ambiente

- Definido que número de telefone, WhatsApp, e-mail de contato e links de redes sociais **não serão hardcoded no código**
- Todos esses dados serão configurados via variáveis de ambiente (`NEXT_PUBLIC_*`) na Vercel e no `.env.local`
- `estrutura.md` atualizado com o template completo do `.env.example` incluindo as novas variáveis

**Commit:** `docs(contextos): adiciona variáveis de ambiente para telefone e redes sociais`

---

## Próximas Implementações

### Alta Prioridade

| # | Tarefa | Dependência | Status |
|---|--------|------------|--------|
| 1 | Receber imagens de referência do cliente e atualizar `designe.md` | Cliente | 📋 Na Fila |
| 2 | Inicializar projeto Next.js na pasta `HIVI-Tecnologia/` | — | 📋 Na Fila |
| 3 | Configurar Tailwind CSS + TypeScript + ESLint + Prettier | Tarefa 2 | 📋 Na Fila |
| 4 | Configurar Supabase (cliente server e client-side) | Tarefa 2 | 📋 Na Fila |
| 5 | Configurar `.env.example` no projeto com todas as variáveis definidas | Tarefa 2 | 📋 Na Fila |
| 6 | Implementar Header e Footer globais | Tarefa 3 + Design | 📋 Na Fila |
| 7 | Implementar página Home com todas as seções | Tarefa 6 | 📋 Na Fila |

### Média Prioridade

| # | Tarefa | Dependência | Status |
|---|--------|------------|--------|
| 8 | Implementar página Serviços | Tarefa 6 | 📋 Na Fila |
| 9 | Implementar página Sobre Nós | Tarefa 6 | 📋 Na Fila |
| 10 | Implementar Política de Privacidade (LGPD) | Tarefa 6 | 📋 Na Fila |
| 11 | Estruturar Blog com Supabase (tabela + listagem + post individual) | Tarefa 4 | 📋 Na Fila |
| 12 | Implementar formulário de contato com validação LGPD | Tarefa 4 | 📋 Na Fila |

### Baixa Prioridade

| # | Tarefa | Dependência | Status |
|---|--------|------------|--------|
| 13 | SEO completo: meta tags, Open Graph, sitemap, robots.txt | Fases anteriores | 📋 Na Fila |
| 14 | Otimização de performance (Core Web Vitals) | Fases anteriores | 📋 Na Fila |
| 15 | Testes de responsividade em todos os breakpoints | Fases anteriores | 📋 Na Fila |
| 16 | Auditoria final de conformidade LGPD | Fases anteriores | 📋 Na Fila |
| 17 | Configuração de domínio personalizado na Vercel | Deploy | 📋 Na Fila |

---

## Observações e Pendências Abertas

- ⚠️ **Design:** Aguardando imagens de referência do cliente para definir paleta de cores, tipografia e estilo visual definitivos. Atualizar `designe.md` antes de implementar qualquer componente visual.
- ⚠️ **Variáveis de ambiente:** Telefone, WhatsApp, e-mail e redes sociais a serem preenchidos na Vercel (produção) e no `.env.local` (desenvolvimento local) antes do início do desenvolvimento dos componentes de contato e footer.
- ⚠️ **Credenciais Supabase:** URLs e chaves a serem configuradas no momento do setup. Não versionar.
- ⚠️ **Domínio:** Verificar disponibilidade e adquirir domínio para a Vercel antes do deploy final.
