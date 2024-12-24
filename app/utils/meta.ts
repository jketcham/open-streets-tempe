import type { ThemeColor } from "~/components/ThemeProvider";
import { getThemeBackgroundColor } from "~/components/ThemeProvider";

interface LabelDataPair {
  label: string;
  data: string;
}

interface GenerateMetaTagsOptions {
  title: string;
  description: string;
  theme: ThemeColor;
  path: string;
  labelData?: LabelDataPair[];
}

export function generateMetaTags({
  title,
  description,
  theme,
  path,
  labelData,
}: GenerateMetaTagsOptions) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://openstreetstempe.org";

  const ogImageUrl = new URL("/resource/og.png", baseUrl);
  ogImageUrl.searchParams.set("title", title);
  ogImageUrl.searchParams.set("description", description);
  ogImageUrl.searchParams.set("theme", theme);

  const metaTags = [
    { title },
    { name: "description", content: description },
    { name: "theme-color", content: getThemeBackgroundColor(theme) },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: ogImageUrl.toString() },
    { property: "og:url", content: `${baseUrl}${path}` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@os_tempe" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImageUrl.toString() },
  ];

  if (labelData) {
    labelData.forEach((pair, index) => {
      metaTags.push(
        { property: `og:label${index + 1}`, content: pair.label },
        { property: `og:data${index + 1}`, content: pair.data },
      );
    });
  }

  return metaTags;
}

export function generateFaviconLinks(theme: ThemeColor) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://openstreetstempe.org";

  const svgUrl = new URL("/resource/favicon.svg", baseUrl);
  const icoUrl = new URL("/resource/favicon.ico", baseUrl);
  svgUrl.searchParams.set("theme", theme);
  icoUrl.searchParams.set("theme", theme);

  return [
    {
      rel: "icon",
      href: icoUrl.toString(),
      sizes: "32x32",
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      href: svgUrl.toString(),
    },
  ];
}
