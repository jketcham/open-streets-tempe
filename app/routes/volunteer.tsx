import type { MetaFunction } from "@remix-run/node";
import { ContentSection } from "~/components/ContentSection";
import { Container } from "~/components/Container";
import { LeadText } from "~/components/LeadText";
import { PageHead } from "~/components/PageHead";
import { PageLayout } from "~/components/PageLayout";
import { ContentCard } from "~/components/ContentCard";
import { Button, Link } from "~/components/themed";
import {
  MapPinIcon,
  ChartBarIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import {
  getThemeBackgroundColor,
  type ThemeColor,
} from "~/components/ThemeProvider";

const pageTheme: ThemeColor = "tachi";

export const meta: MetaFunction = () => {
  return [
    { title: "Volunteer - Open Streets Tempe" },
    {
      name: "description",
      content: "Volunteer opportunities for Open Streets Tempe",
    },
    { name: "theme-color", content: getThemeBackgroundColor(pageTheme) },
  ];
};

export default function Volunteer() {
  return (
    <PageLayout theme={pageTheme}>
      <PageHead title="Volunteer with Open Streets">
        <LeadText>
          Transform Tempe&apos;s streets into a vibrant community space! Every
          volunteer plays a vital role in making our car-free event successful
          and enjoyable for everyone.
        </LeadText>
      </PageHead>

      <main className="grow py-16">
        <Container size="md">
          <div>
            <div className="prose prose-lg max-w-none">
              <ContentSection title="Why Volunteer?">
                <ul>
                  <li>
                    Be part of Tempe&apos;s first Open Streets celebration
                  </li>
                  <li>Meet neighbors and make new friends</li>
                  <li>Get a free event t-shirt</li>
                  <li>
                    Help create a more sustainable and connected community
                  </li>
                  <li>
                    Volunteer half the day, enjoy the event the other half!
                  </li>
                </ul>
              </ContentSection>
            </div>

            <ContentSection title="Volunteer Opportunities">
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <ContentCard
                  icon={<WrenchScrewdriverIcon className="size-12" />}
                  title="Pre & Post Work"
                  description="Help with setup, teardown, and organization before and after the event. Perfect for those who like working behind the scenes to make everything run smoothly."
                  meta={
                    <p className="flex items-center gap-2 text-sm text-gray-600">
                      <ClockIcon className="h-4 w-4" />
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
                      <ClockIcon className="h-4 w-4" />
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
                      <ClockIcon className="h-4 w-4" />
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
                      <ClockIcon className="h-4 w-4" />
                      4-hour shifts during event
                    </p>
                  }
                />
              </div>
            </ContentSection>

            <div className="prose prose-lg max-w-none">
              <ContentSection title="What to Expect">
                <ul>
                  <li>Training and orientation before the event</li>
                  <li>Clear instructions and support during your shift</li>
                  <li>Free event t-shirt and refreshments</li>
                  <li>
                    A fun, rewarding experience giving back to your community
                  </li>
                </ul>
              </ContentSection>
            </div>

            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button to="/volunteer/signup">Sign Up to Volunteer</Button>
              <Link href="mailto:volunteer@openstreetstempe.org">
                Contact our volunteer team
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
