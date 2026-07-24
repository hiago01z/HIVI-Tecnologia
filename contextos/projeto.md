# HIVI Tecnologia — Documento de Projeto

## Identificação

- **Nome:** HIVI Tecnologia
- **Segmento:** Consultoria • Gestão de TI • Infraestrutura • Desenvolvimento Web
- **Missão:** Entregar soluções tecnológicas estratégicas que potencializam negócios, reduzem custos e impulsionam a transformação digital de empresas de todos os portes.

---

## Ideia Central

Site empresarial da HIVI Tecnologia, desenvolvido para apresentar a empresa, seus serviços, portfólio e formas de contato. O site deve transmitir profissionalismo, credibilidade e inovação, conectando a empresa com potenciais clientes de forma clara e objetiva.

Além do site público, o projeto conta com um **painel administrativo privado** (`/admin`) para gestão de conteúdo do blog e monitoramento de métricas do site.

---

## Público-Alvo

- Empresas e empreendedores em busca de consultoria tecnológica
- Gestores de TI buscando parceiros estratégicos
- Pequenas e médias empresas em processo de transformação digital

---

## Páginas do Site Público

| Página | Rota | Descrição |
|--------|------|-----------|
| Home | `/` | Apresentação institucional, proposta de valor e CTA principal |
| Serviços | `/servicos` | Listagem detalhada de todos os serviços oferecidos |
| Sobre Nós | `/sobre` | História, missão, visão e equipe da HIVI |
| Blog | `/blog` | Posts sobre trabalhos, novidades e curiosidades tecnológicas |
| Política de Privacidade | `/privacidade` | Termos e políticas conforme a LGPD |

## Painel Administrativo (Privado)

| Página | Rota | Descrição |
|--------|------|-----------|
| Login | `/admin` | Tela de autenticação (e-mail + senha via Supabase Auth) |
| Dashboard | `/admin/dashboard` | Métricas: cliques, visitas, contatos recebidos |
| Posts | `/admin/posts` | Listagem e gestão dos posts do blog |
| Novo Post | `/admin/posts/novo` | Editor de novo post |
| Editar Post | `/admin/posts/[id]` | Edição de post existente |

> **Segurança:** A rota `/admin` **não possui link visível em nenhuma parte do site público**. O acesso é feito apenas digitando a URL manualmente. A autenticação é gerenciada pelo Supabase Auth com sessão server-side.

---

## Serviços Oferecidos

| Serviço | Descrição |
|---------|----------|
| Diagnóstico de Infraestrutura de TI | Análise da estrutura tecnológica atual e identificação de melhorias |
| Planejamento Estratégico de TI | Planejamento da evolução tecnológica alinhado aos objetivos da empresa |
| Projetos de Infraestrutura Tecnológica | Planejamento de redes, equipamentos, servidores, Wi-Fi e organização da TI |
| Consultoria para Novas Empresas | Apoio na escolha de equipamentos, sistemas, serviços em nuvem e estrutura tecnológica |
| Implantação e Gestão de Sistemas | Auxílio na implantação de ERPs, CRMs, sistemas financeiros, de estoque e produtividade |
| Consultoria em Segurança da Informação | Políticas de segurança, backup, controle de acesso e boas práticas |
| Transformação Digital | Modernização de processos e digitalização de operações |
| Automação de Processos | Implementação de automações para reduzir tarefas manuais e aumentar a produtividade |
| Treinamentos Corporativos | Capacitação em tecnologia, segurança digital e uso de ferramentas empresariais |
| Desenvolvimento de Sites | Criação de sites institucionais, landing pages, portfólios, blogs e sites para pequenas empresas |
| Relatórios e Auditorias de TI | Relatórios técnicos, inventário de ativos, avaliação de riscos e recomendações de melhorias |

---

## Posicionamento

> **Consultoria • Gestão de TI • Infraestrutura • Desenvolvimento Web**

---

## Stack Tecnológica

| Camada | Tecnologia | Descrição |
|--------|-----------|----------|
| Framework | Next.js 15+ (App Router) | SSR, SSG, ISR e API Routes |
| Linguagem | TypeScript | Tipagem estática em todo o projeto |
| Estilização | Tailwind CSS 4+ | Utility-first, responsivo por padrão |
| Backend/DB | Supabase (PostgreSQL) | Banco de dados, autenticação e storage |
| Hospedagem | Vercel | Deploy contínuo via Git |
| Autenticação Admin | Supabase Auth | E-mail + senha, sessão server-side |

---

## Planejamento por Fases

### Fase 1 — Fundação
- [x] Definição da estrutura do projeto
- [x] Criação dos documentos base (`contextos/`)
- [x] Design system definido com base nas imagens de referência
- [x] Inicialização do projeto Next.js (preset padrão)
- [x] Definição da arquitetura do painel admin

### Fase 2 — Desenvolvimento Core do Site Público
- [ ] Instalar dependências adicionais (Lucide, React Hook Form, Zod, Supabase JS)
- [ ] Configurar clientes Supabase
- [ ] Componentes globais (Header, Footer)
- [ ] Página Home
- [ ] Página Serviços
- [ ] Página Sobre Nós
- [ ] Página Política de Privacidade
- [ ] Formulário de contato com LGPD

### Fase 3 — Blog Público
- [ ] Página de listagem de posts
- [ ] Página individual de post (`/blog/[slug]`)
- [ ] SEO e meta tags

### Fase 4 — Analytics
- [ ] Rastreamento de cliques no botão de contato
- [ ] Rastreamento de visitas por página
- [ ] Armazenamento de eventos no Supabase

### Fase 5 — Painel Admin
- [ ] Middleware de autenticação (proteção de rotas `/admin/*`)
- [ ] Tela de login (`/admin`)
- [ ] Dashboard de métricas
- [ ] Listagem e gestão de posts
- [ ] Editor de posts (novo e edição)

### Fase 6 — Qualidade e Launch
- [ ] Testes de responsividade
- [ ] Auditoria de conformidade LGPD
- [ ] Otimização de performance
- [ ] Deploy na Vercel
- [ ] Configuração de domínio
