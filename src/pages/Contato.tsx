import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import BackButton from "@/components/BackButton";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const Contato = () => (
  <div className="min-h-screen bg-background">
    <SiteNav />

    <section className="relative overflow-hidden pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="pattern-dots pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <motion.p {...fade(0)} className="text-[11px] font-bold uppercase tracking-[0.3em] text-terracotta">
          Missão
        </motion.p>
        <motion.h1 {...fade(0.06)} className="mt-5 font-display text-2xl leading-snug md:text-4xl">
          Aproximar África e Brasil através de histórias, conhecimento e oportunidades,
          contribuindo para uma narrativa mais ampla, moderna e conectada sobre o continente
          africano.
        </motion.h1>

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

export default Contato;
