import logo from "@/assets/nguma-logo.png";

const iconClass = "h-5 w-5";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/albieman.nguma/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Albienguma",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5511976480548",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path d="M17.47 13.46c-.23-.12-1.35-.66-1.56-.74-.21-.08-.37-.12-.53.12-.16.23-.61.74-.75.89-.14.15-.28.17-.51.06-.23-.12-.97-.36-1.85-1.14-.68-.61-1.14-1.36-1.27-1.59-.14-.23-.01-.36.1-.47.11-.11.23-.28.35-.42.12-.14.16-.23.24-.38.08-.16.04-.29-.02-.41-.06-.12-.53-1.28-.73-1.75-.19-.45-.39-.39-.53-.4l-.45-.01c-.16 0-.41.06-.62.29-.21.23-.81.79-.81 1.93s.83 2.24.95 2.4c.12.16 1.63 2.49 3.95 3.49.55.24.98.38 1.32.49.55.17 1.06.15 1.46.09.45-.06 1.35-.55 1.54-1.08.19-.53.19-.98.13-1.08-.05-.09-.18-.15-.4-.26Z" />
        <path d="M12 2.25A9.75 9.75 0 0 0 5.02 17.39l-.77 2.8 2.87-.76A9.73 9.73 0 1 0 12 2.25Z" />
      </svg>
    ),
  },
];

const SiteFooter = () => (
  <footer className="bg-gradient-earth text-cream">
    <div className="pattern-strip h-2 w-full" />
    <div className="mx-auto max-w-6xl px-5 py-14">
      <div className="flex flex-col items-center gap-8 text-center">
        <img src={logo} alt="Albie Nguma" className="h-8 w-auto brightness-0 invert opacity-90" />
        <p className="font-display text-2xl text-gradient-sun md:text-3xl">ÁFRICA É FUTURO</p>

        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex items-center justify-center rounded-full p-2.5 text-cream/75 transition-colors hover:bg-cream/10 hover:text-saffron"
              >
                {s.icon}
              </a>
            </li>
          ))}
        </ul>

        <div className="h-px w-full max-w-xs bg-cream/15" />

        <p className="text-xs text-cream/60">
          © {new Date().getFullYear()} Albie Nguma · Todos os direitos reservados ·{" "}
          <a
            href="https://www.d7company.com.br/tech"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-saffron"
          >
            Desenvolvido por D7 Company
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
