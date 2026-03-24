import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2, Shield, MessageSquare, Eye, Lightbulb, Route, Target } from "lucide-react";
import { z } from "zod";
import { Link } from "react-router-dom";
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
      { text: "Não me preparo, vou no instinto e na hora improviso.", score: 1 },
      { text: "Penso sobre o que quero, mas sem um método definido.", score: 2 },
      { text: "Pesquiso a outra parte e defino limites, mas falta estratégia.", score: 3 },
      { text: "Tenho framework completo com alternativas, âncoras e plano B.", score: 4 },
    ],
  },
  {
    question: "Quando a outra parte faz uma contraproposta agressiva, você:",
    options: [
      { text: "Aceito rapidamente para não perder o negócio.", score: 1 },
      { text: "Fico nervoso e faço concessões sem planejamento.", score: 2 },
      { text: "Contra argumento, mas sem muita convicção.", score: 3 },
      { text: "Mantenho a posição, uso silêncio estratégico e redireciono.", score: 4 },
    ],
  },
  {
    question: "Qual é sua abordagem ao definir preço ou valor?",
    options: [
      { text: "Cobro o mínimo possível para garantir a venda.", score: 1 },
      { text: "Defino um preço, mas baixo rápido se pressionado.", score: 2 },
      { text: "Pesquiso o mercado e defendo com argumentos.", score: 3 },
      { text: "Uso âncora alta, justifico com valor e nego com limite pré-estabelecido.", score: 4 },
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
      { text: "Controlo o tom, uso conexão genuína e conduzo com estratégia.", score: 4 },
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
      { text: "Não consigo imaginar mudança, parece impossível.", score: 1 },
      { text: "Espero ter mais coragem, mas não sei por onde começar.", score: 2 },
      { text: "Quero ser um negociador estratégico com método definido.", score: 3 },
      { text: "Quero estar fechando acordos de alto nível com maestria.", score: 4 },
    ],
  },
];

const OPEN_QUESTION = "Sua vez de falar. O que te fez buscar esse diagnóstico e o que você sente que está perdendo por não negociar da forma certa?";

interface DiagnosticProfile {
  title: string;
  color: string;
  borderColor: string;
}

function getProfileMeta(score: number): DiagnosticProfile {
  if (score <= 11) return { title: "Negociador Intuitivo", color: "text-red-400", borderColor: "border-red-400/30" };
  if (score <= 18) return { title: "Negociador Reativo", color: "text-amber-400", borderColor: "border-amber-400/30" };
  if (score <= 25) return { title: "Negociador Consciente", color: "text-blue-400", borderColor: "border-blue-400/30" };
  return { title: "Negociador Estratégico", color: "text-gold", borderColor: "border-gold/30" };
}

const leadSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(8, "WhatsApp inválido").max(20),
  countryCode: z.string().trim().min(2).max(5),
});

const countryCodes = [
  { code: "+55", label: "🇧🇷 +55", minDigits: 10, maxDigits: 11, placeholder: "(99) 99999-9999" },
  { code: "+1", label: "🇺🇸 +1", minDigits: 10, maxDigits: 10, placeholder: "(555) 555-5555" },
  { code: "+351", label: "🇵🇹 +351", minDigits: 9, maxDigits: 9, placeholder: "912 345 678" },
  { code: "+34", label: "🇪🇸 +34", minDigits: 9, maxDigits: 9, placeholder: "612 345 678" },
  { code: "+44", label: "🇬🇧 +44", minDigits: 10, maxDigits: 11, placeholder: "7911 123456" },
  { code: "+33", label: "🇫🇷 +33", minDigits: 9, maxDigits: 9, placeholder: "6 12 34 56 78" },
  { code: "+49", label: "🇩🇪 +49", minDigits: 10, maxDigits: 11, placeholder: "151 12345678" },
  { code: "+39", label: "🇮🇹 +39", minDigits: 9, maxDigits: 10, placeholder: "312 345 6789" },
  { code: "+81", label: "🇯🇵 +81", minDigits: 10, maxDigits: 11, placeholder: "90-1234-5678" },
];

function getPhoneDigitCount(phone: string): number {
  return phone.replace(/\D/g, "").length;
}

