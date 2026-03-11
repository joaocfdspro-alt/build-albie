import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, TrendingUp, Download, LogOut, Search,
  ChevronDown, ChevronUp, BarChart3, Clock, Loader2,
  UserPlus, Mail, Phone, Award, Calendar, ArrowUpDown,
  RefreshCw, LayoutDashboard, UserCog, Eye, Info,
  Archive, Trash2, ArchiveRestore, MoreVertical, Map
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import logoImage from "@/assets/logo-maria.png";
import { ThemeToggle } from "@/components/admin/ThemeToggle";
import { InviteAdminPanel } from "@/components/admin/InviteAdminPanel";
import { OnboardingTutorial, HelpButton } from "@/components/admin/OnboardingTutorial";
import { InfoPopover, ScoreInfoContent, DiagnosticInfoContent } from "@/components/admin/InfoPopovers";
import { LeadDetailPanel } from "@/components/admin/LeadDetailPanel";
import { DiagnosticChart } from "@/components/admin/DiagnosticChart";
import D7Footer from "@/components/D7Footer";
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
}

type SortKey = "created_at" | "name" | "total_score" | "diagnostic_title";
type SortDir = "asc" | "desc";

const diagnosticColors: Record<string, string> = {
  "Voz Aprisionada": "bg-red-500/15 text-red-400 border-red-500/20",
  "Voz Hesitante": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  "Voz em Despertar": "bg-blue-500/15 text-blue-400 border-blue-500/20",
  "Voz Poderosa": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
};

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
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [authLoading, user, isAdmin, navigate]);

  const fetchLeads = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("quiz_leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads((data as Lead[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchLeads();
  }, [isAdmin]);

  // Realtime subscription
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
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.phone.includes(q)
      );
    }
    if (filterDiagnostic !== "all") {
      result = result.filter((l) => l.diagnostic_title === filterDiagnostic);
    }
    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "created_at") cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      else if (sortKey === "total_score") cmp = a.total_score - b.total_score;
      else cmp = (a[sortKey] ?? "").localeCompare(b[sortKey] ?? "");
      return sortDir === "desc" ? -cmp : cmp;
    });
    return result;
  }, [leads, search, sortKey, sortDir, filterDiagnostic, showArchived]);

  const activeLeads = useMemo(() => leads.filter(l => l.archived_at === null), [leads]);
  const archivedCount = useMemo(() => leads.filter(l => l.archived_at !== null).length, [leads]);

  const stats = useMemo(() => {
    const active = activeLeads;
    const total = active.length;
    const today = active.filter(
      (l) => new Date(l.created_at).toDateString() === new Date().toDateString()
    ).length;
    const avgScore = total ? Math.round(active.reduce((s, l) => s + l.total_score, 0) / total) : 0;
    const byDiag = active.reduce((acc, l) => {
      acc[l.diagnostic_title] = (acc[l.diagnostic_title] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const topDiag = Object.entries(byDiag).sort((a, b) => b[1] - a[1])[0];
    return { total, today, avgScore, topDiag };
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
    const rows = filtered.map((l) => [
      l.name,
      l.email,
      l.phone,
      l.country_code,
      l.total_score,
      l.diagnostic_title,
      new Date(l.created_at).toLocaleString("pt-BR"),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-quiz-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  };

  const formatTime = (d: string) => {
    return new Date(d).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  };

  if (authLoading || (!isAdmin && user)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gold" />
      </div>
    );
  }

  const diagnosticOptions = [...new Set(leads.map((l) => l.diagnostic_title))];

  return (
    <div className={`min-h-screen bg-background ${lightMode ? "admin-light" : ""}`}>
      {showTutorial && <OnboardingTutorial onDismiss={() => setShowTutorial(false)} />}
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Maria Marcelino" className={`h-6 opacity-60 ${lightMode ? "" : "invert"}`} />
            <div className="h-4 w-px bg-border" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <HelpButton onClick={() => setShowTutorial(true)} />
            <ThemeToggle light={lightMode} onToggle={() => {
              const next = !lightMode;
              setLightMode(next);
              localStorage.setItem("admin-theme", next ? "light" : "dark");
            }} />
            <span className="text-xs text-muted-foreground hidden sm:block">{user?.email}</span>
            <button
              onClick={signOut}
              className="h-8 px-3 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-all flex items-center gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" /> Sair
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1">
          <button
            onClick={() => setActiveTab("leads")}
            className={`h-9 px-4 text-xs font-semibold rounded-t-lg transition-all flex items-center gap-1.5 ${
              activeTab === "leads"
                ? "bg-background text-foreground border border-b-0 border-border/50"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutDashboard className="h-3.5 w-3.5" /> Leads
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`h-9 px-4 text-xs font-semibold rounded-t-lg transition-all flex items-center gap-1.5 ${
              activeTab === "team"
                ? "bg-background text-foreground border border-b-0 border-border/50"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <UserCog className="h-3.5 w-3.5" /> Equipe
          </button>
          <button
            onClick={() => setActiveTab("mapa")}
            className={`h-9 px-4 text-xs font-semibold rounded-t-lg transition-all flex items-center gap-1.5 ${
              activeTab === "mapa"
                ? "bg-background text-foreground border border-b-0 border-border/50"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Map className="h-3.5 w-3.5" /> Mapa
          </button>
        </div>
      </header>

      {activeTab === "leads" ? (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard icon={Users} label="Total de Leads" value={stats.total} hint="Pessoas que completaram o quiz" />
          <StatCard icon={UserPlus} label="Novos Hoje" value={stats.today} accent hint="Leads captados nas últimas 24h" />
          <StatCard icon={BarChart3} label="Score Médio" value={`${stats.avgScore}/32`} hint="Quanto maior, mais pronto pra comprar" />
          <StatCard
            icon={Award}
            label="Perfil Mais Comum"
            value={stats.topDiag ? stats.topDiag[0] : "—"}
            small
            hint={stats.topDiag ? `${stats.topDiag[1]} leads com esse perfil` : "Aguardando dados"}
          />
        </div>

        {/* Diagnostic Distribution Chart */}
        <DiagnosticChart leads={activeLeads} />

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nome, e-mail ou telefone..."
                className="w-full h-9 rounded-lg bg-secondary border border-border/50 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/40 transition-all"
              />
            </div>
            <select
              value={filterDiagnostic}
              onChange={(e) => setFilterDiagnostic(e.target.value)}
              className="h-9 rounded-lg bg-secondary border border-border/50 px-3 text-xs text-foreground focus:outline-none focus:border-gold/40 transition-all appearance-none cursor-pointer"
            >
              <option value="all">Todos os diagnósticos</option>
              {diagnosticOptions.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            {showArchived ? (
              <button
                onClick={() => setShowArchived(false)}
                className="h-9 px-3 rounded-lg border text-xs transition-all flex items-center gap-1.5 bg-secondary border-border/50 text-foreground hover:bg-secondary/80"
              >
                <ArchiveRestore className="h-3.5 w-3.5" />
                ← Voltar aos Leads Ativos
              </button>
            ) : (
              <button
                onClick={() => setShowArchived(true)}
                className="h-9 px-3 rounded-lg border border-border/50 text-xs transition-all flex items-center gap-1.5 bg-secondary text-muted-foreground hover:text-foreground"
              >
                <Archive className="h-3.5 w-3.5" />
                Arquivados{archivedCount > 0 ? ` (${archivedCount})` : ""}
              </button>
            )}
            <button
              onClick={fetchLeads}
              className="h-9 px-3 rounded-lg bg-secondary border border-border/50 text-xs text-muted-foreground hover:text-foreground transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Atualizar
            </button>
            <button
              onClick={exportCSV}
              className="h-9 px-4 rounded-lg bg-gradient-gold-deep text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <Download className="h-3.5 w-3.5" /> Exportar CSV
            </button>
          </div>
        </div>

        {/* Count */}
        <p className="text-xs text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "lead" : "leads"} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Leads list */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-gold" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nenhum lead encontrado</p>
          </div>
        ) : (
          <>
            {/* Mobile: Card layout */}
            <div className="md:hidden space-y-3">
              {filtered.map((lead, i) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.4) }}
                  className={`rounded-xl border border-border/50 bg-card p-4 space-y-3 cursor-pointer active:scale-[0.98] transition-all ${expandedLead === lead.id ? "border-gold/30" : ""}`}
                  onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                >
                  {/* Top: name + badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-foreground text-sm truncate">{lead.name}</p>
                        <p className="text-[11px] text-muted-foreground truncate mt-0.5">{lead.email}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`shrink-0 inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold border ${diagnosticColors[lead.diagnostic_title] || "bg-secondary text-foreground border-border"}`}>
                          {lead.diagnostic_title}
                        </span>
                        <ChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${expandedLead === lead.id ? "rotate-180 text-gold" : "text-muted-foreground/40"}`} />
                      </div>
                    </div>
                  {/* Bottom: score + phone + date */}
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-10 h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full bg-gradient-gold rounded-full" style={{ width: `${(lead.total_score / 32) * 100}%` }} />
                        </div>
                        <span className="font-mono font-bold text-foreground text-xs">{lead.total_score}/32</span>
                      </div>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {lead.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-muted-foreground">{formatDate(lead.created_at)}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button onClick={(e) => e.stopPropagation()} className="ml-auto p-1.5 rounded-lg hover:bg-secondary text-muted-foreground/50 hover:text-foreground transition-colors">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          {!lead.archived_at ? (
                            <DropdownMenuItem onClick={(e) => { archiveLead(lead.id, e as any); }}>
                              <Archive className="h-3.5 w-3.5 mr-2" /> Arquivar
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={(e) => { restoreLead(lead.id, e as any); }}>
                              <ArchiveRestore className="h-3.5 w-3.5 mr-2" /> Restaurar
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(lead.id); }} className="text-destructive focus:text-destructive">
                            <Trash2 className="h-3.5 w-3.5 mr-2" /> Excluir definitivamente
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  {/* Expanded: strategy panel inline */}
                  <AnimatePresence>
                    {expandedLead === lead.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 border-t border-border/30">
                          <LeadDetailPanel
                            name={lead.name}
                            score={lead.total_score}
                            diagnostic={lead.diagnostic_title}
                            onClose={() => setExpandedLead(null)}
                            mobile
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Desktop: Table layout */}
            <div className="hidden md:block rounded-xl border border-border/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-secondary/50 border-b border-border/50">
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                        <button onClick={() => toggleSort("name")} className="flex items-center gap-1 hover:text-foreground transition-colors">
                          <Mail className="h-3 w-3" /> Nome / Contato <SortIcon col="name" />
                        </button>
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <button onClick={() => toggleSort("total_score")} className="flex items-center gap-1 hover:text-foreground transition-colors">
                            <BarChart3 className="h-3 w-3" /> Score <SortIcon col="total_score" />
                          </button>
                          <InfoPopover><ScoreInfoContent /></InfoPopover>
                        </div>
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <button onClick={() => toggleSort("diagnostic_title")} className="flex items-center gap-1 hover:text-foreground transition-colors">
                            <Award className="h-3 w-3" /> Diagnóstico <SortIcon col="diagnostic_title" />
                          </button>
                          <InfoPopover><DiagnosticInfoContent /></InfoPopover>
                        </div>
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground">
                        <button onClick={() => toggleSort("created_at")} className="flex items-center gap-1 hover:text-foreground transition-colors">
                          <Calendar className="h-3 w-3" /> Data <SortIcon col="created_at" />
                        </button>
                      </th>
                      <th className="text-right px-4 py-3 font-semibold text-muted-foreground text-[10px]">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((lead, i) => (
                      <React.Fragment key={lead.id}>
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: Math.min(i * 0.02, 0.5) }}
                          className={`border-b border-border/30 hover:bg-secondary/30 transition-colors cursor-pointer ${expandedLead === lead.id ? "bg-secondary/20" : ""}`}
                          onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}
                        >
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-semibold text-foreground text-sm">{lead.name}</p>
                              <p className="text-muted-foreground flex items-center gap-1 mt-0.5">
                                <Mail className="h-3 w-3" /> {lead.email}
                              </p>
                              <p className="text-muted-foreground flex items-center gap-1 mt-0.5">
                                <Phone className="h-3 w-3" /> {lead.country_code} {lead.phone}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-1.5 rounded-full bg-secondary overflow-hidden">
                                <div
                                  className="h-full bg-gradient-gold rounded-full"
                                  style={{ width: `${(lead.total_score / 32) * 100}%` }}
                                />
                              </div>
                              <span className="font-mono font-bold text-foreground">{lead.total_score}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold border ${diagnosticColors[lead.diagnostic_title] || "bg-secondary text-foreground border-border"}`}>
                                {lead.diagnostic_title}
                              </span>
                              <Eye className={`h-3.5 w-3.5 transition-colors ${expandedLead === lead.id ? "text-gold" : "text-muted-foreground/30"}`} />
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <p className="text-foreground/80">{formatDate(lead.created_at)}</p>
                              <p className="text-muted-foreground flex items-center gap-1 mt-0.5">
                                <Clock className="h-3 w-3" /> {formatTime(lead.created_at)}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button onClick={(e) => e.stopPropagation()} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground/40 hover:text-foreground transition-colors">
                                    <MoreVertical className="h-4 w-4" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-44">
                                  {!lead.archived_at ? (
                                    <DropdownMenuItem onClick={(e) => { archiveLead(lead.id, e as any); }}>
                                      <Archive className="h-3.5 w-3.5 mr-2" /> Arquivar
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem onClick={(e) => { restoreLead(lead.id, e as any); }}>
                                      <ArchiveRestore className="h-3.5 w-3.5 mr-2" /> Restaurar
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(lead.id); }} className="text-destructive focus:text-destructive">
                                    <Trash2 className="h-3.5 w-3.5 mr-2" /> Excluir definitivamente
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </motion.tr>
                        <AnimatePresence>
                          {expandedLead === lead.id && (
                            <LeadDetailPanel
                              name={lead.name}
                              score={lead.total_score}
                              diagnostic={lead.diagnostic_title}
                              onClose={() => setExpandedLead(null)}
                            />
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
      ) : activeTab === "team" ? (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <InviteAdminPanel />
      </main>
      ) : (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <MapaContent />
      </main>
      )}
      {/* Footer */}
      <div className={lightMode ? "admin-light" : ""}>
        <D7Footer />
      </div>

      {/* Global delete confirmation dialog */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={(open) => { if (!open) setDeleteConfirmId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir permanentemente?</AlertDialogTitle>
            <AlertDialogDescription>
              O lead "{leads.find(l => l.id === deleteConfirmId)?.name}" será removido de forma definitiva. Essa ação não pode ser desfeita.
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

const StatCard = ({
  icon: Icon,
  label,
  value,
  accent,
  small,
  hint,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  accent?: boolean;
  small?: boolean;
  hint?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className={`rounded-xl border p-4 ${accent ? "border-gold/30 bg-gold/5" : "border-border/50 bg-card"}`}
  >
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-2 min-w-0">
        <Icon className={`h-4 w-4 shrink-0 ${accent ? "text-gold" : "text-muted-foreground"}`} />
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground truncate">{label}</span>
      </div>
      {hint && (
        <Popover>
          <PopoverTrigger asChild>
            <button className="shrink-0 ml-1">
              <Info className="h-3.5 w-3.5 text-muted-foreground/40" />
            </button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="end" className="w-52 p-3">
            <p className="text-[11px] text-popover-foreground leading-relaxed">{hint}</p>
          </PopoverContent>
        </Popover>
      )}
    </div>
    <p className={`font-black ${small ? "text-sm leading-tight" : "text-2xl"} ${accent ? "text-gold" : "text-foreground"}`}>
      {value}
    </p>
  </motion.div>
);

export default AdminDashboard;
