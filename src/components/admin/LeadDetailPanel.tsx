import { motion } from "framer-motion";
import { Target, MessageCircle, Flame, Lightbulb, ChevronUp, MessageSquare, ExternalLink } from "lucide-react";

interface LeadDetailProps { name: string; score: number; diagnostic: string; onClose: () => void; mobile?: boolean; phone?: string; countryCode?: string; openResponse?: string | null; }
interface StrategyInfo { temperature: string; tempLabel: string; profile: string; nextStep: string; offerSuggestion: string; approach: string; }

function getStrategy(score: number, _diagnostic: string): StrategyInfo {
  if (score <= 11) return { temperature: "🧊", tempLabel: "Frio — precisa de aquecimento", profile: "Negociador intuitivo sem método. Perde dinheiro em cada conversa por falta de preparo e técnica.", nextStep: "Enviar conteúdo educativo sobre negociação. Convidar para diagnóstico gratuito.", offerSuggestion: "Curso O Negociador ou sessão diagnóstica gratuita", approach: "Abordagem educativa. Mostre que negociar é uma habilidade que se aprende." };
  if (score <= 18) return { temperature: "🌡️", tempLabel: "Morno — em fase de consideração", profile: "Negociador reativo que cede sob pressão. Sabe que precisa melhorar mas não tem método.", nextStep: "Compartilhar cases e resultados. Convidar para conhecer o Código da Negociação.", offerSuggestion: "Curso O Negociador → Código da Negociação", approach: "Abordagem com prova social. Mostre resultados concretos de quem aplicou o método." };
  if (score <= 25) return { temperature: "🔥", tempLabel: "Quente — pronto para investir", profile: "Negociador consciente que busca método e consistência. Já tem base, quer acelerar.", nextStep: "Contato direto para apresentar o Código da Negociação. Oferecer condição especial.", offerSuggestion: "Código da Negociação → Mentoria em Grupo", approach: "Abordagem direta e profissional. Ele já sabe o que quer — mostre o caminho." };
  return { temperature: "💎", tempLabel: "Premium — lead de alto valor", profile: "Negociador estratégico que busca maestria. Quer resultados de elite e networking de alto nível.", nextStep: "Convite VIP para mentoria individual ou masterclass exclusiva.", offerSuggestion: "Mentoria Master Individual → Mentoria em Grupo Premium", approach: "Abordagem de posicionamento. Trate como par — exclusividade e resultado convertem." };
}

function buildWhatsAppUrl(phone: string, countryCode: string, name: string) {
  const cleanPhone = phone.replace(/\D/g, "");
  const cleanCode = countryCode.replace("+", "");
  const fullNumber = `${cleanCode}${cleanPhone}`;
  const text = encodeURIComponent(`Olá ${name}! Aqui é do time do Ivo Brasil. Vi que você fez nosso diagnóstico de negociação e gostaria de conversar sobre como podemos ajudar você a negociar melhor.`);
  return `https://wa.me/${fullNumber}?text=${text}`;
}

export function LeadDetailPanel({ name, score, diagnostic, onClose, mobile, phone, countryCode, openResponse }: LeadDetailProps) {
  const strategy = getStrategy(score, diagnostic);
  const whatsappUrl = phone && countryCode ? buildWhatsAppUrl(phone, countryCode, name) : null;

  if (mobile) {
    return (
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">{strategy.temperature}</span>
            <p className="text-[11px] font-medium text-foreground">{strategy.tempLabel}</p>
          </div>
          <div className="flex items-center gap-2">
            {whatsappUrl && (
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                className="h-7 px-2.5 rounded-md text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:hover:bg-emerald-500/20 flex items-center gap-1 transition-colors">
                <ExternalLink className="h-3 w-3" /> WhatsApp
              </a>
            )}
            <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="h-6 px-2 rounded-md text-[10px] text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center gap-1">
              <ChevronUp className="h-3 w-3" /> Fechar
            </button>
          </div>
        </div>
        {openResponse && openResponse.trim().length > 0 && (
          <div className="rounded-md border border-border bg-secondary/30 p-2.5">
            <div className="flex items-center gap-1.5 mb-1"><MessageSquare className="h-3 w-3 text-muted-foreground" /><p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Resposta do lead</p></div>
            <p className="text-[11px] text-foreground/80 leading-relaxed italic">"{openResponse}"</p>
          </div>
        )}
        <div className="space-y-2">
          <InfoCard icon={Flame} title="Próximo Passo" content={strategy.nextStep} />
          <InfoCard icon={Target} title="Perfil" content={strategy.profile} />
          <InfoCard icon={MessageCircle} title="Abordagem" content={strategy.approach} />
          <InfoCard icon={Lightbulb} title="Oferta Sugerida" content={strategy.offerSuggestion} />
        </div>
      </div>
    );
  }

  return (
    <motion.tr initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-secondary/10">
      <td colSpan={6} className="px-4 py-4">
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{strategy.temperature}</span>
              <div>
                <p className="text-xs font-semibold text-foreground">Análise — {name}</p>
                <p className="text-[11px] text-muted-foreground">{strategy.tempLabel}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {whatsappUrl && (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                  className="h-7 px-3 rounded-md text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:hover:bg-emerald-500/20 flex items-center gap-1.5 transition-colors">
                  <ExternalLink className="h-3 w-3" /> Abrir WhatsApp
                </a>
              )}
              <button onClick={onClose} className="h-7 px-2 rounded-md text-[10px] text-muted-foreground hover:text-foreground hover:bg-secondary flex items-center gap-1 transition-all">
                <ChevronUp className="h-3 w-3" /> Fechar
              </button>
            </div>
          </div>
          {openResponse && openResponse.trim().length > 0 && (
            <div className="rounded-md border border-border bg-secondary/20 p-3">
              <div className="flex items-center gap-1.5 mb-1.5"><MessageSquare className="h-3.5 w-3.5 text-muted-foreground" /><p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">O que o lead disse</p></div>
              <p className="text-xs text-foreground/80 leading-relaxed italic">"{openResponse}"</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <InfoCard icon={Target} title="Perfil do Lead" content={strategy.profile} />
            <InfoCard icon={Flame} title="Próximo Passo" content={strategy.nextStep} />
            <InfoCard icon={MessageCircle} title="Abordagem" content={strategy.approach} />
            <InfoCard icon={Lightbulb} title="Oferta Sugerida" content={strategy.offerSuggestion} />
          </div>
        </div>
      </td>
    </motion.tr>
  );
}

function InfoCard({ icon: Icon, title, content }: { icon: React.ElementType; title: string; content: string }) {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
      </div>
      <p className="text-xs text-foreground/80 leading-relaxed">{content}</p>
    </div>
  );
}
