import type { MetaFunction } from "@remix-run/node";
import { ContentSection } from "~/components/ContentSection";
import { Container } from "~/components/Container";
import { LeadText } from "~/components/LeadText";
import { PageHead } from "~/components/PageHead";
import { PageLayout } from "~/components/PageLayout";
import { ContentCard } from "~/components/ContentCard";
import { Button, Link } from "~/components/themed";
import {
  PaintBrushIcon,
  MusicalNoteIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import {
  getThemeBackgroundColor,
  type ThemeColor,
} from "~/components/ThemeProvider";

const pageTheme: ThemeColor = "apricot";

export const meta: MetaFunction = () => {
  return [
    { title: "Call to Artists - Open Streets Tempe" },
    {
      name: "description",
      content: "Artist opportunities for Open Streets Tempe",
    },
    { name: "theme-color", content: getThemeBackgroundColor(pageTheme) },
  ];
};

export default function Artists() {
  return (
    <PageLayout theme={pageTheme}>
      <PageHead title="Artists at Open Streets">
        <LeadText>
          Help transform Tempe&apos;s streets into an open-air gallery and
          performance space! We&apos;re seeking artists of all disciplines to
          create, perform, and engage with our community.
        </LeadText>
      </PageHead>

      <main className="grow py-16">
        <Container size="md">
          <div>
            <div className="prose prose-lg max-w-none">
              <ContentSection title="About the Project">
                <p>
                  Open Streets Tempe celebrates our community&apos;s creativity
                  and culture. We&apos;re looking for original artwork that
                  captures the spirit of car-free streets, active
                  transportation, and community connection.
                </p>
                <p>
                  Selected artwork will be featured on event t-shirts, posters,
                  and other promotional materials, giving artists significant
                  visibility throughout Tempe and beyond.
                </p>
              </ContentSection>
            </div>

            <ContentSection title="Opportunities">
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <ContentCard
                  icon={<PaintBrushIcon className="size-12" />}
                  title="Event Merchandise"
                  description="Design artwork for our official event t-shirts and merchandise. We're looking for vibrant, inclusive designs that celebrate active streets."
                />
                <ContentCard
                  icon={<PaintBrushIcon className="size-12" />}
                  title="Event Posters"
                  description="Create eye-catching posters that will be displayed throughout Tempe to promote the event and capture its spirit."
                />
                <ContentCard
                  icon={<MusicalNoteIcon className="size-12" />}
                  title="Live Art"
                  description="Participate in our event by creating art live during Open Streets Tempe. Show your creative process and engage with the community."
                />
                <ContentCard
                  icon={<SpeakerWaveIcon className="size-12" />}
                  title="Compensation"
                  description="We value artists' work and provide fair compensation for selected designs and participation."
                />
              </div>
            </ContentSection>

            <div className="prose prose-lg max-w-none">
              <ContentSection title="How to Apply">
                <p>
                  Submit your portfolio and a brief statement about why
                  you&apos;d like to contribute to Open Streets Tempe.
                  We&apos;ll review submissions on a rolling basis and contact
                  selected artists to discuss next steps.
                </p>
              </ContentSection>
            </div>

            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button to="/artists/apply">Apply as an Artist</Button>
              <Link href="mailto:artists@openstreetstempe.org">
                Contact our artist team
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
