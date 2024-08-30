import React from 'react';
import RSSFeed from '../components/RSSFeed';
import MobileNav from '../components/MobileNav';
import DesktopNav from '../components/DesktopNav';
import ContactInfo from '../components/ContactInfo';
import AdBanner from '../components/AdBanner';

const News = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-6 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Military News</h1>
          <DesktopNav />
          <MobileNav />
        </div>
        <div className="max-w-3xl mx-auto">
          <RSSFeed />
        </div>
        <div className="mt-8">
          <AdBanner type="horizontal" />
        </div>
      </div>
      <ContactInfo />
    </div>
  );
};

export default News;
