import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mic,
  Camera,
  Megaphone,
  Compass,
  Globe2,
  Radio,
  Sparkles,
  ArrowUpRight,
  ChevronDown,
  Calendar,
  MapPin,
} from "lucide-react";

import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import portrait from "@/assets/albie-portrait.jpg";

const slides = [
  {
    kicker: "África é Futuro",
    title: "Conectando África, Brasil e diáspora",
    text: "Comunicador pan-africano, palestrante e criador de conteúdo que transforma história e cultura em narrativas que aproximam pessoas.",
  },
  {
    kicker: "Narrativas",
    title: "A história d’África que não te contam",
    text: "Recolocando o continente africano no centro da história global — do passado antigo às potências que se desenham hoje.",
  },
  {
    kicker: "Geopolítica",
    title: "África no tabuleiro do século XXI",
    text: "Energia, minerais críticos, demografia e novas alianças redesenhando o poder global a partir do continente.",
  },
  {
    kicker: "Pontes",
    title: "Do Atlântico às oportunidades reais",
    text: "Cultura, negócios e identidade conectando Brasil, África e mercados internacionais.",
  },
];


const stats = [
  { value: "+150 mil", label: "seguidores" },
  { value: "Milhões", label: "de visualizações" },
  { value: "+30", label: "países alcançados" },
];

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

