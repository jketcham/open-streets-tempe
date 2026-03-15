export function notFound(message: string) {
  return Response.json(
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
  return Response.json(
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
