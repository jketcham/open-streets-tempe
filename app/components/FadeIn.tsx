import type { ReactNode } from "react";
import { motion } from "motion/react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
}

export function FadeIn({ children, className = "" }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
