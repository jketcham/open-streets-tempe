import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { ContentSection } from "~/components/ContentSection";
import { Container } from "~/components/Container";
import { LeadText } from "~/components/LeadText";
import { PageHead } from "~/components/PageHead";
import { PageLayout } from "~/components/PageLayout";
import { Link } from "~/components/themed";
import { ThemedList } from "~/components/ThemedList";
import { type ThemeColor } from "~/components/ThemeProvider";
import { eventJsonLd } from "~/data/event";
import { generateMetaTags, generateFaviconLinks } from "~/utils/meta";
import { volunteerRoles } from "~/data/volunteerRoles";
import { VolunteerCard } from "~/components/VolunteerCard";
import {
  MapPinIcon,
  ChartBarIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Button } from "~/components/themed/Button";
import { ResponsiveImage } from "~/components/ResponsiveImage";

const pageTheme: ThemeColor = "tachi";

const pageData = {
  title: "Volunteer",
  description:
    "Join our volunteer team and help make Open Streets Tempe a success. Various volunteer opportunities available for this community-driven event.",
  keywords:
    "volunteer opportunities, community service, event volunteers, Tempe volunteers, street festival volunteers, community engagement",
} as const;

const roleIcons = {
  "route-coordinator": <MapPinIcon className="size-8" />,
  "community-ambassador": <UserGroupIcon className="size-8" />,
  "census-volunteer": <ChartBarIcon className="size-8" />,
  "bike-valet": <WrenchScrewdriverIcon className="size-8" />,
  "activations-facilitator": <WrenchScrewdriverIcon className="size-8" />,
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
        target: "https://openstreetstempe.org/volunteer/signup",
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
          <div className="space-y-16">
            {/* Impact Section with Image */}
            <ContentSection title="The Heart of Open Streets">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div className="prose prose-lg">
                  <p>
                    Volunteers are the heartbeat of Open Streets Tempe. Their
                    enthusiasm, dedication, and community spirit transform our
                    streets into vibrant spaces where neighbors connect,
                    friendships form, and memories are made.
                  </p>
                  <p>
                    By volunteering, you&apos;re not just helping at an
                    event—you&apos;re building a more sustainable, connected,
                    and joyful community. You&apos;re part of a movement that
                    shows how our streets can be reimagined as places for
                    people, not just cars.
                  </p>
                </div>
                <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl lg:mx-0">
                  <ResponsiveImage
                    basePath="/images/bike-rodeo-volunteer"
                    alt="Volunteers working together at a community event"
                    className="object-cover"
                    maxSize={1024}
                  />
                </div>
              </div>
            </ContentSection>

            <div className="text-center">
              <Button to="/volunteer/signup">Sign Up to Volunteer</Button>
              <p className="mt-4 text-gray-600">
                Join us in making Open Streets Tempe a success!
              </p>
            </div>

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

            <ContentSection title="Volunteer Shifts">
              <div className="rounded-2xl bg-white p-8 shadow-[0_2px_20px_rgba(0,0,0,0.08)]">
                <p className="text-lg text-gray-600">
                  All volunteer positions are available in two shifts:
                </p>
                <div className="mt-4 space-y-2 text-lg">
                  <p className="font-medium">
                    Morning Shift:{" "}
                    <span className="text-gray-600">9:30 AM - 12:30 PM</span>
                  </p>
                  <p className="font-medium">
                    Afternoon Shift:{" "}
                    <span className="text-gray-600">12:00 PM - 3:00 PM</span>
                  </p>
                </div>
                <p className="mt-4 text-gray-600">
                  The 30-minute overlap allows for smooth transitions between
                  shifts. Choose the time that works best for you!
                </p>
              </div>
            </ContentSection>

            <ContentSection title="Volunteer Opportunities">
              <div className="space-y-8">
                {volunteerRoles.map((role) => (
                  <VolunteerCard
                    key={role.id}
                    title={role.title}
                    description={role.description}
                    responsibilities={role.responsibilities}
                    icon={roleIcons[role.id as keyof typeof roleIcons]}
                  />
                ))}
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

            <div className="space-y-8 border-t-4 border-current pt-8 text-center">
              <div>
                <Button to="/volunteer/signup">Volunteer Signup</Button>
              </div>

              <div>
                <Link href="mailto:volunteer@openstreetstempe.org">
                  Contact our volunteer team at volunteer@openstreetstempe.org
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
