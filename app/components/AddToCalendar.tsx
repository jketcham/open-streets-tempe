import { useState, useRef, useEffect } from "react";
import { CalendarIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTheme } from "./ThemeProvider";
import * as gtag from "~/utils/gtags.client";

const GOOGLE_CALENDAR_URL = (() => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Open Streets Tempe",
    dates: "20260412T100000/20260412T150000",
    ctz: "America/Phoenix",
    details: [
      "A car-free celebration where people can walk, bike, roll, dance, and play.",
      "",
      "BIKE PARADE",
      "9:45 AM - Gather at Centerpoint Plaza (7th St & Mill Ave)",
      "10:00 AM - Announcements & Festivities",
      "10:15 AM - Rollout",
      "11:00 AM - Arrive at Open Streets (Hardy Dr & Rio Salado Pkwy)",
      "",
      "OPEN STREETS",
      "10:00 AM \u2013 3:00 PM",
      "Rio Salado Pkwy between Hardy Dr & Tempe Beach Park",
      "",
      "https://openstreetstempe.org",
    ].join("\n"),
    location: "1 W Rio Salado Pkwy, Tempe, AZ 85281, United States",
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
})();

export function AddToCalendar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  function handleToggle() {
    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen) {
      gtag.event({
        action: "add_to_calendar_open",
        category: "engagement",
        label: "dropdown_opened",
        value: "1",
      });
    }
  }

  function handleOptionClick(option: string) {
    gtag.event({
      action: "add_to_calendar_click",
      category: "engagement",
      label: option,
      value: "1",
    });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative w-full sm:w-auto">
      <button
        type="button"
        onClick={handleToggle}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold sm:w-auto ${theme.bgInverse} ${theme.textInverse} transition-opacity hover:opacity-90`}
      >
        <CalendarIcon className="size-5 shrink-0" />
        Add to Calendar
        <ChevronDownIcon className="size-3.5 shrink-0" />
      </button>

      {open && (
        <div className="absolute left-0 z-10 mt-2 w-full overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/10 sm:left-auto sm:right-0 sm:w-48">
          <a
            href={GOOGLE_CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => handleOptionClick("google_calendar")}
          >
            Google Calendar
          </a>
          <a
            href="/calendar.ics"
            download="open-streets-tempe.ics"
            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => handleOptionClick("ics_download")}
          >
            Apple Calendar & Outlook
          </a>
        </div>
      )}
    </div>
  );
}
