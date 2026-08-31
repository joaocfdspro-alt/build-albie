import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/nguma-logo.png.asset.json";

const links = [
  { label: "Trajetória", href: "#trajetoria" },
  { label: "Serviços", href: "#servicos" },
  { label: "Artigos", href: "#artigos" },
  { label: "Contato", href: "#contato" },
];

const SiteNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#topo" className="flex items-center gap-3" aria-label="Albie Nguma — início">
          <img src={logo.url} alt="Albie Nguma" className="h-6 w-auto md:h-7" />
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

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden rounded-lg p-2 text-foreground"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-5 pb-6 pt-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-foreground/85 hover:bg-muted"
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
            className="mt-3 block rounded-full bg-gradient-sun px-5 py-3 text-center text-sm font-bold text-maroon"
          >
            Trabalhe comigo
          </a>
        </div>
      )}
    </header>
  );
};

export default SiteNav;
