interface IvoLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  light?: boolean;
}

const IvoLogo = ({ className = "", size = "md", light = false }: IvoLogoProps) => {
  const sizeClasses = {
    sm: "text-sm tracking-[0.35em]",
    md: "text-lg tracking-[0.4em]",
    lg: "text-2xl tracking-[0.45em]",
  };

  return (
    <span
      className={`font-copperplate font-bold uppercase leading-none ${sizeClasses[size]} ${
        light ? "text-foreground" : "text-gold"
      } ${className}`}
    >
      IVO BRASIL
    </span>
  );
};

export default IvoLogo;
