# DIP Design System

**DIP · Côte d’Ivoire / Destination Intelligence Platform**
Rota canônica `/dip`; aliases legados `/deep` e `/cote-conecta`.

## 1. Marca

- Lockup oficial preservado: `DIP` + `CÔTE D’IVOIRE`, assinatura *Destination Intelligence Platform*.
- O nome falado e escrito do produto é **DIP**. PUBLIC, EXPLORER e MINISTRY são perspectivas, não marcas. O namespace técnico legado `deep` permanece apenas internamente para compatibilidade.
- A marca **não** é gerada por IA. O componente `Lockup` (`src/deep/ui.tsx`) desenha o lockup em tipografia,
  com variantes `light` (fundos escuros) e `small` (topbars).

## 2. Tokens

Definidos em `src/deep/deep.css`, escopados no seletor raiz `.deep-app` — nada vaza para o Site D7.

| Token | Valor | Uso |
| --- | --- | --- |
| `--deep-ivory` | `#faf6ef` | fundo base (marfim) |
| `--deep-ivory-2` | `#f3ece1` | superfícies alternadas |
| `--deep-paper` | `#ffffff` | cartões |
| `--deep-navy` | `#0e2a47` | institucional, navegação, Ministry |
| `--deep-navy-900` | `#071a2c` | profundidade |
| `--deep-orange` | `#e8590c` | ação (Côte d’Ivoire) |
| `--deep-orange-soft` | `#fdece1` | destaque da Aya |
| `--deep-green` | `#2e6b4f` | confiança / conclusão / Explorer |
| `--deep-green-soft` | `#e6f0ea` | estados concluídos |
| `--deep-ink` | `#12212f` | texto principal |
| `--deep-muted` | `#5c6b7a` | texto secundário |
| `--deep-line` / `--deep-line-strong` | rgba navy 12% / 22% | bordas |
| `--deep-radius` | `16px` | raio padrão |
| `--deep-shadow` | sombra dupla suave | profundidade sutil |
| `--deep-nav-h` | `64px` | altura da bottom nav |

Tipografia: `Plus Jakarta Sans` (já carregada pelo site) para UI; `.deep-serif`
(Iowan/Palatino/Georgia) apenas em títulos editoriais de hero e hub.

## 3. Regra visual

- **Zero mockup de celular**: nenhuma moldura, notch, barra de status 9:41, bateria, sinal ou sombra de aparelho.
- Mobile: aplicação edge-to-edge no viewport real, com `env(safe-area-inset-*)` no topbar e na bottom nav.
- Desktop (≥1024px): a bottom nav desaparece, entra navegação horizontal (`.deep-desknav`); o Ministry ganha
  sidebar fixa de 248px. Nunca existe "tela de celular centralizada".
- Fotografia contemporânea em `public/deep/` + hero de Abidjan em `public/cote-conecta/abidjan-home.jpg`.
- Cartões elegantes: fundo papel, borda 1px navy 12%, sombra baixa, raio 16px.

## 4. Personagens

- **Aya** — guia pública. Mulher negra, avatar digital premium, acolhedora e cultural.
  Asset: `public/deep/aya.jpg`. Aparece só no Public. Nunca é apresentada como pessoa real nem como mascote.
- **Albie** — primeiro Explorer, identidade de creator demonstrativa com o retrato fornecido pelo cliente e incorporado localmente,
  com selo *Explorer verificado*. Nunca substituído pela Aya.
- **TAAG** — parceiro contextual: aparece na tela *Travel ready* e na tela *Intent*, onde a jornada
  pede voo, com CTA externo honesto para o site oficial. Nunca banner genérico.

## 5. Componentes

`src/deep/ui.tsx`: `Lockup`, `LangSwitcher`, `ChipGroup`, `Modal`, `Section`, `DemoFlag`, `Icon`.
`src/deep/JourneyMap.tsx`: mapa Leaflet (carregado sob demanda) com pinos numerados e rota tracejada laranja.

Estados cobertos: hover, pressed (`:active`), selected (`aria-pressed`), loading (typing da Aya, envio de
feedback), empty (`.deep-empty`), error (`role="alert"` nos formulários) e success (`role="status"`, badges verdes).

## 6. Acessibilidade

- HTML semântico (`header`, `main`, `nav`, `section`, `ul/li`, `table`, `dl`).
- Foco visível global (`:focus-visible`, outline laranja 3px).
- Alvos de toque ≥ 44×44 (`.deep-btn`, `.deep-chip`, `.deep-iconbtn`, itens da bottom nav com 64px de altura).
- `aria-current="page"` na navegação, `aria-pressed` em chips/checklists, `aria-live` no chat, nos toasts
  e nas confirmações.
- Modal com `role="dialog"`, `aria-modal`, foco inicial, fechamento por botão, `Escape` e clique externo.
- `prefers-reduced-motion` desliga animações e transições.


## 7. DIP Ministry e SGAT

- O Ministry é a camada institucional e desktop-first de inteligência, governança e integrações.
- SGAT aparece como infraestrutura oficial conectada em **Visão Geral** e detalhada em **Configurações**.
- A mensagem é complementar: SGAT organiza e-Administration, e-Tourism e valorização de dados; DIP acrescenta experiência, campanhas e inteligência internacional.
- Cabeçalho mobile do Ministry: botão explícito de retorno ao hub, seletor por bandeiras e uma única central de notificações/atividade.
- Inglês é o idioma inicial. PT-BR, FR-FR e EN-US são escolhas explícitas e persistidas.
