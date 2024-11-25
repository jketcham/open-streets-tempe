import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  const robotsTxtContent = `User-agent: *\nAllow: /`;

  return new Response(robotsTxtContent.trim(), {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400", // Cache for 1 day
    },
  });
};
