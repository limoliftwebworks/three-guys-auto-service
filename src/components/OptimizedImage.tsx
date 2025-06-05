import React from "react";
import Image, { ImageProps } from "next/image";

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string;
  fallbackSrc?: string;
  priority?: boolean;
  quality?: number;
  blurEffect?: boolean;
}

/**
 * OptimizedImage component that extends Next.js Image with additional optimizations:
 * - Proper path resolution for local images
 * - Format optimization (WebP/AVIF support through Next.js)
 * - Proper placeholder and loading strategies
 * - Fallback handling
 * - Quality control
 */
export default function OptimizedImage({
  src,
  fallbackSrc = "/images/placeholder.jpg",
  priority = false,
  quality = 80,
  blurEffect = false,
  alt,
  width,
  height,
  fill,
  className,
  style,
  ...props
}: OptimizedImageProps) {
  // Function to normalize image source path
  const getImageSrc = (imagePath: string): string => {
    if (!imagePath) return fallbackSrc;

    // If it's already a data URL, remote URL, or absolute path, use as is
    if (
      imagePath.startsWith("data:") ||
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://") ||
      imagePath.startsWith("/")
    ) {
      return imagePath;
    }

    // Add proper prefix for local images stored in public/images
    return `/images/${imagePath}`;
  };

  // Handle width and height for responsive images
  const getResponsiveProps = () => {
    // If fill is true, don't set width and height
    if (fill) {
      return { fill: true };
    }

    // If both width and height are provided, use them
    if (width && height) {
      return { width, height };
    }

    // Default dimensions if none provided and not using fill
    return { width: 800, height: 600 };
  };

  const normalizedSrc = getImageSrc(src);
  const responsiveProps = getResponsiveProps();

  // Error handling for image load failures
  const [imgSrc, setImgSrc] = React.useState<string>(normalizedSrc);
  const [isError, setIsError] = React.useState<boolean>(false);

  // Update image source when src prop changes
  React.useEffect(() => {
    setImgSrc(normalizedSrc);
    setIsError(false);
  }, [normalizedSrc]);

  const handleError = () => {
    if (!isError) {
      setIsError(true);
      setImgSrc(getImageSrc(fallbackSrc));
    }
  };

  // Determine loading strategy
  const loadingStrategy = priority ? "eager" : "lazy";

  // Use blur placeholder for better loading UX when enabled
  const placeholderStrategy = blurEffect ? "blur" : "empty";

  return (
    <Image
      src={imgSrc}
      alt={alt || "Image"}
      {...responsiveProps}
      className={className}
      style={style}
      loading={loadingStrategy}
      quality={quality}
      placeholder={placeholderStrategy}
      blurDataURL={
        blurEffect
          ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEggJr1Fl6PAAAAABJRU5ErkJggg=="
          : undefined
      }
      onError={handleError}
      {...props}
    />
  );
}
