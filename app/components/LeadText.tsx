import { useTheme } from "./ThemeProvider";

interface LeadTextProps {
  children: React.ReactNode;
  className?: string;
}

export function LeadText({ children, className = "" }: LeadTextProps) {
  const theme = useTheme();

  return (
    <p className={`mb-8 text-xl sm:text-2xl ${theme.textOnLight} ${className}`}>
      {children}
    </p>
  );
}
