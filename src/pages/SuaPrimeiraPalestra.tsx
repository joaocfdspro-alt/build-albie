import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Mic2,
  Target,
  Lightbulb,
  ChevronDown,
  MessageCircle,
  Play,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo-maria.png";
import D7Footer from "@/components/D7Footer";
import heroImage from "@/assets/palestra-hero.jpg";

const checkoutUrl = "https://pay.hotmart.com/B104429684X?bid=1771089623423";
const whatsappUrl = "https://wa.me/5528999785743";

const lessons = [
  {
    icon: Target,
    number: "Aula 01",
    title: "A Estrutura Invisível",
    description:
      "Toda palestra magnética segue um roteiro que o público não vê, mas sente. Eu te ensino a estrutura que transforma qualquer tema numa fala que prende, emociona e convence.",
  },
  {
    icon: Lightbulb,
    number: "Aula 02",
    title: "Do Medo ao Palco",
    description:
      "O nervosismo não é seu inimigo — é energia mal direcionada. Eu te passo técnicas práticas de respiração, postura e presença pra você dominar qualquer ambiente antes de abrir a boca.",
  },
  {
    icon: Mic2,
    number: "Aula 03",
    title: "Sua Palestra, Pronta",
    description:
      "No final dessa aula, você sai com sua palestra (ou aula, ou apresentação) estruturada, ensaiada e pronta pra ser entregue. Sem achismo. Com o método que eu uso.",
  },
];

const benefits = [
  "3 aulas gravadas com meu método passo a passo",
  "Meu modelo de roteiro pronto pra você preencher",
  "Técnicas de abertura que eu uso pra capturar a atenção nos primeiros 30 segundos",
  "Exercícios práticos de voz, postura e presença",
  "Acesso vitalício pra revisar quantas vezes quiser",
  "Garantia incondicional de 7 dias",
];

const forWho = [
  "Precisa apresentar um projeto no trabalho e quer causar impacto",
  "Sonha em dar sua primeira palestra mas não sabe por onde começar",
  "É professora, mentora ou líder e quer prender a atenção do público",
  "Quer gravar aulas ou conteúdos com mais segurança e clareza",
  "Já fala em público mas sente que falta algo — estrutura, emoção, conexão",
];

const faqs = [
  {
    q: "Preciso ter experiência com palco?",
    a: "Absolutamente não. O workshop foi desenhado para quem nunca subiu num palco e também para quem já fala mas quer mais estrutura e impacto.",
  },
  {
    q: "As aulas são ao vivo ou gravadas?",
    a: "São gravadas — um registro de 3 dias de workshop presencial. Você assiste no seu ritmo, quantas vezes quiser.",
  },
  {
    q: "Em quanto tempo vou ter minha palestra pronta?",
    a: "Se seguir os exercícios das 3 aulas, ao final do workshop você já terá um roteiro completo e ensaiado.",
  },
  {
    q: "E se eu não gostar?",
    a: "Você tem 7 dias de garantia incondicional. Se não fizer sentido pra você, devolvemos 100% do valor.",
  },
];

