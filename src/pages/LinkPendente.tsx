import { motion } from "framer-motion";
import { ArrowLeft, LinkIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import IvoLogo from "@/components/IvoLogo";

const LinkPendente = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const titulo = searchParams.get("titulo") || "Esta página";

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-sm">
        <div className="flex items-center justify-center w-16 h-16 rounded-md bg-gold/10 border border-gold/20 mx-auto mb-6">
          <LinkIcon className="h-7 w-7 text-gold" />
        </div>
        <h1 className="font-copperplate text-xl font-bold mb-3 uppercase tracking-wide">
          <span className="text-gradient-gold">{titulo}</span>
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">Este link ainda está sendo preparado. Em breve estará disponível para você!</p>
        <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Voltar ao início
        </button>
      </motion.div>
      <div className="absolute bottom-8 flex flex-col items-center gap-2">
        <IvoLogo size="sm" className="opacity-20" />
        <a href="https://www.d7company.com.br/build" target="_blank" rel="noopener noreferrer" className="text-[10px] text-muted-foreground hover:text-foreground/70 transition-colors">Criado por D7Company</a>
      </div>
    </div>
  );
};

export default LinkPendente;
