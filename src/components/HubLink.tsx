import { motion } from "framer-motion";
import { LucideIcon, ArrowUpRight } from "lucide-react";

interface HubLinkProps {
  icon?: LucideIcon;
  iconSrc?: string;
  title: string;
  subtitle: string;
  href: string;
  variant?: "primary" | "secondary" | "highlight";
  index: number;
  isInternal?: boolean;
  onClick?: () => void;
  tag?: string;
}

const HubLink = ({ icon: Icon, iconSrc, title, subtitle, href, variant = "secondary", index, isInternal, onClick, tag }: HubLinkProps) => {
  const isPrimary = variant === "primary";
  const isHighlight = variant === "highlight";

  const baseClasses = "group block w-full rounded-2xl p-5 transition-all duration-500 cursor-pointer relative overflow-hidden";

  const variantClasses = isPrimary
    ? "bg-gradient-gold-deep text-primary-foreground shadow-gold-intense hover:shadow-gold-intense hover:scale-[1.02]"
    : isHighlight
    ? "bg-card border border-gold/20 text-foreground hover:border-gold/40 glow-gold hover:scale-[1.01]"
    : "bg-secondary/60 backdrop-blur-sm border border-border/50 text-secondary-foreground hover:border-muted-foreground/30 hover:bg-secondary/80 hover:scale-[1.01]";

  const Component = isInternal ? "div" : "a";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Component
        href={isInternal ? undefined : href}
        target={isInternal ? undefined : "_blank"}
        rel={isInternal ? undefined : "noopener noreferrer"}
        onClick={onClick}
        className={`${baseClasses} ${variantClasses}`}
      >
        {isPrimary && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        )}
        
        <div className="flex items-center gap-4 relative z-10">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${isPrimary ? "bg-primary-foreground/15" : "bg-muted/80"}`}>
            {iconSrc ? (
              <img src={iconSrc} alt="" className="h-5 w-5 object-contain" />
            ) : Icon ? (
              <Icon className={`h-5 w-5 ${isPrimary ? "" : "text-gold"}`} />
            ) : null}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="font-bold text-sm tracking-wide leading-tight">{title}</p>
              {tag && (
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${isPrimary ? "bg-primary-foreground/20" : "bg-gold/15 text-gold"}`}>
                  {tag}
                </span>
              )}
            </div>
            <p className={`text-xs mt-1 leading-relaxed ${isPrimary ? "opacity-80" : "text-muted-foreground"}`}>{subtitle}</p>
          </div>
          <ArrowUpRight className={`h-4 w-4 shrink-0 opacity-0 group-hover:opacity-60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isPrimary ? "" : "text-muted-foreground"}`} />
        </div>
      </Component>
    </motion.div>
  );
};

export default HubLink;
