import IvoLogo from "@/components/IvoLogo";

const D7Footer = () => (
  <footer className="border-t border-border/50 py-6">
    <div className="flex flex-col items-center gap-3">
      <IvoLogo size="footer" variant="icon" />
      <p className="text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Ivo Brasil
      </p>
      <a
        href="https://www.d7company.com.br/build"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] text-muted-foreground hover:text-foreground/70 transition-colors"
      >
        Desenvolvido por D7 Company
      </a>
    </div>
  </footer>
);

export default D7Footer;
