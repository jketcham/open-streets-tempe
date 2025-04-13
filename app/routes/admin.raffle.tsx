import { useState, useEffect } from "react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect, createCookieSessionStorage } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { PageLayout } from "~/components/PageLayout";
import { Container } from "~/components/Container";
import Stripe from "stripe";

interface ParticipantEntry {
  email: string;
  name: string | null;
  phone: string | null;
}

interface ActionData {
  error?: string;
  winnerEmail?: string;
  winnerName?: string | null;
  winnerPhone?: string | null;
  winnerTicketCount?: number;
  participantCount?: number;
  totalTicketCount?: number;
  winPercentage?: number;
}

interface LoaderData {
  isAuthenticated: boolean;
  error?: string;
}

interface WinnerInfo {
  email: string;
  name: string | null;
  phone: string | null;
  timestamp: string; // Store timestamp for ordering/display
  ticketCount?: number;
  winPercentage?: number;
}

const WINNER_HISTORY_KEY = "raffleWinnerHistory";
const COOKIE_NAME = "__raffle_admin_session";

export const meta: MetaFunction = () => {
  return [
    { title: "Raffle Admin" },
    { name: "robots", content: "noindex" }, // Prevent search engine indexing
  ];
};

function createSessionStorage() {
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    throw new Error("SESSION_SECRET must be set");
  }

  return createCookieSessionStorage({
    cookie: {
      name: COOKIE_NAME,
      secrets: [sessionSecret],
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  });
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log("[LOADER] Starting loader function");

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const rafflePriceId = process.env.RAFFLE_PRICE_ID;
  const adminPassword = process.env.RAFFLE_ADMIN_PASSWORD;

  if (!stripeSecretKey || !rafflePriceId || !adminPassword) {
    console.error("[LOADER] Missing required environment variables");
    return json<LoaderData>({
      isAuthenticated: false,
      error:
        "Server configuration missing (Stripe Key, Price ID, or Admin Password).",
    });
  }

  try {
    const sessionStorage = createSessionStorage();
    const cookieHeader = request.headers.get("Cookie");
    console.log("[LOADER] Cookie header:", cookieHeader);

    const session = await sessionStorage.getSession(cookieHeader);
    const isAdmin = session.get("isAdmin");
    console.log("[LOADER] Session isAdmin value:", isAdmin);

    const isAuthenticated = isAdmin === true;
    console.log("[LOADER] isAuthenticated:", isAuthenticated);

    return json<LoaderData>({ isAuthenticated });
  } catch (error) {
    console.error("[LOADER] Error in loader:", error);
    return json<LoaderData>({
      isAuthenticated: false,
      error: "Error in session handling",
    });
  }
};

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("[ACTION] Starting action function");

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const rafflePriceId = process.env.RAFFLE_PRICE_ID;
  const adminPassword = process.env.RAFFLE_ADMIN_PASSWORD;

  if (!stripeSecretKey || !rafflePriceId || !adminPassword) {
    console.error("[ACTION] Missing required environment variables");
    return json<ActionData>(
      { error: "Server configuration missing." },
      { status: 500 },
    );
  }

  try {
    const sessionStorage = createSessionStorage();
    const cookieHeader = request.headers.get("Cookie");
    console.log("[ACTION] Cookie header:", cookieHeader);

    const session = await sessionStorage.getSession(cookieHeader);
    const formData = await request.formData();
    const intent = formData.get("intent");
    console.log("[ACTION] Intent:", intent);

    if (intent === "login") {
      const password = formData.get("password");
      console.log(
        "[ACTION] Login attempt with password:",
        password ? "provided" : "missing",
      );

      if (password === adminPassword) {
        session.set("isAdmin", true);
        console.log("[ACTION] Login successful, setting isAdmin to true");

        const cookie = await sessionStorage.commitSession(session);
        console.log("[ACTION] Set-Cookie:", cookie);

        return redirect("/admin/raffle", {
          headers: {
            "Set-Cookie": cookie,
          },
        });
      } else {
        console.log("[ACTION] Invalid password provided");
        return json<ActionData>(
          { error: "Invalid password." },
          { status: 401 },
        );
      }
    }

    // Check authentication for all other actions
    const isAdmin = session.get("isAdmin");
    console.log("[ACTION] Current session isAdmin value:", isAdmin);

    if (isAdmin !== true) {
      console.log("[ACTION] Not authenticated for action:", intent);
      return json<ActionData>({ error: "Not authenticated." }, { status: 403 });
    }

    if (intent === "draw") {
      try {
        const stripe = new Stripe(stripeSecretKey, {
          apiVersion: "2025-03-31.basil",
        });

        const participants: ParticipantEntry[] = [];
        // Map to store ticket count per unique email
        const participantTickets = new Map<string, number>();
        let totalTicketCount = 0;

        // Fetching sessions for price ID is implicitly logged by Stripe SDK in debug mode if needed
        for await (const session of stripe.checkout.sessions.list({
          limit: 100, // Adjust limit as needed, auto-paging handles > 100
          expand: ["data.line_items"],
          status: "complete", // Only fetch completed sessions
        })) {
          if (session.payment_status === "paid" && session.line_items) {
            for (const item of session.line_items.data) {
              // Check if the line item price matches the raffle ticket price ID
              if (
                item.price?.id === rafflePriceId &&
                session.customer_details?.email
              ) {
                const quantity = item.quantity ?? 1; // Default to 1 if quantity is null/undefined
                const email = session.customer_details.email;
                const name = session.customer_details.name;
                const phone = session.customer_details.phone;

                // Update total ticket count for this participant
                const currentTickets = participantTickets.get(email) || 0;
                participantTickets.set(email, currentTickets + quantity);

                totalTicketCount += quantity;

                // Add entry for each ticket
                for (let i = 0; i < quantity; i++) {
                  participants.push({ email, name, phone });
                }
              }
            }
          }
        }

        // --- Raffle Logic ---
        if (participants.length === 0) {
          return json<ActionData>({
            error: "No paid raffle tickets found for the specified product ID.",
          });
        }

        const winnerIndex = Math.floor(Math.random() * participants.length);
        const winnerEntry = participants[winnerIndex];
        const winnerEmail = winnerEntry.email;
        const winnerTicketCount = participantTickets.get(winnerEmail) || 0; // Should always exist if they won
        const winPercentage =
          totalTicketCount > 0
            ? (winnerTicketCount / totalTicketCount) * 100
            : 0;

        return json<ActionData>({
          winnerEmail: winnerEmail,
          winnerName: winnerEntry.name,
          winnerPhone: winnerEntry.phone,
          winnerTicketCount: winnerTicketCount,
          participantCount: participantTickets.size, // Use map size for unique participants
          totalTicketCount: totalTicketCount,
          winPercentage: winPercentage,
        });
      } catch (error) {
        // Explicitly type error
        // Log the detailed error for server-side debugging
        console.error("Stripe API or Raffle Error:", error);
        // Provide a more generic error message to the client
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        return json<ActionData>(
          { error: `Failed to draw winner: ${errorMessage}` },
          { status: 500 },
        );
      }
    }

    return json<ActionData>({ error: "Invalid intent." }, { status: 400 });
  } catch (error) {
    console.error("[ACTION] Error in action function:", error);
    return json<ActionData>(
      { error: "An error occurred processing your request." },
      { status: 500 },
    );
  }
};

