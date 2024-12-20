import { useState } from "react";
import { Link } from "@remix-run/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="p-4 bg-tachi relative sticky top-0 z-50">
      <div className="flex items-center max-w-6xl mx-auto justify-between">
        <Link to="/" className="font-bold text-xl">
          Open Streets Tempe
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link to="/about" className="cursor-pointer hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link to="/sponsor" className="cursor-pointer hover:underline">
              Sponsor
            </Link>
          </li>
          <li>
            <Link to="/artists" className="cursor-pointer hover:underline">
              Call to Artists
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {navOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <XMarkIcon className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="bars"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <Bars3Icon className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Dropdown Menu with Animation */}
      <AnimatePresence>
        {navOpen && (
          <motion.ul
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full bg-tachi py-2 flex flex-col border-t border-t-neutral-400 overflow-hidden z-50 shadow-md"
          >
            <li>
              <Link
                to="/about"
                className="cursor-pointer hover:underline block px-4 py-2"
                onClick={() => setNavOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/sponsor"
                className="cursor-pointer hover:underline block px-4 py-2"
                onClick={() => setNavOpen(false)}
              >
                Sponsor
              </Link>
            </li>
            <li>
              <Link
                to="/artists"
                className="cursor-pointer hover:underline block px-4 py-2"
                onClick={() => setNavOpen(false)}
              >
                Call to Artists
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
