import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, BarChart3, Download, Search, UserCog, Sun,
  ArrowRight, HelpCircle, ChevronLeft, ChevronRight
} from "lucide-react";

const steps = [
  {
    icon: BarChart3,
    title: "Painel de Leads",
    description: "Aqui você vê todos os leads capturados pelo Quiz em tempo real. Os cards no topo mostram as métricas mais importantes: total de leads, leads de hoje, pontuação média e o diagnóstico mais frequente."
  },
  {
    icon: Search,
    title: "Busca e Filtros",
    description: "Use a barra de busca para encontrar leads por nome, e-mail ou telefone. O filtro de diagnóstico permite visualizar apenas leads de um perfil específico. Clique nos cabeçalhos da tabela para ordenar."
  },
  {
    icon: Download,
    title: "Exportar CSV",
    description: "Clique em 'Exportar CSV' para baixar todos os leads filtrados em uma planilha. Ideal para importar no seu CRM, e-mail marketing ou análise externa."
  },
  {
    icon: UserCog,
    title: "Aba Equipe",
    description: "Na aba 'Equipe' você pode convidar novos administradores para acessar o painel. Basta preencher nome, e-mail e uma senha temporária."
  },
  {
    icon: Sun,
    title: "Tema Claro / Escuro",
    description: "Use o ícone de sol/lua no canto superior direito para alternar entre o modo claro e escuro — somente dentro do painel administrativo."
  },
];

interface OnboardingTutorialProps {
  onDismiss: () => void;
}

export function OnboardingTutorial({ onDismiss }: OnboardingTutorialProps) {
  const [step, setStep] = useState(0);

  const handleDismiss = (dontShowAgain: boolean) => {
    if (dontShowAgain) {
      localStorage.setItem("admin-tutorial-dismissed", "true");
    }
    onDismiss();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-lg rounded-2xl bg-card border border-border/50 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-gold" />
              <h2 className="text-sm font-bold text-foreground">Bem-vindo ao Painel</h2>
            </div>
            <button
              onClick={() => handleDismiss(false)}
              className="h-7 w-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Step indicators */}
          <div className="flex gap-1.5 px-6 pb-4">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all ${
                  i === step ? "bg-gold" : i < step ? "bg-gold/40" : "bg-border"
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="px-6 pb-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  {(() => {
                    const StepIcon = steps[step].icon;
                    return (
                      <div className="h-10 w-10 rounded-xl bg-gold/10 flex items-center justify-center">
                        <StepIcon className="h-5 w-5 text-gold" />
                      </div>
                    );
                  })()}
                  <h3 className="text-base font-bold text-foreground">{steps[step].title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {steps[step].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 bg-secondary/30 border-t border-border/30">
            <button
              onClick={() => handleDismiss(true)}
              className="text-[11px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
            >
              Não mostrar novamente
            </button>

            <div className="flex items-center gap-2">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="h-9 px-3 rounded-lg bg-secondary border border-border/50 text-xs text-muted-foreground hover:text-foreground transition-all flex items-center gap-1"
                >
                  <ChevronLeft className="h-3.5 w-3.5" /> Anterior
                </button>
              )}
              {step < steps.length - 1 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="h-9 px-4 rounded-lg bg-gradient-gold-deep text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1"
                >
                  Próximo <ChevronRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => handleDismiss(true)}
                  className="h-9 px-4 rounded-lg bg-gradient-gold-deep text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1"
                >
                  Começar <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function HelpButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-secondary transition-all"
      title="Ajuda"
    >
      <HelpCircle className="h-4 w-4" />
    </button>
  );
}
