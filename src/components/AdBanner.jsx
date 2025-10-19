import React, { useEffect, useState } from 'react';

const AdBanner = ({ "data-ad-client": adClient, "data-ad-slot": adSlot, format = "auto" }) => {
  const [adFailed, setAdFailed] = useState(false);

  useEffect(() => {
    try {
      if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.warn('Ad banner failed to load:', error);
      setAdFailed(true);
    }

    // Fallback: Mark as failed if ads don't load after 3 seconds
    const timeout = setTimeout(() => {
      const adElement = document.querySelector('.adsbygoogle[data-ad-status="attempted"]');
      if (!adElement) {
        setAdFailed(true);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  if (adFailed) {
    return null; // Silently fail if ads don't load
  }

  const adStyle = {
    display: 'block',
    textAlign: 'center',
    minHeight: '100px',
  };

  return (
    <ins
      className="adsbygoogle"
      style={adStyle}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={format}
    />
  );
};

export default AdBanner;