import type { MetaFunction } from "@remix-run/node";
import { ContentSection } from "~/components/ContentSection";
import { Container } from "~/components/Container";
import { LeadText } from "~/components/LeadText";
import { PageHead } from "~/components/PageHead";
import { PageLayout } from "~/components/PageLayout";
import { Button, Link } from "~/components/themed";
import { ThemedSection } from "~/components/ThemedSection";
import {
  getThemeBackgroundColor,
  type ThemeColor,
  useTheme,
} from "~/components/ThemeProvider";
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
import { ContentCard } from "~/components/ContentCard";

function WhyItMatters() {
  const theme = useTheme();

  return (
    <div className="max-w-none">
      <div>
        <h2 className={`text-3xl mb-10 font-bold ${theme.textOnLight}`}>
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
    </div>
  );
}

const pageTheme: ThemeColor = "eggplant";

export const meta: MetaFunction = () => {
  return [
    { title: "About - Open Streets Tempe" },
    {
      name: "description",
      content:
        "Learn about Open Streets Tempe and our mission to create vibrant, healthy, and connected communities through car-free street celebrations",
    },
    { name: "theme-color", content: getThemeBackgroundColor(pageTheme) },
  ];
};

export default function About() {
  return (
    <PageLayout theme={pageTheme}>
      <PageHead title="About Open Streets">
        <LeadText>
          Open Streets Tempe transforms our city&apos;s streets into a car-free
          celebration where people can walk, bike, roll, dance, and play. For
          one special day, we&apos;ll create a temporary linear park that
          connects our community in new and exciting ways.
        </LeadText>
      </PageHead>

      <main className="grow py-16 space-y-16">
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
                  description="Local food trucks and artisan vendors line the route"
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
              <ContentSection title="Who We Are">
                <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
                  <div className="shrink-0">
                    <a
                      href="https://www.biketempe.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="/logo-bike-tempe.png"
                        alt="Tempe Bicycle Action Group"
                        className="h-24 w-auto"
                      />
                    </a>
                  </div>
                  <p>
                    Open Streets Tempe is a program of{" "}
                    <a
                      href="https://www.biketempe.org"
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
                    src="/logo-tempe.png"
                    alt="City of Tempe"
                    className="h-24 w-auto object-contain grayscale transition-all hover:grayscale-0"
                  />
                </a>
                <a
                  href="https://www.downtowntempe.com?utm_source=openstreetstempe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <img
                    src="/logo-dta.png"
                    alt="Downtown Tempe Authority"
                    className="h-24 w-auto object-contain grayscale transition-all hover:grayscale-0"
                  />
                </a>
                <a
                  href="https://www.tempechamber.org?utm_source=openstreetstempe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <img
                    src="/logo-chamber.png"
                    alt="Tempe Chamber of Commerce"
                    className="h-24 w-auto object-contain grayscale transition-all hover:grayscale-0"
                  />
                </a>
                <a
                  href="https://www.tempetourism.com?utm_source=openstreetstempe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <img
                    src="/logo-tourism.png"
                    alt="Tempe Tourism"
                    className="h-24 w-auto object-contain grayscale transition-all hover:grayscale-0"
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
