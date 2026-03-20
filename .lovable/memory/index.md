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
3. Curso O Negociador: page https://ivobrasil.com.br/onegociador/, checkout R$697: https://checkout4.xgrow.com/pt/2ad70720-887e-4cc1-b2db-2854a18e029f/Njk5NTE=, checkout R$497: https://checkout4.xgrow.com/pt/2ad70720-887e-4cc1-b2db-2854a18e029f/Njg0Nzk=
4. Livro "Negociação sem Complicação": físico https://clubedeautores.com.br/livro/negociacao-sem-complicacao, digital https://checkout4.xgrow.com/pt/2ad70720-887e-4cc1-b2db-2854a18e029f/NzU2NDg=
5. Mentoria Master Individual (High Ticket) - link TBD
6. Mentoria em Grupo (High Ticket) - link TBD

## WhatsApp
Number: (46) 99923-8882 → wa.me/5546999238882

## Domain
- Hub: hub.ivobrasil.com.br (only quiz, codigo-da-negociacao, admin, mapa)
- Main site: ivobrasil.com.br (onegociador, imersao, livros, mentorias)

## Routes
/ → Hub (Index), /quiz, /codigo-da-negociacao, /admin, /admin/login, /admin/setup, /mapa

## Hero images
- Both Index and CodigoDaNegociacao use object-[center_20%] to keep Ivo's face visible

## Email notifications (Resend)
- From: Ivo Brasil <noreply@hub.ivobrasil.com.br>
- Domain hub.ivobrasil.com.br verified in Resend
- Recipients: dynamic from admin users in user_roles table

## Admin panel
- Redesigned with modern SaaS aesthetic (neutral, no gold accents)
- Must always include D7Footer ("Desenvolvido por D7 Company")
