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
import {
  CalendarIcon,
  MapPinIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import {
  ResponsiveImage,
  generatePreloadLinks,
} from "~/components/ResponsiveImage";
import { Link } from "@remix-run/react";
import { RouteMap } from "~/components/svg";
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

const sponsorsData = {
  data: [
    {
      name: "Pedal Haus Brewery",
      website: "https://www.pedalhausbrewery.com",
      logoPath: "/images/logo-edit-pedal-haus-640w.png",
    },
    {
      name: "Landings Credit Union",
      website: "https://www.landingscu.org",
      logoPath: "/images/logo-edit-landings-580w.png",
    },
  ],
};

const partnersData = {
  data: [
    {
      name: "City of Tempe",
      website: "https://www.tempe.gov?utm_source=openstreetstempe",
      logoPath: "/images/logo-edit-tempe-640w.png",
    },
    {
      name: "Downtown Tempe Authority",
      website: "https://www.downtowntempe.com?utm_source=openstreetstempe",
      logoPath: "/images/logo-edit-dta-640w.png",
    },
    {
      name: "Tempe Chamber of Commerce",
      website: "https://www.tempechamber.org?utm_source=openstreetstempe",
      logoPath: "/images/logo-edit-chamber-640w.png",
    },
    {
      name: "Tempe Tourism Office",
      website: "https://www.tempetourism.com",
      logoPath: "/images/logo-edit-tourism-640w.png",
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
    <div className={`${theme.bg} pb-16 pt-8 sm:pt-12`}>
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
                <RouteMap
                  className="w-full rounded-lg shadow-lg"
                  aria-label="Open Streets Tempe Route Map"
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}

function RaffleSection() {
  const theme = useTheme();

  return (
    <div className={`${theme.bgInverse} ${theme.textInverse} py-12`}>
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg md:flex-row">
              <div className="flex items-center justify-center bg-apricot p-8 md:w-1/3">
                <div className="flex flex-col items-center text-center">
                  <TrophyIcon className="mb-4 h-16 w-16 text-apricot-900" />
                  <h2 className="mb-2 text-2xl font-bold text-apricot-900">
                    Win a Lectric{" "}
                    <span className="whitespace-nowrap">E-Bike!</span>
                  </h2>
                  <p className="font-bold text-apricot-900">
                    Drawing on April 13th{" "}
                    <span className="whitespace-nowrap">at the event</span>
                  </p>
                </div>
              </div>
              <div className="p-8 md:w-2/3">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex flex-col gap-4 md:flex-row">
                    <div className="md:w-2/3">
                      <h3 className="mb-4 text-xl font-bold text-gray-900">
                        Every Raffle Ticket Helps
                      </h3>
                      <p className="mb-4 text-gray-700">
                        Buy raffle tickets for your chance to win a brand new
                        Lectric e-bike — and support Open Streets Tempe while
                        you’re at it.
                      </p>
                    </div>
                    <div className="flex justify-center md:w-1/3">
                      <div className="w-auto overflow-hidden rounded-md shadow-md sm:h-32 md:h-auto">
                        <ResponsiveImage
                          basePath="/images/raffle-ebike"
                          alt="Lectric E-Bike"
                          className="h-full w-full object-cover"
                          maxSize={1024}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link
                      to="/raffle"
                      className={`inline-block rounded-md bg-apricot px-6 py-3 font-bold text-apricot-900 transition hover:opacity-90`}
                    >
                      Get Raffle Tickets
                    </Link>
                  </div>
                </div>
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
    <div className={`${theme.bg} pb-12 pt-16`}>
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

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
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

function SponsorsSection() {
  const theme = useTheme();

  return (
    <div className={`${theme.bg} pb-16 pt-8 sm:pb-24`}>
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-4xl text-center">
            <h2
              className={`mb-8 font-display text-2xl font-bold sm:text-3xl ${theme.textOnLight}`}
            >
              Our Sponsors
            </h2>

            <div className="grid grid-cols-1 gap-8 xs:grid-cols-2 sm:grid-cols-3 md:gap-12">
              {sponsorsData.data.map((sponsor) => (
                <div key={sponsor.name} className="flex flex-col items-center">
                  <a
                    href={`${sponsor.website}?utm_source=openstreetstempe&utm_medium=sponsor`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-48 w-48 items-center justify-center bg-white p-6 shadow-md transition-all hover:shadow-lg"
                    aria-label={`Visit ${sponsor.name} website`}
                  >
                    <img
                      src={sponsor.logoPath}
                      alt={sponsor.name}
                      className="max-h-full max-w-[7rem] object-contain transition-all"
                    />
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <a
                href="/sponsor"
                className={`inline-block rounded-md ${theme.bgInverse} ${theme.textInverse} px-6 py-3 font-medium transition hover:opacity-90`}
              >
                Become a Sponsor
              </a>
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
    ...generatePreloadLinks("/images/raffle-ebike", 1024),
  ];
};

export default function Index() {
  return (
    <PageLayout theme={pageTheme}>
      <div className="flex flex-col">
        <EventIntro />
        <HeroImage />
        <MainContent />
        <RaffleSection />
        <PartnersSection />
        <SponsorsSection />
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
