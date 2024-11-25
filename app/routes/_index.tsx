import type { MetaFunction } from "@remix-run/node";

import Riders from "../components/svg/Riders";
import MailchimpInput from "../components/MailchimpInput";

export const meta: MetaFunction = () => {
  return [
    { title: "Open Streets Tempe" },
    { name: "description", content: "Car-free, care-free in Tempe, AZ" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen h-full">
      <main className="grow flex flex-col justify-center items-center h-full min-h-80 bg-pedalpalooza-2">
        <div className="flex flex-col items-center justify-center text-center">
          <Riders
            aria-hidden
            alt="Riders icon"
            width={204}
            height={95}
            className="mb-6 w-36 sm:w-56"
          />
          <h1 className="text-2xl sm:text-5xl font-bold">Open Streets Tempe</h1>
          <h2 className="mt-5 text-lg sm:text-3xl">Coming April 13th, 2025</h2>
        </div>
      </main>

      <div className="bg-eggplant text-white py-6 sm:py-16 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto flex flex-col">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Sign up for updates!
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            <div>
              <p>
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

      <footer className="bg-apricot min-h-64 p-6 sm:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          <div>
            <ul className="space-y-2">
              <li>
                <p>
                  PO Box 1884
                  <br />
                  Tempe, AZ 85280
                </p>
              </li>

              <li>
                <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                  href="https://biketempe.org?utm_source=open-streets-tempe&utm_campaign=landing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.biketempe.org
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-2 sm:mb-4">Get Involved</h4>
            <ul className="space-y-2">
              <li>
                <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                  href="https://biketempe.org/volunteer?utm_source=open-streets-tempe&utm_campaign=landing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Volunteer
                </a>
              </li>

              <li>
                <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                  href="mailto:info@openstreetstempe.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sponsor
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-2 sm:mb-4">Follow us</h4>
            <ul className="space-y-2">
              <li>
                <a
                  className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                  href="https://instagram.com/openstreetstempe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
