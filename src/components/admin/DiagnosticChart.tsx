import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface DiagnosticChartProps { leads: { diagnostic_title: string }[]; }

const DIAGNOSTIC_COLORS: Record<string, { bar: string; text: string }> = {
  "Negociador Intuitivo": { bar: "bg-red-500", text: "text-red-600 dark:text-red-400" },
  "Negociador Reativo": { bar: "bg-amber-500", text: "text-amber-600 dark:text-amber-400" },
  "Negociador Consciente": { bar: "bg-blue-500", text: "text-blue-600 dark:text-blue-400" },
  "Negociador Estratégico": { bar: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400" },
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
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-foreground">Distribuição de Perfis</h3>
        <span className="text-[11px] text-muted-foreground">{leads.length} leads</span>
      </div>
      <div className="space-y-3">
        {data.map((item, i) => {
          const colors = DIAGNOSTIC_COLORS[item.label] || { bar: "bg-muted-foreground", text: "text-foreground" };
          return (
            <motion.div key={item.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-medium ${colors.text}`}>{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-foreground">{item.count}</span>
                  <span className="text-[10px] text-muted-foreground">{item.percent}%</span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div className={`h-full rounded-full ${colors.bar}`} initial={{ width: 0 }} animate={{ width: `${item.percent}%` }} transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
