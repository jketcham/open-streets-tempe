import type { MetaFunction } from "@remix-run/node";
import { PageLayout } from "~/components/PageLayout";
import { ThemedSection } from "~/components/ThemedSection";
import MailchimpInput from "~/components/MailchimpInput";
import {
  getThemeBackgroundColor,
  type ThemeColor,
  useTheme,
} from "~/components/ThemeProvider";
import { Container } from "~/components/Container";

const pageTheme: ThemeColor = "tachi";

function EventIntro() {
  const theme = useTheme();

  return (
    <div className={`${theme.bg} py-12 sm:py-16`}>
      <Container>
        <div className="flex flex-col items-center text-center">
          <h1
            className={`text-2xl font-bold italic sm:text-5xl ${theme.textOnLight}`}
          >
            Open Streets Tempe
          </h1>
          <div
            className={`mt-4 space-y-2 text-lg sm:text-2xl ${theme.textOnLight}`}
          >
            <p>April 13th, 2025</p>
            <p>10:00 AM - 3:00 PM</p>
            <p>Downtown Tempe</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

function MainContent() {
  const theme = useTheme();

  return (
    <div className={`${theme.bg} py-16 sm:py-24`}>
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col">
          <div
            className={`flex flex-col space-y-12 text-center text-xl sm:text-2xl ${theme.textOnLight}`}
          >
            <div className="space-y-4">
              <p className="text-2xl font-bold sm:text-3xl">
                Experience the city like never before.
              </p>
              <p>
                For one day, our streets transform into vibrant public spaces
                where you can walk, bike, roll, dance, and connect with your
                community.
              </p>
              <p>
                Without the usual traffic, we&apos;ll see just how much is
                possible when we prioritize people over cars—creating spaces
                that bring us closer together.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-2xl font-bold sm:text-3xl">
                This free, family-friendly event is for everyone.
              </p>
              <p>
                Whether you&apos;re biking in a parade, joining a yoga session,
                or simply strolling with friends—come reimagine our streets as
                places for people.
              </p>
              <p>
                Experience the possibilities of a more connected, livable Tempe.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "Open Streets Tempe" },
    {
      name: "description",
      content: "April 13, 2025 – Car-free, care-free in Tempe, AZ",
    },
    {
      name: "theme-color",
      content: getThemeBackgroundColor(pageTheme),
    },
    {
      name: "og:image",
      content: "/site-preview.png",
    },
    {
      name: "twitter:image",
      content: "/site-preview.png",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
  ];
};

export default function Index() {
  return (
    <PageLayout theme={pageTheme}>
      <div className="flex flex-col">
        <EventIntro />

        <main className="bg-pedalpalooza-2 flex h-96 items-center justify-center bg-cover bg-top sm:h-[30rem]" />

        <MainContent />

        <ThemedSection inverse>
          <Container>
            <div className="flex flex-col">
              <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
                Sign up for updates!
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
                <div>
                  <p className="text-lg">
                    Be the first to hear about event updates, volunteer
                    opportunities and more.
                  </p>
                </div>

                <div>
                  <MailchimpInput />
                </div>
              </div>
            </div>
          </Container>
        </ThemedSection>
      </div>
    </PageLayout>
  );
}
