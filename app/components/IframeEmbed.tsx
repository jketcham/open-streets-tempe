import { useState } from "react";

interface IframeEmbedProps {
  title: string;
  src: string;
  height?: number;
}

export function IframeEmbed({ title, src, height = 850 }: IframeEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)]">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white">
          <div className="size-8 animate-spin rounded-full border-4 border-current border-t-transparent" />
          <p className="text-lg text-current">Loading...</p>
        </div>
      )}
      <iframe
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
