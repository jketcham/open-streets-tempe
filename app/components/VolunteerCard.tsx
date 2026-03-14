import { type ReactNode } from "react";
import { useTheme } from "./ThemeProvider";

interface VolunteerCardProps {
  title: string;
  description: string;
  responsibilities: string[];
  shifts?: { name: string; start: string; end: string }[];
  note?: string;
  icon?: ReactNode;
}

export function VolunteerCard({
  title,
  description,
  responsibilities,
  shifts,
  note,
  icon,
}: VolunteerCardProps) {
  const theme = useTheme();

  return (
    <div className="rounded-2xl bg-white p-8 shadow-[0_2px_20px_rgba(0,0,0,0.08)]">
      <div className="mb-6 flex items-center gap-4">
        {icon && <div className={`${theme.text}`}>{icon}</div>}
        <div>
          <h3 className={`text-2xl font-semibold ${theme.text}`}>{title}</h3>
          {shifts && shifts.length > 0 && (
            <p className="mt-1 text-sm font-medium text-gray-500">
              {shifts.map((shift, i) => (
                <span key={shift.name}>
                  {i > 0 && " \u00B7 "}
                  {shifts.length > 1 && `${shift.name}: `}
                  {shift.start} &ndash; {shift.end}
                </span>
              ))}
            </p>
          )}
          <p className="mt-4 text-lg text-gray-600">{description}</p>
          {note && (
            <p className="mt-2 text-sm italic text-gray-500">{note}</p>
          )}
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