function getCountryConfig(countryCode: string) {
  return countryCodes.find(c => c.code === countryCode) || { minDigits: 8, maxDigits: 11, placeholder: "Seu WhatsApp" };
}

interface AIDiagnostic {
  observation: string;
  perspective: string;
  recommendation: string;
}

const loadingSteps = [
  "Analisando suas respostas...",
  "Cruzando padrões de negociação...",
  "Identificando pontos de melhoria...",
  "Consolidando seu plano de ação...",
];

const DIAGNOSTIC_TITLE = "Diagnóstico Executivo Exclusivo";
const DIAGNOSTIC_SUBTITLE = "8 perguntas estratégicas para revelar onde você está perdendo dinheiro";

interface DiagnosticCategory {
  key: string;
  label: string;
  score: number;
  insight: string;
  action: string;
}

const categoryRules = [
  {
    key: "preparacao",
    label: "preparo estratégico",
    indexes: [0],
    insights: [
      "falta uma rotina de preparo antes das conversas decisivas",
      "você inicia reuniões sem um roteiro claro de margem e concessão",
      "existe espaço para fortalecer seu plano antes de sentar à mesa",
    ],
    actions: [
      "estruturar um checklist de preparação em três blocos: objetivo, limites e alternativas",
      "definir previamente BATNA, âncora e critério de concessão para cada proposta",
      "entrar em cada negociação com cenário A, B e C para não decidir sob pressão",
    ],
  },
  {
    key: "pressao",
    label: "controle sob pressão",
    indexes: [1, 3],
    insights: [
      "a pressão da contraparte ainda muda seu ritmo de decisão",
      "o momento de objeção intensa ainda desorganiza sua condução",
      "em cenários tensos você acaba acelerando concessões importantes",
    ],
    actions: [
      "aplicar perguntas de precisão e silêncio estratégico antes de responder",
      "treinar frases de reposicionamento para manter firmeza sem elevar o tom",
      "responder objeções com estrutura: reconhecer, investigar e redirecionar",
    ],
  },
  {
    key: "valor",
    label: "defesa de valor",
    indexes: [2, 6],
    insights: [
      "seu valor ainda não está sendo defendido com consistência",
      "você comunica preço antes de consolidar percepção de valor",
      "há sinais de desconto prematuro quando a conversa aperta",
    ],
    actions: [
      "apresentar valor em camadas antes de discutir preço final",
      "amarrar cada proposta a ganho financeiro ou operacional mensurável",
      "usar concessões condicionais para evitar cortes unilaterais",
    ],
  },
  {
    key: "presenca",
    label: "presença de liderança",
    indexes: [4, 5, 7],
    insights: [
      "sua postura ainda oscila quando enfrenta interlocutores mais duros",
      "há potencial para elevar autoridade sem perder conexão humana",
      "você já tem base técnica, mas precisa impor mais direção na conversa",
    ],
    actions: [
      "conduzir abertura e fechamento com frases de comando objetivas",
      "trabalhar respiração, ritmo de fala e enquadramento da reunião",
      "encerrar cada rodada com próximos passos e compromisso explícito",
    ],
  },
] as const;

