# Design System — HIVI Tecnologia

> **Status:** Definido com base nas imagens de referência fornecidas pelo cliente em 2026-07-24. Este documento é a fonte de verdade visual do projeto. Toda implementação de UI deve seguir estas especificações rigorosamente.

---

## 1. Identidade Visual e Posicionamento

A HIVI Tecnologia é uma empresa de soluções tecnológicas. O visual deve transmitir:

| Atributo | Como expressar no design |
|----------|-------------------------|
| **Autoridade técnica** | Azul profissional, layout limpo e estruturado |
| **Modernidade** | Degrâdê sutil, cards com sombra, tipografia bold |
| **Clareza** | Hierarquia visual forte, espaçamento genéroso |
| **Confiança** | Consistência de cores, sem excessos decorativos |

O estilo geral é **corporativo-tecnológico**: fundo claro com hero em degrâdê azul, seções alternadas entre branco e azul marinho profundo, botões e destaques em azul primário.

---

## 2. Paleta de Cores

### Cores Primárias

| Nome | Hex | Uso Principal |
|------|-----|---------------|
| **Azul Marinho** | `#162268` | Footer, seções escuras, barra de stats, header icon |
| **Azul Primário** | `#1565C0` | Botões CTA, cards em destaque, ícones de serviços |
| **Azul Médio** | `#1976D2` | Hover de botões, acentos secundários |
| **Azul Claro Hero** | `#5BA4E5` | Ponta do degrâdê do hero (canto superior direito) |

### Cores de Fundo

| Nome | Hex | Uso |
|------|-----|-----|
| **Branco** | `#FFFFFF` | Seções limpas, cards padrão, header |
| **Azul Suave** | `#EBF3FF` | Fundo de cards não-destacados, seções alternadas leves |
| **Degrâdê Hero** | `#F0F7FF` → `#C8DFFF` | Background da seção hero (esquerda para direita) |

### Cores de Texto

| Nome | Hex | Uso |
|------|-----|-----|
| **Texto Principal** | `#0D1117` | Títulos e corpo em fundo claro |
| **Texto Secundário** | `#4B5563` | Descrições, legendas em fundo claro |
| **Texto em Escuro** | `#FFFFFF` | Todo texto em seções de fundo marinho |
| **Texto Muted** | `#CBD5E1` | Textos secundários em fundo marinho |
| **Eyebrow/Label** | `#1565C0` | Texto de rótulo acima de títulos principais |

### Cores de Suporte

| Nome | Hex | Uso |
|------|-----|-----|
| **Verde Confirmação** | `#22C55E` | Ícones de checklist, badges positivos |
| **Vermelho** | `#EF4444` | Erros de formulário |
| **Borda Suave** | `#E2E8F0` | Bordas de cards, divisores |

---

## 3. Tipografia

### Fonte Adotada

| Tipo | Fonte | Alternativa |
|------|-------|--------------|
| Todo o site | **Inter** | system-ui, sans-serif |

**Pesos do Inter a importar:** 400, 500, 600, 700, 800

### Escala Tipográfica — Desktop

| Elemento | Tamanho | Peso | Cor padrão |
|----------|---------|------|------------|
| Eyebrow (rótulo acima do H1) | 13px | 600 | `#1565C0`, caixa alta, spacing 2px |
| H1 (hero) | 48–56px | 800 | `#0D1117` ou branco |
| H2 (seção) | 36px | 700 | `#0D1117` ou branco |
| H3 (card/sub) | 20–24px | 600 | herda |
| Número de stats | 48px | 800 | `#FFFFFF` |
| Label de stats | 14px | 400 | `#CBD5E1` |
| Corpo | 16px | 400 | `#4B5563` |
| Pequeno | 14px | 400 | `#4B5563` |

### Escala Mobile

| Elemento | Tamanho Mobile |
|----------|----------------|
| H1 | 32px |
| H2 | 24px |
| H3 | 18px |
| Número stats | 36px |

---

## 4. Espaçamento

Sistema baseado em múltiplos de 4px (Tailwind):

| Token | Valor | Uso típico |
|-------|-------|------------|
| xs | 4px | Gap mínimo |
| sm | 8px | Padding interno de badges/labels |
| md | 16px | Padding de componentes |
| lg | 24px | Padding interno de cards |
| xl | 32px | Separação entre blocos |
| 2xl | 64px | Padding vertical de seções |
| 3xl | 96px | Seções hero e principais |

---

## 5. Layout das Seções (Página Home)

### 5.1 Header / Navegação

- **Fundo:** `#FFFFFF`, sticky, sombra `0 1px 4px rgba(0,0,0,0.08)` ao rolar
- **Logo:** à esquerda
- **Links de navegação:** centro ou à direita — `Inicio | Serviços | Blog | Nosotros`
- **Botão CTA:** `Contato` — fundo `#1565C0`, texto branco, border-radius `6px`, à direita
- **Altura:** `64px` (desktop), `56px` (mobile)
- **Mobile:** menu hamburguer com drawer lateral

