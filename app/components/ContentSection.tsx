import type { ReactNode } from "react";
import { useTheme } from "./ThemeProvider";

interface ContentSectionProps {
  title: string;
  id?: string;
  children: ReactNode;
}

export function ContentSection({ title, id, children }: ContentSectionProps) {
  const theme = useTheme();

  return (
    <section className="mt-12 space-y-4" id={id}>
      <h2 className={`text-3xl font-bold ${theme.text}`}>{title}</h2>
      {children}
    </section>
  );
}
