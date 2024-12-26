import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Container } from "~/components/Container";
import { LeadText } from "~/components/LeadText";
import { PageHead } from "~/components/PageHead";
import { PageLayout } from "~/components/PageLayout";
import { type ThemeColor } from "~/components/ThemeProvider";
import { generateMetaTags, generateFaviconLinks } from "~/utils/meta";
import MailchimpInput from "~/components/MailchimpInput";

const pageTheme: ThemeColor = "tachi";

const pageData = {
  title: "Newsletter Signup",
  description:
    "Stay up to date with Open Streets Tempe! Get the latest news about events, volunteer opportunities, and ways to get involved.",
  keywords:
    "newsletter signup, email updates, event updates, community news, Tempe events, volunteer opportunities",
} as const;

export const meta: MetaFunction = () => {
  return generateMetaTags({
    title: pageData.title,
    description: pageData.description,
    theme: pageTheme,
    path: "/newsletter",
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
  },
};

export default function Newsletter() {
  return (
    <PageLayout theme={pageTheme}>
      <PageHead title={pageData.title}>
        <LeadText>{pageData.description}</LeadText>
      </PageHead>

      <main className="grow py-16">
        <Container size="md">
          <div className="mx-auto max-w-2xl">
            <div className="prose prose-lg max-w-none">
              <p>Join our mailing list to receive updates about:</p>
              <ul>
                <li>Event announcements and important dates</li>
                <li>Volunteer opportunities</li>
                <li>Artist and vendor applications</li>
                <li>Sponsorship opportunities</li>
                <li>Community news and updates</li>
              </ul>
            </div>

            <div className="mt-8">
              <MailchimpInput />
            </div>

            <div className="mt-8 text-sm text-gray-600">
              <p>
                We respect your privacy and will never share your information.
                You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
