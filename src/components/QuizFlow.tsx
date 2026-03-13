import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, CalendarCheck, Loader2 } from "lucide-react";
import { z } from "zod";
import IvoLogo from "@/components/IvoLogo";
import { supabase } from "@/integrations/supabase/client";

interface Question {
  question: string;
  options: { text: string; score: number }[];
}

const questions: Question[] = [
  {
    question: "Como você se prepara antes de uma negociação importante?",
    options: [
      { text: "Não me preparo — vou no instinto e na hora improviso.", score: 1 },
      { text: "Penso sobre o que quero, mas sem um método definido.", score: 2 },
      { text: "Pesquiso a outra parte e defino limites, mas falta estratégia.", score: 3 },
      { text: "Tenho framework completo com BATNA, âncoras e plano B.", score: 4 },
    ],
  },
  {
    question: "Quando a outra parte faz uma contraproposta agressiva, você:",
    options: [
      { text: "Aceito rapidamente para não perder o negócio.", score: 1 },
      { text: "Fico nervoso e faço concessões sem planejamento.", score: 2 },
      { text: "Contra-argumento, mas sem muita convicção.", score: 3 },
      { text: "Mantenho a posição, uso silêncio estratégico e redireciono.", score: 4 },
    ],
  },
  {
    question: "Qual é sua abordagem ao definir preço ou valor?",
    options: [
      { text: "Cobro o mínimo possível para garantir a venda.", score: 1 },
      { text: "Defino um preço, mas baixo rápido se pressionado.", score: 2 },
      { text: "Pesquiso o mercado e defendo com argumentos.", score: 3 },
      { text: "Uso âncora alta, justifico com valor e nego com margem calculada.", score: 4 },
    ],
  },
  {
    question: "Como você lida com o \"não\" em negociações?",
    options: [
      { text: "Desisto na primeira recusa.", score: 1 },
      { text: "Insisto uma vez e depois aceito.", score: 2 },
      { text: "Busco entender a objeção, mas nem sempre consigo reverter.", score: 3 },
      { text: "Uso o 'não' como informação e redireciono a conversa.", score: 4 },
    ],
  },
  {
    question: "Em uma conversa comercial difícil, como você reage?",
    options: [
      { text: "Evito confronto e cedo para manter a relação.", score: 1 },
      { text: "Fico tenso e perco o controle emocional.", score: 2 },
      { text: "Me posiciono, mas sinto insegurança interna.", score: 3 },
      { text: "Controlo o tom, uso rapport e conduzo com estratégia.", score: 4 },
    ],
  },
  {
    question: "Como se posiciona quando negocia com alguém mais experiente?",
    options: [
      { text: "Me sinto intimidado e aceito o que oferecem.", score: 1 },
      { text: "Tento acompanhar, mas me perco nos argumentos.", score: 2 },
      { text: "Mantenho minha posição, mas falta técnica.", score: 3 },
      { text: "Estudo o perfil, adapto a abordagem e negocio de igual para igual.", score: 4 },
    ],
  },
  {
    question: "Qual é sua maior dificuldade em negociações?",
    options: [
      { text: "Não consigo nem começar a conversa sobre preço.", score: 1 },
      { text: "Faço concessões demais por medo de perder o cliente.", score: 2 },
      { text: "Sei o que fazer, mas não tenho um método consistente.", score: 3 },
      { text: "Quero refinar técnica e ter resultados ainda maiores.", score: 4 },
    ],
  },
  {
    question: "Daqui a 6 meses, como você se vê negociando?",
    options: [
      { text: "Não consigo imaginar mudança — parece impossível.", score: 1 },
      { text: "Espero ter mais coragem, mas não sei por onde começar.", score: 2 },
      { text: "Quero ser um negociador estratégico com método definido.", score: 3 },
      { text: "Quero estar fechando acordos de alto nível com maestria.", score: 4 },
    ],
  },
];

interface DiagnosticResult {
  title: string;
  description: string;
  recommendation: string;
  emoji: string;
}

