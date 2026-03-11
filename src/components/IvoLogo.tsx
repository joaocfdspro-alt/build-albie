import logoHrzDark from "@/assets/logo-hrz-dark.png";
import logoIcoDark from "@/assets/logo-ico-dark.png";

interface IvoLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "horizontal" | "icon";
}

const IvoLogo = ({ className = "", size = "md", variant = "horizontal" }: IvoLogoProps) => {
  const sizeMap = {
    horizontal: { sm: "h-5", md: "h-7", lg: "h-10" },
    icon: { sm: "h-6", md: "h-9", lg: "h-14" },
  };

  const src = variant === "icon" ? logoIcoDark : logoHrzDark;
  const alt = "Ivo Brasil — O Negociador";

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeMap[variant][size]} w-auto object-contain ${className}`}
    />
  );
};

export default IvoLogo;
