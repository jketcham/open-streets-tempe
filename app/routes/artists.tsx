import type { MetaFunction } from "@remix-run/node";
import { ContentSection } from "~/components/ContentSection";
import { Container } from "~/components/Container";
import { LeadText } from "~/components/LeadText";
import { PageHead } from "~/components/PageHead";
import { PageLayout } from "~/components/PageLayout";
import { ContentCard } from "~/components/ContentCard";
import { Link } from "~/components/themed";
import {
  PaintBrushIcon,
  MusicalNoteIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import {
  getThemeBackgroundColor,
  type ThemeColor,
} from "~/components/ThemeProvider";
import { eventJsonLd } from "~/data/event";

const pageTheme: ThemeColor = "apricot";

const pageData = {
  title: "Artists at Open Streets Tempe",
  description:
    "Calling all artists! Help transform Downtown Tempe's streets into an interactive art experience during our Open Streets celebration.",
  keywords:
    "artist opportunities, street art, public art, community art, Tempe artists, street festival art, interactive art",
} as const;

export const meta: MetaFunction = () => {
  return [
    { title: "Call to Artists - Open Streets Tempe" },
    { name: "description", content: pageData.description },
    { name: "theme-color", content: getThemeBackgroundColor(pageTheme) },
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
      name: "Open Streets Tempe - Artist Participation",
      description:
        "Artists will help transform the streets into vibrant spaces with performances, installations, and interactive art experiences.",
      offers: {
        "@type": "Offer",
        name: "Artist Participation",
        description:
          "Opportunities for artists to showcase their work and engage with the community",
      },
    },
    potentialAction: [
      {
        "@type": "ViewAction",
        name: "Contact Artist Team",
        target: "mailto:artists@openstreetstempe.org",
      },
    ],
  },
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

            <div className="prose prose-lg max-w-none">
              <ContentSection title="Selection Process">
                <p>
                  Artists will be selected based on their proposal&apos;s
                  creativity, feasibility, and alignment with the event&apos;s
                  goals of creating an engaging, inclusive community experience.
                </p>
              </ContentSection>
            </div>

            <div className="mt-12 border-t-4 border-current pt-8 text-center">
              <Link href="mailto:artists@openstreetstempe.org">
                Contact our artist team at artists@openstreetstempe.org
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