function getDiagnostic(score: number): DiagnosticResult {
  if (score <= 11) {
    return {
      title: "Negociador Intuitivo",
      description: "Você negocia no instinto — sem preparo, sem método, sem controle. Isso significa que está deixando dinheiro na mesa em cada conversa. Não é falta de inteligência — é falta de sistema.",
      recommendation: "Uma conversa estratégica comigo vai revelar exatamente onde você está perdendo e como reverter isso em 90 dias.",
      emoji: "🎯",
    };
  }
  if (score <= 18) {
    return {
      title: "Negociador Reativo",
      description: "Você reage em vez de conduzir. Quando pressionado, cede. Quando desafiado, hesita. O resultado? Acordos que parecem bons, mas te custam caro.",
      recommendation: "Precisa de estrutura e técnica. Uma sessão diagnóstica pode mostrar o caminho para sair da reação e entrar no controle.",
      emoji: "⚡",
    };
  }
  if (score <= 25) {
    return {
      title: "Negociador Consciente",
      description: "Você já sabe que negociar é uma habilidade. Tem alguma base, mas falta método, consistência e a frieza necessária nos momentos decisivos.",
      recommendation: "Está no ponto exato para dar um salto. O Código da Negociação foi feito para pessoas no seu estágio.",
      emoji: "🔥",
    };
  }
  return {
    title: "Negociador Estratégico",
    description: "Você já tem domínio. Sabe conduzir, posicionar e fechar. Mas quer mais — quer maestria, quer negociar em outro nível, quer resultados que poucos alcançam.",
    recommendation: "Uma mentoria individual pode ser o catalisador que falta. Vamos conversar sobre seu próximo nível.",
    emoji: "💎",
  };
}

const leadSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(8, "Telefone inválido").max(20),
  countryCode: z.string().trim().min(2).max(5),
});

