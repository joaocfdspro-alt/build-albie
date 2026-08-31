import { motion } from "framer-motion";
import { MapPin, Globe2, Plane, ArrowUpRight } from "lucide-react";

import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import BackButton from "@/components/BackButton";
import portrait from "@/assets/albie-portrait.jpg";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const marcos = [
  { title: "Raízes", text: "Filho de educadores: mãe professora e pai professor de História Africana, História da Antiguidade e político. Identidade, cultura e debate público desde cedo." },
  { title: "Angola e o mundo", text: "Nascido em Angola, viveu em diferentes países e aprendeu que as maiores oportunidades surgem quando culturas, ideias e pessoas se conectam." },
  { title: "Carreira corporativa", text: "Experiência internacional em negócios, relacionamento e desenvolvimento de mercados na América Latina." },
  { title: "Comunicação", text: "Hoje une essa vivência à comunicação para contar histórias que ajudam a compreender a África contemporânea e suas conexões com o Brasil." },
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

const Trajetoria = () => {
  return (
    <div id="topo" className="min-h-screen bg-background">
      <SiteNav />

      <section className="bg-gradient-earth pb-16 pt-32 text-cream md:pb-24 md:pt-40">
        <div className="mx-auto max-w-6xl px-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-saffron"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Início
          </Link>

          <motion.h1 {...fade(0.04)} className="mt-6 font-display text-4xl md:text-6xl">
            Trajetória
          </motion.h1>
          <motion.div {...fade(0.08)} className="mt-5 h-1 w-24 bg-gradient-sun" />

          <div className="mt-12 grid items-start gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <motion.div {...fade(0.12)} className="space-y-5 text-cream/80">
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
                em negócios, relacionamento e desenvolvimento de mercados na América Latina. Hoje,
                uno essa vivência à comunicação para contar histórias que ajudam a compreender a
                África contemporânea, suas conexões com o Brasil e as transformações que estão
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
            </motion.div>

            <motion.div {...fade(0.2)} className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-3 rotate-3 rounded-[2rem] bg-indigo/90" />
              <img
                src={portrait}
                alt="Albie Nguma, comunicador pan-africano"
                className="relative w-full rounded-[1.75rem] object-cover shadow-earth"
                loading="lazy"
              />
            </motion.div>
          </div>

          <blockquote className="mt-14 rounded-2xl border-l-4 border-saffron bg-cream/5 p-6 md:p-8">
            <p className="font-display text-lg leading-snug text-cream md:text-2xl">
              “Não conto apenas histórias sobre a África. Construo pontes entre África, Brasil e o
              mundo.”
            </p>
            <footer className="mt-3 text-xs uppercase tracking-[0.25em] text-saffron">
              Albie Nguma
            </footer>
          </blockquote>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <motion.h2 {...fade(0)} className="font-display text-3xl md:text-5xl">
            Marcos
          </motion.h2>
          <motion.div {...fade(0.06)} className="mt-5 h-1 w-24 bg-gradient-sun" />

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {marcos.map((m, i) => (
              <motion.article
                key={m.title}
                {...fade(0.05 * i)}
                className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-saffron hover:shadow-earth"
              >
                <h3 className="font-display text-lg">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-16 rounded-3xl bg-indigo p-8 text-cream md:p-12">
            <h3 className="font-display text-2xl md:text-4xl">Por que trabalhar comigo?</h3>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {diferenciais.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rotate-45 bg-saffron" />
                  <span className="text-sm leading-relaxed text-cream/85">{d}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/5511976480548"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-sun px-7 py-3.5 text-sm font-bold text-maroon shadow-earth transition-transform hover:scale-105"
            >
              Trabalhe comigo <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Trajetoria;
