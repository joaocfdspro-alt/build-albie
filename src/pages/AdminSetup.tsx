import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import IvoLogo from "@/components/IvoLogo";

const AdminSetup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setupKey, setSetupKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("setup-first-admin", { body: { email, password, setup_key: setupKey } });
      if (fnError || data?.error) { setError(data?.error || fnError?.message || "Erro ao criar admin"); setLoading(false); return; }
      setSuccess(true); setLoading(false);
    } catch { setError("Erro de conexão"); setLoading(false); }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-sm">
          <CheckCircle className="h-12 w-12 text-gold mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Admin criado com sucesso!</h2>
          <p className="text-sm text-muted-foreground mb-6">Agora você pode fazer login.</p>
          <button onClick={() => navigate("/admin/login")} className="h-12 px-6 rounded-lg bg-gradient-gold-deep text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity">Ir para o Login</button>
        </motion.div>
        <p className="mt-8 text-[10px] text-muted-foreground/30">
          <a href="https://www.d7company.com.br/tech" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground transition-colors">Desenvolvido por D7 Company</a>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mb-6 flex justify-center"><IvoLogo size="lg" /></div>
          <h1 className="text-xl font-bold text-foreground">Configuração Inicial</h1>
          <p className="text-sm text-muted-foreground mt-1">Crie o primeiro administrador</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">Chave de Setup</label><input type="password" value={setupKey} onChange={(e) => setSetupKey(e.target.value)} className="w-full h-12 rounded-lg bg-card border border-border px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 focus:shadow-gold transition-all" placeholder="Chave fornecida pelo desenvolvedor" required /></div>
          <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">E-mail do Admin</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-12 rounded-lg bg-card border border-border px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 focus:shadow-gold transition-all" placeholder="admin@email.com" required /></div>
          <div><label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">Senha</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-12 rounded-lg bg-card border border-border px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 focus:shadow-gold transition-all" placeholder="Mínimo 6 caracteres" required minLength={6} /></div>
          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">{error}</motion.p>}
          <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.97 }} className="w-full h-12 rounded-lg bg-gradient-gold-deep text-primary-foreground font-bold text-sm shadow-gold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><UserPlus className="h-4 w-4" />Criar Administrador</>}
          </motion.button>
        </form>
        <button onClick={() => navigate("/admin/login")} className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1"><ArrowLeft className="h-3 w-3" /> Já tenho uma conta</button>
      </motion.div>
      <p className="mt-8 text-[10px] text-muted-foreground/30">
        <a href="https://www.d7company.com.br/tech" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground transition-colors">Desenvolvido por D7 Company</a>
      </p>
    </div>
  );
};

export default AdminSetup;
