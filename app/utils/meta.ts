import type { ThemeColor } from "~/components/ThemeProvider";
import { getThemeBackgroundColor } from "~/components/ThemeProvider";

interface GenerateMetaTagsOptions {
  title: string;
  description: string;
  theme: ThemeColor;
  path: string;
}

export function generateMetaTags({
  title,
  description,
  theme,
  path,
}: GenerateMetaTagsOptions) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://openstreetstempe.org";

  const ogImageUrl = new URL("/resource/og.png", baseUrl);
  ogImageUrl.searchParams.set("title", title);
  ogImageUrl.searchParams.set("description", description);
  ogImageUrl.searchParams.set("theme", theme);

  return [
    { title },
    { name: "description", content: description },
    { name: "theme-color", content: getThemeBackgroundColor(theme) },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: ogImageUrl.toString() },
    { property: "og:url", content: `${baseUrl}${path}` },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImageUrl.toString() },
  ];
}
