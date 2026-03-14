import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, ExternalLink, Info, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const siteUrl = "https://ivobrasil.com.br";
const mapaUrl = `${siteUrl}/mapa`;

interface Item {
  label: string;
  url: string;
  why: string;
}

interface Section {
  title: string;
  fullUrl: string;
  description: string;
  items: Item[];
}

const sections: Section[] = [
  {
    title: "🏠 Página Inicial (Hub de Links)",
    fullUrl: `${siteUrl}/`,
    description:
      "É a porta de entrada do ecossistema do Ivo Brasil. Funciona como um Linktree premium e concentra todos os caminhos que a audiência pode percorrer. Quando o Ivo compartilha seu link principal em bio do Instagram, stories ou cartão de visita, é para cá que as pessoas vão.",
    items: [
      {
        label: "Diagnóstico de Negociação (Quiz)",
        url: `${siteUrl}/quiz`,
        why: "Link interno que leva ao quiz de 8 perguntas. Captura nome, e-mail e telefone do lead, classifica o perfil de negociação e gera dados estratégicos para a equipe.",
      },
      {
        label: "Código da Negociação (Programa de 90 dias)",
        url: `${siteUrl}/codigo-da-negociacao`,
        why: "Link interno para a página de vendas do programa principal — 90 dias para se tornar um negociador estratégico (R$997).",
      },
      {
        label: "Curso O Negociador",
        url: `${siteUrl}/o-negociador`,
        why: "Link interno para a página de vendas do curso O Negociador. Produto de entrada com foco em técnicas práticas de negociação.",
      },
      {
        label: "Imersão Virando a Mesa",
        url: `${siteUrl}/imersao-virando-a-mesa`,
        why: "Link interno para a página da imersão presencial focada em técnicas de negociação para empresários, gestores e empreendedores.",
      },
      {
        label: "Instagram @ivobrasil1",
        url: "https://instagram.com/ivobrasil1",
        why: "Link externo para o perfil do Instagram do Ivo. Aparece no rodapé como ícone clicável.",
      },
      {
        label: "YouTube @ivobrasil1",
        url: "https://www.youtube.com/@ivobrasil1",
        why: "Link externo para o canal do YouTube do Ivo. Aparece no rodapé como ícone clicável.",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/ivobrasil/?locale=pt",
        why: "Link externo para o perfil do LinkedIn do Ivo. Aparece no rodapé como ícone clicável.",
      },
      {
        label: "WhatsApp",
        url: "https://api.whatsapp.com/send/?phone=5527992936922&text&type=phone_number&app_absent=0",
        why: "Link direto para conversa no WhatsApp com o número (27) 99293-6922. Aparece nos botões de CTA e no rodapé.",
      },
    ],
  },
  {
    title: "🧠 Diagnóstico de Perfil de Negociação (Quiz Interativo)",
    fullUrl: `${siteUrl}/quiz`,
    description:
      "Quiz de 8 perguntas que identifica o perfil de negociação da pessoa. Ao final, ela preenche nome, e-mail e telefone para ver o resultado. Esses dados ficam salvos no banco de dados e a equipe recebe um e-mail automático com o relatório estratégico do lead.",
    items: [
      {
        label: "Resultado: Negociador Intuitivo (8–11 pontos)",
        url: "",
        why: "Lead frio — negocia sem método, perde dinheiro em cada conversa. A equipe deve focar em conteúdo educativo e sessão diagnóstica.",
      },
      {
        label: "Resultado: Negociador Reativo (12–18 pontos)",
        url: "",
        why: "Lead morno — cede sob pressão, sabe que precisa melhorar. Indicar o curso O Negociador e compartilhar cases de sucesso.",
      },
      {
        label: "Resultado: Negociador Consciente (19–25 pontos)",
        url: "",
        why: "Lead quente — busca método e consistência. Direcionar para o Código da Negociação com condição especial.",
      },
      {
        label: "Resultado: Negociador Estratégico (26–32 pontos)",
        url: "",
        why: "Lead premium — busca maestria e networking de alto nível. Oferecer mentoria individual ou masterclass exclusiva.",
      },
    ],
  },
  {
    title: "📖 Código da Negociação — Página de Vendas",
    fullUrl: `${siteUrl}/codigo-da-negociacao`,
    description:
      "Página de vendas do programa principal de 90 dias para se tornar um negociador estratégico. R$997. Contém hero, módulos, depoimentos, FAQ e botões de compra.",
    items: [
      {
        label: "Link de checkout (Xgrow)",
        url: "https://checkout4.xgrow.com/pt/2ad70720-887e-4cc1-b2db-2854a18e029f/MTAyOTY1",
        why: "Link de pagamento do programa Código da Negociação na plataforma Xgrow. Ao clicar em qualquer botão de compra, a pessoa preenche nome, e-mail e telefone e vai direto para o checkout.",
      },
      {
        label: "WhatsApp de dúvidas",
        url: "https://wa.me/5546999238882?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20o%20C%C3%B3digo%20da%20Negocia%C3%A7%C3%A3o.",
        why: "Botão que abre conversa no WhatsApp com o número (46) 99923-8882 para tirar dúvidas antes de comprar.",
      },
    ],
  },
  {
    title: "🎤 Curso O Negociador — Página de Vendas",
    fullUrl: `${siteUrl}/o-negociador`,
    description:
      "Página de vendas do curso O Negociador. Produto de entrada com técnicas práticas de negociação para quem está começando.",
    items: [
      {
        label: "Link de checkout",
        url: "https://ivobrasil.com.br/onegociador/",
        why: "Link de pagamento do curso O Negociador. Redireciona para a página de checkout externa.",
      },
      {
        label: "WhatsApp de dúvidas",
        url: "https://api.whatsapp.com/send/?phone=5527992936922&text&type=phone_number&app_absent=0",
        why: "Botão que abre conversa no WhatsApp com o número (27) 99293-6922.",
      },
    ],
  },
  {
    title: "🔥 Imersão Virando a Mesa",
    fullUrl: `${siteUrl}/imersao-virando-a-mesa`,
    description:
      "Página da imersão presencial focada em técnicas avançadas de negociação para aumentar o faturamento de empresários, gestores e empreendedores. Contém formulário de lista de espera.",
    items: [
      {
        label: "Formulário de lista de espera",
        url: "",
        why: "Captura nome, e-mail e telefone de interessados na imersão. Os dados ficam salvos no banco de dados para a equipe entrar em contato.",
      },
    ],
  },
  {
    title: "🔐 Painel Administrativo",
    fullUrl: `${siteUrl}/admin`,
    description:
      "Dashboard exclusivo e protegido por login onde a equipe acompanha em tempo real todos os leads capturados pelo quiz. Mostra métricas (total, novos hoje, score médio, perfil mais comum), gráfico de distribuição, busca, filtros e exportação CSV. Também permite gerenciar a equipe de administradores.",
    items: [
      {
        label: "Página de login",
        url: `${siteUrl}/admin/login`,
        why: "Acesso restrito — só entra quem tem e-mail e senha cadastrados como administrador.",
      },
      {
        label: "Dashboard principal",
        url: `${siteUrl}/admin`,
        why: "Visão geral dos leads com cards de métricas, tabela completa, filtros por diagnóstico e busca por nome/e-mail/telefone.",
      },
      {
        label: "Exportar leads em CSV",
        url: "",
        why: "Botão dentro do dashboard que baixa um arquivo .csv com todos os leads filtrados. Útil para importar em planilhas ou CRMs.",
      },
      {
        label: "Gestão de equipe",
        url: "",
        why: "Aba 'Equipe' no dashboard permite convidar novos administradores por e-mail para acessar o painel.",
      },
      {
        label: "Arquivar e excluir leads",
        url: "",
        why: "Menu de 3 pontinhos em cada lead permite arquivar (esconde da contagem mas preserva) ou excluir definitivamente.",
      },
    ],
  },
  {
    title: "📧 Sistema de Notificações por E-mail",
    fullUrl: "",
    description:
      "Sempre que alguém completa o quiz, um e-mail HTML profissional é disparado automaticamente com o nome do lead, contato, resultado do diagnóstico, 'temperatura' do lead (frio a premium), análise comportamental, próximo passo sugerido e oferta recomendada.",
    items: [
      {
        label: "Destinatários",
        url: "",
        why: "Os e-mails de notificação precisam ser configurados com os endereços da equipe do Ivo Brasil.",
      },
    ],
  },
];

