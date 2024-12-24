import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { PageLayout } from "~/components/PageLayout";
import { ThemedSection } from "~/components/ThemedSection";
import MailchimpInput from "~/components/MailchimpInput";
import { motion } from "motion/react";
import { type ThemeColor, useTheme } from "~/components/ThemeProvider";
import { Container } from "~/components/Container";
import { eventData, eventJsonLd } from "~/data/event";
import { generateMetaTags, generateFaviconLinks } from "~/utils/meta";
import { FadeIn } from "~/components/FadeIn";

const pageTheme: ThemeColor = "tachi";

function EventIntro() {
  const theme = useTheme();

  return (
    <div className={`${theme.bg} py-12 sm:py-16`}>
      <Container>
        <div className="flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`text-2xl font-bold italic sm:text-5xl ${theme.textOnLight}`}
          >
            Play, Walk, Bike
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className={`my-2 text-xl sm:text-3xl ${theme.textOnLight}`}
          >
            at Open Streets Tempe
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
            className={`mt-4 space-y-2 text-lg sm:text-2xl ${theme.textOnLight}`}
          >
            <p>April 13th, 2025</p>
            <p>10:00 AM - 3:00 PM</p>
            <p>Downtown Tempe</p>
          </motion.div>
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
        <FadeIn>
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
                  Whether you&apos;re biking in a parade, joining a yoga
                  session, or simply strolling with friends—come reimagine our
                  streets as places for people.
                </p>
                <p>
                  Experience the possibilities of a more connected, livable
                  Tempe.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}

export const handle = {
  jsonLd: {
    ...eventJsonLd,
    potentialAction: [
      {
        "@type": "ViewAction",
        name: "Learn More",
        target: "https://openstreetstempe.org/about",
      },
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

export const meta: MetaFunction = () => {
  return generateMetaTags({
    title: eventData.name,
    description: `April 13, 2025 – ${eventData.description}`,
    theme: pageTheme,
    path: "/",
  });
};

export const links: LinksFunction = () => {
  return generateFaviconLinks(pageTheme);
};

export default function Index() {
  return (
    <PageLayout theme={pageTheme}>
      <div className="flex flex-col">
        <EventIntro />
        <main className="relative flex h-96 items-center justify-center sm:h-[30rem]">
          <picture className="absolute inset-0">
            <source
              type="image/webp"
              media="(min-width: 1921px)"
              srcSet="/images/pedalpalooza-overhead-2560w.webp"
            />
            <source
              type="image/webp"
              media="(min-width: 1025px) and (max-width: 1920px)"
              srcSet="/images/pedalpalooza-overhead-1920w.webp"
            />
            <source
              type="image/webp"
              media="(min-width: 769px) and (max-width: 1024px)"
              srcSet="/images/pedalpalooza-overhead-1024w.webp"
            />
            <source
              type="image/webp"
              media="(min-width: 641px) and (max-width: 768px)"
              srcSet="/images/pedalpalooza-overhead-768w.webp"
            />
            <source
              type="image/webp"
              media="(max-width: 640px)"
              srcSet="/images/pedalpalooza-overhead-640w.webp"
            />
            <img
              src="/images/pedalpalooza-overhead-640w.jpg"
              alt="Overhead view of Open Streets event"
              className="size-full object-cover"
              style={{ objectPosition: "center 25%" }}
              {...({ fetchpriority: "high" } as { fetchpriority: "high" })}
              decoding="async"
              loading="eager"
            />
          </picture>
        </main>
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
