interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const sizeMap = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
  full: "max-w-none",
} as const;

export function Container({
  children,
  className = "",
  size = "2xl",
}: ContainerProps) {
  return (
    <div className={`mx-auto ${sizeMap[size]} px-6 sm:px-10 ${className}`}>
      {children}
    </div>
  );
}
