Ivo Brasil rebrand - design system, brand rules, and project structure

## Brand Identity
- Client: Ivo Brasil — strategist in complex negotiations, mentor, speaker
- Instagram: @ivobrasil1
- Colors: #000000 (black), #C1A87C (gold, HSL 38 36% 62%), #813C18 (copper, HSL 21 69% 30%)
- Font titles: Copperplate (loaded from /fonts/Copperplate.ttc), CSS class: font-copperplate
- Font body: Montserrat
- Style: Minimalist, elegant, contrasted, impactful. Dark backgrounds, uppercase titles, gold/white contrast.

## Products (Esteira)
1. Quiz: Diagnóstico de Perfil de Negociação (lead capture)
2. Código da Negociação: 90-day program, R$997 (10x R$117,90), route /codigo-da-negociacao, checkout: https://checkout4.xgrow.com/pt/2ad70720-887e-4cc1-b2db-2854a18e029f/MTAyOTY1
3. Curso O Negociador: route /o-negociador, checkout https://ivobrasil.com.br/onegociador/
4. Livro "Negociação sem Complicação": external link clubedeautores.com.br
5. Mentoria Master Individual (High Ticket) - link TBD
6. Mentoria em Grupo (High Ticket) - link TBD

## WhatsApp
Number: (46) 99923-8882 → wa.me/5546999238882

## Routes
/ → Hub (Index), /quiz, /codigo-da-negociacao, /o-negociador, /imersao-virando-a-mesa, /link-pendente, /admin, /admin/login, /admin/setup, /mapa

## Hero images
- Both Index and CodigoDaNegociacao use object-[center_20%] to keep Ivo's face visible

## Domain
- Hosted on TurbCloud (cPanel). Subdomain hub.ivobrasil.com.br planned for Lovable.

## Email notifications (Resend)
- Recipients: 0019.andrematheus@gmail.com, ledioprofissional@gmail.com
- From: Ivo Brasil <noreply@ivobrasil.com.br>
- RESEND_API_KEY configured in secrets
- Need to add Ivo's email(s) as recipients (pending from client)
- Domain ivobrasil.com.br needs DNS verification in Resend for custom sender

## Admin panel
- Redesigned with modern SaaS aesthetic (neutral, no gold accents)
- Must always include D7Footer ("Desenvolvido por D7 Company")
- Uses IvoLogo icon variant in header

## Pending items
- Background image adjustments: user gave up, don't touch unless asked
- Notify edge function: emails arrive but need Ivo's actual recipient emails
- Resend domain verification for ivobrasil.com.br (DNS records needed)
- Mentoria links TBD from client
