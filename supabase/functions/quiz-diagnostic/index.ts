import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { name, answers, openResponse, totalScore, profileTitle } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const answersText = answers.map((a: { question: string; answer: string }, i: number) =>
      `${i + 1}. ${a.question}\nResposta: ${a.answer}`
    ).join("\n\n");

    const systemPrompt = `Você é o Ivo Brasil, estrategista em negociações com mais de 20 anos de experiência em negociações bilionárias na Vale e no setor corporativo. Você fala com autoridade, mas com empatia. Sem rodeios, direto ao ponto. Use linguagem firme mas acolhedora. NUNCA use hífens, travessões ou traços em seus textos. Escreva de forma humana, não robótica.`;

    const userPrompt = `Uma pessoa chamada ${name} completou meu diagnóstico de negociação e obteve o perfil "${profileTitle}" com ${totalScore} pontos de 32.

Respostas dela:
${answersText}

${openResponse ? `Quando perguntei "O que te trouxe até aqui? O que você sente que está deixando na mesa?", ela respondeu:\n"${openResponse}"` : ""}

Gere um diagnóstico personalizado com EXATAMENTE 3 seções. Cada seção deve ter 2 a 3 frases cirúrgicas (nem longas demais, nem curtas demais). Fale diretamente com ${name} usando "você".`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_diagnostic",
              description: "Generate a personalized negotiation diagnostic with 3 sections",
              parameters: {
                type: "object",
                properties: {
                  observation: {
                    type: "string",
                    description: "O que percebi sobre esta pessoa baseado nas respostas dela. 2-3 frases.",
                  },
                  perspective: {
                    type: "string",
                    description: "O que eu (Ivo) penso sobre a situação dessa pessoa e o potencial dela. 2-3 frases.",
                  },
                  recommendation: {
                    type: "string",
                    description: "O caminho que eu recomendo para essa pessoa evoluir como negociadora. 2-3 frases.",
                  },
                },
                required: ["observation", "perspective", "recommendation"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_diagnostic" } },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);

      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Muitas requisições. Tente novamente em instantes." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ error: "AI unavailable" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (toolCall?.function?.arguments) {
      const diagnostic = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify({ diagnostic }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "No diagnostic generated" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("quiz-diagnostic error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
