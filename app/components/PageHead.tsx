import type { ReactNode } from "react";
import { useTheme } from "./ThemeProvider";
import { Container } from "./Container";

interface PageHeadProps {
  title: string;
  children: ReactNode;
}

export function PageHead({ title, children }: PageHeadProps) {
  const theme = useTheme();

  return (
    <div className={`${theme.bg} py-16 sm:py-24`}>
      <Container>
        <h1
          className={`mb-8 text-4xl font-bold ${theme.textOnLight} sm:text-5xl`}
        >
          {title}
        </h1>
        <div className="prose prose-lg prose-invert max-w-none">{children}</div>
      </Container>
    </div>
  );
}
