import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, ExternalLink, Info, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const siteUrl = "https://mariasdobrasil.online";
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
      "É a porta de entrada do ecossistema. Funciona como um Linktree premium e concentra todos os caminhos que a audiência pode percorrer. Quando a Maria compartilha seu link principal em bio do Instagram, stories ou cartão de visita, é para cá que as pessoas vão.",
    items: [
      {
        label: "Comunidade Marias do Brasil (WhatsApp)",
        url: "https://chat.whatsapp.com/FHFoHxuJC6CDHiyJ1z6Bw8",
        why: "Grupo gratuito no WhatsApp. Serve para criar senso de comunidade e manter contato recorrente com a audiência. Quem entra no grupo recebe conteúdo e eventualmente é convidada para produtos pagos.",
      },
      {
        label: "Aulão: Destrave Sua Voz",
        url: `${siteUrl}/aulao`,
        why: "Link interno que leva à página do aulão gratuito. Funciona como isca de valor — a pessoa assiste e fica aquecida para o produto principal.",
      },
      {
        label: "Diagnóstico da Sua Voz (Quiz)",
        url: `${siteUrl}/quiz`,
        why: "Link interno que leva ao quiz. Captura nome, e-mail e telefone do lead, e classifica o perfil vocal dela. Gera dados estratégicos para a equipe.",
      },
      {
        label: "Liberte Sua Voz (Produto Principal)",
        url: `${siteUrl}/liberte-sua-voz`,
        why: "Link interno para a página de vendas do programa completo (12x R$103,21). É o principal produto do ecossistema.",
      },
      {
        label: "Sua Primeira Palestra (Workshop)",
        url: `${siteUrl}/sua-primeira-palestra`,
        why: "Link interno para a página de vendas do workshop de 3 aulas (R$97). Produto de entrada, mais acessível.",
      },
      {
        label: "Instagram @mariamarcelinoavoz",
        url: "https://instagram.com/mariamarcelinoavoz",
        why: "Link externo para o perfil do Instagram da Maria. Aparece no rodapé como ponto de contato e prova social.",
      },
    ],
  },
  {
    title: "🎬 Aulão: Destrave Sua Voz",
    fullUrl: `${siteUrl}/aulao`,
    description:
      "Página de conteúdo gratuito. Contém um vídeo de 20 minutos incorporado do YouTube. O objetivo é aquecer a audiência e direcionar para a compra do programa Liberte Sua Voz.",
    items: [
      {
        label: "Vídeo incorporado do YouTube",
        url: "https://www.youtube.com/watch?v=4PkMj42OWv0",
        why: "O vídeo fica embutido na página — a pessoa assiste sem sair do site. Se precisar trocar o vídeo, é só nos avisar com o novo link do YouTube.",
      },
      {
        label: "Botão CTA → Página Liberte Sua Voz",
        url: `${siteUrl}/liberte-sua-voz`,
        why: "Após assistir o aulão, o botão direciona a pessoa para a página de vendas do programa principal. É o funil natural.",
      },
    ],
  },
  {
    title: "🧠 Diagnóstico da Sua Voz (Quiz Interativo)",
    fullUrl: `${siteUrl}/quiz`,
    description:
      "Quiz de 8 perguntas que identifica o perfil vocal da pessoa. Ao final, ela preenche nome, e-mail e telefone para ver o resultado. Esses dados ficam salvos no banco de dados e a equipe recebe um e-mail automático com o relatório estratégico do lead.",
    items: [
      {
        label: "Resultado: Voz Aprisionada (0–8 pontos)",
        url: "",
        why: "Lead frio — precisa de mais aquecimento antes de qualquer oferta. A equipe deve focar em conteúdo gratuito.",
      },
      {
        label: "Resultado: Voz Hesitante (9–16 pontos)",
        url: "",
        why: "Lead morno — já reconhece o problema mas ainda não está pronta pra comprar. Indicar o aulão gratuito.",
      },
      {
        label: "Resultado: Voz em Despertar (17–24 pontos)",
        url: "",
        why: "Lead quente — está no momento certo para uma oferta. Direcionar para Liberte Sua Voz ou Sua Primeira Palestra.",
      },
      {
        label: "Resultado: Voz Poderosa (25–32 pontos)",
        url: "",
        why: "Lead premium — já tem consciência e urgência alta. Oferecer o programa completo com prioridade.",
      },
    ],
  },
  {
    title: "📖 Liberte Sua Voz — Página de Vendas",
    fullUrl: `${siteUrl}/liberte-sua-voz`,
    description:
      "Página de vendas completa do programa principal de transformação vocal. Contém hero com foto, 6 módulos detalhados, depoimentos em vídeo e texto, FAQ, e botões de compra que levam direto ao checkout da Hotmart.",
    items: [
      {
        label: "Link de checkout (Hotmart)",
        url: "https://pay.hotmart.com/U100026291F?off=ciqw2oyq",
        why: "É o link de pagamento. Ao clicar em qualquer botão 'Quero ter resultados!', a pessoa vai direto para a página de compra na Hotmart. Se precisar trocar a oferta ou o preço, é aqui que se altera.",
      },
      {
        label: "WhatsApp de dúvidas",
        url: "https://wa.me/5528999785743",
        why: "Botão flutuante que abre uma conversa no WhatsApp com o número (28) 99978-5743. Serve para tirar dúvidas de quem está em cima do muro antes de comprar.",
      },
      {
        label: "5 depoimentos em vídeo (YouTube Shorts)",
        url: "",
        why: "Carrossel vertical com vídeos reais de alunas. Servem como prova social e são incorporados diretamente do YouTube.",
      },
      {
        label: "4 prints de depoimentos (carrossel infinito)",
        url: "",
        why: "Imagens de prints de WhatsApp de alunas reais. Rodam em loop automático para reforçar a prova social.",
      },
    ],
  },
  {
    title: "🎤 Sua Primeira Palestra — Página de Vendas",
    fullUrl: `${siteUrl}/sua-primeira-palestra`,
    description:
      "Página de vendas do workshop gravado de 3 aulas práticas. Produto de entrada com valor acessível (R$97). Ideal para quem ainda não está pronta para o programa completo.",
    items: [
      {
        label: "Link de checkout (Hotmart)",
        url: "https://pay.hotmart.com/B104429684X?bid=1771089623423",
        why: "Link de pagamento direto na Hotmart. R$97 pagamento único. Se precisar trocar a oferta, é aqui.",
      },
      {
        label: "WhatsApp de dúvidas",
        url: "https://wa.me/5528999785743",
        why: "Mesmo número do programa principal — (28) 99978-5743. Abre conversa direta para tirar dúvidas.",
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
        why: "Menu de 3 pontinhos em cada lead permite arquivar (esconde da contagem mas preserva) ou excluir definitivamente. Leads de teste devem ser removidos para manter métricas reais.",
      },
    ],
  },
  {
    title: "📧 Sistema de Notificações por E-mail",
    fullUrl: "",
    description:
      "Sempre que alguém completa o quiz, um e-mail HTML profissional é disparado automaticamente para os endereços abaixo. O e-mail contém o nome do lead, contato, resultado do diagnóstico, 'temperatura' do lead (frio a premium), análise comportamental, próximo passo sugerido e oferta recomendada. Também inclui um botão de acesso direto ao painel administrativo.",
    items: [
      {
        label: "Destinatário: 0019.andrematheus@gmail.com",
        url: "",
        why: "E-mail do André Matheus — recebe a notificação de cada novo lead para acompanhamento comercial.",
      },
      {
        label: "Destinatário: euimperadordasvendas@gmail.com",
        url: "",
        why: "E-mail da equipe de vendas — recebe o relatório estratégico para abordagem imediata do lead.",
      },
      {
        label: "Destinatário: contato@mariasdobrasil.online",
        url: "",
        why: "E-mail institucional da Maria — backup e registro oficial de todos os leads capturados.",
      },
      {
        label: "Remetente: contato@mariasdobrasil.online",
        url: "",
        why: "Todos os e-mails de notificação são enviados a partir deste endereço, com domínio verificado (mariasdobrasil.online).",
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
          Guia de referência com todas as páginas, links, destinos, e-mails e fluxos automáticos do ecossistema.
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
              Liberte Sua Voz →{" "}
              <span className="text-foreground break-all">pay.hotmart.com/U100026291F?off=ciqw2oyq</span>
            </p>
            <p className="text-muted-foreground">
              Sua Primeira Palestra →{" "}
              <span className="text-foreground break-all">pay.hotmart.com/B104429684X?bid=1771089623423</span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-foreground">WhatsApp:</p>
            <p className="text-muted-foreground">
              Número: <span className="text-foreground">(28) 99978-5743</span>
            </p>
            <p className="text-muted-foreground">
              Link: <span className="text-foreground break-all">wa.me/5528999785743</span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-foreground">E-mails que recebem notificação:</p>
            <p className="text-foreground">0019.andrematheus@gmail.com</p>
            <p className="text-foreground">euimperadordasvendas@gmail.com</p>
            <p className="text-foreground">contato@mariasdobrasil.online</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-foreground">Remetente dos e-mails:</p>
            <p className="text-foreground">contato@mariasdobrasil.online</p>
            <p className="text-muted-foreground">(domínio verificado)</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground space-y-1 pt-2">
        <p>© {new Date().getFullYear()} Maria Marcelino · Desenvolvido por D7Company</p>
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
