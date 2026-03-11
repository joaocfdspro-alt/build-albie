import { motion } from "framer-motion";
import { Target, MessageCircle, Flame, Lightbulb, ChevronUp } from "lucide-react";

interface LeadDetailProps { name: string; score: number; diagnostic: string; onClose: () => void; mobile?: boolean; }
interface StrategyInfo { temperature: string; tempColor: string; tempIcon: string; profile: string; nextStep: string; offerSuggestion: string; approach: string; }

function getStrategy(score: number, diagnostic: string): StrategyInfo {
  if (score <= 11) return { temperature: "Frio — precisa de aquecimento", tempColor: "text-red-400", tempIcon: "🧊", profile: "Negociador intuitivo sem método. Perde dinheiro em cada conversa por falta de preparo e técnica.", nextStep: "Enviar conteúdo educativo sobre negociação. Convidar para diagnóstico gratuito.", offerSuggestion: "Curso O Negociador ou sessão diagnóstica gratuita", approach: "Abordagem educativa. Mostre que negociar é uma habilidade que se aprende." };
  if (score <= 18) return { temperature: "Morno — em fase de consideração", tempColor: "text-amber-400", tempIcon: "🌡️", profile: "Negociador reativo que cede sob pressão. Sabe que precisa melhorar mas não tem método.", nextStep: "Compartilhar cases e resultados. Convidar para conhecer o Código da Negociação.", offerSuggestion: "Curso O Negociador → Código da Negociação", approach: "Abordagem com prova social. Mostre resultados concretos de quem aplicou o método." };
  if (score <= 25) return { temperature: "Quente — pronto para investir", tempColor: "text-blue-400", tempIcon: "🔥", profile: "Negociador consciente que busca método e consistência. Já tem base, quer acelerar.", nextStep: "Contato direto para apresentar o Código da Negociação. Oferecer condição especial.", offerSuggestion: "Código da Negociação → Mentoria em Grupo", approach: "Abordagem direta e profissional. Ele já sabe o que quer — mostre o caminho." };
  return { temperature: "Premium — lead de alto valor", tempColor: "text-emerald-400", tempIcon: "💎", profile: "Negociador estratégico que busca maestria. Quer resultados de elite e networking de alto nível.", nextStep: "Convite VIP para mentoria individual ou masterclass exclusiva.", offerSuggestion: "Mentoria Master Individual → Mentoria em Grupo Premium", approach: "Abordagem de posicionamento. Trate como par — exclusividade e resultado convertem." };
}

export function LeadDetailPanel({ name, score, diagnostic, onClose, mobile }: LeadDetailProps) {
  const strategy = getStrategy(score, diagnostic);
  if (mobile) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2"><span className="text-base">{strategy.tempIcon}</span><div><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Análise estratégica</p><p className={`text-[11px] font-semibold ${strategy.tempColor}`}>{strategy.temperature}</p></div></div>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="h-6 px-2 rounded-md text-[10px] text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center gap-1"><ChevronUp className="h-3 w-3" /> Fechar</button>
        </div>
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
    <motion.tr initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-secondary/20">
      <td colSpan={5} className="px-4 py-4">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><span className="text-lg">{strategy.tempIcon}</span><div><p className="text-xs font-bold text-foreground">Análise estratégica — {name}</p><p className={`text-[11px] font-semibold ${strategy.tempColor}`}>{strategy.temperature}</p></div></div>
            <button onClick={onClose} className="h-7 px-2 rounded-lg text-[10px] text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center gap-1 transition-all"><ChevronUp className="h-3 w-3" /> Fechar</button>
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
  return (<div className={`rounded-lg border p-2.5 ${highlight ? "border-gold/20 bg-gold/5" : "border-border/30 bg-card/50"}`}><div className="flex items-center gap-1.5 mb-1"><Icon className={`h-3 w-3 ${highlight ? "text-gold" : "text-muted-foreground"}`} /><p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{title}</p></div><p className="text-[11px] text-foreground/80 leading-relaxed">{content}</p></div>);
}

function StrategyCard({ icon: Icon, title, content, highlight }: { icon: React.ElementType; title: string; content: string; highlight?: boolean }) {
  return (<div className={`rounded-lg border p-3 ${highlight ? "border-gold/20 bg-gold/5" : "border-border/30 bg-card/50"}`}><div className="flex items-center gap-1.5 mb-1.5"><Icon className={`h-3.5 w-3.5 ${highlight ? "text-gold" : "text-muted-foreground"}`} /><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{title}</p></div><p className="text-xs text-foreground/80 leading-relaxed">{content}</p></div>);
}
