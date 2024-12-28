import type { CSSProperties } from "react";

type ImageMaxSize = 640 | 768 | 1024 | 1920 | 2560;

interface ResponsiveImageProps {
  basePath: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  objectPosition?: string;
  priority?: boolean;
  maxSize?: ImageMaxSize;
}

// Utility function to generate source elements for a picture tag
function generateImageSources(basePath: string, maxSize: ImageMaxSize) {
  const allSizes: {
    size: ImageMaxSize;
    minWidth?: number;
    maxWidth?: number;
  }[] = [
    { size: 2560, minWidth: 1921 },
    { size: 1920, minWidth: 1025, maxWidth: 1920 },
    { size: 1024, minWidth: 769, maxWidth: 1024 },
    { size: 768, minWidth: 641, maxWidth: 768 },
    { size: 640, maxWidth: 640 },
  ];

  // Filter sizes based on maxSize
  const sizes = allSizes
    .filter(({ size }) => size <= maxSize)
    .map(({ size, minWidth, maxWidth }) => ({
      minWidth,
      maxWidth,
      src: `${basePath}-${size}w`,
    }));

  return sizes.map(({ minWidth, maxWidth, src }, index) => {
    // For the largest size in our filtered array, we want to handle all sizes above it
    const isLargestSize = index === 0;
    const mediaQuery = isLargestSize
      ? minWidth
        ? `(min-width: ${minWidth}px)`
        : undefined // No media query needed for the largest size
      : minWidth && maxWidth
        ? `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`
        : minWidth
          ? `(min-width: ${minWidth}px)`
          : `(max-width: ${maxWidth}px)`;

    return (
      <source
        key={src + "-webp"}
        type="image/webp"
        media={mediaQuery}
        srcSet={`${src}.webp`}
      />
    );
  });
}

// Utility function to generate preload link objects
export function generatePreloadLinks(
  basePath: string,
  maxSize: ImageMaxSize = 2560,
) {
  const allSizes: {
    size: ImageMaxSize;
    minWidth?: number;
    maxWidth?: number;
  }[] = [
    { size: 2560, minWidth: 1921 },
    { size: 1920, minWidth: 1025, maxWidth: 1920 },
    { size: 1024, minWidth: 769, maxWidth: 1024 },
    { size: 768, minWidth: 641, maxWidth: 768 },
    { size: 640, maxWidth: 640 },
  ];

  // Filter sizes based on maxSize
  const sizes = allSizes
    .filter(({ size }) => size <= maxSize)
    .map(({ size, minWidth, maxWidth }) => ({
      minWidth,
      maxWidth,
      src: `${basePath}-${size}w`,
    }));

  return sizes.map(({ minWidth, maxWidth, src }, index) => {
    // For the largest size in our filtered array, we want to handle all sizes above it
    const isLargestSize = index === 0;
    const mediaQuery = isLargestSize
      ? minWidth
        ? `(min-width: ${minWidth}px)`
        : undefined // No media query needed for the largest size
      : minWidth && maxWidth
        ? `(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`
        : minWidth
          ? `(min-width: ${minWidth}px)`
          : `(max-width: ${maxWidth}px)`;

    return {
      rel: "preload",
      as: "image",
      href: `${src}.webp`,
      type: "image/webp",
      ...(mediaQuery && { media: mediaQuery }),
      fetchpriority: "high",
    };
  });
}

export function ResponsiveImage({
  basePath,
  alt,
  className = "",
  style,
  objectPosition,
  priority = false,
  maxSize = 2560,
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
      {generateImageSources(basePath, maxSize)}
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