---

### 5.2 Seção Hero

**Layout:** Split 50/50 — texto à esquerda, imagem/mockup à direita

**Fundo:**
```css
background: linear-gradient(135deg, #F0F7FF 0%, #C8DFFF 60%, #9EC8FF 100%);
```

**Elementos:**
- Eyebrow: texto pequeno em maiúsculas, cor `#1565C0`, letter-spacing `2px`
- Título H1 em negrito, cor `#0D1117`
- Parágrafo descritivo
- Lista com ícones de check verde (`#22C55E`) + texto
- Botão CTA primário
- Imagem à direita: print de sistema/produto com sombra suave

**Altura mínima:** `100vh` ou `min-h-[600px]`

---

### 5.3 Faixa de Clientes / Logos

**Layout:** 1 linha centralizada com logos de clientes em escala de cinza

**Fundo:** `#FFFFFF`

**Título:** H2 centralizado + linha decorativa azul abaixo (`width: 60px, height: 3px, background: #1565C0`)

**Logos:** Grid horizontal, `grayscale` no CSS, `hover: grayscale(0)` para restaurar cores

---

### 5.4 Seção Escura — Proposta de Valor + Barra de Stats

**Fundo:** `#162268` (azul marinho profundo)

**Padrão de fundo opcional:** pontilhado ou mapa-múndi sutil em azul escuro transparente (SVG ou CSS)

**Conteúdo:**
- Título H2 e parágrafo centralizados, texto branco
- Grid 4 colunas com cards de estatísticas:

```
[  500+       ]  [  100+            ]  [  500+           ]  [  15+        ]
[  Clientes   ]  [  Trab. Personal. ]  [  Softwares Vend.]  [  Anos neg.  ]
```

**Card de stat:**
- Fundo: `rgba(255,255,255,0.08)` ou borda `rgba(255,255,255,0.2)` 1px
- Border-radius: `12px`
- Ícone no topo (branco ou azul claro)
- Número em 48px bold branco
- Label em 14px cor `#CBD5E1`

---

### 5.5 Seção de Serviços (Cards em 3 colunas)

**Fundo:** `#FFFFFF`

**Título + descrição:** centralizados

**Cards:**
- **Card padrão:** fundo `#EBF3FF`, borda nenhuma, border-radius `12px`, padding `24px`
- **Card destaque (central):** fundo `#1565C0`, texto branco — usado para destacar um serviço
- Ícone no topo do card (SVG)
- Título em H3
- Subtexto bold + lista de itens
- Botão `Iniciar Agora!` em cada card
  - Card padrão: botão fundo `#1565C0`, texto branco
  - Card destaque: botão fundo `#FFFFFF`, texto `#1565C0`

---

### 5.6 Faixa CTA Entre Seções

**Fundo:** `#1565C0` (azul primário)

**Conteúdo:** texto centralizado em branco + botão de ação

**Exemplo:** `"¿Quieres saber más? contáctenos ¡Herramientas Inteligentes Negocios Exitosos!"`

**Padding:** `20px 0` (compacto, é uma faixa horizontal, não uma seção)

---

### 5.7 Footer

**Fundo:** `#162268` (azul marinho profundo)

**Layout:** 4–5 colunas
```
[Logo + endereço + tel] | [Nosotros] | [Produtos] | [Artigos] | [Software & Desc.]
```

**Cor do texto:** `#FFFFFF` (títulos de coluna) e `#CBD5E1` (links e textos)

**Links do footer:**
- Sem underline padrão
- Hover: underline ou `#FFFFFF`

**Redes sociais:**
- Ícones de Twitter/X, Facebook, Instagram na base esquerda
- Estilo: círculos ou inerentes, cor branca

**Barra de copyright:**
- Fundo ligeiramente mais escuro ou linha separadora `rgba(255,255,255,0.15)`
- Texto: `© [ano] HIVI Tecnologia — Todos os direitos reservados`
- Alinhado à direita

---

## 6. Componentes — Especificações

### Botões

| Variante | Fundo | Texto | Border | Hover |
|----------|-------|-------|--------|-------|
| **Primário** | `#1565C0` | `#FFFFFF` | — | `#1A237E` |
| **Primário Invertido** | `#FFFFFF` | `#1565C0` | — | `#EBF3FF` |
| **Secundário** | Transparente | `#1565C0` | `#1565C0` 1.5px | fundo `#EBF3FF` |
| **Ghost Claro** | Transparente | `#4B5563` | — | fundo `#F1F5F9` |

**Especificações gerais:**
- Border-radius: `6px`
- Padding: `12px 28px` (md)
- Font-weight: 600
- Transição: `all 200ms ease`
- Área de toque mínima: `44x44px`

### Cards de Serviços

