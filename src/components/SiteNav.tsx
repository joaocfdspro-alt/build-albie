import { useEffect, useState } from "react";


const links = [
  { label: "Trajetória", href: "/trajetoria" },
  { label: "Serviços", href: "/servicos" },
  { label: "Na mídia", href: "/artigos" },
];

const SiteNav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/92 backdrop-blur-md border-b border-border shadow-earth" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center px-5 py-4 md:justify-between">
        <a
          href="/"
          className="mx-auto font-display text-xl tracking-[0.18em] text-cream md:mx-0 md:text-2xl"
          aria-label="Albie Nguma — início"
        >
          NGUMA
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-sm font-medium text-foreground/80 transition-colors hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-saffron after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://wa.me/5511976480548"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-gradient-sun px-5 py-2.5 text-sm font-bold text-maroon shadow-earth transition-transform hover:scale-105 md:inline-block"
        >
          Trabalhe comigo
        </a>
      </nav>
    </header>
  );
};

export default SiteNav;