/* ─── Shared content component (used in /mapa page and embedded in admin) ─── */
export const MapaContent = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-xl md:text-2xl font-black tracking-tight text-foreground mb-1">Mapa Completo do Projeto</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Guia de referência com todas as páginas, links, destinos, e-mails e fluxos automáticos do ecossistema Ivo Brasil.
        </p>
        <p className="text-xs text-muted-foreground/60 mt-1">
          Atualizado em {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Intro note */}
      <div className="bg-card border border-gold/20 rounded-xl p-5">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-gold shrink-0 mt-0.5" />
          <div className="space-y-2 text-sm text-foreground/80 leading-relaxed">
            <p className="font-bold text-foreground">📌 Como usar este documento</p>
            <p>
              Este mapa mostra <strong>tudo que existe no projeto</strong>: cada página, para onde cada botão leva, quais e-mails são disparados, para quem, e por quê.
            </p>
            <p>
              Se precisar alterar algum link, e-mail, telefone ou destino, basta nos informar qual item deste mapa precisa mudar. Faremos a atualização e este documento será atualizado automaticamente.
            </p>
            <p>
              <strong>🔗 Versão online (sempre atualizada):</strong>{" "}
              <a href={mapaUrl} target="_blank" rel="noopener noreferrer" className="text-gold underline break-all">
                {mapaUrl}
              </a>
            </p>
            <p className="text-xs text-muted-foreground">
              Prefira acessar a versão online para ver sempre a versão mais recente.
            </p>
          </div>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          className="bg-card border border-border/50 rounded-xl p-5"
        >
          <h2 className="text-base font-black text-foreground mb-1">{section.title}</h2>
          {section.fullUrl && (
            <p className="text-xs mb-3">
              <span className="text-muted-foreground">Link: </span>
              <a href={section.fullUrl} target="_blank" rel="noopener noreferrer" className="text-gold underline break-all">
                {section.fullUrl}
              </a>
            </p>
          )}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{section.description}</p>

          <div className="space-y-3">
            {section.items.map((item, j) => (
              <div key={j} className="border-l-2 border-border pl-4">
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                {item.url && (
                  <p className="text-xs text-gold mt-0.5">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="underline break-all inline-flex items-center gap-1">
                      <ExternalLink className="h-3 w-3 shrink-0" />
                      {item.url}
                    </a>
                  </p>
                )}
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">{item.why}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Summary */}
      <div className="bg-card border border-border/50 rounded-xl p-5">
        <h3 className="text-sm font-black text-foreground mb-3">📋 Resumo rápido de contatos e destinos</h3>
        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          <div className="space-y-2">
            <p className="font-bold text-foreground">Links de checkout:</p>
            <p className="text-muted-foreground">
              Código da Negociação →{" "}
              <span className="text-foreground break-all">A definir</span>
            </p>
            <p className="text-muted-foreground">
              O Negociador →{" "}
              <span className="text-foreground break-all">ivobrasil.com.br/onegociador/</span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-foreground">WhatsApp:</p>
            <p className="text-muted-foreground">
              Número: <span className="text-foreground">(27) 99293-6922</span>
            </p>
            <p className="text-muted-foreground">
              Link: <span className="text-foreground break-all">api.whatsapp.com/send/?phone=5527992936922</span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-foreground">Redes Sociais:</p>
            <p className="text-foreground">Instagram: @ivobrasil1</p>
            <p className="text-foreground">YouTube: @ivobrasil1</p>
            <p className="text-foreground">LinkedIn: /in/ivobrasil/</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-foreground">E-mails de notificação:</p>
            <p className="text-muted-foreground">A configurar com a equipe do Ivo</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground space-y-1 pt-2">
        <p>© {new Date().getFullYear()} Ivo Brasil · Desenvolvido por D7Company</p>
      </div>
    </div>
  );
};

/* ─── Standalone page at /mapa ─── */
const MapaDoProjeto = () => {
  const [lightMode, setLightMode] = useState(true);
  const handlePrint = () => window.print();

  return (
    <div className={`min-h-screen bg-background ${lightMode ? "admin-light" : ""} print:admin-light`}>
      {/* Nav */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50 print:hidden">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Voltar</span>
            </a>
            <div className="w-px h-5 bg-border/50" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Mapa do Projeto</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLightMode(!lightMode)}
              className="h-9 w-9 rounded-lg bg-secondary border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              title={lightMode ? "Modo escuro" : "Modo claro"}
            >
              {lightMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <Button onClick={handlePrint} size="sm" className="bg-gradient-gold-deep hover:opacity-90 text-xs font-bold gap-1.5 rounded-lg">
              <Download className="h-3.5 w-3.5" />
              Salvar como PDF
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-10 print:py-6 print:px-4">
        <MapaContent />
      </main>
    </div>
  );
};

export default MapaDoProjeto;
