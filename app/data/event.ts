export const eventData = {
  name: "Open Streets Tempe",
  startDate: "2026-04-12T10:00:00-07:00",
  endDate: "2026-04-12T15:00:00-07:00",
  description:
    "A car-free celebration where people can walk, bike, roll, dance, and play. Experience the city like never before as our streets transform into vibrant public spaces.",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  isAccessibleForFree: true,
  location: {
    "@type": "Place",
    name: "Downtown Tempe",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tempe",
      addressRegion: "AZ",
      addressCountry: "US",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Tempe Bicycle Action Group",
    url: "https://biketempe.org",
  },
  offers: {
    "@type": "Offer",
    price: 0,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    validFrom: "2025-01-01",
  },
  keywords:
    "open streets, car-free, cycling, walking, community event, street festival, active transportation, Tempe events, family-friendly, public spaces",
} as const;

export const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  ...eventData,
} as const;
