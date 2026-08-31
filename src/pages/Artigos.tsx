import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const artigos = [
  {
    tag: "Entrevista",
    title: "Bárbara Carine no Egito: o que a viagem mudou na forma como ela vê a África",
    text: "Conversa sobre Egito, representação africana e como viajar pelo continente transforma o olhar sobre si mesmo.",
    href: "https://albienguma.com.br/2026/06/29/barbara-carine-no-egito-o-que-a-viagem-mudou-na-forma-como-ela-ve-a-africa/",
  },
  {
    tag: "História",
    title: "Como é que a África se chamava antes dos europeus?",
    text: "Uma viagem pelos nomes que os próprios africanos davam ao continente antes do encontro colonial.",
    href: "https://albienguma.com.br/2026/06/29/como-e-que-a-africa-se-chamava-antes-dos-europeus/",
  },
  {
    tag: "Geopolítica",
    title: "Desenho das fronteiras da África",
    text: "Como as fronteiras atuais foram traçadas e por que entender esse mapa é fundamental para ler a África de hoje.",
    href: "https://albienguma.com.br/2026/06/22/desenho-fronteiras-africa/",
  },
  {
    tag: "Imprensa",
    title: "Angolan influencer calls for correct pronunciation of African names on Brazilian TV",
    text: "Matéria da Folha de S.Paulo sobre a defesa da pronúncia correta dos nomes africanos na TV brasileira.",
    href: "https://www1.folha.uol.com.br/internacional/en/sports/2026/06/angolan-influencer-calls-for-correct-pronunciation-of-african-names-on-brazilian-tv.shtml",
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const Artigos = () => (
  <div className="min-h-screen bg-background">
    <SiteNav />

    <section className="relative pb-16 pt-32 md:pb-20 md:pt-40">
      <div className="pattern-dots pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-5">
        <motion.h1 {...fade(0)} className="font-display text-4xl md:text-6xl">
          Na mídia
        </motion.h1>
        <motion.p {...fade(0.06)} className="mt-4 max-w-2xl text-muted-foreground">
          Aparições, entrevistas e conteúdos sobre o continente africano, a diáspora e as conexões
          com o Brasil.
        </motion.p>
        <motion.div {...fade(0.08)} className="mt-5 h-1 w-24 bg-gradient-sun" />
      </div>
    </section>

    <section className="bg-muted/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-6 md:grid-cols-3">
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
              <h2 className="mt-3 font-display text-xl leading-snug">{a.title}</h2>
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

    <SiteFooter />
  </div>
);

export default Artigos;
