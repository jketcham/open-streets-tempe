import type { LoaderFunction } from "@remix-run/node";

const baseUrl = "https://openstreetstempe.org";

// Define known routes
const routes = [
  "",
  "about",
  "artists",
  "sponsor",
  "volunteer",
  "donate",
  "newsletter",
];

export const loader: LoaderFunction = async () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes
        .map(
          (route) => `
        <url>
          <loc>${baseUrl}${route === "" ? "" : `/${route}`}</loc>
          <changefreq>weekly</changefreq>
          <priority>${route === "" ? "1.0" : "0.8"}</priority>
        </url>
      `,
        )
        .join("")}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Content-Length": String(Buffer.byteLength(sitemap)),
      "Cache-Control": "public, max-age=3600",
    },
  });
};
