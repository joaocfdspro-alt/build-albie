const D7Footer = () => (
  <footer className="border-t border-border/50 py-6">
    <div className="flex flex-col items-center gap-2">
      <p className="text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Maria Marcelino
      </p>
      <a
        href="https://www.d7company.com.br/build"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] text-muted-foreground hover:text-foreground/70 transition-colors"
      >
        Criado por D7Company
      </a>
    </div>
  </footer>
);

export default D7Footer;
