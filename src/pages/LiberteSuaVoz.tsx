import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Star,
  BookOpen,
  Mic2,
  Heart,
  Shield,
  Flame,
  Crown,
  Quote,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logo-maria.png";
import D7Footer from "@/components/D7Footer";
import mariaHeroImage from "@/assets/maria-hero-course.png";
import mariaMentorCircle from "@/assets/maria-mentor-circle.png";
import depPrint1 from "@/assets/depoimento-print-1.avif";
import depPrint2 from "@/assets/depoimento-print-2.avif";
import depPrint3 from "@/assets/depoimento-print-3.avif";
import depPrint4 from "@/assets/depoimento-print-4.avif";

const checkoutUrl = "https://pay.hotmart.com/U100026291F?off=ciqw2oyq";
const whatsappUrl = "https://wa.me/5528999785743";

const printTestimonials = [depPrint1, depPrint2, depPrint3, depPrint4];

const modules = [
  { icon: Shield, number: "01", title: "Raiz da Voz", description: "O que te silenciou não foi timidez — foi sobrevivência. Aqui você entende a origem e começa a se libertar." },
  { icon: Heart, number: "02", title: "Cura Vocal", description: "Sua garganta guarda tudo que você engoliu. Exercícios de desbloqueio emocional para soltar o que te prende." },
  { icon: Mic2, number: "03", title: "Presença Magnética", description: "Aprenda a ocupar qualquer sala sem gritar, sem forçar — só com a verdade da sua voz." },
  { icon: Flame, number: "04", title: "Comunicação de Impacto", description: "Estruture falas que fazem as pessoas pararem para te ouvir. Convença, emocione, transforme." },
  { icon: BookOpen, number: "05", title: "Palco da Vida Real", description: "Reuniões, vídeos, palestras, conversas difíceis — aplique tudo onde sua voz realmente importa." },
  { icon: Crown, number: "06", title: "Voz de Autoridade", description: "Pare de pedir permissão. Posicione-se como referência e seja impossível de ignorar." },
];

const videoTestimonials = [
  { id: "u16m-yUt6nY", title: "Depoimento 1" },
  { id: "Cbr2mwrFf90", title: "Depoimento 2" },
  { id: "PfCQgfJ7PxY", title: "Depoimento 3" },
  { id: "llXa-QZUtZc", title: "Depoimento 4" },
  { id: "zwHF31WrKDE", title: "Depoimento 5" },
];

const writtenTestimonials = [
  { name: "Carla Souza", role: "Advogada", text: "Eu tremia antes de falar em audiências. Depois do módulo 3, meus colegas perguntaram o que tinha mudado. Eu mudei.", stars: 5 },
  { name: "Fernanda Lima", role: "Empreendedora", text: "Gravava 40 takes de um story. Hoje gravo de primeira. A Maria não ensina técnica, ela destrava algo dentro de você.", stars: 5 },
  { name: "Juliana Rocha", role: "Professora", text: "Achei que meu problema era timidez. Na verdade, era uma crença de que minha voz não importava. Hoje, loto auditórios.", stars: 5 },
  { name: "Patrícia Mendes", role: "Gestora de RH", text: "O programa mudou minha carreira. Fui promovida 3 meses depois de terminar. Meu chefe disse: 'você está diferente'.", stars: 5 },
];

const benefits = [
  "Módulos completos sobre postura, respiração, voz e oratória",
  "Estratégias práticas para reuniões, apresentações e entrevistas",
  "Exercícios semanais que vão acelerar seu progresso",
  "Materiais de apoio exclusivos para potencializar seu aprendizado",
  "Grupo exclusivo de alunas no WhatsApp",
  "3 aulas ao vivo de mentoria com Maria",
  "Certificado de conclusão",
];