export default function RaffleAdmin() {
  const actionData = useActionData<ActionData>();
  const { isAuthenticated, error: loaderError } = useLoaderData<LoaderData>();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [winnerHistory, setWinnerHistory] = useState<WinnerInfo[]>([]);

  const isDrawing =
    navigation.state === "submitting" &&
    navigation.formData?.get("intent") === "draw";

  // Load history from localStorage on component mount (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedHistory = localStorage.getItem(WINNER_HISTORY_KEY);
      if (storedHistory) {
        try {
          setWinnerHistory(JSON.parse(storedHistory));
        } catch (e) {
          // localStorage.removeItem(WINNER_HISTORY_KEY);
        }
      }
    }
  }, []);

  // Save new winner to history and localStorage when actionData updates
  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Check if the latest action result has a winner
    if (actionData?.winnerEmail) {
      const newWinner: WinnerInfo = {
        email: actionData.winnerEmail,
        name: actionData.winnerName || null,
        phone: actionData.winnerPhone || null,
        timestamp: new Date().toISOString(),
        ticketCount: actionData.winnerTicketCount,
        winPercentage: actionData.winPercentage,
      };

      // Use functional update to ensure we have the latest state
      setWinnerHistory((prevHistory) => {
        // Simple duplicate check based on timestamp of the new winner vs the absolute last item in previous history
        const lastEntryTimestamp =
          prevHistory.length > 0
            ? new Date(prevHistory[prevHistory.length - 1].timestamp).getTime()
            : 0;
        const newEntryTimestamp = new Date(newWinner.timestamp).getTime();

        // Avoid adding if the timestamp is identical or extremely close to the last one (prevents double add on quick refresh/clicks)
        if (
          prevHistory.length > 0 &&
          Math.abs(newEntryTimestamp - lastEntryTimestamp) < 500
        ) {
          // 500ms threshold
          return prevHistory; // Return previous state if duplicate detected
        }

        // Construct the new history array
        const updatedHistory = [...prevHistory, newWinner];

        // Save the updated array to localStorage
        try {
          localStorage.setItem(
            WINNER_HISTORY_KEY,
            JSON.stringify(updatedHistory),
          );
        } catch (e) {
          console.error("Failed to save winner history to localStorage:", e);
        }

        // Return the new state for React
        return updatedHistory;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]); // Re-run whenever actionData changes

  const handleClearHistory = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(WINNER_HISTORY_KEY);
      setWinnerHistory([]); // Clear state as well
    }
  };

  return (
    <PageLayout theme="apricot">
      <Container>
        <div className="py-12">
          <h1 className="mb-6 text-3xl font-bold">Raffle Administration</h1>

          {loaderError && (
            <p className="mb-4 rounded bg-red-100 p-3 text-red-700">
              {loaderError}
            </p>
          )}

          {!isAuthenticated ? (
            <Form method="post" className="max-w-sm space-y-4">
              <h2 className="text-xl font-semibold">Enter Password</h2>
              {actionData?.error && !loaderError && (
                <p className="rounded bg-red-100 p-3 text-red-700">
                  {actionData.error}
                </p>
              )}
              <input type="hidden" name="intent" value="login" />
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password:
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="mt-1 block w-full rounded border border-gray-300 bg-white p-2 pr-10 text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-600"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Login
              </button>
            </Form>
          ) : (
            <div>
              <p className="mb-4 rounded bg-green-100 p-3 text-green-700">
                Authenticated.
              </p>
              <Form method="post" className="mb-6">
                <input type="hidden" name="intent" value="draw" />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded bg-tachi-600 px-6 py-3 text-lg font-semibold text-white shadow transition-opacity hover:bg-tachi-700 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isDrawing}
                >
                  {isDrawing ? (
                    <>
                      <svg
                        className="-ml-1 mr-3 size-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Drawing...</span>
                    </>
                  ) : (
                    "Draw Raffle Winner"
                  )}
                </button>
              </Form>

              {/* Only show non-login errors when authenticated */}
              {actionData?.error &&
                actionData.error !== "Invalid password." && (
                  <p className="mt-4 rounded bg-red-100 p-3 text-red-700">
                    {actionData.error}
                  </p>
                )}

              {actionData?.winnerEmail && !isDrawing && (
                <div className="mt-6 rounded border border-gray-300 bg-white p-6 shadow">
                  <h2 className="mb-3 text-2xl font-bold text-tachi-800">
                    Latest Raffle Result
                  </h2>
                  <div className="space-y-2 text-lg">
                    <p>
                      Email:{" "}
                      <strong className="font-semibold">
                        {actionData.winnerEmail}
                      </strong>
                    </p>
                    <p>
                      Name:{" "}
                      <strong className="font-semibold">
                        {actionData.winnerName || "N/A"}
                      </strong>
                    </p>
                    <p>
                      Phone:{" "}
                      <strong className="font-semibold">
                        {actionData.winnerPhone || "N/A"}
                      </strong>
                    </p>
                    <p>
                      Tickets Purchased:{" "}
                      <strong className="font-semibold">
                        {actionData.winnerTicketCount}
                      </strong>
                    </p>
                    <p>
                      Chance of Winning:{" "}
                      <strong className="font-semibold">
                        {actionData.winPercentage?.toFixed(2)}%
                      </strong>
                    </p>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    Based on {actionData.totalTicketCount} total tickets from{" "}
                    {actionData.participantCount} unique participants.
                  </p>
                </div>
              )}

              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Winner History</h2>
                  {winnerHistory.length > 0 && (
                    <button
                      onClick={handleClearHistory}
                      className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                    >
                      Clear History
                    </button>
                  )}
                </div>
                {winnerHistory.length === 0 ? (
                  <p className="mt-4 text-gray-600">No winners drawn yet.</p>
                ) : (
                  <ul className="mt-4 space-y-4">
                    {winnerHistory.map((winner, index) => (
                      <li
                        key={index}
                        className="rounded border border-gray-200 bg-gray-50 p-4"
                      >
                        <p className="font-semibold">
                          Draw #{index + 1} (
                          {new Date(winner.timestamp).toLocaleString()})
                        </p>
                        <p>Email: {winner.email}</p>
                        <p>Name: {winner.name || "N/A"}</p>
                        <p>Phone: {winner.phone || "N/A"}</p>
                        {winner.ticketCount !== undefined && (
                          <p>Tickets: {winner.ticketCount}</p>
                        )}
                        {winner.winPercentage !== undefined && (
                          <p>Win %: {winner.winPercentage.toFixed(2)}%</p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </PageLayout>
  );
}
