import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Calendar, MapPin } from "lucide-react";

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

const heroLinks = [
  { label: "Trajetória", to: "/trajetoria" },
  { label: "Serviços / Trabalhe comigo", to: "/servicos" },
  { label: "Na mídia", to: "/artigos" },
];

const trips = [
  {
    id: "cote-divoire",
    badge: "Próxima viagem",
    title: "Costa do Marfim",
    date: "04 a 11 de setembro",
    text: "Uma imersão para aproximar Brasil e África através de histórias, cultura e conexões estratégicas na Costa do Marfim.",
    cta: "Saiba mais",
    href: "/cote-divoire",
  },
];

const Index = () => {
  const [active, setActive] = useState(0);
  const [activeTrip, setActiveTrip] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => window.clearInterval(id);
  }, []);

  const slide = slides[active];
  const trip = trips[activeTrip];

  return (
    <div id="topo" className="min-h-screen bg-background">
      <SiteNav />

      {/* HERO — foto dele em tela cheia + slides sobre a foto */}
      <section className="relative h-[100svh] overflow-hidden">
        <motion.img
          src={portrait}
          alt="Albie Nguma, comunicador pan-africano e palestrante"
          className="absolute inset-0 h-full w-full object-cover object-[50%_42%]"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
          loading="eager"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-maroon/40 via-maroon/20 to-maroon/85" />
        <div className="pattern-dots pointer-events-none absolute inset-0 opacity-20" />

        {/* SLIDES — sobre a foto */}
        <div className="absolute inset-x-0 bottom-20 z-10 px-5 md:bottom-28">
          <div className="mx-auto w-full max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mb-3 inline-flex items-center rounded-full border border-saffron/40 bg-saffron/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-saffron">
                  {slide.kicker}
                </p>
                <h1 className="font-display text-4xl leading-[1.05] text-cream md:text-5xl">
                  {slide.title}
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/80 md:text-lg">
                  {slide.text}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* indicadores */}
            <div className="mt-6 flex items-center justify-center gap-2">
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
          </div>
        </div>

        {/* seta minimalista para baixo */}
        <div className="absolute inset-x-0 bottom-2 z-20 flex justify-center">
          <motion.a
            href="#conteudo"
            aria-label="Rolar para baixo"
            className="flex flex-col items-center gap-1 text-cream/70 transition-colors hover:text-saffron"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Descer</span>
            <ChevronDown className="h-6 w-6" />
          </motion.a>
        </div>
      </section>

      {/* CONTEÚDO DO HERO — abaixo da foto */}
      <section id="conteudo" className="relative -mt-1 bg-maroon px-5 pb-14 pt-10 md:pb-20">
        <div className="mx-auto w-full max-w-2xl">
          {/* CARD LIQUID GLASS — carrossel de viagens */}
          <div className="mx-auto w-full max-w-md md:max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-[24px] p-[2px] shadow-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(12 72% 46% / 0.95), hsl(38 92% 50% / 0.95), hsl(12 72% 46% / 0.95))",
                }}
              >
                <div className="relative overflow-hidden rounded-[22px] bg-maroon/55 p-4 backdrop-blur-xl md:p-5">
                  {/* reflexo sutil de vidro */}
                  <div className="pointer-events-none absolute -left-1/2 -top-1/2 h-[200%] w-[200%] rotate-45 bg-gradient-to-b from-cream/10 via-transparent to-transparent opacity-40" />

                  <div className="relative flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-saffron/30 bg-saffron/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-saffron">
                        <Calendar className="h-3 w-3" />
                        {trip.badge}
                      </div>

                      <div className="flex flex-col gap-0.5 md:flex-row md:items-baseline md:gap-3">
                        <h2 className="font-display text-2xl leading-none text-cream md:text-3xl">
                          {trip.title}
                        </h2>
                        <p className="flex items-center gap-1.5 text-sm font-medium text-cream/80">
                          <MapPin className="h-3.5 w-3.5 text-saffron" />
                          {trip.date}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={trip.href}
                      className="group inline-flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-sun px-5 py-2.5 text-sm font-bold text-maroon shadow-earth transition-transform hover:scale-[1.02] active:scale-[0.98] md:w-auto md:px-6"
                    >
                      {trip.cta}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* indicadores do carrossel de viagens */}
            {trips.length > 1 && (
              <div className="mt-3 flex items-center justify-center gap-2">
                {trips.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTrip(i)}
                    aria-label={`Ir para a viagem ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeTrip ? "w-10 bg-gradient-sun" : "w-4 bg-cream/30 hover:bg-cream/60"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* botões estilo linktree */}
          <nav className="mt-9 flex flex-col gap-3">
            <button
              type="button"
              className="group flex w-full items-center justify-between rounded-2xl bg-gradient-sun px-6 py-4 text-left text-base font-bold text-maroon shadow-earth transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>CÔTE D’IVOIRE</span>
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
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




      <SiteFooter />
    </div>
  );
};

export default Index;
