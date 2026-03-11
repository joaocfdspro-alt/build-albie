import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, Loader2, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function InviteAdminPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("invite-admin", {
        body: { email, password, full_name: fullName },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setResult({ success: true, message: `Admin ${email} criado com sucesso!` });
      setEmail("");
      setPassword("");
      setFullName("");
    } catch (err: any) {
      setResult({ success: false, message: err.message || "Erro ao convidar admin." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border/50 bg-card p-6 max-w-md"
    >
      <div className="flex items-center gap-2 mb-4">
        <UserPlus className="h-5 w-5 text-gold" />
        <h2 className="text-sm font-bold text-foreground">Convidar Administrador</h2>
      </div>
      <p className="text-xs text-muted-foreground mb-5">
        Crie credenciais para um novo administrador acessar o painel.
      </p>

      <form onSubmit={handleInvite} className="space-y-3">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nome completo"
            className="w-full h-10 rounded-lg bg-secondary border border-border/50 pl-10 pr-3 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/40 transition-all"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail do novo admin"
            required
            className="w-full h-10 rounded-lg bg-secondary border border-border/50 pl-10 pr-3 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/40 transition-all"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha temporária"
            required
            minLength={6}
            className="w-full h-10 rounded-lg bg-secondary border border-border/50 pl-10 pr-3 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/40 transition-all"
          />
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg border ${
              result.success
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-destructive/10 text-destructive border-destructive/20"
            }`}
          >
            {result.success ? <CheckCircle className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
            {result.message}
          </motion.div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 rounded-lg bg-gradient-gold-deep text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><UserPlus className="h-3.5 w-3.5" /> Criar Admin</>}
        </button>
      </form>
    </motion.div>
  );
}
