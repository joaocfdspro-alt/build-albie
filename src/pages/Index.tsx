import { motion } from "framer-motion";
import {
  Mic,
  Camera,
  Megaphone,
  Compass,
  Globe2,
  Radio,
  Sparkles,
  ArrowUpRight,
  MapPin,
  Plane,
} from "lucide-react";

import { Instagram, Youtube, MessageCircle } from "lucide-react";
import MinimalistHero from "@/components/ui/minimalist-hero";
import SiteFooter from "@/components/SiteFooter";
import portrait from "@/assets/albie-portrait.jpg";

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

const Index = () => {
  return (
    <div id="topo" className="min-h-screen bg-background">
      {/* HERO */}
      <MinimalistHero
        logoText="NGUMA."
        navLinks={[
          { label: "Trajetória", href: "#trajetoria" },
          { label: "Serviços", href: "#servicos" },
          { label: "Artigos", href: "#artigos" },
          { label: "Contato", href: "#contato" },
        ]}
        mainText={`Comunicador pan-africano, palestrante e criador de conteúdo.\n\nTransformo história, cultura, negócios e geopolítica em narrativas que aproximam pessoas, comunidades, marcas e mercados.`}
        readMoreLink="#trajetoria"
        imageSrc={portrait}
        imageAlt="Albie Nguma, comunicador pan-africano e palestrante"
        overlayText={{ part1: "África é", part2: "Futuro." }}
        socialLinks={[
          { icon: Instagram, href: "https://www.instagram.com/albieman.nguma/" },
          { icon: Youtube, href: "https://www.youtube.com/@Albienguma" },
          { icon: MessageCircle, href: "https://wa.me/5511976480548" },
        ]}
        locationText="São Paulo · Brasil"
      />

      {/* STATS */}
      <section className="border-y border-border bg-card py-10">
        <dl className="mx-auto grid max-w-4xl grid-cols-3 gap-4 px-5">
          {stats.map((s, i) => (
            <motion.div key={s.label} {...fade(0.05 * i)} className="border-l-2 border-saffron pl-3">
              <dt className="font-display text-xl text-foreground md:text-3xl">{s.value}</dt>
              <dd className="text-xs text-muted-foreground md:text-sm">{s.label}</dd>
            </motion.div>
          ))}
        </dl>
      </section>

      {/* TRAJETÓRIA */}
      <section id="trajetoria" className="bg-gradient-earth py-20 text-cream md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <motion.h2 {...fade(0)} className="font-display text-3xl md:text-5xl">
            Trajetória
          </motion.h2>
          <motion.div {...fade(0.06)} className="mt-5 h-1 w-24 bg-gradient-sun" />

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <motion.div {...fade(0.1)} className="space-y-5 text-cream/80">
              <p className="text-lg leading-relaxed text-cream">
                Filho de educadores, cresci em um ambiente onde história, conhecimento e debate
                público faziam parte do cotidiano. Minha mãe foi professora e meu pai, professor de
                História Africana, História da Antiguidade e também político — despertando em mim
                desde cedo o interesse por identidade, cultura, desenvolvimento e relações
                internacionais.
              </p>
              <p className="leading-relaxed">
                Nasci em Angola, vivi em diferentes países e aprendi que as maiores oportunidades
                surgem quando culturas, ideias e pessoas se conectam.
              </p>
              <p className="leading-relaxed">
                Minha trajetória profissional combina experiência corporativa internacional, atuação
                em negócios, relacionamento e desenvolvimento de mercados na América Latina.
              </p>
            </motion.div>

            <motion.div {...fade(0.18)} className="space-y-5 text-cream/80">
              <p className="leading-relaxed">
                Hoje, uno essa vivência à comunicação para contar histórias que ajudam a compreender
                a África contemporânea, suas conexões com o Brasil e as transformações que estão
                moldando o século XXI.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-xs font-medium">
                  <MapPin className="h-3.5 w-3.5 text-saffron" /> Angola · Brasil · Mundo
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-xs font-medium">
                  <Globe2 className="h-3.5 w-3.5 text-saffron" /> 9 idiomas
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-xs font-medium">
                  <Plane className="h-3.5 w-3.5 text-saffron" /> Piloto em formação
                </span>
              </div>

              <blockquote className="mt-8 rounded-2xl border-l-4 border-saffron bg-cream/5 p-6">
                <p className="font-display text-lg leading-snug text-cream md:text-xl">
                  “Não conto apenas histórias sobre a África. Construo pontes entre África, Brasil e
                  o mundo.”
                </p>
                <footer className="mt-3 text-xs uppercase tracking-[0.25em] text-saffron">
                  Albie Nguma
                </footer>
              </blockquote>
            </motion.div>
          </div>
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
