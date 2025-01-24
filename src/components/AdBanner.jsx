import React, { useEffect } from 'react';

const AdBanner = ({ "data-ad-client": adClient, "data-ad-slot": adSlot, format = "auto" }) => {
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