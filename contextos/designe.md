# Design System — HIVI Tecnologia

> **Status:** Provisório. As imagens de referência do cliente serão recebidas em breve. Após o recebimento, este documento deve ser revisado e atualizado com a identidade visual oficial da HIVI Tecnologia antes de qualquer implementação visual.

---

## 1. Identidade Visual e Posicionamento

A HIVI Tecnologia é uma empresa de soluções tecnológicas com foco em profissionalismo, inovação e confiança. Toda a linguagem visual deve transmitir:

| Atributo | Como expressar |
|----------|---------------|
| **Autoridade técnica** | Design limpo, organizado, preciso |
| **Modernidade** | Tendências atuais, sem excessos |
| **Clareza** | Hierarquia visual bem definida |
| **Confiança** | Consistência, seriedade e estabilidade |

---

## 2. Paleta de Cores

> ⚠️ **Aguardando imagens de referência.** Paleta abaixo é provisória e deve ser validada com o cliente.

### Cores Primárias

| Nome | Hex | Token Tailwind | Uso Principal |
|------|-----|---------------|---------------|
| Azul Principal | `#1A56DB` | `blue-600` | CTAs, botões primários, links ativos |
| Azul Escuro | `#1E3A5F` | — | Header, backgrounds de destaque |
| Azul Claro | `#3B82F6` | `blue-500` | Hover states, acentos, ícones |

### Cores Neutras

| Nome | Hex | Token Tailwind | Uso Principal |
|------|-----|---------------|---------------|
| Fundo Principal | `#F9FAFB` | `gray-50` | Background de páginas |
| Branco | `#FFFFFF` | `white` | Cards, seções alternadas |
| Cinza Claro | `#E5E7EB` | `gray-200` | Bordas, divisores |
| Cinza Médio | `#6B7280` | `gray-500` | Textos secundários, placeholders |
| Cinza Escuro | `#374151` | `gray-700` | Textos de corpo |
| Preto Suave | `#111827` | `gray-900` | Títulos e textos em destaque |

### Cores de Suporte / Feedback

| Nome | Hex | Token Tailwind | Uso |
|------|-----|---------------|-----|
| Verde Sucesso | `#10B981` | `emerald-500` | Confirmações, badges positivos |
| Vermelho Erro | `#EF4444` | `red-500` | Alertas, erros de formulário |
| Amarelo Aviso | `#F59E0B` | `amber-500` | Avisos, notificações |

### Modo Escuro (Dark Mode — Opcional Fase 2)

| Nome | Hex | Uso |
|------|-----|-----|
| Fundo Escuro | `#0F172A` | Background principal |
| Superfície | `#1E293B` | Cards, containers |
| Borda Escura | `#334155` | Bordas sutis |

---

## 3. Tipografia

### Fontes Adotadas

| Tipo | Fonte | Alternativa | Carregamento |
|------|-------|------------|-------------|
| Títulos e Corpo | **Inter** | system-ui, sans-serif | Google Fonts |
| Código / Técnico | **JetBrains Mono** | monospace | Google Fonts (se necessário) |

**Pesos do Inter a importar:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold)

### Escala Tipográfica — Desktop

| Elemento | Tamanho | Peso | Line Height | Uso |
|----------|---------|------|------------|-----|
| H1 | 48px / 3rem | 800 | 1.1 | Títulos hero |
| H2 | 36px / 2.25rem | 700 | 1.2 | Títulos de seção |
| H3 | 24px / 1.5rem | 600 | 1.3 | Subtítulos de seção |
| H4 | 20px / 1.25rem | 600 | 1.4 | Títulos de cards |
| Lead | 18px / 1.125rem | 400 | 1.7 | Parágrafos de destaque |
| Corpo | 16px / 1rem | 400 | 1.6 | Texto padrão |
| Pequeno | 14px / 0.875rem | 400 | 1.5 | Labels, notas |
| Caption | 12px / 0.75rem | 500 | 1.4 | Legendas, metadados |

### Escala Tipográfica — Mobile

| Elemento | Tamanho Mobile |
|----------|-----------------|
| H1 | 32px / 2rem |
| H2 | 24px / 1.5rem |
| H3 | 20px / 1.25rem |
| H4 | 18px / 1.125rem |

---

## 4. Espaçamento

Sistema baseado em múltiplos de 4px, alinhado com os tokens do Tailwind CSS:

| Token | Valor | Tailwind | Aplicação típica |
|-------|-------|---------|------------------|
| xs | 4px | `p-1` | Espaço mínimo interno |
| sm | 8px | `p-2` | Padding compacto |
| md | 16px | `p-4` | Padding padrão de componentes |
| lg | 24px | `p-6` | Padding interno de cards |
| xl | 32px | `p-8` | Separação entre blocos |
| 2xl | 48px | `p-12` | Entre seções de uma página |
| 3xl | 64px | `p-16` | Seções maiores |
| 4xl | 96px | `p-24` | Hero sections |

---

## 5. Layout e Grid

### Container Principal

```css
max-width: 1280px;
padding-x: 24px;   /* mobile */
padding-x: 48px;   /* desktop */
margin: 0 auto;
```

### Sistema de Colunas

| Tela | Colunas | Uso típico |
|------|---------|------------|
| Mobile (< 768px) | 1 coluna | Empilhamento vertical |
| Tablet (768px+) | 2 colunas | Cards lado a lado |
| Desktop (1024px+) | 3–4 colunas | Grid de serviços/posts |

