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
  const [attemptedFormats, setAttemptedFormats] = useState(new Set([src]));

  // Generate alternative image formats to try
  const getAlternativeFormats = (originalSrc) => {
    if (!originalSrc) return [];
    
    // Get the base URL without extension
    const baseUrl = originalSrc.replace(/\.[^/.]+$/, '');
    
    // Try WebP and AVIF first (modern formats), then JPG/PNG (fallback)
    const formats = ['.webp', '.avif', '.jpg', '.jpeg', '.png'];
    
    return formats
      .map(ext => baseUrl + ext)
      .filter(url => url !== originalSrc && !attemptedFormats.has(url));
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    // Try alternative formats first
    const alternatives = getAlternativeFormats(src);
    if (alternatives.length > 0) {
      const nextFormat = alternatives[0];
      setAttemptedFormats(prev => new Set([...prev, nextFormat]));
      setCurrentSrc(nextFormat);
      console.warn(`Format failed: ${currentSrc}, trying: ${nextFormat}`);
      return;
    }
    
    // If all formats exhausted, try fallback
    if (!usingFallback && fallbackSrc) {
      console.warn(`All formats failed for: ${src}, using fallback`);
      setCurrentSrc(fallbackSrc);
      setUsingFallback(true);
      return;
    }
    
    // All options exhausted
    console.warn(`Image completely failed to load: ${src}`);
    setIsError(true);
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
