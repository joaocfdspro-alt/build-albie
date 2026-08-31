import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Trajetoria from "./pages/Trajetoria";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/trajetoria" element={<Trajetoria />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
