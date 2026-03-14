import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Target,
  Shield,
  Flame,
  Crown,
  ChevronDown,
  Users,
  Award,
  TrendingUp,
  Briefcase,
  Handshake,
  Brain,
  Loader2,
  X,
} from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import IvoLogo from "@/components/IvoLogo";
import D7Footer from "@/components/D7Footer";
import { supabase } from "@/integrations/supabase/client";
import ivoHero from "@/assets/ivo-hero.jpg";

const checkoutUrl = "#"; // Link Xgrow a ser definido
const whatsappUrl = "https://wa.me/5546999238882?text=Ol%C3%A1!%20Quero%20saber%20mais%20sobre%20o%20C%C3%B3digo%20da%20Negocia%C3%A7%C3%A3o.";

const modules = [
  { icon: Brain, number: "SEMANA 01 a 02", title: "Mentalidade do Negociador", description: "Pare de pensar como vendedor. Desenvolva a mentalidade estratégica que separa negociadores de elite dos amadores." },
  { icon: Target, number: "SEMANA 03 a 04", title: "Preparação Tática", description: "BATNA, ZOPA, âncoras. Domine as ferramentas que os melhores negociadores do mundo usam antes de sentar à mesa." },
  { icon: Shield, number: "SEMANA 05 a 06", title: "Controle do Diálogo", description: "Aprenda a conduzir qualquer conversa. Rapport, escuta ativa, perguntas estratégicas e silêncio como arma." },
  { icon: Flame, number: "SEMANA 07 a 08", title: "Negociação sob Pressão", description: "Técnicas para manter o controle quando a outra parte pressiona, blefa ou usa táticas agressivas." },
  { icon: Handshake, number: "SEMANA 09 a 10", title: "Fechamento Estratégico", description: "Transforme conversas em acordos vantajosos. Técnicas de fechamento que geram compromisso real." },
  { icon: Crown, number: "SEMANA 11 a 12", title: "Maestria Negocial", description: "Negociações complexas, múltiplas partes, acordos de alto valor. O nível que poucos alcançam." },
];

const benefits = [
  "Método gravado com 12 semanas de conteúdo estratégico",
  "6 encontros ao vivo 'A Mesa do Negociador' (Hotseats)",
  "Grupo exclusivo no WhatsApp para suporte em casos reais",
  "Frameworks prontos para usar em qualquer negociação",
  "Acesso ao ciclo de 90 dias com renovação contínua",
  "Suporte direto do time do Ivo",
];

const faqs = [
  { q: "Para quem é o Código da Negociação?", a: "Para empresários, líderes comerciais, executivos, vendedores (B2B, B2C), advogados, gestores e qualquer profissional que precisa negociar melhor para faturar mais." },
  { q: "Preciso ter experiência em negociação?", a: "Não. O programa começa do zero e vai até estratégias avançadas. Serve tanto para iniciantes quanto para quem já negocia e quer subir de nível." },
  { q: "Qual é o formato?", a: "Método gravado com 12 semanas de conteúdo, mais 6 encontros ao vivo quinzenais (Hotseats) e grupo de WhatsApp. O ciclo se renova a cada 90 dias." },
  { q: "E se eu não gostar?", a: "Você tem 7 dias de garantia incondicional. Se não fizer sentido, devolvemos 100% do valor, sem burocracia." },
  { q: "Em quanto tempo vejo resultado?", a: "Os alunos que aplicam o método já percebem mudança nas primeiras semanas. O ciclo completo de 90 dias consolida a transformação." },
  { q: "Preciso de ajuda, como falo com o suporte?", a: "Você pode entrar em contato pelo e-mail suporte@ivobrasil.com.br ou pelo WhatsApp do time comercial." },
];

const stats = [
  { icon: Briefcase, value: "20+", label: "Anos em negociações" },
  { icon: Award, value: "Bilhões", label: "Em negócios conduzidos" },
  { icon: TrendingUp, value: "Vale", label: "E grandes corporações" },
];

const leadSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(8, "Telefone inválido").max(20),
});

const CtaButton = ({ className = "", text = "Quero negociar melhor", onClick }: { className?: string; text?: string; onClick?: () => void }) => (
  <Button
    size="lg"
    onClick={onClick}
    className={`h-14 px-10 text-sm font-bold tracking-wide bg-gradient-gold-deep hover:opacity-90 transition-all duration-300 shadow-gold-intense rounded-lg gap-2 uppercase font-copperplate ${className}`}
  >
    {text}
    <ArrowRight className="h-4 w-4" />
  </Button>
);

