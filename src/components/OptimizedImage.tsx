
import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  loading = 'lazy',
  sizes 
}: OptimizedImageProps) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Create different image sources for different formats
    const createOptimizedSources = () => {
      const baseName = src.split('.').slice(0, -1).join('.');
      const extension = src.split('.').pop()?.toLowerCase();
      
      // For now, use the original source
      // In a real implementation, you'd have WebP/AVIF versions
      setImageSrc(src);
    };

    createOptimizedSources();
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <picture>
        {/* WebP source for modern browsers */}
        <source srcSet={imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
        {/* AVIF source for even better compression */}
        <source srcSet={imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.avif')} type="image/avif" />
        {/* Fallback to original format */}
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          sizes={sizes}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          decoding="async"
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;