| Propriedade | Padrão | Destaque |
|-------------|---------|----------|
| Fundo | `#EBF3FF` | `#1565C0` |
| Texto | `#0D1117` | `#FFFFFF` |
| Ícone | `#1565C0` | `#FFFFFF` |
| Border | nenhuma | nenhuma |
| Border-radius | `12px` | `12px` |
| Padding | `24px` | `24px` |
| Sombra | `0 2px 8px rgba(21,101,192,0.08)` | `0 4px 20px rgba(21,101,192,0.35)` |

### Cards de Estatísticas (seção escura)

- Fundo: `rgba(255,255,255,0.07)`
- Borda: `1px solid rgba(255,255,255,0.15)`
- Border-radius: `12px`
- Padding: `32px 24px`
- Número: 48px, peso 800, cor `#FFFFFF`
- Label: 14px, cor `#CBD5E1`
- Ícone: 40px, cor `rgba(255,255,255,0.7)`, alinhado ao centro

### Inputs e Formulários

- Borda: `1px solid #CBD5E1`, border-radius `6px`
- Focus: `border-color: #1565C0`, ring `2px rgba(21,101,192,0.2)`
- Altura: `44px`
- Label: `#0D1117`, peso 500, 14px
- Placeholder: `#94A3B8`
- Erro: `#EF4444`, 12px

---

## 7. Iconografia

- **Biblioteca:** Lucide React (preferêncial)
- **Estilo:** outline (não preenchido), peso de linha consistente
- **Tamanhos:**
  - `20px` — navegação e botões
  - `24px` — listas e destaques inline
  - `40–48px` — ícones de cards de serviços e stats
- **Cor em fundo claro:** `#1565C0`
- **Cor em fundo escuro:** `#FFFFFF` ou `rgba(255,255,255,0.8)`
- **Ícone de checklist (hero/listas):** círculo azul `#1565C0` com check branco

---

## 8. Padrões de Seções — Alternância de Fundo

A home segue um padrão de alternância de fundos:

```
[HEADER]          → Branco
[HERO]            → Degrâdê azul claro (#F0F7FF → #C8DFFF)
[CLIENTES/LOGOS]  → Branco
[STATS + CTA]     → Azul Marinho (#162268)
[SERVIÇOS]       → Branco
[DESTAQUE PROD.]  → Azul Claro suave (#EBF3FF) ou Branco com imagem
[FAIXA CTA]       → Azul Primário (#1565C0)
[DEPOIMENTOS]     → Branco
[CONTATO/FORM]    → Azul Claro (#EBF3FF)
[FOOTER]          → Azul Marinho (#162268)
```

> Esta alternância cria ritmo visual sem uso de imagens complexas. Respeitar esta sequência em todas as páginas.

---

## 9. Animações e Transições

| Elemento | Duração | Easing |
|----------|---------|--------|
| Hover em botões | 200ms | ease |
| Hover em cards | 250ms | ease |
| Menu mobile (drawer) | 300ms | ease-in-out |
| Fade de entrada de seções (scroll) | 400ms | ease-out |
| Hover em logos de clientes | 300ms | ease |

**Princípio:** Animações sutis. Nada que desvie a atenção do conteúdo.

---

## 10. Imagens e Mídia

- **Formato:** WebP (fallback JPG/PNG)
- **Mockups de produto:** imagem de tela de sistema/software com sombra e leve inclinação perspectiva (como nas referências)
- **Logos de clientes:** PNG com fundo transparente, exibidos em `grayscale`, hover restaura cor
- **Hero image:** sempre à direita no layout split
- **Todas as imagens:** atributo `alt` descritivo obrigatório
- **Componente Next.js `<Image>`:** obrigatório para todas as imagens estáticas

---

## 11. Acessibilidade (A11y)

| Critério | Requisito |
|----------|-----------|
| Contraste texto/fundo | WCAG AA mínimo: 4.5:1 para texto normal |
| Foco visível | Outline azul `#1565C0` em todos os elementos interativos |
| HTML semântico | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>` |
| ARIA | Usar onde o HTML semântico não é suficiente |
| Área de toque | Mínimo `44x44px` em mobile |
| Alt em imagens | Obrigatório e descritivo |
| Tab/Enter/Esc | Navegação por teclado funcional |

---

## 12. Resumo Visual Rápido (Cheat Sheet)

```
AZUL MARINHO PROFUNDO  #162268  → footer, seções escuras, stats
AZUL PRIMÁRIO         #1565C0  → botões, cards destaque, ícones, faixa CTA
AZUL HOVER             #1976D2  → hover de botões
AZUL SUAVE             #EBF3FF  → cards padrão, fundos de seção alternada
DEGRÂDÊ HERO          #F0F7FF → #C8DFFF  → hero background
TEXTO ESCURO           #0D1117  → títulos em fundo claro
TEXTO CORPO            #4B5563  → parágrafos em fundo claro
TEXTO EM ESCURO        #FFFFFF  → todo texto em fundo marinho
VERDE CHECK            #22C55E  → ícones de checklist
FONTE                  Inter (400, 500, 600, 700, 800)
```
