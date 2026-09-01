import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Trajetoria from "./pages/Trajetoria";
import Servicos from "./pages/Servicos";
import Artigos from "./pages/Artigos";
import Contato from "./pages/Contato";
import Inspiracoes from "./pages/Inspiracoes";
import ViagemCoteDIvoire from "./pages/ViagemCoteDIvoire";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const DeepApp = lazy(() => import("./deep/DeepApp"));

const AppRoutes = () => {
  const { pathname } = useLocation();
  const isDipRoute = pathname === "/dip" || pathname === "/deep" || pathname === "/cote-conecta";

  if (isDipRoute) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#faf6ef]" aria-label="Loading DIP" />}>
        <DeepApp />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-maroon md:bg-[#080505]">
      <div className="relative mx-auto min-h-screen w-full bg-background shadow-none md:max-w-[430px] md:overflow-hidden md:rounded-b-[2rem] md:shadow-2xl md:ring-1 md:ring-cream/10">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/trajetoria" element={<Trajetoria />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/artigos" element={<Artigos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/inspiracoes" element={<Inspiracoes />} />
          <Route path="/cote-divoire" element={<ViagemCoteDIvoire />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
