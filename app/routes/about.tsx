import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { ContentSection } from "~/components/ContentSection";
import { Container } from "~/components/Container";
import { LeadText } from "~/components/LeadText";
import { PageHead } from "~/components/PageHead";
import { PageLayout } from "~/components/PageLayout";
import { Button, Link } from "~/components/themed";
import { ThemedSection } from "~/components/ThemedSection";
import { type ThemeColor, useTheme } from "~/components/ThemeProvider";
import { ContentCard } from "~/components/ContentCard";
import { eventJsonLd } from "~/data/event";
import { generateMetaTags, generateFaviconLinks } from "~/utils/meta";
import { FadeIn } from "~/components/FadeIn";
import EventArtwork2025 from "~/components/svg/EventArtwork2025";
import {
  MapPinIcon,
  MusicalNoteIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  PaintBrushIcon,
  HeartIcon,
  ChevronDoubleRightIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";

function WhyItMatters() {
  const theme = useTheme();

  return (
    <FadeIn className="max-w-none">
      <div>
        <h2 className={`mb-10 text-3xl font-bold ${theme.textOnLight}`}>
          Why It Matters
        </h2>
        <div className="prose prose-lg max-w-none">
          <p>
            Open Streets events do more than just create a fun day out—they
            demonstrate how our streets can become vibrant public spaces that:
          </p>
          <ul>
            <li>Build stronger community connections</li>
            <li>Support local businesses</li>
            <li>Promote active transportation</li>
            <li>Improve public health</li>
            <li>Reduce carbon emissions</li>
            <li>Create more livable neighborhoods</li>
          </ul>
        </div>
      </div>
    </FadeIn>
  );
}

const pageTheme: ThemeColor = "eggplant";

const pageData = {
  title: "About Open Streets Tempe",
  description:
    "Learn about Open Streets Tempe, a car-free celebration that transforms our streets into vibrant public spaces for community connection and active transportation.",
  keywords:
    "about open streets, car-free event, community celebration, active transportation, public spaces, street festival, Tempe events",
} as const;

export const meta: MetaFunction = () => {
  return generateMetaTags({
    title: pageData.title,
    description: pageData.description,
    theme: pageTheme,
    path: "/about",
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
      description:
        "A car-free celebration where streets transform into vibrant public spaces for walking, biking, rolling, and community connection.",
    },
    potentialAction: [
      {
        "@type": "ViewAction",
        name: "Volunteer",
        target: "https://openstreetstempe.org/volunteer",
      },
      {
        "@type": "ViewAction",
        name: "Artists",
        target: "https://openstreetstempe.org/artists",
      },
      {
        "@type": "ViewAction",
        name: "Sponsor",
        target: "https://openstreetstempe.org/sponsor",
      },
    ],
  },
};

export default function About() {
  return (
    <PageLayout theme={pageTheme}>
      <PageHead title={pageData.title}>
        <LeadText>{pageData.description}</LeadText>
      </PageHead>

      <main className="grow space-y-16 py-16">
        <Container size="md">
          <div>
            <div className="prose prose-lg max-w-none">
              <ContentSection title="What is an Open Streets Event?">
                <p>Think of it as a miles-long block party!</p>
                <p>
                  {" "}
                  We temporarily close streets to cars and open them to people,
                  creating a safe and welcoming space for everyone to explore
                  their city in a new way. It&apos;s not a race or a traditional
                  festival—it&apos;s a celebration of community and active
                  living.
                </p>
                <p>
                  Open Streets events (also known as Ciclovía) started in
                  Bogotá, Colombia, and have spread to cities worldwide,
                  reimagining streets—our largest public spaces—as places for
                  people to connect and thrive.
                </p>
              </ContentSection>
            </div>

            <ContentSection title="What to Expect">
              <div className="prose prose-lg max-w-none">
                <p>
                  The event is free and open to everyone! You can join anywhere
                  along the route and participate however you like. Walk, bike,
                  skate, dance, or simply pull up a chair and watch the
                  community come alive.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <ContentCard
                  icon={<MapPinIcon className="size-12" />}
                  title="Car-Free Streets"
                  description="A safe route connecting neighborhoods for everyone to enjoy"
                />
                <ContentCard
                  icon={<SpeakerWaveIcon className="size-12" />}
                  title="Entertainment"
                  description="Family-friendly activities and performances throughout the day"
                />
                <ContentCard
                  icon={<BuildingStorefrontIcon className="size-12" />}
                  title="Food & Vendors"
                  description="Local restaurants and artisan vendors line the route"
                />
                <ContentCard
                  icon={<UserGroupIcon className="size-12" />}
                  title="Community"
                  description="Connect with local organizations and your neighbors"
                />
                <ContentCard
                  icon={<PaintBrushIcon className="size-12" />}
                  title="Art"
                  description="Interactive installations and creative activities"
                />
                <ContentCard
                  icon={<HeartIcon className="size-12" />}
                  title="Fitness"
                  description="Join fitness classes and active demonstrations"
                />
                <ContentCard
                  icon={<MusicalNoteIcon className="size-12" />}
                  title="Music"
                  description="Live performances and entertainment zones"
                />
                <ContentCard
                  icon={<ChevronDoubleRightIcon className="size-12" />}
                  title="Active Living"
                  description="Try walking, biking, or rolling in a safe environment"
                />
              </div>
            </ContentSection>
          </div>
        </Container>

        <ThemedSection>
          <Container>
            <WhyItMatters />
          </Container>
        </ThemedSection>

        <Container size="md">
          <div>
            <div className="prose prose-lg max-w-none">
              <ContentSection title="2025 Event Artwork">
                <div className="flex flex-col items-center gap-8">
                  <div className="w-full max-w-md">
                    <EventArtwork2025 />
                  </div>
                  <div className="prose prose-lg max-w-none text-center">
                    <p>
                      Our 2025 event artwork was created by{" "}
                      <a
                        href="https://www.nnuzzo.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-eggplant hover:underline"
                      >
                        Nicole Poppell (NNUZZO)
                      </a>
                      , a multidisciplinary designer and artist based in
                      Phoenix.
                    </p>
                    <p>
                      Nicole&apos;s work is inspired by the strange and
                      imperfect forms found in natural elements, and her
                      approach is bold, strategic, and conceptual. She recently
                      completed a pair of public art projects for neighborhood
                      associations in Tempe, including an{" "}
                      <a
                        href="https://www.tempe.gov/government/transportation-and-sustainability/transportation/streetscape-projects/adaptive-streets"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-eggplant hover:underline"
                      >
                        Adaptive Streets
                      </a>{" "}
                      painted bike lane in Holdeman and a mural in University
                      Park. Follow Nicole&apos;s work on{" "}
                      <a
                        href="https://www.instagram.com/nn_zzo/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-eggplant hover:underline"
                      >
                        Instagram
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </ContentSection>
            </div>

            <div className="prose prose-lg max-w-none">
              <ContentSection title="Who We Are">
                <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
                  <div className="shrink-0">
                    <a
                      href="https://www.biketempe.org?utm_source=openstreetstempe"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit Tempe Bicycle Action Group website"
                    >
                      <img
                        src="/images/logo-bike-tempe-640w.png"
                        alt="Tempe Bicycle Action Group"
                        className="h-24 w-auto"
                      />
                    </a>
                  </div>
                  <p>
                    Open Streets Tempe is a program of{" "}
                    <a
                      href="https://www.biketempe.org?utm_source=openstreetstempe"
                      className="text-eggplant hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Tempe Bicycle Action Group
                    </a>
                    , a local 501(c)(3) nonprofit organization. Together with
                    our partners and volunteers, we&apos;re working to create a
                    more sustainable, connected, and vibrant Tempe.
                  </p>
                </div>
              </ContentSection>
            </div>

            <ContentSection title="Our Partners" id="partners">
              <div className="prose prose-lg">
                <p className="mb-8">
                  We&apos;re proud to partner with these organizations to make
                  Open Streets Tempe possible:
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                <a
                  href="https://www.tempe.gov?utm_source=openstreetstempe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <img
                    src="/images/logo-tempe-640w.png"
                    alt="City of Tempe"
                    className="h-16 w-auto object-contain grayscale transition-all hover:grayscale-0"
                  />
                </a>
                <a
                  href="https://www.downtowntempe.com?utm_source=openstreetstempe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <img
                    src="/images/logo-dta-640w.png"
                    alt="Downtown Tempe Authority"
                    className="h-16 w-auto object-contain grayscale transition-all hover:grayscale-0"
                  />
                </a>
                <a
                  href="https://www.tempechamber.org?utm_source=openstreetstempe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <img
                    src="/images/logo-chamber-640w.png"
                    alt="Tempe Chamber of Commerce"
                    className="h-16 w-auto object-contain grayscale transition-all hover:grayscale-0"
                  />
                </a>
                <a
                  href="https://www.tempetourism.com?utm_source=openstreetstempe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <img
                    src="/images/logo-tourism-640w.png"
                    alt="Tempe Tourism"
                    className="h-16 w-auto object-contain grayscale transition-all hover:grayscale-0"
                  />
                </a>
              </div>
            </ContentSection>

            <ContentSection title="Contact Us" id="contact">
              <div className="grid grid-cols-1 gap-8 text-lg sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-xl font-semibold">
                    General Contact
                  </h3>
                  <Link href="mailto:info@openstreetstempe.org">
                    info@openstreetstempe.org
                  </Link>
                </div>

                <div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Media Inquiries
                  </h3>
                  <Link href="mailto:media@openstreetstempe.org">
                    media@openstreetstempe.org
                  </Link>
                </div>

                <div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Mailing Address
                  </h3>
                  <address className="not-italic">
                    PO Box 1884
                    <br />
                    Tempe, AZ 85280
                  </address>
                </div>
              </div>
            </ContentSection>

            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
              <Button to="/volunteer">Get Involved</Button>
            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
