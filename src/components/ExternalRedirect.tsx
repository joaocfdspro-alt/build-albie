import { useEffect } from "react";

interface ExternalRedirectProps {
  to: string;
}

const ExternalRedirect = ({ to }: ExternalRedirectProps) => {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 text-center">
      <p className="text-sm text-muted-foreground">
        Redirecionando...{" "}
        <a
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold underline"
        >
          Clique aqui se não abrir automaticamente
        </a>
      </p>
    </div>
  );
};

export default ExternalRedirect;