import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
}

const BackButton = ({ to = "/", label = "Início", className = "" }: BackButtonProps) => (
  <Link
    to={to}
    className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-saffron transition-colors hover:text-cream ${className}`}
  >
    <ArrowLeft className="h-3.5 w-3.5" />
    {label}
  </Link>
);

export default BackButton;
