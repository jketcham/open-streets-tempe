import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Container } from "~/components/Container";
import { LeadText } from "~/components/LeadText";
import { PageHead } from "~/components/PageHead";
import { PageLayout } from "~/components/PageLayout";
import { type ThemeColor } from "~/components/ThemeProvider";
import { generateMetaTags, generateFaviconLinks } from "~/utils/meta";
import { ThemedList } from "~/components/ThemedList";
import { useEffect } from "react";

declare module "react" {
  interface IntrinsicElements {
    "stripe-buy-button": {
      "buy-button-id": string;
      "publishable-key": string;
    };
  }
}

const pageTheme: ThemeColor = "apricot";

const pageData = {
  title: "Support Open Streets Tempe",
  description:
    "Help make Open Streets Tempe possible! Your tax-deductible donation supports our mission to create vibrant, car-free spaces for our community.",
  keywords:
    "donate, support, contribution, tax-deductible donation, community support, nonprofit donation, Tempe events",
} as const;

export const meta: MetaFunction = () => {
  return generateMetaTags({
    title: pageData.title,
    description: pageData.description,
    theme: pageTheme,
    path: "/donate",
  });
};

export const links: LinksFunction = () => {
  return generateFaviconLinks(pageTheme);
};

export const handle = {
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords,
  },
};

export default function Donate() {
  useEffect(() => {
    // Load Stripe script
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <PageLayout theme={pageTheme}>
      <PageHead title={pageData.title}>
        <LeadText>{pageData.description}</LeadText>
      </PageHead>

      <main className="grow py-16">
        <Container size="md">
          <div className="mx-auto max-w-3xl">
            <div className="mb-16 grid grid-cols-1 items-start gap-8 sm:grid-cols-[1fr,auto]">
              <div className="flex justify-center sm:justify-start">
                {/* @ts-expect-error - Stripe custom element */}
                <stripe-buy-button
                  buy-button-id="buy_btn_1QaBc6I6T2Tglv3e5PNAKkSr"
                  publishable-key="pk_live_51OaUSqI6T2Tglv3eowJqg1eG5GfBW0ZjoYd0Lw6nHoY1Ri94K2mY3XXm8oGC6yMWTmUqg89ck8H3zY3CuFGFRtiZ00iBg3ET7Y"
                >
                  {/* @ts-expect-error - Stripe custom element */}
                </stripe-buy-button>
              </div>

              <div className="flex flex-col items-center gap-4 text-center sm:w-48">
                <a
                  href="https://www.guidestar.org/profile/shared/e7046f7f-9061-4e8d-a3e6-a3f84f84b02c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-90"
                >
                  <img
                    src="https://widgets.guidestar.org/TransparencySeal/8847068"
                    alt="Guidestar Seal of Transparency"
                    className="h-auto w-32"
                  />
                </a>
                {/* <p className="text-sm text-gray-600">
                  We&apos;re a registered 501(c)(3) nonprofit.
                  <br />
                  EIN: 20-8955041
                </p> */}
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p>
                Open Streets Tempe is a program of Tempe Bicycle Action Group, a
                501(c)(3) nonprofit organization, EIN: 20-8955041.
              </p>
              <p>Your tax-deductible donation helps us:</p>

              <ThemedList
                items={[
                  "Create safe, car-free spaces for community connection",
                  "Provide free, family-friendly activities and entertainment",
                  "Support local artists and performers",
                  "Promote active transportation and sustainable living",
                  "Build a more vibrant, livable Tempe",
                ]}
              />
            </div>

            <div className="prose prose-lg mt-12 grid max-w-none grid-cols-1 gap-8 border-t-4 pt-8 sm:grid-cols-2">
              <p>
                Please save your email donation receipt as your official record.
                It will be sent to you after your donation is successfully
                completed.
              </p>
              <div className="text-gray-600">
                <h2 className="mb-4 mt-0 text-2xl font-bold">Questions?</h2>
                <p>
                  Please contact us at{" "}
                  <a
                    href="mailto:info@openstreetstempe.org"
                    className="hover:underline"
                  >
                    info@openstreetstempe.org
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
