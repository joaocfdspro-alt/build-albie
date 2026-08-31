import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
}

// Helper component for navigation links
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-terracotta"
  >
    {children}
  </a>
);

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-foreground/70 transition-all hover:border-saffron hover:bg-saffron hover:text-maroon"
  >
    <Icon className="h-4 w-4" />
  </a>
);

// The main reusable Hero Section component
export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  return (
    <section
      className={cn(
        "relative flex min-h-screen flex-col overflow-hidden bg-background",
        className
      )}
    >
      <div className="pattern-dots pointer-events-none absolute inset-0 opacity-60" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 md:px-10"
      >
        <span className="font-display text-2xl tracking-tight text-foreground">
          {logoText}
        </span>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <a
          href={readMoreLink}
          className="hidden items-center gap-2 rounded-full bg-gradient-sun px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-maroon shadow-earth transition-transform hover:scale-105 md:inline-flex"
        >
          Contato <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </motion.header>

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-5 py-10 md:grid-cols-[1fr_auto_1fr] md:px-10">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md"
        >
          <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground md:text-lg">
            {mainText}
          </p>

          <a
            href={readMoreLink}
            className="group mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-terracotta"
          >
            Saiba mais
            <span className="h-px w-10 bg-terracotta transition-all group-hover:w-14" />
          </a>
        </motion.div>

        {/* Center Image with Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto"
        >
          <div className="absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-saffron/40" />
          <div className="absolute left-1/2 top-1/2 h-[104%] w-[104%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron/20 blur-md" />
          <img
            src={imageSrc}
            alt={imageAlt}
            className="relative h-[320px] w-[260px] rounded-full object-cover shadow-earth md:h-[460px] md:w-[360px]"
            loading="eager"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://placehold.co/400x600/F5A310/2C0A10?text=Albie+Nguma";
            }}
          />
        </motion.div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-center md:text-right"
        >
          <h1 className="font-display text-5xl leading-[0.95] text-foreground md:text-7xl">
            {overlayText.part1}
            <br />
            <span className="text-gradient-sun">{overlayText.part2}</span>
          </h1>
        </motion.div>
      </div>

      {/* Footer Elements */}
      <motion.footer
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-5 pb-8 md:flex-row md:px-10"
      >
        <div className="flex items-center gap-3">
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {locationText}
        </p>
      </motion.footer>
    </section>
  );
};

export default MinimalistHero;
