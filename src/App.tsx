import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Trajetoria from "./pages/Trajetoria";
import Servicos from "./pages/Servicos";
import Artigos from "./pages/Artigos";
import Contato from "./pages/Contato";
import ViagemCoteDIvoire from "./pages/ViagemCoteDIvoire";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <ScrollToTop />
      {/* Desktop: simula visão mobile centralizada em um frame escuro */}
      <div className="min-h-screen bg-maroon md:bg-[#080505]">
        <div className="relative mx-auto min-h-screen w-full bg-background shadow-none md:max-w-[430px] md:overflow-hidden md:rounded-b-[2rem] md:shadow-2xl md:ring-1 md:ring-cream/10">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/trajetoria" element={<Trajetoria />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/artigos" element={<Artigos />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/cote-divoire" element={<ViagemCoteDIvoire />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
