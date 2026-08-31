import { motion } from "framer-motion";
import { Mic, Camera, Megaphone, Compass, Globe2, Radio, Sparkles, ArrowUpRight } from "lucide-react";

import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import BackButton from "@/components/BackButton";

const servicos = [
  { icon: Mic, title: "Palestras", text: "África, diáspora, cultura e geopolítica para públicos corporativos e institucionais." },
  { icon: Camera, title: "Conteúdo para marcas", text: "Produção de conteúdo autoral para marcas e organizações que querem falar com a África." },
  { icon: Megaphone, title: "Campanhas institucionais", text: "Campanhas e projetos de impacto com narrativa africana contemporânea." },
  { icon: Compass, title: "Consultoria cultural", text: "Consultoria estratégica sobre África, cultura e mercados africanos." },
  { icon: Globe2, title: "Comunicação intercultural", text: "Posicionamento institucional e comunicação entre culturas e mercados." },
  { icon: Radio, title: "Mídia e entrevistas", text: "Podcasts, entrevistas, documentários e programas de mídia." },
  { icon: Sparkles, title: "Mestre de cerimônias", text: "Condução de eventos corporativos, institucionais e internacionais ligados à África." },
];

const diferenciais = [
  "Autoridade em temas africanos e da diáspora",
  "Linguagem acessível para audiências diversas",
  "Experiência corporativa internacional",
  "Forte conexão com comunidades africanas e afro-diaspóricas",
  "Conteúdo com alto potencial de alcance e engajamento",
  "Temas complexos transformados em histórias memoráveis",
  "Fluência em múltiplos idiomas para conectar mercados",
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const Servicos = () => (
  <div className="min-h-screen bg-background">
    <SiteNav />

    <section className="relative pb-16 pt-32 md:pb-20 md:pt-40">
      <div className="pattern-dots pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-5">
        <motion.h1 {...fade(0)} className="font-display text-4xl md:text-6xl">
          Serviços
        </motion.h1>
        <motion.p {...fade(0.06)} className="mt-4 max-w-2xl text-muted-foreground">
          Formatos para marcas, instituições e eventos que querem falar sobre África com
          profundidade, verdade e alcance.
        </motion.p>
        <motion.div {...fade(0.08)} className="mt-5 h-1 w-24 bg-gradient-sun" />
      </div>
    </section>

    <section className="pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicos.map((s, i) => (
            <motion.article
              key={s.title}
              {...fade(0.04 * i)}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-saffron hover:shadow-earth"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-saffron/15 text-terracotta transition-colors group-hover:bg-gradient-sun group-hover:text-maroon">
                <s.icon className="h-5 w-5" />
              </div>
              <h2 className="font-display text-lg">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-indigo p-8 text-cream md:p-12">
          <motion.h2 {...fade(0)} className="font-display text-2xl md:text-4xl">
            Por que trabalhar comigo?
          </motion.h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {diferenciais.map((d, i) => (
              <motion.li key={d} {...fade(0.04 * i)} className="flex items-start gap-3">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rotate-45 bg-saffron" />
                <span className="text-sm leading-relaxed text-cream/85">{d}</span>
              </motion.li>
            ))}
          </ul>

          <motion.a
            {...fade(0.2)}
            href="https://wa.me/5511976480548"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-sun px-8 py-4 text-sm font-bold text-maroon shadow-earth transition-transform hover:scale-105"
          >
            Trabalhe comigo <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </section>

    <SiteFooter />
  </div>
);

export default Servicos;
