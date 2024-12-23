import { Link } from "@remix-run/react";
import { useTheme } from "../ThemeProvider";

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  type?: "button" | "submit" | "reset";
  external?: boolean;
}

export function Button({
  children,
  to,
  type = "button",
  external,
}: ButtonProps) {
  const theme = useTheme();

  const className = `inline-flex items-center justify-center rounded-md px-6 py-3 text-lg font-semibold ${theme.bgInverse} ${theme.textInverse} hover:opacity-90 transition-opacity`;

  if (to) {
    if (external) {
      return (
        <a
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      );
    }
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
}
