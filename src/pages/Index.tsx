import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  Target,
  Users,
  Flame,
  BrainCircuit,
} from "lucide-react";

import ivoHero from "@/assets/ivo-hero.jpg";
import HubLink from "@/components/HubLink";
import IvoLogo from "@/components/IvoLogo";
import D7Footer from "@/components/D7Footer";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative">
      {/* Fixed parallax background - centered like portrait */}
      <div className="fixed inset-0 z-0">
        <img
          src={ivoHero}
          alt="Ivo Brasil"
          className="w-full h-full object-cover object-[center_20%] md:object-[center_25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Hero section - transparent so parallax shows */}
        <div className="relative h-[60vh] min-h-[420px] max-h-[540px]">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

          {/* Content overlay */}
          <div className="relative z-10 h-full flex flex-col justify-end">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-6 left-0 right-0 flex justify-center"
            >
              <IvoLogo size="lg" />
            </motion.div>

            {/* Hero text */}
            <div className="px-7 pb-8 relative z-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold/80 mb-3"
              >
                Estrategista · Mentor · Palestrante
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-copperplate text-[24px] font-bold leading-[1.15] tracking-wide uppercase mb-4"
              >
                Você não perde negócios<br />
                por falta de produto.<br />
                <span className="text-gradient-gold">Perde por falta de método.</span>
              </motion.h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="h-[1px] line-gold origin-left mb-4"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="text-[13px] text-secondary-foreground/80 leading-relaxed max-w-[320px]"
              >
                +20 anos em negociações bilionárias. O método que transforma 
                conversas difíceis em acordos vantajosos.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Links section - solid background so content scrolls over parallax */}
        <div className="relative z-20 bg-background px-5 -mt-2 pb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex items-center gap-3 mb-6 mt-8"
          >
            <div className="h-[1px] flex-1 line-gold" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground font-copperplate">
              Central do Negociador
            </span>
            <div className="h-[1px] flex-1 line-gold" />
          </motion.div>

          <div className="space-y-3">
            <HubLink
              icon={BrainCircuit}
              title="Diagnóstico de Negociação"
              subtitle="Descubra seu perfil e onde você está perdendo dinheiro"
              href="/quiz"
              variant="primary"
              index={0}
              isInternal
              onClick={() => navigate("/quiz")}
            />

            <HubLink
              icon={Target}
              title="Código da Negociação"
              subtitle="Programa de 90 dias para se tornar um negociador estratégico"
              href="/codigo-da-negociacao"
              variant="highlight"
              index={1}
              isInternal
              onClick={() => navigate("/codigo-da-negociacao")}
            />

            <HubLink
              icon={GraduationCap}
              title="Método O Negociador"
              subtitle="Treinamento com técnicas e estratégias práticas"
              href="https://ivobrasil.com.br/onegociador/"
              variant="secondary"
              index={2}
            />

            <HubLink
              icon={Users}
              title="Mentoria"
              subtitle="Acompanhamento estratégico para negociadores"
              href="https://ivobrasil.com.br/mentorias/"
              variant="secondary"
              index={3}
            />

            <HubLink
              icon={BookOpen}
              title="Livros"
              subtitle="Fundamentos e técnicas para maximizar seus ganhos"
              href="https://ivobrasil.com.br/livros/"
              variant="secondary"
              index={4}
            />

            <HubLink
              icon={Flame}
              title="Imersão Virando a Mesa"
              subtitle="Imersão presencial para empresários e líderes"
              href="/imersao-virando-a-mesa"
              variant="secondary"
              index={5}
              isInternal
              onClick={() => navigate("/imersao-virando-a-mesa")}
              tag="Em breve"
            />
          </div>

          <div className="mt-14">
            <D7Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
