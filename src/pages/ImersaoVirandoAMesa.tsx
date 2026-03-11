import { motion } from "framer-motion";
import { ArrowLeft, Send, Flame } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import IvoLogo from "@/components/IvoLogo";
import D7Footer from "@/components/D7Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ImersaoVirandoAMesa = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error("Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("immersion_waitlist").insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });

      if (error) throw error;
      setSubmitted(true);
      toast.success("Inscrição realizada com sucesso!");
    } catch {
      toast.error("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <motion.a href="/" whileTap={{ scale: 0.85 }} transition={{ duration: 0.1 }}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Voltar</span>
          </motion.a>
          <div className="w-px h-5 bg-border/50 hidden sm:block" />
          <a href="/"><IvoLogo size="icon" /></a>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-gold bg-gold/10 px-4 py-1.5 rounded-sm border border-gold/20 mb-8">
            <Flame className="h-3 w-3" />
            Em breve
          </div>

          <h1 className="font-copperplate text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.05] tracking-wide uppercase mb-6">
            Imersão{" "}
            <span className="text-gradient-gold">Virando a Mesa</span>
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-[1px] line-gold origin-center max-w-xs mx-auto mb-6"
          />

          <p className="text-base md:text-lg text-secondary-foreground/80 leading-relaxed max-w-lg mx-auto mb-4">
            A próxima edição da imersão presencial com Ivo Brasil ainda será anunciada.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto mb-12">
            Cadastre-se abaixo para ser o primeiro a saber da data, local e condições especiais de pré-venda.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-gold/20 rounded-lg p-8 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 border border-gold/20 mx-auto mb-4">
              <Send className="h-6 w-6 text-gold" />
            </div>
            <h2 className="font-copperplate text-xl font-bold uppercase tracking-wide mb-2">
              Você está na lista!
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Quando a próxima edição for confirmada, você receberá todas as informações em primeira mão.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="bg-card border border-border/50 rounded-lg p-6 md:p-8 space-y-4"
          >
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Nome completo
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="bg-background border-border/50 h-12"
                required
                maxLength={100}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                E-mail
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="bg-background border-border/50 h-12"
                required
                maxLength={255}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                WhatsApp / Telefone
              </label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="bg-background border-border/50 h-12"
                required
                maxLength={20}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="w-full h-14 text-sm font-bold tracking-wide bg-gradient-gold-deep hover:opacity-90 transition-all duration-300 shadow-gold-intense rounded-lg gap-2 uppercase font-copperplate mt-2"
            >
              {loading ? "Enviando..." : "Quero ser avisado"}
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Button>
            <p className="text-[11px] text-center text-muted-foreground">
              Seus dados estão seguros. Sem spam.
            </p>
          </motion.form>
        )}
      </div>

      <D7Footer />
    </div>
  );
};

export default ImersaoVirandoAMesa;
