import type { CSSProperties } from "react";

interface ImageSize {
  minWidth?: number;
  maxWidth?: number;
  src: string;
}

interface ResponsiveImageProps {
  basePath: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  objectPosition?: string;
  priority?: boolean;
}

// Utility function to generate source elements for a picture tag
function generateImageSources(basePath: string) {
  const sizes: ImageSize[] = [
    { minWidth: 1921, src: `${basePath}-2560w.webp` },
    { minWidth: 1025, maxWidth: 1920, src: `${basePath}-1920w.webp` },
    { minWidth: 769, maxWidth: 1024, src: `${basePath}-1024w.webp` },
    { minWidth: 641, maxWidth: 768, src: `${basePath}-768w.webp` },
    { maxWidth: 640, src: `${basePath}-640w.webp` },
  ];

  return sizes.map(({ minWidth, maxWidth, src }) => (
    <source
      key={src}
      type="image/webp"
      media={
        minWidth && maxWidth
          ? `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`
          : minWidth
            ? `(min-width: ${minWidth}px)`
            : `(max-width: ${maxWidth}px)`
      }
      srcSet={src}
    />
  ));
}

// Utility function to generate preload link objects
export function generatePreloadLinks(basePath: string) {
  const sizes: ImageSize[] = [
    { minWidth: 1921, src: `${basePath}-2560w.webp` },
    { minWidth: 1025, maxWidth: 1920, src: `${basePath}-1920w.webp` },
    { minWidth: 769, maxWidth: 1024, src: `${basePath}-1024w.webp` },
    { minWidth: 641, maxWidth: 768, src: `${basePath}-768w.webp` },
    { maxWidth: 640, src: `${basePath}-640w.webp` },
  ];

  return sizes.map(({ minWidth, maxWidth, src }) => ({
    rel: "preload",
    as: "image",
    href: src,
    media:
      minWidth && maxWidth
        ? `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`
        : minWidth
          ? `(min-width: ${minWidth}px)`
          : `(max-width: ${maxWidth}px)`,
    fetchpriority: "high",
  }));
}

export function ResponsiveImage({
  basePath,
  alt,
  className = "",
  style,
  objectPosition,
  priority = false,
}: ResponsiveImageProps) {
  const imgProps = priority
    ? {
        fetchpriority: "high" as const,
        loading: "eager" as const,
        decoding: "async" as const,
      }
    : {
        loading: "lazy" as const,
        decoding: "async" as const,
      };

  return (
    <picture>
      {generateImageSources(basePath)}
      <img
        src={`${basePath}-640w.jpg`}
        alt={alt}
        className={className}
        style={{ objectPosition, ...style }}
        {...imgProps}
      />
    </picture>
  );
}