const CodigoDaNegociacao = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCtaClick = () => {
    setShowLeadModal(true);
  };

  const handleLeadSubmit = async () => {
    const result = leadSchema.safeParse(leadData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((e) => {
        if (e.path[0]) fieldErrors[e.path[0] as string] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      await supabase.from("codigo_leads").insert({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone,
        source: "codigo-da-negociacao",
      });
    } catch { /* silent */ }

    setIsSubmitting(false);
    setShowLeadModal(false);
    // Redirect to checkout
    if (checkoutUrl !== "#") {
      window.open(checkoutUrl, "_blank");
    } else {
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.a href="/" whileTap={{ scale: 0.85 }} transition={{ duration: 0.1 }}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Voltar</span>
            </motion.a>
            <div className="w-px h-5 bg-border/50 hidden sm:block" />
            <IvoLogo size="sm" variant="icon" />
          </div>
          <CtaButton className="h-10 px-6 text-xs" text="Garantir vaga" onClick={handleCtaClick} />
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[75vh] md:min-h-[85vh]">
        <div className="fixed top-0 left-0 right-0 h-[75vh] md:h-[85vh] z-0">
          <div className="absolute inset-0 bg-background" />
          <img src={ivoHero} alt="Ivo Brasil" className="absolute inset-0 w-full h-full object-cover object-[center_4%] md:object-[center_8%] opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent md:via-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </div>

        <div className="relative z-10 min-h-[75vh] md:min-h-[85vh] flex items-center">
          <div className="max-w-6xl mx-auto px-6 py-14 lg:py-24 w-full">
            <div className="max-w-xl">
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-gold bg-gold/10 px-4 py-1.5 rounded-sm border border-gold/20 mb-6">
                <Target className="h-3 w-3" />
                Programa de 90 dias
              </motion.span>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-copperplate text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-wide uppercase mb-6">
                Código da{" "}<span className="text-gradient-gold">Negociação</span>
                <br />
                <span className="text-xl md:text-2xl lg:text-3xl font-sans font-bold text-secondary-foreground/60 mt-2 block normal-case tracking-normal">
                  O método que transforma conversas em lucro.
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}
                className="text-base md:text-lg text-secondary-foreground/80 leading-relaxed max-w-lg mb-8">
                Pare de perder dinheiro por não saber negociar. Em 90 dias, domine as técnicas que os melhores negociadores do mundo usam para fechar acordos vantajosos.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-col sm:flex-row items-start gap-4">
                <CtaButton onClick={handleCtaClick} />
                <div className="text-xs text-muted-foreground">
                  <p className="mt-1">Acesso ao ciclo de 90 dias · Garantia 7 dias</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 bg-background">
        {/* Stats */}
        <section className="border-y border-border/50 bg-card/50">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="grid grid-cols-3 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <s.icon className="h-5 w-5 text-gold mx-auto mb-2" />
                  <p className="text-2xl md:text-3xl font-black text-gradient-gold font-copperplate">{s.value}</p>
                  <p className="text-[11px] md:text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pain */}
        <section className="bg-background">
          <div className="max-w-4xl mx-auto px-6 py-16 lg:py-20 text-center">
            <h2 className="font-copperplate text-2xl md:text-3xl font-bold tracking-wide uppercase mb-6">
              Você negocia ou apenas{" "}<span className="text-gradient-gold">aceita o que oferecem?</span>
            </h2>
            <div className="max-w-2xl mx-auto space-y-4 text-sm md:text-base text-secondary-foreground/70 leading-relaxed">
              <p>A maioria dos empresários perde dinheiro não por ter um produto ruim, mas por não saber defender o valor do que oferece. Cedem rápido demais, não sabem lidar com objeções e saem de reuniões sentindo que poderiam ter feito melhor.</p>
              <p>A diferença entre quem fatura R$ 50 mil e R$ 500 mil por mês muitas vezes está em uma única habilidade: negociação estratégica.</p>
              <p className="text-foreground/90 font-semibold">Ivo Brasil viveu isso nas trincheiras. Negociações bilionárias na Vale e no setor corporativo. Hoje, ensina o método para quem quer jogar no mesmo nível.</p>
            </div>
          </div>
        </section>

        {/* Modules */}
        <section className="bg-card/30 border-y border-border/50">
          <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
            <div className="text-center mb-12">
              <h2 className="font-copperplate text-2xl md:text-3xl font-bold tracking-wide uppercase mb-3">O que você vai dominar</h2>
              <p className="text-sm text-muted-foreground">12 semanas de método estratégico para negociadores</p>
              <div className="w-16 h-[2px] bg-gradient-gold mx-auto mt-4" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {modules.map((mod, i) => (
                <div key={i}
                  className="group bg-card border border-border/50 rounded-lg p-6 hover:border-gold/30 hover:shadow-gold transition-all duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gold/10 border border-gold/20 group-hover:bg-gold/20 transition-colors">
                      <mod.icon className="h-4 w-4 text-gold" />
                    </div>
                    <span className="text-[9px] font-bold text-gold/50 tracking-widest uppercase">{mod.number}</span>
                  </div>
                  <h3 className="font-copperplate font-bold text-base mb-2 uppercase tracking-wide">{mod.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{mod.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-background">
          <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
            <div className="bg-card border border-gold/20 rounded-lg p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] to-transparent" />
              <div className="relative z-10">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  <div>
                    <h2 className="font-copperplate text-xl md:text-2xl font-bold tracking-wide uppercase mb-6">Tudo que você recebe:</h2>
                    <div className="space-y-3">
                      {benefits.map((b, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                          <p className="text-sm text-secondary-foreground/90">{b}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="border border-border/60 rounded-md p-5 mb-6 bg-background/40">
                      <p className="font-copperplate text-3xl md:text-4xl font-bold text-gradient-gold mb-2">R$ 997,00</p>
                      <p className="text-lg font-bold text-foreground">À vista ou 10x de R$ 116,42</p>
                      <p className="text-sm text-muted-foreground mt-2">Crédito · PIX · Múltiplos cartões</p>
                    </div>
                    <CtaButton className="w-full md:w-auto" onClick={handleCtaClick} />
                    <p className="text-[11px] text-muted-foreground mt-3">Garantia incondicional de 7 dias</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-card/30 border-y border-border/50">
          <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
            <div className="text-center mb-10">
              <h2 className="font-copperplate text-2xl md:text-3xl font-bold tracking-wide uppercase mb-3">Perguntas frequentes</h2>
              <div className="w-16 h-[2px] bg-gradient-gold mx-auto mt-4" />
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-card border border-border/50 rounded-lg overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-card/80 transition-colors">
                    <p className="text-sm font-semibold text-foreground/90 pr-4">{faq.q}</p>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-background">
          <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24 text-center">
            <h2 className="font-copperplate text-2xl md:text-3xl font-bold leading-tight mb-3 uppercase tracking-wide">
              A próxima negociação pode ser{" "}<span className="text-gradient-gold">a que muda tudo.</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
              Você pode continuar negociando no instinto ou aprender o método que executivos, empresários e líderes usam para fechar acordos que outros nem sonham.
            </p>
            <CtaButton onClick={handleCtaClick} />
            <p className="text-[11px] text-muted-foreground mt-3">Garantia incondicional de 7 dias</p>
            <div className="mt-6">
              <p className="text-xs text-muted-foreground">
                Dúvidas? Fale com nosso time:{" "}
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-gold underline">
                  WhatsApp
                </a>
                {" "}ou{" "}
                <a href="mailto:suporte@ivobrasil.com.br" className="text-gold underline">
                  suporte@ivobrasil.com.br
                </a>
              </p>
            </div>
          </div>
        </section>

        <D7Footer />
      </div>

      {/* Lead capture modal */}
      {showLeadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md bg-card border border-gold/20 rounded-xl p-6 shadow-gold-intense relative"
          >
            <button
              onClick={() => setShowLeadModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-6">
              <h3 className="font-copperplate text-lg font-bold uppercase tracking-wide mb-1">
                Garanta sua vaga
              </h3>
              <p className="text-xs text-muted-foreground">
                Preencha seus dados e avance para o checkout
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-foreground/70 mb-1 block">Nome</label>
                <input
                  type="text"
                  value={leadData.name}
                  onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                  placeholder="Seu nome"
                  className="w-full h-11 rounded-lg bg-background border border-border/50 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 focus:shadow-gold transition-all"
                  maxLength={100}
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground/70 mb-1 block">E-mail</label>
                <input
                  type="email"
                  value={leadData.email}
                  onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="w-full h-11 rounded-lg bg-background border border-border/50 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 focus:shadow-gold transition-all"
                  maxLength={255}
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground/70 mb-1 block">Telefone</label>
                <input
                  type="tel"
                  value={leadData.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^\d\s()\-]/g, "");
                    setLeadData({ ...leadData, phone: val });
                  }}
                  placeholder="(99) 99999-9999"
                  className="w-full h-11 rounded-lg bg-background border border-border/50 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 focus:shadow-gold transition-all"
                  maxLength={20}
                />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>
            </div>

            <motion.button
              onClick={handleLeadSubmit}
              disabled={isSubmitting}
              whileTap={{ scale: 0.97 }}
              className="w-full mt-5 h-13 rounded-lg bg-gradient-gold-deep text-primary-foreground font-bold text-sm shadow-gold-intense hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70 py-3"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Garantir minha vaga
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>

            <p className="text-[10px] text-muted-foreground/50 text-center mt-3">
              Seus dados estão seguros. Garantia de 7 dias.
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CodigoDaNegociacao;
