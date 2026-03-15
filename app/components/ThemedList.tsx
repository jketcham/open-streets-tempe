import { useTheme } from "./ThemeProvider";

interface ThemedListProps {
  items: string[];
  className?: string;
}

export function ThemedList({ items, className = "" }: ThemedListProps) {
  const theme = useTheme();

  return (
    <ul
      className={`not-prose marker: list-disc pl-5${theme.text} ${className}`}
    >
      {items.map((item) => (
        <li key={item} className="my-2">
          {item}
        </li>
      ))}
    </ul>
  );
}
