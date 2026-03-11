import { useState, useRef, useEffect } from "react";
import { Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InfoPopoverProps {
  children: React.ReactNode;
}

export function InfoPopover({ children }: InfoPopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative inline-flex" ref={ref}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="h-5 w-5 rounded-full flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all"
        title="Mais informações"
      >
        <Info className="h-3 w-3" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-[60] top-7 left-0 w-72 rounded-xl bg-card border border-border/50 shadow-2xl p-4"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 h-5 w-5 rounded flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ScoreInfoContent() {
  return (
    <div className="space-y-2.5 text-xs">
      <p className="font-bold text-foreground text-sm">O que é o Score?</p>
      <p className="text-muted-foreground leading-relaxed">
        O score vai de <span className="font-bold text-foreground">8 a 32 pontos</span> e é calculado com base nas 8 perguntas do quiz. Cada resposta vale de 1 a 4 pontos.
      </p>
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-red-400" />
          <span className="text-muted-foreground"><span className="font-semibold text-foreground">8–11:</span> Voz Aprisionada — lead com dor forte</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="text-muted-foreground"><span className="font-semibold text-foreground">12–18:</span> Voz Hesitante — lead em transição</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-400" />
          <span className="text-muted-foreground"><span className="font-semibold text-foreground">19–25:</span> Voz em Despertar — lead consciente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="text-muted-foreground"><span className="font-semibold text-foreground">26–32:</span> Voz Poderosa — lead premium</span>
        </div>
      </div>
      <p className="text-muted-foreground/70 text-[10px] pt-1 border-t border-border/30">
        Quanto menor o score, maior a dor e a necessidade — leads com score baixo tendem a converter com abordagens de acolhimento.
      </p>
    </div>
  );
}

export function DiagnosticInfoContent() {
  return (
    <div className="space-y-2.5 text-xs">
      <p className="font-bold text-foreground text-sm">Diagnósticos e Estratégia</p>
      <p className="text-muted-foreground leading-relaxed">
        Cada diagnóstico revela o nível de consciência e dor do lead, indicando a melhor abordagem de oferta:
      </p>
      <div className="space-y-2 pt-1">
        <div className="p-2 rounded-lg bg-red-500/5 border border-red-500/10">
          <p className="font-bold text-red-400 text-[11px]">🔒 Voz Aprisionada</p>
          <p className="text-muted-foreground mt-0.5">Precisa de acolhimento. Oferte sessões 1:1 ou mentorias introdutórias.</p>
        </div>
        <div className="p-2 rounded-lg bg-amber-500/5 border border-amber-500/10">
          <p className="font-bold text-amber-400 text-[11px]">🌱 Voz Hesitante</p>
          <p className="text-muted-foreground mt-0.5">Pronta para evoluir. Ideal para cursos e programas de grupo.</p>
        </div>
        <div className="p-2 rounded-lg bg-blue-500/5 border border-blue-500/10">
          <p className="font-bold text-blue-400 text-[11px]">✨ Voz em Despertar</p>
          <p className="text-muted-foreground mt-0.5">Quer estrutura. Oferte programas intensivos ou imersões.</p>
        </div>
        <div className="p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
          <p className="font-bold text-emerald-400 text-[11px]">👑 Voz Poderosa</p>
          <p className="text-muted-foreground mt-0.5">Busca refinamento. Ideal para mentorias premium e palestras.</p>
        </div>
      </div>
    </div>
  );
}
