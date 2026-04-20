

## Entrega

Vou gerar **dois arquivos Markdown** em `/mnt/documents/`, prontos pra colar no Lovable:

1. **`prompt-matriz-VAZIO.md`** — template em branco com placeholders `{{...}}` para qualquer cliente futuro
2. **`prompt-FABIO-FSM.md`** — o mesmo prompt já preenchido com os dados extraídos do PDF do Fabio Souza (FSM)

Ambos seguem a mesma estrutura, na mesma ordem, para que você possa comparar lado a lado e entender exatamente o que precisa trocar em cada novo cliente.

---

## Estrutura comum dos dois prompts

### Bloco A — Descrição executiva
Parágrafo curto explicando o que será construído: hub de autoridade pessoal + quiz diagnóstico com IA + esteira de produtos + painel admin + mapa interno do projeto.

### Bloco B — Tabela de variáveis do cliente
Identidade, marca (cores HSL, fontes), assets, contato, links, integrações. No vazio: `{{NOME_CLIENTE}}`, `{{COR_PRIMARIA_HSL}}`, etc. No preenchido: já com "Fabio Souza", "FSM", azul petróleo, etc.

### Bloco C — Stack & arquitetura
React 18 + Vite + TS + Tailwind + shadcn/ui + framer-motion + react-router + Lovable Cloud (Supabase) + Resend + Meta Pixel.

### Bloco D — Rotas
`/`, `/quiz`, `/{{slug-flagship}}`, `/agenda` (ou link externo), `/mapa`, `/admin/login`, `/admin`, `/admin/setup`, `/link-pendente`, `/*` (404).

### Bloco E — Design system
- Tokens HSL semânticos no `index.css` (lista completa)
- Tokens de marca: `--brand`, `--brand-light`, `--brand-dark` (substituem o "gold" do template Ivo)
- Utilitários: `.text-gradient-brand`, `.bg-gradient-brand-deep`, `.shadow-brand-intense`, `.glow-brand`, `.line-brand`
- Tipografia via Google Fonts no `index.html` + `tailwind.config.ts` (`fontFamily.heading`, `fontFamily.body`)
- Regras: dark/claro conforme cliente, títulos uppercase, hero centralizado em coluna `max-w-md` com fades laterais, sem cores hardcoded

### Bloco F — Banco de dados (migrations)
- `profiles` (id, user_id, full_name, email)
- `user_roles` + enum `app_role` + função `has_role()` SECURITY DEFINER
- `quiz_leads` (id, name, email, phone, score, profile, answers jsonb, diagnostic, created_at)
- RLS: insert público em leads; select/update só admin

### Bloco G — Edge functions
- `quiz-diagnostic` — chama Lovable AI (`google/gemini-2.5-flash`)
- `send-user-diagnostic` — Resend, envia diagnóstico ao lead
- `notify-new-lead` — Resend, notifica admins
- `setup-first-admin` — protegida por `ADMIN_SETUP_KEY`
- `invite-admin` — admin logado convida outros admins

