import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { ContentSection } from "~/components/ContentSection";
import { Container } from "~/components/Container";
import { LeadText } from "~/components/LeadText";
import { PageHead } from "~/components/PageHead";
import { PageLayout } from "~/components/PageLayout";
import { Link } from "~/components/themed";
import { ThemedList } from "~/components/ThemedList";
import { type ThemeColor, useTheme } from "~/components/ThemeProvider";
import { eventJsonLd } from "~/data/event";
import { generateMetaTags, generateFaviconLinks } from "~/utils/meta";
import { Button } from "~/components/themed/Button";

const pageTheme: ThemeColor = "eggplant";

interface SponsorCardProps {
  title: string;
  price: number;
  description?: string;
  benefits?: string[];
  subtitle?: string;
  note?: string;
}

function SponsorCard({
  title,
  price,
  description,
  benefits,
  subtitle,
  note,
}: SponsorCardProps) {
  const theme = useTheme();

  return (
    <div
      className={`rounded-2xl bg-white p-8 shadow-[0_2px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      <h3 className={`mb-4 text-2xl font-bold ${theme.text}`}>{title}</h3>
      {subtitle && (
        <p className="mb-4 text-[1.25rem] leading-relaxed">({subtitle})</p>
      )}
      {description && (
        <p className="mb-4 text-[1.25rem] leading-relaxed text-gray-600">
          {description}
        </p>
      )}
      {benefits && (
        <div className="mb-4">
          <h4 className={`mb-2 text-lg font-semibold ${theme.text}`}>
            Benefits Include:
          </h4>
          <ThemedList
            items={benefits}
            className="text-[1.25rem] leading-relaxed text-gray-600"
          />
        </div>
      )}
      <p className={`text-xl font-bold ${theme.text}`}>
        ${price.toLocaleString()}
      </p>
      {note && (
        <p className="mt-2 text-[1.25rem] leading-relaxed text-gray-600">
          {note}
        </p>
      )}
    </div>
  );
}

const pageData = {
  title: "Sponsor Open Streets Tempe",
  description:
    "Support Open Streets Tempe and connect with our community. Various sponsorship opportunities available for businesses and organizations.",
  keywords:
    "event sponsorship, community support, business sponsorship, Tempe events, street festival sponsorship, community engagement",
} as const;

export const meta: MetaFunction = () => {
  return generateMetaTags({
    title: pageData.title,
    description: pageData.description,
    theme: pageTheme,
    path: "/sponsor",
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
    mainEntity: {
      ...eventJsonLd,
      name: "Open Streets Tempe - Sponsorship",
      description:
        "A unique opportunity to support and connect with the Tempe community through our car-free celebration.",
      offers: [
        {
          "@type": "Offer",
          name: "Title Sponsor",
          description:
            "Premier sponsorship opportunity with maximum visibility",
        },
        {
          "@type": "Offer",
          name: "Supporting Sponsor",
          description:
            "Key sponsorship opportunity with significant visibility",
        },
        {
          "@type": "Offer",
          name: "Activation or Booth",
          description: "Opportunity to engage directly with event attendees",
        },
      ],
    },
    potentialAction: [
      {
        "@type": "ViewAction",
        name: "Contact Sponsor Team",
        target: "mailto:sponsor@openstreetstempe.org",
      },
    ],
  },
};

export default function Sponsor() {
  return (
    <PageLayout theme={pageTheme}>
      <PageHead title={pageData.title}>
        <LeadText>{pageData.description}</LeadText>
      </PageHead>

      <main className="grow py-16">
        <Container size="md">
          <div>
            <div className="prose prose-lg max-w-none">
              <ContentSection title="About the Event">
                <p>
                  This inaugural event will be a block party where several
                  streets in Downtown Tempe will be closed off to cars but
                  opened up for any other use we can imagine.
                </p>
                <p>
                  An extension of the Second Sundays local market hosted by the
                  Downtown Tempe Authority, this event takes inspiration from
                  the Cyclovia events held in other cities around the world to
                  encourage communities to temporarily re-purpose public streets
                  for fun activities and chances to connect.
                </p>
              </ContentSection>
            </div>

            <ContentSection title="Sponsorship Opportunities">
              <div className="space-y-12">
                <SponsorCard
                  title="Title Sponsor"
                  subtitle="Limited to 1"
                  price={5000}
                  description="Premier branding and visibility throughout the event."
                  benefits={[
                    'Exclusive "Presented by" status',
                    "Premium booth location",
                    "Logo prominently featured on all event materials",
                    "Speaking opportunity at event",
                    "Social media recognition",
                  ]}
                />

                <SponsorCard
                  title="Premium Sponsor"
                  subtitle="Limited to 3"
                  price={3000}
                  benefits={[
                    "Branding on 1 bike valet or seating area site",
                    "1 music stage sign",
                    "1 post on @biketempe Instagram",
                    "1 Bike Tempe newsletter thank-you shoutout",
                    "1 booth",
                  ]}
                />

                <SponsorCard
                  title="Giveaways Sponsor"
                  price={1000}
                  subtitle="Limit 1 per type of item, available at information booths"
                  benefits={[
                    "Front bike light",
                    "Back bike light",
                    "Reflective bracelet",
                  ]}
                />

                <SponsorCard
                  title="Activation or Booth"
                  price={500}
                  description="Host a table, a game, an Instagrammable photo op or another creative way to interact with your brand"
                  note="Nonprofits participate for FREE!"
                />

                <SponsorCard
                  title="Food Trucks (Limit 2)"
                  price={250}
                  description="Location: Mill Avenue Bridge"
                />
              </div>
            </ContentSection>

            <div className="prose prose-lg max-w-none">
              <ContentSection title="Custom Opportunities">
                <p>
                  Custom sponsorship packages are also available, including
                  sponsoring the kids&apos; bike rodeo and other interactive
                  opportunities. Get in touch if you have ideas for how
                  you&apos;d like to showcase your brand at Open Streets Tempe!
                </p>
              </ContentSection>
            </div>

            <div className="mt-12 space-y-8 border-t-4 border-current pt-8 text-center">
              <div>
                <Button to="/sponsor/signup">Sponsor Signup</Button>
              </div>

              <div>
                <Link href="mailto:sponsor@openstreetstempe.org">
                  Contact our sponsor team at sponsor@openstreetstempe.org
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
