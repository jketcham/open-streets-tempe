import { useTheme } from "./ThemeProvider";

interface ThemedListProps {
  items: string[];
  className?: string;
}

export function ThemedList({ items, className = "" }: ThemedListProps) {
  const theme = useTheme();

  return (
    <ul
      className={`not-prose pl-5 list-disc marker:${theme.text} ${className}`}
    >
      {items.map((item) => (
        <li key={item} className="my-2">
          {item}
        </li>
      ))}
    </ul>
  );
}
