import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import QuizFlow from "@/components/QuizFlow";

const Quiz = () => {
  return (
    <div className="relative">
      <div className="fixed top-4 left-4 z-50">
        <motion.div whileTap={{ scale: 0.85 }} transition={{ duration: 0.1 }}>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors bg-card/80 backdrop-blur-sm px-3 py-2 rounded-sm border border-border/30 active:bg-card"
          >
            <ArrowLeft className="h-3 w-3" /> Voltar
          </Link>
        </motion.div>
      </div>
      <QuizFlow />
    </div>
  );
};

export default Quiz;
