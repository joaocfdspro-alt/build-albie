import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Target,
  Shield,
  Flame,
  Crown,
  ChevronDown,
  MessageCircle,
  Users,
  Award,
  TrendingUp,
  Briefcase,
  Handshake,
  Brain,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import IvoLogo from "@/components/IvoLogo";
import D7Footer from "@/components/D7Footer";
import ivoHero from "@/assets/ivo-hero.jpg";

const checkoutUrl = "#"; // Link a ser definido
const whatsappUrl = "https://wa.me/5511999999999";

const modules = [
  { icon: Brain, number: "SEMANA 01-02", title: "Mentalidade do Negociador", description: "Pare de pensar como vendedor. Desenvolva a mentalidade estratégica que separa negociadores de elite dos amadores." },
  { icon: Target, number: "SEMANA 03-04", title: "Preparação Tática", description: "BATNA, ZOPA, âncoras — domine as ferramentas que os melhores negociadores do mundo usam antes de sentar à mesa." },
  { icon: Shield, number: "SEMANA 05-06", title: "Controle do Diálogo", description: "Aprenda a conduzir qualquer conversa. Rapport, escuta ativa, perguntas estratégicas e silêncio como arma." },
  { icon: Flame, number: "SEMANA 07-08", title: "Negociação sob Pressão", description: "Técnicas para manter o controle quando a outra parte pressiona, blefa ou usa táticas agressivas." },
  { icon: Handshake, number: "SEMANA 09-10", title: "Fechamento Estratégico", description: "Transforme conversas em acordos vantajosos. Técnicas de fechamento que geram compromisso real." },
  { icon: Crown, number: "SEMANA 11-12", title: "Maestria Negocial", description: "Negociações complexas, múltiplas partes, acordos de alto valor. O nível que poucos alcançam." },
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
  { q: "Qual é o formato?", a: "Método gravado + 6 encontros ao vivo quinzenais (Hotseats) + grupo de WhatsApp. O ciclo se renova a cada 90 dias." },
  { q: "E se eu não gostar?", a: "Você tem 7 dias de garantia incondicional. Se não fizer sentido, devolvemos 100% do valor." },
];

const stats = [
  { icon: Briefcase, value: "20+", label: "Anos em negociações" },
  { icon: Award, value: "Bilhões", label: "Em negócios conduzidos" },
  { icon: TrendingUp, value: "Vale", label: "E grandes corporações" },
];

const CtaButton = ({ className = "", text = "Quero negociar melhor" }: { className?: string; text?: string }) => (
  <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
    <Button
      size="lg"
      className={`h-14 px-10 text-sm font-bold tracking-wide bg-gradient-gold-deep hover:opacity-90 transition-all duration-300 shadow-gold-intense rounded-lg gap-2 uppercase font-copperplate ${className}`}
    >
      {text}
      <ArrowRight className="h-4 w-4" />
    </Button>
  </a>
);

