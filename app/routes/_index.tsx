import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { PageLayout } from "~/components/PageLayout";
import { ThemedSection } from "~/components/ThemedSection";
import MailchimpInput from "~/components/MailchimpInput";
import { motion, AnimatePresence } from "motion/react";
import { type ThemeColor, useTheme } from "~/components/ThemeProvider";
import { Container } from "~/components/Container";
import { eventData, eventJsonLd } from "~/data/event";
import { generateMetaTags, generateFaviconLinks } from "~/utils/meta";
import { FadeIn } from "~/components/FadeIn";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import {
  ResponsiveImage,
  generatePreloadLinks,
} from "~/components/ResponsiveImage";

const pageTheme: ThemeColor = "tachi";

const activities = [
  "Bike and Explore",
  "Discover Local Art",
  "Walk with Friends",
  "Play and Connect",
  "Dance with Joy",
  "Run and Relax",
  "Transform the Streets",
  "Create and Imagine",
  "Celebrate Community",
  "Laugh and Play",
  "Take it Easy",
  "Ride and Roam",
  "Share the Moment",
  "Skate and Stroll",
];

function AnimatedText() {
  const [index, setIndex] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.h1
        key={activities[index]}
        className={`mb-4 text-4xl font-bold italic sm:text-5xl ${theme.textOnLight} ml-[10px] overflow-visible`}
        style={{ paddingRight: "0.1em" }}
      >
        <div className="overflow-visible">
          {activities[index].split(" ").map((word, wordIndex, words) => (
            <span
              key={wordIndex}
              className="overflow-visible whitespace-nowrap"
            >
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={`${wordIndex}-${charIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.3,
                    delay: (wordIndex * word.length + charIndex) * 0.03,
                    ease: "easeOut",
                  }}
                  className="relative ml-[-10px] inline-block overflow-visible pr-[10px]"
                  style={{ transform: "translateZ(0)" }}
                >
                  {char}
                </motion.span>
              ))}
              {wordIndex < words.length - 1 && (
                <motion.span
                  key={`${wordIndex}-space`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: (wordIndex * word.length + word.length) * 0.03,
                    ease: "easeOut",
                  }}
                  className="inline-block overflow-visible"
                >
                  {"\u00A0"}
                </motion.span>
              )}
            </span>
          ))}
        </div>
      </motion.h1>
    </AnimatePresence>
  );
}

function EventIntro() {
  const theme = useTheme();

  return (
    <div className={`${theme.bg} pb-8 pt-16 sm:pb-12 sm:pt-24`}>
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
          <div className="md:col-span-3 lg:col-span-2">
            <div className="min-h-[8.5rem] pb-2 md:min-h-40">
              <AnimatedText />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                className={`text-2xl sm:text-3xl ${theme.textOnLight}`}
              >
                at <span className="font-semibold">Open Streets Tempe</span>
              </motion.p>
            </div>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
              className={`${theme.bgInverse} ${theme.textInverse} space-y-2 rounded-md p-4 text-lg sm:p-6 sm:text-2xl`}
            >
              <div className="flex items-start gap-3">
                <CalendarIcon className="mt-1 size-7 shrink-0" />
                <div>
                  <p>April 13th, 2025</p>
                  <p className="-mt-1 text-base opacity-90 sm:text-xl">
                    10 AM – 3 PM
                  </p>
                </div>
              </div>
              <div className="mt-2 flex items-start gap-3">
                <MapPinIcon className="mt-1 size-7 shrink-0" />
                <p>Downtown Tempe</p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function MainContent() {
  const theme = useTheme();

  return (
    <div className={`${theme.bg} pb-16 pt-8 sm:pb-24 sm:pt-12`}>
      <Container>
        <FadeIn>
          <div className="mx-auto flex max-w-4xl flex-col">
            <div
              className={`flex flex-col space-y-20 text-center text-xl sm:text-2xl ${theme.textOnLight}`}
            >
              <div className="space-y-4">
                <p className="font-display text-2xl font-bold sm:text-3xl">
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
                <p className="font-display text-2xl font-bold sm:text-3xl">
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

function HeroImage() {
  const theme = useTheme();

  return (
    <main className="relative flex h-96 items-center justify-center sm:h-[30rem]">
      <div className="absolute inset-0">
        <ResponsiveImage
          basePath="/images/pedalpalooza-overhead"
          alt="Overhead view of Open Streets event"
          className="size-full object-cover"
          objectPosition="center 25%"
          priority
        />
      </div>
      <div
        className={`absolute top-0 h-8 w-full ${theme.bg} sm:h-16`}
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)",
        }}
      />
      <div
        className={`absolute bottom-0 h-8 w-full ${theme.bg} sm:h-16`}
        style={{
          clipPath: "polygon(0 100%, 0 0, 100% 100%, 100% 100%)",
        }}
      />
    </main>
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
  return [
    ...generateFaviconLinks(pageTheme),
    ...generatePreloadLinks("/images/pedalpalooza-overhead"),
  ];
};

export default function Index() {
  return (
    <PageLayout theme={pageTheme}>
      <div className="flex flex-col">
        <EventIntro />
        <HeroImage />
        <MainContent />
        <ThemedSection inverse>
          <Container>
            <div className="flex flex-col">
              <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
                Sign up for updates!
              </h2>
              <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
                <div className="flex-1">
                  <p className="text-lg">
                    Be the first to hear about event updates, volunteer
                    opportunities and more.
                  </p>
                </div>
                <div>
                  <MailchimpInput variant="dark" />
                </div>
              </div>
            </div>
          </Container>
        </ThemedSection>
      </div>
    </PageLayout>
  );
}
