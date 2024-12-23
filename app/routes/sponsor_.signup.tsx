import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Sponsor Signup - Open Streets Tempe" },
    {
      name: "description",
      content: "Sign up to sponsor Open Streets Tempe",
    },
  ];
};

export default function SponsorSignup() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="grow px-6 py-8 sm:px-10 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold sm:text-5xl">
            Sponsor Signup
          </h1>

          <div className="prose prose-lg max-w-none">
            <div className="min-h-[800px] w-full">
              {/* Form iframe will be embedded here */}
              <p className="text-lg">Form loading...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