### Breakpoints Tailwind

| Prefixo | Largura mínima |
|---------|----------------|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `2xl:` | 1536px |

---

## 6. Componentes — Especificações

### Botões

| Variante | Fundo | Texto | Borda | Hover |
|----------|-------|-------|-------|-------|
| **Primário** | `#1A56DB` | Branco | — | `#1E3A5F` |
| **Secundário** | Transparente | `#1A56DB` | `#1A56DB` 1.5px | Fundo `blue-50` |
| **Ghost** | Transparente | `#374151` | — | Fundo `gray-100` |
| **Destrutivo** | `#EF4444` | Branco | — | `#DC2626` |

**Especificações gerais:**
- Border-radius: `8px`
- Padding: `12px 24px` (md) / `10px 20px` (sm) / `16px 32px` (lg)
- Transição: `all 200ms ease`
- Focus: outline azul 2px, offset 2px
- Tamanho mínimo de área de toque: `44x44px`

### Cards

- Background: `#FFFFFF`
- Borda: `1px solid #E5E7EB`
- Border-radius: `12px`
- Sombra padrão: `0 1px 3px rgba(0,0,0,0.08)`
- Sombra no hover: `0 4px 16px rgba(0,0,0,0.12)`
- Padding interno: `24px`
- Transição hover: `250ms ease`

### Inputs e Formulários

- Borda: `1px solid #D1D5DB`, radius `8px`
- Focus: `border-color: #1A56DB`, ring `2px rgba(26,86,219,0.2)`
- Altura padrão: `44px`
- Label: cinza escuro (`#374151`), peso 500, tamanho 14px
- Placeholder: `#9CA3AF`
- Mensagem de erro: vermelho `#EF4444`, tamanho 12px

### Header

- Fundo: `#FFFFFF` com sombra `0 1px 3px rgba(0,0,0,0.08)` ao scroll
- Posição: sticky, `top: 0`, `z-index: 50`
- Altura: `64px` (desktop) / `56px` (mobile)
- Conteúdo: Logo (esquerda) | Navegação (centro/direita) | CTA "Entrar em Contato" (direita)
- Mobile: menu hamburguer com slide lateral ou dropdown

### Footer

- Fundo: `#1E3A5F`
- Texto: `#E5E7EB` (principal) e `#9CA3AF` (secundário)
- Estrutura: Logo + Navegação + Redes Sociais + Copyright
- Link de **Política de Privacidade** sempre visível no footer
- Padding: `48px 0` (desktop) / `32px 0` (mobile)

### Seção Hero (Home)

- Altura mínima: `100vh` ou `min-h-screen`
- Fundo: gradiente de `#1E3A5F` para `#1A56DB` ou imagem com overlay
- Texto: branco
- Elementos: Título H1 + subtítulo + dois botões CTA (primário + secundário)
- Alinhamento: centralizado ou à esquerda (definir após referências visuais)

---

## 7. Iconografia

- **Biblioteca:** Lucide React (preferencial) ou Heroicons
- **Tamanhos padronizados:**
  - `16px` — ícones inline em textos
  - `20px` — ícones em botões e navegação
  - `24px` — ícones de destaque em listas
  - `48px` — ícones ilustrativos em cards de serviços
- **Cor:** herda da cor do texto ou `#1A56DB` para ícones de destaque
- **Formato alternativo:** SVG otimizado para ícones personalizados da marca

---

## 8. Animações e Transições

| Elemento | Duração | Easing | Observação |
|----------|---------|--------|------------|
| Hover em botões | 200ms | ease | Cor e sombra |
| Hover em cards | 250ms | ease | Sombra e leve elevação |
| Menu mobile | 300ms | ease-in-out | Slide ou fade |
| Fade de páginas | 200ms | ease | Entrada suave |
| Scroll animations | 400ms | ease-out | Entrada de seções |
| Tooltips | 150ms | ease | Aparecer/desaparecer |

**Princípio:** Animações devem ser sutis e funcionais. Nunca comprometer a usabilidade ou acessibilidade.

---

## 9. Imagens e Mídia

- **Formato preferido:** WebP (com fallback JPG/PNG para compatibilidade)
- **Ícones:** SVG sempre que possível
- **Hero:** proporção 16:9 ou 21:9
- **Miniaturas de blog:** proporção 16:9
- **Avatares:** proporção 1:1, border-radius `50%` ou `12px`
- **Todas as imagens** devem ter atributo `alt` descritivo e significativo
- **Otimização:** Next.js `<Image>` component obrigatório para imagens locais

---

## 10. Acessibilidade (A11y)

| Critério | Requisito |
|----------|----------|
| Contraste de texto | Mínimo WCAG AA: 4.5:1 (texto normal), 3:1 (texto grande) |
| Foco visível | Todos os elementos interativos com outline visível |
| Semântica HTML | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>` |
| Atributos ARIA | Usar onde o HTML semântico não é suficiente |
| Área de toque | Mínimo `44x44px` para elementos clicáveis em mobile |
| Texto alternativo | Toda imagem com conteúdo tem `alt` descritivo |
| Navegação por teclado | Tab, Enter e Esc funcionando em todos os componentes interativos |

---

> **Próximo passo obrigatório:** Receber as imagens de referência do cliente, extrair paleta de cores definitiva, tipografia e estilo visual oficial, e atualizar este documento antes de implementar qualquer componente visual.
