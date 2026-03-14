import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, TrendingUp, Download, LogOut, Search,
  ChevronDown, ChevronUp, BarChart3, Clock, Loader2,
  UserPlus, Mail, Phone, Award, Calendar, ArrowUpDown,
  RefreshCw, LayoutDashboard, UserCog, Eye, Info,
  Archive, Trash2, ArchiveRestore, MoreVertical, Map,
  ExternalLink, MessageSquare
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { ThemeToggle } from "@/components/admin/ThemeToggle";
import { InviteAdminPanel } from "@/components/admin/InviteAdminPanel";
import { OnboardingTutorial, HelpButton } from "@/components/admin/OnboardingTutorial";
import { InfoPopover, ScoreInfoContent, DiagnosticInfoContent } from "@/components/admin/InfoPopovers";
import { LeadDetailPanel } from "@/components/admin/LeadDetailPanel";
import { DiagnosticChart } from "@/components/admin/DiagnosticChart";
import { MapaContent } from "@/pages/MapaDoProjeto";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  country_code: string;
  total_score: number;
  diagnostic_title: string;
  created_at: string;
  archived_at: string | null;
  open_response: string | null;
  ai_diagnostic: Record<string, string> | null;
}

type SortKey = "created_at" | "name" | "total_score" | "diagnostic_title";
type SortDir = "asc" | "desc";

const diagnosticBadge: Record<string, string> = {
  "Negociador Intuitivo": "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
  "Negociador Reativo": "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  "Negociador Consciente": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
  "Negociador Estratégico": "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
};

const scoreBarColor: Record<string, string> = {
  "Negociador Intuitivo": "bg-red-500",
  "Negociador Reativo": "bg-amber-500",
  "Negociador Consciente": "bg-blue-500",
  "Negociador Estratégico": "bg-emerald-500",
};

function buildWhatsAppUrl(phone: string, countryCode: string, name: string) {
  const cleanPhone = phone.replace(/\D/g, "");
  const cleanCode = countryCode.replace("+", "");
  const fullNumber = `${cleanCode}${cleanPhone}`;
  const text = encodeURIComponent(`Olá ${name}! Aqui é do time do Ivo Brasil. Vi que você fez nosso diagnóstico de negociação e gostaria de conversar sobre como podemos ajudar você a negociar melhor.`);
  return `https://wa.me/${fullNumber}?text=${text}`;
}

