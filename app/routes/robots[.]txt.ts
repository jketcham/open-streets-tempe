import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  const robotsTxtContent = `User-agent: *\nAllow: /\nSitemap: https://openstreetstempe.org/sitemap.xml`;

  return new Response(robotsTxtContent.trim(), {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400", // Cache for 1 day
    },
  });
};
