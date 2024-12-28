import type { ReactNode } from "react";
import { useTheme } from "./ThemeProvider";
import { FadeIn } from "./FadeIn";

interface ContentSectionProps {
  title: string;
  id?: string;
  children: ReactNode;
}

export function ContentSection({ title, id, children }: ContentSectionProps) {
  const theme = useTheme();

  return (
    <FadeIn>
      <section className="mt-12 space-y-6" id={id}>
        <h2 className={`text-3xl font-bold ${theme.text}`}>{title}</h2>
        {children}
      </section>
    </FadeIn>
  );
}