function buildAdaptiveDiagnostic(params: {
  name: string;
  totalScore: number;
  answers: number[];
  openResponse: string;
  seed: number;
}): AIDiagnostic {
  const identitySeed = `${params.name}|${params.openResponse}|${params.answers.join("")}|${params.seed}`
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const pick = (items: readonly string[], offset: number) => items[(identitySeed + offset) % items.length];

  const categories: DiagnosticCategory[] = categoryRules.map((rule, index) => {
    const score =
      rule.indexes.reduce((sum, i) => sum + (params.answers[i] || 0), 0) / Math.max(rule.indexes.length, 1);

    return {
      key: rule.key,
      label: rule.label,
      score,
      insight: pick(rule.insights, index + 2),
      action: pick(rule.actions, index + 11),
    };
  });

  const weakest = [...categories].sort((a, b) => a.score - b.score).slice(0, 2);
  const strongest = [...categories].sort((a, b) => b.score - a.score)[0];

  const profileOpeners =
    params.totalScore <= 11
      ? [
          "Pelo seu padrão de respostas, hoje você negocia com muita intuição e pouca estrutura.",
          "Seu diagnóstico mostra que você está em uma fase de reconstrução da base negocial.",
          "As respostas indicam que você tem potencial, mas está operando sem método consistente.",
        ]
      : params.totalScore <= 18
        ? [
            "Seu resultado mostra um perfil reativo, com boa leitura de cenário, mas baixa sustentação tática.",
            "Existe consciência do problema, porém ainda falta consistência na execução em momentos críticos.",
            "Você já percebe onde perde dinheiro, mas ainda reage mais do que conduz.",
          ]
        : params.totalScore <= 25
          ? [
              "Seu diagnóstico revela uma base sólida e potencial real para avançar de nível.",
              "Você já tem repertório, mas ainda precisa de regularidade para transformar técnica em resultado recorrente.",
              "As respostas mostram evolução clara e margem para refinamento estratégico.",
            ]
          : [
              "Seu resultado mostra um perfil avançado, com sinais claros de domínio tático.",
              "Você já opera acima da média e está em fase de refinamento para negociações maiores.",
              "As respostas apontam maturidade negocial e abertura para ajustes de alta performance.",
            ];

  const openResponseSummary = params.openResponse.trim().length > 12
    ? `No seu relato final, ficou evidente um senso de urgência real para corrigir esse padrão.`
    : "Mesmo com resposta aberta curta, seu padrão de decisão já trouxe sinais suficientes para um plano objetivo.";

  const observation = `${pick(profileOpeners, 19)} Hoje, o principal gargalo está em ${weakest[0].label}, onde ${weakest[0].insight}. Também aparece um segundo ponto em ${weakest[1].label}, que reforça esse mesmo cenário. ${openResponseSummary}`;

  const perspective = `O que eu vejo em você é capacidade de evolução rápida, desde que exista método e repetição guiada. Seu melhor ativo agora está em ${strongest.label}, e isso precisa ser usado como alavanca para recuperar margem nas próximas negociações. Se ajustar os dois pontos críticos, sua curva de resultado muda em semanas e não em anos.`;

  const recommendation = `Meu caminho recomendado é direto: nos próximos 30 dias, foque em ${weakest[0].action}. Em paralelo, trabalhe em ${weakest[1].action} para estabilizar seu posicionamento nas conversas de maior valor. Com esse plano, você sai do improviso e passa a conduzir negociações com controle, previsibilidade e lucro.`;

  return { observation, perspective, recommendation };
}

// Helper to fire Meta Pixel events safely
const fbqTrack = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("trackCustom", eventName, params);
  }
};