const faqs = [
  { q: "Para quem é o programa?", a: "Para qualquer pessoa que sente que sua voz não é ouvida — em reuniões, em casa, nas redes sociais ou na vida. Não importa se você é tímida ou extrovertida." },
  { q: "Preciso ter experiência com oratória?", a: "Absolutamente não. O programa começa do zero, trabalhando primeiro a raiz emocional antes de qualquer técnica." },
  { q: "Por quanto tempo tenho acesso?", a: "Acesso vitalício. Você pode revisitar os módulos quantas vezes quiser, no seu ritmo." },
  { q: "E se eu não gostar?", a: "Você tem 7 dias de garantia incondicional. Se não fizer sentido pra você, devolvemos 100% do valor." },
];

const stats = [
  { icon: Users, value: "500+", label: "Alunas transformadas" },
  { icon: Award, value: "12+", label: "Anos de experiência" },
  { icon: TrendingUp, value: "97%", label: "Taxa de satisfação" },
];

/* ─── CTA Button ─── */
const CtaButton = ({ className = "", text = "Quero ter resultados!" }: { className?: string; text?: string }) => (
  <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
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

/* ─── Video Carousel (smaller) ─── */
const VideoCarousel = ({ videos }: { videos: typeof videoTestimonials }) => {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const next = useCallback(() => setActive((p) => (p + 1) % videos.length), [videos.length]);
  const prev = useCallback(() => setActive((p) => (p - 1 + videos.length) % videos.length), [videos.length]);

  useEffect(() => {
    timerRef.current = setInterval(next, 8000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 8000);
  };

  return (
    <div className="relative max-w-xs mx-auto">
      <div className="aspect-[9/16] rounded-2xl overflow-hidden border border-border/50 bg-card shadow-gold">
        <iframe
          key={active}
          src={`https://www.youtube.com/embed/${videos[active].id}?rel=0&autoplay=1&mute=1`}
          title={videos[active].title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      <div className="flex items-center justify-center gap-4 mt-5">
        <button onClick={() => { prev(); resetTimer(); }} className="bg-card border border-border/50 rounded-full p-2 hover:border-gold/30 transition-colors">
          <ChevronLeft className="h-4 w-4 text-foreground/70" />
        </button>
        <div className="flex gap-2">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); resetTimer(); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-gold" : "w-1.5 bg-muted-foreground/30"}`}
            />
          ))}
        </div>
        <button onClick={() => { next(); resetTimer(); }} className="bg-card border border-border/50 rounded-full p-2 hover:border-gold/30 transition-colors">
          <ChevronRight className="h-4 w-4 text-foreground/70" />
        </button>
      </div>
    </div>
  );
};

