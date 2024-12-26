import { useState } from "react";
import { Link } from "@remix-run/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "../ThemeProvider";
import { Container } from "../Container";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const theme = useTheme();

  return (
    <header className={`${theme.bg} sticky top-0 z-50`}>
      <nav className={`relative py-6 ${theme.textOnLight}`}>
        <Container>
          <div className="flex items-center justify-between">
            {/* Mobile Toggle Button */}
            <button
              className={`${theme.textOnLight} -my-6 -ml-6 p-6 md:hidden`}
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {navOpen ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.1 }}
                    >
                      <XMarkIcon className="size-6" />
                    </motion.div>
                    <motion.div
                      key="close-text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                    >
                      Close
                    </motion.div>
                  </div>
                ) : (
                  <motion.div
                    key="bars"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <Bars3Icon className="size-6" />
                    Menu
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <Link to="/" className="text-lg font-bold sm:text-xl">
              Open Streets Tempe
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden space-x-4 text-lg md:flex">
              <li>
                <Link to="/about" className="cursor-pointer hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/volunteer"
                  className="cursor-pointer hover:underline"
                >
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/artists" className="cursor-pointer hover:underline">
                  Call to Artists
                </Link>
              </li>
              <li>
                <Link to="/sponsor" className="cursor-pointer hover:underline">
                  Sponsor
                </Link>
              </li>
            </ul>
          </div>
        </Container>

        {/* Mobile Fullscreen Menu with Animation */}
        <AnimatePresence>
          {navOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`fixed inset-0 top-[75px] z-50 flex flex-col ${theme.bg}`}
            >
              <ul className="flex h-full flex-col items-center justify-center space-y-8 text-2xl">
                <li>
                  <Link
                    to="/about"
                    className="block cursor-pointer px-4 py-2 hover:underline"
                    onClick={() => setNavOpen(false)}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/volunteer"
                    className="block cursor-pointer px-4 py-2 hover:underline"
                    onClick={() => setNavOpen(false)}
                  >
                    Volunteer
                  </Link>
                </li>
                <li>
                  <Link
                    to="/artists"
                    className="block cursor-pointer px-4 py-2 hover:underline"
                    onClick={() => setNavOpen(false)}
                  >
                    Call to Artists
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sponsor"
                    className="block cursor-pointer px-4 py-2 hover:underline"
                    onClick={() => setNavOpen(false)}
                  >
                    Sponsor
                  </Link>
                </li>
              </ul>

              {/* Social Links and Donate Button */}
              <div className="mb-12 flex flex-col items-center space-y-6">
                <div className="flex space-x-6">
                  <a
                    href="https://instagram.com/openstreetstempe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg hover:underline"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://twitter.com/os_tempe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg hover:underline"
                  >
                    Twitter
                  </a>
                  {/* <Link
                    to="/newsletter"
                    className="text-lg hover:underline"
                    onClick={() => setNavOpen(false)}
                  >
                    Newsletter
                  </Link> */}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