### Bloco H — Componentes-chave
Inclui o código completo de:
- `HubLink.tsx` (com variantes primary/secondary/highlight)
- `D7Footer.tsx` (`©{{ANO}} {{NOME_CLIENTE}} — Desenvolvido por D7 Company` → https://www.d7company.com.br/tech)
- `IvoLogo.tsx` → renomear para `BrandLogo.tsx`
- Estrutura do `Index.tsx` (hero + hub links)

### Bloco I — Quiz (lógica parametrizável)
- 8 perguntas múltipla escolha (1–4 pts) + 1 aberta opcional
- Score 8–32 → 4 perfis nomeados pelo cliente
- Tracking Meta Pixel: `QuizStart`, `QuizStep` (com nº), `QuizOpenQuestion`, `QuizLeadForm`, `QuizComplete`
- Resultado: badge circular + 3 cards (Observação / Perspectiva / Recomendação)

### Bloco J — Painel admin
Login Supabase Auth, lista de leads + filtros + painel lateral, gráfico de distribuição de perfis, convite de admins, theme toggle, tutorial de onboarding. Estética SaaS neutra (sem cor de marca).

### Bloco K — Integrações
- Meta Pixel `{{META_PIXEL_ID}}` no `index.html`
- OG tags + favicon padronizados
- WhatsApp flutuante: `wa.me/55{{WHATSAPP}}`
- Resend `from`: `{{NOME_CLIENTE}} <noreply@{{DOMINIO_HUB}}>`

### Bloco L — Secrets necessários
Lista que o **desenvolvedor (você)** precisa criar/configurar para o cliente:
- `RESEND_API_KEY` — criar conta Resend, verificar domínio do cliente, gerar chave
- `ADMIN_SETUP_KEY` — gerar string forte (única por projeto)
- `LOVABLE_API_KEY` — auto via Cloud
- Supabase keys — auto via Cloud
- Domínio Resend verificado: `{{DOMINIO_HUB}}`
- Pixel da Meta criado no Business Manager → ID em `{{META_PIXEL_ID}}`

### Bloco M — Checklist de trocas obrigatórias
10–15 itens numerados (logo, favicon, OG image, cores no `index.css`, fontes, links de checkout, WhatsApp, Pixel ID, perguntas do quiz, perfis, copy do hero, footer, etc.)

### Bloco N — Prompt pronto pra colar no Lovable
Versão consolidada em fases (1. Setup → 2. DB → 3. Hub+quiz → 4. Páginas de produto → 5. Admin → 6. Integrações → 7. Mapa).

---

## Diferença específica do `prompt-FABIO-FSM.md`

Já vem preenchido com tudo que o PDF entregou:

- **Cliente:** Fabio Souza · **Empresa:** FSM · **Email:** fabio@fsmadvisory.com.br
- **Tema:** claro · **Mood:** sério, profissional, corporativo
- **Paleta HSL completa** (azul petróleo `215 35% 40%`, etc. — copiada literal do PDF)
- **Fontes:** Plus Jakarta Sans (títulos) + Inter (corpo)
- **Hero copy:**
  - Eyebrow: "De dono para dono"
  - Título: "Desbloqueie o Valor Real do seu Negócio"
  - Subtítulo: "Clareza financeira e estratégia de otimização para empresas que buscam o próximo patamar de crescimento e lucratividade."
- **Hub Links** (5, na ordem do PDF): Agende uma Conversa (calendar.app.google/uVHoHgZXgiVbC9EU9), Nossa Abordagem, Casos de Sucesso, Instagram (@fabiosouzamc), WhatsApp (pendente)
- **Quiz adaptado ao nicho:** "Diagnóstico de Maturidade Financeira da sua Empresa" — 8 perguntas sobre demonstrações contábeis, valuation, carga tributária, custos, crédito, governança, profissionalização. 4 perfis: *Empresa Reativa* / *Em Estruturação* / *Profissionalizada* / *Pronta pra Escalar*.
- **Esteira de produtos** baseada no modelo de entrega do Fabio:
  1. **Diagnóstico Spot** (relatório de riscos e oportunidades — lead magnet pago baixo)
  2. **Planejamento Tributário** (entrega de regime + DRE projetada)
  3. **Valuation** (quanto vale o negócio)
  4. **Encontros On-Demand** (consultoria por sessão)
  5. **Mão na Massa** (acompanhamento mensal — high ticket)
- **Seção "Trajetória"** humanizada (história pessoal, 25 anos de mercado, dono pra dono)
- **Seção "Pilares"** estruturada em Pilar Informacional + Pilar de Otimização
- **Caso de sucesso** destacado: empresa que saiu de R$ 3M endividada → R$ 8M com R$ 8M em créditos tributários levantados
- **Footer:** `© 2026 FSM — Clareza e Resultados para o seu Negócio • Desenvolvido por D7 Company`
- **Pendências marcadas explicitamente** no topo do arquivo: `WhatsApp`, `Página de checkout`, `Logo oficial`, `Foto hero`, `Favicon`, `OG image`, `Domínio hub`, `Pixel ID` — para você coletar com o cliente antes de rodar

---

## Detalhes técnicos

- Ambos arquivos são **Markdown puro**, ~20–30 KB cada
- Salvos em `/mnt/documents/` e entregues como `<lov-artifact>` para download
- O prompt vazio usa sintaxe `{{NOME_VARIAVEL}}` consistente (fácil de buscar e substituir)
- O prompt do Fabio inclui um **bloco "Pendências do cliente"** no topo destacando o que ainda falta (WhatsApp, checkout, fotos, logo) para você não esquecer de coletar antes de gerar o projeto
- Sem código de senhas reais — apenas instruções de qual secret criar e onde colar

