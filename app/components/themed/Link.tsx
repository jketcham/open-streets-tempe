import { Link as RouterLink } from "react-router";
import { useTheme } from "~/components/ThemeProvider";

interface LinkProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  className?: string;
}

export function Link({ children, to, href, className = "" }: LinkProps) {
  const theme = useTheme();

  const baseClasses = `inline-block ${theme.text} hover:underline ${className}`;

  if (to) {
    return (
      <RouterLink to={to} className={baseClasses}>
        {children}
      </RouterLink>
    );
  }

  return (
    <a href={href} className={baseClasses}>
      {children}
    </a>
  );
}
