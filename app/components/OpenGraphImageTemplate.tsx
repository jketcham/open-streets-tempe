import type { ThemeColor } from "./ThemeProvider";
import {
  getThemeBackgroundColor,
  getThemeColor,
  themeMap,
} from "./ThemeProvider";

interface OpenGraphImageTemplateProps {
  title: string;
  description?: string;
  theme: ThemeColor;
}

export function OpenGraphImageTemplate({
  title,
  description,
  theme,
}: OpenGraphImageTemplateProps) {
  const themeColors = themeMap[theme];
  const bgColor = getThemeBackgroundColor(theme);
  const textColor = getThemeColor(themeColors.textOnLight);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: bgColor,
        padding: 80,
        color: textColor,
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontFamily: "Hepta Slab",
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: description ? 40 : 0,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>
      {description && (
        <div
          style={{
            fontSize: 36,
            fontFamily: "Gabarito",
            fontWeight: 400,
            lineHeight: 1.4,
            opacity: 0.9,
            maxWidth: 1000,
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
}
