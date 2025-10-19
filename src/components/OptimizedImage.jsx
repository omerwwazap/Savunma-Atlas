import React, { useState } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  loading = 'lazy',
  sizes = '100vw',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  // Generate WebP and AVIF sources
  const getOptimizedSources = (originalSrc) => {
    if (!originalSrc) return {};
    
    const baseUrl = originalSrc.split('.').slice(0, -1).join('.');
    const webpSrc = `${baseUrl}.webp`;
    const avifSrc = `${baseUrl}.avif`;
    
    return { webpSrc, avifSrc, originalSrc };
  };

  const { webpSrc, avifSrc, originalSrc } = getOptimizedSources(src);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsError(true);
  };

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      
      {isError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded">
          <span className="text-gray-500 text-sm">Image not available</span>
        </div>
      )}
      
      <picture>
        <source 
          srcSet={avifSrc} 
          type="image/avif" 
          sizes={sizes}
        />
        <source 
          srcSet={webpSrc} 
          type="image/webp" 
          sizes={sizes}
        />
        <img
          src={originalSrc}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          width={width}
          height={height}
          sizes={sizes}
          {...props}
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;
