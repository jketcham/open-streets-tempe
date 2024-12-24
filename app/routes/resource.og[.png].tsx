import type { LoaderFunction } from "@remix-run/node";
import satori from "satori";
import { join } from "path";
import { readFileSync } from "fs";
import { ThemeColor } from "~/components/ThemeProvider";
import { OgImageTemplate } from "~/components/OgImageTemplate";

// Load fonts
const heptaSlabBold = readFileSync(
  join(process.cwd(), "public/fonts/HeptaSlab-Bold.ttf"),
);
const heptaSlabRegular = readFileSync(
  join(process.cwd(), "public/fonts/HeptaSlab-Regular.ttf"),
);
const gabaritoRegular = readFileSync(
  join(process.cwd(), "public/fonts/Gabarito-Regular.ttf"),
);
const gabaritoBold = readFileSync(
  join(process.cwd(), "public/fonts/Gabarito-Bold.ttf"),
);

const width = 1200;
const height = 630;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Open Streets Tempe";
  const description = url.searchParams.get("description") || undefined;
  const theme = (url.searchParams.get("theme") || "tachi") as ThemeColor;

  // Generate SVG using Satori
  const svg = await satori(
    <OgImageTemplate title={title} description={description} theme={theme} />,
    {
      width,
      height,
      fonts: [
        {
          name: "Hepta Slab",
          data: heptaSlabBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "Hepta Slab",
          data: heptaSlabRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Gabarito",
          data: gabaritoBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "Gabarito",
          data: gabaritoRegular,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );

  // Convert SVG to PNG using Resvg
  const resvg = new (await import("@resvg/resvg-js")).Resvg(svg, {
    fitTo: {
      mode: "width",
      value: width,
    },
    font: {
      loadSystemFonts: false,
      defaultFontFamily: "Hepta Slab",
    },
    logLevel: "error",
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
