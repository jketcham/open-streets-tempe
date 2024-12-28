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
import { Accordion } from "~/components/Accordion";

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

const faqItems = [
  {
    title: "What is the time commitment?",
    content: (
      <>
        <p>
          Volunteers can choose between two shifts: Morning (9:30 AM - 12:30 PM)
          or Afternoon (12:00 PM - 3:00 PM). We ask that you arrive 15 minutes
          before your shift for check-in and a brief orientation.
        </p>
        <p>
          The 30-minute overlap between shifts ensures a smooth transition and
          allows time for shift handover. After your shift, you&apos;re free to
          enjoy the event!
        </p>
      </>
    ),
  },
  {
    title: "Is there a minimum age to volunteer?",
    content: (
      <>
        <p>
          To ensure everyone&apos;s safety and the smooth operation of the
          event, volunteers need to be at least 14 years of age to participate.
        </p>
        <p>
          For youth volunteer groups (ages 14-17), we require adult supervision
          with a ratio of one adult for every 15 young volunteers.
        </p>
      </>
    ),
  },
  {
    title: "Can I bring my pets, kids, or friends with me?",
    content: (
      <>
        <p>For safety reasons, we cannot allow pets during volunteer shifts.</p>
        <p>
          Parents who are volunteering may bring children under 14 with them,
          provided the children stay under their direct supervision throughout
          the shift.
        </p>
        <p>
          We love when volunteers bring friends! If you&apos;d like to volunteer
          with friends, we encourage it - just let us know by emailing{" "}
          <Link href="mailto:volunteer@openstreetstempe.org">
            volunteer@openstreetstempe.org
          </Link>{" "}
          beforehand so we can prepare enough t-shirts and make sure you&apos;re
          assigned to the same area.
        </p>
      </>
    ),
  },
  {
    title: "How do I find out about future volunteer opportunities?",
    content: (
      <p>
        The best way to stay informed of upcoming volunteer opportunities is to
        join our Volunteer Mailing List.{" "}
        <Link to="/newsletter">Sign up for our newsletter here</Link> to receive
        updates about future events and volunteer opportunities.
      </p>
    ),
  },
  {
    title: "Do I need any special skills or experience?",
    content: (
      <p>
        No special skills are required! We welcome volunteers of all backgrounds
        and abilities. We&apos;ll provide all necessary training and support to
        help you succeed in your role. The most important qualities are
        enthusiasm, reliability, and a desire to help create a great community
        event.
      </p>
    ),
  },
  {
    title: "What should I bring with me?",
    content: (
      <>
        <p>We recommend bringing:</p>
        <ul>
          <li>Water bottle (we&apos;ll have refill stations)</li>
          <li>Sunscreen and hat</li>
          <li>Comfortable walking shoes</li>
          <li>Weather-appropriate clothing</li>
        </ul>
        <p>
          We&apos;ll provide your volunteer t-shirt, any necessary equipment,
          and light refreshments during your shift.
        </p>
      </>
    ),
  },
  {
    title: "Can I volunteer with friends or as a group?",
    content: (
      <p>
        Yes! We welcome both individual volunteers and groups. When you sign up,
        you can indicate if you&apos;re part of a group, and we&apos;ll do our
        best to assign you to the same area. It&apos;s a great way to make the
        experience even more fun while serving your community together.
      </p>
    ),
  },
  {
    title: "What happens if it rains?",
    content: (
      <p>
        Open Streets Tempe is a rain or shine event! We&apos;ll provide
        weather-appropriate gear if needed, and we&apos;ll adjust activities as
        necessary to ensure everyone&apos;s safety and comfort. In case of
        severe weather, we&apos;ll communicate any changes or cancellations
        directly to all volunteers.
      </p>
    ),
  },
  {
    title: "Will there be parking available for volunteers?",
    content: (
      <p>
        Yes, we&apos;ll provide information about designated volunteer parking
        areas in your confirmation email. We encourage volunteers to bike, walk,
        or use public transit if possible, as it aligns with our event&apos;s
        mission of promoting sustainable transportation. We&apos;ll also have
        secure bike parking available.
      </p>
    ),
  },
  {
    title: "What if I need to cancel my volunteer shift?",
    content: (
      <p>
        We understand that plans can change. If you need to cancel your shift,
        please email us at{" "}
        <Link href="mailto:volunteer@openstreetstempe.org">
          volunteer@openstreetstempe.org
        </Link>{" "}
        as soon as possible so we can find a replacement. We appreciate at least
        48 hours notice when possible.
      </p>
    ),
  },
];

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
                <Button to="/volunteer/signup">Sign Up to Volunteer</Button>
              </div>

              <div>
                <Link href="mailto:volunteer@openstreetstempe.org">
                  Contact our volunteer team at volunteer@openstreetstempe.org
                </Link>
              </div>
            </div>

            <ContentSection title="Frequently Asked Questions">
              <Accordion items={faqItems} />
            </ContentSection>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
