const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const NOTIFY_EMAILS = [
  "0019.andrematheus@gmail.com",
  "ledioprofissional@gmail.com",
];

const ADMIN_PANEL_URL = "https://ivobrasil.lovable.app/admin";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getTemperature(score: number): { label: string; color: string; bgColor: string } {
  if (score <= 11) return { label: "Frio", color: "#6b7280", bgColor: "#f3f4f6" };
  if (score <= 18) return { label: "Morno", color: "#d97706", bgColor: "#fef3c7" };
  if (score <= 25) return { label: "Quente", color: "#ea580c", bgColor: "#ffedd5" };
  return { label: "Premium", color: "#7c3aed", bgColor: "#ede9fe" };
}

function getStrategy(score: number): { profile: string; nextStep: string; offer: string } {
  if (score <= 11) return {
    profile: "Lead em fase de descoberta. Precisa de nutrição e educação antes de oferta direta.",
    nextStep: "Enviar conteúdo educativo sobre negociação. Convidar para webinar gratuito.",
    offer: "Sessão diagnóstico cortesia ou conteúdo gratuito"
  };
  if (score <= 18) return {
    profile: "Lead consciente do problema mas ainda hesitante. Sensível a prova social.",
    nextStep: "Compartilhar cases de sucesso e depoimentos. Oferecer sessão 1:1 de avaliação.",
    offer: "Curso O Negociador ou Código da Negociação"
  };
  if (score <= 25) return {
    profile: "Lead com alta consciência e pronto para investir. Responde bem a urgência e exclusividade.",
    nextStep: "Contato direto para apresentar programa. Oferecer condição especial ou bônus exclusivo.",
    offer: "Código da Negociação ou mentoria personalizada"
  };
  return {
    profile: "Lead top de funil. Já entende o valor, busca excelência. Decisor rápido.",
    nextStep: "Apresentar mentoria ou programa VIP imediatamente. Usar abordagem consultiva.",
    offer: "Mentoria VIP ou programa sob medida"
  };
}

function getDiagnosticStyle(title: string): { color: string; bgColor: string; borderColor: string } {
  const map: Record<string, { color: string; bgColor: string; borderColor: string }> = {
    "Negociador Intuitivo": { color: "#dc2626", bgColor: "#fef2f2", borderColor: "#fecaca" },
    "Negociador Reativo": { color: "#d97706", bgColor: "#fffbeb", borderColor: "#fde68a" },
    "Negociador Consciente": { color: "#2563eb", bgColor: "#eff6ff", borderColor: "#bfdbfe" },
    "Negociador Estratégico": { color: "#16a34a", bgColor: "#f0fdf4", borderColor: "#bbf7d0" },
  };
  return map[title] || { color: "#6b7280", bgColor: "#f9fafb", borderColor: "#e5e7eb" };
}

async function generateAISummary(lead: any): Promise<string> {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!LOVABLE_API_KEY) return "";

  try {
    const aiDiag = lead.ai_diagnostic;
    const contextText = aiDiag
      ? `Observação: ${aiDiag.observation}\nPerspectiva: ${aiDiag.perspective}\nRecomendação: ${aiDiag.recommendation}`
      : "";

    const aiResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-lite",
          messages: [
            {
              role: "system",
              content: `Você é um analista comercial do Ivo Brasil. Com base nos dados de um lead que fez o diagnóstico de negociação, gere um resumo executivo CURTO (máximo 4 frases) com:
1. Perfil da pessoa (momento atual em negociação)
2. O que ela busca (necessidade principal)
3. Nível de urgência e melhor abordagem comercial

Seja direto, sem formatação markdown. Escreva em português brasileiro.`,
            },
            {
              role: "user",
              content: `Nome: ${lead.name}\nPontuação: ${lead.total_score}/32\nDiagnóstico: ${lead.diagnostic_title}\nResposta aberta: ${lead.open_response || "Não informada"}\n\n${contextText}`,
            },
          ],
        }),
      }
    );

    if (aiResponse.ok) {
      const aiData = await aiResponse.json();
      return aiData.choices?.[0]?.message?.content || "";
    }
  } catch (err) {
    console.error("AI summary error (non-blocking):", err);
  }
  return "";
}

