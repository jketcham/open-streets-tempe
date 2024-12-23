import { useTheme } from "./ThemeProvider";

interface ContentCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  subtitle?: string;
  meta?: React.ReactNode;
}

export function ContentCard({
  title,
  description,
  icon,
  subtitle,
  meta,
}: ContentCardProps) {
  const theme = useTheme();

  return (
    <div className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-[0_2px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      {icon && <div className={`mb-4 ${theme.text}`}>{icon}</div>}
      <h3 className={`mb-2 text-2xl font-bold ${theme.text}`}>{title}</h3>
      {subtitle && (
        <p className="mb-2 text-[1.25rem] leading-relaxed text-gray-600">
          {subtitle}
        </p>
      )}
      {meta && <div className="mb-2">{meta}</div>}
      <p className="text-[1.25rem] leading-relaxed text-gray-600">
        {description}
      </p>
    </div>
  );
}
