import logo from "@/assets/nguma-logo.png";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/albieman.nguma/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm9.25 3.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Albienguma",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M19.73 5.27c.69.18 1.23.72 1.41 1.41C21.6 8.4 22 12 22 12s-.4 3.6-1.86 5.32a1.75 1.75 0 0 1-1.41.86c-2.18.2-8.73.2-8.73.2s-6.55 0-8.73-.2a1.75 1.75 0 0 1-1.41-.86C3.4 15.6 3 12 3 12s.4-3.6 1.86-5.32a1.75 1.75 0 0 1 1.41-.86C8.45 5.12 15 5.12 15 5.12s6.55 0 8.73.15Zm-4.48 6.73-5.8 3.32V8.68l5.8 3.32Z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5511976480548",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M17.47 13.46c-.23-.12-1.35-.66-1.56-.74-.21-.08-.37-.12-.53.12-.16.23-.61.74-.75.89-.14.15-.28.17-.51.06-.23-.12-.97-.36-1.85-1.14-.68-.61-1.14-1.36-1.27-1.59-.14-.23-.01-.36.1-.47.11-.11.23-.28.35-.42.12-.14.16-.23.24-.38.08-.16.04-.29-.02-.41-.06-.12-.53-1.28-.73-1.75-.19-.45-.39-.39-.53-.4l-.45-.01c-.16 0-.41.06-.62.29-.21.23-.81.79-.81 1.93s.83 2.24.95 2.4c.12.16 1.63 2.49 3.95 3.49.55.24.98.38 1.32.49.55.17 1.06.15 1.46.09.45-.06 1.35-.55 1.54-1.08.19-.53.19-.98.13-1.08-.05-.09-.18-.15-.4-.26ZM12 2.25A9.75 9.75 0 0 0 5.02 17.39l-.77 2.8 2.87-.76A9.73 9.73 0 1 0 12 2.25Zm0 17.75c-1.37 0-2.72-.29-3.97-.84l-.28-.13-1.18.31.79-2.9-.19-.33A8.25 8.25 0 1 1 20.25 12 8.26 8.26 0 0 1 12 20Z" />
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
