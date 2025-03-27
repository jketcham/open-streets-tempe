import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { PageLayout } from "~/components/PageLayout";
import { PageHead } from "~/components/PageHead";
import { Container } from "~/components/Container";
import { LeadText } from "~/components/LeadText";
import { ContentSection } from "~/components/ContentSection";
import { type ThemeColor } from "~/components/ThemeProvider";
import { generateMetaTags, generateFaviconLinks } from "~/utils/meta";
import { IframeEmbed } from "~/components/IframeEmbed";

const pageTheme: ThemeColor = "apricot";

const pageData = {
  title: "Artist Signup",
  description:
    "Submit your information for Open Streets Tempe artist collaboration.",
} as const;

export const meta: MetaFunction = () => {
  return generateMetaTags({
    title: pageData.title,
    description: pageData.description,
    theme: pageTheme,
    path: "/artists/signup",
  });
};

export const links: LinksFunction = () => {
  return generateFaviconLinks(pageTheme);
};

export default function ArtistSignup() {
  return (
    <PageLayout theme={pageTheme}>
      <PageHead title={pageData.title}>
        <LeadText>{pageData.description}</LeadText>
      </PageHead>

      <main className="grow py-16">
        <Container size="md">
          <div className="prose prose-lg max-w-none">
            <ContentSection title="Form">
              <p>
                Thank you for your interest in Open Streets Tempe! Artist
                signups have ended for this year's event. Check back next year
                for new opportunities.
              </p>
            </ContentSection>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
