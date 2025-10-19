import React, { useState } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  loading = 'lazy',
  sizes = '100vw',
  crossOrigin = 'use-credentials',
  fallbackSrc = null,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [usingFallback, setUsingFallback] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    // If using fallback already or no fallback available, show error
    if (usingFallback || !fallbackSrc) {
      console.warn(`Image failed to load: ${src}`);
      setIsError(true);
      return;
    }
    
    // Try fallback image
    console.warn(`External image failed, trying fallback for: ${src}`);
    setCurrentSrc(fallbackSrc);
    setUsingFallback(true);
  };

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
      )}
      
      {isError && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded">
          <span className="text-gray-500 dark:text-gray-400 text-sm">📷 No image</span>
        </div>
      )}
      
      <img
        src={currentSrc}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover ${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        width={width}
        height={height}
        sizes={sizes}
        crossOrigin={crossOrigin}
        decoding="async"
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
