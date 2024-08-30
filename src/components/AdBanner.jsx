import React, { useEffect } from 'react';

const AdBanner = ({ adClient, adSlot, format }) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  const adStyle = {
    display: 'block',
    textAlign: 'center',
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