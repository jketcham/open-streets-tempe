export function loader() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Open Streets Tempe//openstreetstempe.org//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE",
    "TZID:America/Phoenix",
    "BEGIN:STANDARD",
    "DTSTART:19700101T000000",
    "TZOFFSETFROM:-0700",
    "TZOFFSETTO:-0700",
    "TZNAME:MST",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    "DTSTART;TZID=America/Phoenix:20260412T100000",
    "DTEND;TZID=America/Phoenix:20260412T150000",
    "SUMMARY:Open Streets Tempe",
    "DESCRIPTION:A car-free celebration where people can walk\\, bike\\, roll\\, dance\\, and play.\\n\\nBIKE PARADE\\n9:45 AM - Gather at Centerpoint Plaza (7th St & Mill Ave)\\n10:00 AM - Announcements & Festivities\\n10:15 AM - Rollout\\n11:00 AM - Arrive at Open Streets (Hardy Dr & Rio Salado Pkwy)\\n\\nOPEN STREETS\\n10:00 AM - 3:00 PM\\nRio Salado Pkwy between Hardy Dr & Tempe Beach Park",
    "LOCATION:1 W Rio Salado Pkwy\\, Tempe\\, AZ 85281\\, United States",
    "URL:https://openstreetstempe.org",
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="open-streets-tempe-2026.ics"',
    },
  });
}
