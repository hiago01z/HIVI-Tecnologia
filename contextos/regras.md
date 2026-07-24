# Regras do Projeto — HIVI Tecnologia

> Este documento define as diretrizes obrigatórias de desenvolvimento, controle de versão, documentação e conformidade legal. O cumprimento destas regras é mandatório para todos os colaboradores e agentes envolvidos no projeto.

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

Ao finalizar qualquer implementação, as seguintes ações são **mandatórias e devem ser executadas nessa ordem**:

1. Revisar todas as alterações realizadas
2. Atualizar os documentos relevantes em `/contextos/` (conforme a Regra 3)
3. Realizar o `git commit` com mensagem clara, descritiva e no seguinte formato:

```
tipo(escopo): descrição breve no imperativo

Detalhamento opcional das mudanças realizadas.
```

**Tipos aceitos:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Exemplos:**
```
feat(home): adiciona seção de serviços em destaque
fix(blog): corrige paginação de posts
docs(contextos): atualiza diario.md com implementações recentes
chore(deps): atualiza dependências do projeto
```

4. Realizar o `git push` imediatamente após o commit

> **Nunca deixe alterações sem commit. Nunca deixe commits sem push.**

---

## Regra 3 — Atualização Obrigatória da Documentação

Após concluir qualquer implementação, **todos os arquivos `.md` do projeto e o `README.md` devem ser atualizados** para refletir o estado real e atual do projeto:

| Documento | O que atualizar |
|-----------|----------------|
| `diario.md` | Registrar o que foi implementado com o status correto |
| `estrutura.md` | Atualizar caso haja mudança na arquitetura ou rotas |
| `designe.md` | Atualizar se houver novos componentes ou padrões visuais |
| `projeto.md` | Atualizar o planejamento (checkboxes e fases) |
| `README.md` | Manter sincronizado com o estado real do projeto |

> **Documentação desatualizada é considerada um erro de projeto tão grave quanto um bug em produção.**

---

## Regra 4 — Respeito à Estrutura e Integridade do Sistema

Antes de criar novos arquivos, rotas, componentes ou serviços:

- Consultar `estrutura.md` para compreender a organização estabelecida
- Verificar se já existe um padrão para o que se deseja implementar
- Seguir rigorosamente as convenções de nomenclatura e organização de pastas
- **Nunca modificar arquivos de configuração críticos** sem revisão cuidadosa:
  - `next.config.js` / `next.config.ts`
  - `.env.local` e arquivos de variáveis de ambiente
  - `tailwind.config.js`
  - Configurações do Supabase
  - Configurações da Vercel (`vercel.json`)

> **Quebrar a estrutura do projeto causa impacto direto em produção. Leia, analise e só então implemente.**

---

## Regra 5 — Instrução para Agentes de Inteligência Artificial

Se você é um agente de IA e está lendo este documento, as seguintes diretrizes se aplicam ao seu trabalho neste projeto:

### Ao Iniciar uma Implementação:
1. Leia **todos** os documentos em `/contextos/` antes de qualquer ação
2. Identifique no `diario.md` quais tarefas estão com status "Na Fila" ou "Em Progresso"
3. Compreenda o contexto completo antes de propor ou executar qualquer alteração
4. Não assuma nada — verifique na documentação. Em caso de dúvida, solicite esclarecimento

### Ao Finalizar uma Implementação:
1. Atualize o `diario.md` com o status correto das tarefas realizadas
2. Atualize todos os documentos afetados pela implementação
3. Realize o commit seguindo o padrão da Regra 2
4. Realize o push ao finalizar
5. Reporte o que foi feito de forma clara, objetiva e estruturada

### Restrições para Agentes:
- Nunca modifique variáveis de ambiente sem autorização explícita do responsável
- Nunca exclua arquivos, pastas ou registros do banco sem confirmação
- Nunca faça push para `main` com alterações não revisadas em ambiente de produção
- Sempre priorize a estabilidade e integridade do sistema em produção
- Sempre documente o que foi feito antes de encerrar a sessão

---

## Regra 6 — Conformidade com a LGPD

Todas as funcionalidades que envolvam coleta, armazenamento ou processamento de dados pessoais **devem seguir rigorosamente a Lei Geral de Proteção de Dados (Lei nº 13.709/2018)**:

- Todo formulário de contato deve ter consentimento explícito, claro e destacado do usuário
- A Política de Privacidade deve estar acessível em todas as páginas (obrigatoriamente no footer)
- Os dados coletados devem ser mínimos e justificados (princípio da necessidade e finalidade)
- O usuário deve ter mecanismo acessível para solicitar a exclusão de seus dados
- Nenhum dado pessoal deve ser compartilhado com terceiros sem base legal adequada
- Logs de acesso, armazenamento e uso de dados devem ser documentados e auditáveis
- A política de retenção de dados deve ser definida e respeitada

> **O descumprimento da LGPD pode resultar em sanções legais. A conformidade não é opcional.**

---

## Regra 7 — Padrões de Qualidade de Código

| Critério | Padrão Obrigatório |
|----------|-------------------|
| Tipagem | TypeScript obrigatório. Tipos bem definidos, sem uso de `any` |
| Responsividade | Todos os componentes devem funcionar em mobile, tablet e desktop |
| Acessibilidade | Tags semânticas HTML corretas e atributos ARIA onde necessário |
| Performance | Imagens otimizadas (WebP), lazy loading, Core Web Vitals monitorados |
| SEO | Meta tags, Open Graph e estrutura semântica em todas as páginas |
| Segurança | Validação de inputs em client e server, sanitização de dados, HTTPS |
| Código limpo | Sem variáveis não utilizadas, sem console.log em produção |
| Comentários | Apenas onde o "porquê" não é óbvio pelo código |
