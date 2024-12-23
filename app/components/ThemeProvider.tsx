import { createContext, useContext } from "react";

export type ThemeColor =
  | "tachi"
  | "tachi-dark"
  | "apricot"
  | "apricot-dark"
  | "eggplant"
  | "eggplant-dark";

interface ThemeContextValue {
  bg: string;
  bgInverse: string;
  text: string;
  textOnLight: string;
  textInverse: string;
}

export const themeMap: Record<ThemeColor, ThemeContextValue> = {
  tachi: {
    bg: "bg-tachi",
    bgInverse: "bg-tachi-900",
    text: "text-tachi-600",
    textOnLight: "text-tachi-700",
    textInverse: "text-tachi-200",
  },
  "tachi-dark": {
    bg: "bg-tachi-900",
    bgInverse: "bg-tachi",
    text: "text-tachi-600",
    textOnLight: "text-tachi-200",
    textInverse: "text-tachi-700",
  },
  apricot: {
    bg: "bg-apricot",
    bgInverse: "bg-apricot-900",
    text: "text-apricot-600",
    textOnLight: "text-apricot-700",
    textInverse: "text-apricot-200",
  },
  "apricot-dark": {
    bg: "bg-apricot-900",
    bgInverse: "bg-apricot",
    text: "text-apricot-600",
    textOnLight: "text-apricot-200",
    textInverse: "text-apricot-700",
  },
  eggplant: {
    bg: "bg-eggplant",
    bgInverse: "bg-eggplant-900",
    text: "text-eggplant-600",
    textOnLight: "text-eggplant-900",
    textInverse: "text-eggplant-200",
  },
  "eggplant-dark": {
    bg: "bg-eggplant-900",
    bgInverse: "bg-eggplant",
    text: "text-eggplant-600",
    textOnLight: "text-eggplant-200",
    textInverse: "text-eggplant-900",
  },
};

export function getThemeColor(className: string): string {
  // Extract the base color and shade from the Tailwind class
  const [, color, shade] = className.split(/[--]/);

  // Map the base colors to their hex values
  const colorMap = {
    tachi: {
      DEFAULT: "#cbd171",
      900: "#514325",
    },
    apricot: {
      DEFAULT: "#ffaf74",
      900: "#7e2210",
    },
    eggplant: {
      DEFAULT: "#918fe0",
      900: "#423e7a",
    },
  };

  // Return the appropriate color value
  return shade
    ? colorMap[color as keyof typeof colorMap][
        shade as keyof (typeof colorMap)[keyof typeof colorMap]
      ]
    : colorMap[color as keyof typeof colorMap].DEFAULT;
}

export function getThemeBackgroundColor(theme: ThemeColor): string {
  return getThemeColor(themeMap[theme].bg);
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultColor: ThemeColor;
}

export function ThemeProvider({ children, defaultColor }: ThemeProviderProps) {
  const theme = themeMap[defaultColor];

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
}
