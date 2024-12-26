import { json } from "@remix-run/node";

export function notFound(message: string) {
  return json(
    {
      message,
      gaTrackingId: process.env.GA_TRACKING_ID,
    },
    {
      status: 404,
      statusText: "Not Found",
    },
  );
}

export function serverError(message: string) {
  return json(
    {
      message,
      gaTrackingId: process.env.GA_TRACKING_ID,
    },
    {
      status: 500,
      statusText: "Internal Server Error",
    },
  );
}
