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
              {/* No separate blur overlay - blur applied directly to img */}
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

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/ivobrasil1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/80 hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@ivobrasil1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/80 hover:text-gold transition-colors"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=5527992936922&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/80 hover:text-gold transition-colors"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.241-.579-.486-.499-.669-.509-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/ivobrasil/?locale=pt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/80 hover:text-gold transition-colors"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

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
