import { useState } from "react";
import { useTheme } from "~/components/ThemeProvider";

function FormSkeleton() {
  return (
    <div className={`animate-pulse space-y-8 p-12`}>
      {/* Logo and Title */}
      <div className="space-y-10">
        <div className="mb-10 size-16 rounded-full bg-gray-300/60" />
        <div className="mb-10 w-20 rounded-lg bg-gray-300/60" />
      </div>

      {/* Description text */}
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-gray-300/60" />
        <div className="h-4 w-3/4 rounded bg-gray-300/60" />
      </div>

      {/* Form fields */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-gray-300/60" />
          <div className="h-10 w-full rounded-lg bg-gray-300/60" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-gray-300/60" />
          <div className="h-10 w-full rounded-lg bg-gray-300/60" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 rounded bg-gray-300/60" />
          <div className="h-10 w-full rounded-lg bg-gray-300/60" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-40 rounded bg-gray-300/60" />
          <div className="h-32 w-full rounded-lg bg-gray-300/60" />
        </div>
      </div>

      {/* Submit button */}
      <div className="flex justify-end">
        <div className="h-10 w-24 rounded-lg bg-gray-300/30" />
      </div>
    </div>
  );
}

interface IframeEmbedProps {
  title: string;
  src: string;
  height?: number;
  skeletonLoader?: "default" | "form";
}

export function IframeEmbed({
  title,
  src,
  height = 850,
  skeletonLoader = "default",
}: IframeEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)]">
      {isLoading && (
        <div className="absolute inset-0 z-10">
          {skeletonLoader === "form" ? (
            <FormSkeleton />
          ) : (
            <div
              className={`flex h-full flex-col items-center justify-center gap-2 ${theme.bg} ${theme.textOnLight}`}
            >
              <div className="size-8 animate-spin rounded-full border-4 border-current border-t-transparent" />
              <p className="my-2 text-lg text-current">Loading...</p>
            </div>
          )}
        </div>
      )}
      <iframe
        className={isLoading ? "invisible" : "visible"}
        title={title}
        src={src}
        width="100%"
        height={height}
        style={{
          background: "transparent",
        }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