const countryCodes = [
  { code: "+55", label: "🇧🇷 +55" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+351", label: "🇵🇹 +351" },
  { code: "+34", label: "🇪🇸 +34" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+33", label: "🇫🇷 +33" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+39", label: "🇮🇹 +39" },
  { code: "+81", label: "🇯🇵 +81" },
];

const QuizFlow = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", email: "", phone: "", countryCode: "+55" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = (score: number, index: number) => {
    if (isTransitioning) return;
    setSelectedIndex(index);
    setIsTransitioning(true);
    const newAnswers = [...answers, score];
    setTimeout(() => {
      setAnswers(newAnswers);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowLeadForm(true);
      }
      setSelectedIndex(null);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 400);
  };

  const goBack = () => {
    if (isTransitioning || currentQuestion === 0) return;
    setIsTransitioning(true);
    setSelectedIndex(null);
    setCurrentQuestion(currentQuestion - 1);
    setAnswers(answers.slice(0, -1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedIndex(null);
    setShowResult(false);
    setShowLeadForm(false);
    setLeadData({ name: "", email: "", phone: "", countryCode: "+55" });
    setErrors({});
  };

  const handleLeadSubmit = useCallback(async () => {
    const result = leadSchema.safeParse(leadData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((e) => {
        if (e.path[0]) fieldErrors[e.path[0] as string] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    const totalScore = answers.reduce((a, b) => a + b, 0);
    const diagnostic = getDiagnostic(totalScore);

    try {
      await supabase.from("quiz_leads").insert({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone,
        country_code: result.data.countryCode,
        total_score: totalScore,
        diagnostic_title: diagnostic.title,
      });
    } catch {
      // Don't block the result even if save fails
    }

    setIsSubmitting(false);
    setShowLeadForm(false);
    setShowResult(true);
  }, [leadData, answers]);

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const diagnostic = getDiagnostic(totalScore);
  const progress = showLeadForm
    ? 100
    : ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/30">
        <div className="max-w-lg mx-auto px-5 py-4 flex items-center justify-center">
          <IvoLogo size="sm" className="opacity-80" />
        </div>
      </div>

      {/* Progress bar */}
      {!showResult && (
        <div className="w-full max-w-lg mx-auto px-5 pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/70">
              {showLeadForm ? "Último passo" : `${currentQuestion + 1} de ${questions.length}`}
            </span>
          </div>
          <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-gold rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      {/* Quiz title - only on first question */}
      {!showResult && !showLeadForm && currentQuestion === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-lg mx-auto px-5 pt-6"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60 mb-1">
            Diagnóstico Exclusivo
          </p>
          <h1 className="font-copperplate text-lg font-bold leading-tight uppercase tracking-wide">
            Descubra Seu Perfil de <span className="text-gradient-gold">Negociador</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            8 perguntas para revelar onde você está perdendo dinheiro
          </p>
        </motion.div>
      )}

      {/* Content area */}
      <div className="flex-1 flex items-center justify-center px-5 py-8">
        <AnimatePresence mode="wait">
          {!showResult && !showLeadForm && (
            <motion.div
              key={`q-${currentQuestion}`}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="w-full max-w-lg"
            >
              <h2 className="text-base font-bold mb-6 leading-relaxed text-foreground/90">
                {questions[currentQuestion].question}
              </h2>
              <div className="space-y-2.5">
                {questions[currentQuestion].options.map((option, i) => {
                  const isSelected = selectedIndex === i;
                  return (
                    <motion.button
                      key={`${currentQuestion}-${i}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 + i * 0.04, duration: 0.2 }}
                      onClick={() => handleAnswer(option.score, i)}
                      disabled={isTransitioning}
                      className={`w-full text-left p-4 rounded-lg border text-sm leading-relaxed transition-all duration-200 active:scale-[0.97] disabled:pointer-events-none ${
                        isSelected
                          ? "bg-gold/10 border-gold/50 text-foreground shadow-gold"
                          : "bg-card border-border/50 text-foreground/80"
                      }`}
                    >
                      {option.text}
                    </motion.button>
                  );
                })}
              </div>
              {currentQuestion > 0 && (
                <button
                  onClick={goBack}
                  disabled={isTransitioning}
                  className="mt-6 mx-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                >
                  <ArrowLeft className="h-3 w-3" /> Anterior
                </button>
              )}
            </motion.div>
          )}

          {showLeadForm && (
            <motion.div
              key="lead-form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-lg"
            >
              <div className="text-center mb-8">
                <div className="text-4xl mb-3">🎯</div>
                <h2 className="font-copperplate text-xl font-bold mb-2 uppercase tracking-wide">
                  Seu diagnóstico está <span className="text-gradient-gold">pronto!</span>
                </h2>
                <p className="text-sm text-muted-foreground">
                  Preencha seus dados para revelar o resultado
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Seu nome</label>
                  <input
                    type="text"
                    value={leadData.name}
                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                    placeholder="João Silva"
                    className="w-full h-12 rounded-lg bg-card border border-border/50 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 focus:shadow-gold transition-all"
                    maxLength={100}
                  />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Seu e-mail</label>
                  <input
                    type="email"
                    value={leadData.email}
                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                    placeholder="joao@email.com"
                    className="w-full h-12 rounded-lg bg-card border border-border/50 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 focus:shadow-gold transition-all"
                    maxLength={255}
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Seu telefone</label>
                  <div className="flex gap-2">
                    <select
                      value={leadData.countryCode}
                      onChange={(e) => setLeadData({ ...leadData, countryCode: e.target.value })}
                      className="h-12 rounded-lg bg-card border border-border/50 px-3 text-sm text-foreground focus:outline-none focus:border-gold/50 transition-all appearance-none cursor-pointer"
                    >
                      {countryCodes.map((c) => (
                        <option key={c.code} value={c.code}>{c.label}</option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={leadData.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^\d\s()-]/g, "");
                        setLeadData({ ...leadData, phone: val });
                      }}
                      placeholder="(99) 99999-9999"
                      className="flex-1 h-12 rounded-lg bg-card border border-border/50 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 focus:shadow-gold transition-all"
                      maxLength={20}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>
              </div>

              <motion.button
                onClick={handleLeadSubmit}
                disabled={isSubmitting}
                whileTap={{ scale: 0.97 }}
                className="w-full mt-6 h-14 rounded-lg bg-gradient-gold-deep text-primary-foreground font-bold text-sm shadow-gold-intense hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Ver meu diagnóstico
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>

              <p className="text-[10px] text-muted-foreground/50 text-center mt-3">
                Seus dados estão seguros e não serão compartilhados.
              </p>
            </motion.div>
          )}

          {showResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-lg text-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 250, damping: 20 }}
                className="text-6xl mb-4"
              >
                {diagnostic.emoji}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="font-copperplate text-2xl font-bold text-gradient-gold mb-3 uppercase tracking-wide"
              >
                {diagnostic.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="text-sm text-secondary-foreground/80 leading-relaxed mb-6"
              >
                {diagnostic.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="bg-card border border-gold/20 rounded-lg p-6 mb-6 glow-gold"
              >
                <Sparkles className="h-5 w-5 text-gold mx-auto mb-3" />
                <p className="text-sm text-foreground leading-relaxed">{diagnostic.recommendation}</p>
              </motion.div>

              <motion.a
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                href="https://wa.me/5527992936922?text=Ol%C3%A1%20Ivo!%20Fiz%20o%20quiz%20e%20quero%20conversar%20sobre%20o%20meu%20resultado."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-lg bg-gradient-gold-deep text-primary-foreground font-bold text-sm shadow-gold-intense hover:opacity-90 active:scale-[0.97] transition-all duration-200 mb-4"
              >
                <CalendarCheck className="h-5 w-5" />
                Falar com o time comercial
              </motion.a>

              <button onClick={restart} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Refazer o diagnóstico
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer branding */}
      <div className="py-4 text-center">
        <IvoLogo size="sm" className="opacity-20" />
      </div>
    </div>
  );
};

export default QuizFlow;
