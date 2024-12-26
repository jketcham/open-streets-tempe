import { json } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useMatches,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { useEffect } from "react";
import * as gtag from "~/utils/gtags.client";
import { useNonce } from "~/utils/nonce-provider";
import type { Handle } from "~/types/handle";
import { Layout } from "~/components/Layout";
import { ThemeProvider } from "~/components/ThemeProvider";
import { ErrorMessage } from "~/components/ErrorMessage";
import tailwindStylesheetUrl from "./tailwind.css?url";

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Open Streets Tempe",
  url: "https://openstreetstempe.org",
};

export const links: LinksFunction = () => {
  return [
    { rel: "preload", href: tailwindStylesheetUrl, as: "style" },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "preload",
      href: "https://fonts.googleapis.com/css2?family=Gabarito:wght@400;600;700&family=Hepta+Slab:wght@400;700&display=swap",
      as: "style",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Gabarito:wght@400;600;700&family=Hepta+Slab:wght@400;700&display=swap",
    },
  ];
};

export const loader = async () => {
  return json({
    gaTrackingId: process.env.GA_TRACKING_ID,
  });
};

function Document({
  children,
  nonce,
  gaTrackingId,
  jsonLdScripts,
}: {
  children: React.ReactNode;
  nonce: string;
  gaTrackingId?: string;
  jsonLdScripts?: React.ReactNode;
}) {
  const location = useLocation();

  useEffect(() => {
    if (gaTrackingId?.length) {
      gtag.pageview(location.pathname, gaTrackingId);
    }
  }, [location, gaTrackingId]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content="Open Streets Tempe" />
        <Meta />
        <Links />
        {jsonLdScripts}
      </head>
      <body className="bg-white text-neutral-900">
        {process.env.NODE_ENV === "development" || !gaTrackingId ? null : (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
            />
            <script
              async
              nonce={nonce}
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `,
              }}
            />
          </>
        )}
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  const nonce = useNonce();
  const matches = useMatches();
  const { gaTrackingId } = useLoaderData<typeof loader>();

  // Get the JSON-LD data from the current route's handle if it exists
  const jsonLd = matches.find((match) => (match.handle as Handle)?.jsonLd)
    ?.handle as Handle | undefined;
  const jsonLdData = jsonLd?.jsonLd;

  const jsonLdScripts = (
    <>
      {jsonLdData && (
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      )}
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
      />
    </>
  );

  return (
    <Document
      nonce={nonce}
      gaTrackingId={gaTrackingId}
      jsonLdScripts={jsonLdScripts}
    >
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const nonce = useNonce();

  let heading = "Something went wrong";
  let message = "Sorry, an unexpected error occurred. Please try again later.";
  let gaTrackingId: string | undefined;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      heading = "Page not found";
      message = "Sorry, we couldn't find the page you're looking for.";
    } else {
      heading = `${error.status} ${error.statusText}`;
      message = error.data;
    }

    // Try to get GA tracking ID from error response
    try {
      const errorData = error.data;
      if (
        typeof errorData === "object" &&
        errorData !== null &&
        "gaTrackingId" in errorData
      ) {
        gaTrackingId = errorData.gaTrackingId as string;
      }
    } catch {
      // If we can't get the GA tracking ID, that's fine
    }
  }

  return (
    <Document nonce={nonce} gaTrackingId={gaTrackingId}>
      <ThemeProvider defaultColor="tachi">
        <Layout>
          <ErrorMessage heading={heading} message={message} />
        </Layout>
      </ThemeProvider>
    </Document>
  );
}

ErrorBoundary.links = links;
