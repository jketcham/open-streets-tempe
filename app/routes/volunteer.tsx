import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { ContentSection } from "~/components/ContentSection";
import { Container } from "~/components/Container";
import { LeadText } from "~/components/LeadText";
import { PageHead } from "~/components/PageHead";
import { PageLayout } from "~/components/PageLayout";
import { ContentCard } from "~/components/ContentCard";
import { Link } from "~/components/themed";
import { ThemedList } from "~/components/ThemedList";
import { type ThemeColor } from "~/components/ThemeProvider";
import { eventJsonLd } from "~/data/event";
import { generateMetaTags, generateFaviconLinks } from "~/utils/meta";
import {
  MapPinIcon,
  ChartBarIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const pageTheme: ThemeColor = "tachi";

const pageData = {
  title: "Volunteer at Open Streets Tempe",
  description:
    "Join our volunteer team and help make Open Streets Tempe a success. Various volunteer opportunities available for this community-driven event.",
  keywords:
    "volunteer opportunities, community service, event volunteers, Tempe volunteers, street festival volunteers, community engagement",
} as const;

export const meta: MetaFunction = () => {
  return generateMetaTags({
    title: pageData.title,
    description: pageData.description,
    theme: pageTheme,
    path: "/volunteer",
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
      "@type": "VolunteerAction",
      name: "Volunteer at Open Streets Tempe",
      description:
        "Help create a vibrant car-free celebration in Downtown Tempe by volunteering at the event.",
      event: eventJsonLd,
    },
    potentialAction: [
      {
        "@type": "ViewAction",
        name: "Sign Up to Volunteer",
        target: "https://volunteer.biketempe.org",
      },
      {
        "@type": "ViewAction",
        name: "Contact Volunteer Team",
        target: "mailto:volunteer@openstreetstempe.org",
      },
    ],
  },
};

export default function Volunteer() {
  return (
    <PageLayout theme={pageTheme}>
      <PageHead title={pageData.title}>
        <LeadText>{pageData.description}</LeadText>
      </PageHead>

      <main className="grow py-16">
        <Container size="md">
          <div>
            <div className="prose prose-lg max-w-none">
              <ContentSection title="Why Volunteer?">
                <ThemedList
                  items={[
                    "Be part of Tempe's first Open Streets celebration",
                    "Meet neighbors and make new friends",
                    "Get a free event t-shirt",
                    "Help create a more sustainable and connected community",
                    "Volunteer half the day, enjoy the event the other half!",
                  ]}
                />
              </ContentSection>
            </div>

            <ContentSection title="Volunteer Opportunities">
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <ContentCard
                  icon={<WrenchScrewdriverIcon className="size-12" />}
                  title="Pre & Post Work"
                  description="Help with setup, teardown, and organization before and after the event. Perfect for those who like working behind the scenes to make everything run smoothly."
                  meta={
                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <ClockIcon className="size-4" />
                      Flexible hours before and after event
                    </p>
                  }
                />
                <ContentCard
                  icon={<MapPinIcon className="size-12" />}
                  title="Intersection Volunteer"
                  description="Guide traffic and help residents navigate around the event route. Choose a morning or afternoon shift and spend the other half enjoying the festivities!"
                  meta={
                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <ClockIcon className="size-4" />
                      8:30am-12pm or 11:30am-3pm
                    </p>
                  }
                />
                <ContentCard
                  icon={<ChartBarIcon className="size-12" />}
                  title="Census Volunteer"
                  description="Help gather valuable data to improve future events and support active transportation advocacy in Tempe. Perfect for those who enjoy talking with people and collecting insights."
                  meta={
                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <ClockIcon className="size-4" />
                      2-3 hour shifts during event
                    </p>
                  }
                />
                <ContentCard
                  icon={<UserGroupIcon className="size-12" />}
                  title="Guide Volunteer"
                  description="Be a knowledgeable presence along the route, helping participants find activities, answering questions, and ensuring everyone has a great time. Training provided!"
                  meta={
                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <ClockIcon className="size-4" />
                      8:30am-12pm or 11:30am-3pm
                    </p>
                  }
                />
              </div>
            </ContentSection>

            <div className="prose prose-lg max-w-none">
              <ContentSection title="What to Expect">
                <ThemedList
                  items={[
                    "Training and orientation before the event",
                    "Clear instructions and support during your shift",
                    "Free event t-shirt and refreshments",
                    "A fun, rewarding experience giving back to your community",
                  ]}
                />
              </ContentSection>
            </div>

            <div className="mt-12 border-t-4 border-current pt-8 text-center">
              <Link href="mailto:volunteer@openstreetstempe.org">
                Contact our volunteer team at volunteer@openstreetstempe.org
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
