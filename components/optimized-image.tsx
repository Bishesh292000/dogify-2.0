import Image from "next/image";

type OptimizedImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function OptimizedImage({
  src,
  alt,
  className = "object-cover",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw"
}: OptimizedImageProps) {
  return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={className} />;
}
