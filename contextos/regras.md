# Regras do Projeto — HIVI Tecnologia

> Este documento define as diretrizes obrigatórias de desenvolvimento, controle de versão, documentação e conformidade legal. O cumprimento é mandatório para todos os colaboradores e agentes envolvidos no projeto.

---

## Regra 1 — Leitura Obrigatória Antes de Qualquer Implementação

Antes de iniciar qualquer desenvolvimento, modificação ou refatoração, **todos os documentos da pasta `/contextos` devem ser lidos integralmente**, na seguinte ordem:

1. `projeto.md` — escopo, serviços e objetivos
2. `estrutura.md` — arquitetura e tecnologias
3. `designe.md` — padrão visual
4. `regras.md` — este documento
5. `diario.md` — estado atual das implementações

> **Nenhuma linha de código deve ser escrita sem que todos os documentos tenham sido consultados.**

---

## Regra 2 — Controle de Versão: Commit e Push Obrigatórios

Ao finalizar qualquer implementação:

1. Revisar alterações
2. Atualizar documentação em `/contextos/`
3. Commit no formato:

```
tipo(escopo): descrição breve
```

**Tipos:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

4. Push imediatamente

> **Nunca deixe alterações sem commit. Nunca deixe commits sem push.**

---

## Regra 3 — Atualização Obrigatória da Documentação

Após cada implementação, atualizar:

| Documento | O que atualizar |
|-----------|----------------|
| `diario.md` | Status das tarefas |
| `estrutura.md` | Mudanças na arquitetura |
| `designe.md` | Novos componentes visuais |
| `projeto.md` | Fases e checkboxes |
| `README.md` | Estado atual do projeto |

---

## Regra 4 — Respeito à Estrutura e Integridade do Sistema

- Consultar `estrutura.md` antes de criar arquivos ou rotas
- Seguir as convenções de nomenclatura
- Nunca modificar sem revisão: `middleware.ts`, `next.config.ts`, `.env.local`, configurações Supabase

---

## Regra 5 — Instrução para Agentes de Inteligência Artificial

### Ao Iniciar:
1. Leia **todos** os documentos em `/contextos/`
2. Verifique `diario.md` (tarefas "Na Fila" ou "Em Progresso")
3. Não assuma nada — verifique na documentação

### Ao Finalizar:
1. Atualize `diario.md`
2. Atualize todos os documentos afetados
3. Commit + push (Regra 2)
4. Reporte o que foi feito

### Restrições:
- Nunca modifique variáveis de ambiente sem autorização
- Nunca exclua arquivos sem confirmação
- Nunca faça push para `main` com alterações não revisadas

---

## Regra 6 — Conformidade com a LGPD

- Consentimento explícito em formulários de contato
- Política de Privacidade sempre acessível (footer)
- Dados mínimos e justificados
- Tabela `eventos` sem IP, cookies ou dados pessoais
- Política de retenção de dados definida

---

## Regra 7 — Padrões de Qualidade de Código

| Critério | Padrão |
|----------|--------|
| Tipagem | TypeScript obrigatório. Sem `any` |
| Responsividade | Mobile, tablet e desktop |
| Acessibilidade | HTML semântico + ARIA |
| Performance | WebP, lazy loading, Core Web Vitals |
| SEO | Meta tags e Open Graph por locale |
| Código limpo | Sem `console.log` em produção |

---

## Regra 8 — Segurança do Painel Administrativo

### Acesso e Visibilidade
- A rota `/admin` **não deve ser linkada ou referenciada** em nenhuma parte do site público
- Sem botões, links, sitemap ou meta tags revelando o painel
- Acesso exclusivo por URL digitada manualmente

### Autenticação
- Supabase Auth com e-mail e senha
- Sessão server-side: cookie `HttpOnly; Secure; SameSite=Strict`
- JWT nunca exposto ao JavaScript cliente
- `middleware.ts` valida sessão em toda requisição a `/[locale]/admin/*`
- Sessão inválida: redirect imediato para login

### Proteção Contra Ataques
- **Rate limiting** no login: máximo 5 tentativas/min por IP; bloquear 15 min após exceder
- Mensagens de erro genéricas (nunca revelar se e-mail existe)
- Validação Zod em todos os inputs do admin (server-side obrigatório)
- Proteção CSRF em todas as Server Actions
- Headers no `next.config.ts`: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy`, `CSP`, `Permissions-Policy`

### Banco de Dados
- RLS habilitado em todas as tabelas
- Escrita em `posts`, leitura de `contatos` e `eventos`: restrito a `role = 'admin'`
- `SUPABASE_SERVICE_ROLE_KEY` nunca exposto ao cliente
- Logout invalida a sessão no servidor

---

## Regra 9 — Internacionalização: Zero Strings Hardcoded

**Nenhum texto visível ao usuário deve ser escrito diretamente no código.**

Toda string de interface — títulos, descrições, rótulos, mensagens de erro, placeholders, textos de botões, alt de imagens, textos do footer, textos do admin — deve obrigatoriamente estar nos arquivos de tradução:

```
hivi-tecnologia/messages/
  pt-br.json   ← português (PADRÃO)
  en.json      ← inglês
  es.json      ← espanhol
```

### Regras de Uso

| Proibido | Correto |
|----------|---------|
| `<h1>Consultoria em TI</h1>` | `<h1>{t('hero.title')}</h1>` |
| `placeholder="Seu nome"` | `placeholder={t('form.name_placeholder')}` |
| `alt="Logo da HIVI"` | `alt={t('common.logo_alt')}` |
| `toast('Enviado com sucesso')` | `toast(t('form.success_message'))` |

### Estrutura Obrigatória

- Toda chave adicionada em `pt-br.json` deve ser adicionada também em `en.json` e `es.json`
- Chaves ausentes em algum locale devem cair no locale padrão (`pt-BR`), nunca ficar vazia
- Nomes de chave: camelCase aninhado (`hero.title`, `nav.contact`, `footer.privacy_policy`)
- Nunca usar índices numéricos como chave (`item_0`, `service_1`) — use nomes descritivos

### Detecção Automática de Locale

O locale do usuário é detectado automaticamente pelo `middleware.ts` na seguinte ordem:
1. Cookie `NEXT_LOCALE` (preferência salva manualmente)
2. Header `x-vercel-ip-country` (geolocalização Vercel)
3. Header `Accept-Language` do browser
4. Fallback: `pt-BR`

O usuário pode alterar o idioma a qualquer momento pelo componente `LanguageSwitcher` no Header.
