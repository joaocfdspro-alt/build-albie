import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, CalendarCheck, Loader2 } from "lucide-react";
import { z } from "zod";
import logoImage from "@/assets/logo-maria.png";
import { supabase } from "@/integrations/supabase/client";

interface Question {
  question: string;
  options: { text: string; score: number }[];
}

const questions: Question[] = [
  {
    question: "Quando você precisa falar em público, o que acontece com você?",
    options: [
      { text: "Travo. Meu corpo congela e eu prefiro desaparecer.", score: 1 },
      { text: "Falo, mas sinto que ninguém me leva a sério.", score: 2 },
      { text: "Consigo falar, mas sei que poderia ser muito melhor.", score: 3 },
      { text: "Me sinto segura, mas quero alcançar outro nível.", score: 4 },
    ],
  },
  {
    question: "Quando alguém discorda de você, como reage?",
    options: [
      { text: "Recuo imediatamente. Tenho medo de ser julgada.", score: 1 },
      { text: "Falo, mas depois fico remoendo o que disse.", score: 2 },
      { text: "Me posiciono, mas sinto que falta clareza na minha fala.", score: 3 },
      { text: "Defendo com firmeza, mas quero mais impacto.", score: 4 },
    ],
  },
  {
    question: "Qual é a sua relação com a própria voz?",
    options: [
      { text: "Odeio me ouvir. Evito áudios e vídeos a todo custo.", score: 1 },
      { text: "Tolero, mas sinto que minha voz não me representa.", score: 2 },
      { text: "Estou aprendendo a aceitar, mas ainda me incomoda.", score: 3 },
      { text: "Gosto da minha voz — quero usá-la com mais poder.", score: 4 },
    ],
  },
  {
    question: "As pessoas realmente entendem o que você quer dizer?",
    options: [
      { text: "Quase nunca. Parece que falo e ninguém escuta.", score: 1 },
      { text: "Às vezes. Preciso repetir ou explicar demais.", score: 2 },
      { text: "Na maioria das vezes sim, mas em momentos-chave, travo.", score: 3 },
      { text: "Sim, mas quero ainda mais precisão e influência.", score: 4 },
    ],
  },
  {
    question: "O que mais te impede de se comunicar com confiança?",
    options: [
      { text: "O medo paralisante de ser julgada ou rejeitada.", score: 1 },
      { text: "Não consigo organizar meus pensamentos sob pressão.", score: 2 },
      { text: "Falta de técnica — sei que posso aprender.", score: 3 },
      { text: "Quero me posicionar em palcos maiores.", score: 4 },
    ],
  },
  {
    question: "Em uma conversa difícil, como você costuma reagir?",
    options: [
      { text: "Evito o confronto. Engulo tudo e finjo que tá bem.", score: 1 },
      { text: "Falo, mas depois me arrependo do que disse.", score: 2 },
      { text: "Consigo me posicionar, mas a insegurança me consome.", score: 3 },
      { text: "Lido bem, mas quero mais inteligência emocional.", score: 4 },
    ],
  },
  {
    question: "Gravar um vídeo ou áudio — como é pra você?",
    options: [
      { text: "Nem consigo apertar o botão. É agonizante.", score: 1 },
      { text: "Gravo, mas faço dezenas de takes até desistir.", score: 2 },
      { text: "Consigo gravar, mas sei que posso melhorar.", score: 3 },
      { text: "Gravo com segurança — quero mais presença e magnetismo.", score: 4 },
    ],
  },
  {
    question: "Daqui a 6 meses, como você se vê comunicando?",
    options: [
      { text: "Não consigo imaginar nada diferente. Parece impossível.", score: 1 },
      { text: "Espero ter mais coragem, mas não sei por onde começar.", score: 2 },
      { text: "Quero ser uma comunicadora segura, clara e magnética.", score: 3 },
      { text: "Quero usar minha voz para liderar, inspirar e transformar.", score: 4 },
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
      title: "Voz Aprisionada",
      description: "Você carrega travas profundas que te impedem de ocupar espaços e se expressar. Isso não é fraqueza — é resultado de experiências que silenciaram sua voz. A boa notícia: essa voz está dentro de você, esperando para ser libertada.",
      recommendation: "Uma conversa comigo pode ser o primeiro passo para romper esse ciclo. Em 15 minutos, vou te mostrar que é possível.",
      emoji: "🔒",
    };
  }
  if (score <= 18) {
    return {
      title: "Voz Hesitante",
      description: "Você já se expressa, mas sente que algo falta — clareza, segurança, impacto. Você sabe que pode mais, mas não encontrou ainda o caminho para destravar toda sua potência comunicativa.",
      recommendation: "Uma conversa comigo vai te ajudar a identificar exatamente o que está te travando e qual é o próximo passo certo pra você.",
      emoji: "🌱",
    };
  }
  if (score <= 25) {
    return {
      title: "Voz em Despertar",
      description: "Você já tem consciência da importância da comunicação e está no caminho. Falta estrutura, técnica e o ambiente certo para acelerar sua transformação.",
      recommendation: "Uma conversa estratégica comigo pode ser o impulso que falta para você alcançar o próximo nível.",
      emoji: "✨",
    };
  }
  return {
    title: "Voz Poderosa",
    description: "Você já tem segurança, mas está buscando refinamento e impacto em ambientes maiores. Sua voz já é forte — agora é hora de amplificá-la.",
    recommendation: "Uma conversa comigo vai te mostrar como usar sua voz como instrumento de influência e liderança.",
    emoji: "👑",
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

    // Show selected state briefly, then advance
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
          <img src={logoImage} alt="Maria Marcelino" className="h-9 invert opacity-80" />
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
          <h1 className="text-lg font-black leading-tight">
            Descubra o Poder da <span className="text-gradient-gold">Sua Voz</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            8 perguntas para revelar o que silencia a sua comunicação
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
                      className={`w-full text-left p-4 rounded-xl border text-sm leading-relaxed transition-all duration-200 active:scale-[0.97] disabled:pointer-events-none ${
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
                <h2 className="text-xl font-black mb-2">
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
                    placeholder="Maria Silva"
                    className="w-full h-12 rounded-xl bg-card border border-border/50 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 focus:shadow-gold transition-all"
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
                    placeholder="maria@email.com"
                    className="w-full h-12 rounded-xl bg-card border border-border/50 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 focus:shadow-gold transition-all"
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
                      className="h-12 rounded-xl bg-card border border-border/50 px-3 text-sm text-foreground focus:outline-none focus:border-gold/50 transition-all appearance-none cursor-pointer"
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
                      className="flex-1 h-12 rounded-xl bg-card border border-border/50 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 focus:shadow-gold transition-all"
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
                className="w-full mt-6 h-14 rounded-xl bg-gradient-gold-deep text-primary-foreground font-bold text-sm shadow-gold-intense hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
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
                className="text-2xl font-black text-gradient-gold mb-3"
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
                className="bg-card border border-gold/20 rounded-2xl p-6 mb-6 glow-gold"
              >
                <Sparkles className="h-5 w-5 text-gold mx-auto mb-3" />
                <p className="text-sm text-foreground leading-relaxed">{diagnostic.recommendation}</p>
              </motion.div>

              <motion.a
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                href="https://wa.me/5528999785743?text=Ol%C3%A1%20Maria!%20Fiz%20o%20quiz%20e%20quero%20agendar%20minha%20conversa%20de%2015%20minutos."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-gold-deep text-primary-foreground font-bold text-sm shadow-gold-intense hover:opacity-90 active:scale-[0.97] transition-all duration-200 mb-4"
              >
                <CalendarCheck className="h-5 w-5" />
                Agendar minha conversa (15 min)
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
        <img src={logoImage} alt="Maria Marcelino" className="h-5 invert opacity-20 mx-auto" />
      </div>
    </div>
  );
};

export default QuizFlow;
