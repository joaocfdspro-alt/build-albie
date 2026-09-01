# DIP UX Contract

Contrato funcional da experiência DIP (`/dip`, aliases legados `/deep` e `/cote-conecta`).
Tudo é determinístico e local: **nenhuma chamada de API externa no fluxo principal**.

## Canonical UI Map

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
|---|---|---|---|---|
| Select/Listbox | Native select for compact fixed choices | `src/deep/MinistryApp.tsx` and `src/deep/PublicApp.tsx` | native | keyboard + popup + locale |
| Form | DIP form primitives | `src/deep/PublicApp.tsx` and `src/deep/ExplorerApp.tsx` | create / edit | validation + keyboard |
| Toast | DIP live-region toast | `src/deep/DeepApp.tsx` | success / info / warning | live-region test |

## 1. Navegação

```
HUB (/dip)
 ├── PUBLIC   01 discover → 02 start → 03 chat (Aya) → 04 profile → 05 journey
 │            06 experiences (+ modal de experiência) → 07 business → 08 ready → 09 intent
 ├── EXPLORER 01 home → 02 mission → 03 agenda → 04 check-in → 05 log
 │            06 feedback → 07 support → 08 sent
 └── MINISTRY overview · travelers · journeys · creators · campaigns
              partners · feedback · reports · settings
```

- No Public, o retorno ao Hub DIP fica no menu sanduíche para manter o topbar limpo; o item Hub na sidebar do Ministry permanece disponível.
- Mobile: bottom nav com 5 destinos por perspectiva. Desktop: navegação horizontal (Public/Explorer)
  ou sidebar (Ministry).

## 2. Estado persistido

Chave `deep.state.v1` no `localStorage` (`src/deep/store.ts`):

| Campo | Conteúdo |
| --- | --- |
| `lang` | `pt` \| `fr` \| `en` |
| `profile` | origem, intenção, duração, companhia, estilo, interesses |
| `journeyIds` | experiências da jornada gerada |
| `savedIds` / `addedIds` | experiências salvas e adicionadas ao roteiro |
| `checklist` | itens marcados em *Travel ready* |
| `events` | fila de eventos (últimos 80) |
| `feedback` | contribuições do Explorer (público/privado/institucional) |
| `intentConfirmed` | intenção de viagem confirmada |
| `explorerCheckins` | check-ins de campo |

O botão **Limpar** no hub reseta a demonstração preservando o idioma.

## 3. Eventos locais

Emitidos por `pushEvent` e lidos pelo Ministry em tempo real.

| Evento | Origem | Disparo | Efeito no Ministry |
| --- | --- | --- | --- |
| `journey_generated` | public | confirmar perfil / regerar jornada | KPI *Jornadas* +1, linha `j-live`, atividade |
| `experience_viewed` | public | abrir modal de experiência | atividade |
| `experience_added` | public | adicionar ao roteiro | atividade |
| `business_interest` | public | explorar oportunidades | atividade |
| `readiness_opened` | public | abrir *Travel ready* | atividade |
| `partner_referral` | public | clicar em voos TAAG (ready ou intent) | KPI *Referrals TAAG* +1, card Partners, Creators (Albie) |
| `travel_intent_confirmed` | public | salvar jornada | KPI *Travel intents* +1 |
| `explorer_checkin` | explorer | check-in no destino | atividade, progresso da missão |
| `explorer_log` | explorer | registrar experiência | atividade |
| `explorer_feedback` | explorer | enviar contribuição | KPI *Sinais* +1, lista Feedback (badge `live`) |

Cada evento também dispara um toast `DIP · <evento> → Ministry`. Na central do Ministry, nomes técnicos são traduzidos para rótulos claros e localizados.

## 4. Tradução

- Dicionário em `src/deep/i18n.ts` (`pt` / `fr` / `en`), fallback para `en` e depois para a própria chave.
- Conteúdo editorial (experiências, agenda, setores, relatórios) é `Localized` em `src/deep/data.ts`,
  lido pelo helper `loc(value, lang)`.
- Inglês é o idioma padrão em um primeiro acesso. A troca é instantânea e a escolha explícita fica persistida; nada recarrega.
- Idioma e origem são campos **separados** na tela *Start*.
- `PT = Português (Brasil)`, `FR = Français (France)`, `EN = English (United States)`;
  o seletor usa `role="group"` + `aria-pressed` (não é `<select>` nativo).
- `document.documentElement.lang` acompanha a escolha.

## 5. Comportamento responsivo

| Faixa | Público / Explorer | Ministry |
| --- | --- | --- |
| < 1024px | edge-to-edge, bottom nav fixa, rail horizontal de sugestões, modal em folha inferior | tabs horizontais no topo, KPIs 2 colunas, tabelas com scroll horizontal |
| ≥ 1024px | navegação horizontal no topbar, hero em duas colunas, grade de experiências | sidebar fixa 248px, KPIs até 6 colunas, painéis em grade |

Breakpoints usados: 700 (modal centralizado), 780/800/900/1000 (grades), 1024 (desktop), 1200 (KPIs 6 col.).

## 6. Dados de demonstração

- Todos os números do Ministry partem de `BASE_METRICS`, `MARKETS`, `FUNNEL`, etc. e são **simulados**.
- Toda a área do Ministry exibe o selo `Dados simulados para demonstração`; o orçamento do Public exibe
  `Valores estimados para demonstração`; o chat da Aya declara ser conversa roteirizada.
- A rota é `noindex` para não competir com o Site D7 nos buscadores.

## 7. Isolamento

- Todo CSS vive em `src/deep/deep.css` sob `.deep-app`; `deep` é apenas namespace técnico legado e nenhum utilitário Tailwind do site é usado dentro do DIP.
- Nenhum componente de `src/components` do Site D7 é importado.
- Rotas externas: `/dip` é canônica; `/deep` e `/cote-conecta` permanecem como aliases.


## 8. Ministry: notificações, identidade e integrações

- Existe uma única central de notificações. Alertas institucionais e atividade recente de Public/Explorer aparecem no mesmo modal.
- Os eventos técnicos nunca são expostos como `journey_generated` ou rótulos canônicos internos; a UI usa frases claras no idioma ativo.
- Visitantes exibem nome demonstrativo e ID legível por mercado (ex.: `BR-1041`), preservando rastreabilidade sem expor identificadores opacos.
- O retrato fornecido de Albie é usado no Explorer e no Ministry; outros creators usam identidades visuais genéricas e não reivindicam pessoas reais.
- SGAT é governado pelo Ministry. A visão geral mostra o estado de conexão e Settings explica e-Administration, e-Tourism e valorização de dados.
- O retorno ao hub DIP é sempre explícito no mobile e permanece disponível na sidebar no desktop.

## 9. Public: sequência de descoberta

- A CTA da home inicia a sequência `origem → perfil de viagem → conversa com Aya → roteiro`.
- A conversa é determinística e local, mas responde por intenção e atualiza duração, companhia, estilo e interesses no perfil persistido.
- O roteiro oferece acesso direto a *Travel readiness* e voos TAAG; o cartão do mapa exibe a foto do ponto selecionado.
- O perfil é um resumo do DNA de viagem captado pela Aya; edição acontece no chat, não em accordions desconectados.
