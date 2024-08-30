import React from 'react';

const AdBanner = ({ type }) => {
  const style = type === 'horizontal' 
    ? 'w-full h-24 bg-gray-200 flex items-center justify-center mb-6'
    : 'w-64 h-600 bg-gray-200 flex items-center justify-center ml-4';

  return (
    <div className={style}>
      <p className="text-gray-500">Ad Space</p>
    </div>
  );
};

export default AdBanner;