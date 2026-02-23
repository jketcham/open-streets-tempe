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
import { EventArtwork2026 } from "~/components/svg";
const pageTheme: ThemeColor = "white";

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

const partnersData = {
  data: [
    {
      name: "City of Tempe",
      website: "https://www.tempe.gov",
      logoPath: "/images/logo-edit-tempe-640w.png",
    },
    {
      name: "Downtown Tempe Authority",
      website: "https://www.downtowntempe.com",
      logoPath: "/images/logo-edit-dta-640w.png",
    },
    {
      name: "Tempe Chamber of Commerce",
      website: "https://www.tempechamber.org",
      logoPath: "/images/logo-edit-chamber-640w.png",
    },
    {
      name: "Tempe Tourism Office",
      website: "https://www.tempetourism.com",
      logoPath: "/images/logo-edit-tourism-640w.png",
    },
    {
      name: "Tempe Arts & Music Coalition",
      website: "https://www.tempeartsandmusic.org/",
      logoPath: "/images/logo-edit-tamc-640w.png",
    },
  ],
};

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
    <div className="bg-white pb-8 pt-16 sm:pb-12 sm:pt-24">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Artwork - shows first on mobile, center on desktop */}
          <div className="flex items-center justify-center md:order-last lg:order-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="w-full max-w-sm lg:max-w-none"
            >
              <EventArtwork2026 className="h-auto w-full" />
            </motion.div>
          </div>

          {/* Animated text */}
          <div className="md:order-first">
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

          {/* Date/time info box */}
          <div className="md:order-last">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
              className={`${theme.bgInverse} ${theme.textInverse} space-y-2 rounded-md p-4 text-lg sm:p-6 sm:text-2xl`}
            >
              <div className="flex items-start gap-3">
                <CalendarIcon className="mt-1 size-7 shrink-0" />
                <div>
                  <p>Sunday, April 12, 2026</p>
                  <p className="-mt-1 text-base italic opacity-90 sm:text-xl">
                    10 AM – 3 PM
                  </p>
                </div>
              </div>
              <div className="mt-2 flex items-start gap-3">
                <MapPinIcon className="mt-1 size-7 shrink-0" />
                <div>
                  <p>Downtown Tempe</p>
                  <p className="-mt-1 text-base italic opacity-90 sm:text-xl">
                    7th St & Mill Ave
                  </p>
                </div>
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
    <div className="bg-white pb-16 pt-8 sm:pt-12">
      <Container>
        <FadeIn>
          <div className="mx-auto flex max-w-6xl flex-col">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div className={`flex flex-col space-y-20 ${theme.textOnLight}`}>
                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-bold">
                    Experience the city like never before.
                  </h2>
                  <p className="text-lg">
                    For one day, our streets transform into vibrant public
                    spaces where you can walk, bike, roll, dance, and connect
                    with your community.
                  </p>
                  <p className="text-lg">
                    Without the usual traffic, we&apos;ll see just how much is
                    possible when we prioritize people over cars—creating spaces
                    that bring us closer together.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-bold">
                    This free, family-friendly event is for everyone.
                  </h2>
                  <p className="text-lg">
                    Whether you&apos;re biking in a parade, joining a yoga
                    session, or simply strolling with friends—come reimagine our
                    streets as places for people.
                  </p>
                  <p className="text-lg">
                    Experience the possibilities of a more connected, livable
                    Tempe.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-display text-2xl font-bold">
                    Part of Tempe Bike Month
                  </h2>
                  <p className="text-lg">
                    Open Streets Tempe is an official City of Tempe supported
                    event.
                  </p>
                  <p className="text-lg">
                    For more information, visit the City of Tempe&apos;s Tempe
                    Bike Month page.
                  </p>
                  <a
                    href="http://www.tempe.gov/OpenStreets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block rounded-md ${theme.bgInverse} ${theme.textInverse} px-6 py-3 text-base font-medium transition hover:opacity-90`}
                  >
                    Tempe Bike Month
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <ResponsiveImage
                    basePath="/images/2026-event-map"
                    alt="2026 Open Streets Tempe event route map"
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}

function BikeParadeSection() {
  const theme = useTheme();

  return (
    <div className="bg-white pb-16 pt-8">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-6xl">
            <h2
              className={`mb-4 font-display text-2xl font-bold sm:text-3xl ${theme.textOnLight}`}
            >
              Bike Parade
            </h2>
            <p className={`mb-8 text-lg ${theme.textOnLight}`}>
              Kick off Open Streets Tempe with a community bike parade! Check
              out the route and schedule below.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="overflow-hidden rounded-xl shadow-lg">
                <ResponsiveImage
                  basePath="/images/2026-bike-parade-map"
                  alt="2026 Open Streets Tempe bike parade route map"
                />
              </div>
              <div className="overflow-hidden rounded-xl shadow-lg">
                <ResponsiveImage
                  basePath="/images/2026-bike-parade-schedule"
                  alt="2026 Open Streets Tempe bike parade schedule"
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}

function PartnersSection() {
  const theme = useTheme();

  return (
    <div className="bg-white pb-24 pt-16">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-4xl text-center">
            <h2
              className={`mb-8 font-display text-2xl font-bold sm:text-3xl ${theme.textOnLight}`}
            >
              Our Partners
            </h2>
            <p className={`mb-12 text-xl ${theme.textOnLight}`}>
              We&apos;re proud to partner with these organizations to make Open
              Streets Tempe possible:
            </p>

            <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
              {partnersData.data.map((partner) => (
                <div key={partner.name} className="flex flex-col items-center">
                  <a
                    href={`${partner.website}?utm_source=openstreetstempe&utm_medium=partner`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                    aria-label={`Visit ${partner.name} website`}
                  >
                    <img
                      src={partner.logoPath}
                      alt={partner.name}
                      className="h-24 w-auto object-contain grayscale transition-all hover:grayscale-0"
                    />
                  </a>
                </div>
              ))}
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
        className={`absolute top-0 -mt-1 h-8 w-full ${theme.bg} sm:h-16`}
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
    description: `Coming in 2026 – ${eventData.description}`,
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
        <BikeParadeSection />
        <PartnersSection />
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