const CodigoDaNegociacao = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
            <a href="/"><IvoLogo size="sm" variant="icon" /></a>
          </div>
          <CtaButton className="h-10 px-6 text-xs" text="Garantir vaga" />
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[75vh] md:min-h-[85vh]">
        <div className="fixed top-0 left-0 right-0 h-[75vh] md:h-[85vh] z-0">
          <div className="absolute inset-0 bg-background" />
          <img src={ivoHero} alt="Ivo Brasil" className="absolute inset-0 w-full h-full object-cover object-[50%_20%] opacity-40" />
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
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-copperplate text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-wide uppercase mb-6">
                Código da{" "}<span className="text-gradient-gold">Negociação</span>
                <br />
                <span className="text-xl md:text-2xl lg:text-3xl font-sans font-bold text-secondary-foreground/60 mt-2 block normal-case tracking-normal">
                  O método que transforma conversas em lucro.
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
                className="text-base md:text-lg text-secondary-foreground/80 leading-relaxed max-w-lg mb-8">
                Pare de perder dinheiro por não saber negociar. Em 90 dias, domine as técnicas que os melhores negociadores do mundo usam para fechar acordos vantajosos.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-start gap-4">
                <CtaButton />
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
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center">
                  <s.icon className="h-5 w-5 text-gold mx-auto mb-2" />
                  <p className="text-2xl md:text-3xl font-black text-gradient-gold font-copperplate">{s.value}</p>
                  <p className="text-[11px] md:text-xs text-muted-foreground mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pain */}
        <section className="bg-background">
          <div className="max-w-4xl mx-auto px-6 py-16 lg:py-20 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-copperplate text-2xl md:text-3xl font-bold tracking-wide uppercase mb-6">
                Você negocia ou apenas{" "}<span className="text-gradient-gold">aceita o que oferecem?</span>
              </h2>
              <div className="max-w-2xl mx-auto space-y-4 text-sm md:text-base text-secondary-foreground/70 leading-relaxed">
                <p>A maioria dos empresários perde dinheiro não por ter um produto ruim, mas por não saber defender o valor do que oferece. Cedem rápido demais, não sabem lidar com objeções e saem de reuniões sentindo que poderiam ter feito melhor.</p>
                <p>A diferença entre quem fatura R$ 50 mil e R$ 500 mil por mês muitas vezes está em uma única habilidade: negociação estratégica.</p>
                <p className="text-foreground/90 font-semibold">Ivo Brasil viveu isso nas trincheiras — negociações bilionárias na Vale e no setor corporativo. Hoje, ensina o método para quem quer jogar no mesmo nível.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Modules */}
        <section className="bg-card/30 border-y border-border/50">
          <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
            <div className="text-center mb-12">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <h2 className="font-copperplate text-2xl md:text-3xl font-bold tracking-wide uppercase mb-3">O que você vai dominar</h2>
                <p className="text-sm text-muted-foreground">12 semanas de método estratégico para negociadores</p>
                <div className="w-16 h-[2px] bg-gradient-gold mx-auto mt-4" />
              </motion.div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {modules.map((mod, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group bg-card border border-border/50 rounded-lg p-6 hover:border-gold/30 hover:shadow-gold transition-all duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gold/10 border border-gold/20 group-hover:bg-gold/20 transition-colors">
                      <mod.icon className="h-4 w-4 text-gold" />
                    </div>
                    <span className="text-[9px] font-bold text-gold/50 tracking-widest uppercase">{mod.number}</span>
                  </div>
                  <h3 className="font-copperplate font-bold text-base mb-2 uppercase tracking-wide">{mod.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{mod.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-background">
          <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-card border border-gold/20 rounded-lg p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] to-transparent" />
              <div className="relative z-10">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  <div>
                    <h2 className="font-copperplate text-xl md:text-2xl font-bold tracking-wide uppercase mb-6">Tudo que você recebe:</h2>
                    <div className="space-y-3">
                      {benefits.map((b, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="flex items-start gap-3">
                          <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                          <p className="text-sm text-secondary-foreground/90">{b}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="font-copperplate text-3xl md:text-4xl font-bold text-gradient-gold mb-1">R$ 997,00</p>
                    <p className="text-sm text-muted-foreground mb-6">Pagamento único ou parcele no cartão</p>
                    <CtaButton className="w-full md:w-auto" />
                    <p className="text-[11px] text-muted-foreground mt-3">Garantia incondicional de 7 dias</p>
                  </div>
                </div>
              </div>
            </motion.div>
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
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="bg-card border border-border/50 rounded-lg overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-card/80 transition-colors">
                    <p className="text-sm font-semibold text-foreground/90 pr-4">{faq.q}</p>
                    <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-background">
          <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-copperplate text-2xl md:text-3xl font-bold leading-tight mb-3 uppercase tracking-wide">
                A próxima negociação pode ser{" "}<span className="text-gradient-gold">a que muda tudo.</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
                Você pode continuar negociando no instinto — ou pode aprender o método que executivos, empresários e líderes usam para fechar acordos que outros nem sonham.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <CtaButton />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-sm font-bold rounded-lg gap-2 border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300">
                    <MessageCircle className="h-4 w-4" />
                    Falar com o comercial
                  </Button>
                </a>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">Garantia incondicional de 7 dias</p>
            </motion.div>
          </div>
        </section>

        {/* WhatsApp Float */}
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 duration-300"
          aria-label="WhatsApp">
          <MessageCircle className="h-6 w-6" />
        </a>

        <D7Footer />
      </div>
    </div>
  );
};

export default CodigoDaNegociacao;
