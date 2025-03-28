import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { ContentSection } from "~/components/ContentSection";
import { Container } from "~/components/Container";
import { LeadText } from "~/components/LeadText";
import { PageHead } from "~/components/PageHead";
import { PageLayout } from "~/components/PageLayout";
import { ThemedSection } from "~/components/ThemedSection";
import { type ThemeColor } from "~/components/ThemeProvider";
import { eventJsonLd } from "~/data/event";
import { generateMetaTags, generateFaviconLinks } from "~/utils/meta";
import { FadeIn } from "~/components/FadeIn";
import { CalendarIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import {
  ResponsiveImage,
  generatePreloadLinks,
} from "~/components/ResponsiveImage";

// Define the custom element for TypeScript
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
  title: "Win a Lectric E-Bike Raffle - Open Streets Tempe",
  description:
    "Support Open Streets Tempe and get a chance to win a Lectric e-bike! Winner will be announced at the event on April 13th.",
  keywords:
    "raffle, Lectric e-bike, win e-bike, Open Streets Tempe raffle, fundraiser, community event, e-bike giveaway",
} as const;

export const meta: MetaFunction = () => {
  return generateMetaTags({
    title: pageData.title,
    description: pageData.description,
    theme: pageTheme,
    path: "/raffle",
  });
};

export const links: LinksFunction = () => {
  return [
    ...generateFaviconLinks(pageTheme),
    ...generatePreloadLinks("/images/raffle-ebike", 1024),
  ];
};

export const handle = {
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords,
    mainEntity: {
      ...eventJsonLd,
      description:
        "Win a Lectric e-bike at Open Streets Tempe! Purchase raffle tickets for your chance to win.",
    },
  },
};

export default function Raffle() {
  useEffect(() => {
    // Load Stripe script
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script on unmount
      const existingScript = document.querySelector(
        'script[src="https://js.stripe.com/v3/buy-button.js"]',
      );
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <PageLayout theme={pageTheme}>
      <PageHead title="E-Bike Raffle">
        <LeadText>
          Support Open Streets Tempe and get a chance to win a Lectric{" "}
          <span className="whitespace-nowrap">e-bike!</span>
        </LeadText>
      </PageHead>

      <main className="grow space-y-16 py-16">
        <Container size="md">
          <div className="prose prose-lg max-w-none">
            <ContentSection title="Win a Lectric E-Bike!">
              <div className="flex flex-col items-center space-y-8">
                <div className="not-prose aspect-square max-w-md overflow-hidden rounded-lg shadow-lg">
                  <ResponsiveImage
                    basePath="/images/raffle-ebike"
                    alt="Lectric E-Bike"
                    className="h-full w-full object-contain"
                    maxSize={1024}
                  />
                </div>

                <div className="mt-8 space-y-4 text-center">
                  <div className="not-prose mb-6 flex items-center justify-center space-x-2">
                    <TrophyIcon className="h-6 w-6 flex-shrink-0 text-apricot-600" />
                    <h3 className="text-xl font-bold">Grand Prize</h3>
                  </div>
                  <p className="text-2xl font-bold">1 Lectric E-Bike</p>
                  <p>
                    Each raffle ticket purchase gives you one chance to win!
                  </p>
                </div>

                <div className="not-prose flex items-center justify-center space-x-2 text-center">
                  <CalendarIcon className="mt-0.5 h-6 w-6 flex-shrink-0 text-apricot-600" />
                  <p className="font-semibold">
                    Winner will be announced at 2pm on April 13th at the event
                  </p>
                </div>
              </div>
            </ContentSection>
          </div>
        </Container>

        <ThemedSection>
          <Container>
            <FadeIn className="max-w-none">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="mb-8 text-3xl font-bold text-apricot-900">
                  Purchase Raffle Tickets
                </h2>
                <div className="prose prose-lg mb-8 max-w-none">
                  <p>
                    Support Open Streets Tempe and get your chance to win a
                    brand new Lectric{" "}
                    <span className="whitespace-nowrap">e-bike!</span> Your
                    purchase helps make Open Streets Tempe possible.
                  </p>
                </div>

                <div className="mx-auto max-w-md">
                  {/* @ts-expect-error - Stripe custom element */}
                  <stripe-buy-button
                    buy-button-id="buy_btn_1R7RGYI6T2Tglv3eVAGaNDZh"
                    publishable-key="pk_live_51OaUSqI6T2Tglv3eowJqg1eG5GfBW0ZjoYd0Lw6nHoY1Ri94K2mY3XXm8oGC6yMWTmUqg89ck8H3zY3CuFGFRtiZ00iBg3ET7Y"
                  >
                    {/* @ts-expect-error - Stripe custom element */}
                  </stripe-buy-button>
                </div>
              </div>
            </FadeIn>
          </Container>
        </ThemedSection>

        <Container size="md">
          <div className="prose prose-lg max-w-none">
            <ContentSection title="Raffle Details">
              <div className="space-y-4">
                <p>
                  <strong>How it works:</strong> Each purchase of a raffle
                  ticket gives you one entry into our drawing for a Lectric
                  <span className="whitespace-nowrap"> e-bike</span>. The more
                  tickets you purchase, the better your chances of winning!
                </p>
                <p>
                  <strong>Drawing:</strong> The winner will be selected by
                  random drawing at 2:00 PM on April 13th during the Open
                  Streets Tempe event. Winner must be present to claim their
                  prize or respond within 48 hours if contacted.
                </p>
                <p>
                  <strong>Prize pickup:</strong> The{" "}
                  <span className="whitespace-nowrap">e-bike</span> will be
                  available for pickup at the event or in downtown Tempe after
                  the event. No delivery options are available.
                </p>
                <p>
                  <strong>Questions?</strong> Contact us at{" "}
                  <a href="mailto:info@openstreetstempe.org">
                    info@openstreetstempe.org
                  </a>{" "}
                  with any questions about the raffle.
                </p>
              </div>
            </ContentSection>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
