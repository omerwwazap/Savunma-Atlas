import React from 'react';

const AdBanner = ({ type }) => {
  const baseStyle = "bg-gray-200 flex items-center justify-center";
  const desktopStyle = type === 'horizontal' 
    ? 'w-full h-24'
    : 'w-64 h-[600px] ml-4';
  const mobileStyle = 'w-full h-20';

  return (
    <div className={`${baseStyle} ${mobileStyle} md:${desktopStyle} my-8`}>
      <p className="text-gray-500">Ad Space</p>
    </div>
  );
};

export default AdBanner;
