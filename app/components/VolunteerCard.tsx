import { type ReactNode } from "react";
import { useTheme } from "./ThemeProvider";

interface VolunteerCardProps {
  title: string;
  description: string;
  responsibilities: string[];
  icon?: ReactNode;
}

export function VolunteerCard({
  title,
  description,
  responsibilities,
  icon,
}: VolunteerCardProps) {
  const theme = useTheme();

  return (
    <div className="rounded-2xl bg-white p-8 shadow-[0_2px_20px_rgba(0,0,0,0.08)]">
      <div className="mb-6 flex items-start gap-4">
        {icon && <div className={`mt-1 ${theme.text}`}>{icon}</div>}
        <div>
          <h3 className={`text-2xl font-semibold ${theme.text}`}>{title}</h3>
          <p className="mt-4 text-lg text-gray-600">{description}</p>
        </div>
      </div>

      <div className="mt-8">
        <h4 className={`font-semibold ${theme.text}`}>Key Responsibilities:</h4>
        <ul className="mt-4 space-y-3 text-gray-600">
          {responsibilities.map((responsibility, index) => (
            <li key={index} className="flex items-start gap-2">
              <span
                className={`mt-2 size-1.5 shrink-0 rounded-full ${theme.bgInverse}`}
              />
              <span>{responsibility}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
