import { Link } from "@remix-run/react";
import { useTheme } from "../ThemeProvider";

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  to,
  href,
  type = "button",
  onClick,
  className = "",
}: ButtonProps) {
  const theme = useTheme();
  const baseClasses = `inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold ${theme.bg} ${theme.textOnLight} transition-transform hover:scale-105 ${className}`;

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}
