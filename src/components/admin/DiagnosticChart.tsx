import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface DiagnosticChartProps { leads: { diagnostic_title: string }[]; }

const DIAGNOSTIC_COLORS: Record<string, { bar: string; text: string; bg: string }> = {
  "Negociador Intuitivo": { bar: "bg-red-500", text: "text-red-400", bg: "bg-red-500/10" },
  "Negociador Reativo": { bar: "bg-amber-500", text: "text-amber-400", bg: "bg-amber-500/10" },
  "Negociador Consciente": { bar: "bg-blue-500", text: "text-blue-400", bg: "bg-blue-500/10" },
  "Negociador Estratégico": { bar: "bg-emerald-500", text: "text-emerald-400", bg: "bg-emerald-500/10" },
};

export function DiagnosticChart({ leads }: DiagnosticChartProps) {
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach((l) => { counts[l.diagnostic_title] = (counts[l.diagnostic_title] || 0) + 1; });
    const total = leads.length || 1;
    const ordered = ["Negociador Intuitivo", "Negociador Reativo", "Negociador Consciente", "Negociador Estratégico"];
    return ordered.filter((key) => counts[key]).map((key) => ({ label: key, count: counts[key], percent: Math.round((counts[key] / total) * 100) }));
  }, [leads]);

  if (data.length === 0) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border/50 bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Distribuição de Perfis</h3>
        <span className="text-[10px] text-muted-foreground">{leads.length} leads</span>
      </div>
      <div className="space-y-3">
        {data.map((item, i) => {
          const colors = DIAGNOSTIC_COLORS[item.label] || { bar: "bg-muted", text: "text-foreground", bg: "bg-muted/10" };
          return (
            <motion.div key={item.label} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-semibold ${colors.text}`}>{item.label}</span>
                <div className="flex items-center gap-2"><span className="text-xs font-bold text-foreground">{item.count}</span><span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${colors.bg} ${colors.text}`}>{item.percent}%</span></div>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden"><motion.div className={`h-full rounded-full ${colors.bar}`} initial={{ width: 0 }} animate={{ width: `${item.percent}%` }} transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }} /></div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
