import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BrainCircuit,
  BookOpen,
  GraduationCap,
  Instagram,
  Target,
  Mic,
  Users,
  Flame,
} from "lucide-react";
import ivoHero from "@/assets/ivo-hero.jpg";
import HubLink from "@/components/HubLink";
import IvoLogo from "@/components/IvoLogo";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gold/[0.015] blur-[180px]" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Hero section with fixed background */}
        <div className="relative h-[65vh] min-h-[450px] max-h-[580px]">
          <div className="fixed top-0 left-0 right-0 h-[65vh] min-h-[450px] max-h-[580px] z-0">
            <div className="max-w-md mx-auto h-full relative">
              <img
                src={ivoHero}
                alt="Ivo Brasil"
                className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
              />
              {/* Persistent blur overlay that stays on scroll */}
              <div className="absolute inset-0 backdrop-blur-[2px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            </div>
          </div>

          {/* Content overlay */}
          <div className="relative z-10 h-full flex flex-col justify-end">
            <div className="absolute inset-0 bg-gradient-hero" />

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-6 left-0 right-0 flex justify-center"
            >
              <IvoLogo size="md" />
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

              {/* Gold accent line between hero text and description */}
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

        {/* Links section */}
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
              tag="Quiz"
            />

            <HubLink
              icon={Target}
              title="Código da Negociação"
              subtitle="Programa de 90 dias para negociadores estratégicos"
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
              tag="Livro"
            />

            <HubLink
              icon={Mic}
              title="Palestras"
              subtitle="Palestras corporativas sobre negociação e liderança"
              href="https://ivobrasil.com.br/palestras/"
              variant="secondary"
              index={5}
            />

            <HubLink
              icon={Flame}
              title="Imersão Virando a Mesa"
              subtitle="Imersão presencial — próxima edição em breve"
              href="/imersao-virando-a-mesa"
              variant="secondary"
              index={6}
              isInternal
              onClick={() => navigate("/imersao-virando-a-mesa")}
              tag="Em breve"
            />
          </div>

          {/* Footer */}
          <div className="mt-14 flex flex-col items-center gap-4">
            <div className="h-[1px] w-full line-gold" />

            <a
              href="https://instagram.com/ivobrasil1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground/70 transition-colors"
            >
              <Instagram className="h-4 w-4" />
              <span className="text-xs font-medium">@ivobrasil1</span>
            </a>

            <IvoLogo size="footer" variant="icon" className="opacity-30" />

            <p className="text-[10px] text-muted-foreground/50">
              © {new Date().getFullYear()} Ivo Brasil
            </p>
            <a
              href="https://www.d7company.com.br/build"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-muted-foreground hover:text-foreground/70 transition-colors mt-1"
            >
              Desenvolvido por D7 Company
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
