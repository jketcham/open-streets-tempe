import { type ReactNode } from "react";

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
  return (
    <div className="rounded-2xl bg-white p-8 shadow-[0_2px_20px_rgba(0,0,0,0.08)]">
      <div className="mb-6 flex items-start gap-4">
        {icon && <div className="mt-1 text-current">{icon}</div>}
        <div>
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-4 text-lg text-gray-600">{description}</p>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="font-semibold text-gray-900">Key Responsibilities:</h4>
        <ul className="mt-4 space-y-3 text-gray-600">
          {responsibilities.map((responsibility, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-current" />
              <span>{responsibility}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
