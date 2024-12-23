import type { LoaderFunction } from "@remix-run/node";

const baseUrl = "https://openstreetstempe.org"; // Replace with your actual domain

export const loader: LoaderFunction = () => {
  const pages = ["", "/about", "/artists", "/sponsor", "/volunteer"];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `
        <url>
          <loc>${baseUrl}${page}</loc>
          <changefreq>weekly</changefreq>
          <priority>${page === "" ? "1.0" : "0.8"}</priority>
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