/* ─── Print Testimonials Infinite Loop ─── */
const PrintTestimonialsLoop = () => {
  const doubled = [...printTestimonials, ...printTestimonials];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-4"
        animate={{ x: [0, -(printTestimonials.length * 290)] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((img, i) => (
          <div key={i} className="shrink-0 w-[270px] rounded-xl overflow-hidden border border-border/50 shadow-lg">
            <img src={img} alt={`Depoimento ${(i % printTestimonials.length) + 1}`} className="w-full h-auto" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ─── Written Testimonial Carousel ─── */
const TestimonialCarousel = ({ testimonials }: { testimonials: typeof writtenTestimonials }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="min-h-[200px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border/50 rounded-2xl p-8 relative text-center"
          >
            <Quote className="h-8 w-8 text-gold/15 mx-auto mb-4" />
            <div className="flex gap-0.5 justify-center mb-4">
              {Array.from({ length: testimonials[active].stars }).map((_, j) => (
                <Star key={j} className="h-4 w-4 text-gold fill-gold" />
              ))}
            </div>
            <p className="text-base md:text-lg text-foreground/85 leading-relaxed italic mb-6">
              "{testimonials[active].text}"
            </p>
            <p className="text-sm font-bold text-foreground/90">{testimonials[active].name}</p>
            <p className="text-xs text-muted-foreground">{testimonials[active].role}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-2 justify-center mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-gold" : "w-1.5 bg-muted-foreground/30"}`}
          />
        ))}
      </div>
    </div>
  );
};

/* ─── Main Page ─── */
const LiberteSuaVoz = () => {
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
            <a href="/"><img src={logoImage} alt="Maria Marcelino" className="h-8 invert opacity-90" /></a>
          </div>
          <CtaButton className="h-10 px-6 text-xs" text="Inscreva-se" />
        </div>
      </nav>

      {/* Hero - Fixed background image */}
      <section className="relative min-h-[75vh] md:min-h-[85vh]">
        {/* Fixed image that stays in place while content scrolls over */}
        <div className="fixed top-0 left-0 right-0 h-[75vh] md:h-[85vh] z-0">
          <div className="absolute inset-0 bg-background" />
          <img
            src={mariaHeroImage}
            alt="Maria Marcelino"
            className="absolute inset-0 w-full h-full object-cover object-[60%_20%] md:object-[72%_15%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent md:via-background/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        </div>

        {/* Content overlay on top of fixed image */}
        <div className="relative z-10 min-h-[75vh] md:min-h-[85vh] flex items-center">
          <div className="max-w-6xl mx-auto px-6 py-14 lg:py-24 w-full">
            <div className="max-w-xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-gold bg-gold/10 px-4 py-1.5 rounded-full border border-gold/20 mb-6"
              >
                <Crown className="h-3 w-3" />
                Programa completo
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-6"
              >
                Chega de ser{" "}
                <span className="text-gradient-gold">ignorada.</span>
                <br />
                <span className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary-foreground/60 mt-2 block">
                  Liberte Sua Voz.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-base md:text-lg text-secondary-foreground/80 leading-relaxed max-w-lg mb-8"
              >
                Você tem algo poderoso a dizer. O problema nunca foi a sua voz — foi o que te ensinaram a engolir. Esse programa devolve o que sempre foi seu.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <CtaButton />
                <div className="text-xs text-muted-foreground">
                  <p className="font-semibold text-foreground/80">12x de R$103,21</p>
                  <p>ou R$ 997,00 à vista</p>
                  <p className="mt-1">Acesso vitalício · Garantia 7 dias</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Solid background cover to hide fixed image as user scrolls past hero */}
      <div className="relative z-10 bg-background">

      {/* Stats */}
      <section className="border-y border-border/50 bg-card/50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center">
                <s.icon className="h-5 w-5 text-gold mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-black text-gradient-gold">{s.value}</p>
                <p className="text-[11px] md:text-xs text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain */}
      <section className="bg-background">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6">
              Você fala e ninguém para pra{" "}
              <span className="text-gradient-gold">te ouvir?</span>
            </h2>
            <div className="max-w-2xl mx-auto space-y-4 text-sm md:text-base text-secondary-foreground/70 leading-relaxed">
              <p>Você engole o que pensa pra não incomodar. Ensaia mil vezes e na hora, trava. Sente que o mundo não ouve quem você realmente é.</p>
              <p>Profissionais brilhantes ficam pra trás todos os dias — não por falta de talento, mas porque ninguém ensinou a elas que sua voz merece espaço.</p>
              <p className="text-foreground/90 font-semibold">A Maria sabe disso porque viveu isso. Foi demitida por não saber se expressar. Hoje, lota salas quando abre a boca.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modules */}
      <section className="bg-card/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">O que você irá aprender</h2>
              <p className="text-sm text-muted-foreground">6 módulos transformadores para você dominar sua comunicação</p>
              <div className="w-16 h-[2px] bg-gradient-gold mx-auto mt-4" />
            </motion.div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((mod, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group bg-card border border-border/50 rounded-2xl p-6 hover:border-gold/30 hover:shadow-gold transition-all duration-500">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 border border-gold/20 group-hover:bg-gold/20 transition-colors">
                    <mod.icon className="h-4 w-4 text-gold" />
                  </div>
                  <span className="text-[10px] font-bold text-gold/50 tracking-widest">{mod.number}</span>
                </div>
                <h3 className="font-bold text-base mb-2">{mod.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{mod.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center mb-10">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                Veja quem já <span className="text-gradient-gold">transformou</span> sua voz
              </h2>
              <p className="text-sm text-muted-foreground">Histórias reais de alunas que libertaram suas vozes</p>
              <div className="w-16 h-[2px] bg-gradient-gold mx-auto mt-4" />
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <VideoCarousel videos={videoTestimonials} />
          </motion.div>
        </div>
      </section>

      {/* Print Testimonials */}
      <section className="bg-card/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center mb-10">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                Resultados <span className="text-gradient-gold">reais</span>
              </h2>
              <p className="text-sm text-muted-foreground">Prints de alunas que mudaram suas vidas</p>
              <div className="w-16 h-[2px] bg-gradient-gold mx-auto mt-4" />
            </motion.div>
          </div>
          <PrintTestimonialsLoop />
        </div>
      </section>

      {/* About Maria */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 lg:order-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-4 block">Sua mentora</span>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6">Maria Marcelino</h2>
              <div className="space-y-4 text-sm md:text-base text-secondary-foreground/70 leading-relaxed">
                <p>Ela foi demitida por não saber se expressar. Foi ignorada em reuniões. Chorava antes de apresentações. Até decidir que nunca mais seria silenciada.</p>
                <p>Com mais de 12 anos de experiência em vendas, oratória, neurociência e desenvolvimento humano, já transformou a comunicação de centenas de mulheres que viviam o mesmo.</p>
                <p className="text-foreground/90 font-semibold italic">"Dessa dor nasceu o método Liberte Sua Voz — um caminho para que nenhuma mulher precise mais pedir permissão pra ser ouvida."</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-gold/30 shadow-gold-intense">
                  <img src={mariaMentorCircle} alt="Maria Marcelino" className="w-full h-full object-cover object-top scale-110" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-card border border-gold/30 rounded-full p-2.5 shadow-gold">
                  <Crown className="h-5 w-5 text-gold" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Written Testimonials */}
      <section className="bg-card/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center mb-10">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">O que as alunas dizem</h2>
              <div className="w-16 h-[2px] bg-gradient-gold mx-auto mt-4" />
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <TestimonialCarousel testimonials={writtenTestimonials} />
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-background">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-card border border-gold/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.04] to-transparent" />
            <div className="relative z-10">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-xl md:text-2xl font-black tracking-tight mb-6">Tudo que você recebe:</h2>
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
                  <p className="text-xs text-muted-foreground line-through mb-1">De R$ 4.997,90</p>
                  <p className="text-3xl md:text-4xl font-black text-gradient-gold mb-1">R$ 997,00</p>
                  <p className="text-sm text-muted-foreground mb-6">à vista ou <span className="font-bold text-foreground/90">12x de R$103,21</span></p>
                  <CtaButton className="w-full md:w-auto" />
                  <p className="text-[11px] text-muted-foreground mt-3">Acesso vitalício · Garantia incondicional de 7 dias</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-card/30 border-y border-border/50">
        <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">Perguntas frequentes</h2>
            <div className="w-16 h-[2px] bg-gradient-gold mx-auto mt-4" />
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-card border border-border/50 rounded-xl overflow-hidden">
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
      <section className="bg-background">
        <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-black leading-tight mb-3">
              A próxima vez que você abrir a boca,<br />
              <span className="text-gradient-gold">vai ser diferente.</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
              Esse não é mais um curso de oratória. É o momento em que você decide parar de engolir quem você é — e começa a ser impossível de ignorar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CtaButton />
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button size="lg" variant="outline" className="h-14 px-8 text-sm font-bold rounded-xl gap-2 border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300">
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp
                </Button>
              </a>
            </div>
            <p className="text-[11px] text-muted-foreground mt-3">Garantia incondicional de 7 dias</p>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Float */}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 duration-300"
        aria-label="WhatsApp">
        <MessageCircle className="h-6 w-6" />
      </a>

      <D7Footer />
      </div>{/* end solid bg wrapper */}
    </div>
  );
};

export default LiberteSuaVoz;
