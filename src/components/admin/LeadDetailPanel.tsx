import { motion } from "framer-motion";
import { Target, MessageCircle, Flame, Lightbulb, ChevronUp } from "lucide-react";

interface LeadDetailProps {
  name: string;
  score: number;
  diagnostic: string;
  onClose: () => void;
  mobile?: boolean;
}

interface StrategyInfo {
  temperature: string;
  tempColor: string;
  tempIcon: string;
  profile: string;
  nextStep: string;
  offerSuggestion: string;
  approach: string;
}

function getStrategy(score: number, diagnostic: string): StrategyInfo {
  if (score <= 11) {
    return {
      temperature: "Frio — precisa de aquecimento",
      tempColor: "text-red-400",
      tempIcon: "🧊",
      profile: "Pessoa com bloqueios profundos na comunicação. Sente medo paralisante de se expressar, evita exposição e não acredita que pode mudar.",
      nextStep: "Enviar mensagem de acolhimento personalizada. Convidar para uma sessão gratuita de 15 min.",
      offerSuggestion: "Sessão diagnóstica 1:1 gratuita → Mentoria individual introdutória",
      approach: "Abordagem empática. Não venda direto — mostre que entende a dor dela. Use a história da Maria como espelho.",
    };
  }
  if (score <= 18) {
    return {
      temperature: "Morno — em fase de consideração",
      tempColor: "text-amber-400",
      tempIcon: "🌡️",
      profile: "Pessoa que já se expressa mas sente insegurança. Sabe que precisa melhorar, mas não sabe por onde começar.",
      nextStep: "Enviar conteúdo de valor (vídeo, depoimento). Convidar para aulão gratuito ou comunidade.",
      offerSuggestion: "Aulão gratuito → Curso 'Liberte Sua Voz' → Programa de grupo",
      approach: "Abordagem educativa. Mostre que o caminho é possível e acessível. Depoimentos funcionam bem.",
    };
  }
  if (score <= 25) {
    return {
      temperature: "Quente — pronta para investir",
      tempColor: "text-blue-400",
      tempIcon: "🔥",
      profile: "Pessoa consciente e comprometida com sua evolução. Já tem alguma base de comunicação, busca aceleração.",
      nextStep: "Contato direto para apresentar programa. Oferecer condição especial ou bônus exclusivo.",
      offerSuggestion: "Programa intensivo / Imersão presencial → Mentoria em grupo premium",
      approach: "Abordagem direta e profissional. Ela já sabe o que quer — mostre a solução certa para o nível dela.",
    };
  }
  return {
    temperature: "Premium — lead de alto valor",
    tempColor: "text-emerald-400",
    tempIcon: "💎",
    profile: "Pessoa com boa comunicação que busca excelência. Quer se posicionar em palcos maiores e influenciar.",
    nextStep: "Convite VIP para mentoria premium ou mastermind. Abordagem personalizada de alto nível.",
    offerSuggestion: "Mentoria premium individual → Mastermind → Palestra/evento exclusivo",
    approach: "Abordagem de posicionamento. Trate como par — ela precisa de amplificação. Exclusividade converte.",
  };
}

export function LeadDetailPanel({ name, score, diagnostic, onClose, mobile }: LeadDetailProps) {
  const strategy = getStrategy(score, diagnostic);

  if (mobile) {
    return (
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">{strategy.tempIcon}</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Análise estratégica</p>
              <p className={`text-[11px] font-semibold ${strategy.tempColor}`}>{strategy.temperature}</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="h-6 px-2 rounded-md text-[10px] text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center gap-1"
          >
            <ChevronUp className="h-3 w-3" /> Fechar
          </button>
        </div>

        {/* Cards stacked */}
        <div className="space-y-2">
          <MobileStrategyCard icon={Flame} title="Próximo Passo" content={strategy.nextStep} highlight />
          <MobileStrategyCard icon={Target} title="Perfil" content={strategy.profile} />
          <MobileStrategyCard icon={MessageCircle} title="Abordagem" content={strategy.approach} />
          <MobileStrategyCard icon={Lightbulb} title="Oferta Sugerida" content={strategy.offerSuggestion} highlight />
        </div>
      </div>
    );
  }

  return (
    <motion.tr
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-secondary/20"
    >
      <td colSpan={4} className="px-4 py-4">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{strategy.tempIcon}</span>
              <div>
                <p className="text-xs font-bold text-foreground">Análise estratégica — {name}</p>
                <p className={`text-[11px] font-semibold ${strategy.tempColor}`}>{strategy.temperature}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="h-7 px-2 rounded-lg text-[10px] text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center gap-1 transition-all"
            >
              <ChevronUp className="h-3 w-3" /> Fechar
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StrategyCard icon={Target} title="Perfil do Lead" content={strategy.profile} />
            <StrategyCard icon={Flame} title="Próximo Passo Sugerido" content={strategy.nextStep} highlight />
            <StrategyCard icon={MessageCircle} title="Abordagem Recomendada" content={strategy.approach} />
            <StrategyCard icon={Lightbulb} title="Sugestão de Oferta" content={strategy.offerSuggestion} highlight />
          </div>
        </div>
      </td>
    </motion.tr>
  );
}

function MobileStrategyCard({ icon: Icon, title, content, highlight }: { icon: React.ElementType; title: string; content: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg border p-2.5 ${highlight ? "border-gold/20 bg-gold/5" : "border-border/30 bg-card/50"}`}>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className={`h-3 w-3 ${highlight ? "text-gold" : "text-muted-foreground"}`} />
        <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{title}</p>
      </div>
      <p className="text-[11px] text-foreground/80 leading-relaxed">{content}</p>
    </div>
  );
}

function StrategyCard({ icon: Icon, title, content, highlight }: { icon: React.ElementType; title: string; content: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg border p-3 ${highlight ? "border-gold/20 bg-gold/5" : "border-border/30 bg-card/50"}`}>
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon className={`h-3.5 w-3.5 ${highlight ? "text-gold" : "text-muted-foreground"}`} />
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{title}</p>
      </div>
      <p className="text-xs text-foreground/80 leading-relaxed">{content}</p>
    </div>
  );
}
