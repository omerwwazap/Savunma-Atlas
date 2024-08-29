import React from 'react';
import RSSFeed from '../components/RSSFeed';

const News = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Military News</h1>
        <div className="max-w-3xl mx-auto">
          <RSSFeed />
        </div>
      </div>
    </div>
  );
};

export default News;