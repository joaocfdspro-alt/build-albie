import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ArrowLeft, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo-maria.png";
import D7Footer from "@/components/D7Footer";

const benefits = [
  "Por que você trava na hora de falar — e como mudar isso hoje",
  "O erro que 90% das pessoas cometem ao tentar 'se impor'",
  "A técnica da voz ancorada que desbloqueia sua presença",
  "Como transformar medo em magnetismo em menos de 5 minutos",
];

const Aulao = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
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
              <img src={logoImage} alt="Maria Marcelino" className="h-8 invert opacity-90" />
            </a>
          </div>
          <a href="/liberte-sua-voz">
            <Button size="sm" className="bg-gradient-gold-deep hover:opacity-90 text-xs font-bold gap-1.5 rounded-lg">
              <Sparkles className="h-3.5 w-3.5" />
              Quero libertar minha voz
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gold/[0.03] blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-16 lg:pt-20 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-gold bg-gold/10 px-4 py-1.5 rounded-full border border-gold/20 mb-6">
                Aulão gratuito
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-[42px] font-black leading-[1.1] tracking-tight mb-5">
                Você não precisa de mais{" "}
                <span className="text-gradient-gold">coragem.</span>
                <br />
                Você precisa destravar a{" "}
                <span className="text-gradient-gold">sua voz.</span>
              </h1>

              <p className="text-sm md:text-base text-secondary-foreground/70 leading-relaxed max-w-lg mb-8">
                Em 20 minutos, descubra o que realmente trava a sua comunicação — e
                como pessoas comuns estão se tornando inesquecíveis quando abrem a boca.
              </p>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-xs">+2.400 pessoas já assistiram</span>
              </div>
            </motion.div>

            {/* Video Embed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden shadow-gold border border-border/50"
            >
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/4PkMj42OWv0?rel=0"
                  title="Aulão: Destrave Sua Voz"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-card/50 border-y border-border/50">
        <div className="max-w-5xl mx-auto px-6 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-xl md:text-2xl font-black tracking-tight mb-3">
              O que você vai descobrir
            </h2>
            <div className="w-16 h-[2px] bg-gradient-gold mx-auto" />
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {benefits.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-start gap-3 bg-secondary/60 border border-border/50 rounded-xl px-5 py-4"
              >
                <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <p className="text-sm text-secondary-foreground/90 leading-relaxed">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional + CTA */}
      <section className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-gold/15 rounded-2xl p-8 md:p-10 relative overflow-hidden mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] to-transparent" />
            <div className="relative z-10">
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed italic mb-4">
                "Eu fui demitida por não saber me expressar. Fui ignorada em reuniões.
                Chorava antes de apresentações. Hoje, loto salas quando abro a boca."
              </p>
              <p className="text-sm font-bold text-gold">
                — Maria Marcelino
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg md:text-xl font-black mb-2">
              Gostou do que viu?
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Conheça o programa completo que já transformou +1.200 vidas
            </p>
            <a href="/liberte-sua-voz" className="inline-block">
              <Button
                size="lg"
                className="h-14 px-10 text-sm font-bold tracking-wide bg-gradient-gold-deep hover:opacity-90 transition-all duration-300 shadow-gold-intense rounded-xl gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Quero libertar minha voz
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <p className="text-[11px] text-muted-foreground mt-3">
              Programa Liberte Sua Voz · 12x de R$103,21
            </p>
          </motion.div>
        </div>
      </section>

      <D7Footer minimal />
    </div>
  );
};

export default Aulao;
