import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowUpRight, Plane } from "lucide-react";

import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import abidjanImg from "@/assets/cotedivoire-abidjan.jpg.asset.json";
import basilicaImg from "@/assets/cotedivoire-basilica.jpg.asset.json";
import culturaImg from "@/assets/cotedivoire-cultura.jpg.asset.json";
import { COTE_DIVOIRE_CTA_URL } from "@/lib/links";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const highlights = [
  {
    title: "Abidjan",
    text: "O coração econômico e cultural do país, onde modernidade, música e gastronomia se encontram às margens da laguna.",
    img: abidjanImg.url,
  },
  {
    title: "Yamoussoukro",
    text: "Visita à imponente Basílica de Nossa Senhora da Paz, símbolo da herança histórica e espiritual da Costa do Marfim.",
    img: basilicaImg.url,
  },
  {
    title: "Cultura viva",
    text: "Artesanato, tecelagens e tradições que mostram a riqueza e a diversidade das culturas ivorianas.",
    img: culturaImg.url,
  },
];

const itinerary = [
  { day: "04", title: "Chegada a Abidjan", desc: "Acolhida, apresentação da programação e primeiro contato com a energia da cidade." },
  { day: "05", title: "Conexões estratégicas", desc: "Encontros com representantes do turismo, cultura e imprensa locais." },
  { day: "06", title: "Rota cultural", desc: "Imersão em mercados, oficinas de artesanato e experiências gastronômicas." },
  { day: "07", title: "Yamoussoukro", desc: "Visita à Basílica de Nossa Senhora da Paz e ao legado histórico da capital política." },
  { day: "08", title: "Litoral e natureza", desc: "Contato com paisagens naturais e comunidades costeiras do sul." },
  { day: "09", title: "Intercâmbio Brasil-África", desc: "Rodas de conversa sobre diáspora, identidade e oportunidades de cooperação." },
  { day: "10", title: "Projetos futuros", desc: "Workshop de encerramento e mapeamento de parcerias pós-viagem." },
  { day: "11", title: "Retorno", desc: "Saída de Abidjan com novas histórias, conexões e narrativas para compartilhar." },
];

const ViagemCoteDIvoire = () => (
  <div className="min-h-screen bg-background">
    <SiteNav />

    {/* HERO */}
    <section className="relative h-[70svh] min-h-[420px] overflow-hidden">
      <img
        src={abidjanImg.url}
        alt="Abidjan, Costa do Marfim"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-maroon/55 via-maroon/30 to-maroon/90" />
      <div className="pattern-dots pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-16 pt-32 md:pb-24 md:pt-40">
        <motion.h1 {...fade(0)} className="font-display text-4xl text-cream md:text-6xl lg:text-7xl">
          Costa do Marfim
        </motion.h1>
        <motion.p {...fade(0.1)} className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/85 md:text-xl">
          Uma experiência especial para aproximar Brasil e África através de histórias, cultura e
          conexões estratégicas.
        </motion.p>

        <motion.div {...fade(0.14)} className="mt-6 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-4 py-2 text-xs font-medium text-cream backdrop-blur-sm">
            <Plane className="h-3.5 w-3.5 text-saffron" /> TAAG
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-4 py-2 text-xs font-medium text-cream backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5 text-saffron" /> Costa do Marfim
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-4 py-2 text-xs font-medium text-cream backdrop-blur-sm">
            <Calendar className="h-3.5 w-3.5 text-saffron" /> 04 a 11 de setembro
          </span>
        </motion.div>
      </div>
    </section>

    {/* INTRO */}
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="pattern-dots pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <motion.p {...fade(0)} className="text-[11px] font-bold uppercase tracking-[0.3em] text-terracotta">
          Parceria TAAG + Ministério do Turismo
        </motion.p>
        <motion.h2 {...fade(0.06)} className="mt-5 font-display text-2xl leading-snug md:text-4xl">
          Descobrir novos destinos é criar novas conexões
        </motion.h2>
        <motion.p {...fade(0.12)} className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Entre os dias <strong className="text-foreground">4 e 11 de setembro</strong>, a{" "}
          <strong className="text-foreground">TAAG</strong>, em parceria com o{" "}
          <strong className="text-foreground">Ministério do Turismo da Costa do Marfim</strong>,
          realizará um Famtour & PressTour exclusivo para jornalistas e representantes do setor de
          turismo. Fui convidado pelo Ministério do Turismo da Costa do Marfim para fazer parte dessa
          imersão.
        </motion.p>
        <motion.p {...fade(0.18)} className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          A experiência foi pensada para apresentar, em primeira mão, os atrativos do destino, sua
          cultura, gastronomia, hospitalidade e potencial turístico, além de reforçar a conexão entre
          o <strong className="text-foreground">Brasil</strong> e a{" "}
          <strong className="text-foreground">Costa do Marfim</strong>, via Luanda.
        </motion.p>
      </div>
    </section>

    {/* HIGHLIGHTS */}
    <section className="bg-gradient-earth py-16 text-cream md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <motion.p {...fade(0)} className="text-[11px] font-bold uppercase tracking-[0.3em] text-saffron">
          O que você vai conhecer
        </motion.p>
        <motion.h2 {...fade(0.06)} className="mt-4 font-display text-3xl md:text-5xl">
          Destaques da viagem
        </motion.h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {highlights.map((h, i) => (
            <motion.article
              key={h.title}
              {...fade(0.08 * i)}
              className="group overflow-hidden rounded-3xl border border-cream/15 bg-maroon/40"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={h.img}
                  alt={h.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={1024}
                  height={1024}
                />
              </div>
              <div className="p-5 md:p-6">
                <h3 className="font-display text-xl">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/75">{h.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* ITINERARY */}
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="pattern-dots pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-5xl px-5">
        <motion.p {...fade(0)} className="text-[11px] font-bold uppercase tracking-[0.3em] text-terracotta">
          Programação
        </motion.p>
        <motion.h2 {...fade(0.06)} className="mt-4 font-display text-3xl md:text-5xl">
          Roteiro da imersão
        </motion.h2>

        <div className="mt-12 space-y-4">
          {itinerary.map((item, i) => (
            <motion.div
              key={item.day}
              {...fade(0.04 * i)}
              className="flex gap-4 rounded-2xl border border-border bg-card p-5 md:gap-6 md:p-6"
            >
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-sun text-maroon md:h-14 md:w-14">
                <span className="text-[10px] font-bold uppercase tracking-wider">Set</span>
                <span className="font-display text-lg leading-none md:text-xl">{item.day}</span>
              </div>
              <div>
                <h3 className="font-display text-lg">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo via-maroon to-terracotta" />
      <div className="pattern-dots absolute inset-0 opacity-15" />
      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center md:py-28">
        <motion.h2 {...fade(0)} className="font-display text-3xl text-cream md:text-5xl">
          Côte D&apos;ívoire
        </motion.h2>
        <motion.p {...fade(0.06)} className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg">
          Uma jornada para aproximar Brasil e África, construir pontes e contar histórias que só a
          Costa do Marfim pode oferecer.
        </motion.p>
        <motion.div {...fade(0.12)} className="mt-8">
          <a
            href={COTE_DIVOIRE_CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 font-display text-lg font-bold text-maroon shadow-earth transition-transform hover:scale-105"
          >
            Côte D&apos;ívoire
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>

    <SiteFooter />
  </div>
);

export default ViagemCoteDIvoire;
