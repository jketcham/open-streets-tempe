import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { PageLayout } from "~/components/PageLayout";
import { PageHead } from "~/components/PageHead";
import { Container } from "~/components/Container";
import { LeadText } from "~/components/LeadText";
import { ContentSection } from "~/components/ContentSection";
import { type ThemeColor } from "~/components/ThemeProvider";
import { generateMetaTags, generateFaviconLinks } from "~/utils/meta";
import { IframeEmbed } from "~/components/IframeEmbed";

const pageTheme: ThemeColor = "eggplant";

const pageData = {
  title: "Sponsor Signup",
  description: "Sign up to sponsor Open Streets Tempe",
} as const;

export const meta: MetaFunction = () => {
  return generateMetaTags({
    title: pageData.title,
    description: pageData.description,
    theme: pageTheme,
    path: "/sponsor/signup",
  });
};

export const links: LinksFunction = () => {
  return generateFaviconLinks(pageTheme);
};

export default function SponsorSignup() {
  return (
    <PageLayout theme={pageTheme}>
      <PageHead title={pageData.title}>
        <LeadText>{pageData.description}</LeadText>
      </PageHead>

      <main className="grow py-16">
        <Container size="md">
          <div className="prose prose-lg max-w-none">
            <ContentSection title="Form">
              <IframeEmbed
                title="Sponsor Signup Form"
                src="https://airtable.com/embed/appTU8SJ3COPcDzOj/pag1x38dhWdAbAZl8/form"
                height={900}
                skeletonLoader="form"
              />
            </ContentSection>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