/* ─── CTA Button ─── */
const CtaButton = ({
  className = "",
  text = "Quero minha palestra pronta",
}: {
  className?: string;
  text?: string;
}) => (
  <a
    href={checkoutUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block"
  >
    <Button
      size="lg"
      className={`h-14 px-10 text-sm font-bold tracking-wide bg-gradient-gold-deep hover:opacity-90 transition-all duration-300 shadow-gold-intense rounded-xl gap-2 ${className}`}
    >
      <Sparkles className="h-4 w-4" />
      {text}
      <ArrowRight className="h-4 w-4" />
    </Button>
  </a>
);

const SuaPrimeiraPalestra = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.a
              href="/"
              whileTap={{ scale: 0.85 }}
              transition={{ duration: 0.1 }}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors active:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Voltar</span>
            </motion.a>
            <div className="w-px h-5 bg-border/50 hidden sm:block" />
            <a href="/">
              <img
                src={logoImage}
                alt="Maria Marcelino"
                className="h-8 invert opacity-90"
              />
            </a>
          </div>
          <CtaButton className="h-10 px-6 text-xs" text="Garantir acesso" />
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[70vh] md:min-h-[80vh]">
        <div className="fixed top-0 left-0 right-0 h-[70vh] md:h-[80vh] z-0">
          <div className="absolute inset-0 bg-background" />
          <img
            src={heroImage}
            alt="Sua Primeira Palestra"
            className="absolute inset-0 w-full h-full object-cover object-[50%_25%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent md:via-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>

        <div className="relative z-10 min-h-[70vh] md:min-h-[80vh] flex items-center">
          <div className="max-w-6xl mx-auto px-6 py-14 lg:py-24 w-full">
            <div className="max-w-xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-gold bg-gold/10 px-4 py-1.5 rounded-full border border-gold/20 mb-6"
              >
                <Play className="h-3 w-3" />
                Workshop · 3 Aulas Práticas
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-6"
              >
                Sua Primeira{" "}
                <span className="text-gradient-gold">Palestra.</span>
                <br />
                <span className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary-foreground/60 mt-2 block">
                  Pronta em 3 aulas.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-base md:text-lg text-secondary-foreground/80 leading-relaxed max-w-lg mb-8"
              >
                Você tem uma mensagem dentro de você. O que falta é o método
                certo pra tirá-la do papel e colocá-la no palco. Em 3 aulas, eu
                te entrego exatamente isso.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <CtaButton />
                <div className="text-xs text-muted-foreground">
                  <p className="font-semibold text-foreground/80">R$ 97,00</p>
                  <p>Pagamento único</p>
                  <p className="mt-1">Acesso vitalício · Garantia 7 dias</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Solid bg wrapper */}
      <div className="relative z-10 bg-background">
        {/* Pain section */}
        <section className="bg-background">
          <div className="max-w-4xl mx-auto px-6 py-16 lg:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6">
                Você tem algo a dizer, mas{" "}
                <span className="text-gradient-gold">trava na hora.</span>
              </h2>
              <div className="max-w-2xl mx-auto space-y-4 text-sm md:text-base text-secondary-foreground/70 leading-relaxed">
                <p>
                  Você pensa, ensaia, planeja — mas quando chega a hora de
                  falar, o corpo congela, a voz some, ou você sente que ninguém
                  está realmente ouvindo.
                </p>
                <p>
                  Não é falta de conteúdo. É falta de estrutura. Uma palestra
                  poderosa não nasce do improviso — nasce de um método que
                  qualquer pessoa pode aprender.
                </p>
                <p className="text-foreground/90 font-semibold">
                  Eu vivi isso. Fui demitida por não saber me comunicar.
                  Hoje, loto auditórios. E neste workshop, eu te entrego o
                  mesmo método que mudou a minha vida.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3 Lessons */}
        <section className="bg-card/30 border-y border-border/50">
          <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                  3 aulas. 1 resultado:{" "}
                  <span className="text-gradient-gold">sua palestra pronta.</span>
                </h2>
                <p className="text-sm text-muted-foreground">
                  Workshop gravado com método passo a passo
                </p>
                <div className="w-16 h-[2px] bg-gradient-gold mx-auto mt-4" />
              </motion.div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {lessons.map((lesson, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="group bg-card border border-border/50 rounded-2xl p-7 hover:border-gold/30 hover:shadow-gold transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 border border-gold/20 group-hover:bg-gold/20 transition-colors">
                      <lesson.icon className="h-5 w-5 text-gold" />
                    </div>
                    <span className="text-[10px] font-bold text-gold/60 tracking-widest uppercase">
                      {lesson.number}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-3">{lesson.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {lesson.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* For Who */}
        <section className="bg-background">
          <div className="max-w-4xl mx-auto px-6 py-16 lg:py-20">
            <div className="text-center mb-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                  Esse workshop é pra você{" "}
                  <span className="text-gradient-gold">se:</span>
                </h2>
                <div className="w-16 h-[2px] bg-gradient-gold mx-auto mt-4" />
              </motion.div>
            </div>
            <div className="max-w-2xl mx-auto space-y-4">
              {forWho.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base text-secondary-foreground/85 leading-relaxed">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-card/30 border-y border-border/50">
          <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-gold/20 rounded-3xl p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.04] to-transparent" />
              <div className="relative z-10">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  <div>
                    <h2 className="text-xl md:text-2xl font-black tracking-tight mb-6">
                      Tudo que você recebe:
                    </h2>
                    <div className="space-y-3">
                      {benefits.map((b, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.06 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                          <p className="text-sm text-secondary-foreground/90">
                            {b}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-3xl md:text-4xl font-black text-gradient-gold mb-1">
                      R$ 97,00
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      Pagamento único · Acesso vitalício
                    </p>
                    <CtaButton className="w-full md:w-auto" />
                    <p className="text-[11px] text-muted-foreground mt-3">
                      Garantia incondicional de 7 dias
                    </p>
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
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                Perguntas frequentes
              </h2>
              <div className="w-16 h-[2px] bg-gradient-gold mx-auto mt-4" />
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-card border border-border/50 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-card/80 transition-colors"
                  >
                    <p className="text-sm font-semibold text-foreground/90 pr-4">
                      {faq.q}
                    </p>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === i
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-card/30 border-t border-border/50">
          <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-black leading-tight mb-3">
                Sua mensagem merece ser{" "}
                <span className="text-gradient-gold">ouvida.</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
                Em 3 aulas, eu te ajudo a sair com sua palestra pronta, ensaiada e
                com a confiança de quem sabe exatamente o que vai falar. Por
                apenas R$97.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <CtaButton />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-sm font-bold rounded-xl gap-2 border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Tirar dúvidas
                  </Button>
                </a>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">
                Garantia incondicional de 7 dias
              </p>
            </motion.div>
          </div>
        </section>

        <D7Footer minimal />
      </div>

      {/* WhatsApp Float */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 duration-300"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
};

export default SuaPrimeiraPalestra;
