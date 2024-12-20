import type { MetaFunction } from "@remix-run/node";

import Riders from "~/components/svg/Riders";
import MailchimpInput from "~/components/MailchimpInput";

export const meta: MetaFunction = () => {
  return [
    { title: "Open Streets Tempe" },
    {
      name: "description",
      content: "April 13, 2025 – Car-free, care-free in Tempe, AZ",
    },
    {
      name: "theme-color",
      content: "#C9CF6B",
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
    <div className="flex h-full min-h-screen flex-col">
      <main className="bg-pedalpalooza-2 flex h-full min-h-96 grow flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          <Riders aria-hidden className="mb-6 w-36 sm:w-56" />
          <h1 className="text-2xl font-bold italic sm:text-5xl">
            Open Streets Tempe
          </h1>
          <h2 className="mt-5 text-lg sm:text-3xl">Coming April 13th, 2025</h2>
        </div>
      </main>

      <div className="px-6 py-6 sm:px-10 sm:py-16">
        <div className="mx-auto flex max-w-2xl flex-col">
          <div className="flex flex-col space-y-8 text-center text-lg">
            <p>
              Open Streets Tempe invites you to experience the city like never
              before. For one day, our streets transform into vibrant public
              spaces where you can walk, bike, roll, dance, and connect with
              your community. Without the usual traffic, we’ll see just how much
              is possible when we prioritize people over cars—creating spaces
              that bring us closer together.
            </p>

            <p>
              This free, family-friendly event is for everyone—whether you're
              biking in a parade, joining a yoga session, or simply strolling
              with friends. Come reimagine our streets as places for people and
              experience the possibilities of a more connected, livable Tempe.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-eggplant px-6 py-6 text-white sm:px-10 sm:py-16">
        <div className="mx-auto flex max-w-6xl flex-col">
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
      </div>
    </div>
  );
}
