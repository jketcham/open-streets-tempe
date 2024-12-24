import type { ReactNode } from "react";
import { useTheme } from "./ThemeProvider";
import { Container } from "./Container";
import { motion } from "motion/react";

interface PageHeadProps {
  title: string;
  children: ReactNode;
}

export function PageHead({ title, children }: PageHeadProps) {
  const theme = useTheme();

  return (
    <div className={`${theme.bg} py-16 sm:py-24`}>
      <Container>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`mb-8 text-4xl font-bold ${theme.textOnLight} sm:text-5xl`}
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="prose prose-lg prose-invert max-w-4xl"
        >
          {children}
        </motion.div>
      </Container>
    </div>
  );
}
