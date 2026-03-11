import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Aulao from "./pages/Aulao";
import LiberteSuaVoz from "./pages/LiberteSuaVoz";
import LinkPendente from "./pages/LinkPendente";
import SuaPrimeiraPalestra from "./pages/SuaPrimeiraPalestra";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSetup from "./pages/AdminSetup";
import NotFound from "./pages/NotFound";
import MapaDoProjeto from "./pages/MapaDoProjeto";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/aulao" element={<Aulao />} />
          <Route path="/liberte-sua-voz" element={<LiberteSuaVoz />} />
          <Route path="/sua-primeira-palestra" element={<SuaPrimeiraPalestra />} />
          <Route path="/link-pendente" element={<LinkPendente />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/setup" element={<AdminSetup />} />
          <Route path="/mapa" element={<MapaDoProjeto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
