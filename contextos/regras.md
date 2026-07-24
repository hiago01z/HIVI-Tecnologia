# Regras do Projeto — HIVI Tecnologia

> Este documento define as diretrizes obrigatórias de desenvolvimento, controle de versão, documentação e conformidade legal. O cumprimento é mandatório para todos os colaboradores e agentes envolvidos no projeto.

---

## Regra 1 — Leitura Obrigatória Antes de Qualquer Implementação

Antes de iniciar qualquer desenvolvimento, modificação ou refatoração, **todos os documentos da pasta `/contextos` devem ser lidos integralmente**, na seguinte ordem:

1. `projeto.md` — compreender escopo, serviços e objetivos
2. `estrutura.md` — entender a arquitetura e tecnologias adotadas
3. `designe.md` — respeitar o padrão visual estabelecido
4. `regras.md` — este documento
5. `diario.md` — verificar o estado atual das implementações

> **Nenhuma linha de código deve ser escrita sem que todos os documentos tenham sido consultados e compreendidos.**

---

## Regra 2 — Controle de Versão: Commit e Push Obrigatórios

Ao finalizar qualquer implementação, as seguintes ações são **mandatórias**:

1. Revisar todas as alterações
2. Atualizar os documentos relevantes em `/contextos/`
3. Commit com mensagem descritiva no formato:

```
tipo(escopo): descrição breve

Detalhamento opcional.
```

**Tipos:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

4. Push imediatamente após o commit

> **Nunca deixe alterações sem commit. Nunca deixe commits sem push.**

---

## Regra 3 — Atualização Obrigatória da Documentação

Após concluir qualquer implementação, **todos os arquivos `.md` e o `README.md` devem ser atualizados**:

| Documento | O que atualizar |
|-----------|----------------|
| `diario.md` | Status das tarefas realizadas |
| `estrutura.md` | Mudanças na arquitetura ou rotas |
| `designe.md` | Novos componentes ou padrões visuais |
| `projeto.md` | Fases e planejamento (checkboxes) |
| `README.md` | Estado atual do projeto |

> **Documentação desatualizada é considerada um erro de projeto.**

---

## Regra 4 — Respeito à Estrutura e Integridade do Sistema

- Consultar `estrutura.md` antes de criar arquivos, rotas ou componentes
- Seguir as convenções de nomenclatura estabelecidas
- **Nunca modificar arquivos críticos** sem revisão documentada:
  - `middleware.ts`, `next.config.ts`, `.env.local`, configurações Supabase, `vercel.json`

> **Quebrar a estrutura impacta produção. Leia antes de agir.**

---

## Regra 5 — Instrução para Agentes de Inteligência Artificial

Se você é um agente de IA lendo este documento:

### Ao Iniciar:
1. Leia **todos** os documentos em `/contextos/`
2. Verifique `diario.md` para identificar tarefas "Na Fila" ou "Em Progresso"
3. Não assuma nada — verifique na documentação

### Ao Finalizar:
1. Atualize `diario.md` com status correto
2. Atualize todos os documentos afetados
3. Realize commit e push seguindo a Regra 2
4. Reporte o que foi feito de forma clara

### Restrições:
- Nunca modifique variáveis de ambiente sem autorização explícita
- Nunca exclua arquivos ou registros sem confirmação
- Nunca faça push para `main` com alterações não revisadas
- Sempre priorize estabilidade do sistema em produção

---

## Regra 6 — Conformidade com a LGPD

Todas as funcionalidades que envolvam dados pessoais devem seguir **rigorosamente a Lei nº 13.709/2018**:

- Todo formulário de contato exige consentimento explícito e destacado
- Política de Privacidade acessível em todas as páginas (footer obrigatório)
- Dados mínimos e justificados (princípio da necessidade)
- Mecanismo de solicitação de exclusão de dados acessível ao usuário
- A tabela `eventos` (analytics) **não deve armazenar IP, cookies ou qualquer dado pessoal**
- Política de retenção de dados definida e respeitada

> **O descumprimento da LGPD pode resultar em sanções legais.**

---

## Regra 7 — Padrões de Qualidade de Código

| Critério | Padrão |
|----------|--------|
| Tipagem | TypeScript obrigatório. Sem `any` |
| Responsividade | Mobile, tablet e desktop |
| Acessibilidade | Tags semânticas + ARIA |
| Performance | WebP, lazy loading, Core Web Vitals |
| SEO | Meta tags e Open Graph em todas as páginas |
| Segurança | Validação Zod no client e server, HTTPS, sem secrets no frontend |
| Código limpo | Sem variáveis não usadas, sem `console.log` em produção |

---

## Regra 8 — Segurança do Painel Administrativo

O painel `/admin` lida com acesso privilegiado ao sistema. As seguintes medidas são **obrigatórias e não negociáveis**:

### Acesso e Visibilidade
- A rota `/admin` **não deve ser linkada, referenciada ou mencionada** em nenhuma parte do site público
- Nenhum botão, link, sitemap, `robots.txt` ou meta tag deve revelar a existência do painel
- Acesso exclusivamente por URL digitada manualmente pelo administrador

### Autenticação
- Autenticação via **Supabase Auth** com e-mail e senha
- Sessão gerenciada **server-side** via cookie `HttpOnly; Secure; SameSite=Strict`
- O token JWT **nunca deve ser exposto ao JavaScript do cliente**
- Validação da sessão feita no `middleware.ts` do Next.js em **toda requisição** a `/admin/*`
- Se a sessão for inválida ou expirada: redirect imediato para `/admin` (tela de login)

### Proteção Contra Ataques
- **Rate limiting** na rota de login: máximo de 5 tentativas por minuto por IP
- Após exceder o limite: bloquear por 15 minutos com resposta genérica (sem indicar o motivo)
- **Mensagens de erro genéricas** no login: nunca informar se o e-mail existe ou não
- Validação com Zod em todos os inputs do admin (server-side obrigatório)
- **Proteção contra CSRF** em todas as Server Actions
- Headers de segurança configurados no `next.config.ts`:
  ```
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: (restritivo)
  Permissions-Policy: (restritivo)
  ```

### Banco de Dados
- **Row Level Security (RLS)** habilitado em todas as tabelas
- Escrita em `posts` e leitura de `contatos` e `eventos` restritas a usuários com `role = 'admin'` no Supabase
- O `SUPABASE_SERVICE_ROLE_KEY` **nunca é exposto ao cliente** — apenas em Server Components e API Routes

### Regras Gerais
- Nunca armazenar senha em texto puro (Supabase Auth faz o hash automaticamente)
- Logout deve invalidar a sessão no servidor, não apenas no cliente
- Qualquer modificação no `middleware.ts` deve ser revisada cuidadosamente antes do push
