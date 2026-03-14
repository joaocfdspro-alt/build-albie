import { Link } from "react-router-dom";
import logoHrzDark from "@/assets/logo-hrz-dark.png";
import logoIcoDark from "@/assets/logo-ico-dark.png";

interface IvoLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "footer";
  variant?: "horizontal" | "icon";
  linkTo?: string | false;
}

const IvoLogo = ({ className = "", size = "md", variant = "horizontal", linkTo = "/" }: IvoLogoProps) => {
  const sizeMap = {
    horizontal: { sm: "h-6", md: "h-8", lg: "h-12", xl: "h-16", footer: "h-10" },
    icon: { sm: "h-7", md: "h-10", lg: "h-14", xl: "h-18", footer: "h-10" },
  };

  const src = variant === "icon" ? logoIcoDark : logoHrzDark;
  const alt = "Ivo Brasil — O Negociador";

  const img = (
    <img
      src={src}
      alt={alt}
      className={`${sizeMap[variant][size]} w-auto object-contain ${className}`}
    />
  );

  if (linkTo === false) return img;

  return (
    <Link to={linkTo} className="inline-block">
      {img}
    </Link>
  );
};

export default IvoLogo;