const artigos = [
  {
    tag: "História",
    title: "A história d'África que não te contam",
    text: "Narrativas que recolocam o continente africano no centro da história global — do passado antigo às potências que se desenham hoje.",
    href: "https://www.instagram.com/albieman.nguma/",
  },
  {
    tag: "Geopolítica",
    title: "África no tabuleiro do século XXI",
    text: "Como energia, minerais críticos, demografia e novas alianças estão redesenhando o poder global a partir do continente.",
    href: "https://www.youtube.com/@Albienguma",
  },
  {
    tag: "Brasil–África",
    title: "Pontes entre Brasil, África e diáspora",
    text: "Cultura, negócios e identidade: o que aproxima os dois lados do Atlântico e onde estão as oportunidades reais.",
    href: "https://www.instagram.com/albieman.nguma/",
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const heroLinks = [
  { label: "Trajetória", to: "/trajetoria" },
  { label: "Serviços", to: "#servicos" },
  { label: "Artigos", to: "#artigos" },
  { label: "Contato", to: "#contato" },
];

const Index = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => window.clearInterval(id);
  }, []);

  const slide = slides[active];

  return (
    <div id="topo" className="min-h-screen bg-background">
      <SiteNav />

      {/* HERO — foto dele em tela cheia, sem texto sobre o rosto */}
      <section className="relative h-[100svh] overflow-hidden">
        <motion.img
          src={portrait}
          alt="Albie Nguma, comunicador pan-africano e palestrante"
          className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
          loading="eager"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-maroon/40 via-transparent to-maroon/70" />
        <div className="pattern-dots pointer-events-none absolute inset-0 opacity-20" />

        {/* seta minimalista para baixo */}
        <motion.a
          href="#conteudo"
          aria-label="Rolar para baixo"
          className="absolute bottom-6 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-1 text-cream/70 transition-colors hover:text-saffron"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Descer</span>
          <ChevronDown className="h-6 w-6" />
        </motion.a>
      </section>

      {/* CONTEÚDO DO HERO — abaixo da foto */}
      <section id="conteudo" className="relative -mt-1 bg-maroon px-5 pb-14 pt-10 md:pb-20">
        <div className="mx-auto w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-4 inline-flex items-center rounded-full border border-saffron/40 bg-saffron/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-saffron">
                {slide.kicker}
              </p>
              <h1 className="font-display text-4xl leading-[1.05] text-cream md:text-6xl">
                {slide.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/80 md:text-lg">
                {slide.text}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* indicadores */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ir para o slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-10 bg-gradient-sun" : "w-4 bg-cream/30 hover:bg-cream/60"
                }`}
              />
            ))}
          </div>

          {/* botões estilo linktree */}
          <nav className="mt-9 flex flex-col gap-3">
            <a
              href="https://wa.me/5511976480548"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-between rounded-2xl bg-cream px-6 py-4 text-base font-bold text-maroon shadow-earth transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Trabalhe comigo</span>
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            {heroLinks.map((l) =>
              l.to.startsWith("#") ? (
                <a
                  key={l.label}
                  href={l.to}
                  className="group flex w-full items-center justify-between rounded-2xl border-2 border-cream/30 bg-transparent px-6 py-4 text-base font-bold text-cream transition-colors hover:border-saffron hover:bg-cream/5"
                >
                  <span>{l.label}</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ) : (
                <Link
                  key={l.label}
                  to={l.to}
                  className="group flex w-full items-center justify-between rounded-2xl border-2 border-cream/30 bg-transparent px-6 py-4 text-base font-bold text-cream transition-colors hover:border-saffron hover:bg-cream/5"
                >
                  <span>{l.label}</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              )
            )}
          </nav>

          <dl className="mt-10 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 border-saffron pl-3">
                <dt className="font-display text-lg text-cream md:text-2xl">{s.value}</dt>
                <dd className="text-xs text-cream/70">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* DESTAQUE — Viagem Costa Rica */}
      <section className="bg-background px-5 py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div
            {...fade(0)}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-terracotta to-saffron p-1 shadow-earth"
          >
            <div className="relative rounded-[22px] bg-maroon p-6 md:p-10">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-saffron/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-saffron">
                    <Calendar className="h-3.5 w-3.5" />
                    Próxima viagem
                  </div>
                  <h2 className="font-display text-2xl text-cream md:text-4xl">
                    Costa Rica
                  </h2>
                  <p className="mt-2 flex items-center gap-2 text-sm text-cream/80">
                    <MapPin className="h-4 w-4 text-saffron" />
                    04 a 11 de setembro
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/70">
                    Uma imersão para aproximar Brasil e África através de histórias, cultura e
                    conexões estratégicas na Costa Rica.
                  </p>
                </div>
                <a
                  href="https://wa.me/5511976480548?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20a%20viagem%20%C3%A0%20Costa%20Rica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-sun px-6 py-3 text-sm font-bold text-maroon shadow-earth transition-transform hover:scale-105"
                >
                  Saiba mais <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* SERVIÇOS */}
      <section id="servicos" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <motion.h2 {...fade(0)} className="font-display text-3xl md:text-5xl">
            Serviços
          </motion.h2>
          <motion.p {...fade(0.06)} className="mt-4 max-w-2xl text-muted-foreground">
            Formatos para marcas, instituições e eventos que querem falar sobre África com
            profundidade, verdade e alcance.
          </motion.p>
          <motion.div {...fade(0.08)} className="mt-5 h-1 w-24 bg-gradient-sun" />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {servicos.map((s, i) => (
              <motion.article
                key={s.title}
                {...fade(0.04 * i)}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-saffron hover:shadow-earth"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-saffron/15 text-terracotta transition-colors group-hover:bg-gradient-sun group-hover:text-maroon">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </motion.article>
            ))}
          </div>

          {/* Por que trabalhar comigo */}
          <div className="mt-20 rounded-3xl bg-indigo p-8 text-cream md:p-12">
            <motion.h3 {...fade(0)} className="font-display text-2xl md:text-4xl">
              Por que trabalhar comigo?
            </motion.h3>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {diferenciais.map((d, i) => (
                <motion.li key={d} {...fade(0.04 * i)} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rotate-45 bg-saffron" />
                  <span className="text-sm leading-relaxed text-cream/85">{d}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ARTIGOS */}
      <section id="artigos" className="bg-muted/60 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <motion.h2 {...fade(0)} className="font-display text-3xl md:text-5xl">
            Artigos
          </motion.h2>
          <motion.p {...fade(0.06)} className="mt-4 max-w-2xl text-muted-foreground">
            Ideias, análises e conteúdos sobre o continente africano, a diáspora e as conexões com o
            Brasil.
          </motion.p>
          <motion.div {...fade(0.08)} className="mt-5 h-1 w-24 bg-gradient-sun" />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {artigos.map((a, i) => (
              <motion.a
                key={a.title}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                {...fade(0.06 * i)}
                className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-earth"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-terracotta">
                  {a.tag}
                </span>
                <h3 className="mt-3 font-display text-xl leading-snug">{a.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-foreground">
                  Acompanhar
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* MISSÃO + CONTATO */}
      <section id="contato" className="relative overflow-hidden py-20 md:py-28">
        <div className="pattern-dots pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-5 text-center">
          <motion.p {...fade(0)} className="text-[11px] font-bold uppercase tracking-[0.3em] text-terracotta">
            Missão
          </motion.p>
          <motion.h2 {...fade(0.06)} className="mt-5 font-display text-2xl leading-snug md:text-4xl">
            Aproximar África e Brasil através de histórias, conhecimento e oportunidades,
            contribuindo para uma narrativa mais ampla, moderna e conectada sobre o continente
            africano.
          </motion.h2>

          <motion.div {...fade(0.14)} className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/5511976480548"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-sun px-8 py-4 text-sm font-bold text-maroon shadow-earth transition-transform hover:scale-105"
            >
              Falar no WhatsApp <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/albieman.nguma/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-8 py-4 text-sm font-bold transition-colors hover:border-foreground/50"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@Albienguma"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-8 py-4 text-sm font-bold transition-colors hover:border-foreground/50"
            >
              YouTube
            </a>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
