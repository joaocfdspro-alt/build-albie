import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Target,
  Lightbulb,
  Handshake,
  ChevronDown,
  MessageCircle,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import IvoLogo from "@/components/IvoLogo";
import D7Footer from "@/components/D7Footer";

const checkoutUrl = "https://ivobrasil.com.br/onegociador/";
const whatsappUrl = "https://wa.me/5511999999999";

const lessons = [
  {
    icon: Target,
    number: "Módulo 01",
    title: "Fundamentos da Negociação",
    description: "Entenda os princípios que separam negociadores amadores de profissionais. BATNA, ZOPA, rapport e as bases que todo negociador precisa dominar.",
  },
  {
    icon: Lightbulb,
    number: "Módulo 02",
    title: "Estratégias Práticas",
    description: "Técnicas de ancoragem, pacotes, concessões calculadas e argumentação que você pode aplicar imediatamente na sua próxima negociação.",
  },
  {
    icon: Handshake,
    number: "Módulo 03",
    title: "Fechamento e Influência",
    description: "Domine os gatilhos mentais, técnicas de PNL e métodos do FBI para conduzir qualquer conversa e fechar acordos com vantagem.",
  },
];

const benefits = [
  "Aulas completas com técnicas de negociação aplicáveis",
  "Estratégias práticas para maximizar seus ganhos",
  "Ferramentas de argumentação e persuasão",
  "Truques para gerar vantagem em qualquer acordo",
  "Acesso vitalício ao conteúdo",
  "Garantia incondicional de 7 dias",
];

const forWho = [
  "É empresário e precisa negociar melhor com clientes e fornecedores",
  "Trabalha com vendas e quer sair do 'tirador de pedido'",
  "Precisa fechar contratos de alto valor com mais segurança",
  "Quer dominar técnicas usadas por negociadores de elite",
  "Sabe que negocia mal e está deixando dinheiro na mesa",
];

const faqs = [
  { q: "Preciso ter experiência em negociação?", a: "Não. O curso parte do zero com fundamentos e avança para estratégias práticas. Serve para quem está começando e para quem quer se aprimorar." },
  { q: "O conteúdo é gravado ou ao vivo?", a: "Gravado — você assiste no seu ritmo, quantas vezes quiser, com acesso vitalício." },
  { q: "Em quanto tempo vejo resultado?", a: "Os alunos reportam mudanças já na primeira negociação após o curso. As técnicas são práticas e aplicáveis imediatamente." },
  { q: "E se eu não gostar?", a: "Você tem 7 dias de garantia incondicional. Se não fizer sentido, devolvemos 100% do valor." },
];

const CtaButton = ({ className = "", text = "Quero negociar melhor" }: { className?: string; text?: string }) => (
  <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
    <Button size="lg" className={`h-14 px-10 text-sm font-bold tracking-wide bg-gradient-gold-deep hover:opacity-90 transition-all duration-300 shadow-gold-intense rounded-lg gap-2 uppercase font-copperplate ${className}`}>
      {text}
      <ArrowRight className="h-4 w-4" />
    </Button>
  </a>
);

const ONegociador = () => {
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
          <CtaButton className="h-10 px-6 text-xs" text="Garantir acesso" />
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gold/[0.02] blur-[180px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-gold bg-gold/10 px-4 py-1.5 rounded-sm border border-gold/20 mb-6">
              <GraduationCap className="h-3 w-3" />
              Curso Completo
            </motion.span>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-copperplate text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-wide uppercase mb-6">
              Método O <span className="text-gradient-gold">Negociador</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
              className="text-base md:text-lg text-secondary-foreground/80 leading-relaxed max-w-lg mx-auto mb-8">
              Treinamento com técnicas de negociação, estratégias práticas e ferramentas para maximizar seus ganhos nos acordos e gerar vantagem.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CtaButton text="Garantir acesso" />
              <div className="text-xs text-muted-foreground text-center">
                <p className="mt-1">Acesso vitalício · Garantia 7 dias</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="relative z-10 bg-background">
        {/* Pain */}
        <section className="bg-background">
          <div className="max-w-4xl mx-auto px-6 py-16 lg:py-20 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-copperplate text-2xl md:text-3xl font-bold tracking-wide uppercase mb-6">
                Você vende ou <span className="text-gradient-gold">negocia?</span>
              </h2>
              <div className="max-w-2xl mx-auto space-y-4 text-sm md:text-base text-secondary-foreground/70 leading-relaxed">
                <p>Vender é entregar um produto. Negociar é garantir que você saia com vantagem. A maioria dos profissionais confunde as duas coisas — e paga caro por isso.</p>
                <p>Cada negociação mal conduzida é dinheiro que sai do seu bolso. Cada concessão desnecessária é lucro que você entregou de graça.</p>
                <p className="text-foreground/90 font-semibold">O Negociador ensina técnicas reais, testadas em negociações de alto nível, para você fechar acordos melhores a partir de hoje.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Lessons */}
        <section className="bg-card/30 border-y border-border/50">
          <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
            <div className="text-center mb-12">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <h2 className="font-copperplate text-2xl md:text-3xl font-bold tracking-wide uppercase mb-3">O que você vai aprender</h2>
                <div className="w-16 h-[2px] bg-gradient-gold mx-auto mt-4" />
              </motion.div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {lessons.map((lesson, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="group bg-card border border-border/50 rounded-lg p-7 hover:border-gold/30 hover:shadow-gold transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-gold/10 border border-gold/20 group-hover:bg-gold/20 transition-colors">
                      <lesson.icon className="h-5 w-5 text-gold" />
                    </div>
                    <span className="text-[10px] font-bold text-gold/60 tracking-widest uppercase">{lesson.number}</span>
                  </div>
                  <h3 className="font-copperplate font-bold text-lg mb-3 uppercase tracking-wide">{lesson.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{lesson.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* For Who */}
        <section className="bg-background">
          <div className="max-w-4xl mx-auto px-6 py-16 lg:py-20">
            <div className="text-center mb-10">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <h2 className="font-copperplate text-2xl md:text-3xl font-bold tracking-wide uppercase mb-3">
                  Este curso é para você <span className="text-gradient-gold">se:</span>
                </h2>
                <div className="w-16 h-[2px] bg-gradient-gold mx-auto mt-4" />
              </motion.div>
            </div>
            <div className="max-w-2xl mx-auto space-y-4">
              {forWho.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base text-secondary-foreground/85 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-card/30 border-y border-border/50">
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
                    <p className="font-copperplate text-3xl md:text-4xl font-bold text-gradient-gold mb-1">Acesse Agora</p>
                    <p className="text-sm text-muted-foreground mb-6">Acesso vitalício ao conteúdo completo</p>
                    <CtaButton className="w-full md:w-auto" text="Garantir acesso" />
                    <p className="text-[11px] text-muted-foreground mt-3">Garantia incondicional de 7 dias</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-background">
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
        <section className="bg-card/30 border-t border-border/50">
          <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-copperplate text-2xl md:text-3xl font-bold leading-tight mb-3 uppercase tracking-wide">
                Pare de perder dinheiro{" "}<span className="text-gradient-gold">em cada acordo.</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
                O Negociador vai te dar as armas que faltam para você sair de qualquer mesa com vantagem.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <CtaButton text="Garantir acesso" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-sm font-bold rounded-lg gap-2 border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300">
                    <MessageCircle className="h-4 w-4" />
                    Tirar dúvidas
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <D7Footer />
      </div>

      {/* WhatsApp Float */}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 duration-300"
        aria-label="WhatsApp">
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
};

export default ONegociador;