function buildAdminEmailHtml(lead: any, aiSummary: string): string {
  const temp = getTemperature(lead.total_score);
  const strategy = getStrategy(lead.total_score);
  const diagStyle = getDiagnosticStyle(lead.diagnostic_title);
  const scorePercent = Math.round((lead.total_score / 32) * 100);
  const whatsappNumber = `${lead.country_code?.replace('+', '')}${lead.phone?.replace(/\D/g, '')}`;
  const createdAt = new Date(lead.created_at || Date.now()).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

  const aiSummaryBlock = aiSummary ? `
  <div style="background-color:#1a1512;border:1px solid #2a231c;border-radius:16px;padding:24px;margin-bottom:20px;">
    <p style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#c9952e;margin:0 0 16px 0;font-weight:700;">Resumo Inteligente do Lead</p>
    <p style="font-size:14px;color:#e8ddd0;line-height:1.7;margin:0;">${escapeHtml(aiSummary)}</p>
  </div>` : "";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0d0b09;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0b09;padding:24px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#141110;border-radius:16px;overflow:hidden;border:1px solid #2a231c;">

<!-- Header -->
<tr><td style="background:linear-gradient(135deg,#1a1512,#2a231c);padding:32px 40px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#c9952e;font-weight:700;">Ivo Brasil · Diagnóstico de Negociação</p>
        <h1 style="margin:8px 0 0;font-size:22px;color:#ffffff;font-weight:800;line-height:1.3;">Novo Lead Capturado</h1>
      </td>
      <td align="right" valign="top">
        <div style="background:${temp.bgColor};color:${temp.color};padding:6px 16px;border-radius:20px;font-size:12px;font-weight:800;display:inline-block;">
          ${temp.label}
        </div>
      </td>
    </tr>
  </table>
</td></tr>

<!-- Score Visual -->
<tr><td style="padding:28px 40px 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1512;border-radius:12px;padding:20px;border:1px solid #2a231c;">
    <tr>
      <td width="50%">
        <p style="margin:0;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#8b7a6b;font-weight:700;">Pontuação</p>
        <p style="margin:4px 0 0;font-size:36px;font-weight:900;color:#ffffff;line-height:1;">${lead.total_score}<span style="font-size:16px;color:#8b7a6b;font-weight:400;">/32</span></p>
      </td>
      <td width="50%">
        <p style="margin:0;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#8b7a6b;font-weight:700;">Diagnóstico</p>
        <div style="margin-top:8px;">
          <span style="background:${diagStyle.bgColor};color:${diagStyle.color};border:1px solid ${diagStyle.borderColor};padding:5px 14px;border-radius:20px;font-size:13px;font-weight:700;display:inline-block;">${lead.diagnostic_title}</span>
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding-top:16px;">
        <div style="background:#2a231c;border-radius:10px;height:8px;overflow:hidden;">
          <div style="background:linear-gradient(90deg,#c9952e,#e8b94a);height:8px;width:${scorePercent}%;border-radius:10px;"></div>
        </div>
      </td>
    </tr>
  </table>
</td></tr>

<!-- Contact Info -->
<tr><td style="padding:24px 40px 0;">
  <p style="margin:0 0 12px;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#8b7a6b;font-weight:700;">Dados do Lead</p>
  <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #2a231c;border-radius:12px;overflow:hidden;">
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid #2a231c;background:#1a1512;">
        <p style="margin:0;font-size:10px;color:#8b7a6b;text-transform:uppercase;letter-spacing:1px;">Nome</p>
        <p style="margin:4px 0 0;font-size:15px;font-weight:700;color:#ffffff;">${escapeHtml(lead.name)}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid #2a231c;">
        <p style="margin:0;font-size:10px;color:#8b7a6b;text-transform:uppercase;letter-spacing:1px;">E-mail</p>
        <p style="margin:4px 0 0;font-size:14px;"><a href="mailto:${lead.email}" style="color:#c9952e;text-decoration:none;font-weight:600;">${escapeHtml(lead.email)}</a></p>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 20px;background:#1a1512;">
        <p style="margin:0;font-size:10px;color:#8b7a6b;text-transform:uppercase;letter-spacing:1px;">WhatsApp</p>
        <p style="margin:4px 0 0;font-size:14px;"><a href="https://wa.me/${whatsappNumber}" style="color:#16a34a;text-decoration:none;font-weight:600;">${lead.country_code} ${lead.phone}</a></p>
      </td>
    </tr>
  </table>
</td></tr>

${lead.open_response ? `
<!-- Open Response -->
<tr><td style="padding:24px 40px 0;">
  <p style="margin:0 0 12px;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#8b7a6b;font-weight:700;">Resposta Aberta do Lead</p>
  <div style="background:#1a1512;border:1px solid #2a231c;border-radius:12px;padding:16px 20px;">
    <p style="margin:0;font-size:13px;color:#e8ddd0;line-height:1.6;font-style:italic;">"${escapeHtml(lead.open_response)}"</p>
  </div>
</td></tr>
` : ''}

<!-- AI Summary -->
<tr><td style="padding:24px 40px 0;">
  ${aiSummaryBlock}
</td></tr>

<!-- Strategy Section -->
<tr><td style="padding:4px 40px 0;">
  <p style="margin:0 0 12px;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#8b7a6b;font-weight:700;">Análise Estratégica</p>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1512;border:1px solid #2a231c;border-radius:12px;overflow:hidden;">
    <tr>
      <td style="padding:20px 24px;border-bottom:1px solid #2a231c;">
        <p style="margin:0;font-size:9px;text-transform:uppercase;letter-spacing:2px;color:#c9952e;font-weight:700;">Perfil</p>
        <p style="margin:6px 0 0;font-size:13px;color:#e8ddd0;line-height:1.5;">${strategy.profile}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 24px;border-bottom:1px solid #2a231c;">
        <p style="margin:0;font-size:9px;text-transform:uppercase;letter-spacing:2px;color:#c9952e;font-weight:700;">Próximo Passo</p>
        <p style="margin:6px 0 0;font-size:13px;color:#e8ddd0;line-height:1.5;">${strategy.nextStep}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 24px;">
        <p style="margin:0;font-size:9px;text-transform:uppercase;letter-spacing:2px;color:#c9952e;font-weight:700;">Oferta Recomendada</p>
        <p style="margin:6px 0 0;font-size:14px;color:#ffffff;font-weight:700;">${strategy.offer}</p>
      </td>
    </tr>
  </table>
</td></tr>

<!-- CTA -->
<tr><td style="padding:28px 40px;" align="center">
  <a href="${ADMIN_PANEL_URL}" style="display:inline-block;background:linear-gradient(135deg,#c9952e,#a07822);color:#ffffff;padding:16px 48px;border-radius:12px;text-decoration:none;font-weight:800;font-size:15px;letter-spacing:0.5px;box-shadow:0 4px 20px rgba(201,149,46,0.35);">
    Acessar Painel Admin
  </a>
  <p style="margin:12px 0 0;font-size:11px;color:#8b7a6b;">Veja o diagnóstico completo e tome a melhor decisão comercial</p>
</td></tr>

<!-- Footer -->
<tr><td style="background:#1a1512;padding:20px 40px;border-top:1px solid #2a231c;" align="center">
  <p style="margin:0;font-size:10px;color:#8b7a6b;">Ivo Brasil · Diagnóstico de Negociação · ${createdAt}</p>
  <p style="margin:4px 0 0;font-size:9px;color:#5a4f42;">E-mail gerado automaticamente · Desenvolvido por D7 Company</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function buildCodigoLeadEmailHtml(lead: any): string {
  const whatsappNumber = `${lead.country_code?.replace('+', '') || '55'}${lead.phone?.replace(/\D/g, '')}`;
  const createdAt = new Date(lead.created_at || Date.now()).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0d0b09;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0b09;padding:24px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#141110;border-radius:16px;overflow:hidden;border:1px solid #2a231c;">

<!-- Header -->
<tr><td style="background:linear-gradient(135deg,#1a1512,#2a231c);padding:32px 40px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#c9952e;font-weight:700;">Ivo Brasil · Código da Negociação</p>
        <h1 style="margin:8px 0 0;font-size:22px;color:#ffffff;font-weight:800;line-height:1.3;">Novo Interessado no Programa</h1>
      </td>
      <td align="right" valign="top">
        <div style="background:#ede9fe;color:#7c3aed;padding:6px 16px;border-radius:20px;font-size:12px;font-weight:800;display:inline-block;">
          🎯 Código
        </div>
      </td>
    </tr>
  </table>
</td></tr>

<!-- Contact Info -->
<tr><td style="padding:28px 40px 0;">
  <p style="margin:0 0 12px;font-size:10px;text-transform:uppercase;letter-spacing:2px;color:#8b7a6b;font-weight:700;">Dados do Interessado</p>
  <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #2a231c;border-radius:12px;overflow:hidden;">
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid #2a231c;background:#1a1512;">
        <p style="margin:0;font-size:10px;color:#8b7a6b;text-transform:uppercase;letter-spacing:1px;">Nome</p>
        <p style="margin:4px 0 0;font-size:15px;font-weight:700;color:#ffffff;">${escapeHtml(lead.name)}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid #2a231c;">
        <p style="margin:0;font-size:10px;color:#8b7a6b;text-transform:uppercase;letter-spacing:1px;">E-mail</p>
        <p style="margin:4px 0 0;font-size:14px;"><a href="mailto:${lead.email}" style="color:#c9952e;text-decoration:none;font-weight:600;">${escapeHtml(lead.email)}</a></p>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 20px;background:#1a1512;">
        <p style="margin:0;font-size:10px;color:#8b7a6b;text-transform:uppercase;letter-spacing:1px;">WhatsApp</p>
        <p style="margin:4px 0 0;font-size:14px;"><a href="https://wa.me/${whatsappNumber}" style="color:#16a34a;text-decoration:none;font-weight:600;">${lead.country_code || '+55'} ${lead.phone}</a></p>
      </td>
    </tr>
  </table>
</td></tr>

<!-- Action suggestion -->
<tr><td style="padding:24px 40px 0;">
  <div style="background:#1a1512;border:1px solid #2a231c;border-radius:12px;padding:20px 24px;">
    <p style="margin:0;font-size:9px;text-transform:uppercase;letter-spacing:2px;color:#c9952e;font-weight:700;">Ação Recomendada</p>
    <p style="margin:6px 0 0;font-size:13px;color:#e8ddd0;line-height:1.5;">Este lead demonstrou interesse direto no Código da Negociação. Entrar em contato o mais breve possível pelo WhatsApp para apresentar o programa e condições.</p>
  </div>
</td></tr>

<!-- CTAs -->
<tr><td style="padding:28px 40px;" align="center">
  <a href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá ${lead.name.split(' ')[0]}! Vi que você demonstrou interesse no Código da Negociação. Posso te ajudar?`)}" style="display:inline-block;background:#16a34a;color:#ffffff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;font-size:13px;margin-right:12px;">
    💬 Falar no WhatsApp
  </a>
  <a href="${ADMIN_PANEL_URL}" style="display:inline-block;background:linear-gradient(135deg,#c9952e,#a07822);color:#ffffff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;font-size:13px;">
    Painel Admin
  </a>
  <p style="margin:12px 0 0;font-size:11px;color:#8b7a6b;">Responda rápido — leads quentes convertem mais</p>
</td></tr>

<!-- Footer -->
<tr><td style="background:#1a1512;padding:20px 40px;border-top:1px solid #2a231c;" align="center">
  <p style="margin:0;font-size:10px;color:#8b7a6b;">Ivo Brasil · Código da Negociação · ${createdAt}</p>
  <p style="margin:4px 0 0;font-size:9px;color:#5a4f42;">E-mail gerado automaticamente · Desenvolvido por D7 Company</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const lead = payload.record;
    const source = payload.source || "quiz"; // "quiz" or "codigo"

    if (!lead) {
      return new Response(JSON.stringify({ error: "No record" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      console.log("No RESEND_API_KEY configured, skipping email");
      return new Response(JSON.stringify({ success: true, skipped: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let emailSubject: string;
    let emailBody: string;

    if (source === "codigo") {
      const firstName = lead.name?.split(" ")[0] || "Alguém";
      emailSubject = `🎯 Novo Interessado: ${firstName} quer o Código da Negociação`;
      emailBody = buildCodigoLeadEmailHtml(lead);
    } else {
      // Quiz lead (original behavior)
      const aiSummary = await generateAISummary(lead);
      const temp = getTemperature(lead.total_score);
      emailSubject = `Novo Lead: ${lead.name} — ${lead.diagnostic_title} (${temp.label})`;
      emailBody = buildAdminEmailHtml(lead, aiSummary);
    }

    const targetEmails = payload._test_override_emails && Array.isArray(payload._test_override_emails)
      ? payload._test_override_emails
      : NOTIFY_EMAILS;

    const results = [];
    for (let i = 0; i < targetEmails.length; i++) {
      const email = targetEmails[i];
      if (i > 0) await new Promise((r) => setTimeout(r, 600));

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Ivo Brasil <noreply@hub.ivobrasil.com.br>",
          to: [email],
          subject: emailSubject,
          html: emailBody,
        }),
      });
      const resBody = await res.text();
      results.push({ email, status: res.status, body: resBody });
      console.log(`Admin email sent to ${email}: ${res.status}`);
    }

    console.log("All admin notifications sent:", JSON.stringify(results));

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing notification:", error);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
