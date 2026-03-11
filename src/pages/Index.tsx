import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Play,
  BookOpen,
  Mic2,
  BrainCircuit,
  Instagram,
} from "lucide-react";
import mariaPhoto from "@/assets/maria-home-hero.png";
import logoImage from "@/assets/logo-maria.png";
import HubLink from "@/components/HubLink";
import D7Footer from "@/components/D7Footer";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gold/[0.025] blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Fixed background hero with parallax feel */}
        <div className="relative h-[60vh] min-h-[420px] max-h-[550px]">
          {/* Fixed photo background */}
          <div
            className="fixed top-0 left-0 right-0 h-[60vh] min-h-[420px] max-h-[550px] z-0"
          >
            <div className="max-w-md mx-auto h-full relative">
              <img
                src={mariaPhoto}
                alt="Maria Marcelino"
                className="absolute inset-0 w-full h-full object-cover object-[center_15%]"
              />
              {/* Subtle warm haze behind */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>
          </div>

          {/* Content overlay that scrolls away */}
          <div className="relative z-10 h-full flex flex-col justify-end">
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-hero" />

            {/* Gold line accent */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-[200px] left-8 right-8 h-[1px] line-gold origin-left"
            />

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-6 left-0 right-0 flex justify-center"
            >
              <img src={logoImage} alt="Maria Marcelino" className="h-12 invert opacity-90" />
            </motion.div>

            {/* Hero text at bottom */}
            <div className="px-7 pb-8 relative z-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold/80 mb-3"
              >
                Fundadora · Marias do Brasil
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-[28px] font-black leading-[1.1] tracking-tight mb-4"
              >
                Eu fui silenciada.<br />
                <span className="text-gradient-gold">Hoje, liberto vozes.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="text-[13px] text-secondary-foreground/80 leading-relaxed max-w-[320px]"
              >
                Cresci sem saber me expressar. Fui demitida por não saber me comunicar.
                Transformei a dor em missão — e agora conduzo mulheres ao mesmo caminho.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Links section - solid background to cover fixed image */}
        <div className="relative z-20 bg-background px-5 -mt-2 pb-12">
          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex items-center gap-3 mb-6 mt-8"
          >
            <div className="h-[1px] flex-1 line-gold" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
              Sua jornada começa aqui
            </span>
            <div className="h-[1px] flex-1 line-gold" />
          </motion.div>

          <div className="space-y-3">
            <HubLink
              icon={Users}
              title="Marias do Brasil"
              subtitle="Comunidade gratuita de fé, voz e pertencimento"
              href="https://chat.whatsapp.com/FHFoHxuJC6CDHiyJ1z6Bw8"
              variant="primary"
              index={0}
              tag="Gratuito"
            />

            <HubLink
              icon={Play}
              title="Aulão: Destrave Sua Voz"
              subtitle="20 minutos que vão mudar como você se comunica"
              href="/aulao"
              variant="highlight"
              index={1}
              tag="Grátis"
              isInternal
              onClick={() => navigate("/aulao")}
            />

            <HubLink
              icon={BrainCircuit}
              title="Diagnóstico da Sua Voz"
              subtitle="Descubra o que trava a sua comunicação"
              href="/quiz"
              variant="highlight"
              index={2}
              isInternal
              onClick={() => navigate("/quiz")}
              tag="Quiz"
            />

            <HubLink
              icon={BookOpen}
              title="Liberte Sua Voz"
              subtitle="O programa completo de transformação · 12x R$103"
              href="/liberte-sua-voz"
              variant="secondary"
              index={3}
              isInternal
              onClick={() => navigate("/liberte-sua-voz")}
            />

            <HubLink
              icon={Mic2}
              title="Sua Primeira Palestra"
              subtitle="Workshop com 3 aulas práticas · R$97"
              href="/sua-primeira-palestra"
              variant="secondary"
              index={4}
              isInternal
              onClick={() => navigate("/sua-primeira-palestra")}
            />
          </div>

          {/* Footer with Instagram + logo */}
          <div className="mt-14 flex flex-col items-center gap-4">
            <div className="h-[1px] w-full line-gold" />
            
            <a
              href="https://instagram.com/mariamarcelinoavoz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground/70 transition-colors"
            >
              <Instagram className="h-4 w-4" />
              <span className="text-xs font-medium">@mariamarcelinoavoz</span>
            </a>

            <img
              src={logoImage}
              alt="Maria Marcelino"
              className="h-6 invert opacity-30"
            />

            <p className="text-[10px] text-muted-foreground/50">
              © {new Date().getFullYear()} Maria Marcelino
            </p>
            <a
              href="https://www.d7company.com.br/build"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-muted-foreground hover:text-foreground/70 transition-colors mt-1"
            >
              Criado por D7Company
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
