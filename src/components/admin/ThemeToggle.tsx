import { Sun, Moon } from "lucide-react";
import { useState } from "react";

interface ThemeToggleProps {
  light: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ light, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
      title={light ? "Modo escuro" : "Modo claro"}
    >
      {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
