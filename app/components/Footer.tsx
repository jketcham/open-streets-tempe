import { Link } from "@remix-run/react";
import { useTheme } from "./ThemeProvider";
import { Container } from "./Container";
import BikeTempeLogo from "./svg/BikeTempeLogo";

export default function Footer() {
  const theme = useTheme();

  return (
    <footer className={`${theme.bg} py-12 ${theme.textOnLight}`}>
      <Container>
        <div className="mb-12 grid grid-cols-1 gap-12 border-b-4 border-current pb-12 sm:grid-cols-[1.5fr,1fr] lg:grid-cols-3">
          <div className="flex flex-row items-center gap-4 border-b-4 border-current pb-12 sm:border-b-0 sm:border-r-4 sm:pb-0 sm:pr-6 lg:col-span-2 lg:pr-12">
            <a
              href="https://www.biketempe.org?utm_source=openstreetstempe"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 hover:opacity-90"
              aria-label="Visit Tempe Bicycle Action Group website"
            >
              <BikeTempeLogo className="h-20 w-auto fill-current" />
            </a>
            <p className="text-lg">
              A program of{" "}
              <a
                href="https://www.biketempe.org?utm_source=openstreetstempe"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 underline underline-offset-4 hover:opacity-90"
              >
                Tempe Bicycle Action Group,
              </a>{" "}
              a 501(c)(3) nonprofit organization
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg">Our Partners</p>
            <div className="flex flex-row items-center justify-center gap-6">
              <a
                href="https://www.tempe.gov?utm_source=openstreetstempe"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 hover:opacity-90"
              >
                <div className="relative">
                  <img
                    src="/images/logo-tempe-640w.png"
                    alt="City of Tempe"
                    className="relative h-20 w-auto object-contain opacity-70 brightness-0"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className={`absolute inset-0 ${theme.bg} opacity-30`}
                  ></div>
                </div>
              </a>
              <a
                href="https://www.downtowntempe.com?utm_source=openstreetstempe"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 hover:opacity-90"
              >
                <div className="relative">
                  <img
                    src="/images/logo-dta-640w.png"
                    alt="Downtown Tempe Authority"
                    className="relative h-20 w-auto object-contain opacity-70 brightness-0"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className={`absolute inset-0 ${theme.bg} opacity-30`}
                  ></div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">About</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:opacity-90">
                  Open Streets
                </Link>
              </li>
              <li>
                <Link to="/about#partners" className="hover:opacity-90">
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/about#contact" className="hover:opacity-90">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/volunteer" className="hover:opacity-90">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/artists" className="hover:opacity-90">
                  Artists
                </Link>
              </li>
              <li>
                <Link to="/sponsor" className="hover:opacity-90">
                  Sponsor
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:opacity-90">
                  Donate
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.instagram.com/openstreetstempe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-90"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/os_tempe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-90"
                >
                  Twitter
                </a>
              </li>
              <li>
                <Link to="/newsletter" className="hover:opacity-90">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:info@openstreetstempe.org"
                  className="hover:opacity-90"
                >
                  info@openstreetstempe.org
                </a>
              </li>
              <li>
                <p>PO Box 1884</p>
                <p>Tempe, AZ 85280</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-20 text-center text-sm">
          <p>
            © 2024 Tempe Bicycle Action Group
            <span className="hidden sm:inline"> · </span>
            <br className="sm:hidden" />
            All rights reserved
          </p>
        </div>
      </Container>
    </footer>
  );
}
