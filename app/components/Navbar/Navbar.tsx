import { useState } from "react";
import { Link } from "@remix-run/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="p-4 bg-tachi">
      <div className="flex items-center max-w-6xl mx-auto justify-between">
        {/* Logo/Brand */}
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

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Toggle menu"
        >
          {navOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {navOpen && (
        <ul className="md:hidden mt-2 flex flex-col space-y-2">
          <li>
            <Link
              to="/about"
              className="cursor-pointer hover:underline"
              onClick={() => setNavOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/sponsor"
              className="cursor-pointer hover:underline"
              onClick={() => setNavOpen(false)}
            >
              Sponsor
            </Link>
          </li>
          <li>
            <Link
              to="/artists"
              className="cursor-pointer hover:underline"
              onClick={() => setNavOpen(false)}
            >
              Call to Artists
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
