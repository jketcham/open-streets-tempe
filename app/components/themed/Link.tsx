import { Link as RemixLink } from "@remix-run/react";
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
      <RemixLink to={to} className={baseClasses}>
        {children}
      </RemixLink>
    );
  }

  return (
    <a href={href} className={baseClasses}>
      {children}
    </a>
  );
}
