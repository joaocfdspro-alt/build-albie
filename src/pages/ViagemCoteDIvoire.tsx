import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowLeft, ArrowUpRight, Plane } from "lucide-react";

import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import abidjanImg from "@/assets/cotedivoire-abidjan.jpg.asset.json";
import basilicaImg from "@/assets/cotedivoire-basilica.jpg.asset.json";
import culturaImg from "@/assets/cotedivoire-cultura.jpg.asset.json";

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
        <Link
          to="/"
          className="mb-6 inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-saffron"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Início
        </Link>

        <motion.p {...fade(0)} className="text-[11px] font-bold uppercase tracking-[0.3em] text-saffron">
          Viagem · 04 a 11 de setembro
        </motion.p>
        <motion.h1 {...fade(0.06)} className="mt-4 font-display text-4xl text-cream md:text-6xl lg:text-7xl">
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
          <strong className="text-foreground">TAAG</strong>, em parceria com o{