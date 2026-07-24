# HIVI Tecnologia — Documento de Projeto

## Identificação

- **Nome:** HIVI Tecnologia
- **Segmento:** Consultoria • Gestão de TI • Infraestrutura • Desenvolvimento Web
- **Missão:** Entregar soluções tecnológicas estratégicas que potencializam negócios, reduzem custos e impulsionam a transformação digital de empresas de todos os portes.

---

## Ideia Central

Site empresarial da HIVI Tecnologia, desenvolvido para apresentar a empresa, seus serviços, portfólio e formas de contato. O site deve transmitir profissionalismo, credibilidade e inovação, conectando a empresa com potenciais clientes de forma clara e objetiva.

---

## Público-Alvo

- Empresas e empreendedores em busca de consultoria tecnológica
- Gestores de TI buscando parceiros estratégicos
- Pequenas e médias empresas em processo de transformação digital

---

## Páginas do Site

| Página | Rota | Descrição |
|--------|------|-----------|
| Home | `/` | Apresentação institucional, proposta de valor e CTA principal |
| Serviços | `/servicos` | Listagem detalhada de todos os serviços oferecidos |
| Sobre Nós | `/sobre` | História, missão, visão e equipe da HIVI |
| Blog | `/blog` | Posts sobre trabalhos, novidades e curiosidades tecnológicas |
| Política de Privacidade | `/privacidade` | Termos e políticas conforme a LGPD |

---

## Serviços Oferecidos

### Consultoria em Tecnologia da Informação

Orientação estratégica para empresas e empreendedores que buscam maturidade tecnológica.

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
| Framework | Next.js 14+ (App Router) | SSR, SSG, ISR e API Routes |
| Linguagem | TypeScript | Tipagem estática em todo o projeto |
| Estilização | Tailwind CSS | Utility-first, responsivo por padrão |
| Backend/DB | Supabase (PostgreSQL) | Banco de dados, autenticação e storage |
| Hospedagem | Vercel | Deploy contínuo via Git |

---

## Planejamento por Fases

### Fase 1 — Fundação
- [x] Definição da estrutura do projeto
- [x] Criação dos documentos base (`contextos/`)
- [ ] Recebimento das imagens de referência do design
- [ ] Configuração do ambiente (Next.js + Supabase + Vercel)
- [ ] Implementação do layout base e design system

### Fase 2 — Desenvolvimento Core
- [ ] Componentes globais (Header, Footer, Navigation)
- [ ] Página Home
- [ ] Página Serviços
- [ ] Página Sobre Nós
- [ ] Página Política de Privacidade
- [ ] Formulário de contato com integração LGPD

### Fase 3 — Blog e Conteúdo
- [ ] Estrutura do Blog com Supabase
- [ ] Listagem e paginação de posts
- [ ] Página individual de post (`/blog/[slug]`)
- [ ] SEO e meta tags em todas as páginas

### Fase 4 — Qualidade e Launch
- [ ] Testes de responsividade (mobile, tablet, desktop)
- [ ] Auditoria de conformidade LGPD
- [ ] Otimização de performance (Core Web Vitals)
- [ ] Deploy na Vercel
- [ ] Configuração de domínio personalizado
