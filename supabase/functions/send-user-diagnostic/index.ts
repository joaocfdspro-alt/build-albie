const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DiagnosticPayload {
  to: string;
  name: string;
  totalScore: number;
  diagnosticTitle: string;
  aiDiagnostic: {
    observation: string;
    perspective: string;
    recommendation: string;
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getDiagnosticStyle(_title: string): { bgColor: string; borderColor: string } {
  return { bgColor: "#1a1512", borderColor: "#c9952e" };
}

function getCtaByScore(score: number): { text: string; url: string; description: string } {
  if (score <= 18) return {
    text: "CONHECER O NEGOCIADOR",
    url: "https://ivobrasil.com.br/onegociador/",
    description: "O primeiro passo para sair do improviso e começar a negociar com método."
  };
  return {
    text: "QUERO O CÓDIGO DA NEGOCIAÇÃO",
    url: "https://ivobrasil.lovable.app/codigo-da-negociacao",
    description: "O programa de 90 dias que vai transformar sua forma de negociar."
  };
}

function buildUserEmailHtml(payload: DiagnosticPayload): string {
  const firstName = payload.name.split(" ")[0];
  const diagStyle = getDiagnosticStyle(payload.diagnosticTitle);
  const scorePercent = Math.round((payload.totalScore / 32) * 100);
  const cta = getCtaByScore(payload.totalScore);

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0d0b09;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;color:#e8ddd0;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:40px;">
      <div style="margin:0 auto;padding:12px 0 20px 0;border-bottom:1px solid #2a231c;">
        <p style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#c9952e;margin:0;font-weight:700;">Ivo Brasil</p>
        <p style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#8b7a6b;margin:6px 0 0 0;">Estrategista em Negociações Complexas</p>
      </div>
      <p style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#8b7a6b;margin:20px 0 12px 0;">Seu Diagnóstico de Negociação</p>
      <h1 style="font-size:26px;font-weight:800;color:#ffffff;margin:0 0 12px 0;line-height:1.3;">${escapeHtml(payload.diagnosticTitle)}</h1>
      <div style="display:inline-block;background:${diagStyle.bgColor};color:${diagStyle.color};border:1px solid ${diagStyle.borderColor};padding:6px 18px;border-radius:20px;font-size:12px;font-weight:700;">
        ${diagStyle.emoji} ${escapeHtml(payload.diagnosticTitle)}
      </div>
    </div>

    <!-- Score -->
    <div style="background-color:#1a1512;border:1px solid #2a231c;border-radius:16px;padding:24px;margin-bottom:24px;text-align:center;">
      <p style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#8b7a6b;margin:0 0 8px 0;font-weight:700;">Pontuação</p>
      <p style="font-size:42px;font-weight:900;color:#ffffff;margin:0;line-height:1;">${payload.totalScore}<span style="font-size:18px;color:#8b7a6b;font-weight:400;">/32</span></p>
      <div style="background:#2a231c;border-radius:10px;height:8px;margin-top:16px;overflow:hidden;">
        <div style="background:linear-gradient(90deg,#c9952e,#e8b94a);height:8px;width:${scorePercent}%;border-radius:10px;"></div>
      </div>
    </div>

    <!-- Observation -->
    <div style="background-color:#1a1512;border:1px solid #2a231c;border-radius:16px;padding:28px;margin-bottom:20px;">
      <p style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#c9952e;margin:0 0 16px 0;font-weight:700;">O que eu enxergo em você</p>
      <p style="font-size:14px;line-height:1.7;color:#e8ddd0;margin:0;">${escapeHtml(payload.aiDiagnostic.observation)}</p>
    </div>

    <!-- Perspective -->
    <div style="background-color:#ffffff;border-radius:16px;padding:28px;margin-bottom:20px;color:#1a1512;">
      <p style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#8b7a6b;margin:0 0 16px 0;font-weight:700;">Sua real perspectiva</p>
      <p style="font-size:14px;line-height:1.7;color:#1a1512;margin:0;">${escapeHtml(payload.aiDiagnostic.perspective)}</p>
    </div>

    <!-- Recommendation -->
    <div style="background-color:#1a1512;border:1px solid #2a231c;border-radius:16px;padding:28px;margin-bottom:32px;">
      <p style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#c9952e;margin:0 0 16px 0;font-weight:700;">Meu caminho recomendado</p>
      <p style="font-size:14px;line-height:1.7;color:#e8ddd0;margin:0;">${escapeHtml(payload.aiDiagnostic.recommendation)}</p>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:40px;">
      <h2 style="font-size:22px;font-weight:800;color:#ffffff;margin:0 0 16px 0;line-height:1.3;">E agora, ${escapeHtml(firstName)}?</h2>
      <p style="font-size:14px;color:#8b7a6b;margin:0 0 12px 0;line-height:1.7;">
        Você viu onde está. A pergunta é: vai continuar negociando no improviso?
      </p>
      <p style="font-size:14px;color:#8b7a6b;margin:0 0 24px 0;line-height:1.7;">
        ${escapeHtml(cta.description)}
      </p>
      <a href="${cta.url}"
         style="display:inline-block;background:linear-gradient(135deg,#c9952e,#a07822);color:#ffffff;padding:16px 40px;border-radius:12px;text-decoration:none;font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;box-shadow:0 4px 20px rgba(201,149,46,0.35);">
        ${cta.text} →
      </a>
    </div>

    <!-- WhatsApp Secondary CTA -->
    <div style="text-align:center;margin-bottom:40px;padding:24px;background-color:#1a1512;border:1px solid #2a231c;border-radius:16px;">
      <p style="font-size:14px;color:#e8ddd0;margin:0 0 16px 0;line-height:1.6;">
        Prefere conversar diretamente? Fale comigo pelo WhatsApp:
      </p>
      <a href="https://wa.me/5546999238882?text=${encodeURIComponent(`Olá Ivo! Fiz o diagnóstico de negociação e meu perfil é ${payload.diagnosticTitle}. Quero dar o próximo passo.`)}"
         style="display:inline-block;background:#16a34a;color:#ffffff;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:1px;">
        💬 FALAR COM IVO NO WHATSAPP
      </a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;border-top:1px solid #2a231c;padding-top:28px;">
      <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9952e;margin:0 0 4px 0;font-weight:700;">Ivo Brasil</p>
      <p style="font-size:11px;color:#8b7a6b;margin:0;">Estrategista em Negociações Complexas</p>
      <p style="font-size:10px;color:#5a4f42;margin:8px 0 0 0;">ivobrasil.com.br · Desenvolvido por D7 Company</p>
    </div>

  </div>
</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = (await req.json()) as DiagnosticPayload;
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const firstName = payload.name.split(" ")[0];
    const htmlBody = buildUserEmailHtml(payload);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Ivo Brasil <noreply@hub.ivobrasil.com.br>",
        to: [payload.to],
        subject: `${firstName}, seu Diagnóstico de Negociação está pronto`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Resend error:", res.status, errorText);
      throw new Error(`Resend error: ${res.status}`);
    }

    const result = await res.json();
    return new Response(JSON.stringify({ success: true, id: result.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Send user diagnostic error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erro ao enviar email" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