const AdminDashboard = () => {
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [filterDiagnostic, setFilterDiagnostic] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"leads" | "team" | "mapa">("leads");
  const [lightMode, setLightMode] = useState(() => localStorage.getItem("admin-theme") !== "dark");
  const [showTutorial, setShowTutorial] = useState(() => localStorage.getItem("admin-tutorial-dismissed") !== "true");
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "7d" | "30d">("all");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) navigate("/admin/login");
  }, [authLoading, user, isAdmin, navigate]);

  const fetchLeads = async () => {
    setLoading(true);
    const { data } = await supabase.from("quiz_leads").select("*").order("created_at", { ascending: false });
    setLeads((data as Lead[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { if (isAdmin) fetchLeads(); }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;
    const channel = supabase
      .channel("quiz_leads_realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "quiz_leads" }, (payload) => {
        setLeads((prev) => [payload.new as Lead, ...prev]);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [isAdmin]);

  const filtered = useMemo(() => {
    let result = leads.filter(l => showArchived ? l.archived_at !== null : l.archived_at === null);
    if (dateFilter !== "all") {
      const cutoff = new Date();
      if (dateFilter === "today") cutoff.setHours(0, 0, 0, 0);
      else if (dateFilter === "7d") cutoff.setDate(cutoff.getDate() - 7);
      else if (dateFilter === "30d") cutoff.setDate(cutoff.getDate() - 30);
      result = result.filter(l => new Date(l.created_at) >= cutoff);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(l => l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.phone.includes(q));
    }
    if (filterDiagnostic !== "all") result = result.filter(l => l.diagnostic_title === filterDiagnostic);
    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "created_at") cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      else if (sortKey === "total_score") cmp = a.total_score - b.total_score;
      else cmp = (a[sortKey] ?? "").localeCompare(b[sortKey] ?? "");
      return sortDir === "desc" ? -cmp : cmp;
    });
    return result;
  }, [leads, search, sortKey, sortDir, filterDiagnostic, showArchived, dateFilter]);

  const activeLeads = useMemo(() => leads.filter(l => l.archived_at === null), [leads]);
  const archivedCount = useMemo(() => leads.filter(l => l.archived_at !== null).length, [leads]);

  const stats = useMemo(() => {
    const active = activeLeads;
    const total = active.length;
    const today = active.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length;
    const avgScore = total ? Math.round(active.reduce((s, l) => s + l.total_score, 0) / total) : 0;
    const hot = active.filter(l => l.total_score >= 19).length;
    return { total, today, avgScore, hot };
  }, [activeLeads]);

  const archiveLead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await supabase.from("quiz_leads").update({ archived_at: new Date().toISOString() }).eq("id", id);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, archived_at: new Date().toISOString() } : l));
    setExpandedLead(null);
  };

  const restoreLead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await supabase.from("quiz_leads").update({ archived_at: null }).eq("id", id);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, archived_at: null } : l));
  };

  const deleteLead = async (id: string) => {
    await supabase.from("quiz_leads").delete().eq("id", id);
    setLeads(prev => prev.filter(l => l.id !== id));
    setExpandedLead(null);
  };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown className="h-3 w-3 opacity-30" />;
    return sortDir === "desc" ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />;
  };

  const exportCSV = () => {
    const headers = ["Nome", "E-mail", "Telefone", "Código País", "Pontuação", "Diagnóstico", "Data"];
    const rows = filtered.map(l => [l.name, l.email, l.phone, l.country_code, l.total_score, l.diagnostic_title, new Date(l.created_at).toLocaleString("pt-BR")]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-quiz-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  const formatTime = (d: string) => new Date(d).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  if (authLoading || (!isAdmin && user)) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>;
  }

  const diagnosticOptions = [...new Set(leads.map(l => l.diagnostic_title))];

  return (
    <div className={`min-h-screen bg-background ${lightMode ? "admin-light" : ""}`}>
      {showTutorial && <OnboardingTutorial onDismiss={() => setShowTutorial(false)} />}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-foreground flex items-center justify-center">
              <span className="text-background text-[10px] font-black">IB</span>
            </div>
            <span className="text-sm font-semibold text-foreground tracking-tight">Painel Comercial</span>
          </div>
          <div className="flex items-center gap-2">
            <HelpButton onClick={() => setShowTutorial(true)} />
            <ThemeToggle light={lightMode} onToggle={() => {
              const next = !lightMode;
              setLightMode(next);
              localStorage.setItem("admin-theme", next ? "light" : "dark");
            }} />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary/60 border border-border">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] text-muted-foreground">{user?.email}</span>
            </div>
            <button onClick={signOut} className="h-8 px-3 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary border border-border transition-colors flex items-center gap-1.5">
              <LogOut className="h-3.5 w-3.5" /> Sair
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-0 -mb-px">
            {([
              { key: "leads" as const, icon: LayoutDashboard, label: "Leads" },
              { key: "team" as const, icon: UserCog, label: "Equipe" },
              { key: "mapa" as const, icon: Map, label: "Mapa" },
            ]).map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`h-10 px-4 text-xs font-medium transition-all flex items-center gap-1.5 border-b-2 ${
                  activeTab === tab.key
                    ? "text-foreground border-foreground"
                    : "text-muted-foreground hover:text-foreground border-transparent"
                }`}>
                <tab.icon className="h-3.5 w-3.5" /> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {activeTab === "leads" ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon={Users} label="Total Leads" value={stats.total} />
            <StatCard icon={UserPlus} label="Hoje" value={stats.today} accent />
            <StatCard icon={BarChart3} label="Score Médio" value={`${stats.avgScore}/32`} />
            <StatCard icon={TrendingUp} label="Leads Quentes" value={stats.hot} accent />
          </div>

          {/* Chart */}
          <DiagnosticChart leads={activeLeads} />

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar nome, e-mail ou telefone..."
                  className="w-full h-9 rounded-md bg-card border border-border pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition-all" />
              </div>
              <select value={filterDiagnostic} onChange={(e) => setFilterDiagnostic(e.target.value)}
                className="h-9 rounded-md bg-card border border-border px-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 cursor-pointer">
                <option value="all">Todos os perfis</option>
                {diagnosticOptions.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value as typeof dateFilter)}
                className="h-9 rounded-md bg-card border border-border px-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 cursor-pointer">
                <option value="all">Todo período</option>
                <option value="today">Hoje</option>
                <option value="7d">7 dias</option>
                <option value="30d">30 dias</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowArchived(!showArchived)}
                className={`h-9 px-3 rounded-md border text-xs font-medium transition-colors flex items-center gap-1.5 ${showArchived ? "bg-secondary text-foreground border-border" : "bg-card text-muted-foreground border-border hover:text-foreground"}`}>
                {showArchived ? <><ArchiveRestore className="h-3.5 w-3.5" /> Ativos</> : <><Archive className="h-3.5 w-3.5" /> Arquivados {archivedCount > 0 && `(${archivedCount})`}</>}
              </button>
              <button onClick={fetchLeads} className="h-9 px-3 rounded-md bg-card border border-border text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              <button onClick={exportCSV} className="h-9 px-4 rounded-md bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5">
                <Download className="h-3.5 w-3.5" /> Exportar
              </button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">{filtered.length} lead{filtered.length !== 1 ? "s" : ""}</p>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center py-20"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Users className="h-8 w-8 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Nenhum lead encontrado</p>
            </div>
          ) : (
            <>
              {/* Mobile cards */}
              <div className="md:hidden space-y-2">
                {filtered.map((lead, i) => (
                  <motion.div key={lead.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.02, 0.3) }}
                    className={`rounded-lg border bg-card p-3.5 cursor-pointer transition-all ${expandedLead === lead.id ? "border-ring/40 shadow-sm" : "border-border hover:border-border/80"}`}
                    onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-foreground text-sm truncate">{lead.name}</p>
                        <p className="text-[11px] text-muted-foreground truncate mt-0.5">{lead.email}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`shrink-0 inline-flex px-2 py-0.5 rounded text-[9px] font-semibold border ${diagnosticBadge[lead.diagnostic_title] || "bg-secondary text-foreground border-border"}`}>
                          {lead.diagnostic_title.replace("Negociador ", "")}
                        </span>
                        <ChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${expandedLead === lead.id ? "rotate-180 text-foreground" : "text-muted-foreground/40"}`} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-10 h-1.5 rounded-full bg-secondary overflow-hidden">
                            <div className={`h-full rounded-full ${scoreBarColor[lead.diagnostic_title] || "bg-muted-foreground"}`} style={{ width: `${(lead.total_score / 32) * 100}%` }} />
                          </div>
                          <span className="font-mono font-bold text-foreground text-xs">{lead.total_score}</span>
                        </div>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {lead.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-[10px]">{formatDate(lead.created_at)}</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button onClick={(e) => e.stopPropagation()} className="p-1 rounded hover:bg-secondary text-muted-foreground/50 hover:text-foreground transition-colors">
                              <MoreVertical className="h-3.5 w-3.5" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            {!lead.archived_at ? (
                              <DropdownMenuItem onClick={(e) => archiveLead(lead.id, e as any)}><Archive className="h-3.5 w-3.5 mr-2" /> Arquivar</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={(e) => restoreLead(lead.id, e as any)}><ArchiveRestore className="h-3.5 w-3.5 mr-2" /> Restaurar</DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(lead.id); }} className="text-destructive focus:text-destructive">
                              <Trash2 className="h-3.5 w-3.5 mr-2" /> Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <AnimatePresence>
                      {expandedLead === lead.id && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                          <div className="pt-3 mt-3 border-t border-border">
                            <LeadDetailPanel name={lead.name} score={lead.total_score} diagnostic={lead.diagnostic_title} onClose={() => setExpandedLead(null)} phone={lead.phone} countryCode={lead.country_code} openResponse={lead.open_response} mobile />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* Desktop table */}
              <div className="hidden md:block rounded-lg border border-border overflow-hidden bg-card">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border bg-secondary/30">
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                          <button onClick={() => toggleSort("name")} className="flex items-center gap-1 hover:text-foreground transition-colors">
                            Nome / Contato <SortIcon col="name" />
                          </button>
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <button onClick={() => toggleSort("total_score")} className="flex items-center gap-1 hover:text-foreground transition-colors">
                              Score <SortIcon col="total_score" />
                            </button>
                            <InfoPopover><ScoreInfoContent /></InfoPopover>
                          </div>
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <button onClick={() => toggleSort("diagnostic_title")} className="flex items-center gap-1 hover:text-foreground transition-colors">
                              Perfil <SortIcon col="diagnostic_title" />
                            </button>
                            <InfoPopover><DiagnosticInfoContent /></InfoPopover>
                          </div>
                        </th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                          <button onClick={() => toggleSort("created_at")} className="flex items-center gap-1 hover:text-foreground transition-colors">
                            Data <SortIcon col="created_at" />
                          </button>
                        </th>
                        <th className="text-center px-4 py-3 font-medium text-muted-foreground">WhatsApp</th>
                        <th className="text-right px-4 py-3 font-medium text-muted-foreground">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((lead, i) => {
                        const waUrl = buildWhatsAppUrl(lead.phone, lead.country_code, lead.name);
                        return (
                          <React.Fragment key={lead.id}>
                            <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: Math.min(i * 0.015, 0.4) }}
                              className={`border-b border-border/50 hover:bg-secondary/20 transition-colors cursor-pointer ${expandedLead === lead.id ? "bg-secondary/10" : ""}`}
                              onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}>
                              <td className="px-4 py-3">
                                <p className="font-medium text-foreground text-sm">{lead.name}</p>
                                <p className="text-muted-foreground mt-0.5">{lead.email}</p>
                                <p className="text-muted-foreground mt-0.5">{lead.country_code} {lead.phone}</p>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-12 h-1.5 rounded-full bg-secondary overflow-hidden">
                                    <div className={`h-full rounded-full ${scoreBarColor[lead.diagnostic_title] || "bg-muted-foreground"}`} style={{ width: `${(lead.total_score / 32) * 100}%` }} />
                                  </div>
                                  <span className="font-mono font-semibold text-foreground">{lead.total_score}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold border ${diagnosticBadge[lead.diagnostic_title] || "bg-secondary text-foreground border-border"}`}>
                                  {lead.diagnostic_title}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <p className="text-foreground/80">{formatDate(lead.created_at)}</p>
                                <p className="text-muted-foreground flex items-center gap-1 mt-0.5"><Clock className="h-3 w-3" /> {formatTime(lead.created_at)}</p>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:hover:bg-emerald-500/20 transition-colors">
                                  <ExternalLink className="h-3 w-3" /> Contato
                                </a>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center justify-end gap-1">
                                  <button onClick={(e) => { e.stopPropagation(); setExpandedLead(expandedLead === lead.id ? null : lead.id); }}
                                    className={`p-1.5 rounded-md transition-colors ${expandedLead === lead.id ? "bg-secondary text-foreground" : "text-muted-foreground/40 hover:text-foreground hover:bg-secondary"}`}>
                                    <Eye className="h-3.5 w-3.5" />
                                  </button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <button onClick={(e) => e.stopPropagation()} className="p-1.5 rounded-md text-muted-foreground/40 hover:text-foreground hover:bg-secondary transition-colors">
                                        <MoreVertical className="h-3.5 w-3.5" />
                                      </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-44">
                                      {!lead.archived_at ? (
                                        <DropdownMenuItem onClick={(e) => archiveLead(lead.id, e as any)}><Archive className="h-3.5 w-3.5 mr-2" /> Arquivar</DropdownMenuItem>
                                      ) : (
                                        <DropdownMenuItem onClick={(e) => restoreLead(lead.id, e as any)}><ArchiveRestore className="h-3.5 w-3.5 mr-2" /> Restaurar</DropdownMenuItem>
                                      )}
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(lead.id); }} className="text-destructive focus:text-destructive">
                                        <Trash2 className="h-3.5 w-3.5 mr-2" /> Excluir
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </td>
                            </motion.tr>
                            <AnimatePresence>
                              {expandedLead === lead.id && (
                                <LeadDetailPanel name={lead.name} score={lead.total_score} diagnostic={lead.diagnostic_title} onClose={() => setExpandedLead(null)} phone={lead.phone} countryCode={lead.country_code} openResponse={lead.open_response} />
                              )}
                            </AnimatePresence>
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      ) : activeTab === "team" ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6"><InviteAdminPanel /></main>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6"><MapaContent /></main>
      )}

      <AlertDialog open={!!deleteConfirmId} onOpenChange={(open) => { if (!open) setDeleteConfirmId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir permanentemente?</AlertDialogTitle>
            <AlertDialogDescription>
              O lead "{leads.find(l => l.id === deleteConfirmId)?.name}" será removido definitivamente. Essa ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deleteConfirmId) deleteLead(deleteConfirmId); setDeleteConfirmId(null); }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

function StatCard({ icon: Icon, label, value, accent }: { icon: React.ElementType; label: string; value: string | number; accent?: boolean }) {
  return (
    <div className={`rounded-lg border p-4 ${accent ? "border-foreground/10 bg-foreground/[0.03]" : "border-border bg-card"}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
      </div>
      <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
    </div>
  );
}

export default AdminDashboard;
