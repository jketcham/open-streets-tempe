import { useTheme } from "./ThemeProvider";

interface ThemedSectionProps {
  children: React.ReactNode;
  inverse?: boolean;
  className?: string;
}

export function ThemedSection({
  children,
  inverse = false,
  className = "",
}: ThemedSectionProps) {
  const theme = useTheme();

  return (
    <div
      className={`${inverse ? theme.bgInverse : theme.bg} ${
        inverse ? theme.textInverse : theme.text
      } p-6 sm:px-10 sm:py-16 ${className}`}
    >
      {children}
    </div>
  );
}
