import logo from "@/assets/nguma-logo.png";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/albieman.nguma/" },
  { label: "YouTube", href: "https://www.youtube.com/@Albienguma" },
  { label: "WhatsApp", href: "https://wa.me/5511976480548" },
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
                className="text-sm font-medium text-cream/75 transition-colors hover:text-saffron"
              >
                {s.label}
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