const QuizFlow = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showOpenQuestion, setShowOpenQuestion] = useState(false);
  const [openResponse, setOpenResponse] = useState("");
  const [leadData, setLeadData] = useState({ name: "", email: "", phone: "", countryCode: "+55" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [aiDiagnostic, setAiDiagnostic] = useState<AIDiagnostic | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [emailCopyNotice, setEmailCopyNotice] = useState<"idle" | "sent" | "pending">("idle");

  // Fire QuizStart on mount
  useEffect(() => {
    fbqTrack("QuizStart");
  }, []);

  // Fire QuizStep whenever currentQuestion changes
  useEffect(() => {
    if (!showLeadForm && !showResult && !showOpenQuestion) {
      fbqTrack("QuizStep", { step: currentQuestion + 1, question: questions[currentQuestion]?.question });
    }
  }, [currentQuestion, showLeadForm, showResult, showOpenQuestion]);

  // Loading step animation
  useEffect(() => {
    if (!isLoadingAI) {
      setLoadingStepIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingStepIndex(prev => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 2200);
    return () => clearInterval(interval);
  }, [isLoadingAI]);

  const handleAnswer = (score: number, index: number) => {
    if (isTransitioning) return;
    setSelectedIndex(index);
    setIsTransitioning(true);
    const newAnswers = [...answers, score];
    setTimeout(() => {
      setAnswers(newAnswers);
      if (currentQuestion === 6) {
        setShowOpenQuestion(true);
      } else if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowLeadForm(true);
      }
      setSelectedIndex(null);
      setTimeout(() => setIsTransitioning(false), 200);
    }, 350);
  };

  const handleOpenQuestionNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowOpenQuestion(false);
    setCurrentQuestion(7);
    setTimeout(() => setIsTransitioning(false), 200);
  };

  const goBack = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSelectedIndex(null);

    if (showOpenQuestion) {
      setShowOpenQuestion(false);
      setTimeout(() => setIsTransitioning(false), 200);
      return;
    }

    if (currentQuestion === 7 && !showOpenQuestion) {
      setCurrentQuestion(6);
      setShowOpenQuestion(true);
      setAnswers(answers.slice(0, -1));
      setTimeout(() => setIsTransitioning(false), 200);
      return;
    }

    setCurrentQuestion(currentQuestion - 1);
    setAnswers(answers.slice(0, -1));
    setTimeout(() => setIsTransitioning(false), 200);
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedIndex(null);
    setShowResult(false);
    setShowLeadForm(false);
    setShowOpenQuestion(false);
    setOpenResponse("");
    setLeadData({ name: "", email: "", phone: "", countryCode: "+55" });
    setErrors({});
    setAiDiagnostic(null);
    setEmailCopyNotice("idle");
  };

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/[^\d\s()\-]/g, "");
    const digitsOnly = cleaned.replace(/\D/g, "");
    const config = getCountryConfig(leadData.countryCode);
    if (digitsOnly.length > config.maxDigits) return;
    setLeadData({ ...leadData, phone: cleaned });
  };

  const handleLeadSubmit = useCallback(async () => {
    const config = getCountryConfig(leadData.countryCode);
    const actualDigits = getPhoneDigitCount(leadData.phone);

    const result = leadSchema.safeParse(leadData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((e) => {
        if (e.path[0]) fieldErrors[e.path[0] as string] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (actualDigits < config.minDigits || actualDigits > config.maxDigits) {
      setErrors({ phone: `WhatsApp deve ter entre ${config.minDigits} e ${config.maxDigits} dígitos para ${leadData.countryCode}` });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setIsLoadingAI(true);
    setShowLeadForm(false);
    setShowResult(true);
    setEmailCopyNotice("pending");

    const totalScore = answers.reduce((a, b) => a + b, 0);
    const profile = getProfileMeta(totalScore);
    const generatedDiagnostic = buildAdaptiveDiagnostic({
      name: result.data.name,
      totalScore,
      answers,
      openResponse,
      seed: Date.now(),
    });

    setAiDiagnostic(generatedDiagnostic);

    let insertedLead: Record<string, unknown> | null = null;

    try {
      const { data } = await supabase
        .from("quiz_leads")
        .insert([
          {
            name: result.data.name,
            email: result.data.email,
            phone: result.data.phone,
            country_code: result.data.countryCode,
            total_score: totalScore,
            diagnostic_title: profile.title,
            open_response: openResponse,
            ai_diagnostic: generatedDiagnostic as unknown as Record<string, string>,
          },
        ])
        .select("id, name, email, phone, country_code, total_score, diagnostic_title, created_at, open_response, ai_diagnostic")
        .single();

      insertedLead = data ? { ...data, ai_diagnostic: generatedDiagnostic } : null;
    } catch {
      insertedLead = null;
    }

    if (insertedLead) {
      // Send admin notification email
      try {
        await supabase.functions.invoke("notify-new-lead", {
          body: { record: insertedLead },
        });
      } catch (e) {
        console.error("Admin notify error (non-blocking):", e);
      }

      // Send diagnostic email to the user
      try {
        const { error: userEmailError } = await supabase.functions.invoke("send-user-diagnostic", {
          body: {
            to: result.data.email,
            name: result.data.name,
            totalScore,
            diagnosticTitle: profile.title,
            aiDiagnostic: generatedDiagnostic,
          },
        });
        setEmailCopyNotice(userEmailError ? "pending" : "sent");
      } catch {
        setEmailCopyNotice("pending");
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1800));

    setIsSubmitting(false);
    setIsLoadingAI(false);
  }, [leadData, answers, openResponse]);

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const profile = getProfileMeta(totalScore);

  const totalSteps = questions.length + 1;
  const currentStep = showLeadForm
    ? totalSteps + 1
    : showOpenQuestion
      ? 8
      : currentQuestion < 7
        ? currentQuestion + 1
        : currentQuestion + 2;
  const progress = showLeadForm ? 100 : (currentStep / totalSteps) * 100;

  const codigoWhatsappUrl = `https://wa.me/5546999238882?text=${encodeURIComponent("Olá! Fiz o diagnóstico de negociação e quero saber mais sobre o Código da Negociação.")}`;

  const diagnostic =
    aiDiagnostic ||
    buildAdaptiveDiagnostic({
      name: leadData.name || "Você",
      totalScore,
      answers,
      openResponse,
      seed: 77,
    });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/30">
        <div className="max-w-lg mx-auto px-5 py-4 flex items-center justify-center">
          <IvoLogo size="lg" />
        </div>
      </div>

      {/* Progress bar */}
      {!showResult && (
        <div className="w-full max-w-lg mx-auto px-5 pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/70">
              {showLeadForm ? "Último passo" : showOpenQuestion ? "Reflexão pessoal" : `${currentQuestion + 1} de ${questions.length}`}
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

      {/* Persistent diagnostic title during quiz */}
      {!showResult && (
        <div className="max-w-lg mx-auto px-5 pt-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60 mb-1">
            {DIAGNOSTIC_TITLE}
          </p>
          <p className="text-xs text-muted-foreground">
            {DIAGNOSTIC_SUBTITLE}
          </p>
        </div>
      )}

      {/* Content area */}
      <div className="flex-1 flex items-center justify-center px-5 py-8">
        <div>
          {/* Multiple choice questions */}
          {!showResult && !showLeadForm && !showOpenQuestion && (
            <motion.div
              key={`q-${currentQuestion}`}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
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
                      transition={{ delay: 0.05 + i * 0.03, duration: 0.15 }}
                      onClick={() => handleAnswer(option.score, i)}
                      disabled={isTransitioning}
                      className={`w-full text-left p-4 rounded-lg border text-sm leading-relaxed transition-all duration-150 active:scale-[0.98] disabled:pointer-events-none ${
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

          {/* Open-ended question */}
          {showOpenQuestion && (
            <motion.div
              key="open-question"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 border border-gold/20">
                  <MessageSquare className="h-5 w-5 text-gold" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/70">Resposta aberta</p>
              </div>
              <h2 className="text-base font-bold mb-6 leading-relaxed text-foreground/90">
                {OPEN_QUESTION}
              </h2>
              <textarea
                value={openResponse}
                onChange={(e) => setOpenResponse(e.target.value)}
                placeholder="Escreva aqui o que você sente sobre suas negociações hoje..."
                className="w-full h-32 rounded-lg bg-card border border-border/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 focus:shadow-gold transition-all resize-none"
                maxLength={500}
              />
              <p className="text-[10px] text-muted-foreground/50 text-right mt-1">{openResponse.length}/500</p>

              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={goBack}
                  disabled={isTransitioning}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                >
                  <ArrowLeft className="h-3 w-3" /> Anterior
                </button>
                <motion.button
                  onClick={handleOpenQuestionNext}
                  disabled={isTransitioning}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 h-11 rounded-lg bg-gradient-gold-deep text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  Continuar <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Lead form */}
          {showLeadForm && (
            <motion.div
              key="lead-form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-lg"
            >
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 border border-gold/20">
                    <Shield className="h-7 w-7 text-gold" />
                  </div>
                </div>
                <h2 className="font-copperplate text-xl font-bold mb-2 uppercase tracking-wide">
                  Seu diagnóstico está <span className="text-gradient-gold">pronto</span>
                </h2>
                <p className="text-sm text-muted-foreground">
                  Preencha seus dados para revelar o resultado personalizado.
                  <br />
                  <span className="text-[11px] text-gold/60">Você também receberá uma cópia no seu e-mail.</span>
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Seu nome</label>
                  <input
                    type="text"
                    value={leadData.name}
                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                    placeholder="João"
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
                  <label className="text-xs font-semibold text-foreground/70 mb-1.5 block">Seu WhatsApp</label>
                  <div className="flex gap-2">
                    <select
                      value={leadData.countryCode}
                      onChange={(e) => setLeadData({ ...leadData, countryCode: e.target.value, phone: "" })}
                      className="h-12 rounded-lg bg-card border border-border/50 px-3 text-sm text-foreground focus:outline-none focus:border-gold/50 transition-all appearance-none cursor-pointer"
                    >
                      {countryCodes.map((c) => (
                        <option key={c.code} value={c.code}>{c.label}</option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={leadData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder={getCountryConfig(leadData.countryCode).placeholder}
                      className="flex-1 h-12 rounded-lg bg-card border border-border/50 px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 focus:shadow-gold transition-all"
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

          {/* Result */}
          {showResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-lg"
            >
              {/* Loading state */}
              {isLoadingAI ? (
                <div className="text-center py-16">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/20 border-t-gold mx-auto mb-8"
                  />
                  <motion.p
                    key={loadingStepIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-foreground/70 font-medium"
                  >
                    {loadingSteps[loadingStepIndex]}
                  </motion.p>
                  <div className="flex justify-center gap-1.5 mt-6">
                    {loadingSteps.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                          i <= loadingStepIndex ? "bg-gold" : "bg-secondary"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* Profile header with score prominent */}
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full border border-gold/40 bg-gold/10 shadow-gold"
                    >
                      <div>
                        <p className="font-copperplate text-3xl leading-none text-gradient-gold">{totalScore}</p>
                        <p className="text-[11px] text-muted-foreground">de 32</p>
                      </div>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="font-copperplate text-2xl font-bold text-gradient-gold mb-1 uppercase tracking-wide"
                    >
                      {profile.title}
                    </motion.h2>
                  </div>

                  {/* Diagnostic cards */}
                  <div className="space-y-4 mb-8">
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-card border border-border/50 rounded-lg p-5"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Eye className="h-4 w-4 text-gold" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/70 font-copperplate">O que eu percebi sobre você</p>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">{diagnostic.observation}</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-card border border-gold/20 rounded-lg p-5"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="h-4 w-4 text-gold" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/70 font-copperplate">Minha análise da sua situação</p>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">{diagnostic.perspective}</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-card border border-border/50 rounded-lg p-5"
                    >
                          <div className="flex items-center gap-2 mb-3">
                            <Route className="h-4 w-4 text-gold" />
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/70 font-copperplate">O caminho que eu recomendo</p>
                          </div>
                          <p className="text-sm text-foreground/80 leading-relaxed">{diagnostic.recommendation}</p>
                        </motion.div>
                  </div>

                  {emailCopyNotice !== "idle" && (
                    <p className="text-[11px] text-center text-muted-foreground mb-6">
                      {emailCopyNotice === "sent"
                        ? "Uma cópia do seu diagnóstico foi enviada para seu e-mail."
                        : "Seu diagnóstico está salvo e a cópia por e-mail será entregue em instantes."}
                    </p>
                  )}

                  {/* Soft CTA for Código da Negociação */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-card border border-gold/20 rounded-lg p-5 mb-6"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold/60 mb-2 font-copperplate">Próximo nível</p>
                    <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                      O Código da Negociação é um programa de 90 dias que transforma a forma como você negocia. 
                      Método comprovado, técnicas de elite e acompanhamento direto de quem já conduziu mais de 22 bilhões de reais em negociações.
                    </p>
                    <Link
                      to="/codigo-da-negociacao"
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-lg bg-gradient-gold-deep text-primary-foreground font-bold text-sm shadow-gold-intense hover:opacity-90 active:scale-[0.98] transition-all duration-200"
                    >
                      <Target className="h-5 w-5" />
                      Garanta o seu acesso
                    </Link>
                  </motion.div>

                  <div className="text-center">
                    <button onClick={restart} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      Refazer o diagnóstico
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 text-center">
        <a
          href="https://www.d7company.com.br/tech"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors"
        >
          Desenvolvido por D7 Company
        </a>
      </div>
    </div>
  );
};

export default QuizFlow;
