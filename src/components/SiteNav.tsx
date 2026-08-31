const links = [
  { label: "Trajetória", href: "/trajetoria" },
  { label: "Serviços", href: "/servicos" },
  { label: "Na mídia", href: "/artigos" },
];

const SiteNav = () => (
  <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
    <nav className="mx-auto flex max-w-6xl items-center justify-end px-5 py-4">
      <ul className="hidden items-center gap-8 md:flex">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="relative text-sm font-medium text-cream/80 transition-colors hover:text-cream after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-saffron after:transition-all hover:after:w-full"
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
        className="ml-8 hidden rounded-full bg-gradient-sun px-5 py-2.5 text-sm font-bold text-maroon shadow-earth transition-transform hover:scale-105 md:inline-block"
      >
        Trabalhe comigo
      </a>
    </nav>
  </header>
);

export default SiteNav;
