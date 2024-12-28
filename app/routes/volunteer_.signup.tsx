import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { PageLayout } from "~/components/PageLayout";
import { PageHead } from "~/components/PageHead";
import { Container } from "~/components/Container";
import { LeadText } from "~/components/LeadText";
import { ContentSection } from "~/components/ContentSection";
import { type ThemeColor } from "~/components/ThemeProvider";
import { generateMetaTags, generateFaviconLinks } from "~/utils/meta";
import { IframeEmbed } from "~/components/IframeEmbed";

const pageTheme: ThemeColor = "tachi";

const pageData = {
  title: "Volunteer Signup",
  description: "Sign up to volunteer for Open Streets Tempe.",
} as const;

export const meta: MetaFunction = () => {
  return generateMetaTags({
    title: pageData.title,
    description: pageData.description,
    theme: pageTheme,
    path: "/volunteer/signup",
  });
};

export const links: LinksFunction = () => {
  return generateFaviconLinks(pageTheme);
};

export default function VolunteerSignup() {
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
                title="Volunteer Signup Form"
                src="https://airtable.com/embed/appTU8SJ3COPcDzOj/pagMYnT41sxJi5b09/form"
                skeletonLoader="form"
                height={1000}
              />
            </ContentSection>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
